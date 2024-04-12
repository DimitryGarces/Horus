// Definir una función para cerrar sesión
function cerrarSesion() {
    fetch('../Back-End-php/logOut.php')
        .then(response => {
            if (response.ok) {
                console.log('Sesión cerrada correctamente.');
                 window.location.href = 'index.html';
            } else {
                console.error('Error al cerrar la sesión:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error al cerrar la sesión:', error);
        });
}

document.querySelector('.salir').addEventListener('click', cerrarSesion);
