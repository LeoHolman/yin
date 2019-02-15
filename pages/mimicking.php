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
		<button id="baseline">Record Baseline</button>
            <button id="record">Record</button>
            <button id="play">Play</button>
        </div>
        <form id="recording-form" action="mimicking.php" method="POST" style="display: none;">
            <input type="file" name="recording-input" id="recording-input" enctype="multipart/form-data" />
        </form>
        <script type="module" src="../js/mimicking.js"></script>
	<script src="https://d3js.org/d3.v5.js"></script>
	<script type="module" src-"../js/drawingFunctions.js"></script>
	<script type="module" src="../js/audioFunctions.js"></script>
	<script type="module" src="../js/stats.js"></script>
    </body>
</html>
