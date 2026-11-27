import {
  Color, ConeGeometry, DoubleSide, Group, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, Vector3,
} from 'three';
import type { BufferGeometry } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import type { WorldClock } from '../atmosphere';
import { heightAt } from '../land';
import {
  DRAGON_BODY, DRAGON_HEAD_SCALE, DRAGON_JAW_SECTIONS, DRAGON_PALETTE, DRAGON_SHOULDER,
  dragonBlade, dragonBodyGeometry, dragonBrowGeometry, dragonEyeGeometry, dragonEyePoint, dragonHeadGeometry,
  dragonLoft, dragonRadius, taperedDragonTube,
} from './dragonGeometry';

// Pocket Orbit's jade space dragon (the same sculpt the game uses), circling the launchpad.
// Built in the dragon's own units and scaled down to the island.
const scale = .15;

function sculpt() {
  const blades: BufferGeometry[] = [];
  for (const side of [-1, 1]) {
    for (let layer = 0; layer < 2; layer++) {
      for (let i = 0; i < (layer ? 7 : 9); i++) {
        const a = (layer ? -.64 : -.74) + i * (layer ? .33 : .29);
        const reach = (layer ? 1.36 : 1.72) + (i % 3) * .13;
        blades.push(dragonBlade(
          new Vector3(side * (1.22 + Math.cos(a) * .8), .36 + Math.sin(a) * 1.34, layer ? .15 : -.85),
          new Vector3(side * (1.25 + Math.cos(a) * reach), .45 + Math.sin(a) * (layer ? 1.8 : 2.3),
            (layer ? -1.55 : -2.7) - (i % 3) * .27),
          layer ? .3 + (i % 2) * .04 : .42 + (i % 3) * .035,
        ));
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    blades.push(dragonBlade(new Vector3(0, 1.8, -.3 - i * .7), new Vector3(0, 2.8 + (i % 2) * .4, -2.3 - i * .6), .6));
  }
  const tuft: BufferGeometry[] = [];
  for (let i = 0; i < 9; i++) {
    const a = (i / 8 - .5) * 1.5;
    const long = 3.4 - Math.abs(i - 4) * .42;
    tuft.push(dragonBlade(new Vector3(Math.sin(a) * .05, 0, .25),
      new Vector3(Math.sin(a) * long * .55, .25 - Math.abs(a) * .35, -long), .34 - Math.abs(i - 4) * .03));
  }
  const lids = [-1, 1].map((edge) => taperedDragonTube(
    Array.from({ length: 25 }, (_, i) => dragonEyePoint(i / 12 - 1, edge, new Vector3(), .012).toArray()),
    edge > 0 ? .035 : .04, 28, 6, [.1, 1, 1, .1]));
  const parts = {
    body: dragonBodyGeometry(),
    head: dragonHeadGeometry(),
    jaw: dragonLoft(DRAGON_JAW_SECTIONS),
    eye: dragonEyeGeometry(),
    brow: dragonBrowGeometry(),
    lids: mergeGeometries(lids)!,
    mane: mergeGeometries(blades)!,
    tail: mergeGeometries(tuft)!,
    horn: mergeGeometries([
      taperedDragonTube([[1.42, 1.5, -.7], [1.74, 2.7, -1.13], [1.97, 3.8, -1.62], [1.75, 4.45, -2.5]], .27, 28, 12),
      taperedDragonTube([[1.74, 2.7, -1.13], [2.35, 3.05, -1.48], [2.72, 3.66, -2.02]], .15, 24, 10),
      taperedDragonTube([[1.91, 3.63, -1.52], [2.35, 3.85, -1.91], [2.51, 4.2, -2.45]], .105, 22, 10),
    ])!,
    whisker: taperedDragonTube([[1, -.24, 5.12], [2.6, -.4, 5.3], [4.5, .05, 4.3], [4.8, .82, 2.2], [4.3, 1.38, .55]], .03, 36, 6),
    arm: taperedDragonTube([[0, 0, 0], [.85, -.55, -.72], [1.25, -1.35, -.4], [1.02, -2.25, .6]], .6, 22, 12, [1, .98, .65, .6]),
    finger: taperedDragonTube([[0, 0, 0], [0, -.12, .24], [0, -.38, .45], [0, -.56, .39]], .17, 12, 8, [1, .95, .7, .5]),
    spike: new ConeGeometry(.32, 1.1, 5),
  };
  for (const geometry of [...blades, ...tuft, ...lids]) geometry.dispose();
  return parts;
}

export function buildDragon(root: Group, clock: WorldClock, center: readonly [number, number]) {
  const g = sculpt();
  const jade = new MeshStandardMaterial({ color: DRAGON_PALETTE.jade, roughness: .5, emissive: '#2f8a6a', emissiveIntensity: .7 });
  const materials = {
    body: new MeshStandardMaterial({ vertexColors: true, roughness: .48, emissive: '#2f8a6a', emissiveIntensity: .6 }),
    jade,
    mane: new MeshStandardMaterial({ vertexColors: true, roughness: .6, emissive: DRAGON_PALETTE.maneLight,
      emissiveIntensity: .35, side: DoubleSide }),
    horn: new MeshStandardMaterial({ color: DRAGON_PALETTE.horn, roughness: .45 }),
    belly: new MeshStandardMaterial({ color: DRAGON_PALETTE.belly, roughness: .6 }),
    dark: new MeshStandardMaterial({ color: DRAGON_PALETTE.dark, roughness: .7 }),
    eye: new MeshBasicMaterial({ color: new Color(DRAGON_PALETTE.eye).multiplyScalar(2.2), toneMapped: false }),
  };

  const dragon = new Group();
  dragon.name = 'Pocket Orbit dragon';
  dragon.scale.setScalar(scale);
  dragon.position.set(center[0], heightAt(center[0], center[1]), center[1]);
  root.add(dragon);

  const body = new Mesh(g.body, materials.body);
  body.frustumCulled = false;
  body.castShadow = true;
  dragon.add(body);

  const head = new Group();
  head.scale.setScalar(DRAGON_HEAD_SCALE);
  dragon.add(head);
  const headMesh = new Mesh(g.head, jade);
  headMesh.castShadow = true;
  head.add(headMesh, new Mesh(g.mane, materials.mane));
  const jaw = new Group();
  jaw.position.set(0, -.26, 1.4);
  jaw.scale.set(.9, 1, 1);
  jaw.add(new Mesh(g.jaw, materials.belly));
  head.add(jaw);
  for (const side of [-1, 1]) {
    const half = new Group();
    half.scale.set(side, 1, 1);
    half.add(new Mesh(g.eye, materials.eye), new Mesh(g.brow, materials.dark), new Mesh(g.lids, materials.dark),
      new Mesh(g.horn, materials.horn), new Mesh(g.whisker, materials.horn));
    head.add(half);
  }

  const arms = [-1, 1].map((side) => {
    const mount = new Group();
    const limb = new Group();
    limb.position.set(side * 1.48, -.45, 0);
    limb.scale.set(side, 1, 1);
    limb.add(new Mesh(g.arm, jade));
    for (const x of [-.28, 0, .28]) {
      const finger = new Mesh(g.finger, jade);
      finger.position.set(1.02 + x, -2.39, 1.02);
      finger.rotation.y = x * .7;
      limb.add(finger);
    }
    mount.add(limb);
    dragon.add(mount);
    return { mount, limb, side };
  });

  const spikes = Array.from({ length: 22 }, () => {
    const spike = new Mesh(g.spike, materials.mane);
    dragon.add(spike);
    return spike;
  });
  const tail = new Mesh(g.tail, materials.mane);
  tail.scale.setScalar(2.3);
  dragon.add(tail);

  // The head flies a lazy looping orbit; the body follows exactly where the head has been.
  const radius = 10.5 / scale;
  const speed = .16;
  const altitude = 7 / scale;
  const p = new Vector3();
  const next = new Vector3();
  const tangent = new Vector3();
  const right = new Vector3();
  const up = new Vector3();
  const vertical = new Vector3(0, 1, 0);
  const basis = new Matrix4();
  let t = 0;

  const path = (s: number, out: Vector3) => {
    const a = t * speed - s / radius;
    const r = radius * (1 + .14 * Math.sin(a * 2 + 1));
    return out.set(Math.cos(a) * r, altitude + Math.sin(a * 3) * 1.6 / scale + Math.sin(a * 1.3) * .8 / scale,
      Math.sin(a) * r);
  };
  const frame = (u: number) => {
    const s = u * DRAGON_BODY.length;
    path(s, p);
    path(s + .35, next);
    tangent.subVectors(p, next).normalize();
    right.crossVectors(vertical, tangent).normalize();
    up.crossVectors(tangent, right).normalize();
    // A travelling wave down the spine keeps the body alive even on a smooth path.
    p.addScaledVector(right, Math.sin(t * 1.15 - u * 8.5) * (.15 + u * 1.5))
      .addScaledVector(up, Math.sin(t * .8 - u * 6) * (.1 + u * .7));
    basis.makeBasis(right, up, tangent);
  };

  const pos = g.body.getAttribute('position');
  const normal = g.body.getAttribute('normal');
  const { rings, sides } = DRAGON_BODY;

  return () => {
    t = clock.value;
    for (let i = 0; i <= rings; i++) {
      const u = i / rings;
      const r = dragonRadius(u);
      frame(u);
      for (let j = 0; j <= sides; j++) {
        const a = (j / sides) * Math.PI * 2;
        const sn = Math.sin(a);
        const cs = Math.cos(a);
        const nx = right.x * sn + up.x * cs;
        const ny = right.y * sn + up.y * cs;
        const nz = right.z * sn + up.z * cs;
        const k = i * (sides + 1) + j;
        pos.setXYZ(k, p.x + nx * r, p.y + ny * r * .92, p.z + nz * r);
        normal.setXYZ(k, nx, ny, nz);
      }
    }
    pos.needsUpdate = true;
    normal.needsUpdate = true;

    frame(0);
    head.position.copy(p);
    head.quaternion.setFromRotationMatrix(basis);
    jaw.rotation.x = .08 + Math.max(0, Math.sin(t * .7)) * .2;

    frame(DRAGON_SHOULDER);
    for (const arm of arms) {
      arm.mount.position.copy(p);
      arm.mount.quaternion.setFromRotationMatrix(basis);
      const sway = Math.sin(t * .85 - DRAGON_SHOULDER * 7);
      arm.limb.rotation.x = .05 + sway * .09;
      arm.limb.rotation.z = arm.side * (.1 + sway * .05);
    }
    spikes.forEach((spike, i) => {
      const u = (i + 1) / (spikes.length + 3);
      const r = dragonRadius(u);
      frame(u);
      spike.position.copy(p).addScaledVector(up, r * .9);
      spike.quaternion.setFromRotationMatrix(basis);
      spike.rotateX(-.5);
      spike.scale.setScalar(Math.max(.25, r / 1.9) * 1.6);
    });
    frame(.985);
    tail.position.copy(p);
    tail.quaternion.setFromRotationMatrix(basis);
    tail.rotateY(Math.sin(t * 1.9) * .22);
  };
}
