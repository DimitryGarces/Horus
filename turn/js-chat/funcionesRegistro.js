/* Este metodo desactiva las funcionalidades de interaccion del contenedor de turnado*/
function desactivar(bool) {
    const checkboxesIndividuales = document.querySelectorAll(".resCuerpo input[type='checkbox']");
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
    document.getElementById("errorText").style.display = "none";
}
/* En este metodo se obtienen las direcciones a las que se puede turnar de acuerdo a tu perfil */
function cargarOpciones() {
    return new Promise(function (resolve, reject) {
        $('#btnTurnarAsunto').prop('disabled', true);
        fetch('../Back-End-php/select/opTurnarReplica.php')
            .then(response => response.json())
            .then(data => {
                const divDirecciones = document.querySelector(".resCuerpo");
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
                resolve();
            })
            .catch(error => {
                console.error('Error al obtener la secretaria:', error);
                reject(error);
            });
    });
}

/* En este codigo se encarga de subir el PDF al servidor */
function subirPdf(formData) {
    return new Promise((resolve, reject) => {
        fetch('../Back-End-php/insert/subirPDF.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.nombre !== null) {
                    resolve(data.nombre);
                } else {
                    reject('La respuesta del servidor no contiene el nombre del archivo.');
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}
function cargarHistorial(folio) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('folio', folio);
        fetch('../Back-End-php/select/historialMensajes.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el historial de mensajes. Código de estado: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const historialMensajes = document.getElementById('historialMensajes');
                historialMensajes.innerHTML = '';

                const lista = document.createElement('ul');

                data.forEach(mensaje => {
                    const itemLista = document.createElement('li');
                    itemLista.classList.add('mensaje');

                    const mensajeTexto = mensaje.mensaje;
                    const direc = mensaje.nombre;
                    let mensajeEnlace = '';

                    if (mensaje.path) {
                        mensajeEnlace = `<a href="../asuntos/${mensaje.path}" target="_blank">`;
                        mensajeEnlace += `<img src="../img/pdfChat.png" alt="Ver documento">`;
                        mensajeEnlace += `</a>`;
                    }

                    itemLista.innerHTML = `${direc} dice: ${mensajeTexto} ${mensajeEnlace}`;

                    lista.appendChild(itemLista);
                });
                historialMensajes.appendChild(lista);
                resolve();
            })
            .catch(error => {
                reject('Error al cargar el historial de mensajes: ' + error.message);
            });
    });
}


function enviarMensaje(formData) {
    return new Promise((resolve, reject) => {
        fetch('../Back-End-php/insert/mensaje.php', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(data => {
                if (data.id !== null) {
                    resolve(data.id);
                } else {
                    reject('La respuesta del servidor no fue satisfactoria.');
                }
            }).catch(error => {
                reject(error);
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
function actualizarEstadoBotonRes() {
    const checkboxesIndividuales = document.querySelectorAll(".resCuerpo input[type='checkbox']");
    const alMenosUnaSeleccionada = Array.from(checkboxesIndividuales).some(cb => cb.checked);
    if (alMenosUnaSeleccionada) {
        $('#btnReplicarAsunto').show().prop('disabled', false);
    } else {
        $('#btnReplicarAsunto').hide().prop('disabled', true);
    }
}

// Función para actualizar el estado del checkbox "Todas" según el estado de los checkboxes individuales
function actualizarEstadoTodasRes() {
    const checkboxesIndividuales = document.querySelectorAll(".resCuerpo input[type='checkbox']");
    const todasCheckbox = document.getElementById("checkboxTodas");
    const todasSeleccionadas = Array.from(checkboxesIndividuales).every(cb => cb.checked);
    todasCheckbox.checked = todasSeleccionadas;
}

/*##### Inicio de los metodos de inicializacion #####*/
function after() {
    // Al cargar el documento
    $('#collapseTwo').collapse('hide');
    $('#btnReplicarAsunto').hide();
    $('#btnEnviarBajaCumplimiento').click(function () {
        var mensaje = $('#mensajeNuevo').val().trim();

        if (mensaje === '') {
            $('#errorLabel').text('El mensaje no puede estar vacío.');
            $('#errorLabel').show();
            return;
        }

        var formData = new FormData();
        formData.append('Folio', document.getElementById('folio').value);
        formData.append('Mensaje', mensaje);
        formData.append('Path', '');
        if ($('#pdfBajaCumplimiento')[0].files[0]) {
            var subir = new FormData();
            subir.append('folio', document.getElementById("folio").value);
            subir.append('archivo', $('#pdfBajaCumplimiento')[0].files[0]);

            subirPdf(subir)
                .then(arch => {
                    formData.set('Path', arch);
                    enviarMensaje(formData)
                        .then(response => {
                            if (response) {
                                $('#mensajeNuevo').val('');
                                $('#pdfBajaCumplimiento').val('');
                                $('#errorLabel').hide();
                                cargarHistorial(document.getElementById("folio").value)
                                    .then(() => {
                                        return;
                                    });
                                console.log('Mensaje enviado con éxito.');
                            } else {
                                $('#errorLabel').text('Intenta cargar el archivo nuevamente.');
                                $('#errorLabel').show();
                                console.error('Error: La respuesta del servidor no fue satisfactoria.');
                            }
                        });
                })
                .catch(error => {
                    $('#errorLabel').text('Intenta cargar nuevamente tu archivo o recarga la página.');
                    $('#errorLabel').show();
                    console.error('Error:', error);
                });
        } else {
            enviarMensaje(formData)
                .then(response => {
                    if (response) {
                        $('#mensajeNuevo').val('');
                        $('#pdfBajaCumplimiento').val('');
                        $('#errorLabel').hide();
                        cargarHistorial(document.getElementById("folio").value)
                            .then(() => {
                                return;
                            });
                        console.log('Mensaje enviado con éxito.');
                    } else {
                        $('#errorLabel').text('Intentalo nuevamente.');
                        $('#errorLabel').show();
                        console.error('Error: La respuesta del servidor no fue satisfactoria.');
                    }
                })
                .catch(error => {
                    $('#errorLabel').text('Intentelo de nuevo. Si el error persiste, recargue la página.');
                    $('#errorLabel').show();
                    console.error('Error:', error);
                });
        }
    });


    // Subir todo al sistema
    $('#btnReplicarAsunto').click(function () {
        // Subir solo el asunto
        var subir = new FormData();
        var fileInput = $('#documento')[0].files[0];
        var folio = document.getElementById("folio").value;
        subir.append('archivo', fileInput);
        subir.append('folio', folio);
        subirPdf(subir)
            .then(arch => {
                /* Inicio de insercion para el turnado */
                var form = new FormData();
                const instruccionGeneral = document.getElementById('msgGeneral').value.trim();
                form.append('folio', id);
                form.append('instrucciones', instruccionGeneral);
                turn(form)
                    .then(data => {
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
                        turnadoMasive(opcionesSeleccionadas)
                            .then(res => {
                                $('#formulario input, #formulario select, #formulario button').prop('disabled', false);
                                $('#collapseTwo').collapse('hide');
                                $('#btnReplicarAsunto').hide();
                                //Vaciar los datos
                                const checkboxesSeleccionados = document.querySelectorAll(".direcTurn input[type='checkbox']:checked");
                                checkboxesSeleccionados.forEach(checkbox => {
                                    $(checkbox).prop('checked', false);
                                });
                                const textareas = document.querySelectorAll(".direcTurn textarea");
                                textareas.forEach(textarea => {
                                    textarea.value = '';
                                    textarea.style.display = "none";
                                });
                                const gen = document.querySelector("#msgGeneral");
                                gen.value = '';
                                desactivar(true);
                                customAlert.alert('Todos los elementos han sido replicados con exito.', 'Todo bien!');
                            });
                    });
            }).catch(error => {
                // Manejar cualquier error que ocurra durante el proceso
                console.error('Error en el proceso:', error);
                document.getElementById("errorText").style.display = "block";
            });
    });

    const checkboxesIndividuales = document.querySelectorAll(".resCuerpo input[type='checkbox']");
    checkboxesIndividuales.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            actualizarEstadoTodasRes();
            actualizarEstadoBotonRes();
        });
    });
    // Evento para marcar o desmarcar todas las checkboxes individuales cuando se marca o desmarca el checkbox "Todas"
    document.getElementById("checkboxTodas").addEventListener("change", function (event) {
        const isChecked = event.target.checked;
        checkboxesIndividuales.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        actualizarEstadoBotonRes();
    });

    actualizarEstadoBotonRes();
}

cargarOpciones().then(function () {
    after();
    cargarHistorial(document.getElementById("folio").value)
        .then(() => {
        })
        .catch(error => {
            console.error('Error al cargar el historial de mensajes:', error);
        });

});