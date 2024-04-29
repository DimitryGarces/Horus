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
    </div>
    <button type="button" class="btn btn-primary mt-4" id="btnGuardarAsunto">Guardar Asunto</button>
    <button type="button" class="btn btn-primary mt-4" id="btnModificarAsunto" style="display: none;">Modificar Asunto</button>
</form>
</div>
`;
container.innerHTML = formHTML;

