<?php
session_start();
include('../includes/db.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json');
    
    if (isset($_SESSION['usuario'])) {
        $id_usuario = $_SESSION['usuario']['id_usuario'];
        if (isset($_POST['folio'])) {
            $folio = $_POST['folio'];
            $instrucciones = $_POST['instrucciones'];

            $sql = "INSERT INTO Turno (Id_UsuarioEnvia, Folio, InstruccionGen, FechaGenerada) 
                    VALUES (?, ?, ?, NOW())";

            $stmt = mysqli_prepare($con, $sql);
            mysqli_stmt_bind_param($stmt, "iis", $id_usuario, $folio, $instrucciones);

            // Ejecutar la consulta
            if (mysqli_stmt_execute($stmt)) {
                // La inserción fue exitosa
                echo json_encode(array("success" => true, 'id' => mysqli_insert_id($con)));
            } else {
                // Error en la ejecución de la consulta
                echo json_encode(array("success" => false,"error" => 'Error al insertar los datos en la base de datos.'));
            }
            // Cerrar la conexión y liberar los recursos
            mysqli_stmt_close($stmt);
            mysqli_close($con);
        }else{
            echo json_encode(array("success" => false,"error" => 'No se recibieron los datos correctamente.'));
        }
    }
} else {
    // Si no se reciben datos mediante POST, devolver un mensaje de error
    echo json_encode(array("success" => false,"error" => 'No fue el metodo esperado.'));
}
?>
