document.getElementById('iniciarS').addEventListener('click', function () {
    var loginForm = document.getElementById('loginForm');
    loginForm.classList.toggle('form-hidden');
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

function showForm() {
    var loginForm = document.getElementById('loginForm');
    loginForm.classList.toggle('form-hidden');
}