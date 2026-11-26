import { destinations } from './destinations';
import type { DestinationId } from './destinations';
import { bindJournal } from './journal';
import type { Island, Mode } from './runtime/island';

const viewport = document.querySelector<HTMLElement>('.world')!;
const canvas = viewport.querySelector<HTMLCanvasElement>('canvas')!;
const signs = viewport.querySelector<HTMLElement>('.island-signs')!;
const hud = viewport.querySelector<HTMLElement>('.world-hud')!;
const explore = viewport.querySelector<HTMLButtonElement>('[data-explore]')!;
const browse = viewport.querySelector<HTMLAnchorElement>('[data-browse]')!;
const overview = viewport.querySelector<HTMLButtonElement>('[data-overview]')!;
const reset = viewport.querySelector<HTMLButtonElement>('[data-reset]')!;
const stick = viewport.querySelector<HTMLElement>('[data-stick]')!;
const nearby = viewport.querySelector<HTMLAnchorElement>('[data-nearby]')!;
const nearbyText = nearby.querySelector('span')!;
const walking = viewport.querySelector<HTMLButtonElement>('[data-walking]')!;
const status = viewport.querySelector<HTMLElement>('[data-status]')!;
const touch = matchMedia('(pointer: coarse)');
const markers = new Map(Array.from(signs.querySelectorAll<HTMLAnchorElement>('a')).map((marker) =>
  [marker.dataset.place as DestinationId, marker]));
const walkButtons = document.querySelectorAll<HTMLButtonElement>('button[data-walk]');

let island: Island | null = null;
let ready = false;
let currentMode: Mode = 'overview';
let currentNearby: DestinationId | null = null;
let guidedWalk = false;
let leftPage = false;

const journal = bindJournal((open) => island?.pause(open));

function updateHud() {
  viewport.dataset.mode = ready ? currentMode : 'overview';
  explore.hidden = !ready;
  browse.hidden = ready;
  hud.hidden = !ready;
  signs.hidden = !ready;
  canvas.hidden = !ready;
  canvas.tabIndex = ready ? 0 : -1;
  overview.hidden = !ready || currentMode !== 'walk';
  reset.hidden = overview.hidden;
  stick.hidden = !ready || currentMode !== 'walk' || !touch.matches;
  nearby.hidden = !ready || currentMode !== 'walk' || !currentNearby || guidedWalk;
  walking.hidden = !ready || !guidedWalk;
}
touch.addEventListener('change', updateHud);
explore.addEventListener('click', () => island?.play());
overview.addEventListener('click', () => {
  island?.overview();
  explore.focus({ preventScroll: true });
});
reset.addEventListener('click', () => island?.reset());
walking.addEventListener('click', () => {
  island?.stopWalking();
  canvas.focus({ preventScroll: true });
});
document.querySelector<HTMLElement>('[data-home]')!.addEventListener('click', () => island?.overview());
for (const button of walkButtons) {
  button.addEventListener('click', () => {
    journal.goTo('world', false);
    island?.walk(button.dataset.walk as DestinationId);
  });
}
window.addEventListener('pagehide', (event) => {
  if (event.persisted) return;
  leftPage = true;
  touch.removeEventListener('change', updateHud);
  island?.dispose();
});

for (const marker of markers.values()) marker.hidden = true;

async function loadIsland() {
  try {
    const { createIsland } = await import('./runtime/island');
    if (leftPage) return;
    island = createIsland({
      canvas, viewport, stick,
      ready: (available) => {
        ready = available;
        viewport.toggleAttribute('data-ready', available);
        const browseWasFocused = document.activeElement === browse;
        for (const button of walkButtons) button.hidden = !available;
        updateHud();
        if (available && browseWasFocused) explore.focus({ preventScroll: true });
        if (!available) status.textContent = 'The island is temporarily unavailable. The projects are still available.';
      },
      mode: (mode) => {
        currentMode = mode;
        updateHud();
      },
      sign: (id, point) => {
        const marker = markers.get(id)!;
        marker.hidden = point === null;
        if (point) marker.style.transform = `translate(${point.x.toFixed(2)}px, ${(point.y - 10).toFixed(2)}px) translate(-50%, -100%)`;
      },
      nearby: (id) => {
        currentNearby = id;
        if (id) {
          nearby.href = `#${id}`;
          nearbyText.textContent = `Inspect ${destinations[id].name}`;
        }
        updateHud();
      },
      walking: (id) => {
        guidedWalk = id !== null;
        walking.textContent = id ? `Walking to ${destinations[id].name} · Stop` : '';
        updateHud();
      },
      inspect: (id) => journal.goTo(id),
      status: (message) => { status.textContent = message; },
    });
    island?.pause(journal.open);
  } catch (error) {
    console.error('The island could not start.', error);
    status.textContent = 'The island could not start. Browse projects to continue.';
  }
}

void loadIsland();
