const params = new URLSearchParams(window.location.search);
const direccionId = parseInt(params.get('id'), 10);

const listItems = document.getElementById('list-example');
const listConten = document.getElementById('contenido');
const turnadoA = document.getElementById('turnadoA');

function direccionesAT() {
    const jsonFile = 'json/direcciones.json';
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            data.direcciones.forEach(dir => {
                if (dir.id != direccionId) {
                    turnadoA.innerHTML += `<option value="${dir.id}">${dir.nombre}</option>`;
                }
            });
        })
        .catch(error => console.error('Error al cargar las direcciones:', error));
}

function cambiarContenido(contenido) {
    const contenidoDiv = document.querySelector('.scrollspy-example');
    contenidoDiv.innerHTML = contenido;
}

function menuIz() {
    const asunto="Junta con directivos de OPDAPAS";
    const pathPdf= "./asuntos/XRSDDCD-ASWD-12-04-2024.pdf";
    const st = 0, md = 50, end = 100;
    const clases = "position-absolute top-0 translate-middle btn btn-sm rounded-pill";
    const colorTer = "background-color: #4CAF50; border-color: #4CAF50\"";
    const colorProg = "background-color: #e2f016; border-color: #e2f016\"";
    const colorPen = "background-color: #5c5c5c; border-color: #5c5c5c\"";
    const style = "style=\"width: 2.2rem; height:2.2rem; font-size: 1.1rem; color: white;";
    const progress =50;

    listItems.innerHTML += `<a class="list-group-item list-group-item-action" href="#list-item-${1}" title="Clic para ver mas detalles">${asunto}</a>`
    listConten.innerHTML += `
    <div class="d-flex justify-content-end">
        <p class="fw-bold">
            <h6>Envío:&nbsp;${"10/10/2024"}&nbsp;&nbsp;&nbsp;&nbsp;Vencimiento:&nbsp;${"15/11/2024"}</h6>
        </p>
    </div>
    <h5><p class="fw-bold" style="display: inline;">Estado: </p>${"Pendiente en SubDirección"}</h5>
    <div class="position-relative m-4">
        <div class="progress" role="progressbar" aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="height: 2px;">
            <div class="progress-bar" style="width: ${progress}%; background-color: #4CAF50;">
            </div>
        </div>
        <button type="button" class="${clases} start-${st} " ${style} ${colorTer} title="${"Direccion"}">${1}</button>
        <button type="button" class="${clases} start-${md} " ${style} ${colorProg} title="${"SubDirección"}">${2}</button>
        <button type="button" class="${clases} start-${end} " ${style} ${colorPen} title="${"Jefatura"}">${3}</button>
    </div>
    <br>
    <h7><p class="fw-bold" style="display: inline;">Remitente:</p> ${"Licenciado Eduardo"}</h7>
    <br><br>
    <p class="fw-bold">Indicacion: </p>
    <p class="fw-light">${"Dar atención y seguimiento correspondiente ante dicha notificación e informar a esta Oficina de Presidencia sobre su conocimiento y cumplimiento."}</p>
    <h6 id="list-item-${1}">Documento:</h6>
    <p>
    <object class="pdfview" type="application/pdf" data="${pathPdf}"></object>
    </p>
    <h7><p class="fw-bold" style="display: inline;">Dependencia: </p> ${"Presidencia"}</h7>
    <br>
    <br>
`
}


direccionesAT();
menuIz();