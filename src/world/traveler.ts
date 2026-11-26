import {
  CapsuleGeometry, Color, Group, Mesh, PlaneGeometry, ShaderMaterial, SphereGeometry,
  Vector3,
} from 'three';
import { box, column, lanternMaterial, solid, standard, volume } from './geometry';
import { heightAt } from './land';

function child(parent: Group, x: number, y: number, z: number) {
  const group = new Group();
  group.position.set(x, y, z);
  parent.add(group);
  return group;
}

export function createTraveler() {
  const root = new Group();
  const rig = child(root, 0, 0, 0);
  const ink = standard('#343a48');
  const jacket = standard('#6b8181');
  const lining = standard('#def0db');
  const linen = standard('#dcbb87');
  const leather = standard('#835a4d');
  const coral = standard('#c8654e');
  const latch = lanternMaterial(0xeab86e, .36);
  const visor = standard('#3e6076', .32, .24);

  const coat = column(rig, jacket, .28, .37, .66, 0, .94, 0, 9);
  coat.scale.z = .73;
  const collar = column(rig, linen, .21, .27, .19, 0, 1.25, 0, 12);
  collar.scale.z = .86;
  const face = solid(rig, new SphereGeometry(.242, 20, 13), linen, 0, 1.46, .027);
  face.scale.set(1.05, 1.10, 1);
  const helmet = solid(rig, new SphereGeometry(.264, 22, 13, 0, Math.PI * 2, 0, Math.PI * .62),
    jacket, 0, 1.48, 0);
  helmet.scale.set(1.09, 1.12, 1.06);
  const goggles = solid(rig, new SphereGeometry(.231, 18, 11), ink, 0, 1.45, .126);
  goggles.scale.set(.91, .52, .59);
  for (const side of [-1, 1]) {
    const lens = solid(rig, new SphereGeometry(.083, 11, 8), visor, side * .099, 1.46, .228);
    lens.scale.set(1.14, 1, .48);
    const shine = solid(rig, new SphereGeometry(.026, 9, 7), lining, side * .095 - .019, 1.489, .256);
    shine.scale.z = .29;
    const cup = column(rig, leather, .087, .087, .042, side * .25, 1.46, -.04);
    cup.rotation.z = Math.PI / 2;
  }

  column(rig, coral, .23, .24, .10, 0, 1.278, 0, 13);
  const scarf = child(rig, -.17, 1.27, -.15);
  scarf.rotation.y = .13;
  const fabric = volume(scarf, coral, [[0, 0], [-.11, .026], [-.33, -.11], [-.47, -.076], [-.54, -.15],
    [-.36, -.23], [-.15, -.095], [0, -.065]], .032);
  const roll = solid(rig, new CapsuleGeometry(.18, .31, 5, 11), leather, 0, 1.01, -.22);
  roll.scale.set(1.12, .83, .64);
  column(rig, ink, .14, .14, .39, 0, 1.21, -.26, 11).rotation.z = Math.PI / 2;
  for (const x of [-.127, .127]) box(rig, linen, .064, .41, .065, x, 1.02, -.343);
  box(rig, latch, .12, .13, .053, .02, .99, -.35);
  box(rig, latch, .14, .135, .07, .034, 1.05, .21);
  box(rig, ink, .49, .091, .38, 0, .688, 0);

  const limbs = (side: number) => {
    const leg = child(rig, side * .163, .66, 0);
    const sleeve = child(rig, side * .264, 1.135, .0);
    sleeve.rotation.z = side * .19;
    solid(leg, new CapsuleGeometry(.081, .36, 4, 8), ink, 0, -.23, 0);
    const shoe = solid(leg, new SphereGeometry(.128, 13, 8), leather, 0, -.53, .073);
    shoe.scale.set(.77, .73, 1.42);
    solid(sleeve, new CapsuleGeometry(.086, .22, 4, 9), jacket, side * .047, -.16, 0);
    solid(sleeve, new SphereGeometry(.074, 11, 7), linen, side * .059, -.326, .017);
    return { leg, arm: sleeve };
  };
  const left = limbs(-1);
  const right = limbs(1);

  root.traverse((object) => {
    if (object instanceof Mesh) {
      object.castShadow = false;
      object.receiveShadow = false;
    }
  });
  const shadow = new Mesh(new PlaneGeometry(2.7, 2.7), new ShaderMaterial({
    uniforms: { opacity: { value: .5 }, tint: { value: new Color('#201c28') } },
    transparent: true, depthWrite: false, toneMapped: false,
    vertexShader: `
      varying vec2 coords;
      void main() {
        coords = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float opacity;
      uniform vec3 tint;
      varying vec2 coords;
      void main() {
        float radius = length((coords - .5) * vec2(2.2, 2.6));
        gl_FragColor = vec4(tint, opacity * (1.0 - smoothstep(.13, .87, radius)));
        #include <colorspace_fragment>
      }
    `,
  }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = .044;
  root.add(shadow);
  const planeNormal = new Vector3(0, 0, 1);
  const groundNormal = new Vector3();
  let step = 0;

  return {
    root,
    update(position: Vector3, heading: number, pace: number, dt: number, reduced: boolean, falling: boolean) {
      root.position.copy(position);
      rig.rotation.y = heading;
      step += dt * 9.8 * pace;
      const swing = Math.sin(step) * pace;
      left.leg.rotation.x = swing * .57;
      right.leg.rotation.x = -swing * .57;
      left.arm.rotation.x = -swing * .44;
      right.arm.rotation.x = swing * .44;
      rig.position.y = reduced ? 0 : Math.abs(swing) * .075;
      fabric.rotation.z = reduced ? 0 : Math.sin(step * .81 + .7) * pace * .22;
      scarf.rotation.x = reduced ? 0 : -.22 - Math.abs(swing) * .21;
      shadow.visible = !falling;
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
