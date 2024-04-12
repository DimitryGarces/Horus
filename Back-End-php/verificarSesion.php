<?php
session_start();

if(isset($_SESSION['usuario'])) {
    header('Content-Type: application/json');
    echo json_encode(array('autenticado' => true, 'usuario' => $_SESSION['usuario']));
} else {
    header('Content-Type: application/json');
    echo json_encode(array('autenticado' => false));
}
?>
