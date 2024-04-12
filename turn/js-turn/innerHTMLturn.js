// Obtener el contenedor donde se insertarán los elementos
var container = document.querySelector(".turn");
var documento = "asuntos/";
// Crear una cadena de texto HTML que contenga los elementos del formulario
var formHTML = `
<div class="container mt-5">
<h1>Registrar Nuevo Asunto</h1>
<form action="javascript:void(0);" method="POST" id="formulario" enctype="multipart/form-data">
    <div class="form-group">
        <label for="asunto">Asunto:</label>
        <input type="text" class="form-control" id="asunto" name="asunto" required>
    </div>
    <br>
    <div id="resultado"></div>
    <div class="form-group">
        <label for="remitente">Remitente:</label>
        <input type="text" class="form-control" id="remitente" name="remitente" required>
    </div>
    <div class="form-group">
        <label for="procedencia">Procedencia:</label>
        <select class="form-control" id="procedencia" name="procedencia">
            <option value="">Selecciona</option>
            <option value="1">Oficio</option>
            <option value="2">Redes Sociales</option>
            <option value="3">Pagina de Internet</option>
        </select>
    </div>
    <div class="form-group">
        <label for="fecha_recibida">Fecha Recibida:</label>
        <input type="date" class="form-control" id="fecha_recibida" name="fecha_recibida" required>
    </div>
    <div class="form-group">
        <label for="fecha_vencimiento">Fecha Vencimiento:</label>
        <input type="date" class="form-control" id="fecha_vencimiento" name="fecha_vencimiento" required>
    </div>
    <div class="form-group">
        <label for="prioridad">Prioridad:</label>
        <select class="form-control" id="prioridad" name="prioridad">
            <option value="">Selecciona</option>
            <option value="1">Menor</option>
            <option value="2">Normal</option>
            <option value="3">Alta</option>
        </select>
    </div>
    <br>
    <div class="form-group">
        <label for="asunto">Folio:</label>
        <input type="text" class="form-control" id="folio" name="folio" required>
    </div>
    <div class="form-group input-group">
        <input type="file" class="form-control" id="documento" name="documento">
        <button class="btn btn-outline-secondary" type="button" id="btnSubirArchivo">Subir</button>
    </div>
    <br>
    <button type="submit" class="btn btn-primary" id="btnGuardarAsunto" disabled>Guardar Asunto</button>
</form>
</div>
`;

// Insertar la cadena de texto HTML en el contenedor
container.innerHTML = formHTML;

// Vincular el evento de envío después de insertar el formulario en el documento
var form = document.getElementById("formulario");
form.addEventListener("submit", handleSubmit);

$(document).ready(function () {
    // Manejar el clic en el botón de subida de archivo
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
                // Imprimir la respuesta en la consola para depuración
                console.log('Respuesta del servidor:', response);

                // Verificar si la respuesta contiene un nombre de archivo válido
                if (response && response.nombre) {
                    // Habilitar el botón de guardar si la subida fue exitosa
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

    var formData = new FormData(); // Crear un objeto FormData

    // Agregar los datos del formulario al objeto FormData
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
        body: formData // Pasar el objeto FormData como cuerpo de la solicitud
    })
    .then(response => {
        // Verificar si la respuesta fue exitosa (código de estado 200)
        if (!response.ok) {
            throw new Error('Error al enviar los datos. Código de estado: ' + response.status);
        }
        // Leer la respuesta como texto
        return response.text();
    })
    .then(data => {
        // La respuesta del servidor es un texto, puedes hacer lo que quieras con ella
        $('#btnSubirArchivo').prop('disabled', false);
        console.log(data); // Aquí podrías manejar la respuesta de alguna manera
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
    });
    

}