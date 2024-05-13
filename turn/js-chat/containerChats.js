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
                <span id="buscarTxt" class="input-group-text" id="basic-addon1">
                    <img src="../img/busqueda.png" alt="Buscar">
                </span>
                <input id="entrTxt" type="text" class="form-control" placeholder="Buscar"
                                aria-label="Buscar" aria-describedby="basic-addon1">
                <span id="buscarTxt" class="input-group-text" id="basic-addon1">
                <button id="btnFiltros" class="custom-button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                    <img src="../img/filtros.png" alt="Filtros">
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="btnFiltros">
                    <li class="mt-2">
                        <div class="dropdown-item">
                            <label for="fechaEntrada" class="form-label">Fecha de Entrada:</label>
                            <input type="date" id="filtroEntrada" class="form-control">
                        </div>
                    </li>
                    <li class="mt-3">
                        <div class="dropdown-item">
                            <label for="fechaVencimiento" class="form-label">Fecha de Vencimiento:</label>
                            <input type="date" id="filtroVencimiento" class="form-control">
                        </div>
                    </li>
                    <li class="mt-4">
                        <div class="dropdown-item">
                            <input id="Origen" type="text" class="form-control" placeholder="Origen" aria-label="Origen" aria-describedby="basic-addon1">
                        </div>
                    </li>
                    <li class="mt-2 d-flex justify-content-center">
                        <button id="aplicar" class="custom-button btn-primary" type="button">
                            Aplicar
                        </button>
                    </li>
                </ul>            
                </span>
            </div>
        </div>
        <div class="col d-flex justify-content-end logo mb-2">
            <img src="../img/horus.jpg" alt="Horus" class="img-fluid">
        </div>
    </div>
        <div class="container mt-5 shadow">
            <div class="d-flex justify-content-between">
                <div class="ml-4 mt-2">
                    <p class="fs-5 fw-medium" style="color: #999">Folio - Organismo / Asunto</p>
                </div>          
                <div class="text-end">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input Lejos" type="radio" checked>
                        <label class="form-check-label">Lejos</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input Proximo" type="radio" checked>
                        <label class="form-check-label">Proximo</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input Cerca" type="radio" checked>
                        <label class="form-check-label">Cercano</label>
                    </div>
                </div>
        </div>  
        <div class="row align-items-flex-start">
            <div class="col-6">
            <!-- Contenido Menu Izquierdo -->
                <div class="container mensajeEntrante">
                </div>
                <!--<div class="vr" style="height: 90%;>
                </div>-->
            </div>
            <div class="col-1">
                <div class="vr" style="height: 90%;"></div>
            </div>
            <div class="col-5 vistaPrevia">
            </div>
        </div>
    </div>
</div>
`;
container.innerHTML = formHTML;

