const dependencias = [
    {
        nombre: 'Consejeria',
        resueltos: 5,
        pendientes: 2,
        rendimiento: '71.4%'
    },
    {
        nombre: 'Contraloria',
        resueltos: 9,
        pendientes: 10,
        rendimiento: '47.4%'
    },
    {
        nombre: 'Gobernacion',
        resueltos: 0,
        pendientes: 2,
        rendimiento: '0%'
    },
    {
        nombre: 'Gobierno',
        resueltos: 9,
        pendientes: 4,
        rendimiento: '69.2%'
    },
    {
        nombre: 'Transparencia',
        resueltos: 2,
        pendientes: 0,
        rendimiento: '100%'
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