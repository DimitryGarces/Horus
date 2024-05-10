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
                <h4 id="errorText" style="display: none; color: red;">¡Oops algo salio mal, intenta recargar la pagina o cambiar el nombre d tu documento!</h4>
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

