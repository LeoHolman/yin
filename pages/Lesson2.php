<?php
$title = "Yin - Lesson Two";
$style = "LAstyle.css";
$prefix = "../";
$extras = "<link rel ='stylesheet' href = '../css/activity2.css' type ='text/css'>";

include "../head.php";
?>


<ul class = "LA-breadcrumb">
    <li><a href ="LessonsAndActivities.php">Lessons and Activities</a></li>
    <li><a href ="Lesson1.php">One</a></li>
    <li><a href ="#">Two</a></li>
</ul>
<div id = "main-wrap">
<div class = "main container-two LA">
    <section id = "lesson-two" class = "lesson">
        <h1>Lesson Two</h1><hr>
        <h2>Tone Characteristics</h2>
        <div id = "lesson-content">
            <h3>Tone levels</h3>
            <p>Tones can be graphed to any voice by using relative numbers. In this graphing scheme, '3' represents the 'middle' pitch of your voice. '5' represents a pitch two clicks higher, and '1' represents a pitch two clicks lower. Each tone is described as starting on one number, moving to another number, and ending on a final number. For example. The 1st tone starts high, stays high, and ends high, so it is '5-5-5', (somtimes just 5-5). The 3rd tone starts a little lower than the middle pitch, moves lower, and ends higher: (2-1-4).</p>
            
            <h3>1st Tone</h3>
            <p>Tone 1 is high and sustained, it has a singing like quality. It moves 5-5-5.</p>
            <audio controls>
                <source src="../assets/sounds/ma-1-mother.mp3" type="audio/mpeg"/>
                Audio not working! 
            </audio>
            <img class = "ex_graph" src ="../assets/images/1_graph.svg">
            <h3>2nd Tone</h3>
            <p>Tone 2 rises, it sounds much like a question in English. It moves 2-4-5</p>
            <audio controls>
                <source src="../assets/sounds/ma-2-hemp.mp3" type="audio/mpeg"/>
                Audio not working! 
            </audio>
            <img class = "ex_graph" src ="../assets/images/2_graph.svg">
            <h3>3rd Tone</h3>
            <p>Tone 3 falls, then rises. This intonation pattern is not common in English, the closest approximation is incredulousness, something like "Are you sure?". It moves "2-1-4".</p>
            <audio controls>
                <source src="../assets/sounds/ma-3-horse.mp3" type="audio/mpeg"/>
                Audio not working! 
            </audio>
            <img class = "ex_graph" src ="../assets/images/3_graph.svg">
            <h3>4th Tone</h3>
            <p>Tone 4 falls sharply, much like barking an order or scolding someone in English. It moves 5-3-1.</p>
            <audio controls>
                <source src="../assets/sounds/ma-4-scold.mp3" type="audio/mpeg"/>
                Audio not working! 
            </audio>
            <img class = "ex_graph" src ="../assets/images/4_graph.svg">
        </div>
    </section>
    <section id = "lesson-two-ref" class = "hide view-2 lesson">
        <div id = "ref-title"><h1>Lesson Two</h1><hr>
            <h2>Instructions</h2>
            <p>Play the sound and select the correct pitch for the tone you heard.</p>
            <h2>Remember</h2>
            <p><strong>Tone one</strong> is high and sustained, 5-5-5.<br></p><p><strong>Tone two</strong> rises like a question, 2-4-5.<br></p><p><strong>Tone three</strong> falls then rises, 2-1-4.<br></p><p><strong>Tone four</strong> falls sharply, like scolding someone, 5-3-1.</p>
        </div>
        <button type = "button" id = "btn-to-lesson">Return to Lesson</button>
        
    </section>
    <section id = "activity-two-prompt" class = "activity">
        <h1>Activity Two</h1><hr>
        <h2>Identification</h2>
        <p>In this activity, we will play a sound and present all four tones' pitch curves. Select the correct pitch for the tone you heard.</p>
        <p id ="sticky-p">Are you ready to test what you learned with with this activity?</p>
        <button type = "button" id = "begin-btn">Begin</button>
    
    </section>
    <section id = "activity-two" class = "hide view-2 activity">
        <div id = "ref-title"><h1>Activity Two</h1><hr>
            <h2>Tone Identification</h2>
        </div>
        <h3 id ="score"></h3>
        <div id = "stimuli">
            <audio controls id = "audio-clip" >
                <source id="audioSource" src="" type="audio/mpeg">
                Audio not working!
            </audio>
        </div>
        <div id="firstResponse" class="response-wrap"></div>
        <div id="secondResponse" class="response-wrap"></div>
        <div id="thirdResponse" class="response-wrap"></div>
        <div id="fourthResponse" class="response-wrap"></div>
        <div id = "feedback-box">
            <div id ="correct" class = "hide feedback correct">
                <h3>Correct!</h3>
                <p>Further description here.</p>
            </div>
            <div id ="incorrect" class = "hide feedback incorrect">
                <h3>Incorrect...</h3>
                <p>Further description here.</p>
            </div>
        </div>
        <button type = "button" id = "skipToEnd" class ="hide">Skip to End</button>
        <button type = "button" id = "continueButton">Continue</button>
    </section>

</div>
</div>
<div id ="next-lesson">
    <a href ="Lesson3.php" id ="next-btn"><button >Next Lesson</button></a>
</div>   

    <script src="../js/jquery/jquery-3.3.1.min.js"></script>
    <script type="module" src="../js/displayFunctions.js"></script>
    <script type="module" src="../js/identifying.js"></script>
	<script type="module" src="../js/pageInteractions.js"></script>

<?php include $prefix."foot.php"; ?>
