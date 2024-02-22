
const dependencias = [
    {
        nombre: 'Ciudad',
        resueltos: 38,
        pendientes: 18,
        rendimiento: '38%'
    },
    {
        nombre: 'Social',
        resueltos: 50,
        pendientes: 14,
        rendimiento: '50%'
    },
    {
        nombre: 'Administrativo',
        resueltos: 87,
        pendientes: 17,
        rendimiento: '87%'
    },
    {
        nombre: 'Legal',
        resueltos: 35,
        pendientes: 12,
        rendimiento: '35%'
    },
    {
        nombre: 'Atencion',
        resueltos: 0,
        pendientes: 0,
        rendimiento: '0%'
    },
    {
        nombre: 'Ciudadana',
        resueltos: 0,
        pendientes: 0,
        rendimiento: '0%'
    },
    {
        nombre: 'Defensoria',
        resueltos: 0,
        pendientes: 1,
        rendimiento: '0%'
    },
];

// Generar gráficos para cada dependencia
dependencias.forEach(dependencia => {
    if (dependencia.rendimiento !== '0%') {
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
    }else{
        const dependenciaContainer = document.querySelector(`#chart_${dependencia.nombre.toLowerCase()}`).parentElement;
        dependenciaContainer.style.display = 'none';
    }
});
