// Performance Data from the image (Historical Record)
const performanceData = {
  labels: [
    '10/2023', '11/2023', '12/2023', '1/2024', '2/2024', '3/2024',
    '4/2024', '5/2024', '6/2024', '7/2024', '8/2024', '9/2024',
    '10/2024', '11/2024', '1/2025', '12+/2024', '5/2025', '5/2025 (2nd)',
    '5/2025 (3rd)', '6/2025', '7/2025', '8/2025'
  ],
  totalFunds: [
    49470, 61470, 70170, 74997, 90861, 105970,
    116170, 125456.32, 129914, 154176, 170187.15, 200170.15,
    216095.15, 237148.15, 260548.15, 261148.15, 288725.57,
    288725.57, 288725.57, 318343.67, 318206.31, 354640.81
  ],
  profitYield: [
    0.68, 5.14, 4.08, 4.52, 4.39, 2.83,
    3.62, 5.16, 4.31, 6.16, 1.14, 1.86,
    1.57, 1.75, 1.75, 0.87, 1.25, 1.14,
    1.75, 1.11, 0.38, 1.97
  ]
};

// Chart Configuration
const chartConfig = {
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Inter', sans-serif",
            weight: '600'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 54, 0.98)',
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
          weight: '600'
        },
        titleColor: '#f1f5f9',
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        },
        bodyColor: '#94a3b8',
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        borderColor: '#2dd4bf',
        borderWidth: 1,
        callbacks: {
          title: function(context) {
            return 'Period: ' + context[0].label;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif"
          },
          maxRotation: 45,
          minRotation: 45,
          color: '#94a3b8'
        },
        title: {
          display: true,
          text: 'Time Period',
          font: {
            size: 13,
            family: "'Inter', sans-serif",
            weight: '600'
          },
          color: '#f1f5f9'
        }
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(51, 65, 85, 0.3)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: '#94a3b8'
        }
      }
    }
  }
};

// Create gradient for Total Funds chart (Teal theme)
function createTotalFundsGradient(ctx) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(45, 212, 191, 0.4)');
  gradient.addColorStop(0.5, 'rgba(45, 212, 191, 0.2)');
  gradient.addColorStop(1, 'rgba(45, 212, 191, 0)');
  return gradient;
}

// Create gradient for Profit Yield chart (Light Teal theme)
function createProfitYieldGradient(ctx) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(94, 234, 212, 0.4)');
  gradient.addColorStop(0.5, 'rgba(94, 234, 212, 0.2)');
  gradient.addColorStop(1, 'rgba(94, 234, 212, 0)');
  return gradient;
}

// Total Funds Chart
const totalFundsCtx = document.getElementById('totalFundsCanvas').getContext('2d');
const totalFundsChart = new Chart(totalFundsCtx, {
  ...chartConfig,
  data: {
    labels: performanceData.labels,
    datasets: [{
      label: 'Total Funds ($)',
      data: performanceData.totalFunds,
      borderColor: '#2dd4bf',
      backgroundColor: createTotalFundsGradient(totalFundsCtx),
      borderWidth: 2.5,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#2dd4bf',
      pointBorderColor: '#1e2936',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#5eead4',
      pointHoverBorderColor: '#1e2936',
      pointHoverBorderWidth: 2
    }]
  },
  options: {
    ...chartConfig.options,
    plugins: {
      ...chartConfig.options.plugins,
      tooltip: {
        ...chartConfig.options.plugins.tooltip,
        callbacks: {
          ...chartConfig.options.plugins.tooltip.callbacks,
          label: function(context) {
            return 'Total Funds: $' + context.parsed.y.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          }
        }
      }
    },
    scales: {
      ...chartConfig.options.scales,
      y: {
        ...chartConfig.options.scales.y,
        title: {
          display: true,
          text: 'Total Funds (USD)',
          font: {
            size: 13,
            family: "'Inter', sans-serif",
            weight: '600'
          },
          color: '#f1f5f9'
        },
        ticks: {
          ...chartConfig.options.scales.y.ticks,
          callback: function(value) {
            return '$' + value.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            });
          }
        }
      }
    }
  }
});

// Profit Yield Chart
const profitYieldCtx = document.getElementById('profitYieldCanvas').getContext('2d');
const profitYieldChart = new Chart(profitYieldCtx, {
  ...chartConfig,
  data: {
    labels: performanceData.labels,
    datasets: [{
      label: 'Profit Yield (%)',
      data: performanceData.profitYield,
      borderColor: '#5eead4',
      backgroundColor: createProfitYieldGradient(profitYieldCtx),
      borderWidth: 2.5,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#5eead4',
      pointBorderColor: '#1e2936',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#2dd4bf',
      pointHoverBorderColor: '#1e2936',
      pointHoverBorderWidth: 2
    }]
  },
  options: {
    ...chartConfig.options,
    plugins: {
      ...chartConfig.options.plugins,
      tooltip: {
        ...chartConfig.options.plugins.tooltip,
        callbacks: {
          ...chartConfig.options.plugins.tooltip.callbacks,
          label: function(context) {
            return 'Profit Yield: ' + context.parsed.y.toFixed(2) + '%';
          }
        }
      }
    },
    scales: {
      ...chartConfig.options.scales,
      y: {
        ...chartConfig.options.scales.y,
        title: {
          display: true,
          text: 'Profit Yield (%)',
          font: {
            size: 13,
            family: "'Inter', sans-serif",
            weight: '600'
          },
          color: '#f1f5f9'
        },
        ticks: {
          ...chartConfig.options.scales.y.ticks,
          callback: function(value) {
            return value.toFixed(1) + '%';
          }
        }
      }
    }
  }
});

// Tab Switching Functionality
const tabs = document.querySelectorAll('.chart-tab');
const chartContents = document.querySelectorAll('.chart-content');

tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));

    // Add active class to clicked tab
    this.classList.add('active');

    // Hide all chart contents
    chartContents.forEach(content => content.classList.remove('active'));

    // Show selected chart content
    const chartType = this.getAttribute('data-chart');
    const targetChart = document.getElementById(chartType + 'Chart');
    if (targetChart) {
      targetChart.classList.add('active');

      // Trigger chart resize to ensure proper rendering
      setTimeout(() => {
        if (chartType === 'totalFunds') {
          totalFundsChart.resize();
        } else if (chartType === 'profitYield') {
          profitYieldChart.resize();
        }
      }, 100);
    }
  });
});
