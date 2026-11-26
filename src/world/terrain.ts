import { BufferGeometry, Color, Float32BufferAttribute, Mesh, MeshStandardMaterial, Vector2 } from 'three';
import type { Group } from 'three';
import { routeBranches } from '../destinations';
import type { Point } from '../destinations';
import { colorAttribute } from './geometry';
import { heightAt, randomFrom, rimPoint, shoreFraction } from './land';

const TAU = Math.PI * 2;
const meadow = new Color('#3c6a59');
const sunlit = new Color('#828e58');
const heather = new Color('#41747a');
const bronze = new Color('#8d8052');
const bank = new Color('#74654f');

export function paintGround(x: number, z: number, color: Color) {
  const h = heightAt(x, z);
  const fleck = .41 + Math.sin(x * 1.37 + z * .64) * .07 + Math.cos(x * .43 - z * .77) * .15;
  color.copy(meadow).lerp(sunlit, fleck + Math.max(0, h) * .062);
  color.lerp(heather, Math.exp(-((x + 15) ** 2 + (z + 1) ** 2) / 54) * .59);
  color.lerp(bronze, Math.exp(-((x - 13) ** 2 + (z + 4) ** 2) / 39) * .77);
  color.lerp(bank, Math.max(0, (shoreFraction(x, z) - .83) * 3.4) + Math.max(0, -.5 - h) * .21);
  return color;
}

function grain(material: MeshStandardMaterial, strength: number, scale: number) {
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = 'varying vec3 terrainPoint;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>', '#include <begin_vertex>\nterrainPoint = position;');
    shader.fragmentShader = `
      varying vec3 terrainPoint;
      float earthHash(vec2 p) {
        vec3 q = fract(vec3(p.xyx) * .1031);
        q += dot(q, q.yzx + 33.33);
        return fract((q.x + q.y) * q.z);
      }
      float earthShade(vec2 p) {
        vec2 cell = floor(p);
        vec2 f = fract(p);
        f *= f * (3.0 - 2.0 * f);
        return mix(mix(earthHash(cell), earthHash(cell + vec2(1,0)), f.x),
          mix(earthHash(cell + vec2(0,1)), earthHash(cell + 1.0), f.x), f.y);
      }
    ` + shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
      vec2 groundUV = terrainPoint.xz + terrainPoint.y * vec2(.42, .86);
      vec2 gritUV = groundUV * ${scale.toFixed(2)};
      float sharpness = 1.0 - smoothstep(.42, 1.32, length(fwidth(gritUV)));
      float grit = (earthShade(gritUV) - .5) * sharpness;
      float coarse = earthShade(groundUV * .83 + 4.0) - .5;
      diffuseColor.rgb *= 1.0 + grit * ${strength.toFixed(2)} + coarse * .18;`,
    );
  };
  material.customProgramCacheKey = () => `ground-${strength}-${scale}`;
}

function surfaceGeometry() {
  const rings = 37;
  const segments = 144;
  const positions: number[] = [0, heightAt(0, 0), 0];
  const colors = [paintGround(0, 0, new Color())];
  const faces: number[] = [];
  for (let row = 1; row <= rings; row++) {
    for (let col = 0; col < segments; col++) {
      const point = rimPoint((col + (row % 2) * .5 * (row < rings ? 1 : 0)) / segments * TAU, row / rings);
      const [x, z] = point;
      positions.push(x, heightAt(x, z), z);
      colors.push(paintGround(x, z, new Color()));
      const here = 1 + (row - 1) * segments + col;
      const next = 1 + (row - 1) * segments + (col + 1) % segments;
      if (row === 1) faces.push(0, next, here);
      else faces.push(here - segments, next, here, here - segments, next - segments, next);
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', colorAttribute(colors));
  geometry.setIndex(faces);
  geometry.computeVertexNormals();
  return geometry;
}

function rockGeometry(segments: number, scale: number, centerX: number, centerY: number, centerZ: number) {
  const widths = [1, 1, .96, .985, .83, .765, .63, .34, .035, 0];
  const depths = [0, -.65, -2.1, -3.05, -4.65, -6.6, -8.65, -11.9, -13.3, -13.82];
  const palette = ['#746e56', '#695451', '#635569', '#937364', '#594e66', '#484656', '#63536b', '#45415a', '#4b4357', '#3c384e'].map((color) => new Color(color));
  const positions: number[] = [];
  const colors: Color[] = [];
  const faces: number[] = [];
  for (let row = 0; row < depths.length; row++) {
    for (let col = 0; col < segments; col++) {
      const a = col / segments * TAU;
      const large = Math.sin(a * 5 + row * .59) * .67 + Math.cos(a * 13 - .9) * .22;
      const cracks = Math.sin(a * 39 + .4) * .2 + Math.cos(a * 49) * .12;
      const fold = row > 0 && row < 9 ? (large + cracks) * (.031 + row * .003) : 0;
      const [x, z] = rimPoint(a, widths[row] + fold);
      const [edgeX, edgeZ] = rimPoint(a);
      const strata = row > 0 ? Math.sin(a * 4 + .6) * .55 + large * .44 : 0;
      positions.push(
        centerX + (x - row * row * .025) * scale,
        centerY + (depths[row] + heightAt(edgeX, edgeZ) / (1 + row * .18) + strata) * scale,
        centerZ + (z + row * row * .022) * scale,
      );
      colors.push(palette[row].clone().multiplyScalar(.87 + large * .10 + cracks * .44));
      if (row > 0) {
        const here = row * segments + col;
        const next = row * segments + (col + 1) % segments;
        faces.push(here - segments, next, here, here - segments, next - segments, next);
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', colorAttribute(colors));
  geometry.setIndex(faces);
  const facets = geometry.toNonIndexed();
  geometry.dispose();
  facets.computeVertexNormals();
  return facets;
}

function smoothBranch(branch: readonly Point[]) {
  const points: Vector2[] = [];
  for (let i = 0; i < branch.length - 1; i++) {
    const [ax, az] = branch[Math.max(0, i - 1)];
    const [bx, bz] = branch[i];
    const [cx, cz] = branch[i + 1];
    const [dx, dz] = branch[Math.min(branch.length - 1, i + 2)];
    const steps = Math.ceil(Math.hypot(cx - bx, cz - bz) * 4);
    for (let j = 0; j < steps; j++) {
      const t = j / steps;
      const interpolate = (a: number, b: number, c: number, d: number) =>
        .5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t
          + (-a + 3 * b - 3 * c + d) * t * t * t);
      points.push(new Vector2(interpolate(ax, bx, cx, dx), interpolate(az, bz, cz, dz)));
    }
  }
  points.push(new Vector2(...branch[branch.length - 1]));
  return points;
}

export const paths = routeBranches.map(smoothBranch);
const pathTint = new Color('#b89f71');
const trailCore = new Color('#c7af84');

function trails() {
  const positions: number[] = [];
  const colors: Color[] = [];
  const indices: number[] = [];
  const across = [-1, -.79, -.32, .19, .8, 1];
  const random = randomFrom(19309);
  for (const [pathIndex, track] of paths.entries()) {
    const start = positions.length / 3;
    const pathWidth = pathIndex === 0 ? .94 : .66;
    for (const [i, point] of track.entries()) {
      const prior = track[Math.max(0, i - 1)];
      const next = track[Math.min(track.length - 1, i + 1)];
      const perpendicular = new Vector2(next.y - prior.y, prior.x - next.x).normalize();
      const width = pathWidth * (.9 + .11 * Math.sin(i * .32) + .13 * random());
      const fade = Math.min(1, (i + 2) / 5, (track.length - i) / 7);
      for (const [j, side] of across.entries()) {
        const x = point.x + perpendicular.x * side * width;
        const z = point.y + perpendicular.y * side * width;
        positions.push(x, heightAt(x, z) + .041 + .003 * pathIndex, z);
        const blend = Math.abs(side) > .99 ? .02 : Math.min(1, (1 - Math.abs(side)) * 1.95);
        colors.push(paintGround(x, z, new Color()).lerp(j % 2 === 0 ? pathTint : trailCore, blend * fade)
          .multiplyScalar(.9 + random() * .2));
      }
      if (i === 0) continue;
      for (let j = 1; j < across.length; j++) {
        const here = start + i * across.length + j;
        const prev = here - across.length;
        indices.push(prev - 1, here - 1, here, prev - 1, here, prev);
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', colorAttribute(colors));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function buildTerrain(root: Group) {
  const meadowMaterial = new MeshStandardMaterial({ vertexColors: true, roughness: 1 });
  grain(meadowMaterial, .23, 6.2);
  const top = new Mesh(surfaceGeometry(), meadowMaterial);
  top.receiveShadow = true;
  top.castShadow = true;
  root.add(top);

  const cliffMaterial = new MeshStandardMaterial({ vertexColors: true, roughness: .96 });
  grain(cliffMaterial, .31, 3.6);
  const cliff = new Mesh(rockGeometry(144, 1, 0, 0, 0), cliffMaterial);
  cliff.receiveShadow = true;
  cliff.castShadow = true;
  root.add(cliff);

  const pathMaterial = new MeshStandardMaterial({ vertexColors: true, roughness: .92 });
  grain(pathMaterial, .39, 15.6);
  const path = new Mesh(trails(), pathMaterial);
  path.receiveShadow = true;
  root.add(path);

  for (const [x, y, z, scale] of [
    [-72, -3, -90, .38], [-46, -6, -84, .22], [49, -4, -93, .32], [75, -1.5, -138, .44],
    [89, -7, -67, .17], [-89, -5.2, -65, .29],
  ]) {
    root.add(new Mesh(rockGeometry(48, scale, x, y, z), cliffMaterial));
    const farMeadow = new Mesh(top.geometry, meadowMaterial);
    farMeadow.position.set(x, y, z);
    farMeadow.scale.setScalar(scale);
    root.add(farMeadow);
  }
}
