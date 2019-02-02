<?php
	if(!empty($_FILES)):
    var_dump($_FILES);
    $randomNumber = random_int(1,2000000000);
    $targetDir = "../uploads/" . $randomNumber;
    while(!empty(glob($targetDir))){
        $randomNumber = random_int(1,2000000000); 
        $targetDir = "../uploads/" . $randomNumber; 
    }
    mkdir($targetDir,0777);
	chmod($targetDir, 0777);
	move_uploaded_file($_FILES["audioData"]["tmp_name"], $targetDir."/tmp.blob");
	$praatScriptInput = fopen('../praat/getPitchTier.Praat', 'r') or die("Unable to open file");
	$praatScript = fread($praatScriptInput,filesize('../praat/getPitchTier.Praat'));
	fclose($praatScriptInput);	
	$writePraatScript = fopen($targetDir ."/getPitchTier.Praat", "w") or die("Unable to open file:");
	fwrite($writePraatScript, $praatScript);
	fclose($writePraatScript);
   // $audioCSV = 
	exec('../prepAudioFile.sh '.escapeshellarg($randomNumber));
	exec("praat --run '/var/www/html/yin/uploads/".$randomNumber."/getPitchTier.Praat'");
	$grabCSV = fopen($targetDir."/tmp.csv", "r");
	$csvData = fread($grabCSV, filesize($targetDir."/tmp.csv"));
	fclose($grabCSV);
	echo "HERE IT IS".$csvData;
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
    </body>
</html>
