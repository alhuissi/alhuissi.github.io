import {
  BackSide, BufferGeometry, DoubleSide, Float32BufferAttribute, Mesh, PlaneGeometry,
  Points, ShaderMaterial, SphereGeometry,
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

const horizonColor = /* glsl */ `
  vec3 dusk(vec3 d, float clock) {
    float elevation = d.y;
    float longitude = atan(d.x, -d.z);
    float warmth = pow(sat(dot(d, normalize(vec3(-.57, .026, -.82)))), 4.0);
    vec3 midnight = vec3(.032, .087, .18);
    vec3 blue = vec3(.135, .258, .46);
    vec3 horizon = mix(vec3(.41, .502, .706), vec3(.86, .579, .45), warmth);
    vec3 color = mix(midnight, blue, pow(sat(1.0 - elevation * 2.2), 1.9));
    color = mix(color, horizon, exp(-abs(elevation + .013) * 7.3) * .94);

    vec2 cloudUV = vec2(longitude * 8.0 - clock * .009, elevation * 36.0);
    float fronts = layers(cloudUV + vec2(3.4, 1.4));
    float filaments = layers(cloudUV * vec2(.81, 1.38) + vec2(6.0, 4.4));
    float shelf = exp(-pow(abs(elevation + .016) / .084, 2.0));
    float distant = smoothstep(.37, .76, fronts) * shelf;
    float sheer = smoothstep(.54, .80, filaments) * exp(-pow(abs(elevation - .015) / .16, 2.0));
    vec3 cloudColor = mix(vec3(.60, .67, .81), vec3(.99, .753, .61), warmth * .76);
    return mix(color, cloudColor, distant * .80 + sheer * .35);
  }
`;

const skyFragment = /* glsl */ `
  uniform float clock;
  varying vec3 worldPoint;
  ${noise}
  ${horizonColor}

  void main() {
    vec3 d = normalize(worldPoint - cameraPosition);
    float elevation = d.y;
    float longitude = atan(d.x, -d.z);
    vec3 color = dusk(d, clock);

    vec2 stars = vec2(longitude * 183.0, elevation * 194.0);
    vec2 starCell = floor(stars);
    vec2 starCenter = vec2(hash(starCell + 10.0), hash(starCell - 18.0)) * .55 + .23;
    float brightness = hash(starCell + 3.25);
    float star = (1.0 - smoothstep(.018, .102, length(fract(stars) - starCenter))) *
      smoothstep(.94, .997, brightness) * smoothstep(.014, .22, elevation);
    color += star * vec3(.67, .76, .79) * (.85 + .15 * sin(clock * .45 + brightness * 90.0));

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
      float ringLight = .50 + .30 * sat(.5 - p.x);
      vec3 ringTint = vec3(.80, .73, .69);
      color = mix(color, ringTint, ringBands * ringLight);
      color += vec3(.15, .17, .20) * exp(-abs(radius - 1.0) * 16.0) * .48;
      float globe = 1.0 - smoothstep(.98, 1.006, radius);
      vec3 normal = vec3(p, sqrt(max(0.0, 1.0 - dot(p, p))));
      float day = smoothstep(-.29, .76, dot(normal, normalize(vec3(-.89, .15, .43))));
      float band = .5 + .5 * sin(r.y * 22.0 + 3.1 * layers(p * vec2(1.9, 5.4)) + p.x * .9);
      vec3 planet = mix(vec3(.24, .355, .54), vec3(.855, .752, .656), day);
      planet *= .88 + band * .16 + layers(p * vec2(2.3, 5.4)) * .16;
      planet = mix(planet, vec3(.63, .68, .75), smoothstep(.87, 1.0, radius) * .52);
      color = mix(color, planet, globe * .94);
      color = mix(color, ringTint, ringBands * ringLight * (1.0 - smoothstep(-.17, -.04, r.y)) * globe);
    }
    color += (hash(gl_FragCoord.xy) - .5) * .009;

    gl_FragColor = vec4(color * color, 1.0);
    #include <colorspace_fragment>
  }
`;

const seaFragment = /* glsl */ `
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
    vec3 deep = mix(vec3(.095, .212, .334), vec3(.10, .31, .35), isPool);
    vec3 shallows = mix(vec3(.315, .466, .621), vec3(.43, .68, .68), isPool);
    vec3 color = mix(deep, shallows, sat(fresnel * .81 + swell * .055 + granule * .16));
    color += vec3(.25, .38, .46) * glint * (.25 + isPool * .54);
    float haze = smoothstep(76.0, 370.0, distanceToEye) * (1.0 - isPool);
    color = mix(color, dusk(-view, clock), haze);
    gl_FragColor = vec4(color * color, 1.0);
    #include <colorspace_fragment>
  }
`;

const mistFragment = /* glsl */ `
  uniform float clock;
  varying vec3 worldPoint;
  ${noise}
  void main() {
    vec2 p = worldPoint.xz;
    float banks = layers(p * vec2(.048, .072) + vec2(clock * -.023, 3.7));
    float frays = layers(p * .17 + vec2(clock * .036, 2.4));
    float fog = smoothstep(.53, .76, banks + frays * .13) * .68;
    float distanceToEye = distance(worldPoint, cameraPosition);
    float nearFade = smoothstep(21.0, 45.0, distanceToEye);
    float edgeFade = 1.0 - smoothstep(68.0, 230.0, length(p));
    vec3 color = mix(vec3(.49, .56, .735), vec3(.82, .81, .88), smoothstep(.46, .77, banks));
    gl_FragColor = vec4(color * color, fog * nearFade * edgeFade);
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
        vec3 color = mix(vec3(.36, .62, .74), vec3(.86, .94, .97), ribbons);
        gl_FragColor = vec4(color * color, alpha);
        #include <colorspace_fragment>
      }
    `,
  });
  root.add(new Mesh(geometry, material));
}

export function portalSurface(clock: WorldClock) {
  return new ShaderMaterial({
    uniforms: { clock },
    toneMapped: false,
    vertexShader: skinVertex,
    fragmentShader: /* glsl */ `
      uniform float clock;
      varying vec2 coords;
      ${noise}
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
        gl_FragColor = vec4(color * color, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
}

function buildDust(root: Group, clock: WorldClock, count: number) {
  const seed = randomFrom(6067);
  const positions: number[] = [];
  const phases: number[] = [];
  for (let i = 0; i < count; i++) {
    const x = (seed() - .5) * 48;
    const z = (seed() - .5) * 34;
    positions.push(x, heightAt(x, z) + seed() * 5 + .35, z);
    phases.push(seed() * 6.283);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('phase', new Float32BufferAttribute(phases, 1));
  const material = new ShaderMaterial({
    uniforms: { clock },
    transparent: true, depthWrite: false, toneMapped: false,
    vertexShader: /* glsl */ `
      uniform float clock;
      attribute float phase;
      varying float brightness;
      void main() {
        vec3 p = position;
        p.x += sin(phase + clock * .48) * .7;
        p.z += cos(phase + clock * .36) * .4;
        p.y += sin(phase + clock * .63) * .32;
        vec4 view = modelViewMatrix * vec4(p, 1.0);
        brightness = (.34 + .42 * pow(.5 + .5 * sin(phase + clock * .57), 2.0))
          * (1.0 - smoothstep(58.0, 90.0, -view.z));
        gl_PointSize = clamp(85.0 / max(1.0, -view.z), 1.4, 5.6);
        gl_Position = projectionMatrix * view;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float brightness;
      void main() {
        float r = length(gl_PointCoord - .5);
        gl_FragColor = vec4(.86, .57, .22, brightness * (1.0 - smoothstep(.04, .49, r)));
        #include <colorspace_fragment>
      }
    `,
  });
  root.add(new Points(geometry, material));
}

export function buildAtmosphere(root: Group, clock: WorldClock, low: boolean) {
  const sky = new Mesh(new SphereGeometry(510, 32, 20), new ShaderMaterial({
    uniforms: { clock }, vertexShader: skinVertex, fragmentShader: skyFragment,
    side: BackSide, depthWrite: false, toneMapped: false,
  }));
  sky.renderOrder = -10;
  sky.frustumCulled = false;
  root.add(sky);

  const water = (isPool: number) => new ShaderMaterial({
    uniforms: { clock, isPool: { value: isPool } },
    vertexShader: skinVertex, fragmentShader: seaFragment, toneMapped: false,
  });
  flatSurface(root, 900, 900, 0, seaLevel, 0, water(0));
  buildPool(root, water(1));

  flatSurface(root, 830, 830, 0, -13.2, 0, new ShaderMaterial({
    uniforms: { clock }, vertexShader: skinVertex, fragmentShader: mistFragment,
    transparent: true, depthWrite: false, toneMapped: false,
  }));
  waterfall(root, clock);
  buildDust(root, clock, low ? 48 : 122);
}
