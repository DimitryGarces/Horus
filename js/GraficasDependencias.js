
const dependencias = [
    {
        nombre: 'Ciudad',
        resueltos: 45,
        pendientes: 28,
        rendimiento: '62%'
    },
    {
        nombre: 'Social',
        resueltos: 57,
        pendientes: 22,
        rendimiento: '73%'
    },
    {
        nombre: 'Administrativo',
        resueltos: 74,
        pendientes: 15,
        rendimiento: '65.8%'
    },
    {
        nombre: 'Legal',
        resueltos: 34,
        pendientes: 17,
        rendimiento: '66.8%'
    },
    {
        nombre: 'Atencion',
        resueltos: 14,
        pendientes: 1,
        rendimiento: '99%'
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
