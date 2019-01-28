<?php
    $path = 'uploads/';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        move_uploaded_file($_POST["audioData"], $path);
    }

?>