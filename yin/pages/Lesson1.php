<?php
$title = "Yin - Lesson One";
$style = "../css/style.css";
$style2 = "../css/LAstyle.css";
include "../head.php";
?>

<div class = "main container-one">
    <section id = "lesson-one" class = "lesson">
        <h1>Lesson One: Lexical Tones</h1>
        <p>Lexical tones are changes in pitch that change the meaning of a word.</p>
        <p>For example, the two words 妈 and 马 are both pronounced "ma", but the
          first means 'mother' and the second means 'horse'. The difference comes
          in their tone. The first word, 妈 has a high, sustained tone, almost like
          singing a note. The second word, 马 has a tone that falls, then rises,
          almost like a question in English.</p>
        <h2>Examples of words distinguished by tones</h2>
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

            <p>This graph shows what a pitch curve (in red) might look like for someone saying 妈(mother). It also shows a pitch curve (in blue) for what someone saying 马(horse) might look like.</p>
            <script type="text/javascript" src="../js/drawPitchGraph.js"></script>
          </div>
          <div id="4-tones">
            <h2>Transcribing pronuncation</h2>
            <p>Written Chinese is <emp>logographic</emp>, meaning that each character represents <emp>an idea</emp> and not <emp>a sound</emp> as in Latin script.</p>
            <p>Mandarin has 4 lexical tones; they are named 1, 2, 3, and 4. </p>
            <p><strong>So how do you know how to pronounce the words?</strong></p>
            <p>There is a system of transcribing the pronunciation of Chinese characters called <a href="https://en.wikipedia.org/wiki/Pinyin">Pinyin</a>. Offical Pinyin uses tone marks over the vowels of words, but these are special characters that can be difficult to produce quickly on a keyboard. A solution to this problem is to use the numbers of the tones at the end of the word. For example, 妈 can be transcribed as 'mā' or 'ma1'.</p>

          </div>
        </div>
    </section>
    <section id = "activity-one" class = "activity">
        <h1>Activity One</h1>
        <p>Are you ready to test what you learned with an activity?</p>
    
    </section>


</div>

<div>
<p>footer</p>
</div>
</body>