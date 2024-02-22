document.addEventListener('DOMContentLoaded', function () {
    var colors = ['#204f78', '#b63329'];
    var options = {
        series: [{
            name: 'Total',
            data: [152, 61]
        }],
        chart: {
            toolbar: {
                show: false // Oculta la barra de herramientas que contiene el botón de descarga
            },
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                columnWidth: '50%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '40px',
                colors: ['#fff', '#fff']
            },
            offsetY: 0, // Ajusta la posición vertical del número
            formatter: function (val) {
                return val;
            }
        },
        colors: [colors[0], colors[1]],
        legend: {
            show: false
        },
        xaxis: {
            categories: [
                ['RESUELTOS'],
                ['PENDIENTES'],
            ],
            labels: {
                style: {
                    colors: colors,
                    fontSize: '25px'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '19px' // Ajusta el tamaño de la fuente para las etiquetas del eje y
                }
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#barChart"), options);
    chart.render();
});
