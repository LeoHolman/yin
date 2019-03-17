<?php
$title = "Yin - Lesson #";
$style = "LAstyle.css";
$prefix = "../";
$extras ="";

include "../head.php";
?>


<ul class = "LA-breadcrumb">
    <li><a href ="<?php echo $prefix ?>index.php">Home</a></li>
    <li><a href ="LessonsAndActivities.php">Lessons and Activities</a></li>
    <li><a href ="#">One</a></li>
</ul>
<div id = "main-wrap">
<div class = "main container-one LA">
    <section id = "lesson-one" class = "lesson">
        <h1>Lesson #</h1><hr>
        <h2>Topic</h2>
    </section>
    <section id = "lesson-#-ref" class = "hide view-2 lesson">
        <div id = "ref-title"><h1>Lesson #</h1><hr>
            <h2>Reference: Topic</h2>
        </div>
        <button type = "button" id = "btn-to-lesson">Return to Lesson</button>
        
    </section>
    <section id = "activity-one-prompt" class = "activity">
        <h1>Activity #</h1><hr>
        <h2>Title</h2>
        <p>Instructions</p>
        <p>Are you ready to test what you learned with with this activity?</p>
        <button type = "button" id = "begin-btn">Begin</button>
    
    </section>
    <section id = "activity-#" class = "hide view-2 activity">
        <div id = "ref-title"><h1>Activity #</h1><hr>
            <h2>Title</h2></div>
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
<div id ="next-lesson">
    <a href ="Lesson2.php" id ="next-btn"><button >Next Lesson</button></a>
</div>    



    <script type="module" src="../js/pageInteractions.js"></script>
    <script type="module" src="../js/displayFunctions.js"></script>

<?php include $prefix."foot.php"; ?>
