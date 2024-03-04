const dependencias = [
    {
        nombre: 'Obras',
        resueltos: 2,
        pendientes: 6,
        rendimiento: '25%'
    },
    {
        nombre: 'Servicios',
        resueltos: 7,
        pendientes: 9,
        rendimiento: '43.8%'
    },
    {
        nombre: 'OPDAPAS',
        resueltos: 6,
        pendientes: 7,
        rendimiento: '46.2%'
    },
    {
        nombre: 'Gerencia',
        resueltos: 1,
        pendientes: 0,
        rendimiento: '100%'
    },
    {
        nombre: 'Medio',
        resueltos: 10,
        pendientes: 5,
        rendimiento: '66.6%'
    },
    {
        nombre: 'Desarrollo',
        resueltos: 13,
        pendientes: 2,
        rendimiento: '86.7%'
    }
];

// Generar gráficos para cada dependencia
dependencias.forEach(dependencia => {
    const options = {
        series: [dependencia.resueltos, dependencia.pendientes],
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
                            label: dependencia.rendimiento,
                            fontSize: '50px',
                            formatter: function (w) {
                                const percentage = dependencia.rendimiento;
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

    const chart = new ApexCharts(document.querySelector(`#chart_${dependencia.nombre.toLowerCase()}`), options);
    chart.render();
});