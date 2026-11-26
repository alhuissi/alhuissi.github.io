# The World Between Worlds · Phase 1

## Design

The island is the homepage. The opening composition places the ringed planet above a terraced island, with Alfredo’s introduction alongside it. Close to ground level, lamplight and trails lead past conifers, reeds and rock outcrops to the workshop. The four surrounding landmarks each have a silhouette visible from several angles.

- **Workshop.** Two tiled roofs, arched windows, an outdoor workbench and a guitar connect engineering and music.
- **Dream Ocean.** A weathered stone gateway, cool foliage and a waterfall connect the site to the game’s coastal imagery. The journal uses a gameplay capture from Kuroshore.
- **Pocket Orbit.** A compact original spacecraft sits on a marked launchpad with approach lights. The journal shows the Rell system and links to the browser demo and Steam.
- **HanziZap.** The arcade uses a warm sign, ribbed roofs, lanterns and two cabinets. The journal shows a Sprint round.
- **Observatory.** A path climbs behind the workshop to a copper dome and telescope. The telescope points across the sky of the island.

Work takes place outdoors in Phase 1. Each location opens a short entry, with project links where they apply. The island’s shoreline supports fall and recovery. Exploration uses walking, terrain grounding and camera orbit.

## Architecture

| Area | Source |
| --- | --- |
| Identity, direct links and projects | `index.html` and `island.css`. HTML entries double as the fallback directory and the modal content. |
| UI and navigation | `src/main.ts` binds the interface and lazily imports the renderer. `src/journal.ts` manages hash links, browser history, focus, and native dialog behavior. |
| Destinations | `src/destinations.ts` holds landmark placements, interaction ranges via approach points, and named trail waypoints. Project copy and links live in HTML. |
| Scene lifecycle | `src/runtime/island.ts` handles lighting, render scheduling, resize, world projection, ray picking, WebGL context changes, and pause and teardown. |
| World | `src/world/` contains terrain and collision surfaces, custom landmarks, the traveler, vegetation, and the sky, sea, waterfall and gateway shaders. |
| Exploration | `src/runtime/input.ts`, `walking.ts` and `camera.ts` handle input, damped motion, collision sliding, route finding and camera follow. Assisted walks use terrain-aware grid search, then connect waypoints along clear segments. |
| Performance and resources | `src/runtime/quality.ts` controls resolution and device budgets. `src/world/geometry.ts` batches static props. `src/runtime/resources.ts` deduplicates cleanup across shared resources. |

## References and assets

Reviewed the target repository and its earlier Three.js worlds, The Deval’s island movement and portal navigation, Pocket Orbit’s surface movement, camera damping and layered water, the Dream Ocean website’s capture direction, and the HanziZap app and website. The island uses original geometry, materials and shaders. The movement and water references informed the design without importing their implementations or game engines.

| Asset | Provenance |
| --- | --- |
| Dream Ocean still | Kuroshore gameplay from `assets/dream/kuroshore.webp` in the pre-existing target checkout. |
| Pocket Orbit still | Rell system flight gameplay from `assets/orbit/flight.webp` in the pre-existing target checkout, originally from Pocket Orbit. |
| HanziZap still | The Sprint capture from `assets/work/hanzizap-sprint.webp` in the pre-existing target checkout, originally from HanziZap. |
| Desktop and portrait posters | WebP captures of the shipped island in Chrome with the interface hidden. |
| Bodoni Moda | Existing local font. SIL Open Font License bundled as `island-media/OFL-BodoniModa.txt`. |
| Three.js | MIT license bundled as `island-media/Three-LICENSE.txt`. |

## Performance and limits

- A small entry module initializes conventional navigation. The scene and Three.js are separate lazy modules. A viewport-matched WebP poster fills the first view while the scene initializes.
- Animated water and the portal use shader motion. Grass is instanced, landmark parts with shared materials are merged, and a cached directional shadow map shades the static scene. The traveler has a separate contact shadow.
- Touch and lower-core devices use fewer grass and dust instances, a smaller shadow map, and a lower render-pixel budget. Sustained slow frames reduce render scale once per session.
- The world pauses behind the journal and when the tab is hidden. Reduced motion freezes ambient time and removes camera transitions. A context loss restores the poster and project navigation while the device recovers.
- Project travel stops at each outdoor approach. The journal links lead to the game or app itself.

## Validation

Verified the checked-in static build and the Vite source preview in Chrome. Captured the overview and close views at the gateway, launchpad, arcade and observatory. Tested keyboard movement, a blocked workshop approach, drag camera, assisted routes, landmark selection, cliff recovery, journal focus and history, WebGL restoration, and GPU resource release. Touch testing used Chrome emulation in portrait, compact portrait, and landscape. The WebGL and JavaScript fallbacks kept project navigation available.

The local desktop run showed the first rendered frame in roughly 0.4 seconds. Chrome ran at a 60 Hz animation cadence in the desktop and landscape touch samples on the development machine. The JavaScript totals about 170 kB gzipped, including Three.js. The six public HTTPS links responded with HTTP 200. The email action uses a mail link.

## Manual playtest checklist

- [ ] Open the build from an ordinary static HTTP server. Check the opening composition and all three signs on a wide desktop and a portrait phone.
- [ ] Choose **Explore the island** and start, stop, and turn with both WASD and the arrow keys. Drag to look in both directions. Hold forward against the workshop door and try sliding past a corner.
- [ ] Follow each trail. At a landmark, press **E** or select its prompt. Click the models and their signs from the island view.
- [ ] Use **Walk to…** on each entry. Take back control with a movement key or the **Stop** button. Visit the observatory via the uphill trail.
- [ ] Walk off the seaward edge from arrival and confirm the traveler returns. Press **R** and use **Island view**.
- [ ] On a phone, steer with the thumbstick, drag to look, tap the arcade sign and inspect its entry. Check the HUD in portrait and landscape.
- [ ] Use the **Projects** and **About** links, Tab through a journal entry, close with Escape, and use browser Back. Load a direct URL with `#dream-ocean` appended.
- [ ] Follow the Dream Ocean website and Steam links, the Pocket Orbit browser demo and Steam links, and the HanziZap App Store link. Confirm GitHub and the email link in About.
- [ ] Repeat with reduced motion, then with WebGL unavailable. Disable JavaScript and browse via the static project directory.
- [ ] Switch tabs and return. Check that movement keys clear and that the developer console stays clear of errors during navigation and resize.
