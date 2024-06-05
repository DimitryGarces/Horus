document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.ir');
    const verPdfContainer = document.getElementById('verPdf');
    const verPdfGeneralContainer = document.getElementById('verPdfGeneral');
    //const pdfToast = new bootstrap.Toast(document.getElementById('pdfToast'));
    //const pdfToastGeneral = new bootstrap.Toast(document.getElementById('pdfToastGeneral'));

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const producto = this.getAttribute('data-producto');
            const urlDestino = `president/${producto}.html`;

            // Redirige al usuario a la nueva URL en la misma ventana
            window.location.href = urlDestino;
        });
    });
    verPdfContainer.addEventListener('click', function() {
        pdfToast._element.classList.remove('d-none');
        pdfToast.show();
    });
    verPdfGeneralContainer.addEventListener('click', function () {
        pdfToastGeneral._element.classList.remove('d-none');
        pdfToastGeneral.show();
    });
    /*
    pdfToast._element.addEventListener('hidden.bs.toast', function () {
        pdfToast._element.classList.add('d-none');
    });
    pdfToastGeneral._element.addEventListener('hidden.bs.toast', function () {
        pdfToastGeneral._element.classList.add('d-none');
    });*/
});