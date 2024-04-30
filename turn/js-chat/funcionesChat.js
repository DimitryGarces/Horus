function cargarMensajes() {
    return new Promise(function (resolve, reject) {
        fetch('../Back-End-php/select/turnRecibidos.php')
            .then(response => response.json())
            .then(data => {
                const divChats = document.querySelector(".mensajeEntrante");
                const ul = document.createElement("ul");
                data.forEach(element => {
                    ul.appendChild(menuIz(element.Folio, element.Asunto, element.FechaV, element.Departamento, element.InstruccionInd, element.InstruccionGen));
                    divChats.appendChild(ul);
                });
                resolve();
            })
            .catch(error => {
                console.error('Error al obtener los mensajes:', error);
                reject(error);
            });
    });
}


function menuIz(turno, asunto, tiempo, origen, instruccionI, instruccionG) {
    const li = document.createElement("li");
    const radiobox = document.createElement("input");

    radiobox.setAttribute("type", "radio");
    radiobox.setAttribute("id", `radio-${turno}`);
    radiobox.setAttribute("value", turno);
    radiobox.setAttribute("aria-label", asunto);

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Convertir la fecha proporcionada a objeto Date
    const fechaTiempo = new Date(tiempo);

    // Calcular la diferencia en días
    const diferencia = Math.floor((fechaTiempo - fechaActual) / (1000 * 60 * 60 * 24));

    // Determinar la clase basada en la diferencia de días
    let claseTiempo = "";
    if (diferencia > 12) {
        claseTiempo = "Lejos";
    } else if (diferencia > 6) {
        claseTiempo = "Proximo";
    } else {
        claseTiempo = "Cerca";
    }

    // Agregar clase de tiempo al radio
    radiobox.classList.add(claseTiempo);
    radiobox.setAttribute("checked", "checked");

    const label = document.createElement("label");
    label.setAttribute("for", `radio-${turno}`);
    label.textContent = turno + " - " + asunto;
    label.classList.add("labelChats");
    radiobox.addEventListener("click", function () {
        verChat(turno, asunto, origen, instruccionI, instruccionG);
    });

    li.appendChild(radiobox);
    li.appendChild(label);

    return li;
}


function verChat(turno, asunto, origen, instruccionI, instruccionG) {
    const formData = new FormData();
    formData.append('turno', turno);
    fetch('../Back-End-php/select/turnoEsp.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            const divImagen = document.querySelector(".background-image");
            const divContenido = document.querySelector(".contenido");

            divContenido.innerHTML = '';
            divImagen.style.display = 'none';

            divContenido.innerHTML = `
            <div class="d-flex justify-content-end">
                <p class="fw-bold">
                    <h6>Recibido:&nbsp;${data[0].fecha}&nbsp;&nbsp;&nbsp;&nbsp;Vence:&nbsp;${data[0].fechaV}</h6>
                </p>
            </div>
            <br>
            <h7><p class="fw-bold" style="display: inline;">Remitente:</p> ${data[0].remitente}</h7>
            <br><br>
            <h6 id="list-item-${turno}">Documento:</h6>
            <p>
            <object class="pdfview" type="application/pdf" data="../asuntos/${data[0].path}"></object>
            </p>
            <p class="fw-bold">Indicación General: </p>
            <p class="fw-light">${instruccionG}</p>
            <p class="fw-bold">Indicación Individual: </p>
            <p class="fw-light">${instruccionI}</p>
            <h7><p class="fw-bold" style="display: inline;">Dependencia: </p> ${origen}</h7>
            <br>
            <br>`;
        })
        .catch(error => {
            console.error('Error al obtener los mensajes:', error);
        });
}


function inicio() {

}

// Función para cargar un script de forma dinámica y ejecutar código después de que se haya cargado
function cargarScript(url, callback) {
    var script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
}

// Cargar los scripts dinámicamente uno por uno
cargarScript('./js-chat/containerChats.js', function () {
    cargarMensajes().then(res => {
        inicio();
    }).catch(error => {
        console.log(error);
    });
});