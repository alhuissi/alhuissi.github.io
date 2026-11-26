import { Box3, Mesh, Vector3 } from 'three';
import type { Group, Material } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { disposeScene } from '../runtime/resources';

const shaderFields = ['vertexShader', 'fragmentShader'] as const;

type MaterialFinish = {
  depthWrite: boolean;
  toneMapped: boolean;
  look?: {
    key: string;
    patches: Record<(typeof shaderFields)[number], [string, string][]>;
    uniforms: Record<string, number>;
  };
};

function restoreMaterials(model: Group) {
  const restored = new Set<Material>();
  model.traverse((part) => {
    if (!(part instanceof Mesh)) return;
    const instance = part.userData.pocketOrbit;
    if (instance) {
      part.renderOrder = instance.renderOrder;
      part.castShadow = instance.castShadow;
      part.receiveShadow = instance.receiveShadow;
    }
    // glTF prefixes custom vertex attributes with an underscore.
    const paint = part.geometry.getAttribute('_apaint');
    if (paint) part.geometry.setAttribute('aPaint', paint);
    const materials: Material[] = Array.isArray(part.material) ? part.material : [part.material];
    for (const material of materials) {
      if (restored.has(material)) continue;
      restored.add(material);
      const finish = material.userData.pocketOrbit as MaterialFinish | undefined;
      if (!finish) continue;
      material.depthWrite = finish.depthWrite;
      material.toneMapped = finish.toneMapped;
      const look = finish.look;
      if (!look) continue;
      // The exported shader chunks preserve the game's coordinate-dependent livery and glass.
      material.onBeforeCompile = (shader) => {
        for (const field of shaderFields) {
          for (const [chunk, replacement] of look.patches[field]) {
            shader[field] = shader[field].replace(chunk, replacement);
          }
        }
        for (const [name, value] of Object.entries(look.uniforms)) shader.uniforms[name] = { value };
      };
      material.customProgramCacheKey = () => look.key;
    }
  });
}

export function addPocketOrbitShuttle(pad: Group, onReady: () => void) {
  const island = pad.parent;
  if (!island?.parent) return;
  new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load('./island-media/pocket-orbit-shuttle.glb', ({ scene: model }) => {
    if (!island.parent) {
      disposeScene(model);
      return;
    }
    restoreMaterials(model);
    model.name = 'Pocket Orbit household shuttle';
    model.rotation.y = -.69;
    const bounds = new Box3().setFromObject(model, true);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const scale = 4.61 / Math.max(size.x, size.z);
    model.scale.setScalar(scale);
    model.position.set(-center.x * scale, .267 - bounds.min.y * scale, -center.z * scale);
    pad.add(model);
    onReady();
  });
}
