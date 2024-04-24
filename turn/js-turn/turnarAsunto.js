var con = document.querySelector(".turnar");
var turnHTML = `
<div class="container mt-3">
    <div class="row">
        <div class="col-7">
            <form action="javascript:void(0);" method="POST" id="formTurn" enctype="multipart/form-data">
                    <div class="content">
                        <fieldset>
                            <legend>Opciones Disponibles</legend>
                            <input type="checkbox" id="checkboxTodas" name="checkboxTodas">
                            <label class="todas" for="checkboxTodas">Todas</label>
                            <div class="container direcTurn">
                            </div>
                        </fieldset>
                    </div>
                <button type="submit" class="btn btn-primary mt-2" id="btnTurnarAsunto" disabled>Turnar Asunto</button>
            </form>
        </div>
        <div class="col-5">
            <div class="content">
                <fieldset>
                    <legend>Instrucción General</legend>
                    <div class="container">
                        <div class="mb-3">
                            <textarea class="form-control gen" id="msgGeneral" rows="3"></textarea>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    </div>
</div>
`;
con.innerHTML = turnHTML;
cargarOpciones();

var formTurn = document.getElementById("formTurn");
formTurn.addEventListener("submit", enviar);

// Función para cargar opciones
function cargarOpciones() {
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

            // Crear un elemento ul para contener los elementos
            const ul = document.createElement("ul");

            data.forEach(resultado => {
                // Crear un elemento li para cada conjunto de elementos
                const li = document.createElement("li");
                //CheckBox 
                const checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.setAttribute("id", `checkbox-${resultado.Id}`);
                checkbox.setAttribute("value", resultado.Id);
                checkbox.setAttribute("aria-label", resultado.Secretaria);
                //Label con el nombre de la secretaria
                const label = document.createElement("label");
                label.setAttribute("for", `checkbox-${resultado.Id}`);
                label.textContent = resultado.Secretaria;
                //Boton de agregar instrucciones individuales
                const button = document.createElement("button");
                button.type = "button";
                button.classList.add("btn");
                button.textContent = "+";
                label.appendChild(button);

                //Caja de texto para las instrucciones individuales
                const textBox = document.createElement("textarea");
                textBox.classList.add("form-control", "mb-2","gen");
                textBox.setAttribute("placeholder", "Instrucción Individual");
                textBox.setAttribute("aria-label", "Instrucción Individual");
                textBox.setAttribute("id", `textBox-${resultado.Id}`);
                textBox.style.display = "none"; // Ocultar por defecto


                // Agregar evento clic al botón
                button.addEventListener("click", function (event) {
                    event.stopPropagation();
                    if (textBox.style.display === "block") {
                        textBox.style.display = "none";
                        checkbox.checked = false; // Desactivar el checkbox al ocultar las instrucciones adicionales
                    } else {
                        textBox.style.display = "block";
                        checkbox.checked = true; // Activar el checkbox al mostrar las instrucciones adicionales
                    }
                    actualizarEstadoTodas();
                    actualizarEstadoBoton();
                });
                // Crear un contenedor para el botón y el cuadro de texto
                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");
                buttonContainer.appendChild(textBox);

                // Agregar todos los elementos al li
                li.appendChild(checkbox);
                li.appendChild(label);
                li.appendChild(buttonContainer); // Agregar el contenedor en lugar del botón directamente

                // Agregar el li al ul
                ul.appendChild(li);
            });
            // Agregar el ul al div
            divDirecciones.appendChild(ul);

            // Habilitar o deshabilitar el botón de "Turnar Asunto" según las opciones seleccionadas
            const checkboxesIndividuales = document.querySelectorAll(".direcTurn input[type='checkbox']");
            const btnTurnarAsunto = document.getElementById("btnTurnarAsunto");

            function actualizarEstadoBoton() {
                const alMenosUnaSeleccionada = Array.from(checkboxesIndividuales).some(cb => cb.checked);
                btnTurnarAsunto.disabled = !alMenosUnaSeleccionada;
            }

            // Evento para actualizar el estado del checkbox "Todas" cuando cambia cualquier checkbox individual
            checkboxesIndividuales.forEach(checkbox => {
                checkbox.addEventListener("change", function () {
                    actualizarEstadoTodas();
                    actualizarEstadoBoton();
                });
            });

            // Función para actualizar el estado del checkbox "Todas" según el estado de los checkboxes individuales
            function actualizarEstadoTodas() {
                const todasCheckbox = document.getElementById("checkboxTodas");
                const todasSeleccionadas = Array.from(checkboxesIndividuales).every(cb => cb.checked);
                todasCheckbox.checked = todasSeleccionadas;
            }

            // Evento para marcar o desmarcar todas las checkboxes individuales cuando se marca o desmarca el checkbox "Todas"
            document.getElementById("checkboxTodas").addEventListener("change", function (event) {
                const isChecked = event.target.checked;
                checkboxesIndividuales.forEach(checkbox => {
                    checkbox.checked = isChecked;
                });
                actualizarEstadoBoton();
            });

            // Verificar si hay al menos una opción seleccionada al cargar las opciones
            actualizarEstadoBoton();
        })
        .catch(error => {
            console.error('Error al obtener la secretaria:', error);
        });
}

// Función para manejar el envío del formulario
function enviar(event) {
    $('#btnTurnarAsunto').prop('disabled', true);
    event.preventDefault();
    const checkboxesSeleccionados = document.querySelectorAll(".direcTurn input[type='checkbox']:checked");
    const opcionesSeleccionadas = [];

    checkboxesSeleccionados.forEach(checkbox => {
        // Obtener el ID del checkbox
        const id = checkbox.id.split('-')[1]; // Obtener el ID después del guión
        const textoOpcion = checkbox.getAttribute('aria-label');

        // Obtener el valor del textarea de instrucción adicional
        const textBoxId = `textBox-${id}`;
        const instruccionAdicional = document.getElementById(textBoxId).value.trim();

        opcionesSeleccionadas.push({
            id: id,
            opcion: textoOpcion,
            instruccionAdicional: instruccionAdicional
        });
    });
    // Obtener la instrucción general del textarea
    const instruccionGeneral = document.getElementById('msgGeneral').value.trim();

    console.log("Opciones seleccionadas:");
    opcionesSeleccionadas.forEach(opcion => {
        console.log(`- Opción ID: ${opcion.id}, Nombre: ${opcion.opcion}`);
        if (opcion.instruccionAdicional !== '') {
            console.log(`  Instrucción adicional: ${opcion.instruccionAdicional}`);
        }
    });
    console.log("Instrucción general:");
    console.log(instruccionGeneral);
}
// Evento para cargar opciones cuando el documento esté listo
document.addEventListener("DOMContentLoaded", cargarOpciones);
