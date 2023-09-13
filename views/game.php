<?php

include '../controllers/connection.php';

$query = "SELECT * FROM scoreboard ORDER BY round DESC";
$resultado = $connection->query($query);
echo "ok";

if (!$resultado) {
    die("Error en la consulta " . mysqli_error($connection));
}

?>


<!DOCTYPE html>
<html>
<head>
    <title>Simón Dice Game</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="../assets/css/game.css">
</head>
<body>
    <div id="container">
        <div class="game">
        <div class="panels">
            <div class="panel" color="red"></div>
            <div class="panel" color="blue"></div>
            <div class="panel" color="green"></div>
            <div class="panel" color="yellow"></div>
            
        </div>
        <p class="counter">Round: <span id="number">0</span></p>
        <button class="start-button" id="start-button">Start</button>
        </div>
        <div class="table_container">
        <table class="table">
            <tr>
                <th>Place</th>
                <th>Nickname</th>
                <th>Points</th>
               
            </tr>
    <?php
    $index = 1;
    while ($fila = mysqli_fetch_assoc($resultado)) {
        ?>
                                <tr>
                                    <td><?php echo "#" . $index ?></td>
                                    <td><?php echo $fila["nickname"]; ?></td>
                                    <td><?php echo $fila["round"]; ?></td>               
                                </tr>
                        <?php $index++;
    } ?>
        </table>
    </div>
    <audio src="../assets/707-clap.wav" id="sound"></audio>
    <script src="../assets/main.js"></script>
</body>
</html>