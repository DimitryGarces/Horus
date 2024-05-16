<?php
session_start();
include('../includes/db.php');

if (isset($_SESSION['usuario'])) {
    // Recuperar el ID del departamento del usuario de la sesión
    $id = $_SESSION['usuario']['id_dep'];

    // Consulta SQL para obtener los turnos recibidos por el departamento del usuario
    $sql = "
    SELECT t.folio, u.Departamento, s.asunto, s.Fecha_Vencimiento
    FROM DepTurnada AS dt
    INNER JOIN Turno AS t ON dt.Id_Turno = t.Id_Turno
    INNER JOIN Situacion AS s ON t.folio = s.folio 
    INNER JOIN usuariocompleto AS u ON t.Id_UsuarioEnvia = u.Id_Usuario 
    WHERE dt.Id_Departamento = ? AND s.Fecha_Finalizacion IS NULL
    ";

    // Inicializar un array para almacenar los resultados de la consulta
    $resultados = array();

    // Preparar la consulta
    $stmt = mysqli_prepare($con, $sql);
    // Vincular el parámetro de ID del departamento
    mysqli_stmt_bind_param($stmt, "i", $id);
    // Ejecutar la consulta
    mysqli_stmt_execute($stmt);
    // Vincular las columnas de resultados a variables
    mysqli_stmt_bind_result($stmt, $folio, $Departamento, $asunto, $tiempo);
    // Recorrer los resultados y almacenarlos en el array
    while (mysqli_stmt_fetch($stmt)) {
        $resultados[] = array(
            'Folio' => $folio,
            'Departamento' => $Departamento,
            'Asunto' => $asunto,
            'Tiempo' => $tiempo
        );
    }
    // Cerrar la consulta preparada
    mysqli_stmt_close($stmt);
    // Devolver los resultados como JSON
    echo json_encode($resultados);
} else {
    // La sesión no está iniciada
    echo json_encode(array("error" => "La sesión no está iniciada."));
}
