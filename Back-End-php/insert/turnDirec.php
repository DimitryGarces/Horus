<?php
session_start();
include('../includes/db.php');
// Verificar si se reciben datos mediante POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id_departamento = $_POST['id_departamento'];
    $id_folio = $_POST['id_folio'];
    $instInd = $_POST['instInd'];

    // Definir la consulta SQL para insertar los datos en la tabla Situacion
    $sql = "INSERT INTO DepTurnada (id_departamento, id_turno, instruccionInd) 
            VALUES (?, ?, ?)";

    // Preparar la consulta
    $stmt = mysqli_prepare($con, $sql);

    mysqli_stmt_bind_param($stmt, "iis", $id_departamento, $id_folio, $instInd);

    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        $inserted_id = mysqli_insert_id($con);
        // La inserción fue exitosa
        header('Content-Type: application/json');
        echo json_encode(array('success' => true, 'inserted_id' => $inserted_id));
    } else {
        // Error en la ejecución de la consulta
        header('Content-Type: application/json');
        echo json_encode(array("success" => false,"error" => 'Error al insertar los datos en la base de datos.'));
    }
    // Cerrar la conexión y liberar los recursos
    mysqli_stmt_close($stmt);
} else {
    // Si no se reciben datos mediante POST, devolver un mensaje de error
    header('Content-Type: application/json');
    echo json_encode(array('success' => false, 'message' => 'No se recibieron datos POST'));
}
?>
