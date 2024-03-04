const dependencias = [
    {
        nombre: 'Social',
        resueltos: 0,
        pendientes: 7,
        rendimiento: '0%'
    },
    {
        nombre: 'Seguridad',
        resueltos: 22,
        pendientes: 13,
        rendimiento: '62.9%'
    },
    {
        nombre: 'Proteccion',
        resueltos: 13,
        pendientes: 0,
        rendimiento: '100%'
    },
    {
        nombre: 'Cultura',
        resueltos: 5,
        pendientes: 0,
        rendimiento: '100%'
    },
    {
        nombre: 'Desarrollo',
        resueltos: 3,
        pendientes: 3,
        rendimiento: '50%'
    },
    {
        nombre: 'IMCUFIDEM',
        resueltos: 4,
        pendientes: 0,
        rendimiento: '100%'
    },
    {
        nombre: 'Comunicacion',
        resueltos: 5,
        pendientes: 1,
        rendimiento: '83.3%'
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