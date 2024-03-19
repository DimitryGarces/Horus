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
    });
  })
  .catch(error => console.error('Error al cargar el JSON:', error));
