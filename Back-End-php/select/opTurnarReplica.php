<?php
session_start();
include('../includes/db.php');

if (isset($_SESSION['usuario'])) {

    $id_secretaria = $_SESSION['usuario']['id_dep'];
    $id_tipo = $_SESSION['usuario']['id_tipo'];
    $id_depsup = $_SESSION['usuario']['id_depSup'];
    $sql = "";
    $resultados = array();
    $resultados_extra = array();
    $sql = "
            SELECT Id_Departamento, Nombre
            FROM Departamento
            WHERE Id_DepSup= ? AND Id_Departamento != ?
            ";
    $stmt = mysqli_prepare($con, $sql);
    mysqli_stmt_bind_param($stmt, "ii", $id_secretaria, $id_secretaria);

    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $id, $secretaria);

    while (mysqli_stmt_fetch($stmt)) {
        $resultados[] = array('Id' => $id, 'Secretaria' => $secretaria);
    }
    $res = array_merge($resultados, $resultados_extra);
    mysqli_stmt_close($stmt);
    echo json_encode($res);
} else {
    echo json_encode(array("error" => "La sesión no está iniciada."));
}
