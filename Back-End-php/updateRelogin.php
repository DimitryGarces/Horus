<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
error_reporting(0);
ini_set('display_errors', 'Off');

include('includes/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_usuario = $_POST['id_usuario'];
    $digest = $_POST['digest'];
    try {
        $sql_update = "UPDATE Usuario SET reloginDigest=? WHERE Id_Usuario=?";
        $stmt_update = mysqli_prepare($con, $sql_update);
        mysqli_stmt_bind_param($stmt_update, "si", $digest, $id_usuario);
        mysqli_stmt_execute($stmt_update);
        echo json_encode(array('success' => true, 'message' => 'Digest actualizado correctamente.'));
    } catch (Exception $e) {
        echo json_encode(array('success' => false, 'message' => 'Error al actualizar el digest: ' . $e->getMessage()));
    }
} else {
    echo json_encode(array('success' => false, 'message' => 'Los datos del formulario no se han recibido correctamente.'));
}
?>
