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

