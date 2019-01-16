<?php
$title = "Yin - Lesson One";
$style = "../css/style.css";
$style2 = "../css/LADirectoryStyle.css";
$prefix = "../";
include "../head.php";
?>

<div class = "main honeycomb">
    <div id = "one" class = "comb">
        <div class = "invisible">
            <h1 class = "head"><a href ="Lesson1.php">One</a></h1>
            <p class = "desc">Lesson: Lexical tones<br>Activity: Tone distinguishing</p>
            </div>
        


<!--
        <div class = "L-head">
        <h2>Lesson One</h2>
        </div>
        <div class = "A-head">
        <h2>Activity One</h2>
        </div>
-->
    </div>
    <div id = "two" class = "comb">
        <div class = "invisible">
            <a href="Lesson2.php">
            <h1 class = "head"><a href ="Lesson2.php">Two</a></h1>
            <p class = "desc">Lesson: Tone characteristics<br>Activity: Tone identification</p></a>
        </div>
<!--
        <div class = "L-head">
        <h2 >Lesson Two</h2>
        </div>
        <div class = "A-head">    
        <h2>Activity Two</h2>
        </div>
-->
    </div>
    <div id = "three" class = "comb">
        <div class = "invisible">
            <h1 class = "head">Three</h1>
            <p class = "desc">Lesson: Relative tones<br>Activity: Tone mimicking</p>
        </div>
<!--
        <div class = "L-head">
        <h2>Lesson Three</h2>
        </div>
        <div class = "A-head">
        <h2>Activity Three</h2>
        </div>
-->
    </div>
    <div id = "four" class = "comb">
        <div class = "invisible">
            <h1 class = "head">Four</h1>
            <p class = "desc">Lesson: Tone initials and finals<br>Activity: Tone production</p>
        </div>
<!--
        <div class = "L-head">
        <h2>Lesson Four</h2>
        </div>
        <div class = "A-head">
        <h2>Activity Four</h2>
        </div>
-->
    </div>



</div>
<script src="../js/jquery/jquery-3.3.1.min.js">

</script>

<script>
    $(".invisible").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});
</script>
    
</body>
    
    
</html>
