
const dependencias = [
    {
        nombre: 'Ciudad',
        resueltos: 32,
        pendientes: 30,
        rendimiento: '57.1%'
    },
    {
        nombre: 'Social',
        resueltos: 48,
        pendientes: 23,
        rendimiento: '70.7%'
    },
    {
        nombre: 'Administrativo',
        resueltos: 64,
        pendientes: 11,
        rendimiento: '78.6%'
    },
    {
        nombre: 'Legal',
        resueltos: 21,
        pendientes: 21,
        rendimiento: '51.6%'
    },
    {
        nombre: 'Atencion',
        resueltos: 10,
        pendientes: 3,
        rendimiento: '53.3%'
    },
    {
        nombre: 'Ciudadana',
        resueltos: 0,
        pendientes: 0,
        rendimiento: '0%'
    },
    {
        nombre: 'Defensoria',
        resueltos: 1,
        pendientes: 0,
        rendimiento: '100%'
    },
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
