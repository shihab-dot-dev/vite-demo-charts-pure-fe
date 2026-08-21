// Assembles the Demo Calculator (scatter variation) and wires up interactions.
import { renderForm, bindForm } from './form.js';
import { renderTiles } from './tiles.js';
import { createScatterChart } from './charts.js';

const LEDE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
  'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ' +
  'veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
  'commodo consequat.';

function renderResults() {
  return `
    <div class="bh_results">
      ${renderTiles()}
      <div class="bh_chart bh_chart--scatter">
        <canvas id="bh_mainChart" aria-label="ROI vs contract duration chart" role="img"></canvas>
      </div>
    </div>`;
}

export function renderCalculator() {
  return `
    <div class="bh_page">
      <div class="bh_card">
        <header class="bh_header">
          <div class="bh_header__accent"></div>
          <h1 class="bh_header__title">Demo Calculator</h1>
          <p class="bh_lede">${LEDE}</p>
        </header>

        <section class="bh_section">
          <div class="bh_section__head">
            <h2 class="bh_section__title">Unit Economics</h2>
            <div class="bh_section__actions">
              <button type="button" class="bh_btn" id="bh_printReport">Print this Report</button>
              <a class="bh_btn" id="bh_docLink" href="#" target="_blank" rel="noopener">Doc Link</a>
            </div>
          </div>
          <p class="bh_section__lede">${LEDE}</p>

          <div class="bh_grid">
            <div class="bh_loader" id="bh_loader" role="status" aria-live="polite" aria-hidden="true">
              <div class="bh_spinner"></div>
              <span class="bh_loader__text">Calculating savings…</span>
            </div>
            <div class="bh_form-col">
              ${renderForm()}
              <div class="bh_calc-cta">
                <a class="bh_btn bh_btn--cta" href="#bh_results-col">Calculate Savings</a>
              </div>
            </div>
            <div class="bh_results-col" id="bh_results-col">${renderResults()}</div>
          </div>
        </section>
      </div>
    </div>`;
}

function bindActions(root) {
  // Print — the @media print stylesheet isolates `.bh_section` so only that
  // block ends up on paper.
  root.querySelector('#bh_printReport')?.addEventListener('click', () => {
    window.print();
  });
}

// Simulated latency (ms) before the "API" responds with new figures.
const FAKE_API_DELAY = 900;

// Mount everything into the given root element.
export function mountCalculator(root) {
  root.innerHTML = renderCalculator();
  bindActions(root);

  const mainCanvas = root.querySelector('#bh_mainChart');
  const loader = root.querySelector('#bh_loader');

  let chart;

  // (Re)draw the chart. `onDrawn` fires when it finishes its initial draw
  // animation — used to dismiss the loader.
  function drawChart(onDrawn) {
    chart?.destroy();
    chart = createScatterChart(mainCanvas, onDrawn);
  }

  // Show the loader over the grid, wait out the fake API delay, then rebuild
  // the chart and hide the loader once it has been drawn.
  function reloadResults() {
    loader.classList.add('is-active');
    loader.setAttribute('aria-hidden', 'false');

    let hidden = false;
    const hideLoader = () => {
      if (hidden) return;
      hidden = true;
      loader.classList.remove('is-active');
      loader.setAttribute('aria-hidden', 'true');
    };

    window.setTimeout(() => {
      drawChart(hideLoader); // hide when the graph finishes drawing
      window.setTimeout(hideLoader, 2000); // safety net if the draw never signals
    }, FAKE_API_DELAY);
  }

  // Changing the fuel type simulates a fresh API call -> loader + redraw.
  bindForm(root, () => reloadResults());

  // Initial render (no loader).
  drawChart();
}
