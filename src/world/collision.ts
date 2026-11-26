import { heightAt, footRadius, poolLevel, shoreFraction } from './land';

type Obstacle = {
  x: number;
  z: number;
  halfWidth: number;
  halfDepth: number;
  cosine: number;
  sine: number;
  bottom: number;
  top: number;
};

export class Collisions {
  readonly obstacles: Obstacle[] = [];

  add(x: number, z: number, width: number, depth: number, bottom: number, height: number, yaw = 0) {
    this.obstacles.push({
      x, z, halfWidth: width / 2, halfDepth: depth / 2, bottom, top: bottom + height,
      cosine: Math.cos(yaw), sine: Math.sin(yaw),
    });
  }

  solid(x: number, z: number, radius: number, bottom: number, top: number) {
    return this.obstacles.some((obstacle) => {
      if (bottom >= obstacle.top || top <= obstacle.bottom) return false;
      const dx = x - obstacle.x;
      const dz = z - obstacle.z;
      const px = Math.abs(dx * obstacle.cosine - dz * obstacle.sine) - obstacle.halfWidth;
      const pz = Math.abs(dx * obstacle.sine + dz * obstacle.cosine) - obstacle.halfDepth;
      const ex = Math.max(px, 0);
      const ez = Math.max(pz, 0);
      return ex * ex + ez * ez < radius * radius;
    });
  }

  canStand(x: number, z: number, margin = 0) {
    const y = heightAt(x, z);
    return shoreFraction(x, z) < .994 - margin && y > poolLevel - .18
      && !this.solid(x, z, footRadius, y + .06, y + 1.52);
  }

  clearPath(ax: number, az: number, bx: number, bz: number) {
    const steps = Math.max(1, Math.ceil(Math.hypot(bx - ax, bz - az) / .28));
    let lastY = heightAt(ax, az);
    for (let i = 1; i <= steps; i++) {
      const x = ax + (bx - ax) * i / steps;
      const z = az + (bz - az) * i / steps;
      const height = heightAt(x, z);
      if (Math.abs(height - lastY) > .28 || !this.canStand(x, z, .022)) return false;
      lastY = height;
    }
    return true;
  }
}
