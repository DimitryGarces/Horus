function verificarSesion() {
    return new Promise((resolve, reject) => {
        fetch('../Back-End-php/verificarSesion.php', {
            method: 'GET',
            credentials: 'include'
        })
            .then(data => {
                if (data.session_u) {
                    resolve(true);
                } else {
                    resolve(revisaCookie());
                }
            })
            .catch(error => {
                // Manejar errores de la solicitud
                console.error('No se pudo validar la sesion:', error);
                reject(error);
            });
    });
}
function revisaCookie() {
    return new Promise((resolve, reject) => {
        fetch('../Back-End-php/loginProccess.php', {
            method: 'GET',
            credentials: 'include'
        })
            .then(data => {
                if (data.session_u) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(error => {
                // Manejar errores de la solicitud
                console.error('Error al verificar la cookie:', error);
                reject(error);
            });
    });
}

verificarSesion()
    .then(validado => {
        // Si la sesión está validada, ejecuta este código
        const bodyElement = document.querySelector('body');
        bodyElement.style.display = 'block';

        var graph1 = document.createElement('script');
        var graph2 = document.createElement('script');
        var graph3 = document.createElement('script');

        var sE = document.createElement('script');
        var sE4 = document.createElement('script');

        sE.src = "./js-turn/crearAsunto.js";
        sE4.src = "./js-turn/servicios.js";

        graph1.src = "./js/graph.js";
        graph2.src = "./js/donutGraph.js";
        graph3.src = "./js/lineGraph.js";

        document.body.appendChild(graph1);
        document.body.appendChild(graph2);
        document.body.appendChild(graph3);
        document.body.appendChild(sE);
        document.body.appendChild(sE4);
        console.log('El usuario está logueado');
    })
    .catch(error => {
        console.error(error);
        window.location.href = 'index.html';
    });
