param(
	[switch]$SkipRestore,
	[switch]$SkipInstall,
	[switch]$SkipPortGuard,
	[switch]$UseContainer
)

$ErrorActionPreference = 'Stop'

function Assert-Command {
	param([string]$Name)

	if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
		throw "Required command '$Name' was not found on PATH."
	}
}

function Invoke-ExternalCommand {
	param(
		[string]$File,
		[string[]]$Arguments,
		[string]$WorkingDirectory = $null
	)

	if ($WorkingDirectory) {
		Push-Location $WorkingDirectory
	}

	try {
		& $File @Arguments
		if ($LASTEXITCODE -ne 0) {
			throw "Command failed: $File $($Arguments -join ' ')"
		}
	}
	finally {
		if ($WorkingDirectory) {
			Pop-Location
		}
	}
}

function Ensure-NodeModules {
	param([string]$ProjectPath)

	$nodeModulesPath = Join-Path $ProjectPath 'node_modules'
	$nodemonPath = Join-Path $ProjectPath 'node_modules/.bin/nodemon'
	$nodemonCmdPath = Join-Path $ProjectPath 'node_modules/.bin/nodemon.cmd'

	if (-not (Test-Path $nodeModulesPath) -or (-not (Test-Path $nodemonPath) -and -not (Test-Path $nodemonCmdPath))) {
		Write-Host "Installing dependencies in $ProjectPath ..." -ForegroundColor Cyan
		Invoke-ExternalCommand -File 'npm' -Arguments @('install') -WorkingDirectory $ProjectPath
	}
}

function Start-NpmScriptInNewWindow {
	param(
		[string]$ProjectPath,
		[string]$ScriptName,
		[string]$Title,
		[string]$PythonExecutable = $null,
		[string]$DatabaseUrl = $null
	)

	$environmentAssignments = @()
	if ($PythonExecutable) {
		$environmentAssignments += "`$env:PYTHON_EXECUTABLE='$PythonExecutable'"
	}
	if ($DatabaseUrl) {
		$environmentAssignments += "`$env:DATABASE_URL='$DatabaseUrl'"
	}

	$prefix = if ($environmentAssignments.Count -gt 0) {
		($environmentAssignments -join '; ') + '; '
	} else {
		''
	}

	$command = "Set-Location -Path '$ProjectPath'; ${prefix}npm run $ScriptName"

	Start-Process -FilePath 'powershell' -ArgumentList @('-NoExit', '-Command', $command) -WindowStyle Normal | Out-Null
	Write-Host "Started $Title in a new terminal window." -ForegroundColor Green
}

function Get-PythonExecutablePreference {
	if (Get-Command py -ErrorAction SilentlyContinue) {
		return 'py -3'
	}

	if (Get-Command python3 -ErrorAction SilentlyContinue) {
		return 'python3'
	}

	if (Get-Command python -ErrorAction SilentlyContinue) {
		return 'python'
	}

	return $null
}

function Ensure-ContainerRunning {
	param(
		[string]$ContainerName,
		[string]$ImageName,
		[string[]]$RunArguments
	)

	$exists = (docker ps -a --filter "name=^$ContainerName$" --format '{{.Names}}') -eq $ContainerName
	if (-not $exists) {
		Write-Host "Creating and starting container '$ContainerName'..." -ForegroundColor Cyan
		Invoke-ExternalCommand -File 'docker' -Arguments (@('run', '-d', '--name', $ContainerName) + $RunArguments + @($ImageName))
		return
	}

	$running = (docker inspect -f '{{.State.Running}}' $ContainerName) -eq 'true'
	if (-not $running) {
		Write-Host "Starting existing container '$ContainerName'..." -ForegroundColor Cyan
		Invoke-ExternalCommand -File 'docker' -Arguments @('start', $ContainerName)
	}
	else {
		Write-Host "Container '$ContainerName' is already running." -ForegroundColor DarkGreen
	}
}

function Remove-ContainerIfExists {
	param([string]$ContainerName)

	$exists = (docker ps -a --filter "name=^$ContainerName$" --format '{{.Names}}') -eq $ContainerName
	if ($exists) {
		Write-Host "Removing existing container '$ContainerName'..." -ForegroundColor Cyan
		Invoke-ExternalCommand -File 'docker' -Arguments @('rm', '-f', $ContainerName)
	}
}

function Ensure-DockerNetwork {
	param([string]$NetworkName)

	$exists = docker network ls --filter "name=^$NetworkName$" --format '{{.Name}}'
	if (-not $exists) {
		Write-Host "Creating docker network '$NetworkName'..." -ForegroundColor Cyan
		Invoke-ExternalCommand -File 'docker' -Arguments @('network', 'create', $NetworkName)
	}
}

function Start-UnifiedAppContainer {
	param(
		[string]$ProjectPath,
		[string]$DatabaseUrl,
		[string]$NetworkName,
		[string]$ContainerName,
		[string]$ImageName
	)

	$uploadsPath = Join-Path $ProjectPath 'server\uploads'
	if (-not (Test-Path $uploadsPath)) {
		New-Item -Path $uploadsPath -ItemType Directory -Force | Out-Null
	}
	$uploadsPathForDocker = $uploadsPath -replace '\\', '/'

	Write-Host "Building unified app image '$ImageName'..." -ForegroundColor Cyan
	Invoke-ExternalCommand -File 'docker' -Arguments @('build', '-t', $ImageName, '.') -WorkingDirectory $ProjectPath

	Remove-ContainerIfExists -ContainerName $ContainerName
	Remove-ContainerIfExists -ContainerName 'yin-next'

	Write-Host "Starting unified app container '$ContainerName' on port 3000..." -ForegroundColor Cyan
	Invoke-ExternalCommand -File 'docker' -Arguments @(
		'run', '-d',
		'--name', $ContainerName,
		'--network', $NetworkName,
		'-p', '3000:3000',
		'-e', "DATABASE_URL=$DatabaseUrl",
		'-v', "${uploadsPathForDocker}:/app/server/uploads",
		$ImageName
	)
}

function Start-PostgresContainer {
	param(
		[string]$ContainerName,
		[string]$NetworkName,
		[int]$HostPort,
		[switch]$SkipRestore
	)

	if (-not $SkipRestore) {
		Remove-ContainerIfExists -ContainerName $ContainerName
	}

	Ensure-ContainerRunning -ContainerName $ContainerName -ImageName 'postgres:16' -RunArguments @(
		'--network', $NetworkName,
		'-p', "${HostPort}:5432",
		'-e', 'POSTGRES_USER=yin',
		'-e', 'POSTGRES_PASSWORD=yin',
		'-e', 'POSTGRES_DB=yin'
	)
}

function Wait-ForPostgres {
	param([string]$ContainerName)

	Write-Host 'Waiting for PostgreSQL readiness...' -ForegroundColor Cyan
	for ($i = 0; $i -lt 30; $i++) {
		try {
			$ping = docker exec $ContainerName pg_isready -U yin -d yin
			if ($ping -match 'accepting connections') {
				Write-Host 'PostgreSQL is ready.' -ForegroundColor Green
				return
			}
		}
		catch {
		}

		Start-Sleep -Seconds 2
	}

	throw 'PostgreSQL did not become ready in time.'
}

Assert-Command -Name 'docker'
Assert-Command -Name 'npm'

$yinRoot = Split-Path -Parent $PSScriptRoot
$projectsRoot = Split-Path -Parent $yinRoot

$unifiedRoot = Join-Path $yinRoot 'yin'
$postgresHostPort = 5433
$databaseUrlLocal = "postgresql://yin:yin@localhost:${postgresHostPort}/yin"
$databaseUrlContainer = 'postgresql://yin:yin@yin-postgres:5432/yin'
$networkName = 'yin-net'

if (-not (Test-Path $unifiedRoot)) {
	throw "Unified Next.js directory was not found at: $unifiedRoot"
}

if (-not $SkipPortGuard) {
	$portGuardScript = Join-Path $PSScriptRoot 'guard-dev-ports.ps1'
	if (-not (Test-Path $portGuardScript)) {
		throw "Port guard script was not found at: $portGuardScript"
	}

	Write-Host 'Clearing stale dev listeners on ports 3000 and 8000...' -ForegroundColor Cyan
	& $portGuardScript -Ports @(3000, 8000)
}
else {
	Write-Host 'Skipping port guard because -SkipPortGuard was passed.' -ForegroundColor Yellow
}

Write-Host 'Checking Docker daemon...' -ForegroundColor Cyan
Invoke-ExternalCommand -File 'docker' -Arguments @('info')
Ensure-DockerNetwork -NetworkName $networkName
Start-PostgresContainer -ContainerName 'yin-postgres' -NetworkName $networkName -HostPort $postgresHostPort -SkipRestore:$SkipRestore

	Wait-ForPostgres -ContainerName 'yin-postgres'

if (-not $SkipInstall) {
	Ensure-NodeModules -ProjectPath $unifiedRoot
}

if ($UseContainer) {
	Start-UnifiedAppContainer -ProjectPath $unifiedRoot -DatabaseUrl $databaseUrlContainer -NetworkName $networkName -ContainerName 'yin' -ImageName 'yin'
}
else {
	$pythonExecutable = Get-PythonExecutablePreference
	if (-not $pythonExecutable) {
		Write-Host 'No Python runtime found on PATH. Pitch extraction will fail in local mode unless Python 3 is installed.' -ForegroundColor Yellow
		Write-Host 'Alternative: run container mode with npm run dev:start:container.' -ForegroundColor Yellow
	}

	Remove-ContainerIfExists -ContainerName 'yin'
	Remove-ContainerIfExists -ContainerName 'yin-next'
		Start-NpmScriptInNewWindow -ProjectPath $unifiedRoot -ScriptName 'dev' -Title 'yin unified next app' -PythonExecutable $pythonExecutable -DatabaseUrl $databaseUrlLocal
}

Write-Host ''
Write-Host 'Development environment is starting.' -ForegroundColor Green
Write-Host 'Unified app (frontend + API): http://localhost:3000' -ForegroundColor Green
Write-Host "PostgreSQL: $databaseUrlLocal" -ForegroundColor Green
if ($UseContainer) {
	Write-Host 'Mode: Docker container' -ForegroundColor Green
}
else {
	Write-Host 'Mode: Local Node process' -ForegroundColor Green
}
