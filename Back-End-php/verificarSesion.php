<?php
session_start();

if(isset($_SESSION['usuario'])) {
    // El usuario está autenticado
    header('Content-Type: application/json');
    echo json_encode(array('autenticado' => true, 'usuario' => $_SESSION['usuario']));
} else {
    // El usuario no está autenticado
    header('Content-Type: application/json');
    echo json_encode(array('autenticado' => false));
}
?>
