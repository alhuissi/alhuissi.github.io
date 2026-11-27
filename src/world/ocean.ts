import {
  AdditiveBlending, CanvasTexture, Color, Group, PlaneGeometry, RepeatWrapping, ShaderMaterial, Sprite, SpriteMaterial,
  TextureLoader, Vector3,
} from 'three';
import type { Object3D } from 'three';
import { Water } from 'three/addons/objects/Water.js';
import type { WorldClock } from './atmosphere';
import { horizonColor, noise } from './atmosphere';
import { seaLevel } from './land';

// The Dream Ocean itself, far below the island: the game's Citryan-quality surface (three's
// mirrored Water with its ripple normal map) carrying the Dream Ocean current, the cyan, violet,
// magenta, indigo and gold bands that drift through every sea in the game.
const palette = {
  cyan: '#27cfe3', violet: '#676bdb', magenta: '#bd4f91', indigo: '#172b78', gold: '#d6aa63',
};

// Built on use: ocean and atmosphere import each other.
const current = () => /* glsl */ `
  uniform vec3 uDreamOceanCyan;
  uniform vec3 uDreamOceanViolet;
  uniform vec3 uDreamOceanMagenta;
  uniform vec3 uDreamOceanIndigo;
  uniform vec3 uDreamOceanGold;
  uniform float uDreamOceanBandScale;
  uniform float uDreamOceanTint;
  uniform float uDreamOceanGlint;
  uniform float clock;
  uniform vec3 uSplash[5];
  ${noise}
  ${horizonColor}


  vec3 applyDreamOceanColor(vec3 baseColor, vec3 p, float t) {
    // Meander the currents so their crests curl instead of ruling straight lines across the sea.
    p.xz += (vec2(layers(p.xz * .018 + t * .02), layers(p.xz * .018 - 9.0 - t * .015)) - .5) * 46.0;
    float warp = sin((p.x + p.z) * 0.006 + t * 0.09) * 1.35;
    float a = sin((p.x * 0.018 + p.z * 0.035) * uDreamOceanBandScale + t * 0.31 + warp) * 0.5 + 0.5;
    float b = sin((p.x * -0.041 + p.z * 0.016) * uDreamOceanBandScale + t * 0.23 - warp * 0.7) * 0.5 + 0.5;
    float c = sin((p.x * 0.029 + p.z * -0.052) * uDreamOceanBandScale + t * 0.17 + 1.7 + warp * 0.4) * 0.5 + 0.5;
    float d = sin((p.x * 0.061 + p.z * 0.024) * uDreamOceanBandScale - t * 0.27 + 4.1) * 0.5 + 0.5;
    float grain = sin(p.x * 0.13 - p.z * 0.09 + t * 0.38) * 0.5 + 0.5;
    float glint = smoothstep(0.94, 1.0, a) * 0.18;
    vec3 cool = mix(uDreamOceanCyan, uDreamOceanViolet, smoothstep(0.18, 0.88, b));
    vec3 warm = mix(uDreamOceanMagenta, uDreamOceanGold, smoothstep(0.34, 0.96, a));
    vec3 tint = mix(cool, warm, smoothstep(0.42, 0.94, c));
    tint = mix(tint, mix(uDreamOceanIndigo, uDreamOceanCyan, d), 0.18 + d * 0.14);
    float flow = smoothstep(0.18, 0.92, max(max(a, c), d));
    float wash = uDreamOceanTint * (0.12 + flow * 0.34) * (0.72 + grain * 0.28);
    vec3 color = mix(baseColor, tint, wash);
    color += uDreamOceanGold * glint * uDreamOceanGlint * .35;
    color += uDreamOceanCyan * smoothstep(0.9, 1.0, a) * 0.008;
    color += uDreamOceanMagenta * smoothstep(0.94, 1.0, d) * 0.005;
    return color;
  }
`;

function foamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const context = canvas.getContext('2d')!;
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,.9)');
  gradient.addColorStop(.5, 'rgba(255,255,255,.3)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  return new CanvasTexture(canvas);
}

/**
 * @param rich mirror reflections (a second scene render, every other frame); lighter devices
 *   keep the same current and ripples without the mirror.
 * @param splashes where each of the island's waterfalls lands.
 */
export function buildOcean(root: Group, clock: WorldClock, rich: boolean, splashes: Vector3[], moon: Vector3) {
  const normals = new TextureLoader().load(new URL('./island-media/water-normals.jpg', document.baseURI).href);
  normals.wrapS = normals.wrapT = RepeatWrapping;
  const water = new Water(new PlaneGeometry(1400, 1400), {
    textureWidth: rich ? 512 : 4,
    textureHeight: rich ? 512 : 4,
    waterNormals: normals,
    sunDirection: moon.clone().normalize(),
    sunColor: '#5a66a0',
    waterColor: '#04122a',
    distortionScale: 3.2,
    alpha: 1,
    fog: false,
  });
  water.name = 'Dream Ocean';
  water.rotation.x = -Math.PI / 2;
  water.position.y = seaLevel;
  water.receiveShadow = true;
  const material = water.material as ShaderMaterial;
  material.uniforms.size.value = 2.6;
  const extra = {
    uDreamOceanCyan: { value: new Color(palette.cyan) },
    uDreamOceanViolet: { value: new Color(palette.violet) },
    uDreamOceanMagenta: { value: new Color(palette.magenta) },
    uDreamOceanIndigo: { value: new Color(palette.indigo) },
    uDreamOceanGold: { value: new Color(palette.gold) },
    uDreamOceanBandScale: { value: 3.2 },
    uDreamOceanTint: { value: .46 },
    uDreamOceanGlint: { value: 1 },
    clock,
    uSplash: { value: splashes.slice(0, 5) },
    uReflect: { value: rich ? 1 : 0 },
  };
  Object.assign(material.uniforms, extra);
  material.fragmentShader = material.fragmentShader
    .replace('void main() {', `${current()}\n uniform float uReflect;\n void main() {`)
    .replace('vec3 reflectionSample = vec3(', 'vec3 reflectionSample = uReflect * vec3(')
    .replace('#include <tonemapping_fragment>', /* glsl */ `
      vec3 p = worldPosition.xyz;
      // Lighter devices have no mirror; the night horizon stands in for it.
      vec3 mirrored = reflect(-eyeDirection, surfaceNormal);
      mirrored.y = abs(mirrored.y);
      vec3 sky = nightHorizon(mirrored, clock);
      vec3 base = mix(gl_FragColor.rgb, gl_FragColor.rgb + sky * reflectance * 1.6, 1.0 - uReflect * .6);
      vec3 color = applyDreamOceanColor(base, p + vec3(surfaceNormal.x, 0.0, surfaceNormal.z) * 2.6, time * .55);
      // White water and rings where each waterfall lands.
      float churn = layers(p.xz * .7 + time * .4);
      for (int i = 0; i < 5; i++) {
        float r = length(p.xz - uSplash[i].xz);
        float rings = .5 + .5 * sin(r * 2.6 - time * 3.2 + surfaceNormal.x * 3.0);
        float foam = exp(-r * .42) * (.55 + .45 * rings) * smoothstep(.25, .7, churn + exp(-r * .8));
        color += vec3(.55, .72, .85) * foam * 1.6;
      }
      // Far water melts into the same horizon as the sky.
      float haze = smoothstep(140.0, 560.0, distance);
      color = mix(color, nightHorizon(-eyeDirection, clock), haze);
      // The island's moon shadow lands far below it, which is what shows how high it floats.
      color *= mix(.32, 1.0, getShadowMask());
      gl_FragColor = vec4(color, 1.0);
      #include <tonemapping_fragment>`);
  material.needsUpdate = true;
  root.add(water);

  // The mirror is a second render of the island; refresh it every other frame.
  if (rich) {
    const mirror = water.onBeforeRender;
    let frame = 0;
    water.onBeforeRender = function (...args: Parameters<Object3D['onBeforeRender']>) {
      if ((frame++ & 1) === 0) mirror.apply(this, args);
    };
  } else {
    water.onBeforeRender = () => {};
  }

  // Spray and mist billowing where each fall strikes the sea.
  const texture = foamTexture();
  const spray = splashes.flatMap((splash) => Array.from({ length: 9 }, (_, i) => {
    const sprite = new Sprite(new SpriteMaterial({
      map: texture, color: '#bcd6ff', transparent: true, depthWrite: false, toneMapped: false,
      blending: AdditiveBlending, opacity: 0,
    }));
    root.add(sprite);
    return { sprite, splash, phase: i / 9 };
  }));

  return () => {
    material.uniforms.time.value = clock.value;
    const t = clock.value;
    for (const puff of spray) {
      const age = (t * .22 + puff.phase) % 1;
      const angle = puff.phase * 41.3;
      const spread = 1 + age * 5.5;
      puff.sprite.position.set(puff.splash.x + Math.cos(angle) * spread, seaLevel + .6 + age * 6.5,
        puff.splash.z + Math.sin(angle) * spread);
      puff.sprite.scale.setScalar(3 + age * 9);
      puff.sprite.material.opacity = Math.sin(age * Math.PI) * .2;
    }
  };
}
