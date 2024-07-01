var rendimiento = "93%";

// Función para actualizar el tamaño del gráfico y la fuente
function updateChartSize() {
    var screenWidth = window.innerWidth;

    // Define el tamaño del gráfico donut en función del tamaño de la pantalla
    var chartWidth;
    var font;
    if (screenWidth < 600) { // Extra small devices (portrait phones)
        chartWidth = 180;
        font = '10px';
    } else if (screenWidth < 800) { // Small devices (landscape phones)
        chartWidth = 280;
        font = '15px';
    } else if (screenWidth < 1100) { // Medium devices (tablets)
        chartWidth = 380;
        font = '30px';
    } else if (screenWidth < 1400) { // Large devices (desktops)
        chartWidth = 480;
        font = '50px';
    } else { // Extra large devices (large desktops)
        chartWidth = 540;
        font = '70px';
    }

    // Actualizar el tamaño del gráfico y la fuente
    chart.updateOptions({
        chart: {
            width: chartWidth
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        total: {
                            fontSize: font
                        },
                        name: {
                            style: {
                                fontSize: font
                            }
                        }
                    }
                }
            }
        }
    });
}

var options = {
    series: [1033, 76],
    chart: {
        width: 500,
        type: 'donut',
    },
    labels: ['Resueltos', 'Pendientes'],
    colors: ['#70ce58', '#204f78'],
    dataLabels: {
        enabled: false,
        offsetY: 10,
        formatter: function (val, opts) {
            if (opts.seriesIndex === 0) {
                return `${Math.round(val)}%`;
            }
            return '';
        }
    },
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    total: {
                        show: true,
                        label: rendimiento,
                        fontSize: '70px',
                        formatter: function () {},
                        offsetY: 50
                    },
                    name: {
                        show: true,
                        offsetY: 5
                    }
                },
                dataLabels: {
                    enabled: true,
                    offsetY: 0,
                    formatter: function (val, opts) {
                        if (opts.seriesIndex === 0) {
                            return `${Math.round(val)}%`;
                        }
                        return '';
                    }
                },
                tooltip: {
                    enabled: true,
                    offsetY: 0,
                    custom: function({ series, seriesIndex, dataPointIndex, w }) {
                        return `<div class="apexcharts-tooltip-custom">${rendimiento}</div>`;
                    }
                }
            }
            
        }
    },
    responsive: [{
        breakpoint: 400,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#chart_rendimiento"), options);
chart.render();

// Ejecutar la función cuando se carga la página por primera vez
updateChartSize();

// Agregar un controlador de eventos resize para ajustar el tamaño cuando la ventana cambie
window.addEventListener('resize', updateChartSize);
