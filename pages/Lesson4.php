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
        <h1>Lesson Four</h1><hr>
        <h2>Initials and Finals</h2>
	<p>The smallest unit of spoken Mandarin is the word. Each word is made with a specific pattern from a limited number of sounds. The pattern roughly divides words in half, with an <strong>initial</strong> and a <strong>final</strong>. An initial is how the word starts, and a final is how it ends. This way of talking about words has been largely adopted because most words follow an easy pattern, a initial consonant and a final vowel. It is, however, possible to have words without a consonant at the beginning, and some words end in 'n' or 'ng'.</p>
	<p>As you practice it's important to keep in mind that vowels carry tone. You may have noticed that some of your recordings look bizarre and scattered at the begining or ending, this is because consonants do not carry tone well, so the program struggles to find a clear pitch. This is perfectly fine so long as you are aware of it and know it does not necessarily represent an error in your pronunciation.</p>
    </section>
    <section id = "lesson-4-ref" class = "hide view-2 lesson">
        <div id = "ref-title"><h1>Lesson Four</h1><hr>
            <h2>Reference: Topic</h2>
	<p>Look at the character(s), press record and read the word(s). After you've read the word your recording will be graphed against a native speaker for comparison.</p> 
        </div>
        <button type = "button" id = "btn-to-lesson">Return to Lesson</button>
        
    </section>
    <section id = "activity-one-prompt" class = "activity">
        <h1>Activity Four</h1><hr>
        <h2>Tone Production</h2>
        <p>In this activity, you will be prompted with a word and asked to pronounce it on your own.</p>
	<p>Look at the character(s), press record and read the word(s). After you've read the word your recording will be graphed against a native speaker for comparison. This is designed to help you learn the correct pronunciation yourself, without needing to hear the word first.</p> 
        <button type = "button" id = "begin-btn">Begin</button>
    
    </section>
    <section id = "activity-4" class = "hide view-2 activity">
        <div id = "ref-title"><h1>Activity Four</h1><hr>
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
