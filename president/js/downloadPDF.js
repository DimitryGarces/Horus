// Selecciona el elemento HTML que quieres convertir a PDF
const element = document.getElementById('content');

// Agrega un evento de clic al botón para descargar el PDF
document.getElementById('download-pdf').addEventListener('click', () => {
    // Opciones para la conversión
    const options = {
        filename: 'documento.pdf',
        image: { type: 'png', quality: 1 },
        html2canvas: { scale: 3 }, // Incrementa la escala para una mejor resolución
        jsPDF: {
            unit: 'in',
            format: 'letter', // Tamaño personalizado
            orientation: 'portrait',
            precision: 300, // Ajusta la precisión del PDF
            quality: 1 // Ajusta la calidad de la imagen
        }
    };


    // Convierte el elemento HTML a PDF
    html2pdf().from(element).set(options).save();
});