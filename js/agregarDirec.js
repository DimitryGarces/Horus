const jsonFile = 'json/direcciones.json';

// Función para cargar el archivo JSON
function cargarDirecciones() {
  fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      // Llama a la función para mostrar las direcciones en el DOM
      mostrarDirecciones(data.direcciones);
    })
    .catch(error => console.error('Error al cargar las direcciones:', error));
}

function mostrarDirecciones(direcciones) {
    const direccionesTable = document.getElementById('lista-direcciones');
    direcciones.forEach(direccion => {
      const direccionRow = document.createElement('tr');
      direccionRow.innerHTML = `
        <th scope="row">${direccion.id}</th>
        <td>${direccion.nombre}</td>
      `;
      direccionesTable.appendChild(direccionRow);
    });
}
function mostrarDirecciones(direcciones) {
    const direccionesTable = document.getElementById('lista-direcciones');
    direcciones.forEach(direccion => {
      const direccionRow = document.createElement('tr');
      direccionRow.innerHTML = `
        <th scope="row">${direccion.id}</th>
        <td class="direccion" data-id="${direccion.id}">${direccion.nombre}</td>
      `;
      direccionesTable.appendChild(direccionRow);
    });

    // Agregar evento de clic a cada fila de dirección
    const direccionElements = document.querySelectorAll('.direccion');
    direccionElements.forEach(element => {
      element.addEventListener('click', () => {
        const direccionId = element.dataset.id;
        // Redirigir a una nueva ventana con el ID como parámetro
        window.open(`AccionesDirec.html?id=${direccionId}`, '_blank');
      });
    });
}


// Llamada a la función para cargar y mostrar las direcciones
cargarDirecciones();
