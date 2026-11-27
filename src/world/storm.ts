import {
  AdditiveBlending, BufferGeometry, CanvasTexture, Color, Float32BufferAttribute, Group, Mesh, MeshBasicMaterial,
  PointLight, Sprite, SpriteMaterial, Vector3,
} from 'three';
import type { Camera } from 'three';
import { heightAt, seaLevel } from './land';

// A thunderhead parks over the Dream Ocean gateway. As the traveler approaches it darkens,
// and forked lightning strikes the meadow and the cloud sea around the gate.

function puffTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const context = canvas.getContext('2d')!;
  for (let i = 0; i < 9; i++) {
    const x = 30 + Math.random() * 68;
    const y = 34 + Math.random() * 60;
    const r = 22 + Math.random() * 26;
    const gradient = context.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, 'rgba(255,255,255,.55)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
  }
  return new CanvasTexture(canvas);
}

function boltPath(top: Vector3, bottom: Vector3, roughness: number) {
  let points = [top.clone(), bottom.clone()];
  let spread = top.distanceTo(bottom) * roughness;
  for (let pass = 0; pass < 6; pass++) {
    const next: Vector3[] = [points[0]];
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      const mid = a.clone().lerp(b, .5);
      mid.x += (Math.random() - .5) * spread;
      mid.z += (Math.random() - .5) * spread;
      mid.y += (Math.random() - .5) * spread * .3;
      next.push(mid, b);
    }
    points = next;
    spread *= .55;
  }
  return points;
}

/** A camera-facing ribbon along the bolt, tapering toward the strike. */
function ribbon(points: Vector3[], width: number, eye: Vector3) {
  const positions: number[] = [];
  const indices: number[] = [];
  const side = new Vector3();
  const toEye = new Vector3();
  const direction = new Vector3();
  points.forEach((point, i) => {
    direction.subVectors(points[Math.min(points.length - 1, i + 1)], points[Math.max(0, i - 1)]).normalize();
    toEye.subVectors(eye, point).normalize();
    side.crossVectors(direction, toEye).normalize();
    const w = width * (1 - i / points.length * .6);
    positions.push(point.x - side.x * w, point.y - side.y * w, point.z - side.z * w,
      point.x + side.x * w, point.y + side.y * w, point.z + side.z * w);
    if (i < points.length - 1) {
      const k = i * 2;
      indices.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  });
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  return geometry;
}

export function buildStorm(root: Group, center: readonly [number, number]) {
  // A storm bank hangs just past the island's edge behind the gate, at eye level from the path.
  const cx = center[0] - 9;
  const cz = center[1] - 3.5;
  const ground = heightAt(center[0], center[1]);
  const cloudY = ground + 6.5;
  const cloud = new Group();
  cloud.name = 'Dream Ocean thunderhead';
  root.add(cloud);
  const texture = puffTexture();
  const puffs = Array.from({ length: 14 }, (_, i) => {
    const material = new SpriteMaterial({
      map: texture, color: '#2b2446', transparent: true, opacity: 0, depthWrite: false, toneMapped: false,
    });
    const sprite = new Sprite(material);
    const a = i / 14 * Math.PI * 2;
    const r = 3 + (i % 3) * 3.2;
    sprite.position.set(cx + Math.cos(a) * r, cloudY + (i % 4) * 1.1, cz + Math.sin(a) * r * 1.3);
    sprite.scale.setScalar(11 + (i % 5) * 2.4);
    cloud.add(sprite);
    return { sprite, material, drift: Math.random() * 6.28 };
  });

  const glow = new MeshBasicMaterial({
    color: new Color('#b9a2ff').multiplyScalar(1.6), transparent: true, opacity: 0, blending: AdditiveBlending,
    depthWrite: false, toneMapped: false,
  });
  const core = new MeshBasicMaterial({
    color: new Color('#f4efff').multiplyScalar(3.2), transparent: true, opacity: 0, blending: AdditiveBlending,
    depthWrite: false, toneMapped: false,
  });
  const bolts = new Group();
  root.add(bolts);
  const light = new PointLight('#c8b6ff', 0, 34, 1.4);
  light.position.set(cx, ground + 6, cz);
  root.add(light);
  const lit = new Color('#c9b8ff');
  const dark = new Color('#2b2446');

  let wait = 1.5;
  let age = 99;
  let presence = 0;

  function strike(camera: Camera) {
    for (const child of [...bolts.children]) (child as Mesh).geometry.dispose();
    bolts.clear();
    // Mostly down into the cloud sea; now and then onto the meadow beside the gate.
    const onLand = Math.random() < .35;
    const a = Math.random() * Math.PI * 2;
    const r = onLand ? 3 + Math.random() * 4 : 2 + Math.random() * 7;
    const x = (onLand ? center[0] : cx) + Math.cos(a) * r;
    const z = (onLand ? center[1] : cz) + Math.sin(a) * r;
    const bottom = new Vector3(x, Math.max(seaLevel, heightAt(x, z)), z);
    const top = new Vector3(cx + (Math.random() - .5) * 8, cloudY, cz + (Math.random() - .5) * 6);
    const main = boltPath(top, bottom, .28);
    const eye = camera.position;
    bolts.add(new Mesh(ribbon(main, .55, eye), glow), new Mesh(ribbon(main, .09, eye), core));
    for (let b = 0; b < 3; b++) {
      const from = main[4 + Math.floor(Math.random() * (main.length * .55))];
      const to = from.clone().add(new Vector3((Math.random() - .5) * 7, -3 - Math.random() * 5, (Math.random() - .5) * 7));
      const fork = boltPath(from, to, .35);
      bolts.add(new Mesh(ribbon(fork, .3, eye), glow), new Mesh(ribbon(fork, .05, eye), core));
    }
    light.position.copy(bottom).add(new Vector3(0, 3, 0));
    age = 0;
  }

  return {
    /** Returns the current flash strength (0..1) for the screen-space lightning wash. */
    update(dt: number, approach: number, camera: Camera, reduced: boolean) {
      presence += (approach - presence) * Math.min(1, dt * 2);
      for (const puff of puffs) {
        puff.material.opacity = presence * .92;
        puff.sprite.position.x += Math.sin(age * .2 + puff.drift) * dt * .1;
      }
      cloud.visible = presence > .01;
      // Never strobes: one strike every few seconds, two pulses well under 3 flashes a second.
      if (!reduced && presence > .25) {
        wait -= dt;
        if (wait <= 0) {
          strike(camera);
          wait = 2.6 + Math.random() * 3.8;
        }
      }
      age += dt;
      const pulse = age < .12 ? 1 : age < .42 ? .25 : age < .52 ? .85 : Math.max(0, 1 - (age - .52) / .35);
      const flash = reduced ? 0 : pulse * presence;
      glow.opacity = flash;
      core.opacity = flash;
      bolts.visible = flash > .01;
      light.intensity = flash * 90;
      for (const puff of puffs) puff.material.color.copy(dark).lerp(lit, flash * .8);
      return flash;
    },
  };
}
