document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.ir');
    const volverButtons = document.querySelectorAll('.volver');

    const verPdfContainer = document.getElementById('verPdf');
    const pdfToast = new bootstrap.Toast(document.getElementById('pdfToast'));

    const verPdfGeneralContainer = document.getElementById('verPdfGeneral');
    const pdfToastGeneral = new bootstrap.Toast(document.getElementById('pdfToastGeneral'));

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            const producto = this.getAttribute('data-producto');
            const urlDestino = `${producto}.html`;

            // Redirige al usuario a la nueva URL en la misma ventana
            window.location.href = urlDestino;
        });
    });

    volverButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Redirige al usuario a la página index.html
            window.location.href = 'index.html';
        });
    });
    verPdfContainer.addEventListener('click', function() {
        pdfToast._element.classList.remove('d-none');
        pdfToast.show();
    });
    pdfToast._element.addEventListener('hidden.bs.toast', function () {
        pdfToast._element.classList.add('d-none');
    });

    verPdfGeneralContainer.addEventListener('click', function () {
        pdfToastGeneral._element.classList.remove('d-none');
        pdfToastGeneral.show();
    });

    pdfToastGeneral._element.addEventListener('hidden.bs.toast', function () {
        pdfToastGeneral._element.classList.add('d-none');
    });
});