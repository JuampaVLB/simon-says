<?php

$server = 'mysql';
$username = 'root';
$password = '1234';
$database = 'simon_says';

$connection = new mysqli($server, $username, $password, $database, 3306);

if ($connection->connect_error) {
    die("La conexión a la base de datos falló: " . $connection->connect_error);
}

echo "Conexión exitosa";

?>
