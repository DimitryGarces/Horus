<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include('../includes/db.php');
    if (isset($_SESSION['usuario'])) {
        $id_usuario = $_SESSION['usuario']['id_usuario'];
        $folio = $_POST['folio'];
        $instrucciones = $_POST['instrucciones'];

        $sql = "INSERT INTO Turno (Id_UsuarioEnvia, Folio, InstruccionGen, FechaGenerada) 
        VALUES (?, ?, ?, NOW())";

        $stmt = mysqli_prepare($con, $sql);

        mysqli_stmt_bind_param($stmt, "iis", $id_usuario, $folio, $instrucciones);

        if (mysqli_stmt_execute($stmt)) {
            header('Content-Type: application/json');
            echo json_encode(array('success' => true, 'id' => mysqli_insert_id($con)));
        } else {
            header('Content-Type: application/json');
            echo json_encode(array('error' => 'Error al insertar los datos en la base de datos.'));
        }

        mysqli_stmt_close($stmt);
        mysqli_close($con);
    }
} else {

    header('Content-Type: application/json');
    echo json_encode(array('success' => false, 'message' => 'No se recibieron datos POST'));
}
