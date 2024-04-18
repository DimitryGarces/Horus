// Definir los datos del mes
var month = {
    categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    series: [{
        name: 'Rendimiento Mensual',
        data: [12, 19, 3, 5, 2]
    }]
};

// Configuración del gráfico
var options = {
    chart: {
        type: 'line',
        height: 350 // Definir la altura del gráfico
    },
    series: month.series,
    xaxis: {
        categories: month.categories // Definir las etiquetas del eje x
    },
    yaxis: {
        labels: {
            formatter: function (val) {
                return val; // Incluir el formato de etiqueta en el eje y si es necesario
            }
        }
    }
};

// Crear el gráfico
var chart = new ApexCharts(document.querySelector("#myLineChart"), options);
chart.render();
