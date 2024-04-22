<?php
session_start();

header('Content-Type: application/json');
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_SESSION['usuario'])) {
        echo json_encode(array('autenticado' => true, 'usuario' => $_SESSION['usuario']));
    } else {
        echo json_encode(array('autenticado' => false));
    }
}
