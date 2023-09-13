<?php
function InsertScore($nickname, $round)
{
    include("./connection.php");

    $sql = "INSERT INTO scoreboard (nickname, round) VALUES ('$nickname', '$round')";

    if (mysqli_query($connection, $sql)) {
        return true;
    } else {
        return false;
    }

}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $nickname = $data->nickname;
    $round = $data->round;

    $response = InsertScore($nickname, $round);
    echo json_decode($response);
}

?>