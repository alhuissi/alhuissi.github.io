import {
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Float32BufferAttribute,
  Vector3,
} from "three";

export const DRAGON_BODY = { rings: 96, sides: 24, length: 96 };
export const DRAGON_HEAD_SCALE = 1.15;
/** One shoulder pair, a head-length of bare neck behind the skull. */
export const DRAGON_SHOULDER = 11 / DRAGON_BODY.length;
/** Matches the open jaw's mouth, used by the existing visual strike. */
export const DRAGON_MOUTH = [0, -0.85, 6.8] as const;
export const DRAGON_PALETTE = {
  jade: "#597d68",
  dark: "#334e47",
  belly: "#deca9f",
  mane: "#b45a30",
  maneLight: "#e88b40",
  horn: "#eee0bc",
  eye: "#ecb84c",
  ink: "#162d2c",
};

/** The encounter's existing travelling spine; presentation never owns its route or clock. */
export function dragonSpine(
  u: number,
  time: number,
  target: Vector3,
  turn = 0
) {
  const delay = u * 7.2;
  const x =
    (Math.sin(time * 1.25 - delay) - Math.sin(time * 1.25)) * (2.3 + u * 5);
  const a = Math.max(0, Math.min(1, (time - u * 2.2 - 3) / 2.1)),
    followed = a * a * (3 - 2 * a);
  const lag = (turn - followed) * Math.PI * 0.62;
  return target.set(
    x - Math.sin(lag) * u * DRAGON_BODY.length * 0.65,
    (Math.sin(time * 0.95 - delay) - Math.sin(time * 0.95)) * 3.8,
    -Math.cos(lag) * u * DRAGON_BODY.length
  );
}
export function dragonRadius(u: number) {
  const neck = Math.min(1, Math.max(0, u / DRAGON_SHOULDER));
  return Math.max(
    0.035,
    1.9 *
      Math.pow(1 - Math.min(1, u), 0.72) *
      (1 + 0.12 * Math.sin(u * Math.PI)) *
      (0.72 + 0.28 * neck * neck * (3 - 2 * neck))
  );
}

export function dragonBodyGeometry() {
  const { rings, sides } = DRAGON_BODY,
    vertices = (rings + 1) * (sides + 1);
  const geometry = new BufferGeometry(),
    colours = new Float32Array(vertices * 3),
    uv = new Float32Array(vertices * 2),
    indices: number[] = [];
  const jade = new Color(DRAGON_PALETTE.jade),
    belly = new Color(DRAGON_PALETTE.belly),
    shadow = new Color(DRAGON_PALETTE.dark),
    c = new Color();
  for (let i = 0; i <= rings; i++)
    for (let j = 0; j <= sides; j++) {
      const k = i * (sides + 1) + j,
        down = -Math.cos((j / sides) * Math.PI * 2);
      c.copy(jade)
        .lerp(shadow, Math.max(0, down) * 0.24)
        .lerp(belly, Math.max(0, Math.min(1, (down - 0.06) * 5)));
      c.toArray(colours, k * 3);
      uv[k * 2] = j / sides;
      uv[k * 2 + 1] = i / rings;
      if (i < rings && j < sides) {
        const b = k + sides + 1;
        indices.push(k, k + 1, b, k + 1, b + 1, b);
      }
    }
  geometry.setAttribute(
    "position",
    new Float32BufferAttribute(new Float32Array(vertices * 3), 3)
  );
  geometry.setAttribute(
    "normal",
    new Float32BufferAttribute(new Float32Array(vertices * 3), 3)
  );
  geometry.setAttribute("color", new Float32BufferAttribute(colours, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  return geometry;
}

/** Authored cross-sections: z, half-width, half-height, vertical centre. */
type Section = readonly [number, number, number, number];
export function dragonLoft(sections: readonly Section[], sides = 24) {
  const geometry = new BufferGeometry(),
    positions: number[] = [],
    uv: number[] = [],
    indices: number[] = [];
  sections.forEach(([z, width, height, y], row) => {
    for (let j = 0; j <= sides; j++) {
      const a = (j / sides) * Math.PI * 2,
        sn = Math.sin(a),
        cs = Math.cos(a);
      // A slightly squared section creates cheek/brow planes instead of stacked balls.
      positions.push(
        Math.sign(sn) * Math.pow(Math.abs(sn), 0.82) * width,
        y + Math.sign(cs) * Math.pow(Math.abs(cs), 0.88) * height,
        z
      );
      uv.push(j / sides, row / (sections.length - 1));
      if (row < sections.length - 1 && j < sides) {
        const k = row * (sides + 1) + j,
          b = k + sides + 1;
        indices.push(k, b, k + 1, k + 1, b, b + 1);
      }
    }
  });
  // Close the two authored ends; the muzzle and fingertips must not retain pinholes.
  for (const row of [0, sections.length - 1]) {
    const center = positions.length / 3,
      section = sections[row];
    positions.push(0, section[3], section[0]);
    uv.push(0.5, row === 0 ? 0 : 1);
    for (let j = 0; j < sides; j++) {
      const k = row * (sides + 1) + j;
      if (row === 0) indices.push(center, k, k + 1);
      else indices.push(center, k + 1, k);
    }
  }
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
export const DRAGON_HEAD_SECTIONS: readonly Section[] = [
  [-1.85, 0.06, 0.1, 0.45],
  [-1.45, 1.3, 1.03, 0.5],
  [-0.5, 1.85, 1.25, 0.57],
  [0.55, 2.12, 1.32, 0.59],
  [1.45, 2.01, 1.18, 0.5],
  [2.15, 1.72, 0.92, 0.34],
  [2.95, 1.36, 0.67, 0.18],
  [3.8, 1.12, 0.52, 0.08],
  [4.6, 0.96, 0.42, 0.035],
  [5.18, 0.91, 0.37, 0.02],
  [5.48, 0.99, 0.36, 0.03],
  [5.67, 0.77, 0.3, 0.03],
  [5.8, 0.015, 0.025, 0.03],
];
export const DRAGON_JAW_SECTIONS: readonly Section[] = [
  [-0.65, 0.03, 0.03, 0.03],
  [0, 0.98, 0.17, -0.06],
  [1.0, 1.05, 0.18, -0.04],
  [2.2, 0.92, 0.16, -0.04],
  [3.25, 0.84, 0.15, -0.12],
  [3.9, 0.7, 0.12, -0.15],
  [4.2, 0.33, 0.08, -0.14],
  [4.28, 0.015, 0.015, -0.12],
];

/** The long bridge has flatter dorsal/lateral planes than the orbital skull. */
export function dragonHeadPowers(z: number) {
  const t = Math.max(0, Math.min(1, (z - 2.5) / 1.5));
  const flat = t * t * (3 - 2 * t);
  return [0.82 - flat * 0.08, 0.88 - flat * 0.26] as const;
}

export function dragonHeadSection(z: number): Section {
  const a = DRAGON_HEAD_SECTIONS;
  const tangent = (row: number, k: number) => {
    const slope = (i: number) => (a[i + 1][k] - a[i][k]) / (a[i + 1][0] - a[i][0]);
    if (row === 0) return slope(0);
    if (row === a.length - 1) return slope(row - 1);
    const left = slope(row - 1), right = slope(row);
    return left * right <= 0 ? 0 : 2 * left * right / (left + right);
  };
  for (let i = 1; i < a.length; i++) {
    if (z > a[i][0]) continue;
    const t = Math.max(0, (z - a[i - 1][0]) / (a[i][0] - a[i - 1][0]));
    const previous = a[i - 1],
      next = a[i];
    const span = next[0] - previous[0];
    const component = (k: number) =>
      (2 * t * t * t - 3 * t * t + 1) * previous[k] +
      (t * t * t - 2 * t * t + t) * span * tangent(i - 1, k) +
      (-2 * t * t * t + 3 * t * t) * next[k] +
      (t * t * t - t * t) * span * tangent(i, k);
    return [
      z,
      component(1),
      component(2),
      component(3),
    ];
  }
  return a[a.length - 1];
}

/** Low alar wings and recessed slots in a reptilian rostrum. There are no rounded
 * mammalian muzzle pads; the lower cleft only divides the end of the nasal plate. */
export function dragonNasalRelief(x: number, y: number, z: number) {
  const t = Math.max(0, Math.min(1, (z - 5.12) / .4));
  const mask = t * t * (3 - 2 * t);
  const bump = (cx: number, cy: number, sx: number, sy: number) =>
    Math.exp(-Math.pow((Math.abs(x) - cx) / sx, 2) - Math.pow((y - cy) / sy, 2));
  const relief = mask * (
    bump(.67, .12, .25, .20) * .11 +
    bump(.34, -.18, .28, .16) * .025 +
    bump(0, .26, .24, .2) * .035 -
    bump(.54, .16, .15, .07) * .105 -
    bump(0, -.12, .075, .18) * .045 -
    bump(.86, -.02, .065, .18) * .028
  );
  if (relief <= 0) return relief;
  const available = Math.max(0, 5.8 - z);
  return available > .00001 ? available * (1 - Math.exp(-relief / available)) : 0;
}
/** Dense static sculpt; the moving body retains its existing lightweight mesh. */
export function dragonHeadGeometry() {
  const sections: Section[] = [];
  DRAGON_HEAD_SECTIONS.slice(1).forEach((s, i) => {
    const start = DRAGON_HEAD_SECTIONS[i][0];
    const steps = s[0] >= 3.5 ? 12 : 6;
    for (let j = 0; j < steps; j++)
      sections.push(dragonHeadSection(start + ((s[0] - start) * j) / steps));
  });
  sections.push(DRAGON_HEAD_SECTIONS[DRAGON_HEAD_SECTIONS.length - 1]);
  const g = dragonLoft(sections, 80),
    p = g.getAttribute("position"), uv = g.getAttribute("uv");
  // The reference has two broad forehead planes divided by a narrow central keel.
  // Sculpt the actual skin rather than placing another oval on top of the skull.
  for (let i = 0; i < p.count; i++) {
    const z = p.getZ(i), [, width, h, center] = dragonHeadSection(z),
      [px, py] = dragonHeadPowers(z), a = uv.getX(i) * Math.PI * 2;
    const x = Math.sign(Math.sin(a)) * Math.pow(Math.abs(Math.sin(a)), px) * width;
    const y = center + Math.sign(Math.cos(a)) * Math.pow(Math.abs(Math.cos(a)), py) * h;
    // End-cap centres retain their authored centre instead of becoming ring vertices.
    if (i >= sections.length * 81) continue;
    // Physical length keeps scale spacing stable despite the denser nasal mesh.
    uv.setY(i, (z + 1.85) / 7.65);
    p.setX(i, x);
    const top = Math.max(0, Math.min(1, (y - center) / h));
    const length = Math.max(0, Math.min(1, (z + .7) / 1.2)) *
      Math.max(0, Math.min(1, (3.6 - z) / 1.2));
    p.setY(i, y + Math.exp(-x * x * 3.5) * top * top * length * .11);
    p.setZ(i, z + dragonNasalRelief(x, y, z));
  }
  g.computeVertexNormals();
  return g;
}
/** Exterior cheek surface shared by the sculpt, inset eyes and sculpted eyelids. */
export function dragonCheekX(y: number, z: number) {
  const [, width, height, center] = dragonHeadSection(z);
  const [px, py] = dragonHeadPowers(z);
  const cosine = Math.pow(
    Math.min(1, Math.abs((y - center) / height)),
    1 / py
  );
  return width * Math.pow(Math.sqrt(Math.max(0, 1 - cosine * cosine)), px);
}
export const DRAGON_EYE = {
  z: 1.85,
  y: 0.76,
  length: 0.62,
  height: 0.31,
  tilt: -0.24,
};
/** Curved almond lens follows the actual cheek. Regular topology avoids the old
 * projected flat-polygon artifacts. u runs rear-to-front; v runs lower-to-upper lid. */
export function dragonEyePoint(
  u: number,
  v: number,
  target: Vector3,
  lift = 0
) {
  const e = DRAGON_EYE,
    z = e.z + u * e.length;
  const y =
    e.y +
    e.tilt * u +
    v * (v > 0 ? 0.86 - u * 0.24 : 0.82 * (1 - u * 0.16)) *
      Math.pow(Math.max(0, 1 - u * u), 0.75) * e.height;
  return target.set(
    dragonCheekX(y, z) + 0.065 + 0.075 * (1 - u * u) * (1 - v * v) + lift,
    y,
    z
  );
}
export function dragonEyeGeometry() {
  const positions: number[] = [],
    uv: number[] = [],
    indices: number[] = [],
    p = new Vector3();
  const columns = 32,
    rows = 16;
  for (let i = 0; i <= columns; i++)
    for (let j = 0; j <= rows; j++) {
      dragonEyePoint((i / columns) * 2 - 1, (j / rows) * 2 - 1, p);
      positions.push(p.x, p.y, p.z);
      uv.push(i / columns, j / rows);
      if (i < columns && j < rows) {
        const k = i * (rows + 1) + j,
          b = k + rows + 1;
        indices.push(k, k + 1, b, k + 1, b + 1, b);
      }
    }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(positions, 3));
  g.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}
/** A tapered lid crest, broad at the outer corner, sculpted into the forehead. */
export function dragonBrowGeometry() {
  const positions: number[] = [],
    indices: number[] = [],
    p = new Vector3();
  const columns = 32,
    rows = 6;
  for (let i = 0; i <= columns; i++)
    for (let j = 0; j <= rows; j++) {
      const u = (i / columns) * 2.8 - 1.75,
        v = j / rows,
        taper = Math.pow(Math.sin((i / columns) * Math.PI), 0.6);
      dragonEyePoint(u, 1, p);
      const edgeX = p.x;
      // A swept rear wing, not a round eyebrow arch over a circular eye.
      p.y += Math.max(0, -u - 0.45) * 0.27 + v * 0.23 * taper * (0.9 - u * 0.24);
      p.z -= v * 0.16 * taper;
      p.x =
        Math.max(edgeX - 0.14 * v, dragonCheekX(p.y, p.z) + 0.025) +
        Math.sin(v * Math.PI) * 0.09 * taper;
      positions.push(p.x, p.y, p.z);
      if (i < columns && j < rows) {
        const k = i * (rows + 1) + j,
          b = k + rows + 1;
        indices.push(k, k + 1, b, k + 1, b + 1, b);
      }
    }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(positions, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

/** Authored limb thickness stays substantial at elbows and wrists. */
export function sampleDragonRadius(profile: readonly number[], t: number) {
  const p = Math.max(0, Math.min(1, t)) * (profile.length - 1);
  const i = Math.min(profile.length - 2, Math.floor(p)),
    f = p - i;
  return profile[i] * (1 - f) + profile[i + 1] * f;
}
/** A pointed curved horn/whisker, with radius taper, not a constant-width pipe. */
export function taperedDragonTube(
  points: number[][],
  radius: number,
  segments = 22,
  sides = 8,
  profile?: readonly number[]
) {
  const curve = new CatmullRomCurve3(
    points.map((p) => new Vector3(...(p as [number, number, number])))
  );
  const frames = curve.computeFrenetFrames(segments, false),
    positions: number[] = [],
    uv: number[] = [],
    indices: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments,
      p = curve.getPointAt(t),
      r = profile
        ? radius * sampleDragonRadius(profile, t)
        : radius * Math.pow(1 - t, 0.72) + 0.008;
    for (let j = 0; j <= sides; j++) {
      uv.push(j / sides, i / segments);
      const a = (j / sides) * Math.PI * 2,
        n = frames.normals[i],
        b = frames.binormals[i];
      positions.push(
        p.x + r * (n.x * Math.cos(a) + b.x * Math.sin(a)),
        p.y + r * (n.y * Math.cos(a) + b.y * Math.sin(a)),
        p.z + r * (n.z * Math.cos(a) + b.z * Math.sin(a))
      );
      if (i < segments && j < sides) {
        const k = i * (sides + 1) + j,
          v = k + sides + 1;
        indices.push(k, v, k + 1, k + 1, v, v + 1);
      }
    }
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(positions, 3));
  g.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

/** A swept solid mane blade with a raised central rib and three painted planes. */
export function dragonBlade(root: Vector3, tip: Vector3, width: number) {
  const direction = tip.clone().sub(root),
    side = new Vector3()
      .crossVectors(direction, new Vector3(0, 0, 1))
      .normalize();
  if (side.lengthSq() < 0.01) side.set(1, 0, 0);
  const normal = new Vector3().crossVectors(side, direction).normalize(),
    rings: Vector3[][] = [];
  for (let i = 0; i <= 10; i++) {
    const u = i / 10,
      p = root
        .clone()
        .addScaledVector(direction, u)
        .addScaledVector(normal, Math.sin(u * Math.PI) * width * 0.42);
    const w =
      width *
      (0.16 * (1 - u) +
        Math.pow(Math.sin(u * Math.PI), 0.75) * Math.pow(1 - u, 0.35));
    rings.push(
      [-1, 0, 1, 0].map((x, j) =>
        p
          .clone()
          .addScaledVector(side, x * w * (x < 0 && i === 6 ? 0.67 : x > 0 && i === 8 ? 0.48 : 1))
          .addScaledVector(normal, j === 1 ? w * 0.1 : j === 3 ? -w * 0.025 : 0)
      )
    );
  }
  const positions: number[] = [],
    colours: number[] = [],
    indices: number[] = [],
    colors = [
      new Color(DRAGON_PALETTE.maneLight),
      new Color(DRAGON_PALETTE.mane),
      new Color("#853f27"),
      new Color(DRAGON_PALETTE.mane),
    ];
  for (let face = 0; face < 4; face++) {
    const base = positions.length / 3;
    for (let i = 0; i < rings.length; i++)
      for (const edge of [face, (face + 1) % 4]) {
        const p = rings[i][edge];
        positions.push(p.x, p.y, p.z);
        colors[face].toArray(colours, colours.length);
        if (i < rings.length - 1 && edge === face) {
          const k = base + i * 2;
          indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
        }
      }
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(positions, 3));
  g.setAttribute("color", new Float32BufferAttribute(colours, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}
