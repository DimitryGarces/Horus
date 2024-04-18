
var colors = ['#204f78', '#b63329'];

// Función para actualizar el tamaño del gráfico y la fuente
function updateChartSize() {
  var screenWidth = window.innerWidth;

  // Define el tamaño del gráfico de barras en función del tamaño de la pantalla
  var chartHeight;
  var labelY;
  var labelX;
  var dataLabelsFontSize;
  if (screenWidth < 600) { // Extra small devices (portrait phones)
    chartHeight = 200;
    labelFontSize = '15px';
    labelY = '6px';
    labelX = '7px';
    dataLabelsFontSize = '5px';
  } else if (screenWidth < 800) { // Small devices (landscape phones)
    chartHeight = 220;
    labelFontSize = '20px';
    labelY = '10px';
    labelX = '10px';
    dataLabelsFontSize = '10px';
  } else if (screenWidth < 1100) { // Medium devices (tablets)
    chartHeight = 270;
    labelFontSize = '25px';
    labelY = '13px';
    labelX = '15px';
    dataLabelsFontSize = '20px';
  } else if (screenWidth < 1400) { // Large devices (desktops)
    chartHeight = 300;
    labelFontSize = '30px';
    labelY = '16px';
    labelX = '20px';
    dataLabelsFontSize = '30px';
  } else { // Extra large devices (large desktops)
    chartHeight = 350;
    labelFontSize = '35px';
    labelY = '19px';
    labelX = '25px';
    dataLabelsFontSize = '35px';
  }

  // Actualizar el tamaño del gráfico y la fuente
  chart.updateOptions({
    chart: {
      height: chartHeight
    },
    xaxis: {
      labels: {
        style: {
          fontSize: labelX
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: labelY // Tamaño de fuente para las etiquetas del eje y
        }
      }
    },
    dataLabels: {
      style: {
        fontSize: dataLabelsFontSize // Tamaño de fuente para las etiquetas de datos
      }
    }
  });
}

var options = {
  series: [{
    name: 'Total',
    data: [403, 76]
  }],
  chart: {
    toolbar: {
      show: false // Oculta la barra de herramientas que contiene el botón de descarga
    },
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      distributed: true,
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '40px', // Tamaño de fuente predeterminado para las etiquetas de datos
      colors: ['#fff', '#fff']
    },
    offsetY: 15, // Ajusta la posición vertical del número
    formatter: function (val) {
      return val;
    }
  },
  colors: [colors[0], colors[1]],
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
        fontSize: '25px' // Este valor se sobrescribe en la función updateChartSize
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '19px' // Ajusta el tamaño de la fuente para las etiquetas del eje y
      }
    }
  }
};

var chart = new ApexCharts(document.querySelector("#myChart"), options);
chart.render();

// Ejecutar la función cuando se carga la página por primera vez
updateChartSize();

// Agregar un controlador de eventos resize para ajustar el tamaño cuando la ventana cambie
window.addEventListener('resize', updateChartSize);

