document.addEventListener('DOMContentLoaded', function () {
    const volverButtons = document.querySelectorAll('.volver');
    volverButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Redirige al usuario a la página index.html
            window.location.href = '../index.html';
        });
    });
});
