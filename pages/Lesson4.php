<?php
$title = "Yin - Lesson 4";
$style = "LAstyle.css";
$prefix = "../";
$extras ="<link rel ='stylesheet' href ='../css/activity4.css'>";
include "../head.php";
?>


<ul class = "LA-breadcrumb">
    <li><a href ="<?php echo $prefix ?>index.php">Home</a></li>
    <li><a href ="LessonsAndActivities.php">Lessons and Activities</a></li>
    <li><a href ="#">Four</a></li>
</ul>
<div id = "main-wrap">
<div class = "main container-one LA">
    <section id = "lesson-four" class = "lesson">
        <h1>Lesson 4</h1><hr>
        <h2>Topic</h2>
    </section>
    <section id = "lesson-4-ref" class = "hide view-2 lesson">
        <div id = "ref-title"><h1>Lesson 4</h1><hr>
            <h2>Reference: Topic</h2>
        </div>
        <button type = "button" id = "btn-to-lesson">Return to Lesson</button>
        
    </section>
    <section id = "activity-one-prompt" class = "activity">
        <h1>Activity 4</h1><hr>
        <h2>Title</h2>
        <p>Instructions</p>
        <p>Are you ready to test what you learned with with this activity?</p>
        <button type = "button" id = "begin-btn">Begin</button>
    
    </section>
    <section id = "activity-4" class = "hide view-2 activity">
        <div id = "ref-title"><h1>Activity 4</h1><hr>
            <h2>Tone Production</h2></div>
	<!-- BEGIN Activity Content -->
		<h3 id="score"></h3>
        <div id ="activity-4-baseline">
            <h3>Record Baseline</h3>
            <p>In Chinese, tone is relative. Your highest pitch might not be the same as someone else's highest pitch, but it may still be correct. To grade you accurately, we need a sample of your voice at a normal speaking tone.</p>
            <p>Please press the button below and say, "This is my normal speaking voice."</p>
            <button id="baseline">Record Baseline</button>
        </div>
        <div id ="activity-4-content">
        <h3 id ="character"></h3>
            <div id="stimuli">
            <audio controls>
                <source id="audioSource" src="" type="audio/mpeg">
            </audio>
            </div>
            <div id="visualization"></div>
            <div id="input"></div>
            <div id="demo"></div>
            <div>
<!--            <button id="baseline">Record Baseline</button>-->
                <button id="record">Record</button>
                <button id="play">Play</button>
            </div>
            <form id="recording-form" action="mimicking.php" method="POST" style="display: none;">
                <input type="file" name="recording-input" id="recording-input" enctype="multipart/form-data" />
            </form>
        </div>
        
	<!-- END Activity Content -->
        <div id = "feedback-box">
            <div id ="correct" class = "hide correctfeed">
                <h3>Correct!</h3>
                <p>Further description here.</p>
            </div>
            <div id ="incorrect" class = "hide incorrectfeed">
                <h3>Incorrect...</h3>
                <p>Further description here.</p>
            </div>
        </div>
        <button type = "button" id = "continue-btn">Continue</button>
    </section>

</div>
</div>
<div id ="next-lesson">
    <a href ="LessonsAndActivities.php" id ="next-btn"><button >Finish</button></a>
</div>    


	<script src="../js/d3/d3.js"></script>
	<script src="../js/jquery/jquery-3.3.1.min.js"></script>
        <script type="module" src="../js/production.js"></script>
	<script type="module" src="../js/drawingFunctions.js"></script>
	<script type="module" src="../js/audioFunctions.js"></script>
	<script type="module" src="../js/stats.js"></script>
	<script type="module" src="../js/displayFunctions.js"></script>

<?php include $prefix."foot.php"; ?>
