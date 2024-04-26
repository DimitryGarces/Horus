/*### Funciones auxiliares para funcionamiento del modulo ### */
function smoothScrollTo(element, percentage) {
    const duration = 2500;
    const targetPosition = element.getBoundingClientRect().top * percentage;
    const startPosition = window.scrollY || document.documentElement.scrollTop;

    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const ease = easeInOutQuad(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, ease);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}

/* Este metodo desactiva las funcionalidades de interaccion del contenedor de turnado*/
function desactivar(bool) {
    const checkboxesIndividuales = document.querySelectorAll(".direcTurn input[type='checkbox']");
    const instructButtons = document.querySelectorAll(".instruc");
    const tod = document.getElementById("checkboxTodas");

    checkboxesIndividuales.forEach(checkbox => {
        checkbox.disabled = bool;
    });
    if (bool) {
        instructButtons.forEach(button => {
            button.style.visibility = 'hidden';
        });
    } else {
        instructButtons.forEach(button => {
            button.style.visibility = 'visible';
        });
    }
    tod.disabled = bool;
}
/* En este metodo se obtienen las direcciones a las que se puede turnar de acuerdo a tu perfil */
function cargarOpciones() {
    return new Promise(function (resolve, reject) {
        $('#btnTurnarAsunto').prop('disabled', true);
        fetch('../Back-End-php/select/opTurnar.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener la secretaria. Código de estado: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const divDirecciones = document.querySelector(".direcTurn");
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

/* En este codigo se encarga de subir el PDF al servidor */
function subirPdf(formData) {
    $.ajax({
        url: '../Back-End-php/insert/subirPDF.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.nombre !== null) {
                $('#btnGuardarAsunto').prop('disabled', false);
                documento += response.nombre;
                console.log('Subida con éxito. Nombre del archivo:', documento);
            } else {
                console.error('La respuesta del servidor no contiene el nombre del archivo.');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al subir el archivo:', error);
        }
    });
}

/* SI NOS DAMOS CUENTA LAS SIGUIENTES 3 FUNCIONES SE REPITEN EN FUNCIONALIDAD, POR LO QUE SE PODRIA OPTIMIZAR EN EL FUTURO */
/* Aqui se encarga de la logica necesaria para subir el nuevo asunto una vez se llenan todos los campos */
function nuevoAsunto(formData) {
    $('#btnSubirArchivo').prop('disabled', true);
    return new Promise((resolve, reject) => {
        fetch('../Back-End-php/insert/nuevoAsunto.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos. Código de estado: ' + response.status);
                }
                return response.json(); // Esperamos una respuesta JSON
            })
            .then(data => {
                if (data.success) {
                    $('#btnSubirArchivo').prop('disabled', false);
                    resolve(data.id); // Resolvemos la promesa con el ID recibido
                } else {
                    reject(error);
                }
            })
            .catch(error => {
                reject(error); // Si ocurre algún error, rechazamos la promesa
            });
    });
}

/* Aqui agregamos la funcionalidad del turnado */
function turn(formData) {
    return new Promise((resolve, reject) => {
        fetch('../Back-End-php/insert/turnar.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    $('#btnSubirArchivo').prop('disabled', false);
                    resolve(data.id); // Resolvemos la promesa con el ID recibido
                } else {
                    reject(data.error);
                }
            })
            .catch(error => {
                reject(error); // Si ocurre algún error, rechazamos la promesa
            });
    });
}


/* Aqui agregamos el envio individual de las direcciones */
function turnDirec(id_departamento, id_folio, instInd) {
    return new Promise((resolve, reject) => {
        var formData = new FormData();
        formData.append('id_departamento', id_departamento);
        formData.append('id_folio', id_folio);
        formData.append('instInd', instInd);
        fetch('../Back-End-php/insert/turnDirec.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    resolve(data.inserted_id); // Resolvemos la promesa con el ID recibido
                } else {
                    reject(data.error);
                }
            })
            .catch(error => {
                reject(error); // Si ocurre algún error, rechazamos la promesa
            });
    });
}

async function turnadoMasive(opcionesSeleccionadas) {
    try {
        await Promise.all(opcionesSeleccionadas.map(async opcion => {
            if (opcion.instruccionAdicional !== '') {
                await turnDirec(opcion.id, opcion.id_turno, opcion.instruccionAdicional);
            } else {
                await turnDirec(opcion.id, opcion.id_turno, "");
            }
        }));
        return true; // Si todas las promesas se resuelven correctamente, devolver true
    } catch (error) {
        console.error('Error en turnadoMasive:', error);
        return false; // Si alguna promesa se rechaza, devolver false
    }
}



function actualizarEstadoBoton() {
    const checkboxesIndividuales = document.querySelectorAll(".direcTurn input[type='checkbox']");
    const alMenosUnaSeleccionada = Array.from(checkboxesIndividuales).some(cb => cb.checked);
    btnTurnarAsunto.disabled = !alMenosUnaSeleccionada;
}

// Función para actualizar el estado del checkbox "Todas" según el estado de los checkboxes individuales
function actualizarEstadoTodas() {
    const checkboxesIndividuales = document.querySelectorAll(".direcTurn input[type='checkbox']");
    const todasCheckbox = document.getElementById("checkboxTodas");
    const todasSeleccionadas = Array.from(checkboxesIndividuales).every(cb => cb.checked);
    todasCheckbox.checked = todasSeleccionadas;
}

/*##### Inicio de los metodos de inicializacion #####*/

function after() {
    // Al cargar el documento
    // Habilitar o deshabilitar el botón de "Turnar Asunto" según las opciones seleccionada
    desactivar(true);
    $('#collapseTwo').collapse('hide');
    $('#btnTurnarAsunto').hide();
    // Subir un PDF
    $('#btnSubirArchivo').click(function () {
        var formData = new FormData();
        var fileInput = $('#documento')[0].files[0];
        var folio = document.getElementById("folio").value;
        formData.append('archivo', fileInput);
        formData.append('folio', folio);
        subirPdf(formData);
    });

    // Guardando el Asunto
    $('#btnGuardarAsunto').click(function () {
        // Desactivar todos los elementos del formulario
        $('#formulario input, #formulario select, #formulario button').prop('disabled', true);
        $('#btnGuardarAsunto').hide();
        $('#btnModificarAsunto').prop('disabled', false);
        $('#btnModificarAsunto').show();
        $('#collapseTwo').collapse('show');
        $('#btnTurnarAsunto').show();
        desactivar(false);
        const turnSection = document.getElementById('formTurn');
        smoothScrollTo(turnSection, 0.9);
    });

    // Modificar el Asunto
    $('#btnModificarAsunto').click(function () {
        // Activar todos los elementos
        $('#formulario input, #formulario select, #formulario button').prop('disabled', false);
        $('#btnModificarAsunto').hide();
        $('#btnGuardarAsunto').show();
        $('#collapseTwo').collapse('hide');
        $('#btnTurnarAsunto').hide();
        desactivar(true);
    });
    // Subir todo al sistema
    $('#btnTurnarAsunto').click(function () {
        // Subir solo el asunto

        /* Inicio de insercion para el nuevo asunto */
        var asunto = document.getElementById("asunto").value;
        var remitente = document.getElementById("remitente").value;
        var procedencia = document.getElementById("procedencia").value;
        var fechaRecibida = document.getElementById("fecha_recibida").value;
        var fechaVencimiento = document.getElementById("fecha_vencimiento").value;
        var prioridad = document.getElementById("prioridad").value;
        var idServicio = document.getElementById("servicio").value;
        var folio = document.getElementById("folio").value;

        var formData = new FormData();

        formData.append('asunto', asunto);
        formData.append('remitente', remitente);
        formData.append('procedencia', procedencia);
        formData.append('fechaRecibida', fechaRecibida);
        formData.append('fechaVencimiento', fechaVencimiento);
        formData.append('prioridad', prioridad);
        formData.append('idServicio', idServicio);
        formData.append('documento', documento);
        formData.append('folio', folio);
        /* A partir de aqui se hace una insercion sobre todos los datos, de los asuntos */
        nuevoAsunto(formData)
            .then(id => {
                /* Inicio de insercion para el turnado */
                var form = new FormData();
                const instruccionGeneral = document.getElementById('msgGeneral').value.trim();
                form.append('folio', id);
                form.append('instrucciones', instruccionGeneral);
                turn(form)
                    .then(data => {
                        console.log(data);
                        console.log("Turno creado con éxito.")
                        /* Inicio de inserción para el turnado individual */
                        const checkboxesSeleccionados = document.querySelectorAll(".direcTurn input[type='checkbox']:checked");
                        const opcionesSeleccionadas = [];

                        checkboxesSeleccionados.forEach(checkbox => {
                            // Obtener el ID del checkbox
                            const id = checkbox.id.split('-')[1]; // Obtener el ID después del guión
                            const id_turno = data;
                            // Obtener el valor del textarea de instrucción adicional
                            const textBoxId = `textBox-${id}`;
                            const instruccionAdicional = document.getElementById(textBoxId).value.trim();

                            opcionesSeleccionadas.push({
                                id: id,
                                id_turno: id_turno,
                                instruccionAdicional: instruccionAdicional
                            });
                        });

                        console.log("Opciones seleccionadas:");
                        turnadoMasive(opcionesSeleccionadas)
                            .then(res => {
                                $('#formulario input, #formulario select, #formulario button').prop('disabled', false);
                                $('#btnModificarAsunto').hide();
                                $('#btnGuardarAsunto').show();
                                $('#collapseTwo').collapse('hide');
                                $('#btnTurnarAsunto').hide();
                                console.log("Turno Individual realizado? ", res);
                            });
                    });
            })
            .catch(error => {
                // Manejar cualquier error que ocurra durante el proceso
                console.error('Error en el proceso:', error);
            });

    });
    const checkboxesIndividuales = document.querySelectorAll(".direcTurn input[type='checkbox']");
    checkboxesIndividuales.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            actualizarEstadoTodas();
            actualizarEstadoBoton();
        });
    });
    // Evento para marcar o desmarcar todas las checkboxes individuales cuando se marca o desmarca el checkbox "Todas"
    document.getElementById("checkboxTodas").addEventListener("change", function (event) {
        const isChecked = event.target.checked;
        checkboxesIndividuales.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        actualizarEstadoBoton();
    });

    actualizarEstadoBoton();
}

// Función para cargar un script de forma dinámica y ejecutar código después de que se haya cargado
function cargarScript(url, callback) {
    var script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
}

// Cargar los scripts dinámicamente uno por uno
cargarScript('./js-turn/crearAsunto.js', function () {
    cargarScript('./js-turn/turnarAsunto.js', function () {
        cargarOpciones().then(function () {
            cargarScript('./js-turn/servicios.js', function () {
                after();
            });
        });
    });
});