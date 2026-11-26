import {
  BoxGeometry, BufferGeometry, Color, CylinderGeometry, ExtrudeGeometry, Float32BufferAttribute,
  Group, Mesh, MeshStandardMaterial, Shape,
} from 'three';
import type { Material, Object3D } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export const standard = (color: string | number, roughness = .83, metalness = 0) =>
  new MeshStandardMaterial({ color, roughness, metalness });

export function lanternMaterial(color: number, intensity = .75) {
  return new MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity, roughness: .52 });
}

export function solid(parent: Object3D, geometry: BufferGeometry, material: Material,
  x = 0, y = 0, z = 0) {
  const mesh = new Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.bake = true;
  parent.add(mesh);
  return mesh;
}

export function box(parent: Object3D, material: Material, width: number, height: number, depth: number,
  x: number, y: number, z: number) {
  return solid(parent, new BoxGeometry(width, height, depth), material, x, y, z);
}

export function column(parent: Object3D, material: Material, top: number, bottom: number, height: number,
  x: number, y: number, z: number, sides = 10) {
  return solid(parent, new CylinderGeometry(top, bottom, height, sides), material, x, y, z);
}

export function volume(parent: Object3D, material: Material, outline: readonly (readonly [number, number])[],
  depth: number, x = 0, y = 0, z = 0, bevel = 0) {
  const shape = new Shape();
  outline.forEach(([px, py], index) => index ? shape.lineTo(px, py) : shape.moveTo(px, py));
  shape.closePath();
  const geometry = new ExtrudeGeometry(shape, { depth, bevelEnabled: bevel > 0, bevelSize: bevel,
    bevelThickness: bevel, bevelSegments: 1, steps: 1 });
  return solid(parent, geometry, material, x, y, z - depth / 2);
}

export const colorAttribute = (colors: Color[]) => new Float32BufferAttribute(
  colors.flatMap((color) => [color.r, color.g, color.b]), 3);

export function bakeSolids(root: Group) {
  root.updateMatrixWorld(true);
  const batches = new Map<string, { material: Material; sources: Mesh[]; geometries: BufferGeometry[] }>();
  root.traverse((object) => {
    if (!(object instanceof Mesh) || !object.userData.bake || Array.isArray(object.material)) return;
    const material = object.material;
    const key = material.uuid;
    if (!batches.has(key)) batches.set(key, { material, sources: [], geometries: [] });
    const bucket = batches.get(key)!;
    const geometry = object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone();
    geometry.applyMatrix4(object.matrixWorld);
    bucket.sources.push(object);
    bucket.geometries.push(geometry);
  });

  for (const { material, sources, geometries } of batches.values()) {
    const merged = mergeGeometries(geometries);
    for (const geometry of geometries) geometry.dispose();
    if (!merged) continue;
    for (const source of sources) {
      source.geometry.dispose();
      source.removeFromParent();
    }
    const mesh = new Mesh(merged, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
  }
}
