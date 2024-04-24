<?php
session_start();
include('../includes/db.php');

if (isset($_SESSION['usuario'])) {

    $id_secretaria = $_SESSION['usuario']['id_dep'];
    $id_tipo = $_SESSION['usuario']['id_tipo'];
    $id_depsup = $_SESSION['usuario']['id_depSup'];
    $sql = "";
    $resultados = $resultados_extra = array();
    switch ($id_tipo) {
        case 1:
            $sql = "
            SELECT Id_Departamento, Nombre
            FROM Departamento
            WHERE Id_Tipo = 1 AND Id_Departamento != ?
            UNION ALL
            SELECT Id_Departamento, Nombre
            FROM Departamento
            WHERE Id_DepSup= ? AND Id_Departamento != ?
            ";
            break;
        case 2:
            $sqlId = "SELECT Id_Departamento, Nombre
            FROM Departamento
            WHERE Id_Departamento= ?;";
            $stmtId = mysqli_prepare($con, $sqlId);
            mysqli_stmt_bind_param($stmtId, "i", $id_depsup);
            mysqli_stmt_execute($stmtId);
            mysqli_stmt_bind_result($stmtId, $id2, $secretaria2);
            if (mysqli_stmt_fetch($stmtId)) {
                while (mysqli_stmt_fetch($stmtId)) {
                    $resultados_extra[] = array('Id' => $id2, 'Secretaria' => $secretaria2);
                }
                mysqli_stmt_close($stmtId);
                $sql = "SELECT Id_Departamento, Nombre
                FROM Departamento
                WHERE Id_DepSup= ? and Id_Departamento != ?;";
            } else {
                echo json_encode(array("error" => "No se encontró el Id de Dirección."));
                exit();
            }
            break;
        case 3:
            $sql = "SELECT Id_Departamento, Nombre
            FROM Departamento
            WHERE Id_Departamento= ? and Id_Departamento != ?;";
            break;
        default:
            echo json_encode(array("error" => "Hay algo extraño en tus datos $id_tipo"));
            exit();
    }
    $stmt = mysqli_prepare($con, $sql);
    switch ($id_tipo) {
        case 1:
            mysqli_stmt_bind_param($stmt, "iii", $id_secretaria, $id_secretaria,$id_secretaria);
            break;
        default:
            mysqli_stmt_bind_param($stmt, "ii", $id_secretaria, $id_secretaria);
        }

    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $id, $secretaria);

    while (mysqli_stmt_fetch($stmt)) {
        $resultados[] = array('Id' => $id, 'Secretaria' => $secretaria);
    }
    $resultados = array_merge($resultados, $resultados_extra);
    mysqli_stmt_close($stmt);
    echo json_encode($resultados);
} else {
    echo json_encode(array("error" => "La sesión no está iniciada."));
}
