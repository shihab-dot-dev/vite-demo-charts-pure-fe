// Scatter chart — ROI (%) vs Contract Duration. Each point is a circle with
// its ROI value drawn inside via chartjs-plugin-datalabels.
import {
  Chart,
  ScatterController,
  PointElement,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { scatterData } from '../data/demoData.js';

Chart.register(ScatterController, PointElement, LinearScale, Tooltip, Legend);

// Read a palette token from the CSS custom properties (falls back if absent).
const token = (name, fallback) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
Chart.defaults.color = token('--bh-muted', '#6b7280');

// Create the scatter chart. `onDrawn` (optional) fires when the initial draw
// animation completes (used to dismiss the loading overlay).
export function createScatterChart(canvas, onDrawn) {
  const green = token('--bh-primary', '#10a37f');
  const line = token('--bh-line', '#e6e8ea');
  const muted = token('--bh-muted', '#6b7280');
  const ink = token('--bh-ink', '#14181d');
  let drawnFired = false;

  return new Chart(canvas, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: scatterData.label,
          data: scatterData.points,
          backgroundColor: green,
          pointRadius: 22,
          pointHoverRadius: 24,
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 6, right: 8, bottom: 6 } },
      animation: onDrawn
        ? {
            onComplete: () => {
              if (drawnFired) return;
              drawnFired = true;
              onDrawn();
            }
          }
        : undefined,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 8,
            padding: 14,
            color: muted
          }
        },
        tooltip: {
          backgroundColor: ink,
          padding: 10,
          cornerRadius: 6,
          callbacks: {
            label: (ctx) => ` ROI: ${ctx.parsed.y}%  ·  Year ${ctx.parsed.x}`
          }
        },
        // Value labels drawn inside each circle.
        datalabels: {
          color: '#ffffff',
          font: { family: "'Inter', system-ui, sans-serif", size: 11, weight: '600' },
          formatter: (value) => `${value.y}%`,
          anchor: 'center',
          align: 'center'
        }
      },
      scales: {
        x: {
          type: 'linear',
          position: 'top',
          min: 0.5,
          max: 10.5,
          title: {
            display: true,
            text: 'Contract Duration',
            color: ink,
            font: { family: "'Poppins', system-ui, sans-serif", size: 14, weight: '500' },
            padding: { bottom: 10 }
          },
          // force gridlines + labels at each whole year (1..10)
          afterBuildTicks: (axis) => {
            axis.ticks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => ({ value }));
          },
          ticks: { color: muted, font: { size: 13 } },
          grid: { display: true, color: line, drawTicks: false },
          border: { display: false }
        },
        y: {
          // hidden axis — vertical gridlines only (from x), value shown in-circle
          min: 120,
          max: 545,
          display: false,
          grid: { display: false }
        }
      }
    },
    // Register datalabels for this chart only.
    plugins: [ChartDataLabels]
  });
}
