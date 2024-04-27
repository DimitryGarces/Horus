var container = document.querySelector(".containerChats");
var formHTML = `
<div class="container">
    <div class="row shadow mt-2">
        <div class="col d-flex mt-2">
            <div class="gradient-title">
                <h1>Bandeja de Entrada</h1>
            </div>
        </div>
        <div class="col-sm-4 col-md-4 col-lg-5 col-xl-5 mt-3 d-flex justify-content-center">
            <div class="col-4 input-group mb-3">
                <select id="turnadoA" class="form-select" aria-label="Default select example">
                    <option selected>Recibido de</option>
                </select>
                <span id="buscarTxt" class="input-group-text" id="basic-addon1">
                    <img src="../img/busqueda.png" alt="Buscar">
                </span>
                <div class="input-group-append ml-3">
                    <button id="btnBuscar" type="button" class="custom-button">
                        <img src="../img/filtros.png" alt="Filtros">
                    </button>
                </div>
            </div>
        </div>
        <div class="col d-flex justify-content-end logo mb-2">
            <img src="../img/horus.jpg" alt="Horus" class="img-fluid">
        </div>
    </div>
    <div class="container mt-5 shadow">
        <div class="row">
            <div class="col-4">
                <div class="container mensajeEntrante">
                </div>
            </div>
            <div class="col-8">
                <div class="background-image">
                    <!-- Contenido del primer div -->
                </div>
                <div class="contenido">   
                </div>
            </div>
        </div>
    </div>
</div>
`;
container.innerHTML = formHTML;

