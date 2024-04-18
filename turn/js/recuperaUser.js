// Obtener el id_usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const department = urlParams.get('department');
const userNameElements = document.querySelectorAll('.userName');
const departmentElements = document.querySelectorAll('.direccion');
userNameElements.forEach(function(element) {
    element.textContent = 'DimitryGarces';
});
departmentElements.forEach(function(element) {
    element.textContent = 'Oficina de la Presidencia';
});
