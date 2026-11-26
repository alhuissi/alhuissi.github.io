# The World Between Worlds

A playable personal website for Alfredo L’Huissier. A small island over a moonlit sea of clouds connects Dream Ocean, Pocket Orbit, HanziZap, and Alfredo’s workshop.

## Run locally

Use Node 20.19 or later.

```sh
npm ci
npm run dev
```

Open the URL Vite prints. Choose **Explore the island**, then use **WASD** or the arrow keys to sprint and hold **Shift** to walk. Drag to look, press **E** to inspect a nearby landmark, or press **R** to return to arrival. On touch screens, steer with the thumbstick and hold **Walk** to slow down. The **Projects** menu and island signs open the same project entries.

## Build and serve

```sh
npm run build
python3 -m http.server 4174 --bind 127.0.0.1
```

Vite writes the browser modules to `island-runtime/`. The root `index.html` references those modules and local media by relative URL, so GitHub Pages can serve the checkout directly. Commit the regenerated runtime when changing TypeScript. The dev server substitutes the source entry automatically and supports local updates without rebuilding.

See [the Phase 1 implementation report and playtest checklist](docs/world-between-worlds.md).
