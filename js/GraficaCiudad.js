const dependencias = [
    {
        nombre: 'Obras',
        resueltos: 2,
        pendientes: 5,
        rendimiento: '28.5%'
    },
    {
        nombre: 'Servicios',
        resueltos: 6,
        pendientes: 8,
        rendimiento: '42.8%'
    },
    {
        nombre: 'OPDAPAS',
        resueltos: 6,
        pendientes: 5,
        rendimiento: '54.5%'
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
        resueltos: 7,
        pendientes: 7,
        rendimiento: '50%'
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