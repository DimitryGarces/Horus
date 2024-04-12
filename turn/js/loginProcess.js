const mensajeElement = document.getElementById('mensaje');
const loginButton = document.getElementById('loginButton');
var usuario, contrasena;
function validarLogin() {
  usuario = document.getElementById('usuario').value;
  contrasena = document.getElementById('contrasena').value;
  // Send AJAX request to loginProccess.php
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '../Back-End-php/loginProccess.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        const respuesta = JSON.parse(xhr.responseText);
        if (respuesta.session_u !== undefined && respuesta.id_usuario !== undefined) {
          if (respuesta.session_u) {
            cookie(respuesta);
          } else {
            // Mostrar mensaje de error
            mensajeElement.textContent += 'Credenciales incorrectas. Intente nuevamente.'
          }
        } else if (respuesta.error !== undefined) {
          // Mostrar mensaje de error
          mensajeElement.textContent = (respuesta.error);
        } else {
          // Respuesta no válida
          mensajeElement.textContent += 'Respuesta del servidor no válida.'
        }
      } catch (error) {
        // Error al analizar la respuesta JSON
        console.error('Error al analizar la respuesta JSON:', error);
        mensajeElement.textContent += 'Error al procesar la respuesta del servidor.'
      }
    } else {
      // Error al enviar la solicitud
      console.error('Error al enviar la solicitud:', xhr.status);
      mensajeElement.textContent += 'Error al enviar la solicitud al servidor.'
    }
  };
  xhr.send(`usuario=${usuario}&contrasena=${contrasena}`);
  return false;
}

loginButton.addEventListener('click', function () {
  // Eliminar o reemplazar el mensaje al hacer clic en el botón
  mensajeElement.textContent = '';
});


function cookie(respuesta) {
  generaCookie().then((digest) => {
    if (digest && digest !== '') {
      updateCookie(respuesta.id_usuario, digest).then((success) => {
        if (success) {
          window.location.href = 'Principal.html?username='+usuario;
        } else {
          console.error('No se pudo actualizar la cookie.');
        }
      }).catch((error) => {
        console.error('Error al actualizar la cookie:', error);
      });
    } else {
      // Manejar el caso de error si no se pudo generar el digest
      console.error('No se pudo generar el digest.');
    }
  }).catch((error) => {
    console.error('Error al generar la cookie:', error);
  });
}

function generaCookie() {
  return new Promise((resolve, reject) => {
    const updateXhr = new XMLHttpRequest();
    updateXhr.open('POST', '../Back-End-php/cookie.php');
    updateXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    updateXhr.onload = function () {
      if (updateXhr.status === 200) {
        try {
          const respuesta = JSON.parse(updateXhr.responseText);
          if (respuesta.success) {
            // La Cookie se genero correctamente
            resolve(respuesta.digest);
          } else {
            // Mostrar mensaje de error
            mensajeElement.textContent = respuesta.message;
            reject(new Error(respuesta.message));
          }
        } catch (error) {
          // Error al analizar la respuesta JSON
          console.error('Error al analizar la respuesta de la Cookie:', error);
          mensajeElement.textContent = 'Oops. Algo a salido mal.';
          reject(error);
        }
      } else {
        reject(new Error('Error en la solicitud AJAX: ' + updateXhr.status));
      }
    };
    updateXhr.send(`usuario=${usuario}`);
  });
}

function updateCookie(id_usuario, digest) {
  return new Promise((resolve, reject) => {
    const updateXhr = new XMLHttpRequest();
    updateXhr.open('POST', '../Back-End-php/updateRelogin.php');
    updateXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    updateXhr.onload = function () {
      if (updateXhr.status === 200) {
        try {
          const respuesta = JSON.parse(updateXhr.responseText);
          resolve(respuesta.success);
        } catch (error) {
          // Error al analizar la respuesta JSON
          console.error('Error al analizar la respuesta de la Cookie:', error);
          mensajeElement.textContent = 'Oops. Algo a salido mal.'
          reject(error);
        }
      } else {
        console.error('Vaya, pero que a pasado')
        reject(new Error('Error en la solicitud AJAX: ' + updateXhr.status));
      }
    };
    // Envía el ID de usuario y el digest como parámetros
    updateXhr.send(`id_usuario=${id_usuario}&digest=${digest}`);
  });
}



