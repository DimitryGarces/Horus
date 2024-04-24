var container = document.querySelector(".crear");
var documento = "asuntos/";
var formHTML = `
<div class="container mt-3">
<form action="javascript:void(0);" method="POST" id="formulario" enctype="multipart/form-data">
    <div class="form-group">
        <label for="asunto">Asunto:</label>
        <input type="text" class="form-control" id="asunto" name="asunto" required>
    </div>
    <div class="form-group mt-3">
            <div class="row">
                <div class="col">
                <label for="resultado">Servicio:</label>
                <div id="resultado"></div>
                </div>
                <div class="col">
                    <label for="prioridad">Prioridad:</label>
                    <select class="form-control" id="prioridad" name="prioridad">
                        <option value="">Selecciona</option>
                        <option value="1">Menor</option>
                        <option value="2">Normal</option>
                        <option value="3">Alta</option>
                    </select>
                </div>
            </div>
    </div>
    <div class="form-group mt-3">
            <div class="row">
                <div class="col">
                    <label for="asunto">Folio:</label>
                    <input type="text" class="form-control" id="folio" name="folio" required>
                </div>
                <div class="col">
                    <label for="remitente">Remitente:</label>
                    <input type="text" class="form-control" id="remitente" name="remitente" required>
                </div>
                </div>
        </div>
    <div class="form-group mt-2">
        <label for="procedencia">Procedencia:</label>
        <select class="form-control" id="procedencia" name="procedencia">
            <option value="">Selecciona</option>
            <option value="1">Oficio</option>
            <option value="2">Redes Sociales</option>
            <option value="3">Pagina de Internet</option>
        </select>
    </div>
    <div class="form-group mt-2">
            <div class="row">
                <div class="col">
                    <label for="fecha_recibida">Fecha Recibida:</label>
                    <input type="date" class="form-control" id="fecha_recibida" name="fecha_recibida" required>
                </div>
                <div class="col">
                    <label for="fecha_vencimiento">Fecha Vencimiento:</label>
                    <input type="date" class="form-control" id="fecha_vencimiento" name="fecha_vencimiento" required>
                </div>
            </div>
    </div>
    <div class="form-group input-group mt-3">
        <input type="file" class="form-control" id="documento" name="documento">
        <button class="btn btn-outline-secondary" type="button" id="btnSubirArchivo">Subir</button>
    </div>
    <button type="submit" class="btn btn-primary mt-4" id="btnGuardarAsunto" disabled>Guardar Asunto</button>
</form>
</div>
`;
var scrTurn = document.createElement('script');
scrTurn.src = "./js-turn/turnarAsunto.js";
document.body.appendChild(scrTurn);
container.innerHTML = formHTML;
var form = document.getElementById("formulario");
form.addEventListener("submit", handleSubmit);

$(document).ready(function () {

    $('#btnSubirArchivo').click(function () {
        var formData = new FormData();
        var fileInput = $('#documento')[0].files[0];
        var folio = document.getElementById("folio").value;
        formData.append('archivo', fileInput);
        formData.append('folio', folio);


        // Realizar la petición AJAX para subir el archivo
        $.ajax({
            url: '../Back-End-php/insert/subirPDF.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response && response.nombre) {
                    $('#btnGuardarAsunto').prop('disabled', false);
                    documento += response.nombre;/*
                    var scrTurn = document.createElement('script');
                    scrTurn.src = "./js-turn/turnarAsunto.js";
                    document.body.appendChild(scrTurn);*/
                    console.log('Subida con éxito. Nombre del archivo:', documento);
                } else {
                    console.error('La respuesta del servidor no contiene el nombre del archivo.');
                }
            },
            error: function (xhr, status, error) {
                console.error('Error al subir el archivo:', error);
            }
        });
    });
});


function handleSubmit(event) {
    $('#btnSubirArchivo').prop('disabled', true);
    event.preventDefault();

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

    fetch('../Back-End-php/insert/nuevoAsunto.php', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar los datos. Código de estado: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            $('#btnSubirArchivo').prop('disabled', false);
            console.log(data);
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
        });
}

