document.addEventListener('DOMContentLoaded', function () {
    // Obtener el id_usuario de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const department = urlParams.get('department');

    const primeraLetra = username.charAt(0); // Declaración de primeraLetra como constante
    window.addEventListener('load', resize);
    window.addEventListener('resize', resize);
    cargarYMostrarDirecciones(department);


    function resize() {
        const principalElement = document.querySelector('.principal');
        const windowWidth = window.innerWidth;

        if (windowWidth > 450) {
            const sidebarWidth = document.querySelector('.sidebar').offsetWidth;
            const margin = sidebarWidth;
            principalElement.style.marginLeft = margin-15 + 'px';
            nombre(primeraLetra); // Asegúrate de que primeraLetra esté en el alcance de esta función
        } else {
            principalElement.style.marginLeft = '5px'; // Añade comillas para especificar el valor en píxeles
            nombre(username); // Asegúrate de que username esté en el alcance de esta función
        }
    }

    function nombre(username) {
        const userNameElements = document.querySelectorAll('.userName');
        userNameElements.forEach(function (element) {
            element.textContent = username;
        });
    }

    function buscarNombre(nombre, direcciones) {
        const direccion = direcciones.find(dir => dir.nombre === nombre);
        return direccion ? direccion : 'Bienvenido';
    }

    function cambiarNombreEnDiv(direccion) {
        const nombreDiv = document.querySelector('.direccion');

        if (nombreDiv) {
            let etiqueta;
            if (direccion.nombre.length > 30) {
                etiqueta = 'h4';
            } else if (direccion.nombre.length > 15) {
                etiqueta = 'h3';
            } else {
                etiqueta = 'h1';
            }

            // Actualizar el contenido con la nueva etiqueta
            nombreDiv.innerHTML = `<${etiqueta}>${direccion.nombre}</${etiqueta}>`;
        } else {
            console.error('No se encontró ningún elemento con la clase "direccion"');
        }
    }


    function cargarYMostrarDirecciones(department) {
        const jsonFile = './json/direcciones.json';
        const nombreSinPrefijo = department.replace(/^Direccion:\s+/i, '').toUpperCase();
        fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
                const nombreDireccion = buscarNombre(nombreSinPrefijo, data.direcciones);
                cambiarNombreEnDiv(nombreDireccion);
            })
            .catch(error => console.error('Error al cargar las direcciones para el titulo:', error));
    }
});
