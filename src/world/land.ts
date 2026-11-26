import { destinations } from '../destinations';
import type { Point } from '../destinations';

export const islandRadius = [26, 20] as const;
export const seaLevel = -15.4;
export const poolLevel = -.45;
export const pool: Point = [-16.4, 7.85];
export const spillAngle = 2.41;
export const footRadius = .32;

export function randomFrom(seed: number) {
  return () => {
    seed = (Math.imul(1664525, seed) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
}

export function rimRadius(angle: number) {
  return 1 + .074 * Math.sin(angle * 3 + .7) + .086 * Math.cos(angle * 5 - .58)
    + .031 * Math.sin(angle * 11 + .52) + .018 * Math.cos(angle * 19);
}

export function rimPoint(angle: number, fraction = 1): Point {
  const r = rimRadius(angle) * fraction;
  return [Math.cos(angle) * islandRadius[0] * r, Math.sin(angle) * islandRadius[1] * r];
}

export function shoreFraction(x: number, z: number) {
  const px = x / islandRadius[0];
  const pz = z / islandRadius[1];
  return Math.hypot(px, pz) / rimRadius(Math.atan2(pz, px));
}

function hill(x: number, z: number, center: Point, rx: number, rz: number) {
  return Math.exp(-(((x - center[0]) / rx) ** 2 + ((z - center[1]) / rz) ** 2));
}

export const spill = rimPoint(spillAngle);
const riverVector = [spill[0] - pool[0], spill[1] - pool[1]] as const;

function stream(x: number, z: number) {
  const t = Math.max(0, Math.min(1.1, ((x - pool[0]) * riverVector[0] + (z - pool[1]) * riverVector[1])
    / (riverVector[0] ** 2 + riverVector[1] ** 2)));
  const cx = pool[0] + riverVector[0] * t;
  const cz = pool[1] + riverVector[1] * t;
  return Math.exp(-((x - cx) ** 2 + (z - cz) ** 2) / 1.16);
}

export function heightAt(x: number, z: number) {
  const summit = hill(x, z, destinations.observatory.landmark, 7.1, 5.8) * 3.7;
  const launchRise = hill(x, z, destinations['pocket-orbit'].landmark, 5.3, 5.9) * 1.75;
  const ledge = hill(x, z, [-19.1, -5.7], 7.4, 5.5) * 1.15;
  const arcadeRise = hill(x, z, [15.6, 10], 6.8, 5.5) * .61;
  const channel = hill(x, z, pool, 3.9, 3.3) * 1.9 + stream(x, z) * .92;
  return .42 + Math.sin(x * .19 + z * .24) * .29 + Math.cos(z * .31 - x * .12) * .32
    + Math.sin(x * .36 + z * .18) * .15 + summit + launchRise + ledge + arcadeRise - channel;
}
