import {
  AdditiveBlending, BackSide, BufferGeometry, DoubleSide, Float32BufferAttribute, Mesh, NearestFilter, PlaneGeometry,
  Points, ShaderMaterial, SphereGeometry, SRGBColorSpace, TextureLoader,
} from 'three';
import type { Group } from 'three';
import { heightAt, pool, poolLevel, randomFrom, rimPoint, seaLevel, shoreFraction, spill, spillAngle } from './land';

export type WorldClock = { value: number };

const noise = /* glsl */ `
  float hash(vec2 p) {
    vec3 q = fract(vec3(p.xyx) * .1031);
    q += dot(q, q.yzx + 33.33);
    return fract((q.x + q.y) * q.z);
  }
  float field(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + 1.0), f.x), f.y);
  }
  float layers(vec2 p) {
    float sum = .55 * field(p);
    p = mat2(1.71, 1.18, -1.18, 1.71) * p + 17.3;
    sum += .27 * field(p);
    p = mat2(1.52, 1.35, -1.35, 1.52) * p - 12.7;
    sum += .12 * field(p);
    return sum + .06 * field(p * 2.06 + 7.0);
  }
  float sat(float x) { return clamp(x, 0.0, 1.0); }
`;

const skinVertex = /* glsl */ `
  varying vec2 coords;
  varying vec3 worldPoint;
  void main() {
    coords = uv;
    vec4 p = modelMatrix * vec4(position, 1.0);
    worldPoint = p.xyz;
    gl_Position = projectionMatrix * viewMatrix * p;
  }
`;

// A night horizon in linear colour: an indigo dome that warms to violet, rose and teal light at the
// waterline, with low cloud banks rimmed by the glow below them. Shared by the sky, the sea haze
// and the mist so everything melts into the same horizon.
const horizonColor = /* glsl */ `
  vec3 nightHorizon(vec3 d, float clock) {
    float elevation = d.y;
    float longitude = atan(d.x, -d.z);
    vec3 zenith = vec3(.0025, .003, .012);
    vec3 upper = vec3(.006, .008, .030);
    vec3 color = mix(upper, zenith, smoothstep(.05, .75, elevation));
    // The afterglow changes hue around the horizon: violet, magenta, rose behind the planet, teal.
    float hue = .5 + .5 * sin(longitude * 1.3 + .4);
    float hue2 = .5 + .5 * sin(longitude * 2.1 - 1.7);
    vec3 glow = mix(vec3(.10, .045, .22), vec3(.30, .085, .24), hue);
    glow = mix(glow, vec3(.035, .16, .22), hue2 * .55);
    float band = exp(-abs(elevation + .01) * 15.0);
    color += glow * band * .2;
    color += vec3(.42, .16, .30) * exp(-abs(elevation + .004) * 46.0) * (.06 + .09 * hue);

    vec2 cloudUV = vec2(longitude * 8.0 - clock * .009, elevation * 36.0);
    float fronts = layers(cloudUV + vec2(3.4, 1.4));
    float filaments = layers(cloudUV * vec2(.81, 1.38) + vec2(6.0, 4.4));
    float shelf = exp(-pow(abs(elevation + .016) / .084, 2.0));
    float distant = smoothstep(.37, .76, fronts) * shelf;
    float sheer = smoothstep(.54, .80, filaments) * exp(-pow(abs(elevation - .015) / .16, 2.0));
    vec3 cloudBody = vec3(.020, .022, .062);
    vec3 cloudRim = mix(glow, vec3(.20, .15, .30), .4);
    vec3 cloud = mix(cloudBody, cloudRim, smoothstep(.55, .92, fronts) * .6 + .08);
    return mix(color, cloud, distant * .62 + sheer * .12);
  }
`;

// The deep-space sky shared with Pocket Orbit: two sinuous nebula rivers of changing hue with
// bright cores, dust lanes and filaments, three layers of tinted stars and a few spiked giants.
const nebula = /* glsl */ `
  float nsHash(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
  vec3 nsHash3(vec3 p) { p = fract(p * vec3(0.1031, 0.1030, 0.0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx); }
  float nsNoise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(nsHash(i), nsHash(i + vec3(1, 0, 0)), f.x), mix(nsHash(i + vec3(0, 1, 0)), nsHash(i + vec3(1, 1, 0)), f.x), f.y),
               mix(mix(nsHash(i + vec3(0, 0, 1)), nsHash(i + vec3(1, 0, 1)), f.x), mix(nsHash(i + vec3(0, 1, 1)), nsHash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
  }
  float nsFbm(vec3 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += nsNoise(p) * a; p = p * 2.03 + vec3(17.2, 11.3, 7.1); a *= 0.5; }
    return v;
  }
  vec3 nsPalette(float h) {
    h = fract(h) * 8.0;
    vec3 c0 = vec3(1.0, 0.66, 0.2), c1 = vec3(1.0, 0.38, 0.14), c2 = vec3(0.92, 0.25, 0.38), c3 = vec3(0.72, 0.18, 0.62);
    vec3 c4 = vec3(0.42, 0.2, 0.82), c5 = vec3(0.16, 0.36, 0.98), c6 = vec3(0.14, 0.7, 0.86), c7 = vec3(0.4, 0.92, 0.55);
    float f = fract(h);
    f = f * f * (3.0 - 2.0 * f);
    int k = int(floor(h));
    vec3 a = k == 0 ? c0 : k == 1 ? c1 : k == 2 ? c2 : k == 3 ? c3 : k == 4 ? c4 : k == 5 ? c5 : k == 6 ? c6 : c7;
    vec3 b = k == 0 ? c1 : k == 1 ? c2 : k == 2 ? c3 : k == 3 ? c4 : k == 4 ? c5 : k == 5 ? c6 : k == 6 ? c7 : c0;
    return mix(a, b, f);
  }
  float nsDust;
  float nsBody;
  vec3 nebulaGlow(vec3 d) {
    // River A arcs from high on the left down to the right horizon behind the island; river B
    // crosses it from the right, so the overview frames both.
    vec3 A = normalize(vec3(-.17, -.978, -.116)), B = normalize(vec3(.257, -.965, -.058));
    // Finer than Pocket Orbit's full-sky version: the overview frames only a strip of sky.
    vec3 g = d * 2.3;
    vec3 q = vec3(nsFbm(g * 1.7), nsFbm(g * 1.7 + vec3(5.2, 1.3, 2.8)), nsFbm(g * 1.7 + vec3(1.7, 9.2, 4.4)));
    float w = nsFbm(g * 2.2 + q * 1.8);
    float latA = dot(d, A) + (q.x - 0.5) * 0.7 + (w - 0.5) * 0.35;
    float latB = dot(d, B) + (q.y - 0.5) * 0.6;
    float riverA = exp(-latA * latA * 22.0);
    float riverB = exp(-latB * latB * 34.0) * 0.85;
    nsBody = max(riverA, riverB);
    float clouds = smoothstep(0.32, 0.76, w);
    float density = nsBody * clouds;
    float ridge = 1.0 - abs(2.0 * nsFbm(g * 5.5 + q * 2.4) - 1.0);
    float filaments = pow(ridge, 6.0) * nsBody;
    float dust = smoothstep(0.48, 0.74, nsFbm(g * 3.6 + q * 1.6 + 9.0)) * nsBody;
    nsDust = dust;
    vec3 e1 = normalize(cross(A, vec3(0.0, 0.0, 1.0))), e2 = cross(A, e1);
    float along = atan(dot(d, e2), dot(d, e1)) / 6.2832;
    vec3 f1 = normalize(cross(B, vec3(0.0, 1.0, 0.0))), f2 = cross(B, f1);
    float alongB = atan(dot(d, f2), dot(d, f1)) / 6.2832;
    vec3 colA = nsPalette(along * 5.0 + .1 + (q.z - 0.5) * 1.3 + (w - 0.5) * 0.6);
    vec3 colB = nsPalette(alongB * 4.0 + 0.45 + (q.x - 0.5) * 1.2);
    vec3 col = mix(colB, colA, smoothstep(0.0, 1.0, riverA / max(1e-3, riverA + riverB)));
    col = max(vec3(0.0), mix(vec3(dot(col, vec3(0.3, 0.59, 0.11))), col, 1.35));
    vec3 gas = col * (density * density * 0.85 + density * 0.1 + filaments * 0.26);
    gas += mix(col, vec3(1.0, 0.92, 0.78), 0.4) * pow(density, 3.0) * 0.8;
    gas += vec3(0.012, 0.007, 0.03) * exp(-latA * latA * 4.0) + vec3(0.003, 0.007, 0.018) * exp(-latB * latB * 6.0);
    return gas * (1.0 - dust * 0.85);
  }
  vec3 nsStarLayer(vec3 d, float scale, float density, float size, float t) {
    vec3 sp = d * scale;
    vec3 cell = floor(sp);
    float r = nsHash(cell);
    float lit = step(1.0 - density * (1.0 + nsBody * 2.2), r);
    vec3 jitter = nsHash3(cell) * 0.7 + 0.15;
    float dist = length(sp - (cell + jitter));
    float s = size * (0.55 + nsHash(cell + 3.1) * 0.9);
    float core = smoothstep(s, 0.0, dist);
    float temp = nsHash(cell + 7.7);
    vec3 tint = temp < 0.25 ? vec3(0.7, 0.82, 1.0) : temp < 0.7 ? vec3(1.0, 0.98, 0.95) : temp < 0.9 ? vec3(1.0, 0.86, 0.6) : vec3(1.0, 0.62, 0.45);
    float tw = 0.7 + 0.3 * sin(t * (0.8 + r * 2.0) + r * 40.0);
    return tint * lit * core * core * tw;
  }
  vec3 nebulaStars(vec3 d, float t) {
    vec3 stars = nsStarLayer(d, 140.0, 0.10, 0.36, t) * 1.8 + nsStarLayer(d, 300.0, 0.12, 0.36, t) * 1.1
      + nsStarLayer(d, 620.0, 0.14, 0.42, t) * 0.7;
    vec3 sp = d * 46.0;
    vec3 cell = floor(sp);
    if (nsHash(cell + 1.3) > 0.955) {
      vec3 c = cell + nsHash3(cell + 2.1) * 0.6 + 0.2;
      vec3 off = sp - c;
      float dist = length(off);
      vec3 up = abs(d.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
      vec3 ax = normalize(cross(d, up)), ay = cross(d, ax);
      float x = dot(off, ax), y = dot(off, ay);
      float spikes = (exp(-abs(x) * 70.0) * exp(-abs(y) * 7.0) + exp(-abs(y) * 70.0) * exp(-abs(x) * 7.0)) * 0.35;
      float glow = exp(-dist * 9.0) * 0.5 + exp(-dist * 34.0);
      float temp = nsHash(cell + 4.4);
      vec3 tint = temp < 0.4 ? vec3(0.75, 0.86, 1.0) : temp < 0.8 ? vec3(1.0, 0.97, 0.9) : vec3(1.0, 0.8, 0.55);
      stars += tint * (glow + spikes) * 1.4 * (0.85 + 0.15 * sin(t * 1.3 + temp * 20.0));
    }
    return stars * (1.0 - nsDust * 0.75);
  }
`;

const skyFragment = /* glsl */ `
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${noise}
  ${horizonColor}
  ${nebula}

  // Occasional meteors: each slot fires once per period somewhere in the upper sky.
  float meteor(vec2 sky, float clock, float slot) {
    float period = 9.0 + slot * 4.7;
    float shift = clock / period + slot * .37;
    float id = floor(shift);
    float age = fract(shift) * period;
    float life = .85;
    if (age > life) return 0.0;
    vec2 seed = vec2(id, slot * 13.1);
    vec2 start = vec2(hash(seed) * 2.6 - 1.3, .24 + hash(seed + 4.2) * .34);
    vec2 heading = normalize(vec2(hash(seed + 7.7) > .5 ? 1.0 : -1.0, -.42 - hash(seed + 2.9) * .3));
    float progress = age / life;
    vec2 head = start + heading * progress * .42;
    vec2 rel = sky - head;
    float along = dot(rel, -heading);
    float across = abs(rel.x * heading.y - rel.y * heading.x);
    float trail = smoothstep(.16, 0.0, along) * step(0.0, along) * exp(-across * 900.0);
    float spark = exp(-length(rel) * 260.0);
    return (trail + spark) * sin(progress * 3.1416);
  }

  void main() {
    vec3 d = normalize(worldPoint - cameraPosition);
    float elevation = d.y;
    float longitude = atan(d.x, -d.z);
    vec3 color = nightHorizon(d, clock);

    // The gas and stars thin into the brighter horizon air.
    float air = smoothstep(-.02, .07, elevation);
    float starAir = smoothstep(-.01, .05, elevation);
    vec3 gas = nebulaGlow(d) * air * 2.1;
    // Roll off the densest cores so they stay coloured instead of clipping to white.
    gas /= 1.0 + max(gas.r, max(gas.g, gas.b)) * .75;
    color = color * (1.0 - nsDust * .35 * air) + gas;
    color += nebulaStars(d, clock) * starAir;
    vec2 sky = vec2(longitude, elevation);
    color += vec3(.85, .92, 1.0) * (meteor(sky, clock, 0.0) + meteor(sky, clock, 1.0)) * 2.2 * starAir;

    vec3 planetDirection = normalize(vec3(.026, .036, -1.0));
    vec3 right = normalize(vec3(1.0, 0.0, .026));
    vec3 up = normalize(cross(right, planetDirection));
    vec2 p = vec2(dot(d, right), dot(d, up)) / .078;
    if (dot(d, planetDirection) > .87 && length(p) < 2.45) {
      float radius = length(p);
      vec2 r = mat2(.956, -.293, .293, .956) * p;
      float ringRadius = length(vec2(r.x, r.y * 3.55));
      float ringBands = smoothstep(1.15, 1.23, ringRadius) * (1.0 - smoothstep(1.90, 2.17, ringRadius));
      ringBands *= .54 + .22 * sin(ringRadius * 31.0) + .17 * sin(ringRadius * 57.0);
      float ringLight = .45 + .35 * sat(.5 - p.x);
      vec3 ringTint = vec3(.26, .20, .34);
      color = mix(color, ringTint, ringBands * ringLight * .85);
      // A thin violet-teal atmosphere halo.
      color += vec3(.06, .16, .30) * exp(-abs(radius - 1.0) * 16.0) * .8;
      float globe = 1.0 - smoothstep(.98, 1.006, radius);
      vec3 normal = vec3(p, sqrt(max(0.0, 1.0 - dot(p, p))));
      float day = smoothstep(-.12, .9, dot(normal, normalize(vec3(-.89, .15, .43))));
      float band = .5 + .5 * sin(r.y * 22.0 + 3.1 * layers(p * vec2(1.9, 5.4)) + p.x * .9);
      vec3 night = vec3(.028, .032, .085);
      vec3 lit = mix(vec3(.10, .17, .40), vec3(.42, .27, .44), band);
      vec3 planet = mix(night, lit, day * day);
      planet *= .82 + band * .22 + layers(p * vec2(2.3, 5.4)) * .2;
      float limb = pow(1.0 - normal.z, 3.0);
      planet += vec3(.10, .26, .48) * limb * (.30 + day * .8);
      color = mix(color, planet, globe * .97);
      color = mix(color, ringTint, ringBands * ringLight * (1.0 - smoothstep(-.17, -.04, r.y)) * globe * .85);
    }
    color += (hash(gl_FragCoord.xy) - .5) * .004;

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const seaFragment = /* glsl */ `
  #include <common>
  uniform float clock;
  uniform float isPool;
  varying vec3 worldPoint;
  ${noise}
  ${horizonColor}

  void main() {
    vec2 p = worldPoint.xz;
    vec3 view = normalize(cameraPosition - worldPoint);
    float distanceToEye = length(cameraPosition - worldPoint);
    vec2 drift = vec2(clock * .15, -clock * .12);
    float granule = layers(p * vec2(.22, .21) + drift * .38);
    float swell = sin(dot(p, vec2(.20, .55)) + granule * 4.3 - clock * .46);
    float crossSea = sin(dot(p, vec2(-.54, .386)) + clock * .68 + granule * 3.0);
    float swash = sin(dot(p, vec2(1.10, .91)) + clock * .93 + swell * .73);
    float ripples = (.5 + swash * .5) * (.6 * granule + swell * .10);
    float glint = smoothstep(.27, .55, ripples) * (1.0 - smoothstep(.12, 1.14, fwidth(p.x) + fwidth(p.y)));
    vec3 n = normalize(vec3(crossSea * .055 + swash * .024, 1.0, swell * .08));
    float fresnel = pow(1.0 - max(0.0, dot(n, view)), 3.1);
    vec3 deep = mix(vec3(.010, .020, .055), vec3(.012, .060, .085), isPool);
    vec3 shallows = mix(vec3(.040, .060, .150), vec3(.05, .26, .30), isPool);
    vec3 color = mix(deep, shallows, sat(fresnel * .6 + swell * .05 + granule * .2));
    // Mirror the night horizon, and catch starlight and lantern light in the ripples.
    vec3 mirrored = reflect(-view, n);
    mirrored.y = abs(mirrored.y);
    color = mix(color, nightHorizon(mirrored, clock), fresnel * .7);
    color += mix(vec3(.10, .12, .32), vec3(.20, .62, .62), isPool) * glint * (.18 + isPool * .5);
    float haze = smoothstep(76.0, 370.0, distanceToEye) * (1.0 - isPool);
    color = mix(color, nightHorizon(-view, clock), haze);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const mistFragment = /* glsl */ `
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${noise}
  void main() {
    vec2 p = worldPoint.xz;
    float banks = layers(p * vec2(.048, .072) + vec2(clock * -.023, 3.7));
    float frays = layers(p * .17 + vec2(clock * .036, 2.4));
    float fog = smoothstep(.53, .76, banks + frays * .13) * .62;
    float distanceToEye = distance(worldPoint, cameraPosition);
    float nearFade = smoothstep(21.0, 45.0, distanceToEye);
    float edgeFade = 1.0 - smoothstep(68.0, 230.0, length(p));
    // Moonlit cloud tops: indigo in the folds, lilac and a hint of teal on the crests.
    vec3 color = mix(vec3(.022, .026, .075), vec3(.10, .095, .20), smoothstep(.46, .80, banks));
    color += vec3(.012, .05, .06) * smoothstep(.6, .9, frays);
    gl_FragColor = vec4(color, fog * nearFade * edgeFade);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function flatSurface(root: Group, width: number, depth: number, x: number, y: number, z: number, material: ShaderMaterial) {
  const plane = new Mesh(new PlaneGeometry(width, depth), material);
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(x, y, z);
  root.add(plane);
  return plane;
}

function buildPool(root: Group, material: ShaderMaterial) {
  const positions: number[] = [];
  const uv: number[] = [];
  const indices: number[] = [];
  const subdivisions = 70;
  const inside = (col: number, row: number) => {
    const x = spill[0] - 2.2 + col * .21;
    const z = pool[1] - 4.8 + row * .21;
    return shoreFraction(x, z) <= 1.002 && heightAt(x, z) < poolLevel + .43;
  };
  for (let row = 0; row <= subdivisions; row++) {
    for (let col = 0; col <= subdivisions; col++) {
      positions.push(spill[0] - 2.2 + col * .21, poolLevel, pool[1] - 4.8 + row * .21);
      uv.push(col / subdivisions, row / subdivisions);
      if (!row || !col || !inside(col, row) || !inside(col - 1, row - 1)) continue;
      const corner = row * (subdivisions + 1) + col;
      const opposite = corner - subdivisions - 2;
      if (inside(col - 1, row)) indices.push(opposite, corner - 1, corner);
      if (inside(col, row - 1)) indices.push(opposite, corner, corner - subdivisions - 1);
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  root.add(new Mesh(geometry, material));
}

function waterfall(root: Group, clock: WorldClock) {
  const rows = 26;
  const columns = 15;
  const positions: number[] = [];
  const uv: number[] = [];
  const faces: number[] = [];
  for (let row = 0; row <= rows; row++) {
    const v = row / rows;
    for (let col = 0; col <= columns; col++) {
      const u = col / columns;
      const angle = spillAngle + (u - .5) * (.109 + .07 * v);
      const [x, z] = rimPoint(angle, 1.003 + Math.sin(v * 2.1) * .057);
      const y = Math.max(poolLevel + .06, heightAt(x, z) + .02);
      positions.push(x - v * .19, y + (seaLevel - y) * v, z + Math.sin(v * 2.5) * .71);
      uv.push(u, v);
      if (row === 0 || col === 0) continue;
      const i = row * (columns + 1) + col;
      const b = i - columns - 1;
      faces.push(b - 1, b, i, b - 1, i, i - 1);
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uv, 2));
  geometry.setIndex(faces);
  const material = new ShaderMaterial({
    uniforms: { clock },
    transparent: true, depthWrite: false, side: DoubleSide, toneMapped: false,
    vertexShader: skinVertex,
    fragmentShader: /* glsl */ `
      uniform float clock;
      varying vec2 coords;
      ${noise}
      void main() {
        vec2 p = vec2(coords.x * 17.0, coords.y * 8.1 - clock * 2.2);
        float film = layers(p) * .45 + .55 * field(p * vec2(1.85, .33) + 6.0);
        float ribbons = smoothstep(.39, .77, film);
        float edge = smoothstep(0.0, .16, coords.x) * (1.0 - smoothstep(.84, 1.0, coords.x));
        float alpha = edge * (1.0 - smoothstep(.76, 1.0, coords.y)) * (.42 + .53 * ribbons);
        vec3 color = mix(vec3(.22, .42, .58), vec3(.66, .84, .95), ribbons);
        gl_FragColor = vec4(color * color, alpha);
        #include <colorspace_fragment>
      }
    `,
  });
  root.add(new Mesh(geometry, material));
}

export function portalSurface(clock: WorldClock, invalidate: () => void) {
  const reflectionReady = { value: 0 };
  const heroes = new TextureLoader().load('./island-media/dream-ocean-reflections.webp', () => {
    reflectionReady.value = 1;
    invalidate();
  });
  heroes.colorSpace = SRGBColorSpace;
  heroes.magFilter = NearestFilter;
  heroes.minFilter = NearestFilter;
  heroes.generateMipmaps = false;
  return new ShaderMaterial({
    uniforms: { clock, heroes: { value: heroes }, reflectionReady },
    toneMapped: false,
    side: DoubleSide,
    vertexShader: /* glsl */ `
      varying vec2 coords;
      varying vec3 mirrorView;
      void main() {
        coords = uv;
        vec4 view = modelViewMatrix * vec4(position, 1.0);
        mirrorView = -(view.xyz * normalMatrix);
        gl_Position = projectionMatrix * view;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float clock;
      uniform sampler2D heroes;
      uniform float reflectionReady;
      varying vec2 coords;
      varying vec3 mirrorView;
      ${noise}
      vec4 reflectParty(vec2 p, float layer) {
        p = clamp(p, vec2(.004), vec2(.996));
        return texture2D(heroes, vec2((p.x + layer) * .5, p.y));
      }
      void main() {
        vec2 p = coords * vec2(.30, .20) + vec2(.50, .0);
        float drift = layers(vec2(p.x * 2.6 - clock * .18, p.y * 4.7 + clock * .09));
        float horizon = sin(p.x * 5.0 + .7) * .11 + .46;
        float band = exp(-abs(p.y - horizon - drift * .22) * 9.4);
        float contour = pow(.5 + .5 * sin((p.y + drift * .17) * 92.0 - clock * 1.1), 7.0);
        float rim = pow(abs(p.x - .5) * 1.45, 2.6);
        float light = sat(.23 + drift * .49 + band * .38 + contour * .13 + rim * .2);
        vec3 color = mix(vec3(.10, .20, .33), vec3(.68, .80, .96), light);
        color += pow(band, 13.0) * vec3(.12, .13, .11);
        vec3 surface = color * color;
        if (reflectionReady > .5) {
          float distanceToPane = max(length(mirrorView), .01);
          float facing = smoothstep(.16, .68, abs(mirrorView.z) / distanceToPane);
          float strength = mix(1.0, .38, smoothstep(13., 53., distanceToPane)) * facing;
          vec2 viewSlide = clamp(mirrorView.xy / max(abs(mirrorView.z), 5.), vec2(-1.), vec2(1.));
          vec2 ripple = vec2(sin(p.y * 47. + drift * 3. - clock * 1.3) * .0038,
            sin(p.x * 34. + p.y * 12. + clock * .82) * .0021);
          vec4 distant = reflectParty(p + ripple - viewSlide * .092, 0.0);
          vec4 foreground = reflectParty(p + ripple - viewSlide * .042, 1.0);
          float recess = smoothstep(.08, .23, p.y) * (1.0 - smoothstep(.73, .95, p.y));
          surface = mix(surface, vec3(.030, .061, .118) + surface * .28, strength * recess * .73);
          surface = mix(surface, distant.rgb * vec3(.67, .77, .91) + vec3(.021, .037, .060),
            distant.a * strength * .69);
          surface = mix(surface, foreground.rgb * vec3(.94, .96, 1.0) + vec3(.012, .023, .036),
            foreground.a * strength * .89);
          surface += vec3(.018, .032, .058) * contour * strength;
        }
        gl_FragColor = vec4(surface, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
}

function buildDust(root: Group, clock: WorldClock, count: number) {
  const seed = randomFrom(6067);
  const positions: number[] = [];
  const phases: number[] = [];
  const hues: number[] = [];
  for (let i = 0; i < count; i++) {
    const x = (seed() - .5) * 48;
    const z = (seed() - .5) * 34;
    positions.push(x, heightAt(x, z) + seed() * 5 + .35, z);
    phases.push(seed() * 6.283);
    hues.push(seed());
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('phase', new Float32BufferAttribute(phases, 1));
  geometry.setAttribute('hue', new Float32BufferAttribute(hues, 1));
  const material = new ShaderMaterial({
    uniforms: { clock },
    transparent: true, depthWrite: false, toneMapped: false, blending: AdditiveBlending,
    vertexShader: /* glsl */ `
      uniform float clock;
      attribute float phase;
      attribute float hue;
      varying float brightness;
      varying vec3 tint;
      void main() {
        vec3 p = position;
        p.x += sin(phase + clock * .48) * .7;
        p.z += cos(phase + clock * .36) * .4;
        p.y += sin(phase + clock * .63) * .32;
        vec4 view = modelViewMatrix * vec4(p, 1.0);
        float pulse = pow(.5 + .5 * sin(phase * 3.0 + clock * (.9 + hue * .6)), 3.0);
        brightness = (.18 + .95 * pulse) * (1.0 - smoothstep(58.0, 90.0, -view.z));
        // Warm fireflies with a few teal and rose spirits among them.
        tint = hue < .62 ? vec3(1.0, .72, .32) : hue < .84 ? vec3(.35, 1.0, .86) : vec3(1.0, .48, .82);
        gl_PointSize = clamp(120.0 / max(1.0, -view.z), 1.8, 8.0);
        gl_Position = projectionMatrix * view;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float brightness;
      varying vec3 tint;
      void main() {
        float r = length(gl_PointCoord - .5);
        float core = exp(-r * r * 60.0) + exp(-r * 9.0) * .35;
        gl_FragColor = vec4(tint * core * brightness * 1.6, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
  root.add(new Points(geometry, material));
}

export function buildAtmosphere(root: Group, clock: WorldClock, low: boolean) {
  const sky = new Mesh(new SphereGeometry(510, 32, 20), new ShaderMaterial({
    uniforms: { clock }, vertexShader: skinVertex, fragmentShader: skyFragment,
    side: BackSide, depthWrite: false, fog: false,
  }));
  sky.renderOrder = -10;
  sky.frustumCulled = false;
  root.add(sky);

  const water = (isPool: number) => new ShaderMaterial({
    uniforms: { clock, isPool: { value: isPool } },
    vertexShader: skinVertex, fragmentShader: seaFragment,
  });
  flatSurface(root, 900, 900, 0, seaLevel, 0, water(0));
  buildPool(root, water(1));

  flatSurface(root, 830, 830, 0, -13.2, 0, new ShaderMaterial({
    uniforms: { clock }, vertexShader: skinVertex, fragmentShader: mistFragment,
    transparent: true, depthWrite: false,
  }));
  waterfall(root, clock);
  buildDust(root, clock, low ? 90 : 240);
}
