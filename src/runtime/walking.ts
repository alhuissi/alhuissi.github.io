import { Vector2, Vector3 } from 'three';
import { arrival } from '../destinations';
import type { Point } from '../destinations';
import { footRadius, heightAt, poolLevel, shoreFraction } from '../world/land';
import type { Collisions } from '../world/collision';

export const walkSpeed = 3.5;
const sprintSpeed = walkSpeed * 1.6;
const gridSize = .90;
const neighbors = [
  [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1],
] as const;

type Node = { x: number; z: number; cost: number; estimate: number; last: Node | null; checked: boolean };

function route(land: Collisions, x: number, z: number, goal: Point): Point[] {
  if (land.clearPath(x, z, ...goal)) return [goal];
  const nearest = (worldX: number, worldZ: number): Point | null => {
    const centerX = Math.round(worldX / gridSize);
    const centerZ = Math.round(worldZ / gridSize);
    let result: Point | null = null;
    let best = Infinity;
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        const gridX = centerX + i;
        const gridZ = centerZ + j;
        const px = gridX * gridSize;
        const pz = gridZ * gridSize;
        const distance = Math.hypot(px - worldX, pz - worldZ);
        if (distance < best && land.canStand(px, pz, .025)
          && land.clearPath(worldX, worldZ, px, pz)) {
          result = [gridX, gridZ];
          best = distance;
        }
      }
    }
    return result;
  };
  const start = nearest(x, z);
  const finish = nearest(...goal);
  if (!start || !finish) return [];
  const heuristic = (x: number, z: number) => Math.hypot(finish[0] - x, finish[1] - z);
  const root: Node = { x: start[0], z: start[1], cost: 0, estimate: heuristic(...start), last: null, checked: false };
  const queue = [root];
  const visited = new Map<string, Node>([[start.join(','), root]]);

  while (queue.length) {
    let best = 0;
    for (let i = 1; i < queue.length; i++) {
      if (queue[i].estimate < queue[best].estimate) best = i;
    }
    const current = queue.splice(best, 1)[0];
    if (current.x === finish[0] && current.z === finish[1]) {
      const points: Point[] = [goal];
      for (let node: Node | null = current; node; node = node.last) {
        points.push([node.x * gridSize, node.z * gridSize]);
      }
      points.reverse();
      // Cut across consecutive grid cells only when the full walk is clear.
      const short: Point[] = [];
      let from: Point = [x, z];
      for (let i = 0; i < points.length; i++) {
        while (i + 1 < points.length && land.clearPath(...from, ...points[i + 1])) i++;
        from = points[i];
        short.push(from);
      }
      return short;
    }
    current.checked = true;
    for (const [dx, dz] of neighbors) {
      const nx = current.x + dx;
      const nz = current.z + dz;
      const key = `${nx},${nz}`;
      const prior = visited.get(key);
      const cost = current.cost + Math.hypot(dx, dz);
      if (prior && (prior.checked || cost >= prior.cost)) continue;
      if (!land.clearPath(current.x * gridSize, current.z * gridSize, nx * gridSize, nz * gridSize)) continue;
      const estimate = cost + heuristic(nx, nz);
      if (prior) {
        Object.assign(prior, { cost, estimate, last: current });
      } else {
        const next: Node = { x: nx, z: nz, cost, estimate, last: current, checked: false };
        visited.set(key, next);
        queue.push(next);
      }
    }
  }
  return [];
}

export class Walker {
  readonly position = new Vector3();
  readonly velocity = new Vector2();
  heading = Math.PI;
  falling = false;
  private gravity = 0;
  private path: Point[] = [];
  private lastRange = Infinity;
  private obstruction = 0;
  private readonly desired = new Vector2();

  constructor(private readonly land: Collisions) {
    this.reset();
  }

  get walkingRoute() { return this.path.length > 0; }
  get moving() { return this.velocity.lengthSq() > 0; }

  reset() {
    const [x, z] = arrival;
    this.position.set(x, heightAt(x, z), z);
    this.velocity.set(0, 0);
    this.heading = Math.PI;
    this.falling = false;
    this.gravity = 0;
    this.cancel();
  }

  cancel() {
    this.path.length = 0;
    this.lastRange = Infinity;
    this.obstruction = 0;
  }

  guide(to: Point) {
    this.cancel();
    const { x, z } = this.position;
    if (!this.falling) this.path = route(this.land, x, z, to);
    return this.walkingRoute;
  }

  update(dt: number, axes: Vector2, yaw: number, walkHeld: boolean) {
    if (axes.lengthSq() > .001) {
      this.cancel();
      const c = Math.cos(yaw);
      const s = Math.sin(yaw);
      this.desired.set(axes.x * c + axes.y * s, -axes.x * s + axes.y * c);
    } else if (this.path.length) {
      const [x, z] = this.path[0];
      this.desired.set(x - this.position.x, z - this.position.z);
      const distance = this.desired.length();
      if (distance < .32) {
        this.path.shift();
        this.lastRange = Infinity;
        this.obstruction = 0;
      } else {
        this.obstruction = distance + .005 < this.lastRange ? 0 : this.obstruction + dt;
        this.lastRange = distance;
        if (this.obstruction > 1.35) this.cancel();
      }
      this.desired.multiplyScalar(1 / Math.max(1, distance));
      if (!this.path.length) this.desired.set(0, 0);
    } else {
      this.desired.set(0, 0);
    }

    const speed = this.walkingRoute || walkHeld ? walkSpeed : sprintSpeed;
    this.desired.multiplyScalar(speed);
    if (this.falling) {
      this.gravity -= 14.3 * dt;
      this.position.y += this.gravity * dt;
      this.position.x += this.velocity.x * dt;
      this.position.z += this.velocity.y * dt;
      if (this.position.y < -7.7) {
        this.reset();
        return true;
      }
      return false;
    }

    const acceleration = this.desired.lengthSq() > .04 ? 12.4 : 15.1;
    this.velocity.lerp(this.desired, 1 - Math.exp(-acceleration * dt));
    if (this.velocity.lengthSq() < .001) this.velocity.set(0, 0);
    const px = this.position.x;
    const pz = this.position.z;
    const x = px + this.velocity.x * dt;
    const z = pz + this.velocity.y * dt;
    if (this.canMove(x, z)) {
      this.position.x = x;
      this.position.z = z;
    } else {
      if (this.canMove(x, pz)) this.position.x = x;
      if (this.canMove(this.position.x, z)) this.position.z = z;
    }
    const movedX = this.position.x - px;
    const movedZ = this.position.z - pz;
    if (Math.abs(movedX) + Math.abs(movedZ) > .0004) {
      const heading = Math.atan2(movedX, movedZ);
      const turn = Math.atan2(Math.sin(heading - this.heading), Math.cos(heading - this.heading));
      this.heading += turn * (1 - Math.exp(-dt * 14));
    } else if (this.desired.lengthSq() > .04) {
      this.velocity.multiplyScalar(.55);
    }

    if (shoreFraction(this.position.x, this.position.z) > 1.003) {
      this.falling = true;
      this.cancel();
    } else {
      this.position.y = heightAt(this.position.x, this.position.z);
    }
    return false;
  }

  private canMove(x: number, z: number) {
    const y = heightAt(x, z);
    return y > poolLevel - .19 && y - this.position.y < .27
      && !this.land.solid(x, z, footRadius, y + .04, y + 1.57);
  }
}
