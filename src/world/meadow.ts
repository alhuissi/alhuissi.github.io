import {
  BufferGeometry, Color, DoubleSide, Float32BufferAttribute, InstancedMesh, MeshLambertMaterial, Object3D, Vector3,
} from 'three';
import type { Group } from 'three';
import type { WorldClock } from './atmosphere';
import type { Collisions } from './collision';
import { heightAt, poolLevel, randomFrom, shoreFraction } from './land';
import { paintGround } from './terrain';

/*
 * Pocket Orbit's meadow grass (pocketorbit src/environment/vegetation/meadowGrass.ts and
 * MeadowFlora's wind material), brought to the island: every blade is a tapered strip bending
 * along a curved spine and twisting as it rises, deep and cool at the root, warm and light at the
 * tip. Blades grow in small fountain clusters (a tall heart, outer blades arching out and over),
 * and clusters in patches laid on a lattice so neighbours overlap into one meadow that still reads
 * as plants. Wind travels across the island as gust fronts and rolling waves, the blades lean
 * together along a combed flow, and every patch takes the colour of the ground it grows from.
 */

type Rgb = readonly [number, number, number];
const ROOT: Rgb = [0.25, 0.35, 0.28];
const BODY: Rgb = [1.04, 1.1, 0.94];
const TIP: Rgb = [1.66, 1.52, 0.98];

interface Blade {
  positions: number[];
  normals: number[];
  shade: number[];
  sway: number[];
  phase: number[];
  indices: number[];
  heart: [number, number];
}

interface BladeSpec {
  x: number;
  z: number;
  angle: number;
  height: number;
  width: number;
  lean: number;
  droop: number;
  twist: number;
  phase: number;
  segments: number;
  value: number;
  inner: number;
  heart: [number, number];
  root: Rgb;
  tip: Rgb;
}

const mixRgb = (a: Rgb, b: Rgb, t: number): Rgb =>
  [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

function bladeShade(t: number, root: Rgb, tip: Rgb): Rgb {
  return t < .45 ? mixRgb(root, BODY, Math.pow(t / .45, .8)) : mixRgb(BODY, tip, Math.pow((t - .45) / .55, 1.4));
}

const normal = new Vector3();
const outward = new Vector3();
const up = new Vector3(0, 1, 0);

function addBlade(blades: Blade[], s: BladeSpec) {
  const dx = Math.cos(s.angle);
  const dz = Math.sin(s.angle);
  const spine = (t: number): [number, number, number] => {
    const out = s.lean * t * t;
    const rise = s.height * (2 * t * (1 - t) * .82 + t * t * (1 - s.droop * .75));
    return [s.x + dx * out, rise, s.z + dz * out];
  };
  const halfWidth = (t: number) => s.width * Math.pow(Math.max(0, 1 - Math.pow(t, 1.6)), .9);
  const blade: Blade = { positions: [], normals: [], shade: [], sway: [], phase: [], indices: [], heart: s.heart };
  const push = (p: number[], t: number) => {
    blade.positions.push(p[0], p[1], p[2]);
    // Lit like the ground it grows from, following the blade's curve: an arching blade's upper
    // face turns toward the sky, so the arch catches the light and its underside falls into shade.
    const a = spine(Math.max(0, t - .05));
    const b = spine(Math.min(1, t + .05));
    const out = (b[0] - a[0]) * dx + (b[2] - a[2]) * dz;
    const rise = b[1] - a[1];
    const length = Math.max(1e-5, Math.hypot(out, rise));
    normal.set(-dx * rise / length, out / length, -dz * rise / length)
      .multiplyScalar(.6).addScaledVector(up, .75).addScaledVector(outward.set(dx, 0, dz), .3).normalize();
    blade.normals.push(normal.x, normal.y, normal.z);
    const c = bladeShade(t, s.root, s.tip);
    const occluded = s.value * (1 - s.inner * .26 * Math.pow(1 - t, 1.5));
    blade.shade.push(c[0] * occluded, c[1] * occluded, c[2] * occluded);
    blade.sway.push(t);
    blade.phase.push(s.phase);
    return blade.sway.length - 1;
  };
  const rows: number[][] = [];
  for (let i = 0; i < s.segments; i++) {
    const t = i / s.segments;
    const c = spine(t);
    const turn = s.angle + Math.PI * .5 + s.twist * t;
    const w = halfWidth(t);
    const ax = Math.cos(turn) * w;
    const az = Math.sin(turn) * w;
    rows.push([push([c[0] - ax, c[1], c[2] - az], t), push([c[0] + ax, c[1], c[2] + az], t)]);
  }
  for (let i = 0; i < rows.length - 1; i++) {
    const [al, ar] = rows[i];
    const [cl, cr] = rows[i + 1];
    blade.indices.push(al, ar, cr, al, cr, cl);
  }
  const [ll, lr] = rows[rows.length - 1];
  blade.indices.push(ll, lr, push(spine(1), 1));
  blades.push(blade);
}

function shapeRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface ClusterSpec {
  x: number;
  z: number;
  blades: number;
  height: number;
  fall: number;
  spread: number;
  lean: number;
  droop: number;
  width: number;
  curved: number;
  tint: Rgb;
  value: number;
}

// One fountain: a tall upright heart, each next blade rooted further out, shorter, leaning further
// and arching more, so the cluster's outline is a soft mound with long blades spilling over.
function addCluster(blades: Blade[], c: ClusterSpec, rand: () => number) {
  const turn = rand() * Math.PI * 2;
  for (let j = 0; j < c.blades; j++) {
    const outer = c.blades > 1 ? j / (c.blades - 1) : 0;
    const around = turn + j * 2.39996 + (rand() - .5) * .4;
    const rootR = c.spread * Math.sqrt(outer) * (.7 + rand() * .3);
    addBlade(blades, {
      x: c.x + Math.cos(around) * rootR,
      z: c.z + Math.sin(around) * rootR,
      angle: around + (rand() - .5) * .5,
      height: c.height * (1 - outer * c.fall) * (.88 + rand() * .24),
      width: c.width * (.85 + rand() * .3) * (1 - outer * .15),
      lean: c.lean * (.25 + outer * .95) * (.8 + rand() * .4),
      droop: c.droop * Math.pow(outer, .8) + rand() * .08,
      twist: (rand() - .5) * .9,
      phase: rand(),
      segments: j < c.curved ? 3 : 2,
      value: c.value * (.93 + rand() * .14),
      inner: 1 - outer,
      heart: [c.x, c.z],
      root: [ROOT[0] * c.tint[0], ROOT[1] * c.tint[1], ROOT[2] * c.tint[2]],
      tip: [TIP[0] * c.tint[0], TIP[1] * c.tint[1], TIP[2] * c.tint[2]],
    });
  }
}

const clusterTint = (h: number): Rgb => h < .28 ? [1.05, 1.03, .88] : h > .74 ? [.92, 1.0, 1.05] : [1, 1, 1];

function clusterRoots(count: number, radius: number, rand: () => number): [number, number][] {
  return Array.from({ length: count }, (_, k) => {
    const r = radius * Math.sqrt((k + .5) / count);
    const a = k * 2.39996 + rand() * .6;
    return [Math.cos(a) * r + (rand() - .5) * .08, Math.sin(a) * r + (rand() - .5) * .08];
  });
}

// Merge the blades into one geometry; `dome` leans each normal out from its cluster's heart so a
// clump is lit as one rounded volume with a sunlit and a shaded side.
function finish(blades: Blade[], dome: number) {
  const positions: number[] = [];
  const normals: number[] = [];
  const shade: number[] = [];
  const sway: number[] = [];
  const phase: number[] = [];
  const indices: number[] = [];
  const lean = new Vector3();
  for (const blade of blades) {
    for (let i = 0; i < blade.sway.length; i++) {
      const x = blade.positions[i * 3] - blade.heart[0];
      const z = blade.positions[i * 3 + 2] - blade.heart[1];
      const reach = Math.hypot(x, z);
      lean.set(x, 0, z).multiplyScalar(reach > 1e-4 ? 1 / reach : 0).multiplyScalar(dome * (.35 + .65 * blade.sway[i]));
      lean.x += blade.normals[i * 3];
      lean.y += blade.normals[i * 3 + 1];
      lean.z += blade.normals[i * 3 + 2];
      lean.normalize();
      blade.normals[i * 3] = lean.x;
      blade.normals[i * 3 + 1] = lean.y;
      blade.normals[i * 3 + 2] = lean.z;
    }
    const base = sway.length;
    positions.push(...blade.positions);
    normals.push(...blade.normals);
    shade.push(...blade.shade);
    sway.push(...blade.sway);
    phase.push(...blade.phase);
    for (const index of blade.indices) indices.push(base + index);
  }
  const geometry = new BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(shade, 3));
  geometry.setAttribute('aSway', new Float32BufferAttribute(sway, 1));
  geometry.setAttribute('aPhase', new Float32BufferAttribute(phase, 1));
  geometry.computeBoundingSphere();
  return geometry;
}

// Sward: one patch about 1.3 units across of six small fountain clusters.
function swardGeometry(light: boolean) {
  const blades: Blade[] = [];
  const rand = shapeRandom(2711);
  const per = light ? 5 : 7;
  for (const [x, z] of clusterRoots(6, .55, rand)) {
    const big = .82 + rand() * .36;
    addCluster(blades, {
      x, z, blades: per, height: .7 * big, fall: .4, spread: .3, lean: .44, droop: .5, width: light ? .052 : .046,
      curved: light ? 0 : 2, tint: clusterTint(rand()), value: .9 + rand() * .2,
    }, rand);
  }
  return finish(blades, .45);
}

// Wild tuft: a broad fountain of thirteen long blades arching over in every direction.
function tuftGeometry() {
  const blades: Blade[] = [];
  addCluster(blades, {
    x: 0, z: 0, blades: 13, height: 1, fall: .38, spread: .12, lean: .44, droop: .85, width: .042,
    curved: 13, tint: [1, 1, 1], value: 1,
  }, shapeRandom(9127));
  return finish(blades, .85);
}

const MEADOW_WIND = /* glsl */ `
float meadowGust;
vec3 meadowWind(vec3 root, vec3 up, float t, float phase) {
  vec3 dir = uWindDir - up * dot(uWindDir, up);
  dir = dir / max(length(dir), 1e-4);
  float g1 = sin(dot(root, uWindDir * 0.085 + vec3(0.031, -0.047, 0.022)) - uTime * 0.7);
  float g2 = sin(dot(root, uWindDir * 0.06 + vec3(-0.052, 0.018, 0.041)) - uTime * 0.43 + 1.7);
  float g3 = sin(dot(root, vec3(0.017, 0.029, -0.023)) + uTime * 0.11);
  meadowGust = smoothstep(0.35, 1.0, (g1 + g2) * 0.5 + g3 * 0.35);
  float along = dot(root, uWindDir);
  float wave = sin(along * 0.42 - uTime * 1.9 + sin(dot(root, vec3(0.13, 0.07, -0.11))) * 1.6) * 0.5 + 0.5;
  float clump = fract(sin(dot(root, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
  float stiff = 0.75 + clump * 0.5;
  float flutter = sin(uTime * (2.6 + phase * 1.9) + phase * 6.2832 + clump * 6.2832);
  float strength = 0.25 + uWind * 1.1;
  float push = strength * stiff * (0.18 + wave * 0.32 + meadowGust * 0.75) + flutter * 0.07 * strength;
  vec3 side = cross(up, dir);
  float sway = sin(uTime * 0.83 + clump * 4.0 + along * 0.15) * 0.12 * strength;
  return (dir * push + side * sway) * t * t;
}
vec3 meadowComb(vec3 p, vec3 up) {
  vec3 comb = vec3(sin(dot(p, vec3(0.071, 0.043, -0.052)) + 0.7), sin(dot(p, vec3(-0.038, 0.066, 0.049)) + 2.1), sin(dot(p, vec3(0.057, -0.061, 0.035)) + 4.4))
    + 0.6 * vec3(sin(dot(p, vec3(0.31, -0.22, 0.17)) + 1.3), sin(dot(p, vec3(0.19, 0.27, -0.33)) + 3.7), sin(dot(p, vec3(-0.26, 0.21, 0.29)) + 5.9))
    + 0.55 * vec3(sin(dot(p, vec3(0.83, 0.61, -0.52)) + 0.4), sin(dot(p, vec3(-0.57, 0.94, 0.41)) + 2.6), sin(dot(p, vec3(0.66, -0.48, 0.97)) + 4.8));
  return comb - up * dot(comb, up);
}
`;

function meadowMaterial(clock: WorldClock) {
  const material = new MeshLambertMaterial({ vertexColors: true, side: DoubleSide });
  const wind = { value: .35 };
  const windDir = { value: new Vector3(.8, .15, .55).normalize() };
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = clock;
    shader.uniforms.uWind = wind;
    shader.uniforms.uWindDir = windDir;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
attribute float aSway;
attribute float aPhase;
uniform float uTime;
uniform float uWind;
uniform vec3 uWindDir;
varying float vTip;
${MEADOW_WIND}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  mat4 plant = modelMatrix * instanceMatrix;
  mat3 basis = mat3(plant);
  vec3 root = (plant * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 axisScale = vec3(dot(basis[0], basis[0]), dot(basis[1], basis[1]), dot(basis[2], basis[2]));
  float seed = fract(sin(dot(root, vec3(7.13, 157.1, 113.7))) * 43758.5453);
  // Low sweeps between taller heads, so the meadow reads in masses.
  float swale = 0.5 + 0.25 * (sin(dot(root, vec3(0.41, -0.25, 0.33)) + 1.3) + sin(dot(root, vec3(-0.22, 0.38, 0.29)) + 4.1));
  transformed.y *= mix(.62, 1.10, smoothstep(.20, .74, swale));
  // No two clumps alike: each squashed along its own axis.
  float sa = seed * 12.566;
  vec2 axis = vec2(cos(sa), sin(sa));
  transformed.xz += axis * dot(transformed.xz, axis) * (seed - 0.5) * 0.6;
  // Wind and the combed flow in world space, carried back into the plant's frame; a bent blade
  // dips so its length is kept.
  float heightHere = max(transformed.y, 0.0) * sqrt(axisScale.y);
  vec3 push = meadowWind(root, up, aSway, aPhase) * heightHere * 0.5;
  push += meadowComb(root, up) * 0.68 * aSway * aSway * heightHere;
  vec3 local = (transpose(basis) * push) / axisScale;
  transformed.xz += local.xz;
  float lateral = length(local.xz);
  transformed.y = transformed.y * transformed.y / sqrt(transformed.y * transformed.y + lateral * lateral + 1e-6);
  vTip = aSway;
  // The meadow's colour field: cool teal, fresh green, warm olive-gold and a faint plum, in
  // rolling patches; a passing gust lights the tips it bends.
  float w2 = 0.5 + 0.25 * (sin(dot(root, vec3(-0.3, 0.18, 0.39)) + 2.2) + sin(dot(root, vec3(0.26, 0.34, -0.21)) + 5.3));
  vec3 tint = mix(vec3(0.72, 0.88, 0.98), vec3(1.0, 1.04, 0.95), smoothstep(0.28, 0.65, swale));
  tint = mix(tint, vec3(1.06, 1.0, 0.88), smoothstep(0.58, 0.82, swale * 0.8 + seed * 0.2));
  tint = mix(tint, vec3(1.04, 0.9, 1.0), smoothstep(0.74, 0.9, w2) * 0.45);
  vColor.rgb *= tint * (1.0 + meadowGust * aSway * (0.14 + uWind * 0.18));
  vColor.rgb = mix(vec3(dot(vColor.rgb, vec3(0.3, 0.59, 0.11))), vColor.rgb, 0.88);
}`);
    // Thin two-sided blades keep their authored normal on both faces (no black backs from above),
    // and catch a little moonlight at the tips so the meadow reads at night.
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vTip;')
      .replace('#include <normal_fragment_begin>', '#include <normal_fragment_begin>\nnormal = normalize( vNormal );')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
totalEmissiveRadiance += diffuseColor.rgb * (0.05 + 0.16 * vTip * vTip) * vec3(0.8, 0.9, 1.15);`);
  };
  material.customProgramCacheKey = () => 'pocket-orbit-meadow';
  return material;
}

type Clear = (x: number, z: number, margin: number) => boolean;

export function buildMeadow(root: Group, collisions: Collisions, clock: WorldClock, low: boolean, onTrail: Clear) {
  const material = meadowMaterial(clock);
  const random = randomFrom(31337);
  const plant = new Object3D();
  const tint = new Color();
  const ground = new Color();

  const grows = (x: number, z: number, y: number, trail: number) => shoreFraction(x, z) < .965
    && y > poolLevel + .05 && !onTrail(x, z, trail) && !collisions.solid(x, z, .3, y, y + .6);

  // The blade field: patches on a jittered lattice, overlapping into one meadow.
  const spacing = low ? 1.15 : .82;
  const spots: [number, number, number][] = [];
  for (let gx = -28; gx <= 28; gx += spacing) {
    for (let gz = -22; gz <= 22; gz += spacing) {
      const x = gx + (random() - .5) * spacing * .8;
      const z = gz + (random() - .5) * spacing * .8;
      const y = heightAt(x, z);
      if (grows(x, z, y, 1.02)) spots.push([x, y, z]);
    }
  }
  const sward = new InstancedMesh(swardGeometry(low), material, spots.length);
  spots.forEach(([x, y, z], i) => {
    const size = (low ? .72 : .6) + random() * .2;
    plant.position.set(x, y - .03, z);
    plant.rotation.set(0, random() * Math.PI * 2, 0);
    plant.scale.set(size, (.5 + random() * .3) * (low ? 1 : 1), size);
    plant.updateMatrix();
    sward.setMatrixAt(i, plant.matrix);
    // Each patch takes its ground's colour, a little lifted so the blades stand out from the soil.
    paintGround(x, z, ground);
    tint.copy(ground).multiplyScalar(1.12 + random() * .1);
    sward.setColorAt(i, tint);
  });
  sward.receiveShadow = true;
  // Layer 1: drawn for the main camera but skipped by the ocean's mirror.
  sward.layers.set(1);
  root.add(sward);

  // Wild tufts: long arching clumps gathered at the meadow's edges, by the cliffs and around stones.
  const tufts: [number, number, number][] = [];
  for (let attempt = 0; attempt < (low ? 900 : 1800) && tufts.length < (low ? 110 : 240); attempt++) {
    const x = (random() - .5) * 54;
    const z = (random() - .5) * 42;
    const y = heightAt(x, z);
    const edge = shoreFraction(x, z);
    if ((edge < .8 && random() > .25) || !grows(x, z, y, 1.3)) continue;
    tufts.push([x, y, z]);
  }
  const wild = new InstancedMesh(tuftGeometry(), material, tufts.length);
  tufts.forEach(([x, y, z], i) => {
    const size = .45 + random() * .3;
    plant.position.set(x, y - .03, z);
    plant.rotation.set(0, random() * Math.PI * 2, 0);
    plant.scale.set(size, size * (.8 + random() * .4), size);
    plant.updateMatrix();
    wild.setMatrixAt(i, plant.matrix);
    paintGround(x, z, ground);
    tint.copy(ground).multiplyScalar(1.05 + random() * .12);
    wild.setColorAt(i, tint);
  });
  wild.receiveShadow = true;
  wild.layers.set(1);
  root.add(wild);
}
