// Assembles the full Demo Calculator component and wires up interactions.
import { tabs } from '../data/demoData.js';
import { icons } from '../icons.js';
import { renderForm, bindForm } from './form.js';
import { renderTiles, renderLegend } from './tiles.js';
import { createMainChart, createPieChart, CHART_TYPES } from './charts.js';

const LEDE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
  'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ' +
  'veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
  'commodo consequat.';

function renderTabs() {
  return tabs
    .map(
      (t, i) =>
        `<button type="button" class="bh_tab${i === 0 ? ' is-active' : ''}"
                 role="tab" aria-selected="${i === 0}">${t}</button>`
    )
    .join('');
}

function renderResults() {
  return `
    <div class="bh_results">
      ${renderTiles()}
      ${renderLegend()}
      <div class="bh_chart-toolbar">
        <label class="bh_chart-toolbar__label" for="bh_chartType">Chart type</label>
        <div class="bh_select-wrap bh_select-wrap--sm">
          <select class="bh_select bh_select--sm" id="bh_chartType">
            ${CHART_TYPES.map((t) => `<option value="${t.value}">${t.label}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="bh_chart">
        <canvas id="bh_mainChart" aria-label="Savings by year chart" role="img"></canvas>
      </div>

      <div class="bh_charts-split">
        <div class="bh_chart bh_chart--pie">
          <canvas id="bh_pieChart" aria-label="Savings composition — pie chart" role="img"></canvas>
        </div>
        <div>
          <p class="bh_chart-caption">Savings composition</p>
          <p class="bh_chart-subcaption">
            Doughnut chart demo — share of total projected savings by source
            (dummy data).
          </p>
        </div>
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

        <nav class="bh_tabs" role="tablist" aria-label="Sections">
          ${renderTabs()}
        </nav>

        <section class="bh_section">
          <div class="bh_section__head">
            <h2 class="bh_section__title">Unit Economics</h2>
            <div class="bh_section__actions">
              <button type="button" class="bh_btn" id="bh_printReport">
                <span class="bh_btn__icon">${icons.printer}</span>Print this Report
              </button>
              <a class="bh_btn" id="bh_docLink" href="#" target="_blank" rel="noopener">
                <span class="bh_btn__icon">${icons.externalLink}</span>Doc Link
              </a>
            </div>
          </div>
          <p class="bh_section__lede">${LEDE}</p>

          <div class="bh_grid">
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

function bindTabs(root) {
  const tabEls = root.querySelectorAll('.bh_tab');
  tabEls.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabEls.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
    });
  });
}

function bindActions(root) {
  // Print — the @media print stylesheet isolates `.bh_section` so only that
  // block ends up on paper.
  root.querySelector('#bh_printReport')?.addEventListener('click', () => {
    window.print();
  });
}

// Mount everything into the given root element.
export function mountCalculator(root) {
  root.innerHTML = renderCalculator();
  bindTabs(root);
  bindForm(root);
  bindActions(root);

  // Main chart is switchable via the type selector; Chart.js needs a fresh
  // instance when the type changes, so we destroy + recreate on change.
  const mainCanvas = root.querySelector('#bh_mainChart');
  let mainChart = createMainChart(mainCanvas, 'bar');

  root.querySelector('#bh_chartType')?.addEventListener('change', (e) => {
    mainChart.destroy();
    mainChart = createMainChart(mainCanvas, e.target.value);
  });

  createPieChart(root.querySelector('#bh_pieChart'));
}
