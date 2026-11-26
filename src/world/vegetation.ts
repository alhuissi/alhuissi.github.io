import {
  BufferGeometry, Color, CylinderGeometry, DodecahedronGeometry, DoubleSide, Float32BufferAttribute,
  Group, IcosahedronGeometry, InstancedMesh, MeshStandardMaterial, Object3D, Vector3,
} from 'three';
import type { Material } from 'three';
import { destinations } from '../destinations';
import { box, column, solid, standard } from './geometry';
import { heightAt, pool, poolLevel, randomFrom, rimPoint, shoreFraction } from './land';
import { paths } from './terrain';
import type { Collisions } from './collision';
import type { WorldClock } from './atmosphere';

const bark = standard('#554740');
const barkLight = standard('#74604b');
const needles = ['#345d4f', '#496e55', '#5e7f61', '#4e715f', '#718667'].map((color) => standard(color));
const blueNeedles = ['#375968', '#497280', '#598587', '#587584', '#769092'].map((color) => standard(color));

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
      const mass = solid(tree, new IcosahedronGeometry(1, layer === 0 ? 1 : 0),
        crown[(i + layer + 1) % crown.length], center.x, center.y + .1, center.z);
      mass.scale.set((.84 + random() * .25) * r, (.26 + random() * .13) * r, (.79 + random() * .22) * r);
      mass.rotation.y = i * .94;
      mass.rotation.z = -.16 + random() * .35;
    }
  }
  for (let i = 0; i < 3; i++) {
    const leaf = solid(tree, new IcosahedronGeometry(.56 - i * .09, 1), crown[2 + i], .62 + .139 * i, 3.07 + .20 * i, .14);
    leaf.scale.set(1.22, .57, .92);
  }
  collisions.add(x, z, size * .43, size * .43, foot - .2, size * 1.8);
}

const trees = [
  [-21.4, -1.2, 1.22, .75, 1], [-17.1, -7.15, 1.32, .12, 1], [-12.35, -5.4, .94, -1.2, 1],
  [-17.95, 2.62, .83, .68, 1], [-22.2, 5.9, .83, .24, 1],
  [-8.15, -12.3, 1.13, .28, 0], [-.42, -16.85, 1.12, -.43, 0], [-9.65, -14.48, .78, 1.1, 0],
  [4.35, -15.45, 1.29, .12, 0], [8.67, -12.66, .88, 1.68, 0], [16.7, -10.47, 1.01, -.29, 0],
  [19.55, -6.5, 1.03, .52, 0], [22.02, -1.73, .79, -1, 0], [20.45, 5.3, 1.26, .98, 0],
  [18.05, 10.94, 1.12, -.40, 0], [16.43, 13.64, .66, 2.12, 0], [-7.15, 13.7, 1.13, .8, 0],
  [-8.9, 10.6, .86, 1.46, 0], [-3.2, 14.32, .72, 1.24, 0], [-2.75, -6.9, .72, .26, 0],
  [5.9, -.96, .78, -.46, 0], [-10.5, -2.3, .72, .89, 1], [-5.72, -3.48, .73, -.89, 0],
] as const;

function onTrail(x: number, z: number, margin: number) {
  const width = margin * margin;
  return paths.some((points) => points.some((point) => (point.x - x) ** 2 + (point.y - z) ** 2 < width));
}

function grass(root: Group, collisions: Collisions, clock: WorldClock, low: boolean) {
  const random = randomFrom(9270);
  const count = low ? 1200 : 2860;
  const positions: number[] = [];
  const colors: number[] = [];
  const bladeCount = low ? 4 : 6;
  for (let i = 0; i < bladeCount; i++) {
    const angle = random() * Math.PI * 2;
    const dx = Math.cos(angle);
    const dz = Math.sin(angle);
    const h = .18 + random() * .36;
    const width = .022 + random() * .015;
    const bx = (random() - .5) * .28;
    const bz = (random() - .5) * .25;
    const bend = h * (.16 + random() * .38);
    const point = (s: number, v: number) => [
      bx + dx * bend * v * v + dz * s * width * (1 - v),
      h * v,
      bz + dz * bend * v * v - dx * s * width * (1 - v),
    ];
    const lo = point(-1, 0);
    const ro = point(1, 0);
    const lm = point(-1, .47);
    const rm = point(1, .47);
    const tip = point(0, 1);
    for (const p of [lo, ro, lm, ro, rm, lm, lm, rm, tip]) {
      positions.push(...p);
      const value = .44 + p[1] * 1.02;
      colors.push(value * 1.06, value, value * .87);
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  const material = new MeshStandardMaterial({ side: DoubleSide, vertexColors: true, roughness: 1 });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.winds = clock;
    shader.vertexShader = 'uniform float winds;\n' + shader.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      float breeze = sin(winds * 1.55 + instanceMatrix[3].x * .37 + instanceMatrix[3].z * .52);
      transformed.x += (breeze * .17 + .04) * position.y;
      transformed.z += breeze * .085 * position.y;
    `);
  };
  material.customProgramCacheKey = () => 'meadow-wind';
  const stands = new InstancedMesh(geometry, material, count);
  stands.receiveShadow = true;
  const plant = new Object3D();
  const tint = new Color();
  let planted = 0;
  for (let attempt = 0; planted < count && attempt < count * 5; attempt++) {
    const x = (random() - .5) * 55;
    const z = (random() - .5) * 42;
    const y = heightAt(x, z);
    if (shoreFraction(x, z) > .967 || y < poolLevel + .03 || onTrail(x, z, .9)
      || collisions.solid(x, z, .2, y, y + .5)) continue;
    const cover = .48 + .24 * Math.sin(x * .71 - z * .82) + .21 * Math.cos(z * .63 + x * .18);
    if (random() > cover) continue;
    plant.position.set(x, y - .018, z);
    plant.rotation.y = random() * 6.28;
    plant.scale.set(.71 + random() * .69, .52 + random() * 1.06, .71 + random() * .65);
    plant.updateMatrix();
    tint.setHSL(.146 + random() * .12, .12 + random() * .20, .33 + random() * .19);
    stands.setMatrixAt(planted, plant.matrix);
    stands.setColorAt(planted, tint);
    planted++;
  }
  stands.count = planted;
  root.add(stands);
}

function scatter(root: Group, collisions: Collisions, low: boolean) {
  const colors = ['#6f7073', '#827263', '#697b77', '#9d8a76', '#51636a'].map((color) => standard(color));
  const shrubs = ['#49694f', '#5d805f', '#798b61'].map((color) => standard(color));
  const flowers = [standard('#b7a9c4'), standard('#dfa96c'), standard('#a66c80'), standard('#dccb8f')];
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
  const [x, z] = destinations.workshop.approach;
  const y = heightAt(x + 1.7, z + .25);
  box(root, bark, 1.19, .11, .36, x + 1.7, y + .45, z + .25).rotation.y = -.25;
  for (const px of [x + 1.25, x + 2.13]) {
    box(root, barkLight, .12, .46, .26, px, y + .21, z + .25);
  }
}

export function buildVegetation(root: Group, collisions: Collisions, clock: WorldClock, low: boolean) {
  trees.forEach(([x, z, scale, yaw, blue], i) => tree(root, collisions, x, z, scale, yaw, 772 + i * 331, Boolean(blue)));
  scatter(root, collisions, low);
  grass(root, collisions, clock, low);
  fence(root);
  const ridge = [-15.0, -1.02, 10.5];
  ridge.forEach((dx, i) => {
    const [x, z] = i === 0 ? pool : [dx, 15.65];
    const y = heightAt(x, z);
    if (y > poolLevel) box(root, bark, .28, .14, .83, x, y + .04, z).rotation.y = i * .27;
  });
}
