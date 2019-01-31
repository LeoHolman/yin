<?php
	if(!empty($_FILES)):
    var_dump($_FILES);
    $randomNumber = random_int(1,200);
    $targetDir = "../uploads/" . $randomNumber;
    while(!empty(glob($targetDir))){
        $randomNumber = random_int(1,200); 
        $targetDir = "../uploads/" . $randomNumber; 
    }
    mkdir($targetDir);
//	file_put_contents($targetDir."/tmp.wav", file_get_contents($_FILES["audioData"]["tmp_name"]));
	move_uploaded_file($_FILES["audioData"]["tmp_name"], $targetDir."/tmp.wav");
	echo "After mkdir targetDir is" . $targetDir;
	$praatScript = shell_exec('../readPraatScript.sh');
//	$praatScript = 'Read from file: "tmp.wav"\nselectObject: "Sound zhong"\nTo Manipulation: 0.01, 75, 600\nExtract pitch tier\nSave as PitchTier spreadsheet file: "tmp.csv"';
	echo "</br>" . $praatScript;
//	$praatScript_str = var_export($praatScript, true);
//	file_put_contents($targetDir ."/getPitchTier.Praat", $praatScript_str);
//	file_put_contents($targetDir ."/getPitchTier.Praat", $praatScript);
//    $audioCSV = shell_exec('../sendAudioToPraat.sh '.escapeshellarg($randomNumber));
//    echo $audioCSV; 
	endif;
	$testingBash = shell_exec('../testBash.sh '.escapeshellarg($randomNumber));
	echo $testingBash;
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
    </body>
</html>
