import {
  AdditiveBlending, CanvasTexture, DoubleSide, ExtrudeGeometry, Group, Mesh,
  MeshBasicMaterial, PlaneGeometry, Shape, SphereGeometry, SRGBColorSpace, TorusGeometry, Vector3,
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
const amber = lanternMaterial(0xffad61, 2.2);
const rose = new MeshBasicMaterial({ color: '#f589bc', toneMapped: false });
const logoTeal = '#13cbb7';
// Convert the artwork in alhuissi-mark.svg to a centered, upright Three.js shape.
const logoPoint = (x: number, y: number) => [(x - 497) / 436, (502 - y) / 436] as const;
const logoOutline = new Shape()
  .moveTo(...logoPoint(487, 114)).quadraticCurveTo(...logoPoint(498, 105), ...logoPoint(510, 114))
  .lineTo(...logoPoint(715, 293)).lineTo(...logoPoint(715, 724)).lineTo(...logoPoint(510, 890))
  .quadraticCurveTo(...logoPoint(498, 900), ...logoPoint(486, 890))
  .lineTo(...logoPoint(279, 724)).lineTo(...logoPoint(279, 293)).closePath();

// The rotor is built around its own mount, which now crowns the signal tower.
const rotorX = 0;
const rotorZ = 0;

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
  const door = pool(0x47d9e6, 3.6, 1.8, .55);
  door.rotation.x = -Math.PI / 2;
  door.position.set(.53, .217, 2.83);
  const window = pool(0xf9974d, 4.2, 1.6, .5);
  window.rotation.x = -Math.PI / 2;
  window.position.set(-2.04, .205, 2.72);
  home.add(door, window);
}

function gyroscope(home: Group, clock: WorldClock) {
  // `home` is the rotor mount: its origin sits 3.31 below the pedestal's foot.
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
  const warmWall = lanternMaterial(0xa06142, .9);
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

// The signal tower beside the lab's west wall: an octagonal shaft with five bands of lit windows
// and service ribs, a skybridge to the roof, and a railed crown platform that carries the
// alhuissi emblem rotor at the top. Returns the rotor mount.
function signalTower(home: Group, collisions: Collisions) {
  const tower = new Group();
  const local = new Vector3(-5.15, 0, -.05);
  const world = home.localToWorld(local.clone());
  const ground = heightAt(world.x, world.z) - home.position.y;
  tower.position.set(local.x, Math.min(0, ground), local.z);
  home.add(tower);
  const windowGlow = lanternMaterial(0xffb877, 1.6);
  const shaftTop = 8.1;
  const shaftHeight = shaftTop - .66;
  const middle = .66 + shaftHeight / 2;

  // Footing and tapered shaft.
  column(tower, recess, 1.25, 1.38, .5, 0, .05, 0, 8);
  column(tower, graphite, 1.06, 1.18, .4, 0, .48, 0, 8);
  column(tower, graphite, .7, .9, shaftHeight, 0, middle, 0, 8);
  column(tower, enamel, .94, .94, .1, 0, .7, 0, 8);
  // A lit doorway at the base, facing the trail.
  volume(tower, steel, [[-.3, 0], [.3, 0], [.3, .9], [0, 1.12], [-.3, .9]], .12, 0, .72, .9, .02);
  volume(tower, windowGlow, [[-.22, 0], [.22, 0], [.22, .82], [0, .99], [-.22, .82]], .04, 0, .74, .97);
  // Bands of lit windows, framed by alloy rings.
  const radiusAt = (y: number) => .9 - (y - .66) / shaftHeight * .2;
  for (const y of [1.95, 3.25, 4.55, 5.85, 7.15]) {
    const radius = radiusAt(y);
    column(tower, windowGlow, radius + .012, radius + .016, .34, 0, y, 0, 8);
    column(tower, alloy, radius + .05, radius + .05, .05, 0, y + .2, 0, 8);
    column(tower, alloy, radius + .05, radius + .05, .05, 0, y - .2, 0, 8);
  }
  // Service ribs on every corner and two cyan seams facing the trail.
  const lean = Math.atan(.2 / shaftHeight);
  for (let i = 0; i < 8; i++) {
    const a = (i + .5) * Math.PI / 4;
    const radius = radiusAt(middle) - .02;
    const rib = box(tower, steel, .08, shaftHeight - .1, .11, Math.sin(a) * radius, middle, Math.cos(a) * radius);
    rib.rotation.y = a;
    rib.rotation.x = -lean * Math.cos(a);
    rib.rotation.z = lean * Math.sin(a);
  }
  for (const a of [-.39, .39]) {
    const radius = radiusAt(middle) - .03;
    const seam = box(tower, cyan, .03, shaftHeight - .5, .03, Math.sin(a) * radius, middle, Math.cos(a) * radius);
    seam.rotation.y = a;
    seam.rotation.x = -lean * Math.cos(a);
    seam.rotation.z = lean * Math.sin(a);
  }

  // Skybridge from the tower into the lab's west wall, just under the roofline.
  const bridgeLength = -4.0 - (local.x + .74) + .12;
  const bx = .74 + bridgeLength / 2;
  box(tower, graphite, bridgeLength, .62, .9, bx, 2.43 - tower.position.y, 0);
  box(tower, windowGlow, bridgeLength - .1, .26, .92, bx, 2.46 - tower.position.y, 0);
  box(tower, alloy, bridgeLength, .05, .96, bx, 2.76 - tower.position.y, 0);
  box(tower, cyan, bridgeLength, .025, .03, bx, 2.14 - tower.position.y, .47);

  // Corbelled crown platform with a railing and a glowing rim.
  column(tower, steel, 1.45, .72, .5, 0, shaftTop + .25, 0, 8);
  column(tower, alloy, 1.5, 1.5, .1, 0, shaftTop + .55, 0, 16);
  column(tower, cyan, 1.52, 1.52, .03, 0, shaftTop + .47, 0, 24);
  const rail = solid(tower, new TorusGeometry(1.46, .03, 5, 40), alloy, 0, shaftTop + .95, 0);
  rail.rotation.x = Math.PI / 2;
  for (let i = 0; i < 16; i++) {
    const a = i * Math.PI / 8;
    column(tower, steel, .02, .02, .38, Math.sin(a) * 1.46, shaftTop + .77, Math.cos(a) * 1.46, 5);
  }

  // The rotor mount: the pedestal's foot (3.31 in rotor space) rests on the crown platform.
  const mount = new Group();
  mount.position.set(0, shaftTop + .6 - 3.31, 0);
  tower.add(mount);

  collisions.add(world.x, world.z, 2.1, 2.1, heightAt(world.x, world.z) - .4, 13, home.rotation.y);
  return mount;
}

// Where the rotor used to sit: a small array of tilted solar panels around a glowing hatch.
function rooftopArray(home: Group) {
  const panelGlass = standard('#1f3b6b', .25, .55);
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const x = 1.6 + col * .76;
      const z = -1.55 + row * .95;
      column(home, steel, .03, .03, .26, x, 3.44, z, 5);
      const panel = box(home, panelGlass, .7, .04, .62, x, 3.6, z);
      panel.rotation.x = -.42;
      const frame = box(home, alloy, .72, .02, .025, x, 3.6 + Math.sin(.42) * .31, z - Math.cos(.42) * .31);
      frame.rotation.x = -.42;
    }
  }
  box(home, graphite, .7, .12, .7, 2.6, 3.37, .55);
  box(home, lanternMaterial(0x63d6e6, 1.2), .5, .03, .5, 2.6, 3.44, .55);
}

// Night dressing for the lab: lit side windows, light strips tracing the roofline, skylights,
// a small relay dish and glowing guide lines along the sill. The emblem rotor is untouched.
function nightDetails(home: Group) {
  const glow = new MeshBasicMaterial({ color: '#7ff6f0', toneMapped: false });
  const warm = new MeshBasicMaterial({ color: '#ffc58a', toneMapped: false });
  const violet = new MeshBasicMaterial({ color: '#b48cff', toneMapped: false });
  const skylight = lanternMaterial(0x63d6e6, .9);

  // Side windows between the heat-sink fins, glowing warm from the workspace inside.
  for (const side of [-1, 1]) {
    box(home, recess, .06, .82, 1.5, side * 4.02, 1.5, 1.45);
    box(home, warm, .03, .66, 1.32, side * 4.055, 1.5, 1.45);
    for (const dz of [-.33, .33]) box(home, steel, .05, .7, .05, side * 4.07, 1.5, 1.45 + dz);
    box(home, steel, .05, .05, 1.36, side * 4.07, 1.5, 1.45);
  }

  // Roofline light strips on the front, sides and the raised step of the roof.
  box(home, violet, 8.05, .035, .04, .035, 3.09, 2.79);
  box(home, glow, 4.30, .03, .04, -1.31, 3.67, 2.79);
  for (const side of [-1, 1]) box(home, violet, .04, .035, 5.2, side * 4.13, 3.09, -.05);

  // Skylights set into the roof, between the rotor and the antenna bank.
  for (let i = 0; i < 3; i++) {
    box(home, graphite, .82, .08, .62, -1.25 + i * .02, 3.69, 1.55 - i * .78);
    box(home, skylight, .70, .04, .50, -1.25 + i * .02, 3.74, 1.55 - i * .78);
  }

  // A small relay dish aimed at the sky beside the antennas.
  const dish = new Group();
  dish.position.set(-.35, 3.74, -1.75);
  home.add(dish);
  column(dish, steel, .05, .08, .55, 0, .27, 0, 8);
  const bowl = solid(dish, new SphereGeometry(.42, 14, 6, 0, Math.PI * 2, 0, Math.PI / 2.6), alloy, 0, .72, 0);
  bowl.rotation.set(Math.PI + .7, 0, .35);
  column(dish, glow, .03, .03, .07, -.14, .95, .2, 6);

  // Glowing guide lines along the sill and a lit threshold for the door.
  box(home, glow, 7.7, .025, .03, .09, .14, 2.53);
  for (const side of [-1, 1]) box(home, glow, .03, .025, 4.9, side * 3.98, .14, .02);
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

  // A pair of short antennas on the roof; the emblem rotor now crowns the signal tower.
  for (const [offset, height] of [[-.2, 1.2], [.22, .8]] as const) {
    column(home, steel, .03, .06, height, -2.97 + offset, 3.7 + height / 2, -1.29, 8);
    column(home, offset > 0 ? cyan : rose, .04, .05, .09, -2.97 + offset, 3.7 + height, -1.29, 8);
  }
  const rotorMount = signalTower(home, collisions);
  rooftopArray(home);

  nightDetails(home);
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
  return gyroscope(rotorMount, clock);
}
