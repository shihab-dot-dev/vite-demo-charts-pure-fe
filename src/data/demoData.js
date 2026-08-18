// -----------------------------------------------------------------------------
//  Demo data for the Demo Calculator wireframe.
//  Everything here is dummy / illustrative content only.
// -----------------------------------------------------------------------------

export const tabs = ['Economics ', 'calculator 1', 'Calculator 2'];

// ---- Left-hand form (all dummy) --------------------------------------------
export const selects = [
  { id: 'technology', label: 'Technology', options: ['FR3', 'FR4', 'FR5'] },
  { id: 'country', label: 'Country', options: ['Italy', 'France', 'Spain', 'Germany'] }
];

export const fuelToggles = [
  { id: 'gas', label: 'Gas', icon: 'gas' },
  { id: 'petrol', label: 'Petrol', icon: 'petrol' },
  { id: 'diesel', label: 'Diesel', icon: 'diesel' },
  { id: 'others', label: 'Others', icon: 'others' }
];

export const segmentSelect = {
  id: 'segment',
  label: 'Segment',
  options: ['Pipeline', 'Upstream', 'Downstream', 'Retail']
};

export const numberFields = [
  { id: 'fuelPrice', label: 'Fuel Price (USD/MT)', value: '1,150' },
  { id: 'consumption', label: 'Consumption (MT/dd)', value: '120' },
  { id: 'load', label: 'Load (%)', value: '65' }
];

// Two side-by-side inputs
export const pairFields = [
  { id: 'co2', label: 'CO2 ($/MT)', value: '65' },
  { id: 'nox', label: 'NOx ($/MT)', value: '65' }
];

export const trailingField = { id: 'ch4', label: 'CH4 [$/MT]', value: '65' };

// ---- Result tiles ----------------------------------------------------------
export const tiles = [
  { id: 'total', label: 'Total Savings', icon: 'dollar', value: '$860,291', roi: 'ROI: 815%' },
  { id: 'fuel', label: 'Fuel', icon: 'fuelTile', value: '$648,963', roi: 'ROI: 590%' },
  { id: 'carbon', label: 'Carbon Credits', icon: 'leaf', value: '$211,329', roi: 'ROI: 125%' }
];

// ---- Bar chart (grouped, per year) -----------------------------------------
// Kept internally consistent: Total = Fuel + Carbon Credits.
export const barData = {
  labels: ['2026', '2027', '2028', '2029', '2030'],
  series: {
    fuel: [118400, 246200, 372500, 519800, 648963],
    carbon: [41500, 88700, 128400, 172600, 211329],
    total: [159900, 334900, 500900, 692400, 860292]
  }
};

// ---- Pie chart (savings composition demo) ----------------------------------
export const pieData = {
  labels: ['Fuel', 'Carbon Credits', 'Efficiency / Other'],
  values: [648963, 211329, 96500]
};
