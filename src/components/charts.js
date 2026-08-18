// Chart.js demos — a switchable multi-series chart (bar / line / area / radar)
// plus a doughnut/pie chart. Only the pieces we use are imported + registered.
import {
  Chart,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  RadarController,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  DoughnutController,
  ArcElement,
  Filler,
  Tooltip
} from 'chart.js';
import { barData, pieData } from '../data/demoData.js';

Chart.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  RadarController,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  DoughnutController,
  ArcElement,
  Filler,
  Tooltip
);

// The chart types offered by the selector (value -> label shown in the UI).
export const CHART_TYPES = [
  { value: 'bar', label: 'Grouped Bar' },
  { value: 'line', label: 'Line' },
  { value: 'area', label: 'Area' },
  { value: 'radar', label: 'Radar' }
];

// Read a wireframe greyscale token from the CSS custom properties.
const token = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// Compact currency, e.g. 200000 -> "$200K", 1000000 -> "$1M".
function currencyShort(v) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(v % 1_000_000 ? 1 : 0)}M`;
  if (v >= 1_000) return `$${Math.round(v / 1_000)}K`;
  return `$${v}`;
}

const currencyFull = (v) => `$${Math.round(v).toLocaleString('en-US')}`;

// Base font shared by all chart text.
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
Chart.defaults.color = token('--bh-muted');

// Build the three greyscale datasets, styled for the requested chart type.
function buildDatasets(type) {
  const greys = [token('--bh-series-1'), token('--bh-series-2'), token('--bh-series-3')];
  const series = [
    { label: 'Fuel', data: barData.series.fuel },
    { label: 'Carbon Credits', data: barData.series.carbon },
    { label: 'Total Savings', data: barData.series.total }
  ];

  return series.map((s, i) => {
    const c = greys[i];
    const ds = { label: s.label, data: s.data };

    if (type === 'bar') {
      ds.backgroundColor = c;
      ds.borderRadius = 3;
    } else if (type === 'line') {
      Object.assign(ds, {
        borderColor: c,
        backgroundColor: c,
        pointBackgroundColor: c,
        fill: false,
        tension: 0.35,
        borderWidth: 2,
        pointRadius: 3
      });
    } else if (type === 'area') {
      Object.assign(ds, {
        borderColor: c,
        backgroundColor: `${c}40`, // ~25% alpha fill
        pointBackgroundColor: c,
        fill: true,
        tension: 0.35,
        borderWidth: 2,
        pointRadius: 2
      });
    } else if (type === 'radar') {
      Object.assign(ds, {
        borderColor: c,
        backgroundColor: `${c}33`, // ~20% alpha fill
        pointBackgroundColor: c,
        fill: true,
        borderWidth: 2,
        pointRadius: 2
      });
    }
    return ds;
  });
}

// Cartesian (bar/line/area) vs. radial (radar) scale config.
function buildScales(type) {
  if (type === 'radar') {
    return {
      r: {
        beginAtZero: true,
        grid: { color: token('--bh-line') },
        angleLines: { color: token('--bh-line') },
        pointLabels: { font: { size: 12 }, color: token('--bh-ink-soft') },
        ticks: {
          backdropColor: 'transparent',
          font: { size: 10 },
          maxTicksLimit: 5,
          callback: (v) => currencyShort(v)
        }
      }
    };
  }
  return {
    x: {
      grid: { display: false },
      border: { color: token('--bh-line-strong') },
      ticks: { font: { size: 12 } }
    },
    y: {
      beginAtZero: true,
      border: { display: false },
      grid: { color: token('--bh-line') },
      ticks: {
        font: { size: 12 },
        maxTicksLimit: 6,
        callback: (v) => currencyShort(v)
      }
    }
  };
}

// Create the main chart in the requested type. "area" is a filled line chart.
export function createMainChart(canvas, type = 'bar') {
  const chartType = type === 'area' ? 'line' : type;

  return new Chart(canvas, {
    type: chartType,
    data: {
      labels: barData.labels,
      datasets: buildDatasets(type)
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 8 } },
      categoryPercentage: 0.7,
      barPercentage: 0.9,
      plugins: {
        legend: { display: false }, // custom DOM legend is used instead
        tooltip: {
          backgroundColor: token('--bh-ink'),
          padding: 10,
          cornerRadius: 6,
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${currencyFull(ctx.raw)}`
          }
        }
      },
      scales: buildScales(type)
    }
  });
}

export function createPieChart(canvas) {
  const greys = [token('--bh-series-1'), token('--bh-series-2'), token('--bh-series-3')];
  const total = pieData.values.reduce((a, b) => a + b, 0);

  return new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: pieData.labels,
      datasets: [
        {
          data: pieData.values,
          backgroundColor: greys,
          borderColor: token('--bh-white'),
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '58%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 14,
            font: { size: 12 }
          }
        },
        tooltip: {
          backgroundColor: token('--bh-ink'),
          padding: 10,
          cornerRadius: 6,
          callbacks: {
            label: (ctx) => {
              const pct = ((ctx.parsed / total) * 100).toFixed(1);
              return ` ${ctx.label}: ${currencyFull(ctx.parsed)} (${pct}%)`;
            }
          }
        }
      }
    }
  });
}
