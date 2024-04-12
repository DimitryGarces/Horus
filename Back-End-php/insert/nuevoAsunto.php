<?php
// Verificar si se reciben datos mediante POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Incluir el archivo de conexión a la base de datos
    include('./includes/db.php');

    // Obtener los datos del formulario
    $asunto = $_POST['asunto'];
    $remitente = $_POST['remitente'];
    $procedencia = $_POST['procedencia'];
    $fechaRecibida = $_POST['fechaRecibida'];
    $fechaVencimiento = $_POST['fechaVencimiento'];
    $prioridad = $_POST['prioridad'];

    // Definir la consulta SQL para insertar los datos en la tabla Situacion
    $sql = "INSERT INTO Situacion (Id_Prioridad, Id_Estatus, Id_Procedencia, Remitente, Asunto, Fecha_Recibida, Fecha_Vencimiento, Path) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Preparar la consulta
    $stmt = mysqli_prepare($con, $sql);

    // Valor manual para Id_Estatus
    $idEstatus = 1;

    // Vincular los parámetros
    mysqli_stmt_bind_param($stmt, "iiissss", $prioridad, $idEstatus, $procedencia, $remitente, $asunto, $fechaRecibida, $fechaVencimiento, $path);

    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        // La inserción fue exitosa
        echo json_encode(array('success' => true));
    } else {
        // Error en la ejecución de la consulta
        echo json_encode(array('error' => 'Error al insertar los datos en la base de datos.'));
    }

    // Cerrar la conexión y liberar los recursos
    mysqli_stmt_close($stmt);
    mysqli_close($con);
} else {
    // Si no se reciben datos mediante POST, devolver un mensaje de error
    echo json_encode(array('success' => false, 'message' => 'No se recibieron datos POST'));
}
