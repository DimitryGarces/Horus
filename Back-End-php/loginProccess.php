<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
session_start();
error_reporting(0);
ini_set('display_errors', 'Off');

include('includes/db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre_usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];
    try {
        $sql = "SELECT 
            Id_Usuario,
            Id_Departamento,
            Id_DepSup,
            Departamento,
            Id_Tipo
        FROM UsuarioCompleto
        WHERE Usuario = ? 
        AND Contrasenia = ?";

        $stmt = mysqli_prepare($con, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $nombre_usuario, $contrasena);
        mysqli_stmt_execute($stmt);

        mysqli_stmt_bind_result($stmt, $id_usuario, $id_departamento,$id_depSup,$dep, $id_tipo);
        // **Verificación de existencia de usuario**
        if (mysqli_stmt_fetch($stmt)) {
            $_SESSION['usuario'] = array(
                'id_usuario' => $id_usuario,
                'usuario' => $nombre_usuario,
                'id_dep' => $id_departamento,
                'id_depSup' => $id_depSup,
                'dep' => $dep,
                'id_tipo' => $id_tipo
            );
            $session_set = true;
            echo $id_usuario . '-' . $nombre_usuario . '-' . $dep;
        } else {
            $session_set = false;
            echo 'Credenciales incorrectas. Intente nuevamente.';
        }
        mysqli_stmt_close($stmt);
    } catch (Exception $e) {
        $session_set = false;
        echo 'Base de Datos en Mantenimiento. Por favor, inténtelo de nuevo más tarde.';
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_COOKIE['horus'])) {
        try {
            $digest = $_COOKIE['horus'];
            $sql_cookie = "SELECT DatosUsuario.Usuario 
            FROM Usuario
            INNER JOIN DatosUsuario ON Usuario.Id_DatosU = DatosUsuario.Id_DatosU
             WHERE reloginDigest = ?";
            $stmt_cookie = mysqli_prepare($con, $sql_cookie);
            mysqli_stmt_bind_param($stmt_cookie, "s", $digest);
            mysqli_stmt_execute($stmt_cookie);

            mysqli_stmt_bind_result($stmt_cookie, $usuario);
            if (mysqli_stmt_fetch($stmt_cookie)) {
                mysqli_stmt_close($stmt_cookie);
                $sql_completo = "SELECT 
                Id_Usuario,
                Id_Departamento,
                Id_DepSup,
                Departamento,
                Id_Tipo
                FROM UsuarioCompleto
                WHERE Usuario = ? ";
                $stmt_completo = mysqli_prepare($con, $sql_completo);
                mysqli_stmt_bind_param($stmt_completo, "s", $usuario);
                mysqli_stmt_execute($stmt_completo);
                mysqli_stmt_bind_result($stmt, $id_usuario, $id_departamento,$id_depSup,$dep, $id_tipo);
                if (mysqli_stmt_fetch($stmt_completo)) {
                    $_SESSION['usuario'] = array(
                        'id_usuario' => $id_usuario,
                        'usuario' => $nombre_usuario,
                        'id_dep' => $id_departamento,
                        'id_depSup' => $id_depSup,
                        'dep' => $dep,
                        'id_tipo' => $id_tipo
                    );
                    $session_set = true;
                    echo json_encode(array('session_u' => true));
                } else {
                    $session_set = false;
                    echo json_encode(array('session_u' => false, 'error' => 'Algo salio mal.: ' . $nombre));
                }
                mysqli_stmt_close($stmt_completo);
            } else {
                $session_set = false;
                echo json_encode(array('session_u' => false, 'error' => 'La cookie de sesión no es válida: ' . $digest));
            }
        } catch (Exception $e) {
            $session_set = false;
            header('Content-Type: application/json');
            echo json_encode(array('session_u' => false, 'error' => 'Error. Por favor, inténtelo de nuevo más tarde.'));
        }
    } else {
        $session_set = false;
        echo json_encode(array('session_u' => false, 'error' => 'La cookie \'horus\' no está presente.'));
    }
}
