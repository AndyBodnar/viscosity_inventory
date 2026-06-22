# viscosity_inventory

**A slick, modern inventory for FiveM** — a grid-based NUI with a hotbar, weight system,
and a dedicated weapon view with rotatable weapon models and attachment slots. Built
from scratch in React for [viscosity_core](https://github.com/AndyBodnar/viscosity_core).

---

## Features

- **Grid inventory** — drag-and-drop slots, stack splitting, weight-aware.
- **Hotbar** — quick-use slots bound to the number keys.
- **Weapon view** — center stage shows the selected weapon as a model you can
  **rotate**, with **attachment slots** (suppressor, scope, grip, mag…).
- **Item & weapon icons** — ships with a full qb-compatible icon set, with a clean
  glyph fallback for anything missing.
- **Character-keyed** — inventories are tied to your `citizenid` through the core, so
  they're per-character and safe across multichar.
- **Themed** — violet glass UI matching the Viscosity look.

---

## Requirements

- [viscosity_core](https://github.com/AndyBodnar/viscosity_core)

## Installation

1. Drop `viscosity_inventory` into `resources`.
2. Ensure it **after** the core in `server.cfg`:
   ```cfg
   ensure viscosity_core
   ensure viscosity_inventory
   ```
3. Open the inventory in-game with the bound key (default **F3**).

---

## Development

The UI is a Vite + React + TypeScript app in `web/`, built into a single inlined
`web/dist/index.html` the resource loads.

```bash
cd web
npm install
npm run build      # outputs web/dist/index.html
```

State is handled with a small zustand store; the Lua side (`client/`, `server.lua`)
bridges NUI callbacks to the core's inventory engine.

---

© Viscosity. Built and maintained by Viscosity Gaming Studio.
