<!DOCTYPE html>
<html>
    <head>
        <meta charset="uft-8">
        <title>Sandbox</title>
        <link rel="stylesheet" type="text/css" href="../css/style.css">
    </head>
    <body>
        <h1>Sandbox</h1>
        </div>
	<h3 id="character" style="font-size: 40px;"></h3>	
        <div id="visualization"></div>
        <div id="input"></div>
        <div id="demo"></div>
        <div>
            <button id="record">Record</button>
            <button id="play">Play</button>
        </div>
        <form id="recording-form" action="mimicking.php" method="POST" style="display: none;">
            <input type="file" name="recording-input" id="recording-input" enctype="multipart/form-data" />
        </form>
<!--	<script src="https://d3js.org/d3.v5.js"></script> -->
	<script src="../js/d3/d3.js"></script>
	<script src="../js/jquery/jquery-3.3.1.min.js"></script>
        <script type="module" src="../js/sandbox.js"></script>
	<script type="module" src-"../js/drawingFunctions.js"></script>
	<script type="module" src="../js/audioFunctions.js"></script>
	<script type="module" src="../js/stats.js"></script>
	<script type="module" src="../js/displayFunctions.js"></script>
    </body>
</html>
