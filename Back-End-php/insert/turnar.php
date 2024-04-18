<?php
// Verificar si se reciben datos mediante POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Incluir el archivo de conexión a la base de datos
    include('../includes/db.php');

    // Obtener los datos del formulario y de la sesion
    $idusuario = $_SESSION['id'];
    $folio = $_POST['folio'];
    $instrucciones = $_POST['instrucciones'];
    $fechagen = $_POST['fechagen'];

    // Definir la consulta SQL para insertar los datos en la tabla Situacion
    $sql = "INSERT INTO Turno (Id_UsuarioEnvia, Folio, Instrucciones, FechaGenerada) 
            VALUES (?, ?, ?, ?)";

    // Preparar la consulta
    $stmt = mysqli_prepare($con, $sql);

    // Valor manual para Id_Estatus
    $idEstatus = 1;

    // Vincular los parámetros
    // Vincular los parámetros
    mysqli_stmt_bind_param($stmt, "iiss", $idusuario, $folio, $instrucciones, $fechagen);

    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        // La inserción fue exitosa
        header('Content-Type: application/json');
        echo json_encode(array('success' => true));
    } else {
        // Error en la ejecución de la consulta
        header('Content-Type: application/json');
        echo json_encode(array('error' => 'Error al insertar los datos en la base de datos.'));
    }

    // Cerrar la conexión y liberar los recursos
    mysqli_stmt_close($stmt);
    mysqli_close($con);
} else {
    // Si no se reciben datos mediante POST, devolver un mensaje de error
    header('Content-Type: application/json');
    echo json_encode(array('success' => false, 'message' => 'No se recibieron datos POST'));
}
?>
