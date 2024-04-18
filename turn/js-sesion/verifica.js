async function verificarSesion() {
    try {
        const response = await fetch('../Back-End-php/verificarSesion.php');
        const data = await response.json();
        
        if (data.autenticado) {
            console.log('Usuario autenticado:', data.usuario);
        } else {
            console.log('Usuario no autenticado, redirigiendo a la página de inicio de sesión.');
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error al verificar la sesión:', error);
    }
}

verificarSesion();
