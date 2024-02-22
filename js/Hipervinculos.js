document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.ir');
    const volverButtons = document.querySelectorAll('.volver');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const producto = this.getAttribute('data-producto');
            const urlDestino = `${producto}.html`;

            // Redirige al usuario a la nueva URL en la misma ventana
            window.location.href = urlDestino;
        });
    });

    volverButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Redirige al usuario a la página index.html
            window.location.href = 'index.html';
        });
    });
});
