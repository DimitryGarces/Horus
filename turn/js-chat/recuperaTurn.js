function cargarOpciones2() {
    return new Promise(function (resolve, reject) {
        $('#btnTurnarAsunto').prop('disabled', true);
        fetch('../Back-End-php/select/opTurnar.php')
            .then(response => response.json())
            .then(data => {
                const divDirecciones = document.querySelector(".respuestaTurn");
                const ul = document.createElement("ul");

                data.forEach(resultado => {
                    const li = document.createElement("li");
                    const checkbox = document.createElement("input");
                    checkbox.setAttribute("type", "checkbox");
                    checkbox.setAttribute("id", `checkbox-${resultado.Id}`);
                    checkbox.setAttribute("value", resultado.Id);
                    checkbox.setAttribute("aria-label", resultado.Secretaria);

                    const label = document.createElement("label");
                    label.setAttribute("for", `checkbox-${resultado.Id}`);
                    label.textContent = resultado.Secretaria;

                    const button = document.createElement("button");
                    button.type = "button";
                    button.classList.add("btn", "instruc");
                    button.textContent = "+";
                    label.appendChild(button);

                    const textBox = document.createElement("textarea");
                    textBox.classList.add("form-control", "mb-2", "gen");
                    textBox.setAttribute("placeholder", "Instrucción Individual");
                    textBox.setAttribute("aria-label", "Instrucción Individual");
                    textBox.setAttribute("id", `textBox-${resultado.Id}`);
                    textBox.style.display = "none";

                    button.addEventListener("click", function (event) {
                        event.stopPropagation();
                        if (textBox.style.display === "block") {
                            textBox.style.display = "none";
                            checkbox.checked = false;
                        } else {
                            textBox.style.display = "block";
                            checkbox.checked = true;
                        }
                        actualizarEstadoTodas();
                        actualizarEstadoBoton();
                    });

                    const buttonContainer = document.createElement("div");
                    buttonContainer.classList.add("button-container");
                    buttonContainer.appendChild(textBox);

                    li.appendChild(checkbox);
                    li.appendChild(label);
                    li.appendChild(buttonContainer);

                    ul.appendChild(li);
                });
                divDirecciones.appendChild(ul);
                resolve(); // Resolvemos la promesa cuando se completa la carga de opciones
            })
            .catch(error => {
                console.error('Error al obtener la secretaria:', error);
                reject(error); // Rechazamos la promesa en caso de error
            });
    });
}
function verChat(turno, origen, fechaV, path) {
    const formData = new FormData();
    formData.append('turno', turno);
    fetch('../Back-End-php/select/turnoEsp.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            const divContenido = document.querySelector('.turno');

            divContenido.innerHTML = `
            <div class="container">
                <input type="hidden" id="folio" value="${data[0].folio}">
                <div class="encabezado mt-2">
                    <h6>
                        <span style="font-weight: bold; font-size: 19px;">Remitente:</span>
                        <span style="font-weight: normal; font-size: 18px;">${data[0].remitente}</span>
                    </h6>
                    <div class="fecha-vencimiento">
                    <h5>Recibido: ${data[0].fecha} &nbsp;&nbsp;Vence: ${fechaV}</h5>
                    </div>
                </div>
                <h5><p class="fw-bold" style="display: inline;">Asunto:</p></h5>
                <h2 class="asunto">${data[0].asunto}</h2>
                <div class="documento">
                    <h6 class="documento-titulo">Documento:</h6>
                    <div class="pdf-container">
                    <object class="pdfview" type="application/pdf" data="../asuntos/${path}"></object>
                    </div>
                </div>
                <p class="dependencia" style="text-align: right;">-${origen}</p>
                <div class="indicaciones">
                    <div class="row">
                        <div class="col-6">
                        <h5 class="indicacion-titulo">Indicación General:</h5>
                        <p class="indicacion-contenido">${data[0].insGen}</p>
                        </div>
                        <div class="col-6">
                        <h5 class="indicacion-titulo">Indicación Individual:</h5>
                        <p class="indicacion-contenido">${data[0].insInd}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        })
        .catch(error => {
            console.error('Error al obtener los mensajes:', error);
        });
}
// Obtener los parámetros de la URL
const params = new URLSearchParams(window.location.search);

// Obtener los valores de los parámetros
const turno = params.get('turno');
const origen = params.get('origen');
const tiempo = params.get('tiempo');
const path = params.get('docx');

verChat(turno, origen, tiempo,path);