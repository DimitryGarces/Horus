 // Crear datos para la gráfica de dona
 const options = {
     series: [22, 22],
     chart: {
         type: 'donut',
         width: 340, // Ajusta este valor según tu preferencia
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
     legend: {
         show: false // Oculta las leyendas
     },
     plotOptions: {
         pie: {
             donut: {
                 labels: {
                     show: true,
                     total: {
                         show: true,
                         label: `22%`,
                         fontSize: '60px',
                         formatter: function (w) {
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
     }
 };
 // Crear la gráfica de dona
 var chart = new ApexCharts(document.getElementById("chart"), options);
 chart.render();