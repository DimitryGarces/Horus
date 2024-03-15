<?php
// Obtener datos enviados desde JavaScript
$data = json_decode(file_get_contents("php://input"), true);

// Conectar a la base de datos
$servername = "localhost";
$username = "root";
$password = "Bleach123";
$dbname = "horus";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Insertar datos en la tabla Gabinete, Direccion y SubDireccion
foreach ($data as $gabinete) {
    // Insertar en la tabla Gabinete y obtener su Id_Gabinete generado automáticamente
    $nombreGabinete = $gabinete["Nombre"];
    $sql = "INSERT INTO Gabinete (Nombre) VALUES ('$nombreGabinete')";
    $conn->query($sql);
    $idGabinete = $conn->insert_id;

    // Insertar en la tabla Direccion
    foreach ($gabinete["Direcciones"] as $direccion) {
        $nombreDireccion = $direccion["Nombre"];
        $sql = "INSERT INTO Direccion (Id_Gabinete, Nombre) VALUES ($idGabinete, '$nombreDireccion')";
        $conn->query($sql);
        $idDireccion = $conn->insert_id;

    }
}

// Cerrar conexión
$conn->close();

echo "Datos insertados correctamente";
?>
