// Función para actualizar el tamaño del gráfico y la fuente
function updateChartSize(chart, screenWidth) {
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

// Cargar los datos del JSON
fetch('datos.json')
    .then(response => response.json())
    .then(data => {
        // Generar gráficos para cada dependencia
        Object.keys(data).forEach(categoria => {
            const resumen = data[categoria].Resumen;
            const options = {
                series: [resumen.Resueltos_totales, resumen.Pendientes_totales],
                chart: {
                    type: 'donut',
                    width: 410, // Ajusta este valor según tu preferencia
                },
                labels: ['Resueltos', 'Pendientes'],
                colors: ['#204f78', '#b63329'],
                dataLabels: {
                    enabled: false,
                    offsetY: 10,
                    formatter: function (val) {
                        return `${Math.round(val)}%`;
                    }
                },
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                total: {
                                    show: true,
                                    label: `${resumen.Rendimiento_general}%`,
                                    fontSize: '40px',
                                    formatter: function (w) {
                                        return '';
                                    },
                                    offsetY: 50
                                },
                                name: {
                                    show: true, // Oculta el nombre inicialmente
                                    offsetY: 10
                                }
                            }
                        }
                    }
                },
                responsive: [{
                    breakpoint: 400,
                    options: {
                        chart: {
                            width: 150
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            };

            const chart = new ApexCharts(document.querySelector(`#${categoria}`), options);
            chart.render();

            // Ejecutar la función cuando se carga la página por primera vez
            updateChartSize(chart, window.innerWidth);

            // Agregar un controlador de eventos resize para ajustar el tamaño cuando la ventana cambie
            window.addEventListener('resize', function () {
                updateChartSize(chart, window.innerWidth);
            });
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
