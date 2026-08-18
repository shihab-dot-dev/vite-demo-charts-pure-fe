// Minimal inline SVG icon set. All strokes use `currentColor` so the icons
// inherit the surrounding greyscale (keeps the wireframe brand-neutral).

const wrap = (paths) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const icons = {
  // Tile icons
  dollar: wrap('<circle cx="12" cy="12" r="9"/><path d="M12 7v10M14.5 9.2c0-1-1.1-1.7-2.5-1.7S9.5 8.2 9.5 9.2s1 1.5 2.5 1.8 2.5.8 2.5 1.8-1.1 1.7-2.5 1.7-2.5-.7-2.5-1.7"/>'),
  fuelTile: wrap('<rect x="5" y="4" width="9" height="16" rx="1.5"/><path d="M14 9h2.5a2 2 0 0 1 2 2v4.5a1.5 1.5 0 0 0 3 0V8l-2.5-2.5"/><path d="M7 8h5"/>'),
  leaf: wrap('<path d="M20 4c-9 0-14 4-14 11a5 5 0 0 0 5 5c7 0 9-8 9-16Z"/><path d="M9 18c1.5-4 4-6.5 8-8"/>'),

  // Toggle (fuel type) icons
  gas: wrap('<rect x="5" y="4" width="9" height="16" rx="1.5"/><path d="M14 9h2.5a2 2 0 0 1 2 2v4.5a1.5 1.5 0 0 0 3 0V8l-2.5-2.5"/><path d="M7 8h5"/>'),
  petrol: wrap('<path d="M12 3c3 3.5 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5.5 5-9Z"/>'),
  diesel: wrap('<rect x="3" y="6" width="14" height="12" rx="1.5"/><path d="M17 10h2.5l1.5 2v4h-4"/><path d="M6 9h6"/>'),
  others: wrap('<circle cx="12" cy="12" r="3"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"/>'),

  // Trend spark (used in ROI badges)
  spark: wrap('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),

  // Section action buttons
  printer: wrap('<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="7" rx="1"/>'),
  externalLink: wrap('<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/>')
};
