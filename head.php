<!DOCTYPE html>
<html>
  <head>
      <title><?php echo $title ?></title>
      <meta charset="utf-16">
      <link rel = "stylesheet" href = "<?php echo $style ?>" type = "text/css">
      <link rel = "stylesheet" href = "<?php echo $style2 ?>" type = "text/css">
      <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400,500|Open+Sans:400,400i,700" rel="stylesheet">
       <script src = "../js/pageInteractions.js"></script>
  </head>
    
<body>
    
    <a href = "<?php echo $prefix ?>index.php"><img id="logo" src="../assets/images/yinLogo.png" /></a>
      <nav>
        <ul>
            <li><a href = "<?php echo $prefix ?>pages/About.php" class ="<?php echo $aboutClass ?>">About</a></li>
            <li><a href = "<?php echo $prefix ?>pages/LessonsAndActivities.php" class ="<?php echo $LAClass ?>">Lessons and Activities</a></li>
            <li><a href = "<?php echo $prefix ?>index.php" class ="<?php echo $indexClass ?>"> Home</a></li>
        </ul>
      </nav>