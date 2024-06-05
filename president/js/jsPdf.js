import jsPDF from 'jspdf';
const doc = new jsPDF();

doc.text('Hola mundo!', 10, 10);

// Agregar una imagen
doc.addImage('imagen.jpg', 10, 20);

// Agregar un gráfico
doc.line(10, 30, 100, 100);

doc.save('mi-pdf.pdf');
