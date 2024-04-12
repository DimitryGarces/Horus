<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $folio = $_POST['folio'];
    $fecha = date('d-m-Y');

    $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/HORUS/asuntos/";

    $fileName = basename($_FILES["archivo"]["name"]);
    $fileType = pathinfo($fileName, PATHINFO_EXTENSION);

    // Generar un nombre único para el archivo
    $uniqueFileName = $folio . '-' . $fecha . '.' . $fileType;
    $targetFilePath = $targetDir . $uniqueFileName;

    // Verificar si el directorio de destino existe, si no, crearlo
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
