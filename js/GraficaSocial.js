const dependencias = [
    {
        nombre: 'Social',
        resueltos: 0,
        pendientes: 6,
        rendimiento: '0%'
    },
    {
        nombre: 'Seguridad',
        resueltos: 15,
        pendientes: 8,
        rendimiento: '65%'
    },
    {
        nombre: 'Proteccion',
        resueltos: 11,
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
        pendientes: 2,
        rendimiento: '60%'
    },
    {
        nombre: 'IMCUFIDEM',
        resueltos: 0,
        pendientes: 2,
        rendimiento: '0%'
    },
    {
        nombre: 'Comunicacion',
        resueltos: 5,
        pendientes: 1,
        rendimiento: '83%'
    }, {
        nombre: 'Secretaria',
        resueltos: 3,
        pendientes: 0,
        rendimiento: '100%'
    }
];


// Generar gráficos para cada dependencia
dependencias.forEach(dependencia => {
    if (dependencia.rendimiento !== '0%') {
        const options = {
            series: [dependencia.resueltos, dependencia.pendientes],
            chart: {
                type: 'donut',
                width: 300, // Ajusta este valor según tu preferencia
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
                                fontSize: '30px',
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
    } else {
        const dependenciaContainer = document.querySelector(`#chart_${dependencia.nombre.toLowerCase()}`).parentElement;
        dependenciaContainer.style.display = 'none';
    }
});