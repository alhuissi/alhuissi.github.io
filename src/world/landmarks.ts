import {
  DodecahedronGeometry, ExtrudeGeometry, Group, Mesh, Shape, ShapeGeometry,
  SphereGeometry, TorusGeometry, Vector3,
} from 'three';
import type { Material, Object3D } from 'three';
import { destinations } from '../destinations';
import type { DestinationId } from '../destinations';
import { box, column, lanternMaterial, solid, standard, volume } from './geometry';
import { heightAt, randomFrom } from './land';
import { portalSurface } from './atmosphere';
import type { WorldClock } from './atmosphere';
import type { Collisions } from './collision';
import { buildWorkshop } from './workshop';

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

function dreamGateway(root: Group, clock: WorldClock, collisions: Collisions, onReady: () => void) {
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
  const view = new Mesh(new ShapeGeometry(opening, 36), portalSurface(clock, onReady));
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

function launchpad(root: Group, collisions: Collisions, onReady: () => void) {
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
  void import('./pocketOrbitShuttle').then(({ addPocketOrbitShuttle }) => addPocketOrbitShuttle(pad, onReady));
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
  box(hall, shadowWood, 2.77, .28, .13, 0, 2.66, 1.49);
  box(hall, brass, 2.46, .055, .05, 0, 2.66, 1.58);

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

export function buildLandmarks(root: Group, collisions: Collisions, clock: WorldClock, onReady: () => void) {
  const updateWorkshop = buildWorkshop(root, collisions, clock);
  dreamGateway(root, clock, collisions, onReady);
  launchpad(root, collisions, onReady);
  arcade(root, collisions);
  observatory(root, collisions);
  return updateWorkshop;
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
