<?php

function GenerateRandomSequence($length)
{
    $colors = ["red", "blue", "green", "yellow"];
    $sequence = [];

    for ($i = 0; $i < $length; $i++) {
        $sequence[] = $colors[array_rand($colors)];
    }

    return $sequence;
}

function CheckAnswer($arr1, $arr2)
{
    if ($arr1 == $arr2) {
        return true;
    } else {
        return false;
    }

}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $array1 = $data->array1;
    $array2 = $data->array2;

    $response = CheckAnswer($array1, $array2);
    echo json_encode($response);
}

if (isset($_GET['number'])) {
    $number = $_GET['number'];

    $resultado = GenerateRandomSequence(intval($number));
    echo json_encode($resultado);
}
?>
