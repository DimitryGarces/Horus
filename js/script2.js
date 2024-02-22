/* 
var options = {
    series: [93],
    chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        radialBar: {
        startAngle: -90,
        endAngle: 90,
            track: {
                background: "#999",
                strokeWidth: '97%',
                margin: 5,
                dropShadow: {
                    enabled: true,
                    top: 2,
                    left: 0,
                    color: '#999',
                    opacity: 1,
                    blur: 2
                }
            },
            dataLabels: {
            name: {
                show: false
            },
            value: {
                offsetY: -2,
                fontSize: '22px'
                }
            }
        }
    },
    grid: {
        padding: {
            top: -10
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        },
        colors: ['#52a132']  // Set the specific green color
    },
    labels: ['RENDIMIENTO'],
};

var chart = new ApexCharts(document.querySelector("#chart_rendimiento"), options);
chart.render(); 
*/



var colors = ['#204f78', '#b63329'];

var options = {
    series: [{
        data: [152, 61]
    }],
    chart: {
        height: 350,
        type: 'bar'
    },
    colors: [colors[0], colors[1]],
    plotOptions: {
        bar: {
            columnWidth: '50%',
            distributed: true,
        }
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '40px',
            colors: ['#fff', '#fff']
            //colors: ['#FFF', '#b63329']
        },
        offsetY: 50, // Ajusta la posición vertical del número
        formatter: function (val) {
            return val;
        }
    },
    legend: {
        show: false
    },
    xaxis: {
        categories: [
            ['RESUELTOS'],
            ['PENDIENTES'],
        ],
        labels: {
            style: {
                colors: colors,
                fontSize: '25px'
            }
        }
    },
    events: {
        dataPointSelection: function (event, chartContext, config) {
            chartContext.w.globals.labels.formatter[config.seriesIndex] = function () {
                return '<span style="font-size: 40px;">' + chartContext.w.globals.series[config.seriesIndex][config.dataPointIndex] + '</span>';
            };
            chartContext.updateOptions({});
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chart_principal"), options);
chart.render();




var rendimiento = "71%";
var options = {
    series: [152, 61],
    chart: {
        width: 500,
        type: 'donut',
    },
    labels: ['Resueltos', 'Pendientes'],
    colors: ['#70ce58', '#204f78'],
    dataLabels: {
        enabled: false,
        offsetY: -50,
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
                        fontSize: '70px', // Ajusta el tamaño del porcentaje aquí
                        formatter: function () {
                            //return rendimiento;
                        }
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






