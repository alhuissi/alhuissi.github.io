import { MathUtils, PerspectiveCamera, Vector3 } from 'three';
import { heightAt, shoreFraction } from '../world/land';
import type { Collisions } from '../world/collision';

export class IslandCamera {
  readonly camera = new PerspectiveCamera(48, 1, .18, 700);
  yaw = .19;
  pitch = .415;
  private aspect = 1;
  private readonly position = new Vector3();
  private readonly aim = new Vector3();
  private readonly target = new Vector3();
  private readonly sample = new Vector3();
  private initialized = false;

  constructor(private readonly land: Collisions) {}

  resize(width: number, height: number) {
    this.aspect = width / Math.max(1, height);
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
  }

  turn(dx: number, dy: number) {
    this.yaw = (this.yaw - dx * .0078) % (Math.PI * 2);
    this.pitch = MathUtils.clamp(this.pitch + dy * .0057, .16, 1.08);
  }

  recenter() {
    this.yaw = .19;
    this.pitch = .415;
  }

  update(dt: number, traveler: Vector3, walking: boolean, time: number, reduced: boolean, snap = false) {
    const portrait = this.aspect < .76;
    const field = walking ? (portrait ? 58 : 52) : 48;
    if (walking) {
      this.walkPose(traveler, portrait);
    } else {
      const portraitDistance = 67.5 / Math.max(.32, this.aspect);
      const distance = portrait ? Math.max(82, portraitDistance) : 63 + Math.max(0, 1.28 - this.aspect) * 28;
      const drift = reduced ? 0 : Math.sin(time * .16) * 1.5;
      this.position.set(12.9 + drift, portrait ? 38.5 : 24.6, distance);
      this.aim.set(portrait ? -.25 : -9.75 * Math.min(1, this.aspect / 1.46),
        portrait ? distance * .229 : 7.9, 0);
    }

    const immediate = !this.initialized || snap || reduced;
    const a = immediate ? 1 : 1 - Math.exp(-dt * (walking ? 9 : 3.5));
    this.camera.position.lerp(this.position, a);
    this.target.lerp(this.aim, walking ? Math.min(1, a * 1.22) : a);
    this.camera.fov = MathUtils.lerp(this.camera.fov, field, a);
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld();
    this.initialized = true;
  }

  private walkPose(traveler: Vector3, portrait: boolean) {
    const sin = Math.sin(this.yaw);
    const cos = Math.cos(this.yaw);
    const dist = portrait ? 8.9 : 9.3;
    const back = dist * Math.cos(this.pitch);
    this.aim.set(traveler.x - sin * 1.6, Math.max(-2, traveler.y) + 1.78, traveler.z - cos * 1.6);

    this.position.set(
      traveler.x + sin * back + cos * .50,
      Math.max(-.5, traveler.y) + 1.17 + dist * Math.sin(this.pitch),
      traveler.z + cos * back - sin * .50,
    );

    this.sample.set(traveler.x, Math.max(-2, traveler.y) + 1.50, traveler.z);
    for (let i = 1; i <= 20; i++) {
      const t = i / 20;
      const x = MathUtils.lerp(this.sample.x, this.position.x, t);
      const y = MathUtils.lerp(this.sample.y, this.position.y, t);
      const z = MathUtils.lerp(this.sample.z, this.position.z, t);
      if (this.land.solid(x, z, .42, y - .39, y + .38)
        || (shoreFraction(x, z) < 1 && heightAt(x, z) > y - .45)) {
        this.position.lerp(this.sample, 1 - Math.max(.2, (i - 1) / 20));
        break;
      }
    }
  }
}
