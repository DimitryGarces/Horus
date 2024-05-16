<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include('../includes/db.php');

    $folio = $_POST['folio'];

    $sql = "SELECT dep.nombre, m.mensaje, m.path 
    FROM mensaje as m INNER JOIN usuario as u ON m.id_usuario = u.id_usuario
    INNER JOIN departamento as dep ON dep.id_departamento = u.id_departamento WHERE m.folio = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param('i', $folio);
    $stmt->execute();
    $result = $stmt->get_result();

    $mensajes = [];
    while ($row = $result->fetch_assoc()) {
        $mensajes[] = $row;
    }

    $stmt->close();
    $con->close();
    header('Content-Type: application/json');
    echo json_encode($mensajes);
}
