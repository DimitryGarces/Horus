function buscarNombrePorId(id, direcciones) {
    const direccion = direcciones.find(dir => dir.id === id);
    return direccion ? direccion.nombre : 'Bienvenido';
}
function cambiarNombreEnDiv(nombre) {
    const nombreDiv = document.querySelector('direccion');

    let etiqueta;
    if (nombre.length > 30) {
        etiqueta = 'h4';
    } else if (nombre.length > 15) {
        etiqueta = 'h3';
    } else {
        etiqueta = 'h1';
    }

    // Actualizar el contenido con la nueva etiqueta
    nombreDiv.innerHTML = `<${etiqueta}>${nombre} ${username}</${etiqueta}>`;
}
function cargarYMostrarDirecciones() {
    const jsonFile = 'json/direcciones.json';
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            const nombreDireccion = buscarNombrePorId(direccionId, data.direcciones);
            cambiarNombreEnDiv(nombreDireccion);
        })
        .catch(error => console.error('Error al cargar las direcciones para el titulo :', error));
}
cargarYMostrarDirecciones();