<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include('../includes/db.php');
    $Folio = $_POST['Folio'];
    $Mensaje = $_POST['Mensaje'];
    $Path = $_POST['Path'];
    $Id_Usuario = $_SESSION['usuario']['id_usuario'];

    $sql = "INSERT INTO Mensaje (Folio, Id_Usuario, Mensaje , Path) 
            VALUES (?, ?, ? , ?)";

    $stmt = mysqli_prepare($con, $sql);
    mysqli_stmt_bind_param($stmt, "iiss", $Folio, $Id_Usuario, $Mensaje, $Path);

    if (mysqli_stmt_execute($stmt)) {
        header('Content-Type: application/json');
        echo json_encode(array('success' => true, 'id' => mysqli_insert_id($con)));
    } else {
        header('Content-Type: application/json');
        echo json_encode(array('error' => 'Error al insertar los datos en la base de datos.'));
    }
    mysqli_stmt_close($stmt);
    mysqli_close($con);
} else {
    header('Content-Type: application/json');
    echo json_encode(array('success' => false, 'message' => 'No se recibieron datos POST'));
}
