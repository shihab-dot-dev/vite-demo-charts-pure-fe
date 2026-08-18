// Stat tiles row:  Total Savings  =  Fuel  +  Carbon Credits
import { icons } from '../icons.js';
import { tiles } from '../data/demoData.js';

function tile({ label, icon, value, roi }) {
  return `
    <div class="bh_tile">
      <div class="bh_tile__head">
        <span class="bh_tile__icon">${icons[icon]}</span>${label}
      </div>
      <div class="bh_tile__value">${value}</div>
      <span class="bh_badge">
        <span class="bh_badge__spark">${icons.spark}</span>${roi}
      </span>
    </div>`;
}

export function renderTiles() {
  const [total, fuel, carbon] = tiles;
  return `
    <div class="bh_tiles">
      ${tile(total)}
      <div class="bh_op" aria-hidden="true">=</div>
      ${tile(fuel)}
      <div class="bh_op" aria-hidden="true">+</div>
      ${tile(carbon)}
    </div>`;
}

// Shared legend for the charts (reads the greyscale series tokens).
export function renderLegend() {
  const items = [
    { label: 'Fuel', varName: '--bh-series-1' },
    { label: 'Carbon Credits', varName: '--bh-series-2' },
    { label: 'Total Savings', varName: '--bh-series-3' }
  ];
  return `
    <div class="bh_legend">
      ${items
        .map(
          (i) => `
        <span class="bh_legend__item">
          <span class="bh_legend__dot" style="background:var(${i.varName})"></span>${i.label}
        </span>`
        )
        .join('')}
    </div>`;
}
