<?php
$title = "Yin - Lesson Three";
$style = "LAstyle.css";
$prefix = "../";
$extras ="<link rel ='stylesheet' href ='../css/activity3.css'>";

include "../head.php";

?>


<ul class = "LA-breadcrumb">
    <li><a href ="<?php echo $prefix ?>index.php">Home</a></li>
    <li><a href ="LessonsAndActivities.php">Lessons and Activities</a></li>
    <li><a href ="#">Three</a></li>
</ul>
<div id = "main-wrap">
<div class = "main container-three LA">
    <section id = "lesson-three" class = "lesson">
        <h1>Lesson 3</h1><hr>
        <h2>Pitch Curves</h2>
    </section>
    <section id = "lesson-3-ref" class = "hide view-2 lesson">
        <div id = "ref-title"><h1>Lesson 3</h1><hr>
            <h2>Pitch Curves</h2>
        </div>
        <button type = "button" id = "btn-to-lesson">Return to Lesson</button>
        
    </section>
    <section id = "activity-3-prompt" class = "activity">
        <h1>Activity 3</h1><hr>
        <h2>Tone Mimicking</h2>
        <p>Instructions</p>
        <p>Are you ready to test what you learned with with this activity?</p>
        <button type = "button" id = "begin-btn">Begin</button>
    
    </section>
    <section id = "activity-3" class = "hide view-2 activity">
        <div id = "ref-title"><h1>Activity 3</h1><hr>
            <h2>Tone Mimicking</h2></div>
		
	<!-- BEGIN Activity Content -->
        <div id ="activity-3-baseline">
            <h3>Record Baseline</h3>
            <p>In Chinese, tone is relative. Your highest pitch might not be the same as someone else's highest pitch, but it may still be correct. To grade you accurately, we need a sample of your voice at a normal speaking tone.</p>
            <p>Please press the button below and say, "This is my normal speaking voice."</p>
            <button id="baseline">Record Baseline</button>
        </div>
        <div id ="activity-3-content">
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
    <a href ="Lesson4.php" id ="next-btn"><button >Next Lesson</button></a>
</div>    



	<script src="https://d3js.org/d3.v5.js"></script>
	<script src="../js/jquery/jquery-3.3.1.min.js"></script>
        <script type="module" src="../js/mimicking.js"></script>
	<script type="module" src-"../js/drawingFunctions.js"></script>
	<script type="module" src="../js/audioFunctions.js"></script>
	<script type="module" src="../js/stats.js"></script>
	<script type="module" src="../js/displayFunctions.js"></script>
    <script></script>

<?php include $prefix."foot.php"; ?>
