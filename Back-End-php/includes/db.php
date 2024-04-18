<?php
try {
    $con = mysqli_init();
    mysqli_real_connect($con, "localhost", "root", "bleach123", "horus", 3306);
    if ($con->connect_error) {
        throw new Exception("Error de conexión a la base de datos: " . $con->connect_error);
    }
    mysqli_set_charset($con, "utf8");
} catch (Exception $e) {
    die("Error en la conexión a la base de datos: " . $e->getMessage());
}

?>