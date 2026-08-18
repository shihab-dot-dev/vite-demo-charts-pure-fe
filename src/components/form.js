// Left-hand form (dummy). Renders selects, the fuel toggle group and inputs.
import { icons } from '../icons.js';
import {
  selects,
  fuelToggles,
  segmentSelect,
  numberFields,
  pairFields,
  trailingField
} from '../data/demoData.js';

const req = '<span class="bh_req">*</span>';

function selectField({ id, label, options }) {
  const opts = options.map((o) => `<option>${o}</option>`).join('');
  return `
    <div class="bh_field">
      <label class="bh_label" for="bh_${id}">${label} ${req}</label>
      <div class="bh_select-wrap">
        <select class="bh_select" id="bh_${id}">${opts}</select>
      </div>
    </div>`;
}

function numberField({ id, label, value }) {
  return `
    <div class="bh_field">
      <label class="bh_label" for="bh_${id}">${label} ${req}</label>
      <input class="bh_input" id="bh_${id}" type="text" inputmode="decimal" value="${value}" />
    </div>`;
}

function fuelGroup() {
  const buttons = fuelToggles
    .map(
      (t, i) => `
      <button type="button" class="bh_toggle${i === 0 ? ' is-active' : ''}"
              data-fuel="${t.id}" aria-pressed="${i === 0}">
        <span class="bh_toggle__icon">${icons[t.icon]}</span>${t.label}
      </button>`
    )
    .join('');

  return `
    <div class="bh_field">
      <span class="bh_label">Fuel ${req}</span>
      <div class="bh_toggle-group" role="group" aria-label="Fuel type">${buttons}</div>
    </div>`;
}

export function renderForm() {
  return `
    <form class="bh_form" novalidate>
      ${selects.map(selectField).join('')}
      ${fuelGroup()}
      ${selectField(segmentSelect)}
      ${numberFields.map(numberField).join('')}
      <div class="bh_field-row">
        ${pairFields.map(numberField).join('')}
      </div>
      ${numberField(trailingField)}
    </form>`;
}

// Wire up the fuel toggle group so only one option is active at a time.
export function bindForm(root) {
  const buttons = root.querySelectorAll('.bh_toggle');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });
}
