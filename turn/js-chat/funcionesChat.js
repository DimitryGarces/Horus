function cargarMensajes() {
    return new Promise(function (resolve, reject) {
        fetch('../Back-End-php/select/turnRecibidos.php')
            .then(response => response.json())
            .then(data => {
                const divChats = document.querySelector(".mensajeEntrante");
                const ul = document.createElement("ul");
                data.forEach(element => {
                    ul.appendChild(menuIz(element.Folio, element.Departamento, element.Asunto , element.Tiempo));
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

function vistaPrev(turno, origen, asunto, tiempo) {
    const formData = new FormData();
    formData.append("turno", turno);
    fetch('../Back-End-php/select/vistaPrev.php', {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(res => {
            var vista = document.querySelector(".vistaPrevDoc");
            vista.innerHTML = '';
            const redirectLink = `Turno.html?turno=${encodeURIComponent(turno)}&origen=${encodeURIComponent(origen)}&tiempo=${encodeURIComponent(tiempo)}&docx=${res[0].Path}`;
            var view = `
                <iframe class="pdfPreView" src="../asuntos/${res[0].Path}#view=FitH" width="100%" height="600px"></iframe>
                <button data-text="Detalles" id="detallesButton" type="button" onclick="window.open('${redirectLink}', '_blank')">
                    <span>Ver</span>
                </button>
            `;
            vista.innerHTML = view;
        });

    /*const url = `Turno.html?turno=${encodeURIComponent(turno)}&asunto=${encodeURIComponent(asunto)}&origen=${encodeURIComponent(origen)}&instruccionI=${encodeURIComponent(instruccionI)}&instruccionG=${encodeURIComponent(instruccionG)}`;
    window.open(url, '_blank');*/
}

function menuIz(turno, origen, asunto , tiempo) {
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
    label.textContent = turno + " - " + origen + " / " + asunto;
    label.classList.add("labelChats");
    label.classList.add("h5");
    radiobox.addEventListener("click", function () {
        vistaPrev(turno, origen, asunto, tiempo);
    });

    li.appendChild(radiobox);
    li.appendChild(label);

    return li;
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
    cargarScript('./js-chat/vistaPrevia.js', function () {
        cargarMensajes().then(res => {
            inicio();
        }).catch(error => {
            console.log(error);
        });
    });
});