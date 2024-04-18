document.addEventListener('DOMContentLoaded', function () {
  const mensajeElement = document.getElementById('mensaje');
  const loginButton = document.getElementById('loginButton');
  var usuario, contrasena;

  loginButton.addEventListener('click', function (event) {
    event.preventDefault();
    usuario = document.getElementById('usuario').value;
    contrasena = document.getElementById('contrasena').value;
    mensajeElement.textContent = '';
    validarLogin(usuario, contrasena);
  });
  function validarLogin(usuario, contrasena) {
    return new Promise((resolve) => {
      const updateXhr = new XMLHttpRequest();
      updateXhr.open('POST', '../Back-End-php/loginProccess.php');
      updateXhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      updateXhr.onload = function () {
        if (updateXhr.status === 200) {
          try {
            const respuesta = updateXhr.responseText;
            const datos = respuesta.split('-');
            if (datos.length > 1) {
              const usuarioData = {
                id_usuario: datos[0],
                nombre: datos[1],
                usuario: datos[2],
                area: datos[3]
              };
              cookie(usuarioData);
            } else {
              mensajeElement.textContent += datos;
            }
          } catch (error) {
            mensajeElement.textContent = 'Oops. Algo a salido mal.'
          }
        } else {
          console.error('Vaya, pero que a pasado')
        }
      };
      updateXhr.send(`usuario=${usuario}&contrasena=${contrasena}`);
    });
  }


  function cookie(respuesta) {
    generaCookie().then((digest) => {
      if (digest && digest !== '') {
        updateCookie(respuesta.id_usuario, digest).then((success) => {
          if (success) {
            window.location.href = 'Principal.html?username=' + usuario + '&department=' + respuesta.area;
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
});


/*
function validarLogin() {
  usuario = document.getElementById('usuario').value;
  contrasena = document.getElementById('contrasena').value;
  if (usuario === "" || contrasena === "") {
    mensajeElement.textContent == 'Favor de llenar todos los campos.'
    return false;
  }
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '../Back-End-php/loginProccess.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        const respuesta = JSON.parse(xhr.responseText);
        if (respuesta.session_u !== undefined) {
          if (respuesta.session_u) {
            cookie(respuesta);
          } else {
            mensajeElement.textContent += 'Credenciales incorrectas. Intente nuevamente.'
          }
        } else if (respuesta.error !== undefined) {
          mensajeElement.textContent = (respuesta.error);
        } else {
          mensajeElement.textContent += 'Respuesta del servidor no válida.'
        }
      } catch (error) {
        console.error('Error al analizar la respuesta JSON:', error);
        mensajeElement.textContent += 'Error al procesar la respuesta del servidor.'
      }
    } else {
      console.error('Error al enviar la solicitud:', xhr.status);
      mensajeElement.textContent += 'Error al enviar la solicitud al servidor.'
    }
  };
  xhr.send(`usuario=${usuario}&contrasena=${contrasena}`);
  return true;
}
*/
