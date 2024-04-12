function agregarMejores() {

    const mejoresContainer = document.getElementById('mejoresContainer');
    const separadorDiv = document.createElement('div');
    const containerDiv = document.createElement('div');
    separadorDiv.style.pageBreakBefore = 'always';
    containerDiv.classList.add('container');
    containerDiv.style.marginTop = '0.4in';
    containerDiv.style.marginRight = '0.9in';
    containerDiv.style.marginBottom = '0.4in';
    containerDiv.style.marginLeft = '0in';
    //containerDiv.style.add('margin-top: 0.4in; margin-right: 0.9in; margin-bottom: 0.4in; margin-left: 0in;');
    containerDiv.innerHTML =
        `
    <div class="row">
        <div class="col d-flex">
            <img src="./imgDocx/header.png" alt="" style="width: 110%;">
        </div>
    </div>
    <div class="container">
        <div class="row" style="margin-top: -1in; margin-left: 0.4in;">
            <h2>MEJORES RENDIMIENTOS</h2>
            <p style="margin-left: 0.3in;">${'D. Social'}</p>
        </div>
    </div>

    <div class="container">
        <div class="row" style="margin-top: 2.2in; margin-left: 0.8in;">
            <div class="col">
                <h3>Resueltos:</h3>
                <p>${'22'}</p>
                <h3>Pendientes:</h3>
                <p>${'1'}</p>
                <h3>Rendimiento:</h3>
                <p>${'7'}</p>
            </div>
            <div class="col">
                <div id="chart" style="margin-top: -0.5in; margin-left: .3in; margin: 0;"></div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <img src="./imgDocx/${'tesoreria.png'}" alt="" style="width: 100%; display: block; margin-top: .5in; margin-left: .5in;">
        </div>
    </div>
    `
    mejoresContainer.appendChild(separadorDiv);
    mejoresContainer.appendChild(containerDiv);
}
agregarMejores();
/*
`<div style="page-break-before: always;"></div>
<div class="container" style="margin-top: 0.4in; margin-right: 0.9in; margin-bottom: 0.4in; margin-left: 0in;">
    <div class="row">
        <div class="col d-flex">
            <img src="./imgDocx/header.png" alt="" style="width: 110%;">
        </div>
    </div>
    <div class="container">
        <div class="row" style="margin-top: -1in; margin-left: 0.4in;">
            <h2>MEJORES RENDIMIENTOS</h2>
            <p style="margin-left: 0.3in;">${'D. Social'}</p>
        </div>
    </div>

    <div class="container">
        <div class="row" style="margin-top: 2.2in; margin-left: 0.8in;">
            <div class="col">
                <h3>Resueltos:</h3>
                <p>${'22'}</p>
                <h3>Pendientes:</h3>
                <p>${'1'}</p>
                <h3>Rendimiento:</h3>
                <p>${'7'}</p>
            </div>
            <div class="col">
                <div id="chart" style="margin-top: -0.5in; margin-left: .3in;"></div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <img src="./imgDocx/${'tesoreria.png'}" alt="" style="width: 100%; display: block; margin-top: .5in; margin-left: .5in;">
        </div>
    </div>
</div>`
*/