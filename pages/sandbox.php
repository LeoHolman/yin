<?php
$title = "Yin - Sandbox";
$style = "LAstyle.css";
$prefix = "../";
$extras ="";
$sandboxClass = "active";

include "../head.php";

?>

<div id ="main-wrap">
<div class ="main sandbox">
    <h1>Sandbox</h1><hr>
	<h3 id="character" style="font-size: 40px;"></h3>
        <div id ="notice">
            <p>Use this area to play around! View your pitch pronouncing any word you want. Feel free to try words that aren't in our tests and experiment! <br><span id ="dismiss">Click anywhere in this box to dismiss.</span></p>
        </div>
        <div id="visualization"></div>
        <div id="input"></div>
        <div id="demo"></div>
        <div id="sandbox-buttons">
            <button id ="baseline">Record Baseline</button>
            <button id="play">Play</button>
            <button id="record">Record</button>
        </div>
        <form id="recording-form" action="mimicking.php" method="POST" style="display: none;">
            <input type="file" name="recording-input" id="recording-input" enctype="multipart/form-data" />
        </form>
    
</div>
<!--	<script src="https://d3js.org/d3.v5.js"></script> -->
	<script src="../js/d3/d3.js"></script>
	<script src="../js/jquery/jquery-3.3.1.min.js"></script>
        <script type="module" src="../js/sandbox.js"></script>
	<script type="module" src="../js/drawingFunctions.js"></script>
	<script type="module" src="../js/audioFunctions.js"></script>
	<script type="module" src="../js/stats.js"></script>
	<script type="module" src="../js/displayFunctions.js"></script>
    
</div>

<?php include $prefix."foot.php"; ?>