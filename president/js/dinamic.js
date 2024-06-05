let contadorGabinetes = 0;

function agregarGabinete() {
    contadorGabinetes++;

    const gabinetesContainer = document.getElementById('gabinetesContainer');
    const gabineteDiv = document.createElement('div');
    gabineteDiv.classList.add('mb-3');
    gabineteDiv.classList.add('gab');

    gabineteDiv.innerHTML = `
    <hr class="dropdown-divider">
    <div class="col-md-6">
        <label for="gabinete${contadorGabinetes}" class="form-label"><h3>Gabinete:</h3></label>
        <input type="text" class="form-control" id="gabinete${contadorGabinetes}" placeholder="Nombre">
    </div>
    <div id="formContainer${contadorGabinetes}" class="row mt-3 container">
    </div>
    <button type="button" class="btn btn-secondary mt-3" onclick="agregarDireccion(${contadorGabinetes})">Agregar Dirección</button>
    <button type="button" class="btn btn-danger mt-3" onclick="eliminarDireccion(${contadorGabinetes})">Eliminar Última Dirección</button>
    `;

    gabinetesContainer.appendChild(gabineteDiv);
}

function agregarDireccion(idGabinete) {
    const formContainer = document.getElementById(`formContainer${idGabinete}`);
    const direccionDiv = document.createElement('div');
    direccionDiv.classList.add('direccion', 'row', 'g-3', 'mt-2', 'container');

    direccionDiv.innerHTML = `
        <div class="col-md-6">
            <label for="direccion${idGabinete}_${contadorGabinetes}" class="form-label"><h4>Dirección:</h4></label>
            <input type="text" class="form-control" id="direccion${idGabinete}_${contadorGabinetes}" placeholder="Nombre">
        </div>
        <div class="col-2">
            <label for="resueltos${idGabinete}_${contadorGabinetes}" class="form-label"><h4>Resueltos</h4></label>
            <input type="text" class="form-control" id="resueltos${idGabinete}_${contadorGabinetes}" placeholder="Número">
        </div>
        <div class="col-md-2">
            <label for="pendientes${idGabinete}_${contadorGabinetes}" class="form-label"><h4>Pendientes:</h4></label>
            <input type="text" class="form-control" id="pendientes${idGabinete}_${contadorGabinetes}" placeholder="Número">
        </div>
        <div class="col-md-2">
            <label for="rendimiento${idGabinete}_${contadorGabinetes}" class="form-label"><h4>Rendimiento:</h4></label>
            <input type="text" class="form-control" id="rendimiento${idGabinete}_${contadorGabinetes}" placeholder="Porcentaje">
        </div>
    `;

    formContainer.appendChild(direccionDiv);
}

function eliminarDireccion(idGabinete) {
    const formContainer = document.getElementById(`formContainer${idGabinete}`);
    const direcciones = formContainer.getElementsByClassName('direccion');

    if (direcciones.length > 0) {
        formContainer.removeChild(direcciones[direcciones.length - 1]);
    }
}

function enviarDatos() {
    const gabinetesContainer = document.getElementById('gabinetesContainer');
    const gabinetes = gabinetesContainer.getElementsByClassName('mb-3');

    const datosAEnviar = [];

    // Recorrer todos los gabinetes
    for (let i = 0; i < gabinetes.length; i++) {
        const gabineteDiv = gabinetes[i];
        const gabineteNombre = gabineteDiv.querySelector(`#gabinete${i + 1}`).value;

        const direccionesContainer = gabineteDiv.querySelector(`#formContainer${i + 1}`);
        const direcciones = direccionesContainer.getElementsByClassName('direccion');
        console.log(direcciones.length);
        const direccionesData = [];

        for (let j = 0; j < direcciones.length; j++) {
            const direccionDiv = direcciones[j];
            const nombreDireccion = direccionDiv.querySelector(`#direccion${i + 1}_${j + 1}`).value;

            const direccionData = {
                Nombre: nombreDireccion
            };

            direccionesData.push(direccionData);
        }

        const gabineteData = {
            Nombre: gabineteNombre,
            Direcciones: direccionesData
        };

        datosAEnviar.push(gabineteData);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "./conn/conection.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify(datosAEnviar));
}

