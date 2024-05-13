<?php
session_start();
include('../includes/db.php');
$id = $_POST['turno'];
$sql = "
    SELECT s.path
    FROM Situacion AS s
    WHERE s.Folio = ?
    ";

$resultados = array();

$stmt = mysqli_prepare($con, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);

mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt, $Path);
if (mysqli_stmt_fetch($stmt)) {
    $resultados[] = array(
        'Path' => $Path
    );
}
mysqli_stmt_close($stmt);
echo json_encode($resultados);
