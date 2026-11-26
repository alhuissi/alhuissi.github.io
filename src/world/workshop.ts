import {
  AdditiveBlending, CanvasTexture, DoubleSide, ExtrudeGeometry, Group, Mesh,
  MeshBasicMaterial, PlaneGeometry, Shape, SRGBColorSpace, TorusGeometry, Vector3,
} from 'three';
import { destinations } from '../destinations';
import type { WorldClock } from './atmosphere';
import type { Collisions } from './collision';
import { box, column, lanternMaterial, solid, standard, volume } from './geometry';
import { heightAt } from './land';

const graphite = standard('#25384b', .64, .22);
const steel = standard('#49586c', .56, .24);
const enamel = standard('#557c88', .54, .15);
const recess = standard('#131c2b', .79);
const alloy = standard('#b47b57', .54, .26);
const cyan = new MeshBasicMaterial({ color: '#6aefeb', toneMapped: false });
const amber = lanternMaterial(0xffad61, 1.1);
const rose = new MeshBasicMaterial({ color: '#f589bc', toneMapped: false });
const logoTeal = '#13cbb7';
// Convert the artwork in alhuissi-mark.svg to a centered, upright Three.js shape.
const logoPoint = (x: number, y: number) => [(x - 497) / 436, (502 - y) / 436] as const;
const logoOutline = new Shape()
  .moveTo(...logoPoint(487, 114)).quadraticCurveTo(...logoPoint(498, 105), ...logoPoint(510, 114))
  .lineTo(...logoPoint(715, 293)).lineTo(...logoPoint(715, 724)).lineTo(...logoPoint(510, 890))
  .quadraticCurveTo(...logoPoint(498, 900), ...logoPoint(486, 890))
  .lineTo(...logoPoint(279, 724)).lineTo(...logoPoint(279, 293)).closePath();

const rotorX = 1.85;
const rotorZ = -.70;

function workshopSign() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 112;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#1c2735';
  ctx.fillRect(0, 0, 512, 112);
  ctx.fillStyle = logoTeal;
  ctx.save();
  ctx.translate(48, 56);
  ctx.scale(43, -43);
  ctx.beginPath();
  logoOutline.getPoints(6).forEach(({ x, y }, i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = '#ebeeef';
  ctx.font = '750 48px system-ui, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText('ALHUISSI', 83, 54);
  ctx.fillStyle = '#f4b674';
  for (let i = 0; i < 3; i++) ctx.fillRect(457 + i * 13, 49, 5, 14);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return new MeshBasicMaterial({ map: texture, toneMapped: false });
}

function spillLight(home: Group) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 63);
  gradient.addColorStop(0, 'rgba(255,255,255,.8)');
  gradient.addColorStop(.4, 'rgba(255,255,255,.32)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new CanvasTexture(canvas);

  const pool = (color: number, w: number, h: number, opacity: number) => new Mesh(
    new PlaneGeometry(w, h), new MeshBasicMaterial({ map: texture, color, opacity, transparent: true,
      blending: AdditiveBlending, depthWrite: false, toneMapped: false }),
  );
  const door = pool(0x47d9e6, 3.1, 1.4, .31);
  door.rotation.x = -Math.PI / 2;
  door.position.set(.53, .217, 2.83);
  const window = pool(0xf9974d, 3.7, 1.25, .26);
  window.rotation.x = -Math.PI / 2;
  window.position.set(-2.04, .205, 2.72);
  home.add(door, window);
}

function gyroscope(home: Group, clock: WorldClock) {
  const cradle = new Group();
  cradle.position.set(rotorX, 5.15, rotorZ);
  cradle.rotation.set(-.14, .27, -.17);
  home.add(cradle);
  column(home, graphite, .99, 1.3, .37, rotorX, 3.50, rotorZ, 8);
  column(home, alloy, .95, .99, .105, rotorX, 3.72, rotorZ, 8);
  column(home, recess, .73, .95, .31, rotorX, 3.89, rotorZ, 10);
  for (const side of [-1, 1]) {
    const bracket = [[0, 0], [side * .49, .03], [side * .55, .82], [side * .88, 1.46],
      [side * .57, 1.59], [side * .09, 1.04]] as const;
    volume(home, steel, bracket, .47, rotorX + side * .85, 3.57, rotorZ, .045);
    volume(home, alloy, bracket, .071, rotorX + side * .85, 3.57, rotorZ + .27, .014);
  }
  solid(cradle, new TorusGeometry(1.57, .147, 8, 64), graphite);
  solid(cradle, new TorusGeometry(1.64, .051, 5, 54), steel, 0, 0, -.15);
  solid(cradle, new TorusGeometry(1.43, .044, 6, 56), alloy, 0, 0, .073);
  for (let i = 0; i < 8; i++) {
    const angle = i * Math.PI / 4;
    solid(cradle, new TorusGeometry(1.57, .041, 5, 9, .66), i === 5 ? amber : cyan,
      0, 0, .144).rotation.z = angle + .065;
    const latch = box(cradle, steel, .255, .28, .33, Math.cos(angle) * 1.58, Math.sin(angle) * 1.58, .047);
    latch.rotation.z = angle;
    const contact = box(cradle, alloy, .155, .072, .04, latch.position.x, latch.position.y, .23);
    contact.rotation.z = angle;
  }
  const inner = new Group();
  inner.rotation.set(.69, -.69, .36);
  cradle.add(inner);
  solid(inner, new TorusGeometry(1.20, .069, 6, 48), steel);
  for (const start of [.18, Math.PI + .18]) {
    solid(inner, new TorusGeometry(1.2, .033, 5, 20, 2.2), rose, 0, 0, .053).rotation.z = start;
  }
  for (const rib of inner.children) {
    rib.userData.bake = false;
    rib.castShadow = false;
  }
  const crystal = new ExtrudeGeometry(logoOutline, { depth: .12, bevelEnabled: false, curveSegments: 8 });
  crystal.translate(0, 0, -.06);
  const core = new Mesh(crystal, new MeshBasicMaterial({ color: logoTeal, toneMapped: false, fog: false }));
  // Keep the emblem aligned with world up as the gimbal tilts around it.
  core.position.set(rotorX, 5.15, rotorZ);
  home.add(core);

  return () => {
    inner.rotation.x = .69 + .26 * Math.sin(clock.value * .73);
    inner.rotation.y = -.69 + .53 * Math.sin(clock.value * .51);
    inner.rotation.z = .36 - clock.value * .22;
    core.rotation.y = .21 * Math.sin(clock.value * .55);
  };
}

function controlRoom(home: Group) {
  const screen = new MeshBasicMaterial({ color: '#ffca92', toneMapped: false });
  const warmWall = lanternMaterial(0xa06142, .38);
  box(home, warmWall, 3.41, 1.79, .095, -2.16, 1.66, 1.16);
  box(home, recess, 3.40, .13, .94, -2.16, 2.62, 1.70);
  box(home, alloy, 3.4, .13, .9, -2.16, .84, 1.67);
  box(home, graphite, 2.91, .144, .62, -2.14, 1.24, 1.63);
  box(home, amber, 2.89, .051, .045, -2.14, 1.17, 1.94);
  for (const x of [-3.27, -2.47, -1.50]) {
    box(home, recess, .59, .44, .13, x, 1.68, 1.32);
    box(home, x === -2.47 ? cyan : screen, .51, .35, .027, x, 1.69, 1.397);
    box(home, graphite, .066, .19, .1, x, 1.4, 1.42);
    for (let i = 0; i < 8; i++) {
      const amplitude = .035 + .11 * Math.abs(Math.sin(i * .82 + x));
      box(home, recess, .017, amplitude, .009, x - .177 + i * .05, 1.7, 1.417);
    }
  }
  box(home, recess, .9, .143, .31, -2.72, 1.366, 1.79);
  for (let i = 0; i < 12; i++) {
    box(home, i % 3 === 2 ? steel : screen, .054, .022, .15, -3.073 + i * .065, 1.45, 1.826);
  }
  for (const [i, x] of [-1.87, -1.73, -1.59, -1.45, -1.31].entries()) {
    column(home, graphite, .036, .042, .048, x, 1.38, 1.74, 8);
    box(home, i % 2 === 0 ? cyan : amber, .048, .019, .031, x, 1.36, 1.83);
  }
  const glass = new Mesh(new PlaneGeometry(3.47, 1.78), new MeshBasicMaterial({
    color: '#7dc6d4', transparent: true, opacity: .13, depthWrite: false, side: DoubleSide,
  }));
  glass.position.set(-2.16, 1.68, 2.24);
  home.add(glass);
  for (const x of [-3.91, -2.63, -1.55, -.50]) {
    box(home, steel, .10, 1.81, .18, x, 1.67, 2.23);
  }
  for (const y of [.82, 2.58]) box(home, graphite, 3.58, .15, .27, -2.16, y, 2.22);
  volume(home, steel, [[-3.99, 2.44], [-.46, 2.44], [-.68, 2.72], [-3.59, 2.83]],
    .58, 0, 0, 2.19, .034);
  box(home, alloy, 2.88, .049, .058, -2.08, 2.59, 2.52).rotation.z = -.029;
}

function coolantBank(home: Group) {
  const shield = [[-1.10, .48], [.91, .48], [1.19, .75], [1.19, 2.10],
    [.86, 2.46], [-.84, 2.46], [-1.10, 2.18]] as const;
  volume(home, steel, shield, .45, 2.77, 0, 2.24, .055);
  volume(home, recess, shield, .06, 2.77, .14, 2.494).scale.set(.91, .91, 1);
  box(home, enamel, 1.97, .19, .35, 2.78, .71, 2.57);
  box(home, graphite, 1.94, .31, .35, 2.76, 2.21, 2.57);
  for (const [i, x] of [2.10, 2.70, 3.30].entries()) {
    column(home, i === 1 ? rose : cyan, .091, .091, 1.32, x, 1.45, 2.64, 12);
    for (const y of [.78, 1.11, 1.82, 2.09]) {
      column(home, y === 1.11 || y === 1.82 ? alloy : steel, .15, .15, .096, x, y, 2.64, 10);
    }
    box(home, i === 1 ? amber : cyan, .065, .036, .021, x, 2.22, 2.758);
  }
  box(home, alloy, .081, 1.08, .16, 3.68, 1.49, 2.56);
  for (let i = 0; i < 5; i++) box(home, steel, .13, .041, .16, 3.64, .96 + i * .21, 2.62);
}

export function buildWorkshop(root: Group, collisions: Collisions, clock: WorldClock) {
  const [x, z] = destinations.workshop.landmark;
  const y = heightAt(x, z);
  const home = new Group();
  home.position.set(x, y, z);
  home.rotation.y = -.095;
  root.add(home);

  // The low sill follows the existing trail into a sealed, three-bay workspace.
  box(home, recess, 8.05, .46, 5.26, .09, -.12, -.12);
  volume(home, steel, [[-3.94, 0], [3.94, 0], [3.94, .13], [3.74, .23], [-3.74, .23], [-3.94, .13]],
    5.2, .09, -.035, .10, .035);
  box(home, graphite, 7.81, 3, .41, .025, 1.54, -2.43);
  box(home, graphite, .41, 2.81, 4.72, -3.81, 1.51, -.17);
  box(home, graphite, .41, 2.81, 4.72, 3.81, 1.51, -.17);
  box(home, recess, 7.58, 2.90, .28, .03, 1.51, .90);
  box(home, graphite, 7.72, .65, .31, .02, .51, 2.15);
  const roof = [[-4.05, 2.76], [4.12, 2.76], [4.12, 3.07], [3.77, 3.31], [1.27, 3.31],
    [.87, 3.65], [-3.49, 3.65], [-4.05, 3.18]] as const;
  volume(home, graphite, roof, 5.4, 0, 0, -.05, .05);
  volume(home, enamel, roof, .21, 0, .015, 2.61, .037);
  volume(home, steel, [[-1.16, 2.79], [1.21, 2.79], [1.04, 3.05], [-.92, 3.05]],
    1.11, .54, 0, 2.49, .025);
  box(home, alloy, 4.63, .078, .10, -1.45, 3.49, 2.735);
  box(home, cyan, 3.45, .058, .08, -2.02, 2.89, 2.762);
  box(home, cyan, 1.77, .058, .08, 2.81, 2.89, 2.762);
  for (const px of [-3.92, 1.42, 3.91]) {
    volume(home, steel, [[-.18, .12], [.18, .12], [.14, 2.53], [-.05, 2.81], [-.18, 2.66]],
      .25, px, 0, 2.21, .023);
  }

  controlRoom(home);
  const door = [[-.90, 0], [.90, 0], [.90, 1.84], [.58, 2.18], [-.66, 2.18], [-.90, 1.94]] as const;
  volume(home, steel, door, .23, .53, .18, 2.20, .042);
  volume(home, cyan, door, .033, .53, .224, 2.33).scale.set(.916, .94, 1);
  volume(home, recess, door, .035, .53, .247, 2.36).scale.set(.851, .91, 1);
  for (const side of [-1, 1]) {
    box(home, graphite, .64, 1.57, .035, .53 + side * .362, 1.13, 2.39);
    box(home, steel, .04, .66, .046, .53 + side * .124, 1.01, 2.399);
  }
  box(home, cyan, .99, .070, .05, .53, 1.58, 2.424);
  box(home, amber, .14, .088, .056, 1.68, 1.20, 2.33);
  box(home, steel, 2.55, .13, .79, .53, .147, 2.77);
  for (const side of [-1, 1]) box(home, cyan, .12, .024, .54, .53 + side * 1.02, .221, 2.86);

  coolantBank(home);
  box(home, graphite, 1.96, .447, .12, .54, 2.61, 2.64);
  const sign = new Mesh(new PlaneGeometry(1.86, .407), workshopSign());
  sign.position.set(.54, 2.61, 2.706);
  home.add(sign);

  // Repeat the heat-sink fins and service rails on the trail-facing side and rear.
  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      box(home, steel, .16, 1.27, .28, side * 4.03, 1.78, -.89 + i * .43);
    }
    box(home, alloy, .11, .105, 3.38, side * 4.07, 2.52, .04);
    box(home, cyan, .11, .065, 2.20, side * 4.08, 2.78, .34);
    box(home, recess, 1.48, 1.1, .11, 2.22 * side, 1.61, -2.677);
    box(home, amber, 1.29, .075, .042, 2.22 * side, 2.07, -2.746);
  }
  for (let i = 0; i < 4; i++) box(home, steel, 3.23, .12, .16, -1.1, 3.72, -2.06 + i * .42);

  // A compact antenna bank counterbalances the large rotor above the lab.
  const antennaX = -2.97;
  const antennaZ = -1.29;
  column(home, graphite, .45, .68, .23, antennaX, 3.78, antennaZ, 8);
  for (const [offset, height] of [[-.32, 1.80], [.01, 2.49], [.38, 1.21]]) {
    column(home, steel, .032, .068, height, antennaX + offset, 3.84 + height / 2, antennaZ, 8);
    column(home, alloy, .09, .09, .12, antennaX + offset, 3.88 + height * .20, antennaZ, 8);
    column(home, offset > 0 ? cyan : rose, .041, .051, .094, antennaX + offset, 3.84 + height, antennaZ, 8);
  }
  for (const yy of [4.62, 4.88, 5.15]) box(home, steel, .82, .045, .05, antennaX + .03, yy, antennaZ);

  spillLight(home);
  const bench = home.localToWorld(new Vector3(2.37, 0, 4.04));
  const benchY = heightAt(bench.x, bench.z);
  box(root, enamel, 1.29, .11, .41, bench.x, benchY + .46, bench.z).rotation.y = home.rotation.y;
  for (const offset of [-.45, .45]) box(root, graphite, .13, .46, .35, bench.x + offset, benchY + .22, bench.z);
  box(root, alloy, 1.04, .045, .037, bench.x, benchY + .45, bench.z + .21);
  collisions.add(bench.x, bench.z, 1.26, .40, benchY - .07, .61, home.rotation.y);
  const mass = home.localToWorld(new Vector3(0, -.40, -.15));
  collisions.add(mass.x, mass.z, 8.07, 4.94, mass.y, 4.10, home.rotation.y);
  const coolant = home.localToWorld(new Vector3(2.77, .41, 2.44));
  collisions.add(coolant.x, coolant.z, 2.30, .62, coolant.y, 2.09, home.rotation.y);
  return gyroscope(home, clock);
}
