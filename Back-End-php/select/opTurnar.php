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
    switch ($id_tipo) {
        case 4:
            $sql = "
            SELECT Id_Departamento, Nombre
            FROM Departamento
            WHERE Id_DepSup= ? AND Id_Departamento != ?
            ";
            break;
        case 1:
            $sql = "
            SELECT Id_Departamento, Nombre
            FROM Departamento
            WHERE (Id_Tipo = 4) 
            OR (Id_Tipo = 1 AND Id_Departamento != ? )
            OR (Id_DepSup= ? AND Id_Departamento !=  ?)
            ";
            break;
        case 2:
            $sql = "
            SELECT Id_Departamento, Nombre
            FROM Departamento
            WHERE (Id_Departamento= ? ) 
            OR (Id_DepSup= ? and Id_Departamento != ?)
            ";
            break;
        case 3:
            $sql = "
            SELECT Id_Departamento, Nombre
            FROM Departamento
            WHERE Id_Departamento= ? and Id_Departamento != ?
            ";
            break;
        default:
            echo json_encode(array("error" => "Hay algo extraño en tus datos $id_tipo"));
            exit();
    }
    $stmt = mysqli_prepare($con, $sql);
    switch ($id_tipo) {
        case 4:
            mysqli_stmt_bind_param($stmt, "ii", $id_secretaria, $id_secretaria);
            break;
        case 1:
            mysqli_stmt_bind_param($stmt, "iii", $id_secretaria, $id_secretaria, $id_secretaria);
            break;
        case 2:
            mysqli_stmt_bind_param($stmt, "iii", $id_depsup, $id_secretaria, $id_secretaria);
            break;
        default:
            mysqli_stmt_bind_param($stmt, "ii", $id_secretaria, $id_secretaria);
    }

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
