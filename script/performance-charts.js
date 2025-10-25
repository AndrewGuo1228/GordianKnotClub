// Performance Data from the image (Historical Record)
const performanceData = {
  labels: [
    '10/2023', '11/2023', '12/2023', '1/2024', '2/2024', '3/2024',
    '4/2024', '5/2024', '6/2024', '7/2024', '8/2024', '9/2024',
    '10/2024', '11/2024', '1/2025', '12+/2024', '5/2025', '5/2025 (2nd)',
    '5/2025 (3rd)', '6/2025', '7/2025', '8/2025','9/2025'
  ],
  totalFunds: [
    49470, 61470, 70170, 74997, 90861, 105970,
    116170, 125456.32, 129914, 154176, 170187.15, 200170.15,
    216095.15, 237148.15, 260548.15, 261148.15, 288725.57,
    288725.57, 288725.57, 318343.67, 318206.31, 354640.81,
    371231.31
  ],
  profitYield: [
    5.02,	4.08,	3.95,	4.52,	4.12, 4.04,
    5.16,	3.99,	6.16,	1.66,	2.30,	2.57,
    2.46,	1.67,	1.25,	1.63,	2.50,	1.11,
    1.97, 1.69, 1.45, 1.43, 1.39
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

    // === smooth animation ===
    animation: {
      duration: 1800,
      easing: 'easeInOutQuart'
    },
    transitions: {
      show: { animations: { x: { from: 0 }, y: { from: 0 } } },
      hide: { animations: { x: { to: 0 }, y: { to: 0 } } }
    },
    animations: {
      tension: {
        duration: 1500,
        easing: 'linear',
        from: 0.3,
        to: 0.4,
        loop: false
      },
      borderWidth: {
        duration: 1000,
        easing: 'easeOutCubic',
        from: 0,
        to: 2.5
      },
      pointRadius: {
        duration: 600,
        easing: 'easeOutBack',
        from: 0,
        to: 4
      }
    },
    hover: {
      mode: 'nearest',
      intersect: false
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
          callback: function (value) {
            return '$' + value.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            });
          }
        }
      }
    }
  }
}); // ✅ make sure this closing brace and parenthesis exist


// Profit Yield Chart (animated left-to-right draw)
const profitYieldCtx = document.getElementById('profitYieldCanvas').getContext('2d');
const profitYieldChart = new Chart(profitYieldCtx, {
  ...chartConfig,
  data: {
    labels: performanceData.labels,
    datasets: [{
      label: 'Dividend Yield (%)',
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

    // === Main animation: line draws left-to-right ===
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },

    // // Progressive point reveal along the x-axis
    // animations: {
    //   x: {
    //     type: 'number',
    //     easing: 'easeInOutQuad',
    //     duration: 2000,
    //     from: NaN,
    //     // delay(ctx) {
    //     //   // stagger drawing points
    //     //   return ctx.index * 50;
    //     // }
    //   },
    //   y: {
    //     type: 'number',
    //     easing: 'easeInOutQuad',
    //     duration: 2000,
    //     from: NaN,
    //     // delay(ctx) {
    //     //   return ctx.index * 50;
    //     // }
    //   },
    //   pointRadius: {
    //     duration: 400,
    //     easing: 'easeOutBack',
    //     from: 0,
    //     to: 4,
    //     // delay(ctx) {
    //     //   return ctx.index * 50 + 500; // points appear slightly after the line segment
    //     // }
    //   }
    // },

    hover: {
      mode: 'nearest',
      intersect: false
    },

    plugins: {
      ...chartConfig.options.plugins,
      tooltip: {
        ...chartConfig.options.plugins.tooltip,
        callbacks: {
          ...chartConfig.options.plugins.tooltip.callbacks,
          label: function (context) {
            return 'Dividend Yield: ' + context.parsed.y.toFixed(2) + '%';
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
          text: 'Dividend Yield (%)',
          font: {
            size: 13,
            family: "'Inter', sans-serif",
            weight: '600'
          },
          color: '#f1f5f9'
        },
        ticks: {
          ...chartConfig.options.scales.y.ticks,
          callback: function (value) {
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
        } else if (chartType === 'DividendYield') {
          profitYieldChart.resize();
        }
      }, 100);
    }
  });
});

// === Chart fade-in on scroll ===
const chartWrappers = document.querySelectorAll('.chart-wrapper');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.3 }
);
chartWrappers.forEach(wrapper => observer.observe(wrapper));
