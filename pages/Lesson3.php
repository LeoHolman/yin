<?php
$title = "Yin - Lesson Three";
$style = "LAstyle.css";
$prefix = "../";
$extras ="<link rel ='stylesheet' href ='../css/activity3.css'>";

include "../head.php";

?>


<ul class = "LA-breadcrumb">
    <li><a href ="LessonsAndActivities.php">Lessons and Activities</a></li>
    <li><a href ="Lesson1.php">One</a></li>
    <li><a href ="Lesson2.php">Two</a></li>
    <li><a href ="#">Three</a></li>
</ul>
<div id = "main-wrap">
<div class = "main container-three LA">
    <section id = "lesson-three" class = "lesson">
        <h1>Lesson 3</h1><hr>
        <h2>Pitch Curves</h2>
		<p>It's important to remember that tone is relative to the speaker's voice. That means that one person's first tone may not be as high as another person's. For example, let's say that Person A's voice is higher than Person B's. Person A might have a 1st tone at 400Hz, but Person B's 1st tone only comes up to 300Hz. Neither is inherently wrong, because the range of their voices are different.</p>
		<p>The lesson to take from this is not to feel like you "can't go high enough" or "can't go low enough" to say a tone correctly. The highs and lows are relative to your own voice. Even if someone else's tone is higher or lower than yours, that doesn't necessarily make either of you wrong. There are other features that need to be examined.</p>
    </section>
    <section id = "lesson-3-ref" class = "hide view-2 lesson">
        <div id = "ref-title"><h1>Lesson 3</h1><hr>
            <h2>Pitch Curves</h2>
		<p>Listen to the recording for the given word. Look at the native speaker's pitch curve (blue) and prepare to say the word.</p>
		<p>When you are ready to say the word, press "Record". You will have <strong>2 seconds</strong> to say the word. At the end of those 2 seconds, your pitch curve (red) will be graphed against the native speaker's.</p>
		<p>Try to get your pitch curve to overlap the native speaker's as closely as possible.</p>
        </div>
        <button type = "button" id = "btn-to-lesson">Return to Lesson</button>
        
    </section>
    <section id = "activity-3-prompt" class = "activity">
        <h1>Activity 3</h1><hr>
        <h2>Tone Mimicking</h2>
		<p>First, record your baseline by clicking "Record Baseline" and saying "This is my normal speaking voice."</p>
		<p>Listen to the recording for the given word. Look at the native speaker's pitch curve (blue) and prepare to say the word.</p>
		<p>When you are ready to say the word, press "Record". You will have <strong>2 seconds</strong> to say the word. At the end of those 2 seconds, your pitch curve (red) will be graphed against the native speaker's.</p>
		<p>Try to get your pitch curve to overlap the native speaker's as closely as possible.</p>
        <p>Are you ready to begin this activity?</p>
        <button type = "button" id = "begin-btn">Begin</button>
    
    </section>
    <section id = "activity-3" class = "hide view-2 activity">
        <div id = "ref-title"><h1>Activity 3</h1><hr>
            <h2>Tone Mimicking</h2>
	</div>	
		<h3 id="score"></h3>
	<!-- BEGIN Activity Content -->
        <div id ="activity-3-baseline">
            <h3>Record Baseline</h3>
		<p>The following activity is designed to help you improve your ability to produce tone by mimicking a native speaker. You'll be given an audio recording of a native speaker saying a word, and asked to record yourself saying the word. You'll be shown the pitch curve of the native speaker, and after you finish your recording, your pitch curve will be placed along side it for your to compare.</p>
            <p>Please press the "Record Baseline" button and say aloud, "This is my normal speaking voice."</p>
            <button id="baseline">Record Baseline</button>
        </div>
        <div id ="activity-3-content">
            <div id="stimuli">
            <audio controls id="stimuliAudio">
                <source id="audioSource" src="" type="audio/mpeg">
            </audio>
        <h3 id ="character"></h3>
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



<!--	<script src="https://d3js.org/d3.v5.js"></script> -->
	<script src="../js/d3/d3.js"></script>
	<script src="../js/jquery/jquery-3.3.1.min.js"></script>
        <script type="module" src="../js/mimicking.js"></script>
	<script type="module" src="../js/drawingFunctions.js"></script>
	<script type="module" src="../js/audioFunctions.js"></script>
	<script type="module" src="../js/stats.js"></script>
	<script type="module" src="../js/displayFunctions.js"></script>
    <script></script>

<?php include $prefix."foot.php"; ?>
<?php
$title = "Yin - Lesson Three";
