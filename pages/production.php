<!DOCTYPE html>
<html>
    <head>
        <meta charset="uft-8">
        <title>Production</title>
        <link rel="stylesheet" type="text/css" href="../css/style.css">
    </head>
    <body>
        <h1>Production</h1>
	<h3 id="character"></h3>
	<p id="score"></p>
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
            <button id="continue-btn">Continue</button>
        </div>
	<script src="../js/d3/d3.js"></script>
	<script src="../js/jquery/jquery-3.3.1.min.js"></script>
        <script type="module" src="../js/sandboxProduction.js"></script>
	<script type="module" src-"../js/drawingFunctions.js"></script>
	<script type="module" src="../js/audioFunctions.js"></script>
	<script type="module" src="../js/stats.js"></script>
	<script type="module" src="../js/displayFunctions.js"></script>
    </body>
</html>
