// Stat tiles row:  Total Savings  =  Fuel  +  Carbon Credits
import { tiles } from '../data/demoData.js';

function tile({ label, value, roi }) {
  return `
    <div class="bh_tile">
      <div class="bh_tile__head">${label}</div>
      <div class="bh_tile__value">${value}</div>
      <span class="bh_badge">${roi}</span>
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
