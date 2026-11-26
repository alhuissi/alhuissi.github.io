import {
  CanvasTexture, Color, ConeGeometry, CylinderGeometry, DodecahedronGeometry, DoubleSide,
  Group, IcosahedronGeometry, MeshStandardMaterial, PlaneGeometry, SRGBColorSpace, Vector3,
} from 'three';
import type { Material } from 'three';
import { box, column, lanternMaterial, solid, standard } from './geometry';
import { heightAt, pool, poolLevel, randomFrom, rimPoint, shoreFraction } from './land';
import { paths } from './terrain';
import type { Collisions } from './collision';
import type { WorldClock } from './atmosphere';
import { buildMeadow } from './meadow';

const bark = standard('#4a3c3a');
const barkLight = standard('#6a5548');

// Shared wind time for every crown (set to the world clock when the island is built).
let leafClock: WorldClock = { value: 0 };
let leafMask: CanvasTexture | null = null;

// Pocket Orbit's leaf-clump mask: white pointed leaves on transparent, densest in the middle and
// ragged at the edge, cut out of each leaf card so crowns end in foliage instead of facets.
function leafTexture() {
  if (leafMask) return leafMask;
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  const random = randomFrom(1337);
  const leaf = (x: number, y: number, length: number, width: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -length / 2);
    ctx.quadraticCurveTo(width, -length * .1, 0, length / 2);
    ctx.quadraticCurveTo(-width, -length * .1, 0, -length / 2);
    ctx.fill();
    ctx.restore();
  };
  const c = size / 2;
  for (let i = 0; i < 70; i++) {
    const r = Math.sqrt(random()) * size * .36;
    const a = random() * Math.PI * 2;
    const x = c + Math.cos(a) * r;
    const y = c + Math.sin(a) * r * .9;
    leaf(x, y, 30 + random() * 26, 11 + random() * 6, a + Math.PI / 2 + (random() - .5) * .9);
  }
  ctx.beginPath();
  ctx.arc(c, c, size * .2, 0, Math.PI * 2);
  ctx.fill();
  leafMask = new CanvasTexture(canvas);
  leafMask.colorSpace = SRGBColorSpace;
  return leafMask;
}

// Foliage as one soft rounded mass (normals point out of each clump, as in Pocket Orbit's crowns),
// catching a moonlit rim (lilac on top, teal underneath) and swaying gently higher up.
// `card`: the alpha-cut leaf cards wrapped around the clumps.
function foliage(color: string, glow = 0, card = false) {
  const material = new MeshStandardMaterial({ color, roughness: .8 });
  if (glow) {
    material.emissive = new Color(color);
    material.emissiveIntensity = glow;
  }
  if (card) {
    material.map = leafTexture();
    material.alphaTest = .5;
    material.side = DoubleSide;
  }
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uLeafTime = leafClock;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uLeafTime;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
      float leafLift = max(0.0, transformed.y - 1.2);
      float leafWave = sin(uLeafTime * .9 + transformed.x * .35 + transformed.z * .22);
      transformed.x += leafWave * .011 * leafLift;
      transformed.z += cos(uLeafTime * .7 + transformed.z * .31) * .008 * leafLift;`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <normal_fragment_begin>', `#include <normal_fragment_begin>
      ${card ? 'normal = normalize( vNormal );' : ''}`)
      .replace('#include <emissivemap_fragment>', `
      #include <emissivemap_fragment>
      float leafRim = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 2.4);
      vec3 leafRimColor = mix(vec3(.10, .32, .34), vec3(.34, .30, .62), clamp(normal.y * .5 + .5, 0.0, 1.0));
      totalEmissiveRadiance += leafRimColor * leafRim * .42 * diffuseColor.rgb * 3.0;
    `);
  };
  material.customProgramCacheKey = () => `foliage-${glow}-${card}`;
  return material;
}

const needleColors = ['#2f6a52', '#43805a', '#5a9064', '#3f7a63', '#6f9768'];
const blueColors = ['#2f5f74', '#3f7a8c', '#4f8e90', '#4a7894', '#6a9aa2'];
const blossomColors = ['#c66fae', '#9a6fd6', '#e38bb8', '#7d8de6'];
const needles = needleColors.map((color) => foliage(color));
const blueNeedles = blueColors.map((color) => foliage(color));
// Leaf cards a shade lighter than the body they wrap, so crown edges glint.
const lighten = (color: string, amount: number) => `#${new Color(color).offsetHSL(0, -.02, amount).getHexString()}`;
const needleCards = needleColors.map((color) => foliage(lighten(color, .09), 0, true));
const blueCards = blueColors.map((color) => foliage(lighten(color, .09), 0, true));
const firs = ['#1f4d48', '#285c50', '#2f6a5a', '#234f5a'].map((color) => foliage(color));
const blossoms = blossomColors.map((color) => foliage(color, .32));
const blossomCards = blossomColors.map((color) => foliage(lighten(color, .06), .38, true));
const glowFruit = lanternMaterial(0xffd6f0, 2.2);

// Organic crowns: a subdivided blob with every vertex nudged so no two clusters read as spheres.
function lumpy(radius: number, detail: number, seed: number) {
  const geometry = new IcosahedronGeometry(radius, detail);
  const random = randomFrom(seed);
  const position = geometry.attributes.position;
  const normals = geometry.attributes.normal;
  const cache = new Map<string, number>();
  for (let i = 0; i < position.count; i++) {
    const key = `${position.getX(i).toFixed(3)},${position.getY(i).toFixed(3)},${position.getZ(i).toFixed(3)}`;
    if (!cache.has(key)) cache.set(key, .84 + random() * .3);
    const k = cache.get(key)!;
    const x = position.getX(i);
    const y = position.getY(i);
    const z = position.getZ(i);
    const length = Math.hypot(x, y, z) || 1;
    // Normals point straight out of the clump, so it is lit as one soft rounded mass.
    normals.setXYZ(i, x / length, y / length, z / length);
    position.setXYZ(i, x * k, y * k, z * k);
  }
  return geometry;
}

function branch(parent: Group, from: Vector3, to: Vector3, startWidth: number, endWidth: number, mat: Material) {
  const aim = to.clone().sub(from);
  const center = from.clone().lerp(to, .5);
  const stem = solid(parent, new CylinderGeometry(endWidth, startWidth, aim.length() * 1.05, 7),
    mat, center.x, center.y, center.z);
  stem.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), aim.normalize());
}

function tree(root: Group, collisions: Collisions, x: number, z: number, size: number, yaw: number, seed: number, blue = false) {
  const foot = heightAt(x, z);
  const crown = blue ? blueNeedles : needles;
  const cards = blue ? blueCards : needleCards;
  const random = randomFrom(seed);
  const tree = new Group();
  tree.position.set(x, foot - .18, z);
  tree.rotation.y = yaw;
  tree.scale.setScalar(size);
  root.add(tree);
  const bend = [
    new Vector3(0, -.02, 0), new Vector3(-.11, .96, .09), new Vector3(.055, 1.88, .16),
    new Vector3(.49, 2.68, .20), new Vector3(.75, 3.30, .14),
  ];
  const widths = [.238, .174, .118, .071, .023];
  for (let i = 1; i < bend.length; i++) {
    branch(tree, bend[i - 1], bend[i], widths[i - 1], widths[i], i % 2 === 0 ? bark : barkLight);
  }
  for (let i = 0; i < 5; i++) {
    const angle = i * Math.PI * .4 + random() * .31;
    branch(tree, new Vector3(-.02, .31, .03), new Vector3(Math.cos(angle) * .62, -.02, Math.sin(angle) * .6),
      .12, .036, bark);
  }
  for (let i = 0; i < 10; i++) {
    const age = i / 10;
    const a = i * 2.4 + random() * .41;
    const direction = new Vector3(Math.cos(a), 0, Math.sin(a));
    const base = bend[1].clone().lerp(bend[4], .25 + .67 * age);
    const length = (1 - age * .69) * (1.32 + random() * .51);
    const end = base.clone().addScaledVector(direction, length);
    end.y += .31 + random() * .19;
    const elbow = base.clone().lerp(end, .53);
    elbow.y -= .14;
    branch(tree, base, elbow, .079 - age * .033, .049, bark);
    branch(tree, elbow, end, .052, .017, barkLight);

    for (let layer = 0; layer < 3; layer++) {
      const center = elbow.clone().lerp(end, .22 + layer * .32);
      const r = (1 - age * .54) * (1 - layer * .18);
      const mass = solid(tree, lumpy(1, 1, seed + i * 7 + layer),
        crown[(i + layer + 1) % crown.length], center.x, center.y + .1, center.z);
      mass.scale.set((.9 + random() * .25) * r, (.46 + random() * .16) * r, (.86 + random() * .22) * r);
      mass.rotation.y = i * .94;
      mass.rotation.z = -.16 + random() * .35;
      leafCards(tree, cards[(i + layer + 1) % cards.length], mass.position, mass.scale.x, mass.scale.y, mass.scale.z,
        layer === 0 ? 6 : 4, random);
    }
  }
  for (let i = 0; i < 3; i++) {
    const leaf = solid(tree, lumpy(.56 - i * .09, 1, seed + 91 + i), crown[2 + i], .62 + .139 * i, 3.07 + .20 * i, .14);
    leaf.scale.set(1.22, .57, .92);
    leafCards(tree, cards[2 + i], leaf.position, .68 - i * .1, .32 - i * .05, .5 - i * .08, 4, random);
  }
  collisions.add(x, z, size * .43, size * .43, foot - .2, size * 1.8);
}

// Leaf cards scattered over a clump's surface (mostly its upper side), each facing out of it.
const cardForward = new Vector3(0, 0, 1);
const cardOut = new Vector3();
function leafCards(parent: Group, material: Material, center: Vector3, sx: number, sy: number, sz: number,
  count: number, random: () => number) {
  for (let i = 0; i < count; i++) {
    const a = random() * Math.PI * 2;
    const lift = -.25 + random() * 1.15;
    cardOut.set(Math.cos(a), lift, Math.sin(a)).normalize();
    const size = (sx + sz) * (.62 + random() * .26);
    const card = solid(parent, new PlaneGeometry(size, size * (.8 + random() * .3)), material,
      center.x + cardOut.x * sx * .82, center.y + cardOut.y * sy * .9, center.z + cardOut.z * sz * .82);
    card.quaternion.setFromUnitVectors(cardForward, cardOut);
    card.rotateZ(random() * Math.PI * 2);
  }
}

// A layered fir: a slim trunk and stacked, slightly drooping tiers of needles.
function fir(root: Group, collisions: Collisions, x: number, z: number, size: number, seed: number) {
  const random = randomFrom(seed);
  const foot = heightAt(x, z);
  const tree = new Group();
  tree.position.set(x, foot - .1, z);
  tree.rotation.y = random() * 6.28;
  tree.scale.setScalar(size);
  root.add(tree);
  column(tree, bark, .07, .14, 1.3, 0, .62, 0, 6);
  const tiers = 4 + Math.floor(random() * 2);
  for (let i = 0; i < tiers; i++) {
    const t = i / tiers;
    const radius = (1 - t * .72) * (.95 + random() * .14);
    const height = .95 - t * .25;
    const cone = new ConeGeometry(radius, height, 7, 1);
    const position = cone.attributes.position;
    for (let v = 0; v < position.count; v++) {
      if (position.getY(v) < 0) {
        position.setY(v, position.getY(v) - .08 + random() * .05);
        position.setX(v, position.getX(v) * (.9 + random() * .2));
        position.setZ(v, position.getZ(v) * (.9 + random() * .2));
      }
    }
    cone.computeVertexNormals();
    const tier = solid(tree, cone, firs[(i + seed) % firs.length], (random() - .5) * .05, .9 + i * .52, (random() - .5) * .05);
    tier.rotation.y = random() * 6.28;
  }
  collisions.add(x, z, size * .5, size * .5, foot - .2, size * 3);
}

// Small "spirit" trees whose blossom canopies glow softly, with hanging light buds.
function blossom(root: Group, collisions: Collisions, x: number, z: number, size: number, seed: number) {
  const random = randomFrom(seed);
  const foot = heightAt(x, z);
  const tree = new Group();
  tree.position.set(x, foot - .1, z);
  tree.rotation.y = random() * 6.28;
  tree.scale.setScalar(size);
  root.add(tree);
  const bend = [new Vector3(0, 0, 0), new Vector3(.12, .8, .05), new Vector3(-.05, 1.55, .1), new Vector3(.15, 2.1, 0)];
  const widths = [.17, .12, .08, .05];
  for (let i = 1; i < bend.length; i++) branch(tree, bend[i - 1], bend[i], widths[i - 1], widths[i], barkLight);
  const palette = blossoms[seed % blossoms.length];
  const accent = blossoms[(seed + 1) % blossoms.length];
  for (let i = 0; i < 7; i++) {
    const a = i * 2.4 + random() * .5;
    const reach = i === 0 ? 0 : .55 + random() * .45;
    const cx = bend[3].x + Math.cos(a) * reach;
    const cz = bend[3].z + Math.sin(a) * reach;
    const cy = bend[3].y + .1 + (i === 0 ? .35 : random() * .3 - .1);
    if (i) branch(tree, bend[2], new Vector3(cx, cy - .1, cz), .05, .02, barkLight);
    const cloud = solid(tree, lumpy(.5 + random() * .2, 1, seed + i), i % 3 ? palette : accent, cx, cy, cz);
    cloud.scale.y = .7;
    leafCards(tree, blossomCards[(seed + (i % 3 ? 0 : 1)) % blossomCards.length], cloud.position, .6, .38, .6, 5, random);
    if (i && random() > .35) {
      const bud = solid(tree, new IcosahedronGeometry(.055, 0), glowFruit, cx * 1.08, cy - .42, cz * 1.08);
      bud.castShadow = false;
    }
  }
  collisions.add(x, z, size * .4, size * .4, foot - .2, size * 2.5);
}

const blossomTrees = [
  [-12.9, 9.6, .95], [-19.4, 10.9, .85], [-11.4, -4.6, .8], [-19.6, 1.1, .78], [6.9, 15.1, .82], [17.7, 4.2, .74],
] as const;

// Fill the outer ring with firs wherever the meadow is clear of paths, buildings and the pond.
function forest(root: Group, collisions: Collisions, low: boolean) {
  const random = randomFrom(48151);
  let planted = 0;
  const goal = low ? 22 : 38;
  for (let attempt = 0; attempt < 900 && planted < goal; attempt++) {
    const angle = random() * Math.PI * 2;
    const ring = .74 + random() * .17;
    const [x, z] = rimPoint(angle, ring);
    const y = heightAt(x, z);
    // Keep the front of the island (towards the overview camera) open so the paths stay readable.
    if (z > 12.5 && Math.abs(x - 2) < 9) continue;
    if (y < poolLevel + .25 || onTrail(x, z, 1.7) || collisions.solid(x, z, 1.1, y - .5, y + 3)) continue;
    fir(root, collisions, x, z, .8 + random() * .65, 3001 + attempt);
    planted++;
  }
}

const trees = [
  [-21.4, -1.2, 1.22, .75, 1], [-17.1, -7.15, 1.32, .12, 1], [-12.35, -5.4, .94, -1.2, 1],
  [-17.95, 2.62, .83, .68, 1], [-22.2, 5.9, .83, .24, 1],
  [-8.15, -12.3, 1.13, .28, 0], [-.42, -16.85, 1.12, -.43, 0], [-9.65, -14.48, .78, 1.1, 0],
  [4.35, -15.45, 1.29, .12, 0], [8.67, -12.66, .88, 1.68, 0], [16.7, -10.47, 1.01, -.29, 0],
  [19.55, -6.5, 1.03, .52, 0], [22.02, -1.73, .79, -1, 0], [20.45, 5.3, 1.26, .98, 0],
  [18.05, 10.94, 1.12, -.40, 0], [16.43, 13.64, .66, 2.12, 0], [-7.15, 13.7, 1.13, .8, 0],
  [-8.9, 10.6, .86, 1.46, 0], [-3.2, 14.32, .72, 1.24, 0], [-2.75, -6.9, .72, .26, 0],
  [5.9, -.96, .78, -.46, 0], [-10.5, -2.3, .72, .89, 1], [-5.5, -4.75, .73, -.89, 0],
] as const;

function onTrail(x: number, z: number, margin: number) {
  const width = margin * margin;
  return paths.some((points) => points.some((point) => (point.x - x) ** 2 + (point.y - z) ** 2 < width));
}

function scatter(root: Group, collisions: Collisions, low: boolean) {
  const colors = ['#6f7073', '#827263', '#697b77', '#9d8a76', '#51636a'].map((color) => standard(color));
  const shrubs = ['#49694f', '#5d805f', '#798b61'].map((color) => standard(color));
  // Night-blooming flowers glow faintly: periwinkle, amber, rose and pale gold.
  const flowers = [lanternMaterial(0x9fb4ff, .9), lanternMaterial(0xffb36b, .8),
    lanternMaterial(0xff7fbf, .9), lanternMaterial(0xfff0a0, .7)];
  const random = randomFrom(5256);
  for (let i = 0; i < (low ? 290 : 505); i++) {
    const x = (random() - .5) * 56;
    const z = (random() - .5) * 42;
    const y = heightAt(x, z);
    const shore = shoreFraction(x, z);
    if (shore > .995 || y < poolLevel - .12 || collisions.solid(x, z, .15, y, y + .3)) continue;
    const byStone = shore > .82;
    const size = byStone ? .23 + random() ** 2 * .79 : .06 + random() ** 2 * .26;
    if (onTrail(x, z, .89) && size > .12) continue;
    const rock = solid(root, new DodecahedronGeometry(size, 0), colors[i % colors.length], x, y - size * .06, z);
    rock.scale.set(.98 + random() * .52, .35 + random() * .43, .75 + random() * .39);
    rock.rotation.set(.25, random() * 6.28, (random() - .5) * .43);
    if (size > .64) collisions.add(x, z, size * 1.15, size * 1.17, y - .3, size * .75);

    if (shore > .91 || size < .16 || i % 4 !== 0) continue;
    for (let j = 0; j < 4; j++) {
      const plant = solid(root, new IcosahedronGeometry(.2 + random() * .25, 0), shrubs[j % shrubs.length],
        x + (random() - .5) * .85, y + .132, z + (random() - .5) * .62);
      plant.scale.set(1.22, .65 + random() * .3, .78);
    }
  }

  for (const [cx, cz, style] of [[-10.7, 6.35, 0], [-17.8, 4.45, 0], [-2.8, 6.8, 2],
    [3.5, 3.84, 1], [9.77, 10.8, 1], [15.76, 11.53, 3], [-5.4, -9.9, 0], [15.2, -3.56, 1],
    [3.12, 14.72, 3], [-4.88, 11.4, 2]]) {
    for (let i = 0; i < (low ? 14 : 28); i++) {
      const x = cx + (random() - .5) * 2.4;
      const z = cz + (random() - .5) * 1.55;
      const y = heightAt(x, z);
      const h = .19 + random() * .31;
      if (onTrail(x, z, .69) || y < poolLevel || collisions.solid(x, z, .1, y, y + .3)) continue;
      column(root, shrubs[i % 3], .011, .018, h, x, y + h / 2, z, 5);
      const bloom = solid(root, new IcosahedronGeometry(.069 + random() * .045, 0), flowers[style], x, y + h, z);
      bloom.scale.y = .59;
    }
  }

  for (const [x, z] of [[-12.4, 6.9], [-16.7, 5.08], [-19.6, 7.05], [-17.1, 10.55]]) {
    if (heightAt(x, z) < poolLevel - .2) continue;
    for (let i = 0; i < 13; i++) {
      const dx = (random() - .5) * .92;
      const dz = (random() - .5) * .67;
      const h = .21 + random() * .62;
      const reed = column(root, shrubs[i % 3], .012, .023, h,
        x + dx, heightAt(x + dx, z + dz) + h / 2, z + dz, 5);
      reed.rotation.z = dx * .22;
    }
  }
}

function fence(root: Group) {
  const rope = standard('#a68c67');
  for (const [angles, offset] of [[[.565, .64, .715, .79], .895], [[1.881, 1.954, 2.027], .925]] as const) {
    let left: Vector3 | undefined;
    for (const angle of angles) {
      const [x, z] = rimPoint(angle, offset);
      const y = heightAt(x, z);
      column(root, barkLight, .086, .11, 1.04, x, y + .43, z, 7);
      box(root, bark, .235, .145, .235, x, y + .965, z).rotation.y = angle;
      const right = new Vector3(x, y + .73, z);
      if (left) {
        const mid = left.clone().lerp(right, .5);
        mid.y -= .15;
        branch(root, left, mid, .025, .023, rope);
        branch(root, mid, right, .023, .025, rope);
      }
      left = right;
    }
  }
}

export function buildVegetation(root: Group, collisions: Collisions, clock: WorldClock, low: boolean) {
  leafClock = clock;
  trees.forEach(([x, z, scale, yaw, blue], i) => tree(root, collisions, x, z, scale, yaw, 772 + i * 331, Boolean(blue)));
  blossomTrees.forEach(([x, z, scale], i) => {
    const y = heightAt(x, z);
    if (y > poolLevel + .2 && !onTrail(x, z, 1.2) && !collisions.solid(x, z, .9, y - .5, y + 2)) {
      blossom(root, collisions, x, z, scale, 61 + i * 17);
    }
  });
  forest(root, collisions, low);
  scatter(root, collisions, low);
  buildMeadow(root, collisions, clock, low, onTrail);
  fence(root);
  const ridge = [-15.0, -1.02, 10.5];
  ridge.forEach((dx, i) => {
    const [x, z] = i === 0 ? pool : [dx, 15.65];
    const y = heightAt(x, z);
    if (y > poolLevel) box(root, bark, .28, .14, .83, x, y + .04, z).rotation.y = i * .27;
  });
}
