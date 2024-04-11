<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

session_start();

// Desactiva la generación de advertencias y errores
error_reporting(0);

// Desvincular todas las variables de sesión
session_unset();

// Cierra la sesión
session_destroy();

// Habilita la generación de todas las advertencias y errores
error_reporting(E_ALL);

ini_set('display_errors', 'On');

// Incluye la conexión a la base de datos desde db.php
include ('includes/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtén los valores del formulario
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $phone = $_POST['phone'];
    $age = $_POST['age'];
    $email = $_POST['email'];
    $curp = $_POST['curp'];
    $user = $_POST['user'];
    $password = $_POST['password'];
    try {
        // Consulta SQL para verificar la existencia de un usuario
        $sql_busqueda_usuario = "SELECT Id_Datos
         FROM DatosPersonales
         WHERE Usuario = ?";

        // Prepara la consulta para el usuario
        $stmt_busqueda_usuario = mysqli_prepare($con, $sql_busqueda_usuario);

        // Vincula los parámetros
        mysqli_stmt_bind_param($stmt_busqueda_usuario, "s", $user);

        // Ejecuta la consulta para la existencia de usuario
        mysqli_stmt_execute($stmt_busqueda_usuario);

        // Almacena el resultado
        mysqli_stmt_store_result($stmt_busqueda_usuario);

        // Verifica si se encontró un usuario normal con las credenciales proporcionadas
        if (mysqli_stmt_num_rows($stmt_busqueda_usuario) == 1) {
            // Credenciales válidas para usuario normal, pide que use otro usuario
            // Devuelve la respuesta en formato JSON
            //$mensaje_error = "Ya existe ese usuario, intente con otro.";
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

        // Verifica si se encontró una curp con las credenciales proporcionadas
        if (mysqli_stmt_num_rows($stmt_busqueda_curp) == 1) {
            // Credenciales válidas para la curp, menciona que ya existe un usuario con esa curp
            // Devuelve la respuesta en formato JSON
            $mensaje_error = "La curp proporcionada se encuentra vinculada a una cuenta existente.";
            header('Content-Type: application/json');
            echo json_encode(array('curpExist' => $mensaje_error));
            exit();
        }

        // Ahora que hemos verificado que el usuario y la CURP no existen, procedemos con la inserción
        // Consulta SQL para insertar datos en la tabla DatosPersonales
        $sql_insertar_datos = "INSERT INTO DatosPersonales (Nombre, ApellidoP, Usuario, Contrasenia, Telefono, Edad, Curp, Correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        // Prepara la consulta para la inserción
        $stmt_insertar_datos = mysqli_prepare($con, $sql_insertar_datos);

        // Vincula los parámetros
        mysqli_stmt_bind_param($stmt_insertar_datos, "sssssiss", $firstName, $lastName, $user, $password, $phone, $age, $curp, $email);

        // Ejecuta la consulta de inserción
        mysqli_stmt_execute($stmt_insertar_datos);

        // Obtiene el ID generado para el usuario
        $id_user_data = mysqli_insert_id($con);

        // Ahora puedes usar $usuario_id para insertar en la tabla Usuario
        if (isset($id_user_data)) {
            // Consulta SQL para insertar datos en la tabla Usuario
            $sql_insertar_usuario = "INSERT INTO Usuario (Id_Datos) VALUES (?)";

            // Prepara la consulta para la inserción
            $stmt_insertar_usuario = mysqli_prepare($con, $sql_insertar_usuario);

            // Vincula los parámetros
            mysqli_stmt_bind_param($stmt_insertar_usuario, "i", $id_user_data);

            // Ejecuta la consulta de inserción
            mysqli_stmt_execute($stmt_insertar_usuario);
        }

        // Cierra las consultas preparadas
        mysqli_stmt_close($stmt_busqueda_usuario);
        mysqli_stmt_close($stmt_busqueda_curp);
        mysqli_stmt_close($stmt_insertar_datos);
        mysqli_stmt_close($stmt_insertar_usuario);

        $_SESSION['success_message_r'] = "Registro exitoso";
        // Devuelve la respuesta en formato JSON
        header('Content-Type: application/json');
        echo json_encode(array('registroExito' => $_SESSION['success_message_r']));
        exit();
    } catch (Exception $e) {
        // Manejar la excepción de la base de datos, por ejemplo, registrándola o mostrándola
        die($e->getMessage());
    } finally {
        // Cierra la conexión a la base de datos
        mysqli_close($con);
    }
}
?>