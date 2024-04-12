<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
session_start();
$session_set = false;

error_reporting(0);
ini_set('display_errors', 'Off');

include('includes/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_usuario = $_POST['usuario'];
    $contraseña = $_POST['contrasena'];
    try {
        $sql  = "SELECT Usuario.Id_Usuario
                        FROM Usuario
                        INNER JOIN DatosUsuario ON Usuario.Id_DatosU = DatosUsuario.Id_DatosU
                        WHERE DatosUsuario.Usuario = ? 
                        AND DatosUsuario.Contrasenia = ?";
        $stmt = mysqli_prepare($con, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $nombre_usuario, $contraseña);
        mysqli_stmt_execute($stmt);

        mysqli_stmt_bind_result($stmt, $id_usuario);
        // **Verificación de existencia de usuario**
        if (mysqli_stmt_fetch($stmt)) {
            mysqli_stmt_close($stmt);
            $_SESSION['usuario'] = array(
                'id' => $id_usuario,
                'nombre' => $nombre
            );
            $session_set = true;
            header('Content-Type: application/json');
            echo json_encode(array('session_u' => $session_set, 'id_usuario' => $id_usuario));
        } else {
            mysqli_stmt_close($stmt);
            header('Content-Type: application/json');
            echo json_encode(array('error' => 'Credenciales incorrectas. Intente nuevamente.'));
        }
    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode(array('error' => 'Base de Datos en Mantenimiento. Por favor, inténtelo de nuevo más tarde.'));
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_COOKIE['horus'])) {
        try {
            $digest = $_COOKIE['horus'];
            $sql_cookie = "SELECT Usuario.Id_Usuario, DatosUsuario.Nombre 
            FROM Usuario
            INNER JOIN DatosUsuario ON Usuario.Id_DatosU = DatosUsuario.Id_DatosU
             WHERE reloginDigest = ?";
            $stmt_cookie = mysqli_prepare($con, $sql_cookie);
            mysqli_stmt_bind_param($stmt_cookie, "s", $digest);
            mysqli_stmt_execute($stmt_cookie);

            mysqli_stmt_bind_result($stmt_cookie, $id_usuario, $nombre);
            if (mysqli_stmt_fetch($stmt_cookie)) {
                $_SESSION['usuario'] = array(
                    'id' => $id_usuario,
                    'nombre' => $nombre
                );
                echo json_encode(array('session_u' => true));
            } else {
                echo json_encode(array('session_u' => false, 'error' => 'La cookie de sesión no es válida: ' . $digest));
            }
            mysqli_stmt_close($stmt_cookie);
        } catch (Exception $e) {
            header('Content-Type: application/json');
            echo json_encode(array('session_u' => false, 'error' => 'Error. Por favor, inténtelo de nuevo más tarde.'));
        }
    } else {
        // La cookie 'horus' no existe
        echo json_encode(array('session_u' => false, 'error' => 'La cookie \'horus\' no está presente.'));
    }
}
