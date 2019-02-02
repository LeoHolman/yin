<?php
	//if there is a file, activate
	if(!empty($_FILES)):

	//make up a random number
    $randomNumber = random_int(1,2000000000);
    $targetDir = "../uploads/" . $randomNumber;
	//check to see if the number exists, if it does, make another 
    while(!empty(glob($targetDir))){
        $randomNumber = random_int(1,2000000000); 
        $targetDir = "../uploads/" . $randomNumber; 
    }

	//make the directory, change permission, add file to it
    mkdir($targetDir,0777);
	chmod($targetDir, 0777);
	move_uploaded_file($_FILES["audioData"]["tmp_name"], $targetDir."/tmp.blob");

	//read in praat script, write it to new directory
	$praatScriptInput = fopen('../praat/getPitchTier.Praat', 'r') or die("Unable to open file");
	$praatScript = fread($praatScriptInput,filesize('../praat/getPitchTier.Praat'));
	fclose($praatScriptInput);	
	$writePraatScript = fopen($targetDir ."/getPitchTier.Praat", "w") or die("Unable to open file:");
	fwrite($writePraatScript, $praatScript);
	fclose($writePraatScript);

	//use ffmpeg to convert audio to correct format
	exec('../prepAudioFile.sh '.escapeshellarg($randomNumber));

	//run praat script
	exec("praat --run '/var/www/html/yin/uploads/".$randomNumber."/getPitchTier.Praat'");

	//clean up csv, remove top headers and add 'time	frequency' to top for d3
	$csvBeforeData = file("/var/www/html/yin/uploads/".$randomNumber."/tmp.csv");
	array_shift($csvBeforeData);
	$csvBeforeData[0] = "time	frequency\n";
	$csvAfterData = implode("", $csvBeforeData);
	$csvAfter = fopen($targetDir."/tmp.csv", "w+") or die("Unable to open file");
	fwrite($csvAfter, $csvAfterData);
	fclose($csvAfter);

	//return data location
	echo "***".$targetDir."/tmp.csv &&&";
	endif;
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="uft-8">
        <title>Mimicking</title>
        <link rel="stylesheet" type="text/css" href="../css/style.css">
    </head>
    <body>
        <h1>Mimicking</h1>
        <div id="stimuli">
        <audio controls>
            <source id="audioSource" src="" type="audio/mpeg">
        </audio>
        </div>
        <div id="visualization"></div>
        <div id="input"></div>
        <div id="demo"></div>
        <div>
            <button id="record">Record</button>
            <button id="play">Play</button>
            <button id="save">Save</button>
        </div>
        <form id="recording-form" action="mimicking.php" method="POST" style="display: none;">
            <input type="file" name="recording-input" id="recording-input" enctype="multipart/form-data" />
        </form>
        <script type="module" src="../js/mimicking.js"></script>
	<script src="https://d3js.org/d3.v5.js"></script>
	<script type="module" src-"../js/drawingFunctions.js"></script>
	<script type="module" src="../js/pitchGraphing.js"></script>
    </body>
</html>
