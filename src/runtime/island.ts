import {
  ACESFilmicToneMapping, Box3, DirectionalLight, Fog, Group, HemisphereLight,
  PCFShadowMap, Raycaster, Scene, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { destinations } from '../destinations';
import type { DestinationId } from '../destinations';
import { buildAtmosphere } from '../world/atmosphere';
import { Collisions } from '../world/collision';
import { bakeSolids } from '../world/geometry';
import { heightAt, shoreFraction } from '../world/land';
import { buildLandmarks, guideLights } from '../world/landmarks';
import { buildTerrain } from '../world/terrain';
import { createTraveler } from '../world/traveler';
import { buildVegetation } from '../world/vegetation';
import { IslandCamera } from './camera';
import { IslandInput } from './input';
import { Quality, reduceMotion } from './quality';
import { disposeScene } from './resources';
import { Walker, walkSpeed } from './walking';

export type Mode = 'overview' | 'walk';
type ScreenPoint = { x: number; y: number };

type Interface = {
  canvas: HTMLCanvasElement;
  stick: HTMLElement;
  paceButton: HTMLButtonElement;
  viewport: HTMLElement;
  ready: (ready: boolean) => void;
  mode: (mode: Mode) => void;
  sign: (id: DestinationId, point: ScreenPoint | null) => void;
  nearby: (id: DestinationId | null) => void;
  walking: (id: DestinationId | null) => void;
  inspect: (id: DestinationId) => void;
  status: (message: string) => void;
};

export function createIsland(ui: Interface) {
  const quality = new Quality();
  const attributes: WebGLContextAttributes = {
    antialias: !quality.light,
    alpha: false,
    powerPreference: 'default',
    stencil: false,
  };
  const context = ui.canvas.getContext('webgl2', attributes);
  if (!context) return null;
  const renderer = new WebGLRenderer({ canvas: ui.canvas, context, ...attributes });
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;

  const scene = new Scene();
  scene.fog = new Fog('#8392aa', 61, 268);
  const world = new Group();
  scene.add(world);
  scene.add(new HemisphereLight('#cadbff', '#9b7169', 1.48));
  const sun = new DirectionalLight('#ffd2a7', 2.38);
  sun.position.set(-24, 33, 24);
  sun.castShadow = true;
  sun.shadow.mapSize.setScalar(quality.light ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { near: 2, far: 96, left: -32, right: 32, top: 31, bottom: -31 });
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.normalBias = .049;
  sun.shadow.bias = -.00021;
  sun.shadow.radius = 3;
  sun.shadow.intensity = .79;
  scene.add(sun);
  const edgeLight = new DirectionalLight('#a0c0ff', .93);
  edgeLight.position.set(12, 14, -35);
  scene.add(edgeLight);

  const collisions = new Collisions();
  const clock = { value: 0 };
  const traveler = createTraveler(walkSpeed, invalidate);
  scene.add(traveler.root);
  buildAtmosphere(world, clock, quality.light);
  buildTerrain(world);
  buildLandmarks(world, collisions, clock);
  guideLights(world);
  buildVegetation(world, collisions, clock, quality.light);
  bakeSolids(world);

  const walker = new Walker(collisions);
  const rig = new IslandCamera(collisions);
  const bounds = Object.values(destinations).map((place) => {
    const [x, z] = place.landmark;
    const y = heightAt(x, z);
    const [width, height, depth] = place.hit;
    return {
      ...place,
      point: new Vector3(x + (place.id === 'hanzizap' ? 2.1 : 0), y + place.signHeight, z),
      box: new Box3(new Vector3(x - width / 2, y - .5, z - depth / 2),
        new Vector3(x + width / 2, y + height, z + depth / 2)),
    };
  });
  const project = new Vector3();
  const hit = new Vector3();
  const ground = new Vector3();
  const ray = new Raycaster();
  const ndc = new Vector2();
  const events = new AbortController();
  const options = { signal: events.signal };

  let mode: Mode = 'overview';
  let near: DestinationId | null = null;
  let route: DestinationId | null = null;
  let paused = false;
  let lost = false;
  let disposed = false;
  let firstFrame = true;
  let snap = true;
  let frame = 0;
  let previous = 0;
  let width = 1;
  let height = 1;
  let settling = 0;

  const active = () => !paused && !lost && !disposed;

  function invalidate() {
    if (active() && !document.hidden && frame === 0) frame = requestAnimationFrame(render);
  }

  function changeMode(next: Mode, focus: boolean) {
    if (mode !== next) {
      mode = next;
      settling = .72;
      ui.mode(mode);
      if (mode === 'overview') {
        stopWalking();
        walker.velocity.set(0, 0);
        input.clear();
      }
    }
    if (focus) ui.canvas.focus({ preventScroll: true });
    invalidate();
  }

  function stopWalking() {
    walker.cancel();
    if (route) {
      route = null;
      ui.walking(null);
    }
  }

  function reset() {
    stopWalking();
    walker.reset();
    rig.recenter();
    snap = true;
    ui.status('Back at arrival.');
    changeMode('walk', true);
  }

  function landmarkAt(x: number, y: number) {
    const rect = ui.canvas.getBoundingClientRect();
    ndc.set((x - rect.left) / rect.width * 2 - 1, 1 - (y - rect.top) / rect.height * 2);
    ray.setFromCamera(ndc, rig.camera);
    let closest = Infinity;
    let id: DestinationId | null = null;
    for (const place of bounds) {
      if (!ray.ray.intersectBox(place.box, hit)) continue;
      const distance = hit.distanceTo(ray.ray.origin);
      if (distance < closest) {
        closest = distance;
        id = place.id;
      }
    }
    if (!id) return null;
    for (let offset = 1; offset < closest; offset += .9) {
      ray.ray.at(offset, ground);
      if (shoreFraction(ground.x, ground.z) < .985 && ground.y + .2 < heightAt(ground.x, ground.z)) return null;
    }
    return id;
  }

  const input = new IslandInput(ui.canvas, ui.stick, ui.paceButton, {
    active, invalidate, reset,
    hover: (x, y) => ui.canvas.toggleAttribute('data-inspectable', landmarkAt(x, y) !== null),
    pick: (x, y) => {
      const id = landmarkAt(x, y);
      if (id) ui.inspect(id);
    },
    look: (dx, dy) => {
      changeMode('walk', true);
      rig.turn(dx, dy);
      invalidate();
    },
    inspect: () => {
      if (near) ui.inspect(near);
    },
  });

  function resize() {
    const rect = ui.viewport.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    renderer.setPixelRatio(quality.pixels(width, height));
    renderer.setSize(width, height, false);
    rig.resize(width, height);
    snap = true;
    invalidate();
  }

  function setSigns() {
    const inOverview = mode === 'overview';
    const narrow = width / height < .76;
    const movingIn = settling > .4;
    let close: DestinationId | null = null;
    let minDistance = 3.04;
    for (const place of bounds) {
      const distance = Math.hypot(walker.position.x - place.approach[0], walker.position.z - place.approach[1]);
      if (!inOverview && !walker.falling && distance < minDistance) {
        minDistance = distance;
        close = place.id;
      }
      project.copy(place.point).project(rig.camera);
      const x = (project.x + 1) * .5 * width;
      const y = (1 - project.y) * .5 * height;
      const allowed = project.z > -1 && project.z < 1
        && x > 49 && x < width - 49 && y > (narrow ? 82 : 105) && y < height - 95;
      const visible = inOverview
        ? place.id !== 'observatory' && place.id !== 'workshop'
        : !movingIn && distance < 29 && distance > 3.9;
      ui.sign(place.id, allowed && visible ? { x, y } : null);
    }
    if (near !== close) {
      near = close;
      ui.nearby(close);
    }
  }

  function stopFrame() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
  }

  function render(now: number) {
    frame = 0;
    if (!active() || document.hidden) return;
    const elapsed = previous ? Math.max(0, (now - previous) / 1000) : 0;
    const dt = Math.min(elapsed || 1 / 60, .065);
    const reduced = reduceMotion.matches;
    previous = now;
    settling = Math.max(0, settling - dt);
    if (input.axes.lengthSq() > .001) changeMode('walk', false);
    if (mode === 'walk') {
      const steps = dt > .033 ? 2 : 1;
      let recovered = false;
      for (let step = 0; step < steps; step++) {
        if (walker.update(dt / steps, input.axes, rig.yaw, input.walkHeld)) {
          recovered = true;
          break;
        }
      }
      if (recovered) {
        rig.recenter();
        snap = true;
        ui.status('You returned to arrival.');
      }
      if (route && !walker.walkingRoute) {
        const name = destinations[route].name;
        const destination = destinations[route].approach;
        const arrived = Math.hypot(walker.position.x - destination[0], walker.position.z - destination[1]) < .85;
        ui.status(arrived ? `Arrived at ${name}.` : 'Assisted walk ended.');
        route = null;
        ui.walking(null);
      }
    }
    if (!reduced) clock.value += dt;
    rig.update(dt, walker.position, mode === 'walk', clock.value, reduced, snap);
    traveler.update(walker.position, walker.heading, dt, rig.camera,
      input.walkHeld || Boolean(route), walker.falling, snap);
    snap = false;
    renderer.render(scene, rig.camera);
    if (firstFrame && traveler.ready) {
      firstFrame = false;
      ui.ready(true);
    }
    setSigns();

    if (!reduced && quality.measure(elapsed)) resize();
    if (!reduced || walker.falling || walker.walkingRoute || walker.moving || input.axes.lengthSq() > 0 || settling > 0) {
      invalidate();
    } else {
      previous = 0;
    }
  }

  const observer = new ResizeObserver(resize);
  observer.observe(ui.viewport);
  resize();
  reduceMotion.addEventListener('change', invalidate, options);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      input.clear();
      stopFrame();
    } else {
      invalidate();
    }
  }, options);
  ui.canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    lost = true;
    stopFrame();
    stopWalking();
    input.clear();
    ui.ready(false);
  }, options);
  ui.canvas.addEventListener('webglcontextrestored', () => {
    lost = false;
    firstFrame = true;
    renderer.shadowMap.needsUpdate = true;
    invalidate();
  }, options);

  return {
    play: () => changeMode('walk', true),
    overview: () => changeMode('overview', false),
    pause(open: boolean) {
      paused = open;
      if (paused) {
        input.clear();
        stopFrame();
      } else {
        invalidate();
      }
    },
    walk(id: DestinationId) {
      stopWalking();
      changeMode('walk', true);
      if (!walker.guide(destinations[id].approach)) {
        ui.status('Walk from arrival or select another destination.');
        return;
      }
      route = id;
      ui.walking(id);
      ui.status(`Walking to ${destinations[id].name}.`);
    },
    stopWalking,
    reset,
    dispose() {
      disposed = true;
      stopFrame();
      events.abort();
      observer.disconnect();
      input.dispose();
      sun.shadow.dispose();
      disposeScene(scene);
      renderer.dispose();
    },
  };
}

export type Island = NonNullable<ReturnType<typeof createIsland>>;
