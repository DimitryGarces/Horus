<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $folio = $_POST['folio'];
    $fecha = date('d-m-Y');
    $hora = date('H-i-s');

    $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/HORUS/asuntos/";

    $fileName = basename($_FILES["archivo"]["name"]);
    $fileType = pathinfo($fileName, PATHINFO_EXTENSION);

    $uniqueFileName = $folio . '-' . $fecha . '-' . $hora . '.' . $fileType;
    $targetFilePath = $targetDir . $uniqueFileName;

    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    if (strtolower($fileType) == "pdf") {
        if (move_uploaded_file($_FILES["archivo"]["tmp_name"], $targetFilePath)) {
            header('Content-Type: application/json');
            echo json_encode(array('nombre' => $uniqueFileName));
        } else {
            header('Content-Type: application/json');
            echo json_encode(array('nombre' => null));
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(array('nombre' => null));
    }
}
?>
