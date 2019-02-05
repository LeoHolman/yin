<?php
$title = "Yin - Lesson One";
$style = "LAstyle.css";
$prefix = "../";
$extras = "<link rel ='stylesheet' href = '../css/activity1.css' type ='text/css'>";

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
        <h1>Lesson One</h1><hr>
        <h2>Lexical Tones</h2>
        <p>Lexical tones are changes in pitch that change the meaning of a word.</p>
        <p>For example, the two words 妈 and 马 are both pronounced "ma", but the
          first means 'mother' and the second means 'horse'. The difference comes
          in their tone. The first word, 妈 has a high, sustained tone, almost like
          singing a note. The second word, 马 has a tone that falls, then rises,
          almost like a question in English.</p>
        <h3>Examples of words distinguished by tones</h3>
        <div id="example-tones">
            <audio controls>
              <source src="../assets/sounds/ma-1-mother.mp3" type="audio/mpeg">
              Audio not working!
            </audio>
            <p>This is mother.</p>
            <audio controls>
              <source src="../assets/sounds/ma-3-horse.mp3" type="audio/mpeg">
              Audio not working!
            </audio>
            <p>And this is horse.</p>
          <div id="examples-graphs-mother">
              <img src="../assets/images/ma_graph.png">
            <p>The graph to the right shows what a pitch curve (in red, ma1) might look like for someone saying 妈(mother). It also shows a pitch curve (in blue, ma3) for what someone saying 马(horse) might look like.</p>
            
          </div>
          <div id="4-tones">
            <h3>Transcribing pronuncation</h3>
            <p>Written Chinese is <emp>logographic</emp>, meaning that each character represents <emp>an idea</emp> and not <emp>a sound</emp> as in Latin script.</p>
            <p>Mandarin has 4 lexical tones; they are named 1, 2, 3, and 4. </p>
            <p><strong>So how do you know how to pronounce the words?</strong></p>
            <p>There is a system of transcribing the pronunciation of Chinese characters called <a href="https://en.wikipedia.org/wiki/Pinyin">Pinyin</a>. Offical Pinyin uses tone marks over the vowels of words, but these are special characters that can be difficult to produce quickly on a keyboard. A solution to this problem is to use the numbers of the tones at the end of the word. For example, 妈 can be transcribed as 'mā' or 'ma1'.</p>

          </div>
        </div>
    </section>
    <section id = "lesson-one-ref" class = "hide view-2 lesson sidebar">
        <div id = "ref-title"><h1>Lesson One</h1><hr>
            <h2>Instructions</h2>
            <p>When you're ready, press the play button and listen to the sound. Play it as many times as you need to, then select which pitch curve matches the tone you heard.</p>
            <h2>Remember</h2>
            <p>The <strong>first tone </strong>is high and sustained, <strong>second tone</strong> is rising from low to high, <strong>third tone</strong> falls to low then rises at the end, and <strong>fourth tone</strong> falls from high to low.</p>
        </div>
        <button type = "button" id = "btn-to-lesson" onclick = "closeActivity()">Return to Lesson</button>
        
    </section>
    <section id = "activity-one-prompt" class = "activity sidebar">
        <h1>Activity One</h1><hr>
        <h2>Distinguishing</h2>
        <p>In this activity, we'll play a sound and show you two tone curves. <br>Listen carefully, and choose which tone matches the sound.</p>
        <p>Are you ready to test what you learned with with this activity?</p>
        <button type = "button" onclick = "openActivity();" id = "begin-btn">Begin</button>
    
    </section>
    <section id = "activity-one" class = "hide view-2 activity">
        <div id = "ref-title"><h1>Activity One</h1><hr>
            <h2>Tonal Discrimination</h2>
        </div>
        <h3 id ="score"></h3>
         <div id = "stimuli">
             <audio controls id = "audio-clip" >
              <source id="audioSource" src="" type="audio/mpeg">
              Audio not working!
            </audio></div>
        <div id="firstResponse" class="response-wrap"></div>
        <div id="secondResponse" class="response-wrap"></div>
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
        <button type = "button" id = "continueButton">Continue</button>
    </section>

</div> <!-- end .main .container-one .LA -->
    
</div> <!-- end #main-wrap -->
<div id ="next-lesson">
    <a href ="Lesson2.php" id ="next-btn"><button >Next Lesson</button></a>
</div>    



    <script src="../js/jquery/jquery-3.3.1.min.js"></script>
    <script type="module" src="../js/displayFunctions.js"></script>
    <script type="module" src="../js/distinguishing.js"></script>


<?php include $prefix."foot.php"; ?>
