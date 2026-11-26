import {
  ACESFilmicToneMapping, Box3, DirectionalLight, FogExp2, Group, HalfFloatType, HemisphereLight, Material, Mesh,
  NoToneMapping, PCFShadowMap, Points, Raycaster, Scene, ShaderChunk, Sprite, Vector2, Vector3, WebGLRenderer,
  WebGLRenderTarget,
} from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { destinations } from '../destinations';
import type { DestinationId } from '../destinations';
import { buildAtmosphere } from '../world/atmosphere';
import { Collisions } from '../world/collision';
import { bakeSolids } from '../world/geometry';
import { heightAt, shoreFraction } from '../world/land';
import { buildLandmarks, guideLights } from '../world/landmarks';
import { buildProjectSigns } from '../world/projectSigns';
import { buildTerrain } from '../world/terrain';
import { createTraveler } from '../world/traveler';
import { buildVegetation } from '../world/vegetation';
import { IslandCamera } from './camera';
import { IslandInput } from './input';
import { Quality, reduceMotion } from './quality';
import { disposeScene } from './resources';
import { Walker, walkSpeed } from './walking';

export type Mode = 'overview' | 'walk';

const exposure = 1.22;

// With bloom the scene renders into a linear target, where three.js skips per-material tone
// mapping. To keep the emblem, portal, signs and shuttle exactly as authored (toneMapped: false)
// while everything else stays filmic, tone-mapped materials apply ACES themselves before bloom.
function toneMapInMaterials(scene: Scene) {
  if (!ShaderChunk.common.includes('NIGHT_ACES')) {
    ShaderChunk.common += /* glsl */ `
      #ifdef NIGHT_ACES
      vec3 nightAces(vec3 color) {
        const mat3 inputMat = mat3(vec3(0.59719, 0.07600, 0.02840), vec3(0.35458, 0.90834, 0.13383),
          vec3(0.04823, 0.01566, 0.83777));
        const mat3 outputMat = mat3(vec3(1.60475, -0.10208, -0.00327), vec3(-0.53108, 1.10813, -0.07276),
          vec3(-0.07367, -0.00605, 1.07602));
        color = inputMat * (color * NIGHT_ACES / 0.6);
        vec3 a = color * (color + 0.0245786) - 0.000090537;
        vec3 b = color * (0.983729 * color + 0.4329510) + 0.238081;
        return clamp(outputMat * (a / b), 0.0, 1.0);
      }
      #endif
    `;
    ShaderChunk.tonemapping_fragment = /* glsl */ `
      #if defined( TONE_MAPPING )
        gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
      #elif defined( NIGHT_ACES )
        gl_FragColor.rgb = nightAces( gl_FragColor.rgb );
      #endif
    `;
  }
  const seen = new Set<Material>();
  scene.traverse((object) => {
    if (!(object instanceof Mesh || object instanceof Points || object instanceof Sprite)) return;
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      if (seen.has(material) || !material.toneMapped || material.defines?.NIGHT_ACES) continue;
      seen.add(material);
      material.defines = { ...material.defines, NIGHT_ACES: exposure.toFixed(3) };
      material.needsUpdate = true;
    }
  });
}
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
  renderer.toneMappingExposure = exposure;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;

  const scene = new Scene();
  // Night: a cool moon key, violet sky fill and two coloured rims echo the nebula overhead.
  scene.fog = new FogExp2('#0b0e28', .0046);
  const world = new Group();
  scene.add(world);
  scene.add(new HemisphereLight('#94a6ff', '#43305a', 1.55));
  const sun = new DirectionalLight('#c7d4ff', 2.05);
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
  const edgeLight = new DirectionalLight('#d58cff', 1.35);
  edgeLight.position.set(12, 14, -35);
  scene.add(edgeLight);
  const tealRim = new DirectionalLight('#5ce6d6', .55);
  tealRim.position.set(-34, 8, -12);
  scene.add(tealRim);

  const collisions = new Collisions();
  const clock = { value: 0 };
  const traveler = createTraveler(walkSpeed, invalidate);
  scene.add(traveler.root);
  buildAtmosphere(world, clock, quality.light);
  buildTerrain(world);
  let filmicInMaterials = false;
  const updateLandmarks = buildLandmarks(world, collisions, clock, () => {
    if (filmicInMaterials) toneMapInMaterials(scene);
    renderer.shadowMap.needsUpdate = true;
    invalidate();
  });
  const projectSigns = buildProjectSigns(world, collisions, invalidate);
  guideLights(world, !quality.light);
  buildVegetation(world, collisions, clock, quality.light);
  bakeSolids(world);

  const walker = new Walker(collisions);
  const rig = new IslandCamera(collisions);
  // Bloom lets lanterns, signage and the brightest stars glow; lighter devices render directly.
  let composer: EffectComposer | null = null;
  if (!quality.light) {
    composer = new EffectComposer(renderer, new WebGLRenderTarget(1, 1, { type: HalfFloatType, samples: 4 }));
    composer.addPass(new RenderPass(scene, rig.camera));
    composer.addPass(new UnrealBloomPass(new Vector2(1, 1), .6, .4, .94));
    composer.addPass(new OutputPass());
    renderer.toneMapping = NoToneMapping;
    toneMapInMaterials(scene);
    filmicInMaterials = true;
  }
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
  const pickTargets = [...bounds, ...projectSigns];
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
    for (const place of pickTargets) {
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
    if (composer) {
      composer.setPixelRatio(renderer.getPixelRatio());
      composer.setSize(width, height);
    }
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
    updateLandmarks();
    rig.update(dt, walker.position, mode === 'walk', clock.value, reduced, snap);
    traveler.update(walker.position, walker.heading, dt, rig.camera,
      input.walkHeld || Boolean(route), walker.falling, snap);
    snap = false;
    if (composer) composer.render(dt);
    else renderer.render(scene, rig.camera);
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
      composer?.dispose();
      disposeScene(scene);
      renderer.dispose();
    },
  };
}

export type Island = NonNullable<ReturnType<typeof createIsland>>;
