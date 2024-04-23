<?php
include('../includes/db.php');

// Realizar una consulta para obtener los servicios disponibles ordenados alfabéticamente por nombre
$sql = "SELECT Id_Servicio, Nombre FROM Servicio ORDER BY Nombre";
mysqli_set_charset($con, "utf8");

$resultado = mysqli_query($con, $sql);

// Comprobar si hay resultados
if (mysqli_num_rows($resultado) > 0) {
    // Iniciar el menú desplegable<select class="form-select form-select-sm" aria-label="Small select example">
    echo '<select class="form-control" name="servicio" id="servicio">';
    echo '<option selected>Elige el servicio más relacionado al asunto</option>';
    
    // Iterar sobre los resultados y generar las opciones del menú
    while ($fila = mysqli_fetch_assoc($resultado)) {
        echo '<option value="' . $fila['Id_Servicio'] . '">' . $fila['Nombre'] . '</option>';
    }
    
    // Cerrar el menú desplegable
    echo '</select>';
} else {
    // Si no hay servicios disponibles, mostrar un mensaje
    echo 'No hay servicios disponibles';
}
?>
