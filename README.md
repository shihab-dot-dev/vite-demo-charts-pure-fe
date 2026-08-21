# Demo Calculator — Wireframe Demo

A pure front-end demo that showcases a responsive **Demo Calculator** component
and the charting capability of **Chart.js**. Built as a plain black/white/grey
**wireframe** (no brand colours yet) so the layout can be reviewed before theming.

## Tech stack

- **Vite 6** — scaffold, dev server, bundler
- **pnpm** — package manager
- **Vanilla / modern JavaScript** (ES modules) — no TypeScript, no UI framework
- **SCSS (Sass)** — modular styles with a `@use` design-token system
- **Chart.js 4** — grouped **bar** chart + **doughnut/pie** chart demos
- **Google Fonts** — Poppins (headings) + Inter (body)

## Conventions

- Every CSS class and id is prefixed with **`bh_`**.
- The whole palette lives in `src/styles/_variables.scss` and is exposed as CSS
  custom properties (`--bh-*`) so JS/Chart.js reads the exact same greys. Swap
  those values later to introduce brand colours.

## Getting started

```bash
pnpm install
pnpm dev       # start the dev server (http://localhost:5173)
pnpm build     # production build -> dist/
pnpm preview   # preview the production build
```

## Deploy (surge.sh)

The `deploy:surge` script builds the app and publishes the `dist/` folder to
[surge.sh](https://surge.sh) — handy for sharing this POC as a live URL.

```bash
# First time only: create/verify a free surge account (email + password)
pnpm exec surge login

# Build + deploy. Pass your own subdomain (must be globally unique):
pnpm deploy:surge my-demo-calculator.surge.sh

# Or run it with no domain to let surge assign a random *.surge.sh URL:
pnpm deploy:surge
```

Notes:
- The script runs `pnpm build && surge dist`; any argument you pass is forwarded
  to surge as the target domain.
- Re-run the same command with the same domain to publish updates to that URL.
- For CI / non-interactive deploys, set `SURGE_LOGIN` and `SURGE_TOKEN`
  (get a token via `pnpm exec surge token`).

## Layout

- **Left column** — a dummy form (selects, fuel toggle group, numeric inputs).
- **Right column** — a results card: three stat tiles
  (`Total Savings = Fuel + Carbon Credits`) with ROI badges, a shared legend,
  a grouped **bar chart** by year, and a **doughnut chart** showing savings
  composition.

Desktop-first, collapses to a single column on tablet/mobile.

## Project structure

```
index.html                     # entry, loads Google Fonts + /src/main.js
src/
  main.js                      # mounts the component
  icons.js                     # inline SVG icon set (currentColor)
  data/demoData.js             # all dummy content + chart data
  components/
    calculator.js              # assembles the component, wires tabs
    form.js                    # left-hand form + fuel toggle behaviour
    tiles.js                   # stat tiles + legend
    charts.js                  # Chart.js bar + doughnut setup
  styles/
    main.scss                  # @use entry
    _variables.scss            # design tokens (greyscale wireframe)
    _base.scss _layout.scss _form.scss _results.scss
```

All chart/tile data is illustrative dummy content only.
