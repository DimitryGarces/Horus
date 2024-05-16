<?php
session_start();
include('../includes/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['turno'])) {
        $folio = $_POST['turno'];
        $id = $_SESSION['usuario']['id_dep'];
        $sql = "
        SELECT s.remitente, s.asunto, s.fecha_recibida, t.InstruccionGen , dt.instruccionInd, s.folio
        FROM Situacion as s
        INNER JOIN Turno as t on t.Folio = s.Folio 
        INNER JOIN DepTurnada AS dt on dt.Id_Turno = t.Id_Turno
        WHERE dt.Id_Departamento = ? AND s.Folio = ?
        ";

        $stmt = mysqli_prepare($con, $sql);
        mysqli_stmt_bind_param($stmt, "ii", $id, $folio);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $remitente, $asunto, $fechaRecibida, $instruccionGen, $instruccionInd, $folio);

        $resultados = array();
        if (mysqli_stmt_fetch($stmt)) {
            $resultados[] = array(
                'remitente' => $remitente,
                'asunto' => $asunto,
                'fecha' => $fechaRecibida,
                'insGen' => $instruccionGen,
                'insInd' => $instruccionInd,
                'folio' => $folio
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
