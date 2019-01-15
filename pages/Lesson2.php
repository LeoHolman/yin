<?php
$title = "Yin - Lesson Two";
$style = "../css/style.css";
$style2 = "../css/LAstyle.css";
$prefix = "../";
include "../head.php";
?>

<div id = "main-wrap">
<div class = "main container-one LA">
    <section id = "lesson-two" class = "lesson">
        <h1>Lesson Two</h1><hr>
        <h2>Tone Characteristics</h2>
        <div id = "lesson-content">
            <img src = "../assets/images/skeleton.png">
        </div>
    </section>
    <section id = "lesson-two-ref" class = "hide view-2 lesson">
        <div id = "ref-title"><h1>Lesson Two</h1><hr>
            <h2>Reference: Tone Characteristics</h2>
        </div>
        <button type = "button" id = "btn-to-lesson" onclick = "closeActivity()">Return to Lesson</button>
        
    </section>
    <section id = "activity-one-prompt" class = "activity">
        <h1>Activity Two</h1><hr>
        <h2>Identification</h2>
        <p>In this activity, we will play a sound and present all four tones' pitch curves. Select the correct pitch for the tone you heard.</p>
        <p>Are you ready to test what you learned with with this activity?</p>
        <button type = "button" onclick = "openActivity();" id = "begin-btn">Begin</button>
    
    </section>
    <section id = "activity-two" class = "hide view-2 activity">
        <div id = "ref-title"><h1>Activity Two</h1><hr>
            <h2>Tone Identification</h2></div>
         [activity components here]
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

<div>
<p>footer</p>
</div>

    <script type="module" src="../js/distinguishing.js"></script>
    <script type="module" src="../js/displayFunctions.js"></script>

</body>
