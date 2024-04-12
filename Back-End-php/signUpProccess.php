<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

session_start();

error_reporting(0);

session_unset();

session_destroy();

error_reporting(E_ALL);

ini_set('display_errors', 'On');

include ('includes/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $phone = $_POST['phone'];
    $age = $_POST['age'];
    $email = $_POST['email'];
    $curp = $_POST['curp'];
    $user = $_POST['user'];
    $password = $_POST['password'];
    try {
        $sql_busqueda_usuario = "SELECT Id_Datos
         FROM DatosPersonales
         WHERE Usuario = ?";


        $stmt_busqueda_usuario = mysqli_prepare($con, $sql_busqueda_usuario);

        mysqli_stmt_bind_param($stmt_busqueda_usuario, "s", $user);

        // Ejecuta la consulta para la existencia de usuario
        mysqli_stmt_execute($stmt_busqueda_usuario);

        // Almacena el resultado
        mysqli_stmt_store_result($stmt_busqueda_usuario);

        // Verifica si se encontró un usuario normal con las credenciales proporcionadas
        if (mysqli_stmt_num_rows($stmt_busqueda_usuario) == 1) {
            $userExist = true;
            header('Content-Type: application/json');
            echo json_encode(array('userExist' => $mensaje_error));
            exit();
        }

        // Consulta SQL para verificar la existencia de una curp registrada
        $sql_busqueda_curp = "SELECT Id_Datos
         FROM DatosPersonales
         WHERE Curp = ?";
        // Prepara la consulta para la busqueda de una curp
        $stmt_busqueda_curp = mysqli_prepare($con, $sql_busqueda_curp);

        // Vincula los parámetros
        mysqli_stmt_bind_param($stmt_busqueda_curp, "s", $curp);

        // Ejecuta la consulta para la existencia de una curp
        mysqli_stmt_execute($stmt_busqueda_curp);

        // Almacena el resultado
        mysqli_stmt_store_result($stmt_busqueda_curp);
        if (mysqli_stmt_num_rows($stmt_busqueda_curp) == 1) {
            $mensaje_error = "La curp proporcionada se encuentra vinculada a una cuenta existente.";
            header('Content-Type: application/json');
            echo json_encode(array('curpExist' => $mensaje_error));
            exit();
        }
        $sql_insertar_datos = "INSERT INTO DatosPersonales (Nombre, ApellidoP, Usuario, Contrasenia, Telefono, Edad, Curp, Correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt_insertar_datos = mysqli_prepare($con, $sql_insertar_datos);

        mysqli_stmt_bind_param($stmt_insertar_datos, "sssssiss", $firstName, $lastName, $user, $password, $phone, $age, $curp, $email);

        mysqli_stmt_execute($stmt_insertar_datos);

        $id_user_data = mysqli_insert_id($con);

        if (isset($id_user_data)) {

            $sql_insertar_usuario = "INSERT INTO Usuario (Id_Datos) VALUES (?)";

            $stmt_insertar_usuario = mysqli_prepare($con, $sql_insertar_usuario);

            mysqli_stmt_bind_param($stmt_insertar_usuario, "i", $id_user_data);

            mysqli_stmt_execute($stmt_insertar_usuario);
        }
        mysqli_stmt_close($stmt_busqueda_usuario);
        mysqli_stmt_close($stmt_busqueda_curp);
        mysqli_stmt_close($stmt_insertar_datos);
        mysqli_stmt_close($stmt_insertar_usuario);

        $_SESSION['success_message_r'] = "Registro exitoso";

        header('Content-Type: application/json');
        echo json_encode(array('registroExito' => $_SESSION['success_message_r']));
        exit();
    } catch (Exception $e) {
        die($e->getMessage());
    } finally {
        mysqli_close($con);
    }
}
?>