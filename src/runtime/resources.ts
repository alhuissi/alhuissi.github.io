import { BufferGeometry, Material, Mesh, ShaderMaterial, Texture } from 'three';
import type { Object3D } from 'three';

export function disposeScene(root: Object3D) {
  const geometries = new Set<BufferGeometry>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();
  root.traverse((object) => {
    if ('geometry' in object && object.geometry instanceof BufferGeometry) geometries.add(object.geometry);
    if (object instanceof Mesh && 'instanceMatrix' in object && 'dispose' in object && typeof object.dispose === 'function') {
      object.dispose();
    }
    if (!('material' in object)) return;
    const list: unknown[] = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of list) {
      if (!(material instanceof Material)) continue;
      materials.add(material);
      for (const value of Object.values(material)) {
        if (value instanceof Texture) textures.add(value);
      }
      if (material instanceof ShaderMaterial) {
        for (const uniform of Object.values(material.uniforms)) {
          if (uniform.value instanceof Texture) textures.add(uniform.value);
        }
      }
    }
  });
  for (const texture of textures) texture.dispose();
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  root.clear();
}
