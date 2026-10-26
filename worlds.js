import * as THREE from 'three';
import { Lensflare, LensflareElement } from 'three/addons/objects/Lensflare.js';
const host=document.querySelector('#world-canvas');
const card=document.querySelector('.world-stage');
if(!host||!card)throw Error('No stage');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse=matchMedia('(pointer: coarse)').matches;
const mobile=innerWidth<720;
const status=document.querySelector('#world-status');
const renderer=new THREE.WebGLRenderer({alpha:true,antialias:!mobile,powerPreference:'low-power'});
renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.35:1.8));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.25;
host.append(renderer.domElement);
renderer.domElement.setAttribute('aria-hidden','true');
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.1,100);
camera.position.set(0,.45,12.6);
const universe=new THREE.Group();scene.add(universe);
const light=new THREE.DirectionalLight(0xf2e8d7,2.9);light.position.set(-4,5,8);scene.add(light);
scene.add(new THREE.AmbientLight(0x7096b2,.7));
const blueLight=new THREE.PointLight(0x76cde2,14,13);blueLight.position.set(5,0,3);scene.add(blueLight);
const orangeLight=new THREE.PointLight(0xf9b66f,14,13);orangeLight.position.set(-5,-2,3);scene.add(orangeLight);
function glowTexture(){
 const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;
 const ctx=canvas.getContext('2d');const g=ctx.createRadialGradient(64,64,1,64,64,64);
 g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.12,'rgba(255,255,255,.78)');g.addColorStop(.32,'rgba(255,255,255,.22)');g.addColorStop(1,'rgba(255,255,255,0)');
 ctx.fillStyle=g;ctx.fillRect(0,0,128,128);return new THREE.CanvasTexture(canvas);
}
const glowMap=glowTexture();
function glow(col,size,opacity=1){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:glowMap,color:col,transparent:true,opacity,blending:THREE.AdditiveBlending,depthWrite:false}));s.scale.set(size,size,1);return s;}
const flare=new Lensflare();
flare.addElement(new LensflareElement(glowMap,.9,0,new THREE.Color(0xffe9bf)));
flare.addElement(new LensflareElement(glowMap,.22,.35,new THREE.Color(0x8bc5e6)));
flare.addElement(new LensflareElement(glowMap,.38,.65,new THREE.Color(0xf6c9a0)));
const flareLight=new THREE.PointLight(0xffd8aa,8,9);flareLight.position.set(.35,-.2,.4);flareLight.add(flare);universe.add(flareLight);
const palette=[0xb0d4da,0xd4ead7,0xf7d8b3];
function seeded(n){let x=Math.sin(n*127.1+78.23)*43758.5453123;return x-Math.floor(x)}
const points=[];for(let i=0;i<(mobile?340:680);i++){
 const r=15*Math.cbrt(seeded(i+1));const a=seeded(i+117)*Math.PI*2;const b=Math.acos(2*seeded(i+221)-1);
 points.push(r*Math.sin(b)*Math.cos(a),r*Math.sin(b)*Math.sin(a),r*Math.cos(b)-3);
}
const geom=new THREE.BufferGeometry();geom.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
const stars=new THREE.Points(geom,new THREE.PointsMaterial({color:0xb6c7d9,size:.021,sizeAttenuation:true,transparent:true,opacity:.65,depthWrite:false}));scene.add(stars);
function material(type){return new THREE.MeshStandardMaterial({color:type==='dream'?0x283b53:0x779b69,roughness:1,metalness:.05,flatShading:true});}
function planet(type,r,position){
 const group=new THREE.Group();group.position.copy(position);universe.add(group);
 const globe=new THREE.Mesh(new THREE.IcosahedronGeometry(r,5),material(type));group.add(globe);
 const rnd=seeded;const areas=type==='dream'?[
 {col:0x425878,a:.2,b:.7,scale:.43},{col:0x446279,a:2.1,b:2.9,scale:.51},{col:0x263a58,a:4.6,b:2.2,scale:.29}]:[
 {col:0xb3b783,a:.6,b:.3,scale:.44},{col:0xabc68d,a:3.2,b:1.8,scale:.49},{col:0x4f8969,a:4.7,b:2.6,scale:.3}];
 for(let j=0;j<areas.length;j++){
  const patch=areas[j];const center=new THREE.Vector3(Math.sin(patch.b)*Math.cos(patch.a),Math.cos(patch.b),Math.sin(patch.b)*Math.sin(patch.a));
  const cap=new THREE.Mesh(new THREE.SphereGeometry(r*1.007,32,16,0,Math.PI*2,0,Math.PI*patch.scale),new THREE.MeshStandardMaterial({color:patch.col,roughness:1,flatShading:true,side:THREE.DoubleSide}));
  cap.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),center);group.add(cap);
 }
 if(type==='dream'){
  const halo=new THREE.Mesh(new THREE.TorusGeometry(r*1.34,.018,8,160),new THREE.MeshBasicMaterial({color:0xa3cce1,transparent:true,opacity:.56}));
  halo.rotation.x=.8;halo.rotation.y=.45;group.add(halo);
  const halo2=new THREE.Mesh(new THREE.TorusGeometry(r*1.39,.007,6,160),new THREE.MeshBasicMaterial({color:0xfbdcbc,transparent:true,opacity:.45}));
  halo2.rotation.x=.84;halo2.rotation.y=.45;group.add(halo2);
  const aura=glow(0x6196c7,r*4.1,.2);group.add(aura);
  for(let i=0;i<16;i++){const t=i/16*6.283;const p=new THREE.Mesh(new THREE.OctahedronGeometry(.018+(i%4)*.007,0),new THREE.MeshBasicMaterial({color:i%3?0xb0c6de:0xffd8a0}));p.position.set(Math.cos(t)*r*1.42,Math.sin(t)*r*.72,Math.sin(t)*r*.95);group.add(p);}
 }else{
  const ring=new THREE.Mesh(new THREE.TorusGeometry(r*1.31,.13,4,88),new THREE.MeshStandardMaterial({color:0xe4c7a2,roughness:.75,metalness:.1,side:THREE.DoubleSide,transparent:true,opacity:.8}));
  ring.rotation.x=1.12;ring.rotation.y=.2;group.add(ring);
  const aura=glow(0xb6d99f,r*3.8,.16);group.add(aura);
  for(let i=0;i<23;i++){
   const phi=Math.acos(2*rnd(330+i)-1),theta=rnd(i+567)*Math.PI*2;
   const v=new THREE.Vector3(Math.sin(phi)*Math.cos(theta),Math.cos(phi),Math.sin(phi)*Math.sin(theta));
   const p=new THREE.Mesh(new THREE.ConeGeometry(.037+rnd(i+900)*.045,.095+rnd(i+600)*.09,5),new THREE.MeshStandardMaterial({color:0x315a48,roughness:1,flatShading:true}));
   p.position.copy(v.clone().multiplyScalar(r+.04));p.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v);group.add(p);
  }
 }
 return group;
}
const dream=planet('dream',1.25,new THREE.Vector3(-2.15,.52,0));
const orbit=planet('orbit',.86,new THREE.Vector3(2.85,-.72,.6));
const beacon=glow(0xf5ceaa,.82,.85);beacon.position.set(.35,-.2,.4);universe.add(beacon);
const c=new THREE.Mesh(new THREE.IcosahedronGeometry(.055,1),new THREE.MeshBasicMaterial({color:0xffe4ac}));c.position.copy(beacon.position);universe.add(c);
const lines=[];
function arc(start,end,radius,color,opacity){
 const mid=start.clone().lerp(end,.5);mid.z+=radius;
 const curve=new THREE.QuadraticBezierCurve3(start,mid,end);
 const mesh=new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(96)),new THREE.LineBasicMaterial({color,transparent:true,opacity}));universe.add(mesh);lines.push(mesh);
}
arc(new THREE.Vector3(-.82,.2,.05),new THREE.Vector3(.33,-.2,.45),.4,0xe5c798,.56);
arc(new THREE.Vector3(.33,-.2,.45),new THREE.Vector3(1.95,-.56,.4),.65,0x92c9b9,.51);
for(let i=0;i<9;i++){const s=glow(i%3===0?0xfde2b3:0x83bad7,.06+i%3*.04,.5);s.position.set((seeded(i+30)-.5)*10,(seeded(i+50)-.5)*4.8,(seeded(i+60)-.5)*3);universe.add(s);}
let pointer={x:0,y:0},time=0,active=true,frame=0;
function size(){const w=card.clientWidth,h=card.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.z=(w<600?17:w<940?15:12.6);camera.updateProjectionMatrix();}
size();new ResizeObserver(size).observe(card);
card.addEventListener('pointermove',e=>{if(coarse)return;const b=card.getBoundingClientRect();pointer.x=(e.clientX-b.left)/b.width-.5;pointer.y=(e.clientY-b.top)/b.height-.5;},{passive:true});
card.addEventListener('pointerleave',()=>{pointer.x=0;pointer.y=0;});
const observer=new IntersectionObserver(es=>{active=es[0]?.isIntersecting??false;},{threshold:.03});observer.observe(card);
let last=0;
function tick(t){requestAnimationFrame(tick);if(!active||document.hidden)return;if(t-last<(mobile?33:16))return;last=t;
 if(!reduce)time+=.008;
 const smooth=.035;
 universe.rotation.y+=(pointer.x*.19-universe.rotation.y)*smooth;
 universe.rotation.x+=(-pointer.y*.12-universe.rotation.x)*smooth;
 dream.rotation.y+=reduce?0:.0017;dream.rotation.z+=reduce?0:.00035;
 orbit.rotation.y+=reduce?0:.0028;orbit.rotation.z+=reduce?0:.0005;
 if(!reduce){dream.position.y=.52+Math.sin(time*.65)*.095;orbit.position.y=-.72+Math.cos(time*.72)*.075;beacon.material.opacity=.76+.19*Math.sin(time*2);stars.rotation.y+=.000012;}
 renderer.render(scene,camera);
}
requestAnimationFrame(tick);
host.classList.add('has-webgl');
status&&(status.textContent='Interactive worlds ready. Move the pointer to explore.');
window.addEventListener('pagehide',()=>{observer.disconnect();renderer.dispose();geom.dispose();});
