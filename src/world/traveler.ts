import {
  CanvasTexture, Color, Group, MathUtils, Mesh, NearestFilter, PlaneGeometry, ShaderMaterial,
  Sprite, SpriteMaterial, SRGBColorSpace, TextureLoader, Vector3,
} from 'three';
import type { PerspectiveCamera } from 'three';
import { heightAt } from './land';
import { reduceMotion } from '../runtime/quality';

const rows = 8;
const strideFrames = 8;
const framePixels = 64;
const bodySize = 2.23;
const directionBoundary = Math.SQRT2 - 1;

// Dream Ocean's four-unit tiles, 1.8-unit sprite and distance-driven stride.
const referenceWalkSpeed = 4;
const referenceBodySize = 1.8;
const stridePerBody = 2.0625;

type Gait = 'idle' | 'walk' | 'sprint';

function facingRow(x: number, z: number, camera: PerspectiveCamera, previous: number) {
  const matrix = camera.matrixWorld.elements;
  const right = x * matrix[0] + z * matrix[2];
  const down = -x * matrix[2] + z * matrix[0];
  const horizontal = Math.abs(right);
  const vertical = Math.abs(down);
  const boundary = directionBoundary * (previous % 2 === 1 ? .72 : 1);

  // Both atlases are ordered S, SW, W, NW, N, NE, E, SE.
  if (Math.min(horizontal, vertical) >= Math.max(horizontal, vertical) * boundary) {
    if (down < 0) return right < 0 ? 3 : 5;
    return right < 0 ? 1 : 7;
  }
  return horizontal > vertical ? (right < 0 ? 2 : 6) : (down < 0 ? 4 : 0);
}

function createAtlas(loader: TextureLoader, name: string, columns: number, onLoad: () => void) {
  let loaded = false;
  const texture = loader.load(new URL(`./island-media/andi/${name}.webp`, document.baseURI).href, () => {
    loaded = true;
    onLoad();
  });
  texture.colorSpace = SRGBColorSpace;
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.repeat.set(1 / columns, 1 / rows);

  // Cut-out pixels participate in the same depth buffer as the island.
  const sprite = new Sprite(new SpriteMaterial({ map: texture, transparent: false, alphaTest: .5, toneMapped: false }));
  sprite.name = `Andi ${name}`;
  sprite.scale.set(bodySize, bodySize, 1);
  sprite.center.set(.5, 1 / framePixels);
  sprite.position.y = .044;
  sprite.visible = false;
  return {
    sprite,
    get loaded() { return loaded; },
    pose(direction: number, frame: number) {
      texture.offset.set(frame / columns, (rows - 1 - direction) / rows);
    },
  };
}

// Small puffs kicked up at each sprinting footfall; they stay where they land and fade.
function footstepDust() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const context = canvas.getContext('2d')!;
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(.45, 'rgba(255,255,255,.45)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  const map = new CanvasTexture(canvas);
  const group = new Group();
  group.name = 'Footstep dust';
  const life = .75;
  const puffs = Array.from({ length: 14 }, () => {
    const sprite = new Sprite(new SpriteMaterial({
      map, color: '#a99fc8', transparent: true, depthWrite: false, toneMapped: false, opacity: 0,
    }));
    sprite.visible = false;
    group.add(sprite);
    return { sprite, age: life, drift: new Vector3() };
  });
  let next = 0;
  return {
    group,
    spawn(x: number, z: number, dx: number, dz: number) {
      const puff = puffs[next];
      next = (next + 1) % puffs.length;
      puff.age = 0;
      puff.sprite.position.set(x - dx * .25 + (Math.random() - .5) * .2, heightAt(x, z) + .12, z - dz * .25);
      puff.drift.set(-dx * .35 + (Math.random() - .5) * .3, .32, -dz * .35 + (Math.random() - .5) * .3);
      puff.sprite.visible = true;
    },
    update(dt: number) {
      for (const puff of puffs) {
        if (puff.age >= life) continue;
        puff.age = Math.min(life, puff.age + dt);
        const t = puff.age / life;
        puff.sprite.position.addScaledVector(puff.drift, dt * (1 - t));
        puff.sprite.scale.setScalar(.28 + t * .75);
        puff.sprite.material.opacity = .34 * (1 - t) * Math.min(1, t * 6);
        puff.sprite.visible = puff.age < life;
      }
    },
  };
}

export function createTraveler(walkSpeed: number, invalidate: () => void) {
  const root = new Group();
  root.name = 'Andi';
  const loader = new TextureLoader();
  const walking = createAtlas(loader, 'walk', strideFrames + 1, invalidate);
  const sprinting = createAtlas(loader, 'sprint', strideFrames, invalidate);
  root.add(walking.sprite, sprinting.sprite);

  const shadow = new Mesh(new PlaneGeometry(1.62, 1.38), new ShaderMaterial({
    uniforms: { tint: { value: new Color('#201c28') } },
    transparent: true, depthWrite: false, toneMapped: false,
    vertexShader: `
      varying vec2 coords;
      void main() {
        coords = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 tint;
      varying vec2 coords;
      void main() {
        float radius = length((coords - .5) * vec2(2.2, 2.6));
        gl_FragColor = vec4(tint, .57 * (1.0 - smoothstep(.09, .91, radius)));
        #include <colorspace_fragment>
      }
    `,
  }));
  shadow.position.y = .049;
  root.add(shadow);
  const dust = footstepDust();
  const planeNormal = new Vector3(0, 0, 1);
  const groundNormal = new Vector3();
  const referenceScale = referenceWalkSpeed / walkSpeed;
  let direction = 4;
  let gait: Gait = 'idle';
  let stride = 0;
  let initialized = false;

  let lastFrame = -1;
  return {
    root,
    dust: dust.group,
    get ready() { return walking.loaded; },
    update(position: Vector3, heading: number, dt: number, camera: PerspectiveCamera,
      walkingPace: boolean, falling: boolean, teleport: boolean) {
      const dx = position.x - root.position.x;
      const dz = position.z - root.position.z;
      root.position.copy(position);

      const distance = initialized && !teleport && !falling ? Math.hypot(dx, dz) : 0;
      const speed = distance / dt;
      initialized = true;
      const moving = speed > .015;
      direction = facingRow(moving ? dx : Math.sin(heading), moving ? dz : Math.cos(heading), camera, direction);
      const sprintThreshold = walkSpeed * (gait === 'sprint' ? 1.035 : 1.075);
      gait = !moving ? 'idle' : walkingPace || speed < sprintThreshold ? 'walk' : 'sprint';

      if (gait === 'idle') {
        stride = 0;
      } else {
        // Use traveled distance and preserve phase across the walk and sprint switch.
        const speedRatio = speed * referenceScale / (2 * referenceBodySize);
        const strideScale = MathUtils.clamp(Math.sqrt(speedRatio), .7, 2.2);
        const cycle = stridePerBody * referenceBodySize * strideScale;
        stride = (stride + distance * referenceScale / cycle) % 1;
      }

      const useSprint = gait === 'sprint' && sprinting.loaded;
      const frame = Math.floor(stride * strideFrames);
      // Footfalls land on frames 1 and 5 of the eight-frame sprint.
      if (useSprint && frame !== lastFrame && (frame === 1 || frame === 5) && !reduceMotion.matches && distance > 0) {
        dust.spawn(position.x, position.z, dx / distance, dz / distance);
      }
      lastFrame = useSprint ? frame : -1;
      dust.update(dt);
      walking.sprite.visible = walking.loaded && !useSprint;
      sprinting.sprite.visible = useSprint;
      if (useSprint) {
        sprinting.pose(direction, frame);
      } else {
        walking.pose(direction, gait === 'idle' ? 0 : frame + 1);
      }

      shadow.visible = walking.loaded && !falling;
      const { x, z } = position;
      groundNormal.set(
        heightAt(x - .29, z) - heightAt(x + .29, z),
        .58,
        heightAt(x, z - .29) - heightAt(x, z + .29),
      ).normalize();
      shadow.quaternion.setFromUnitVectors(planeNormal, groundNormal);
    },
  };
}
