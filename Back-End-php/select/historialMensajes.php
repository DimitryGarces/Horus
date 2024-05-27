<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include('../includes/db.php');

    $folio = $_POST['folio'];

    // Consulta para obtener los mensajes
    $sqlMensajes = "SELECT dep.nombre, m.mensaje, m.path 
                    FROM mensaje as m 
                    INNER JOIN usuario as u ON m.id_usuario = u.id_usuario
                    INNER JOIN departamento as dep ON dep.id_departamento = u.id_departamento 
                    WHERE m.folio = ?";
    $stmtMensajes = $con->prepare($sqlMensajes);
    $stmtMensajes->bind_param('i', $folio);
    $stmtMensajes->execute();
    $resultMensajes = $stmtMensajes->get_result();

    $mensajes = [];
    while ($row = $resultMensajes->fetch_assoc()) {
        $mensajes[] = $row;
    }

    // Consulta para obtener el ID del usuario más antiguo
    $sqlPropio = "SELECT t.Id_UsuarioEnvia 
                  FROM turno as t
                  WHERE t.folio = ?
                  ORDER BY t.FechaGenerada ASC 
                  LIMIT 1";
    $stmtPropio = $con->prepare($sqlPropio);
    $stmtPropio->bind_param('i', $folio);
    $stmtPropio->execute();
    $resultPropio = $stmtPropio->get_result();

    $mostrarBotonBaja = false;
    if ($row = $resultPropio->fetch_assoc()) {
        $idUsuarioMasAntiguo = $row['Id_UsuarioEnvia'];

        session_start();
        if (isset($_SESSION['usuario']['id_usuario']) && $_SESSION['usuario']['id_usuario'] == $idUsuarioMasAntiguo) {
            $mostrarBotonBaja = true;
        }
    }

    // Cerrar conexiones y enviar respuesta
    $stmtMensajes->close();
    $stmtPropio->close();
    $con->close();
    header('Content-Type: application/json');

    echo json_encode([
        'mostrarBotonBaja' => $mostrarBotonBaja,
        'mensajes' => $mensajes
    ]);
}
