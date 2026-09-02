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
	if (-not (Test-Path $nodeModulesPath)) {
		Write-Host "Installing dependencies in $ProjectPath ..." -ForegroundColor Cyan
		Invoke-ExternalCommand -File 'npm' -Arguments @('install') -WorkingDirectory $ProjectPath
	}
}

function Start-NpmScriptInNewWindow {
	param(
		[string]$ProjectPath,
		[string]$ScriptName,
		[string]$Title,
		[string]$PythonExecutable = $null
	)

	if ($PythonExecutable) {
		$command = "Set-Location -Path '$ProjectPath'; `$env:PYTHON_EXECUTABLE='$PythonExecutable'; npm run $ScriptName"
	}
	else {
		$command = "Set-Location -Path '$ProjectPath'; npm run $ScriptName"
	}

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

function Start-UnifiedAppContainer {
	param(
		[string]$ProjectPath,
		[string]$MongoUrl,
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
		'-p', '3000:3000',
		'-e', "MONGO_URL=$MongoUrl",
		'-v', "${uploadsPathForDocker}:/app/server/uploads",
		$ImageName
	)
}

function Wait-ForMongo {
	param([string]$ContainerName)

	Write-Host 'Waiting for MongoDB readiness...' -ForegroundColor Cyan
	for ($i = 0; $i -lt 30; $i++) {
		try {
			$ping = docker exec $ContainerName mongosh --quiet --eval "db.runCommand({ ping: 1 }).ok"
			if ($ping -match '1') {
				Write-Host 'MongoDB is ready.' -ForegroundColor Green
				return
			}
		}
		catch {
		}

		Start-Sleep -Seconds 2
	}

	throw 'MongoDB did not become ready in time.'
}

function Restore-MongoDump {
	param(
		[string]$DumpRoot,
		[string]$DbName
	)

	$dumpRootUnix = $DumpRoot -replace '\\', '/'
	if (-not (Test-Path (Join-Path $DumpRoot 'yin'))) {
		throw "Expected dump folder not found: $(Join-Path $DumpRoot 'yin')"
	}

	Write-Host "Restoring dump from $DumpRoot into database '$DbName'..." -ForegroundColor Cyan
	Invoke-ExternalCommand -File 'docker' -Arguments @(
		'run', '--rm',
		'-v', "${dumpRootUnix}:/dump:ro",
		'mongo:7',
		'mongorestore',
		'--host', 'host.docker.internal',
		'--port', '27017',
		'--drop',
		'--nsInclude', "$DbName.*",
		'/dump'
	)

	Write-Host 'MongoDB restore complete.' -ForegroundColor Green
}

Assert-Command -Name 'docker'
Assert-Command -Name 'npm'

$yinRoot = Split-Path -Parent $PSScriptRoot
$projectsRoot = Split-Path -Parent $yinRoot

$unifiedRoot = Join-Path $yinRoot 'yin'
$dumpRoot = Join-Path $yinRoot 'database\yin-1-2-3-4-5'

if (-not (Test-Path $unifiedRoot)) {
	throw "Unified Next.js directory was not found at: $unifiedRoot"
}

if (-not (Test-Path $dumpRoot)) {
	throw "Database dump directory was not found at: $dumpRoot"
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
Ensure-ContainerRunning -ContainerName 'yin-mongo' -ImageName 'mongo:7' -RunArguments @('-p', '27017:27017')

Wait-ForMongo -ContainerName 'yin-mongo'

if (-not $SkipRestore) {
	Restore-MongoDump -DumpRoot $dumpRoot -DbName 'yin'
}
else {
	Write-Host 'Skipping MongoDB restore because -SkipRestore was passed.' -ForegroundColor Yellow
}

if (-not $SkipInstall) {
	Ensure-NodeModules -ProjectPath $unifiedRoot
}

if ($UseContainer) {
	Start-UnifiedAppContainer -ProjectPath $unifiedRoot -MongoUrl 'mongodb://host.docker.internal:27017/yin' -ContainerName 'yin' -ImageName 'yin'
}
else {
	$pythonExecutable = Get-PythonExecutablePreference
	if (-not $pythonExecutable) {
		Write-Host 'No Python runtime found on PATH. Pitch extraction will fail in local mode unless Python 3 is installed.' -ForegroundColor Yellow
		Write-Host 'Alternative: run container mode with npm run dev:start:container.' -ForegroundColor Yellow
	}

	Remove-ContainerIfExists -ContainerName 'yin'
	Remove-ContainerIfExists -ContainerName 'yin-next'
	Start-NpmScriptInNewWindow -ProjectPath $unifiedRoot -ScriptName 'dev' -Title 'yin unified next app' -PythonExecutable $pythonExecutable
}

Write-Host ''
Write-Host 'Development environment is starting.' -ForegroundColor Green
Write-Host 'Unified app (frontend + API): http://localhost:3000' -ForegroundColor Green
Write-Host 'MongoDB:   mongodb://localhost:27017/yin' -ForegroundColor Green
if ($UseContainer) {
	Write-Host 'Mode: Docker container' -ForegroundColor Green
}
else {
	Write-Host 'Mode: Local Node process' -ForegroundColor Green
}
