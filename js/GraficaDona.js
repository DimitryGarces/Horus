var rendimiento = "70.6%";
var options = {
    series: [204, 85],
    chart: {
        width: 500,
        type: 'donut',
    },
    labels: ['Resueltos', 'Pendientes'],
    colors: ['#70ce58', '#204f78'],
    dataLabels: {
        enabled: false,
        offsetY: 10, // Ajusta este valor para centrar verticalmente
        formatter: function (val, opts) {
            if (opts.seriesIndex === 0) {
                return `${Math.round(val)}%`;
            }
            return '';
        }
    },
    plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    total: {
                        show: true,
                        label: rendimiento,
                        fontSize: '70px',
                        formatter: function () {
                        },
                        offsetY: 50
                    },
                    name: {
                        show: true, // Oculta el nombre inicialmente
                        offsetY: 5
                    }
                },
                dataLabels: {
                    enabled: true, // Habilita las etiquetas de datos
                    offsetY: 0, // Ajusta este valor para centrar verticalmente
                    formatter: function (val, opts) {
                        if (opts.seriesIndex === 0) {
                            return `${Math.round(val)}%`;
                        }
                        return '';
                    }
                },
                tooltip: {
                    enabled: true, // Habilita el tooltip
                    offsetY: 0, // Ajusta este valor para desplazar el tooltip hacia abajo
                    custom: function({ series, seriesIndex, dataPointIndex, w }) {
                        return `<div class="apexcharts-tooltip-custom">${rendimiento}</div>`;
                    }
                }
            }
            
        }
    },
    responsive: [{
        breakpoint: 400,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#chart_rendimiento"), options);
chart.render();
