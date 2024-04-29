function cargarBusqueda() {
    return new Promise(function (resolve, reject) {
        fetch('../Back-End-php/select/opTurnar.php')
            .then(response => response.json())
            .then(data => {
                const selectTurnadoA = document.getElementById("turnadoA");
                // Eliminar opciones anteriores (si las hay)
                selectTurnadoA.innerHTML = '';
                // Agregar la opción predeterminada
                const optionDefault = document.createElement("option");
                optionDefault.text = "Recibido de";
                selectTurnadoA.add(optionDefault);

                // Agregar las opciones obtenidas del fetch
                data.forEach(resultado => {
                    const option = document.createElement("option");
                    option.value = resultado.Id;
                    option.text = resultado.Secretaria;
                    selectTurnadoA.add(option);
                });
                resolve(); // Resolvemos la promesa cuando se completan todas las opciones
            })
            .catch(error => {
                console.error('Error al obtener la secretaria:', error);
                reject(error); // Rechazamos la promesa en caso de error
            });
    });
}

function menuIz(i, asunto, tiempo) {

    const li = document.createElement("li");
    const radiobox = document.createElement("input");

    radiobox.setAttribute("type", "radio");
    radiobox.setAttribute("id", `radio-${i}`);
    radiobox.setAttribute("value", i);
    radiobox.setAttribute("aria-label", asunto);
    
    // Agregar clase de tiempo al radio
    radiobox.classList.add(tiempo);
    radiobox.setAttribute("checked", "checked");

    const label = document.createElement("label");
    label.setAttribute("for", `radio-${i}`);
    label.textContent = asunto;
    label.classList.add("labelChats");

    li.appendChild(radiobox);
    li.appendChild(label);

    return li;
}

function verChat(pathPdf, fechaR, fechaV, indicacionGen, indicacionInd, depO, remitente){

}

function inicio() {
    asunto = "Solicitud de Permiso";
    pathPdf = "../asuntos/011-26-04-2024.pdf";
    fechaR = "2024-04-26";
    fechaV = "2024-04-26";
    indicacionGen = "Prueba de indicacion gen";
    indicacionInd = "prueba de indicacion individual";
    depO = "Presidencia";
    remitente = "Dimitry";
    const divChats = document.querySelector(".mensajeEntrante");
    const ul = document.createElement("ul");
    for (let i = 0; i < 15; i++) {
        ul.appendChild(menuIz(i, asunto+fechaV,"Tramite"));
        verChat(pathPdf, fechaR, fechaV, indicacionGen, indicacionInd, depO, remitente);
    }
    divChats.appendChild(ul);
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
    cargarBusqueda().then(function () {
        inicio();
    });
});