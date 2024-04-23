<?php
session_start();
include('../includes/db.php');

if (isset($_SESSION['usuario'])) {

    $id_secretaria = $_SESSION['usuario']['id_secretaria'];
    $tipo = $_SESSION['usuario']['area'];

    $sql = "";

    if (strpos($tipo, 'Dirección') === 0) {
        $sql = "SELECT Id_SubDireccion, Nombre
            FROM SubDireccion
            WHERE Id_Direccion = ?";
    } elseif (strpos($tipo, 'SubDirección') === 0) {
        $sqlId = "SELECT Id_Direccion from SubDireccion where id_subdireccion=?";
        $stmtId = mysqli_prepare($con, $sqlId);
        mysqli_stmt_bind_param($stmtId, "i", $id_secretaria);
        mysqli_stmt_execute($stmtId);
        mysqli_stmt_bind_result($stmtId, $idDirec);
        if (mysqli_stmt_fetch($stmtId)) {
            mysqli_stmt_close($stmtId);
            $sql = "SELECT Id_Direccion, Nombre from Direccion where id_direccion=?
                UNION ALL
                SELECT Id_Jefatura, Nombre
                FROM Jefatura
                WHERE Id_SubDireccion = ?";
        } else {
            echo "No se encontró el Id de Dirección.";
            exit();
        }
    } elseif (strpos($tipo, 'Jefatura') === 0) {
        $sql = "SELECT Id_SubDireccion, Nombre
            FROM SubDireccion
            WHERE Id_SubDireccion = ?";
    } else {
        echo "No se tienen los registros en el formato necesario $tipo";
        exit();
    }
    $stmt = mysqli_prepare($con, $sql);

    if (strpos($tipo, 'SubDirección') === 0) {
        mysqli_stmt_bind_param($stmt, "ii", $idDirec, $id_secretaria);
    } else {
        mysqli_stmt_bind_param($stmt, "i", $id_secretaria);
    }

    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $id, $secretaria);

    $resultados = array();
    while (mysqli_stmt_fetch($stmt)) {
        $resultados[] = array('Id' => $id, 'Secretaria' => $secretaria);
    }
    mysqli_stmt_close($stmt);
    echo json_encode($resultados);
} else {
    echo "La sesión no está iniciada.";
}
