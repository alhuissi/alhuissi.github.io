import {
  CanvasTexture, CapsuleGeometry, DoubleSide, DodecahedronGeometry, ExtrudeGeometry, Group,
  LatheGeometry, Mesh, MeshBasicMaterial, PlaneGeometry, Shape, ShapeGeometry,
  SphereGeometry, SRGBColorSpace, TorusGeometry, Vector2, Vector3,
} from 'three';
import type { Material, Object3D } from 'three';
import { destinations } from '../destinations';
import type { DestinationId } from '../destinations';
import { box, column, lanternMaterial, solid, standard, volume } from './geometry';
import { heightAt, randomFrom } from './land';
import { portalSurface } from './atmosphere';
import type { WorldClock } from './atmosphere';
import type { Collisions } from './collision';

const slate = standard('#374b54');
const shadowWood = standard('#4c3435');
const timber = standard('#775342');
const sandstone = standard('#c6a580');
const lime = standard('#edd0a9');
const darkMetal = standard('#3f444b', .59, .3);
const copper = standard('#b27656', .49, .24);
const brass = standard('#d9aa67', .5, .15);
const warmGlass = lanternMaterial(0xe99a45, .67);
const softGlass = lanternMaterial(0xffc478, .76);

function lodge(root: Group, id: DestinationId, yaw: number) {
  const [x, z] = destinations[id].landmark;
  const a = new Group();
  a.position.set(x, heightAt(x, z), z);
  a.rotation.y = yaw;
  root.add(a);
  return a;
}

function beam(parent: Object3D, material: Material, start: Vector3, end: Vector3, width: number, depth = width) {
  const delta = end.clone().sub(start);
  const middle = start.clone().lerp(end, .5);
  const member = box(parent, material, width, delta.length(), depth, middle.x, middle.y, middle.z);
  member.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), delta.normalize());
}

function archShape(half: number, height: number) {
  const spring = height - half;
  return new Shape()
    .moveTo(-half, 0).lineTo(half, 0).lineTo(half, spring)
    .quadraticCurveTo(half, height, 0, height)
    .quadraticCurveTo(-half, height, -half, spring).lineTo(-half, 0);
}

function archPanel(parent: Object3D, material: Material, x: number, y: number, z: number, half: number, height: number) {
  return solid(parent, new ShapeGeometry(archShape(half, height), 12), material, x, y, z);
}

function window(parent: Object3D, x: number, y: number, z: number, width: number, height: number) {
  archPanel(parent, shadowWood, x, y - .05, z, width * .57, height + .11);
  archPanel(parent, warmGlass, x, y, z + .018, width * .43, height);
  box(parent, timber, width * 1.26, .108, .24, x, y - .045, z + .056);
  box(parent, shadowWood, .06, height * .87, .044, x, y + height * .43, z + .047);
  box(parent, shadowWood, width * .93, .05, .044, x, y + height * .48, z + .047);
}

function tiledRoof(parent: Object3D, x: number, y: number, z: number, halfWidth: number,
  rise: number, depth: number, tiles: Material[]) {
  volume(parent, shadowWood, [[-halfWidth, 0], [0, rise], [halfWidth, 0]], depth - .32, x, y - .07, z);
  const slant = Math.atan2(rise, halfWidth);
  const run = Math.hypot(halfWidth, rise);
  const rows = Math.ceil(run / .45);
  const cols = Math.ceil(depth / .61);
  for (const side of [-1, 1]) {
    for (let row = 0; row < rows; row++) {
      const t = (row + .42) / rows;
      for (let col = 0; col < cols; col++) {
        const wide = (col + .5 + (row % 2) * .12) / cols;
        const tile = box(parent, tiles[(row * 13 + col * 5 + side + tiles.length) % tiles.length],
          run / rows * 1.16, .115, depth / cols * 1.02,
          x + side * t * halfWidth, y + rise * (1 - t), z + (wide - .5) * depth);
        tile.rotation.z = -side * slant;
      }
    }
    for (const dz of [-depth / 2, depth / 2]) {
      beam(parent, shadowWood, new Vector3(x, y + rise + .035, z + dz),
        new Vector3(x + halfWidth * side, y - .05, z + dz), .16, .19);
    }
  }
  box(parent, tiles[0], .24, .15, depth + .12, x, y + rise + .08, z);
}

function frontMasonry(parent: Group, depth: number, length: number, minHeight: number, x: number, z: number) {
  const random = randomFrom(1881);
  const stones = [lime, sandstone, standard('#ad8f74')];
  for (let i = 0; i < 37; i++) {
    const row = Math.floor(i / 8);
    const side = (i % 8 + (row % 2) * .43) / 8 - .5;
    const px = x + side * length + (random() - .5) * .24;
    const py = minHeight + row * .36 + random() * .13;
    if (Math.abs(px + .4) < 1.03 && py > .26) continue;
    box(parent, stones[i % 3], .29 + random() * .34, .10 + random() * .076, .075, px, py, z + depth / 2);
  }
}

function workshop(root: Group, collisions: Collisions) {
  const yaw = -.08;
  const home = lodge(root, 'workshop', yaw);
  const [x, y, z] = home.position;
  const mortared = standard('#bea087');
  const plaster = standard('#c7a782');
  const blueWood = standard('#5b6f6d');
  const mainTiles = [standard('#a55e50'), standard('#ac6652'), standard('#955153'), standard('#bf775c')];
  const wingTiles = [slate, standard('#4e6269'), standard('#547475'), standard('#455760')];

  box(home, shadowWood, 7.85, .47, 5.95, 0, .04, 0);
  box(home, mortared, 5.38, 3.68, 4.75, -.65, 1.87, -.22);
  box(home, plaster, 2.75, 2.53, 4.42, 2.75, 1.2, .21);
  box(home, sandstone, .74, 4.04, .77, 1.19, 3.72, -.92);
  box(home, timber, .94, .27, .98, 1.19, 5.77, -.92);
  box(home, shadowWood, .78, .16, .81, 1.19, 5.98, -.92);
  for (let i = 0; i < 5; i++) {
    box(home, lime, .79, .078, .81, 1.19, 4.32 + i * .285, -.92);
  }

  tiledRoof(home, -.65, 3.71, -.21, 3.08, 2.66, 5.64, mainTiles);
  tiledRoof(home, 2.75, 2.47, .21, 1.7, 1.75, 5.03, wingTiles);
  for (const x of [-3.33, 2.04, 4.12]) {
    box(home, timber, .17, x === 4.12 ? 2.59 : 3.6, .17, x, x === 4.12 ? 1.29 : 1.8, 2.19);
  }
  frontMasonry(home, 4.75, 5.1, .18, -.68, -.22);
  for (const px of [-2.24, 1.04]) window(home, px, 1.54, 2.17, .85, 1.3);
  for (const px of [2.46, 3.47]) window(home, px, 1.05, 2.45, .62, 1.04);
  const rear = new Group();
  rear.rotation.y = Math.PI;
  home.add(rear);
  for (const px of [-1.04, 2.24]) window(rear, px, 1.43, 2.604, .85, 1.2);

  const round = column(home, timber, .55, .55, .102, -.65, 4.28, 2.427, 20);
  round.rotation.x = Math.PI / 2;
  const ember = column(home, softGlass, .401, .401, .106, -.65, 4.28, 2.487, 20);
  ember.rotation.x = Math.PI / 2;
  box(home, shadowWood, .075, .86, .08, -.65, 4.28, 2.55);
  box(home, shadowWood, .86, .075, .08, -.65, 4.28, 2.55);

  archPanel(home, shadowWood, -.65, .23, 2.19, .9, 2.36);
  archPanel(home, blueWood, -.65, .25, 2.23, .68, 2.16);
  archPanel(home, softGlass, -.65, 1.62, 2.245, .25, .49);
  for (const offset of [-.45, -.24, .22, .43]) {
    box(home, shadowWood, .022, 1.54, .026, -.65 + offset, 1.02, 2.247);
  }
  box(home, brass, .091, .11, .06, -.25, 1.02, 2.28);
  box(home, lime, 2.37, .18, .91, -.65, .13, 2.66);
  box(home, sandstone, 2.76, .14, .56, -.65, -.005, 3.23);

  for (const px of [-2, .69]) {
    box(home, timber, .15, 2.55, .16, px, 1.27, 3.3);
    box(home, shadowWood, .29, .13, .29, px, .17, 3.3);
    beam(home, timber, new Vector3(px, 1.86, 3.3), new Vector3(px, 2.37, 2.71), .13);
    box(home, softGlass, .21, .3, .21, px, 2.06, 3.41);
    box(home, darkMetal, .28, .072, .28, px, 2.26, 3.41);
  }
  tiledRoof(home, -.65, 2.59, 2.84, 1.54, .61, 1.58, wingTiles);

  // The bench and the instrument sit between the front door and the launchpad trail.
  box(home, timber, 2.15, .17, .82, 3.08, .89, 3.16);
  for (const px of [2.26, 3.90]) box(home, shadowWood, .18, .87, .63, px, .43, 3.16);
  box(home, blueWood, .61, .29, .38, 3.45, 1.12, 3.12);
  box(home, brass, .16, .068, .08, 3.45, 1.29, 3.12);
  const instrument = new Group();
  instrument.position.set(1.96, .13, 3.67);
  instrument.rotation.z = -.23;
  instrument.rotation.x = -.12;
  home.add(instrument);
  volume(instrument, copper, [[-.24, .18], [-.34, .34], [-.22, .52], [-.23, .72], [0, .82],
    [.24, .72], [.17, .55], [.32, .32], [.21, .17], [0, .13]], .11, 0, 0, 0, .028);
  box(instrument, shadowWood, .11, .83, .11, 0, .89, .076);
  box(instrument, brass, .17, .18, .096, 0, 1.36, .077);
  const soundHole = column(instrument, shadowWood, .095, .095, .013, 0, .53, .09, 14);
  soundHole.rotation.x = Math.PI / 2;
  for (const px of [-.027, 0, .027]) box(instrument, lime, .01, .89, .012, px, .81, .143);
  for (let i = 0; i < 3; i++) {
    column(home, timber, .38, .28, .58 + i * .15, -3.5 - i * .37, .28, 1.6 - i * .14, 9);
    column(home, brass, .39, .315, .07, -3.5 - i * .37, .16, 1.6 - i * .14, 9);
  }

  collisions.add(x - .38, z, 8.05, 5.45, y - .7, 7.1, yaw);
}

function dreamGateway(root: Group, clock: WorldClock, collisions: Collisions) {
  const yaw = .29;
  const gate = lodge(root, 'dream-ocean', yaw);
  const [x, y, z] = gate.position;
  const stone = [standard('#606f81'), standard('#7a8499'), standard('#8b9ba6'), standard('#707787')];
  const dark = standard('#3b586a');
  const silver = standard('#a1b4c3');
  const shard = lanternMaterial(0x98d8f0, .45);

  const altar = column(gate, dark, 2.97, 3.3, .33, 0, -.06, .03, 12);
  altar.scale.z = .59;
  const threshold = column(gate, stone[1], 2.53, 2.86, .20, 0, .20, .16, 14);
  threshold.scale.z = .55;
  const brink = box(gate, silver, 3.15, .16, 1.25, 0, .14, 1.13);
  brink.rotation.y = -.03;

  const span = 1.61;
  const spring = 2.61;
  const rise = 2.2;
  const opening = new Shape()
    .moveTo(-span, .25).lineTo(span, .25).lineTo(span, spring)
    .quadraticCurveTo(span, spring + 1.2, 0, spring + rise)
    .quadraticCurveTo(-span, spring + 1.2, -span, spring).closePath();
  const view = new Mesh(new ShapeGeometry(opening, 36), portalSurface(clock));
  view.material.side = DoubleSide;
  view.position.z = .17;
  gate.add(view);

  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const blockWidth = .84 - .044 * i;
      const block = box(gate, stone[(i + 1) % stone.length], blockWidth, .58, .94 - i * .057,
        side * (span + blockWidth / 2 - .04), .49 + i * .61, .03);
      block.rotation.z = (i % 2 - .5) * .035;
      box(gate, silver, .036, .45, .05, side * 1.72, .51 + i * .61, .55 - i * .025);
    }
  }
  const curve = (t: number, outer: number): [number, number] => {
    const side = Math.sign(1 - t * 2);
    const u = 1 - Math.abs(1 - t * 2);
    return [side * ((1 - u * u) * (span + outer)), spring + (2.4 * u - .2 * u * u) * (1 + outer * .44)];
  };
  for (let i = 0; i < 15; i++) {
    const from = (i + .031) / 15;
    const to = (i + .969) / 15;
    const keystone = i === 7;
    const outline = [curve(from, -.075), curve(to, -.075), curve(to, keystone ? .73 : .61), curve(from, keystone ? .73 : .61)];
    volume(gate, stone[i % stone.length], outline, keystone ? .91 : .7, 0, 0, 0, .035);
    if (i % 2 === 0) {
      const [px, py] = curve((from + to) / 2, .18);
      const glyph = box(gate, shard, .044, .18, .02, px, py, keystone ? .491 : .394);
      glyph.rotation.z = (i - 7) * -.11;
    }
  }

  for (const [dx, dz, scale, lean] of [[-3.62, -.68, 1, -.24], [3.18, -.63, .84, .29], [-4.2, 1.23, .61, -.3],
    [3.72, 1.0, .45, .32], [1.56, -2.95, .57, -.21]]) {
    const monolith = solid(gate, new DodecahedronGeometry(1, 0), stone[Math.round(scale * 3)], dx, 1.22 * scale, dz);
    monolith.scale.set(.66 * scale, 2.33 * scale, .61 * scale);
    monolith.rotation.z = lean;
    monolith.rotation.y = dz;
    const chip = solid(gate, new DodecahedronGeometry(.21, 0), shard, dx, .7 * scale, dz + .42 * scale);
    chip.scale.set(.34, 1.9, .49);
  }
  for (const dx of [-2.85, 2.82]) {
    column(gate, dark, .24, .32, .62, dx, .32, 1.6, 7);
    solid(gate, new DodecahedronGeometry(.21, 0), shard, dx, .76, 1.6).scale.y = 1.35;
  }
  collisions.add(x, z, 5.4, 1.75, y - .5, 5.65, yaw);
}

function spacecraft(parent: Group) {
  const craft = new Group();
  craft.position.set(.15, 1.18, -.35);
  craft.rotation.y = -.77;
  craft.scale.setScalar(1.15);
  parent.add(craft);
  const enamel = standard('#eee6ce', .36, .13);
  const underside = standard('#616b71', .41, .28);
  const highVisibility = standard('#ca6744', .42, .14);
  const canopy = standard('#253f57', .23, .41);
  const pane = standard('#668d9b', .24, .2);

  const profile = [[.01, -1.81], [.52, -1.72], [.73, -1.35], [.83, -.76], [.83, .18], [.65, .85],
    [.44, 1.35], [.23, 1.66], [.01, 1.82]].map(([radius, length]) => new Vector2(radius, length));
  const fuselage = solid(craft, new LatheGeometry(profile, 26), enamel);
  fuselage.rotation.x = Math.PI / 2;
  fuselage.scale.z = .78;
  const spine = solid(craft, new SphereGeometry(1, 22, 11), underside, 0, -.1, -.21);
  spine.scale.set(.70, .61, 1.49);
  const windscreen = solid(craft, new SphereGeometry(1, 25, 13), canopy, 0, .49, .43);
  windscreen.scale.set(.63, .45, .91);
  const reflection = solid(craft, new SphereGeometry(1, 18, 9), pane, -.195, .714, .68);
  reflection.scale.set(.29, .16, .46);
  reflection.rotation.z = -.37;
  const collar = solid(craft, new TorusGeometry(.72, .086, 6, 28), highVisibility, 0, 0, -.99);
  collar.scale.y = .79;
  const cockpitBand = solid(craft, new TorusGeometry(.6, .032, 6, 25), enamel, 0, .42, .41);
  cockpitBand.rotation.y = Math.PI / 2;
  cockpitBand.scale.set(.74, .84, .77);

  for (const side of [-1, 1]) {
    const wing = volume(craft, enamel, [[side * .5, -.66], [side * 1.59, .78], [side * 1.52, 1.29],
      [side * .56, .97]], .16, 0, -.32, 0, .025);
    wing.rotation.x = -Math.PI / 2;
    const fin = volume(craft, highVisibility, [[side * 1.29, .61], [side * 1.62, .8], [side * 1.53, 1.29],
      [side * 1.26, 1.19]], .163, 0, -.32, 0, .014);
    fin.rotation.x = -Math.PI / 2;
    const tank = solid(craft, new CapsuleGeometry(.24, .91, 5, 12), underside, side * 1.01, -.19, -.85);
    tank.rotation.x = Math.PI / 2;
    const thruster = column(craft, darkMetal, .22, .29, .21, side * 1.01, -.19, -1.48, 14);
    thruster.rotation.x = Math.PI / 2;
    beam(craft, underside, new Vector3(side * .55, -.31, .39), new Vector3(side * .77, -.80, .60), .11);
    box(craft, darkMetal, .32, .12, .58, side * .77, -.81, .60);
    solid(craft, new SphereGeometry(.076, 8, 6), side === 1 ? warmGlass : softGlass, side * 1.57, -.31, -.72);
  }
  volume(craft, enamel, [[0, .12], [.34, .92], [1.0, 1.38], [1.37, .16]], .075,
    0, .31, -.19, .022).rotation.y = Math.PI / 2;
  box(craft, darkMetal, .49, .11, .55, 0, -.79, -1.23);
}

function launchpad(root: Group, collisions: Collisions) {
  const pad = lodge(root, 'pocket-orbit', .15);
  const [x, y, z] = pad.position;
  const concrete = standard('#8c857d');
  const plating = standard('#646b6b');
  const hazard = standard('#c78d50');
  column(pad, sandstone, 3.38, 3.68, .52, 0, -.30, 0, 12);
  column(pad, slate, 3.31, 3.51, .25, 0, -.01, 0, 12);
  column(pad, concrete, 3.19, 3.33, .13, 0, .162, 0, 12);
  column(pad, plating, 2.85, 2.85, .03, 0, .237, 0, 30);
  const marking = solid(pad, new TorusGeometry(2.42, .035, 4, 64), lime, 0, .26, 0);
  marking.rotation.x = -Math.PI / 2;
  for (let i = 0; i < 12; i++) {
    const angle = i * Math.PI / 6;
    const px = Math.cos(angle) * 3.07;
    const pz = Math.sin(angle) * 3.07;
    const light = box(pad, i % 3 === 0 ? softGlass : hazard, .25, .074, .14, px, .247, pz);
    light.rotation.y = -angle;
  }
  box(pad, sandstone, 1.69, .22, .73, -.08, .04, 3.45);
  for (const px of [-2.56, 2.56]) {
    column(pad, darkMetal, .095, .14, 1.42, px, .68, -2.12);
    column(pad, softGlass, .15, .15, .20, px, 1.43, -2.12, 11);
    column(pad, brass, .16, .18, .07, px, 1.57, -2.12);
  }
  for (const dz of [-1.9, -.91, 1.93]) {
    box(pad, darkMetal, .56, .41, .73, -3.54, .04, dz);
    box(pad, copper, .58, .10, .75, -3.54, .28, dz);
    box(pad, slate, .26, .162, .022, -3.54, .10, dz + .37);
  }
  spacecraft(pad);
  collisions.add(x, z, 5.3, 5.25, y - .42, 3.4, .15);
}

function canopyRoof(parent: Group, y: number, half: number, depth: number, rise: number, roof: Material) {
  const profile = (x: number) => rise * (1 - Math.abs(x / half)) ** 1.55 + Math.abs(x / half) ** 11 * .24;
  const outline: [number, number][] = [];
  for (let i = 0; i <= 20; i++) {
    const x = -half + i * half / 10;
    outline.push([x, profile(x)]);
  }
  for (let i = 20; i >= 0; i--) {
    const x = -half + i * half / 10;
    outline.push([x, profile(x) - .17]);
  }
  volume(parent, roof, outline, depth, 0, y, 0, .015);
  for (let i = 0; i <= 22; i++) {
    const x = -half + i * half / 11;
    const cap = column(parent, i % 3 === 0 ? copper : roof, .06, .06, depth + .05,
      x, y + profile(x) + .02, 0, 7);
    cap.rotation.x = Math.PI / 2;
  }
  for (const z of [-depth / 2 - .012, depth / 2 + .012]) {
    for (let i = 0; i < 14; i++) {
      const a = -half + i * half / 7;
      const b = a + half / 7;
      beam(parent, brass, new Vector3(a, y + profile(a) - .043, z), new Vector3(b, y + profile(b) - .043, z), .075);
    }
  }
}

function arcadeSign() {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 105;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#2c4345';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#f1bc70';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
  ctx.fillStyle = '#ffe0a2';
  ctx.font = '800 49px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('HANZIZAP', canvas.width / 2, canvas.height / 2 + 2, canvas.width - 54);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return new MeshBasicMaterial({ map: texture, toneMapped: false });
}

function cabinet(parent: Group, x: number, trim: Material) {
  const game = new Group();
  game.position.set(x, .20, .55);
  parent.add(game);
  const outline: [number, number][] = [[-.61, 0], [.63, 0], [.63, .92], [.34, 1.26], [.39, 1.98],
    [.12, 2.19], [-.61, 2.19]];
  volume(game, trim, outline, .94, 0, 0, 0, .042).rotation.y = -Math.PI / 2;
  box(game, slate, .89, .83, .078, 0, 1.59, .348).rotation.x = -.09;
  box(game, lanternMaterial(0x94d2d0, .36), .73, .57, .025, 0, 1.61, .402).rotation.x = -.09;
  const screen = new Group();
  screen.position.set(0, 1.61, .436);
  game.add(screen);
  for (let i = 0; i < 4; i++) {
    box(screen, trim, .116, .106, .012, (i % 2 - .5) * .18, (Math.floor(i / 2) - .5) * .15, 0);
  }
  box(game, copper, .99, .14, .46, 0, 1.06, .45);
  column(game, darkMetal, .039, .041, .14, -.28, 1.19, .49, 10);
  solid(game, new SphereGeometry(.071, 10, 7), warmGlass, -.28, 1.28, .49);
  for (const px of [.08, .23]) column(game, brass, .06, .052, .048, px, 1.16, .50, 10);
  box(game, lime, .69, .16, .036, 0, 2.01, .388);
}

function arcade(root: Group, collisions: Collisions) {
  const yaw = -.17;
  const hall = lodge(root, 'hanzizap', yaw);
  const [x, y, z] = hall.position;
  const lacquer = standard('#a75f4a');
  const jade = standard('#426564');
  const yellow = standard('#d9a34f');
  box(hall, sandstone, 5.57, .37, 3.9, 0, -.07, .17);
  box(hall, timber, 5.44, .12, 3.8, 0, .145, .17);
  box(hall, lacquer, 4.8, 2.57, .24, 0, 1.36, -1.39);
  for (const px of [-2.23, 2.23]) {
    for (const pz of [-1.31, 1.39]) {
      column(hall, lacquer, .115, .15, 2.95, px, 1.53, pz);
      column(hall, darkMetal, .19, .21, .21, px, .22, pz);
      column(hall, brass, .155, .156, .15, px, 2.67, pz);
    }
    box(hall, jade, .119, 1.43, 2.81, px, .85, 0);
    for (let i = 0; i < 6; i++) box(hall, yellow, .037, .94, .089, px + Math.sign(px) * .074, .91, -1.13 + i * .448);
  }
  for (const pz of [-1.42, 1.42]) box(hall, timber, 5.11, .24, .23, 0, 2.88, pz);
  canopyRoof(hall, 3.08, 2.99, 3.89, .99, jade);
  box(hall, jade, 2.82, .57, 1.98, 0, 3.96, 0);
  box(hall, timber, 2.96, .105, 2.04, 0, 4.21, 0);
  for (let i = 0; i < 9; i++) box(hall, brass, .045, .30, .034, (i - 4) * .265, 3.99, 1.005);
  canopyRoof(hall, 3.97, 1.88, 2.64, .61, jade);
  box(hall, brass, .19, .17, 2.7, 0, 4.64, 0);
  const sign = new Mesh(new PlaneGeometry(2.66, .73), arcadeSign());
  sign.position.set(0, 2.53, 1.57);
  hall.add(sign);
  box(hall, shadowWood, 2.77, .82, .13, 0, 2.53, 1.49);

  for (const px of [-1.95, 1.95]) {
    const lantern = solid(hall, new SphereGeometry(.222, 12, 9), softGlass, px, 2.49, 1.72);
    lantern.scale.y = 1.19;
    column(hall, copper, .18, .16, .08, px, 2.76, 1.72);
    column(hall, copper, .15, .18, .08, px, 2.22, 1.72);
    box(hall, lacquer, .031, .15, .031, px, 2.12, 1.72);
  }
  cabinet(hall, -.93, yellow);
  cabinet(hall, .76, lacquer);
  const mat = box(hall, lacquer, 3.5, .037, .61, 0, .071, 2.01);
  mat.rotation.y = .022;
  for (const px of [-1.58, 1.58]) {
    box(hall, brass, .042, .04, .52, px, .085, 2.01);
  }
  collisions.add(x, z, 5.13, 3.63, y - .42, 4.8, yaw);
}

function observatory(root: Group, collisions: Collisions) {
  const yaw = .34;
  const scope = lodge(root, 'observatory', yaw);
  const [x, y, z] = scope.position;
  const patina = [standard('#64928d', .48, .25), standard('#588682', .45, .26), standard('#7a9e92', .45, .25)];
  const wall = standard('#c2b3a2');
  column(scope, darkMetal, 2.1, 2.37, .35, 0, .04, 0, 12);
  column(scope, wall, 1.84, 1.95, 2.78, 0, 1.45, 0, 15);
  column(scope, lime, 1.98, 1.91, .21, 0, 2.81, 0, 15);
  column(scope, slate, 2.02, 1.997, .29, 0, 3.058, 0, 16);
  for (let i = 0; i < 12; i++) {
    const section = new SphereGeometry(1.98, 6, 11, i * Math.PI / 6, Math.PI / 6, 0, Math.PI / 2);
    const panel = solid(scope, section, patina[i % 3], 0, 3.18, 0);
    panel.scale.y = .83;
    const seam = solid(scope, new TorusGeometry(1.975, .028, 5, 22, Math.PI / 2), copper, 0, 3.19, 0);
    seam.rotation.y = i * Math.PI / 6;
    seam.scale.y = .83;
  }
  const railing = solid(scope, new TorusGeometry(2.11, .062, 6, 40), brass, 0, 3.04, 0);
  railing.rotation.x = Math.PI / 2;
  const doorFrame = new ExtrudeGeometry(archShape(.59, 1.75), {
    depth: .26, bevelEnabled: true, bevelSize: .035, bevelThickness: .034, bevelSegments: 1, curveSegments: 12,
  });
  solid(scope, doorFrame, shadowWood, 0, .16, 1.76);
  archPanel(scope, slate, 0, .204, 2.055, .47, 1.58);
  for (const px of [-.24, 0, .24]) box(scope, shadowWood, .025, 1.17, .032, px, .81, 2.063);
  box(scope, brass, .08, .11, .056, .27, .75, 2.082);
  for (const side of [-1, 1]) {
    const niche = new Group();
    niche.rotation.y = side * .78;
    scope.add(niche);
    window(niche, 0, 1.27, 1.86, .47, 1.04);
  }

  const telescope = new Group();
  telescope.position.set(.56, 4.32, .23);
  telescope.rotation.z = -.85;
  telescope.rotation.x = .26;
  scope.add(telescope);
  column(telescope, slate, .48, .39, 2.23, 0, .82, 0, 18);
  column(telescope, copper, .58, .52, .24, 0, 2.04, 0, 18);
  column(telescope, standard('#a4c8c8', .23, .41), .442, .452, .041, 0, 2.17, 0, 18);
  column(telescope, brass, .47, .49, .12, 0, 1.58, 0, 18);
  column(telescope, brass, .44, .44, .10, 0, .19, 0, 16);
  column(telescope, slate, .17, .15, .56, 0, -.51, 0, 12);
  box(scope, sandstone, 1.2, .26, .76, 0, .10, 2.07).rotation.x = -.13;
  box(scope, sandstone, 1.32, .19, .65, 0, -.07, 2.56).rotation.x = -.20;
  collisions.add(x, z, 3.57, 3.63, y - .61, 5.3, yaw);
}

export function buildLandmarks(root: Group, collisions: Collisions, clock: WorldClock) {
  workshop(root, collisions);
  dreamGateway(root, clock, collisions);
  launchpad(root, collisions);
  arcade(root, collisions);
  observatory(root, collisions);
}

export function guideLights(root: Group) {
  const post = standard('#56514b');
  const glass = lanternMaterial(0xffc672, .78);
  const locations = [[2.9, 17.6], [.25, 14.7], [2.45, 10.7], [-1.4, 8.35], [-4.88, 5.6], [-8.52, 3.55],
    [-12.32, 2.31], [6.28, 5.4], [9.2, 2.73], [11.55, -.85], [7.3, 11.5], [10.1, 14.65], [-7.98, -.65],
    [-8.35, -5.9], [-6.55, -9.09]];
  const random = randomFrom(71893);
  for (const [x, z] of locations) {
    const y = heightAt(x, z);
    const top = .64 + random() * .22;
    column(root, post, .055, .08, top, x, y + top * .5, z, 7);
    column(root, post, .12, .10, .13, x, y + .06, z, 7);
    column(root, glass, .081, .11, .19, x, y + top, z, 8);
    column(root, post, .041, .15, .107, x, y + top + .102, z, 8);
    const heater = box(root, post, .19, .041, .19, x, y + top - .088, z);
    heater.rotation.y = Math.PI / 4;
  }
}
