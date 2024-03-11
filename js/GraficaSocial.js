const dependencias = [
    {
        nombre: 'Social',
        resueltos: 1,
        pendientes: 6,
        rendimiento: '14.3%'
    },
    {
        nombre: 'Seguridad',
        resueltos: 23,
        pendientes: 13,
        rendimiento: '63.9%'
    },
    {
        nombre: 'Proteccion',
        resueltos: 13,
        pendientes: 1,
        rendimiento: '92.9%'
    },
    {
        nombre: 'Cultura',
        resueltos: 5,
        pendientes: 0,
        rendimiento: '100%'
    },
    {
        nombre: 'Desarrollo',
        resueltos: 5,
        pendientes: 1,
        rendimiento: '83.3%'
    },
    {
        nombre: 'IMCUFIDEM',
        resueltos: 4,
        pendientes: 0,
        rendimiento: '100%'
    },
    {
        nombre: 'Comunicacion',
        resueltos: 6,
        pendientes: 1,
        rendimiento: '85.7%'
    }, {
        nombre: 'Secretaria',
        resueltos: 0,
        pendientes: 0,
        rendimiento: '0%'
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