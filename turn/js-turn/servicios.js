fetch('../Back-End-php/select/servicios.php')
    .then(response => response.text()) // Convertir la respuesta a texto
    .then(data => {
        // Aquí puedes manipular los datos recibidos, por ejemplo, insertarlos en el DOM
        document.getElementById('resultado').innerHTML = data;
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
