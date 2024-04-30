<?php
session_start();
include('../includes/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['turno'])) {
        $folio = $_POST['turno'];
        $sql = "
        SELECT s.remitente, s.fecha_recibida, s.fecha_vencimiento, s.path
        FROM Situacion as s
        WHERE s.Folio = ?
        ";

        $stmt = mysqli_prepare($con, $sql);
        mysqli_stmt_bind_param($stmt, "i", $folio);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $remitente, $fechaRecibida, $fechaVencimiento, $path);

        $resultados = array();
        if (mysqli_stmt_fetch($stmt)) {
            $resultados[] = array(
                'remitente' => $remitente,
                'fecha' => $fechaRecibida,
                'fechaV' => $fechaVencimiento,
                'path' => $path
            );
        }
        mysqli_stmt_close($stmt);
        echo json_encode($resultados);
    } else {
        echo json_encode(array("error" => "No se proporcionó un folio."));
    }
} else {
    echo json_encode(array("error" => "Error externo."));
}
?>
