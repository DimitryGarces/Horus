<?php
session_start();

// Establecer el encabezado Content-Type
header('Content-Type: application/json');

// Verificar si la solicitud es GET y si existe la cookie 'horus'
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Verificar si existe una sesión de usuario
    if (isset($_SESSION['usuario'])) {
        // Si hay una sesión de usuario, enviar una respuesta JSON con autenticado como verdadero y los datos del usuario
        echo json_encode(array('autenticado' => true, 'usuario' => $_SESSION['usuario']));
    } else {
        // Si no hay una sesión de usuario, enviar una respuesta JSON con autenticado como falso
        echo json_encode(array('autenticado' => false));
    }
}
