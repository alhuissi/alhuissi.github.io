const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./pocketOrbitShuttle-Bhcs-OWI.js","./three-jFD2GI6k.js","../app.js"])))=>i.map(i=>d[i]);
import{M as F,O as _s,B as de,F as K,S as Z,U as ct,V as H,W as qe,H as We,N as zs,T as As,R as ks,C as Rs,a as Es,L as Bs,b as Is,c as Fs,A as ns,d as Us,e as Ds,f as Gs,g as O,h as C,i as Ke,j as te,k as Ye,l as Ls,P as Pe,D as pt,m as is,n as Et,o as mt,p as ft,q as Ns,r as Hs,s as qt,t as Os,u as Se,v as gt,E as Bt,w as Vs,x as as,G as Y,y as It,z as pe,I as qs,J as rs,K as it,Q as Ft,X as ls,Y as cs,Z as Re,_ as ht,$ as Ws,a0 as Xs,a1 as js,a2 as Qs,a3 as $s,a4 as Wt,a5 as Ks,a6 as Ys,a7 as Zs,a8 as Js,a9 as eo,aa as Mt,ab as to,ac as St,ad as so}from"./three-jFD2GI6k.js";import{d as me,_ as oo,r as no,a as io}from"../app.js";const at={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ue{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ao=new _s(-1,1,1,-1,0,1);class ro extends de{constructor(){super(),this.setAttribute("position",new K([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new K([0,2,0,0,2,0],2))}}const lo=new ro;class Ut{constructor(e){this._mesh=new F(lo,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ao)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class co extends Ue{constructor(e,n="tDiffuse"){super(),this.textureID=n,this.uniforms=null,this.material=null,e instanceof Z?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ct.clone(e.uniforms),this.material=new Z({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ut(this.material)}render(e,n,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Xt extends Ue{constructor(e,n){super(),this.scene=e,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,n,s){const i=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let o,r;this.inverse?(o=0,r=1):(o=1,r=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),a.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),a.buffers.stencil.setClear(r),a.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(i.EQUAL,1,4294967295),a.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),a.buffers.stencil.setLocked(!0)}}class fo extends Ue{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ho{constructor(e,n){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),n===void 0){const s=e.getSize(new H);this._width=s.width,this._height=s.height,n=new qe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:We}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new co(at),this.copyPass.material.blending=zs,this.timer=new As}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,n){this.passes.splice(n,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const n=this.passes.indexOf(e);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(e){for(let n=e+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const n=this.renderer.getRenderTarget();let s=!1;for(let i=0,a=this.passes.length;i<a;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),o.needsSwap){if(s){const r=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Xt!==void 0&&(o instanceof Xt?s=!0:o instanceof fo&&(s=!1))}}this.renderer.setRenderTarget(n)}reset(e){if(e===void 0){const n=this.renderer.getSize(new H);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,n){this._width=e,this._height=n;const s=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(s,i),this.renderTarget2.setSize(s,i);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(s,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const tt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class uo extends Ue{constructor(){super(),this.isOutputPass=!0,this.uniforms=ct.clone(tt.uniforms),this.material=new ks({name:tt.name,uniforms:this.uniforms,vertexShader:tt.vertexShader,fragmentShader:tt.fragmentShader}),this._fsQuad=new Ut(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,n,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Rs.getTransfer(this._outputColorSpace)===Es&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Bs?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Is?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Fs?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ns?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Us?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ds?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Gs&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class po extends Ue{constructor(e,n,s=null,i=null,a=null){super(),this.scene=e,this.camera=n,this.overrideMaterial=s,this.clearColor=i,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new O}render(e,n,s){const i=e.autoClear;e.autoClear=!1;let a,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(a=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const mo={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new O(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ie extends Ue{constructor(e,n=1,s,i){super(),this.strength=n,this.radius=s,this.threshold=i,this.resolution=e!==void 0?new H(e.x,e.y):new H(256,256),this.clearColor=new O(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new qe(a,o,{type:We,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let l=0;l<this.nMips;l++){const f=new qe(a,o,{type:We,depthBuffer:!1});f.texture.name="UnrealBloomPass.h"+l,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const u=new qe(a,o,{type:We,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+l,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),a=Math.round(a/2),o=Math.round(o/2)}const r=mo;this.highPassUniforms=ct.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Z({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let l=0;l<this.nMips;l++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[l])),this.separableBlurMaterials[l].uniforms.invSize.value=new H(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ct.clone(at.uniforms),this.blendMaterial=new Z({uniforms:this.copyUniforms,vertexShader:at.vertexShader,fragmentShader:at.fragmentShader,premultipliedAlpha:!0,blending:Ke,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new O,this._oldClearAlpha=1,this._basic=new te,this._fsQuad=new Ut(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,n){let s=Math.round(e/2),i=Math.round(n/2);this.renderTargetBright.setSize(s,i);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(s,i),this.renderTargetsVertical[a].setSize(s,i),this.separableBlurMaterials[a].uniforms.invSize.value=new H(1/s,1/i),s=Math.round(s/2),i=Math.round(i/2)}render(e,n,s,i,a){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=s.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let r=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[c].uniforms.direction.value=Ie.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Ie.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),r=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(s),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const n=[],s=e/3;for(let o=0;o<e;o++)n.push(.39894*Math.exp(-.5*o*o/(s*s))/s);const i=[],a=[];for(let o=1;o<e;o+=2){const r=n[o],c=o+1<e?n[o+1]:0,h=r+c;i.push((o*r+(o+1)*c)/h),a.push(h)}return new Z({defines:{KERNEL_PAIRS:i.length},uniforms:{colorTexture:{value:null},invSize:{value:new H(.5,.5)},direction:{value:new H(.5,.5)},centerWeight:{value:n[0]},gaussianOffsets:{value:i},gaussianWeights:{value:a}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Z({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Ie.BlurDirectionX=new H(1,0);Ie.BlurDirectionY=new H(0,1);const dt=[26,20],fs=-15.4,ae=-.45,he=[-16.4,7.85],hs=2.41,ds=.32;function ue(t){return()=>(t=Math.imul(1664525,t)+1013904223|0,(t>>>0)/4294967296)}function us(t){return 1+.074*Math.sin(t*3+.7)+.086*Math.cos(t*5-.58)+.031*Math.sin(t*11+.52)+.018*Math.cos(t*19)}function Te(t,e=1){const n=us(t)*e;return[Math.cos(t)*dt[0]*n,Math.sin(t)*dt[1]*n]}function xe(t,e){const n=t/dt[0],s=e/dt[1];return Math.hypot(n,s)/us(Math.atan2(s,n))}function Ve(t,e,n,s,i){return Math.exp(-(((t-n[0])/s)**2+((e-n[1])/i)**2))}const ut=Te(hs),ke=[ut[0]-he[0],ut[1]-he[1]];function go(t,e){const n=Math.max(0,Math.min(1.1,((t-he[0])*ke[0]+(e-he[1])*ke[1])/(ke[0]**2+ke[1]**2))),s=he[0]+ke[0]*n,i=he[1]+ke[1]*n;return Math.exp(-((t-s)**2+(e-i)**2)/1.16)}function T(t,e){const n=Ve(t,e,me.observatory.landmark,7.1,5.8)*3.7,s=Ve(t,e,me["pocket-orbit"].landmark,5.3,5.9)*1.75,i=Ve(t,e,[-19.1,-5.7],7.4,5.5)*1.15,a=Ve(t,e,[15.6,10],6.8,5.5)*.61,o=Ve(t,e,he,3.9,3.3)*1.9+go(t,e)*.92;return .42+Math.sin(t*.19+e*.24)*.29+Math.cos(e*.31-t*.12)*.32+Math.sin(t*.36+e*.18)*.15+n+s+i+a-o}const Ze=`
  float hash(vec2 p) {
    vec3 q = fract(vec3(p.xyx) * .1031);
    q += dot(q, q.yzx + 33.33);
    return fract((q.x + q.y) * q.z);
  }
  float field(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + 1.0), f.x), f.y);
  }
  float layers(vec2 p) {
    float sum = .55 * field(p);
    p = mat2(1.71, 1.18, -1.18, 1.71) * p + 17.3;
    sum += .27 * field(p);
    p = mat2(1.52, 1.35, -1.35, 1.52) * p - 12.7;
    sum += .12 * field(p);
    return sum + .06 * field(p * 2.06 + 7.0);
  }
  float sat(float x) { return clamp(x, 0.0, 1.0); }
`,rt=`
  varying vec2 coords;
  varying vec3 worldPoint;
  void main() {
    coords = uv;
    vec4 p = modelMatrix * vec4(position, 1.0);
    worldPoint = p.xyz;
    gl_Position = projectionMatrix * viewMatrix * p;
  }
`,ps=`
  vec3 nightHorizon(vec3 d, float clock) {
    float elevation = d.y;
    float longitude = atan(d.x, -d.z);
    vec3 zenith = vec3(.0025, .003, .012);
    vec3 upper = vec3(.006, .008, .030);
    vec3 color = mix(upper, zenith, smoothstep(.05, .75, elevation));
    // The afterglow changes hue around the horizon: violet, magenta, rose behind the planet, teal.
    float hue = .5 + .5 * sin(longitude * 1.3 + .4);
    float hue2 = .5 + .5 * sin(longitude * 2.1 - 1.7);
    vec3 glow = mix(vec3(.10, .045, .22), vec3(.30, .085, .24), hue);
    glow = mix(glow, vec3(.035, .16, .22), hue2 * .55);
    float band = exp(-abs(elevation + .01) * 15.0);
    color += glow * band * .2;
    color += vec3(.42, .16, .30) * exp(-abs(elevation + .004) * 46.0) * (.06 + .09 * hue);

    vec2 cloudUV = vec2(longitude * 8.0 - clock * .009, elevation * 36.0);
    float fronts = layers(cloudUV + vec2(3.4, 1.4));
    float filaments = layers(cloudUV * vec2(.81, 1.38) + vec2(6.0, 4.4));
    float shelf = exp(-pow(abs(elevation + .016) / .084, 2.0));
    float distant = smoothstep(.37, .76, fronts) * shelf;
    float sheer = smoothstep(.54, .80, filaments) * exp(-pow(abs(elevation - .015) / .16, 2.0));
    vec3 cloudBody = vec3(.020, .022, .062);
    vec3 cloudRim = mix(glow, vec3(.20, .15, .30), .4);
    vec3 cloud = mix(cloudBody, cloudRim, smoothstep(.55, .92, fronts) * .6 + .08);
    return mix(color, cloud, distant * .62 + sheer * .12);
  }
`,vo=`
  float nsHash(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
  vec3 nsHash3(vec3 p) { p = fract(p * vec3(0.1031, 0.1030, 0.0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx); }
  float nsNoise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(nsHash(i), nsHash(i + vec3(1, 0, 0)), f.x), mix(nsHash(i + vec3(0, 1, 0)), nsHash(i + vec3(1, 1, 0)), f.x), f.y),
               mix(mix(nsHash(i + vec3(0, 0, 1)), nsHash(i + vec3(1, 0, 1)), f.x), mix(nsHash(i + vec3(0, 1, 1)), nsHash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
  }
  float nsFbm(vec3 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += nsNoise(p) * a; p = p * 2.03 + vec3(17.2, 11.3, 7.1); a *= 0.5; }
    return v;
  }
  vec3 nsPalette(float h) {
    h = fract(h) * 8.0;
    vec3 c0 = vec3(1.0, 0.66, 0.2), c1 = vec3(1.0, 0.38, 0.14), c2 = vec3(0.92, 0.25, 0.38), c3 = vec3(0.72, 0.18, 0.62);
    vec3 c4 = vec3(0.42, 0.2, 0.82), c5 = vec3(0.16, 0.36, 0.98), c6 = vec3(0.14, 0.7, 0.86), c7 = vec3(0.4, 0.92, 0.55);
    float f = fract(h);
    f = f * f * (3.0 - 2.0 * f);
    int k = int(floor(h));
    vec3 a = k == 0 ? c0 : k == 1 ? c1 : k == 2 ? c2 : k == 3 ? c3 : k == 4 ? c4 : k == 5 ? c5 : k == 6 ? c6 : c7;
    vec3 b = k == 0 ? c1 : k == 1 ? c2 : k == 2 ? c3 : k == 3 ? c4 : k == 4 ? c5 : k == 5 ? c6 : k == 6 ? c7 : c0;
    return mix(a, b, f);
  }
  float nsDust;
  float nsBody;
  vec3 nebulaGlow(vec3 d) {
    // River A arcs from high on the left down to the right horizon behind the island; river B
    // crosses it from the right, so the overview frames both.
    vec3 A = normalize(vec3(-.17, -.978, -.116)), B = normalize(vec3(.257, -.965, -.058));
    // Finer than Pocket Orbit's full-sky version: the overview frames only a strip of sky.
    vec3 g = d * 2.3;
    vec3 q = vec3(nsFbm(g * 1.7), nsFbm(g * 1.7 + vec3(5.2, 1.3, 2.8)), nsFbm(g * 1.7 + vec3(1.7, 9.2, 4.4)));
    float w = nsFbm(g * 2.2 + q * 1.8);
    float latA = dot(d, A) + (q.x - 0.5) * 0.7 + (w - 0.5) * 0.35;
    float latB = dot(d, B) + (q.y - 0.5) * 0.6;
    float riverA = exp(-latA * latA * 22.0);
    float riverB = exp(-latB * latB * 34.0) * 0.85;
    nsBody = max(riverA, riverB);
    float clouds = smoothstep(0.32, 0.76, w);
    float density = nsBody * clouds;
    float ridge = 1.0 - abs(2.0 * nsFbm(g * 5.5 + q * 2.4) - 1.0);
    float filaments = pow(ridge, 6.0) * nsBody;
    float dust = smoothstep(0.48, 0.74, nsFbm(g * 3.6 + q * 1.6 + 9.0)) * nsBody;
    nsDust = dust;
    vec3 e1 = normalize(cross(A, vec3(0.0, 0.0, 1.0))), e2 = cross(A, e1);
    float along = atan(dot(d, e2), dot(d, e1)) / 6.2832;
    vec3 f1 = normalize(cross(B, vec3(0.0, 1.0, 0.0))), f2 = cross(B, f1);
    float alongB = atan(dot(d, f2), dot(d, f1)) / 6.2832;
    vec3 colA = nsPalette(along * 5.0 + .1 + (q.z - 0.5) * 1.3 + (w - 0.5) * 0.6);
    vec3 colB = nsPalette(alongB * 4.0 + 0.45 + (q.x - 0.5) * 1.2);
    vec3 col = mix(colB, colA, smoothstep(0.0, 1.0, riverA / max(1e-3, riverA + riverB)));
    col = max(vec3(0.0), mix(vec3(dot(col, vec3(0.3, 0.59, 0.11))), col, 1.35));
    vec3 gas = col * (density * density * 0.85 + density * 0.1 + filaments * 0.26);
    gas += mix(col, vec3(1.0, 0.92, 0.78), 0.4) * pow(density, 3.0) * 0.8;
    gas += vec3(0.012, 0.007, 0.03) * exp(-latA * latA * 4.0) + vec3(0.003, 0.007, 0.018) * exp(-latB * latB * 6.0);
    return gas * (1.0 - dust * 0.85);
  }
  vec3 nsStarLayer(vec3 d, float scale, float density, float size, float t) {
    vec3 sp = d * scale;
    vec3 cell = floor(sp);
    float r = nsHash(cell);
    float lit = step(1.0 - density * (1.0 + nsBody * 2.2), r);
    vec3 jitter = nsHash3(cell) * 0.7 + 0.15;
    float dist = length(sp - (cell + jitter));
    float s = size * (0.55 + nsHash(cell + 3.1) * 0.9);
    float core = smoothstep(s, 0.0, dist);
    float temp = nsHash(cell + 7.7);
    vec3 tint = temp < 0.25 ? vec3(0.7, 0.82, 1.0) : temp < 0.7 ? vec3(1.0, 0.98, 0.95) : temp < 0.9 ? vec3(1.0, 0.86, 0.6) : vec3(1.0, 0.62, 0.45);
    float tw = 0.7 + 0.3 * sin(t * (0.8 + r * 2.0) + r * 40.0);
    return tint * lit * core * core * tw;
  }
  vec3 nebulaStars(vec3 d, float t) {
    vec3 stars = nsStarLayer(d, 140.0, 0.10, 0.36, t) * 1.8 + nsStarLayer(d, 300.0, 0.12, 0.36, t) * 1.1
      + nsStarLayer(d, 620.0, 0.14, 0.42, t) * 0.7;
    vec3 sp = d * 46.0;
    vec3 cell = floor(sp);
    if (nsHash(cell + 1.3) > 0.955) {
      vec3 c = cell + nsHash3(cell + 2.1) * 0.6 + 0.2;
      vec3 off = sp - c;
      float dist = length(off);
      vec3 up = abs(d.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
      vec3 ax = normalize(cross(d, up)), ay = cross(d, ax);
      float x = dot(off, ax), y = dot(off, ay);
      float spikes = (exp(-abs(x) * 70.0) * exp(-abs(y) * 7.0) + exp(-abs(y) * 70.0) * exp(-abs(x) * 7.0)) * 0.35;
      float glow = exp(-dist * 9.0) * 0.5 + exp(-dist * 34.0);
      float temp = nsHash(cell + 4.4);
      vec3 tint = temp < 0.4 ? vec3(0.75, 0.86, 1.0) : temp < 0.8 ? vec3(1.0, 0.97, 0.9) : vec3(1.0, 0.8, 0.55);
      stars += tint * (glow + spikes) * 1.4 * (0.85 + 0.15 * sin(t * 1.3 + temp * 20.0));
    }
    return stars * (1.0 - nsDust * 0.75);
  }
`,wo=`
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${Ze}
  ${ps}
  ${vo}

  // Occasional meteors: each slot fires once per period somewhere in the upper sky.
  float meteor(vec2 sky, float clock, float slot) {
    float period = 9.0 + slot * 4.7;
    float shift = clock / period + slot * .37;
    float id = floor(shift);
    float age = fract(shift) * period;
    float life = .85;
    if (age > life) return 0.0;
    vec2 seed = vec2(id, slot * 13.1);
    vec2 start = vec2(hash(seed) * 2.6 - 1.3, .24 + hash(seed + 4.2) * .34);
    vec2 heading = normalize(vec2(hash(seed + 7.7) > .5 ? 1.0 : -1.0, -.42 - hash(seed + 2.9) * .3));
    float progress = age / life;
    vec2 head = start + heading * progress * .42;
    vec2 rel = sky - head;
    float along = dot(rel, -heading);
    float across = abs(rel.x * heading.y - rel.y * heading.x);
    float trail = smoothstep(.16, 0.0, along) * step(0.0, along) * exp(-across * 900.0);
    float spark = exp(-length(rel) * 260.0);
    return (trail + spark) * sin(progress * 3.1416);
  }

  void main() {
    vec3 d = normalize(worldPoint - cameraPosition);
    float elevation = d.y;
    float longitude = atan(d.x, -d.z);
    vec3 color = nightHorizon(d, clock);

    // The gas and stars thin into the brighter horizon air.
    float air = smoothstep(-.02, .07, elevation);
    float starAir = smoothstep(-.01, .05, elevation);
    vec3 gas = nebulaGlow(d) * air * 2.1;
    // Roll off the densest cores so they stay coloured instead of clipping to white.
    gas /= 1.0 + max(gas.r, max(gas.g, gas.b)) * .75;
    color = color * (1.0 - nsDust * .35 * air) + gas;
    color += nebulaStars(d, clock) * starAir;
    vec2 sky = vec2(longitude, elevation);
    color += vec3(.85, .92, 1.0) * (meteor(sky, clock, 0.0) + meteor(sky, clock, 1.0)) * 2.2 * starAir;

    vec3 planetDirection = normalize(vec3(.026, .036, -1.0));
    vec3 right = normalize(vec3(1.0, 0.0, .026));
    vec3 up = normalize(cross(right, planetDirection));
    vec2 p = vec2(dot(d, right), dot(d, up)) / .078;
    if (dot(d, planetDirection) > .87 && length(p) < 2.45) {
      float radius = length(p);
      vec2 r = mat2(.956, -.293, .293, .956) * p;
      float ringRadius = length(vec2(r.x, r.y * 3.55));
      float ringBands = smoothstep(1.15, 1.23, ringRadius) * (1.0 - smoothstep(1.90, 2.17, ringRadius));
      ringBands *= .54 + .22 * sin(ringRadius * 31.0) + .17 * sin(ringRadius * 57.0);
      float ringLight = .45 + .35 * sat(.5 - p.x);
      vec3 ringTint = vec3(.26, .20, .34);
      color = mix(color, ringTint, ringBands * ringLight * .85);
      // A thin violet-teal atmosphere halo.
      color += vec3(.06, .16, .30) * exp(-abs(radius - 1.0) * 16.0) * .8;
      float globe = 1.0 - smoothstep(.98, 1.006, radius);
      vec3 normal = vec3(p, sqrt(max(0.0, 1.0 - dot(p, p))));
      float day = smoothstep(-.12, .9, dot(normal, normalize(vec3(-.89, .15, .43))));
      float band = .5 + .5 * sin(r.y * 22.0 + 3.1 * layers(p * vec2(1.9, 5.4)) + p.x * .9);
      vec3 night = vec3(.028, .032, .085);
      vec3 lit = mix(vec3(.10, .17, .40), vec3(.42, .27, .44), band);
      vec3 planet = mix(night, lit, day * day);
      planet *= .82 + band * .22 + layers(p * vec2(2.3, 5.4)) * .2;
      float limb = pow(1.0 - normal.z, 3.0);
      planet += vec3(.10, .26, .48) * limb * (.30 + day * .8);
      color = mix(color, planet, globe * .97);
      color = mix(color, ringTint, ringBands * ringLight * (1.0 - smoothstep(-.17, -.04, r.y)) * globe * .85);
    }
    color += (hash(gl_FragCoord.xy) - .5) * .004;

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,xo=`
  #include <common>
  uniform float clock;
  uniform float isPool;
  varying vec3 worldPoint;
  ${Ze}
  ${ps}

  void main() {
    vec2 p = worldPoint.xz;
    vec3 view = normalize(cameraPosition - worldPoint);
    float distanceToEye = length(cameraPosition - worldPoint);
    vec2 drift = vec2(clock * .15, -clock * .12);
    float granule = layers(p * vec2(.22, .21) + drift * .38);
    float swell = sin(dot(p, vec2(.20, .55)) + granule * 4.3 - clock * .46);
    float crossSea = sin(dot(p, vec2(-.54, .386)) + clock * .68 + granule * 3.0);
    float swash = sin(dot(p, vec2(1.10, .91)) + clock * .93 + swell * .73);
    float ripples = (.5 + swash * .5) * (.6 * granule + swell * .10);
    float glint = smoothstep(.27, .55, ripples) * (1.0 - smoothstep(.12, 1.14, fwidth(p.x) + fwidth(p.y)));
    vec3 n = normalize(vec3(crossSea * .055 + swash * .024, 1.0, swell * .08));
    float fresnel = pow(1.0 - max(0.0, dot(n, view)), 3.1);
    vec3 deep = mix(vec3(.010, .020, .055), vec3(.012, .060, .085), isPool);
    vec3 shallows = mix(vec3(.040, .060, .150), vec3(.05, .26, .30), isPool);
    vec3 color = mix(deep, shallows, sat(fresnel * .6 + swell * .05 + granule * .2));
    // Mirror the night horizon, and catch starlight and lantern light in the ripples.
    vec3 mirrored = reflect(-view, n);
    mirrored.y = abs(mirrored.y);
    color = mix(color, nightHorizon(mirrored, clock), fresnel * .7);
    color += mix(vec3(.10, .12, .32), vec3(.20, .62, .62), isPool) * glint * (.18 + isPool * .5);
    float haze = smoothstep(76.0, 370.0, distanceToEye) * (1.0 - isPool);
    color = mix(color, nightHorizon(-view, clock), haze);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,yo=`
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${Ze}
  void main() {
    vec2 p = worldPoint.xz;
    float banks = layers(p * vec2(.048, .072) + vec2(clock * -.023, 3.7));
    float frays = layers(p * .17 + vec2(clock * .036, 2.4));
    float fog = smoothstep(.53, .76, banks + frays * .13) * .62;
    float distanceToEye = distance(worldPoint, cameraPosition);
    float nearFade = smoothstep(21.0, 45.0, distanceToEye);
    float edgeFade = 1.0 - smoothstep(68.0, 230.0, length(p));
    // Moonlit cloud tops: indigo in the folds, lilac and a hint of teal on the crests.
    vec3 color = mix(vec3(.022, .026, .075), vec3(.10, .095, .20), smoothstep(.46, .80, banks));
    color += vec3(.012, .05, .06) * smoothstep(.6, .9, frays);
    gl_FragColor = vec4(color, fog * nearFade * edgeFade);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;function jt(t,e,n,s,i,a,o){const r=new F(new Pe(e,n),o);return r.rotation.x=-Math.PI/2,r.position.set(s,i,a),t.add(r),r}function bo(t,e){const n=[],s=[],i=[],o=(c,h)=>{const l=ut[0]-2.2+c*.21,f=he[1]-4.8+h*.21;return xe(l,f)<=1.002&&T(l,f)<ae+.43};for(let c=0;c<=70;c++)for(let h=0;h<=70;h++){if(n.push(ut[0]-2.2+h*.21,ae,he[1]-4.8+c*.21),s.push(h/70,c/70),!c||!h||!o(h,c)||!o(h-1,c-1))continue;const l=c*71+h,f=l-70-2;o(h-1,c)&&i.push(f,l-1,l),o(h,c-1)&&i.push(f,l,l-70-1)}const r=new de;r.setAttribute("position",new K(n,3)),r.setAttribute("uv",new K(s,2)),r.setIndex(i),t.add(new F(r,e))}function Mo(t,e){const i=[],a=[],o=[];for(let h=0;h<=26;h++){const l=h/26;for(let f=0;f<=15;f++){const u=f/15,p=hs+(u-.5)*(.109+.07*l),[m,d]=Te(p,1.003+Math.sin(l*2.1)*.057),g=Math.max(ae+.06,T(m,d)+.02);if(i.push(m-l*.19,g+(fs-g)*l,d+Math.sin(l*2.5)*.71),a.push(u,l),h===0||f===0)continue;const w=h*16+f,x=w-15-1;o.push(x-1,x,w,x-1,w,w-1)}}const r=new de;r.setAttribute("position",new K(i,3)),r.setAttribute("uv",new K(a,2)),r.setIndex(o);const c=new Z({uniforms:{clock:e},transparent:!0,depthWrite:!1,side:pt,toneMapped:!1,vertexShader:rt,fragmentShader:`
      uniform float clock;
      varying vec2 coords;
      ${Ze}
      void main() {
        vec2 p = vec2(coords.x * 17.0, coords.y * 8.1 - clock * 2.2);
        float film = layers(p) * .45 + .55 * field(p * vec2(1.85, .33) + 6.0);
        float ribbons = smoothstep(.39, .77, film);
        float edge = smoothstep(0.0, .16, coords.x) * (1.0 - smoothstep(.84, 1.0, coords.x));
        float alpha = edge * (1.0 - smoothstep(.76, 1.0, coords.y)) * (.42 + .53 * ribbons);
        vec3 color = mix(vec3(.22, .42, .58), vec3(.66, .84, .95), ribbons);
        gl_FragColor = vec4(color * color, alpha);
        #include <colorspace_fragment>
      }
    `});t.add(new F(r,c))}function So(t,e){const n={value:0},s=new Et().load("./island-media/dream-ocean-reflections.webp",()=>{n.value=1,e()});return s.colorSpace=mt,s.magFilter=ft,s.minFilter=ft,s.generateMipmaps=!1,new Z({uniforms:{clock:t,heroes:{value:s},reflectionReady:n},toneMapped:!1,side:pt,vertexShader:`
      varying vec2 coords;
      varying vec3 mirrorView;
      void main() {
        coords = uv;
        vec4 view = modelViewMatrix * vec4(position, 1.0);
        mirrorView = -(view.xyz * normalMatrix);
        gl_Position = projectionMatrix * view;
      }
    `,fragmentShader:`
      uniform float clock;
      uniform sampler2D heroes;
      uniform float reflectionReady;
      varying vec2 coords;
      varying vec3 mirrorView;
      ${Ze}
      vec4 reflectParty(vec2 p, float layer) {
        p = clamp(p, vec2(.004), vec2(.996));
        return texture2D(heroes, vec2((p.x + layer) * .5, p.y));
      }
      void main() {
        vec2 p = coords * vec2(.30, .20) + vec2(.50, .0);
        float drift = layers(vec2(p.x * 2.6 - clock * .18, p.y * 4.7 + clock * .09));
        float horizon = sin(p.x * 5.0 + .7) * .11 + .46;
        float band = exp(-abs(p.y - horizon - drift * .22) * 9.4);
        float contour = pow(.5 + .5 * sin((p.y + drift * .17) * 92.0 - clock * 1.1), 7.0);
        float rim = pow(abs(p.x - .5) * 1.45, 2.6);
        float light = sat(.23 + drift * .49 + band * .38 + contour * .13 + rim * .2);
        vec3 color = mix(vec3(.10, .20, .33), vec3(.68, .80, .96), light);
        color += pow(band, 13.0) * vec3(.12, .13, .11);
        vec3 surface = color * color;
        if (reflectionReady > .5) {
          float distanceToPane = max(length(mirrorView), .01);
          float facing = smoothstep(.16, .68, abs(mirrorView.z) / distanceToPane);
          float strength = mix(1.0, .38, smoothstep(13., 53., distanceToPane)) * facing;
          vec2 viewSlide = clamp(mirrorView.xy / max(abs(mirrorView.z), 5.), vec2(-1.), vec2(1.));
          vec2 ripple = vec2(sin(p.y * 47. + drift * 3. - clock * 1.3) * .0038,
            sin(p.x * 34. + p.y * 12. + clock * .82) * .0021);
          vec4 distant = reflectParty(p + ripple - viewSlide * .092, 0.0);
          vec4 foreground = reflectParty(p + ripple - viewSlide * .042, 1.0);
          float recess = smoothstep(.08, .23, p.y) * (1.0 - smoothstep(.73, .95, p.y));
          surface = mix(surface, vec3(.030, .061, .118) + surface * .28, strength * recess * .73);
          surface = mix(surface, distant.rgb * vec3(.67, .77, .91) + vec3(.021, .037, .060),
            distant.a * strength * .69);
          surface = mix(surface, foreground.rgb * vec3(.94, .96, 1.0) + vec3(.012, .023, .036),
            foreground.a * strength * .89);
          surface += vec3(.018, .032, .058) * contour * strength;
        }
        gl_FragColor = vec4(surface, 1.0);
        #include <colorspace_fragment>
      }
    `})}function To(t,e,n){const s=ue(6067),i=[],a=[],o=[];for(let h=0;h<n;h++){const l=(s()-.5)*48,f=(s()-.5)*34;i.push(l,T(l,f)+s()*5+.35,f),a.push(s()*6.283),o.push(s())}const r=new de;r.setAttribute("position",new K(i,3)),r.setAttribute("phase",new K(a,1)),r.setAttribute("hue",new K(o,1));const c=new Z({uniforms:{clock:e},transparent:!0,depthWrite:!1,toneMapped:!1,blending:Ke,vertexShader:`
      uniform float clock;
      attribute float phase;
      attribute float hue;
      varying float brightness;
      varying vec3 tint;
      void main() {
        vec3 p = position;
        p.x += sin(phase + clock * .48) * .7;
        p.z += cos(phase + clock * .36) * .4;
        p.y += sin(phase + clock * .63) * .32;
        vec4 view = modelViewMatrix * vec4(p, 1.0);
        float pulse = pow(.5 + .5 * sin(phase * 3.0 + clock * (.9 + hue * .6)), 3.0);
        brightness = (.18 + .95 * pulse) * (1.0 - smoothstep(58.0, 90.0, -view.z));
        // Warm fireflies with a few teal and rose spirits among them.
        tint = hue < .62 ? vec3(1.0, .72, .32) : hue < .84 ? vec3(.35, 1.0, .86) : vec3(1.0, .48, .82);
        gl_PointSize = clamp(120.0 / max(1.0, -view.z), 1.8, 8.0);
        gl_Position = projectionMatrix * view;
      }
    `,fragmentShader:`
      varying float brightness;
      varying vec3 tint;
      void main() {
        float r = length(gl_PointCoord - .5);
        float core = exp(-r * r * 60.0) + exp(-r * 9.0) * .35;
        gl_FragColor = vec4(tint * core * brightness * 1.6, 1.0);
        #include <colorspace_fragment>
      }
    `});t.add(new is(r,c))}function Co(t,e,n){const s=new F(new Ye(510,32,20),new Z({uniforms:{clock:e},vertexShader:rt,fragmentShader:wo,side:Ls,depthWrite:!1,fog:!1}));s.renderOrder=-10,s.frustumCulled=!1,t.add(s);const i=a=>new Z({uniforms:{clock:e,isPool:{value:a}},vertexShader:rt,fragmentShader:xo});jt(t,900,900,0,fs,0,i(0)),bo(t,i(1)),jt(t,830,830,0,-13.2,0,new Z({uniforms:{clock:e},vertexShader:rt,fragmentShader:yo,transparent:!0,depthWrite:!1})),Mo(t,e),To(t,e,n?90:240)}class Po{obstacles=[];add(e,n,s,i,a,o,r=0){this.obstacles.push({x:e,z:n,halfWidth:s/2,halfDepth:i/2,bottom:a,top:a+o,cosine:Math.cos(r),sine:Math.sin(r)})}solid(e,n,s,i,a){return this.obstacles.some(o=>{if(i>=o.top||a<=o.bottom)return!1;const r=e-o.x,c=n-o.z,h=Math.abs(r*o.cosine-c*o.sine)-o.halfWidth,l=Math.abs(r*o.sine+c*o.cosine)-o.halfDepth,f=Math.max(h,0),u=Math.max(l,0);return f*f+u*u<s*s})}canStand(e,n,s=0){const i=T(e,n);return xe(e,n)<.994-s&&i>ae-.18&&!this.solid(e,n,ds,i+.06,i+1.52)}clearPath(e,n,s,i){const a=Math.max(1,Math.ceil(Math.hypot(s-e,i-n)/.28));let o=T(e,n);for(let r=1;r<=a;r++){const c=e+(s-e)*r/a,h=n+(i-n)*r/a,l=T(c,h);if(Math.abs(l-o)>.28||!this.canStand(c,h,.022))return!1;o=l}return!0}}function _o(t,e=!1){const n=t[0].index!==null,s=new Set(Object.keys(t[0].attributes)),i=new Set(Object.keys(t[0].morphAttributes)),a={},o={},r=t[0].morphTargetsRelative,c=new de;c.morphTargetsRelative=r;let h=0;for(let l=0;l<t.length;++l){const f=t[l];let u=0,p=0;if(n!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in f.attributes){if(!s.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;a[m]===void 0&&(a[m]=[]),a[m].push(f.attributes[m]),u++}if(u!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". Make sure all geometries have the same number of attributes."),null;if(r!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in f.morphAttributes){if(!i.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+".  .morphAttributes must be consistent throughout all geometries."),null;if(f.morphAttributes[m].length!==t[0].morphAttributes[m].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+'. All geometries must have the same number of morph targets for the "'+m+'" morph attribute.'),null;o[m]===void 0&&(o[m]=[]),o[m].push(f.morphAttributes[m]),p++}if(p!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". Make sure all geometries have the same number of morph attributes."),null;if(e){let m;if(n)m=f.index.count;else if(f.attributes.position!==void 0)m=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+l+". The geometry must have either an index or a position attribute"),null;c.addGroup(h,m,l),h+=m}}if(n){let l=0;const f=[];for(let u=0;u<t.length;++u){const p=t[u].index;for(let m=0;m<p.count;++m)f.push(p.getX(m)+l);l+=t[u].attributes.position.count}c.setIndex(f)}for(const l in a){const f=Qt(a[l]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" attribute."),null;c.setAttribute(l,f)}for(const l in o){const f=o[l][0].length;if(f!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[l]=[];for(let u=0;u<f;++u){const p=[];for(let d=0;d<o[l].length;++d)p.push(o[l][d][u]);const m=Qt(p);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+l+" morphAttribute."),null;c.morphAttributes[l].push(m)}}}return c}function Qt(t){let e,n,s,i=-1,a=0;for(let h=0;h<t.length;++h){const l=t[h];if(e===void 0&&(e=l.array.constructor),e!==l.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=l.itemSize),n!==l.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(s===void 0&&(s=l.normalized),s!==l.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=l.gpuType),i!==l.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;a+=l.count*n}const o=new e(a),r=new Ns(o,n,s);let c=0;for(let h=0;h<t.length;++h){const l=t[h];if(l.isInterleavedBufferAttribute){const f=c/n;for(let u=0,p=l.count;u<p;u++)for(let m=0;m<n;m++){const d=l.getComponent(u,m);r.setComponent(u+f,m,d)}}else o.set(l.array,c);c+=l.count*n}return i!==void 0&&(r.gpuType=i),r}function Gn(t,e){if(e===Hs)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),t;if(e===qt||e===Os){let n=t.getIndex();if(n===null){const a=[],o=t.getAttribute("position");if(o!==void 0){for(let r=0;r<o.count;r++)a.push(r);t.setIndex(a),n=t.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),t}const s=n.count-2,i=[];if(e===qt)for(let a=1;a<=s;a++)i.push(n.getX(0)),i.push(n.getX(a)),i.push(n.getX(a+1));else for(let a=0;a<s;a++)a%2===0?(i.push(n.getX(a)),i.push(n.getX(a+1)),i.push(n.getX(a+2))):(i.push(n.getX(a+2)),i.push(n.getX(a+1)),i.push(n.getX(a)));return i.length/3!==s&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),t.setIndex(i),t.clearGroups(),t}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),t}const P=(t,e=.83,n=0)=>new Se({color:t,roughness:e,metalness:n});function J(t,e=.75){return new Se({color:t,emissive:t,emissiveIntensity:e,roughness:.52})}function E(t,e,n,s=0,i=0,a=0){const o=new F(e,n);return o.position.set(s,i,a),o.castShadow=!0,o.receiveShadow=!0,o.userData.bake=!0,t.add(o),o}function v(t,e,n,s,i,a,o,r){return E(t,new Vs(n,s,i),e,a,o,r)}function S(t,e,n,s,i,a,o,r,c=10){return E(t,new as(n,s,i,c),e,a,o,r)}function j(t,e,n,s,i=0,a=0,o=0,r=0){const c=new gt;n.forEach(([l,f],u)=>u?c.lineTo(l,f):c.moveTo(l,f)),c.closePath();const h=new Bt(c,{depth:s,bevelEnabled:r>0,bevelSize:r,bevelThickness:r,bevelSegments:1,steps:1});return E(t,h,e,i,a,o-s/2)}const Dt=t=>new K(t.flatMap(e=>[e.r,e.g,e.b]),3);function zo(t){t.updateMatrixWorld(!0);const e=new Map;t.traverse(n=>{if(!(n instanceof F)||!n.userData.bake||Array.isArray(n.material))return;const s=n.material,i=s.uuid;e.has(i)||e.set(i,{material:s,sources:[],geometries:[]});const a=e.get(i),o=n.geometry.index?n.geometry.toNonIndexed():n.geometry.clone();o.applyMatrix4(n.matrixWorld),a.sources.push(n),a.geometries.push(o)});for(const{material:n,sources:s,geometries:i}of e.values()){const a=_o(i);for(const r of i)r.dispose();if(!a)continue;for(const r of s)r.geometry.dispose(),r.removeFromParent();const o=new F(a,n);o.castShadow=!0,o.receiveShadow=!0,t.add(o)}}const X=P("#25384b",.64,.22),I=P("#49586c",.56,.24),_t=P("#557c88",.54,.15),re=P("#131c2b",.79),ee=P("#b47b57",.54,.26),ne=new te({color:"#6aefeb",toneMapped:!1}),Fe=J(16756065,2.2),Gt=new te({color:"#f589bc",toneMapped:!1}),ms="#13cbb7",ce=(t,e)=>[(t-497)/436,(502-e)/436],gs=new gt().moveTo(...ce(487,114)).quadraticCurveTo(...ce(498,105),...ce(510,114)).lineTo(...ce(715,293)).lineTo(...ce(715,724)).lineTo(...ce(510,890)).quadraticCurveTo(...ce(498,900),...ce(486,890)).lineTo(...ce(279,724)).lineTo(...ce(279,293)).closePath(),ye=1.85,be=-.7;function Ao(){const t=document.createElement("canvas");t.width=512,t.height=112;const e=t.getContext("2d");e.fillStyle="#1c2735",e.fillRect(0,0,512,112),e.fillStyle=ms,e.save(),e.translate(48,56),e.scale(43,-43),e.beginPath(),gs.getPoints(6).forEach(({x:s,y:i},a)=>a?e.lineTo(s,i):e.moveTo(s,i)),e.closePath(),e.fill(),e.restore(),e.fillStyle="#ebeeef",e.font="750 48px system-ui, sans-serif",e.textBaseline="middle",e.fillText("ALHUISSI",83,54),e.fillStyle="#f4b674";for(let s=0;s<3;s++)e.fillRect(457+s*13,49,5,14);const n=new It(t);return n.colorSpace=mt,new te({map:n,toneMapped:!1})}function ko(t){const e=document.createElement("canvas");e.width=e.height=128;const n=e.getContext("2d"),s=n.createRadialGradient(64,64,0,64,64,63);s.addColorStop(0,"rgba(255,255,255,.8)"),s.addColorStop(.4,"rgba(255,255,255,.32)"),s.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=s,n.fillRect(0,0,128,128);const i=new It(e),a=(c,h,l,f)=>new F(new Pe(h,l),new te({map:i,color:c,opacity:f,transparent:!0,blending:Ke,depthWrite:!1,toneMapped:!1})),o=a(4708838,3.6,1.8,.55);o.rotation.x=-Math.PI/2,o.position.set(.53,.217,2.83);const r=a(16357197,4.2,1.6,.5);r.rotation.x=-Math.PI/2,r.position.set(-2.04,.205,2.72),t.add(o,r)}function Ro(t,e){const n=new Y;n.position.set(ye,5.15,be),n.rotation.set(-.14,.27,-.17),t.add(n),S(t,X,.99,1.3,.37,ye,3.5,be,8),S(t,ee,.95,.99,.105,ye,3.72,be,8),S(t,re,.73,.95,.31,ye,3.89,be,10);for(const o of[-1,1]){const r=[[0,0],[o*.49,.03],[o*.55,.82],[o*.88,1.46],[o*.57,1.59],[o*.09,1.04]];j(t,I,r,.47,ye+o*.85,3.57,be,.045),j(t,ee,r,.071,ye+o*.85,3.57,be+.27,.014)}E(n,new pe(1.57,.147,8,64),X),E(n,new pe(1.64,.051,5,54),I,0,0,-.15),E(n,new pe(1.43,.044,6,56),ee,0,0,.073);for(let o=0;o<8;o++){const r=o*Math.PI/4;E(n,new pe(1.57,.041,5,9,.66),o===5?Fe:ne,0,0,.144).rotation.z=r+.065;const c=v(n,I,.255,.28,.33,Math.cos(r)*1.58,Math.sin(r)*1.58,.047);c.rotation.z=r;const h=v(n,ee,.155,.072,.04,c.position.x,c.position.y,.23);h.rotation.z=r}const s=new Y;s.rotation.set(.69,-.69,.36),n.add(s),E(s,new pe(1.2,.069,6,48),I);for(const o of[.18,Math.PI+.18])E(s,new pe(1.2,.033,5,20,2.2),Gt,0,0,.053).rotation.z=o;for(const o of s.children)o.userData.bake=!1,o.castShadow=!1;const i=new Bt(gs,{depth:.12,bevelEnabled:!1,curveSegments:8});i.translate(0,0,-.06);const a=new F(i,new te({color:ms,toneMapped:!1,fog:!1}));return a.position.set(ye,5.15,be),t.add(a),()=>{s.rotation.x=.69+.26*Math.sin(e.value*.73),s.rotation.y=-.69+.53*Math.sin(e.value*.51),s.rotation.z=.36-e.value*.22,a.rotation.y=.21*Math.sin(e.value*.55)}}function Eo(t){const e=new te({color:"#ffca92",toneMapped:!1}),n=J(10510658,.9);v(t,n,3.41,1.79,.095,-2.16,1.66,1.16),v(t,re,3.4,.13,.94,-2.16,2.62,1.7),v(t,ee,3.4,.13,.9,-2.16,.84,1.67),v(t,X,2.91,.144,.62,-2.14,1.24,1.63),v(t,Fe,2.89,.051,.045,-2.14,1.17,1.94);for(const i of[-3.27,-2.47,-1.5]){v(t,re,.59,.44,.13,i,1.68,1.32),v(t,i===-2.47?ne:e,.51,.35,.027,i,1.69,1.397),v(t,X,.066,.19,.1,i,1.4,1.42);for(let a=0;a<8;a++){const o=.035+.11*Math.abs(Math.sin(a*.82+i));v(t,re,.017,o,.009,i-.177+a*.05,1.7,1.417)}}v(t,re,.9,.143,.31,-2.72,1.366,1.79);for(let i=0;i<12;i++)v(t,i%3===2?I:e,.054,.022,.15,-3.073+i*.065,1.45,1.826);for(const[i,a]of[-1.87,-1.73,-1.59,-1.45,-1.31].entries())S(t,X,.036,.042,.048,a,1.38,1.74,8),v(t,i%2===0?ne:Fe,.048,.019,.031,a,1.36,1.83);const s=new F(new Pe(3.47,1.78),new te({color:"#7dc6d4",transparent:!0,opacity:.13,depthWrite:!1,side:pt}));s.position.set(-2.16,1.68,2.24),t.add(s);for(const i of[-3.91,-2.63,-1.55,-.5])v(t,I,.1,1.81,.18,i,1.67,2.23);for(const i of[.82,2.58])v(t,X,3.58,.15,.27,-2.16,i,2.22);j(t,I,[[-3.99,2.44],[-.46,2.44],[-.68,2.72],[-3.59,2.83]],.58,0,0,2.19,.034),v(t,ee,2.88,.049,.058,-2.08,2.59,2.52).rotation.z=-.029}function Bo(t){const e=[[-1.1,.48],[.91,.48],[1.19,.75],[1.19,2.1],[.86,2.46],[-.84,2.46],[-1.1,2.18]];j(t,I,e,.45,2.77,0,2.24,.055),j(t,re,e,.06,2.77,.14,2.494).scale.set(.91,.91,1),v(t,_t,1.97,.19,.35,2.78,.71,2.57),v(t,X,1.94,.31,.35,2.76,2.21,2.57);for(const[n,s]of[2.1,2.7,3.3].entries()){S(t,n===1?Gt:ne,.091,.091,1.32,s,1.45,2.64,12);for(const i of[.78,1.11,1.82,2.09])S(t,i===1.11||i===1.82?ee:I,.15,.15,.096,s,i,2.64,10);v(t,n===1?Fe:ne,.065,.036,.021,s,2.22,2.758)}v(t,ee,.081,1.08,.16,3.68,1.49,2.56);for(let n=0;n<5;n++)v(t,I,.13,.041,.16,3.64,.96+n*.21,2.62)}function Io(t){const e=new te({color:"#7ff6f0",toneMapped:!1}),n=new te({color:"#ffc58a",toneMapped:!1}),s=new te({color:"#b48cff",toneMapped:!1}),i=J(6543078,.9);for(const r of[-1,1]){v(t,re,.06,.82,1.5,r*4.02,1.5,1.45),v(t,n,.03,.66,1.32,r*4.055,1.5,1.45);for(const c of[-.33,.33])v(t,I,.05,.7,.05,r*4.07,1.5,1.45+c);v(t,I,.05,.05,1.36,r*4.07,1.5,1.45)}v(t,s,8.05,.035,.04,.035,3.09,2.79),v(t,e,4.3,.03,.04,-1.31,3.67,2.79);for(const r of[-1,1])v(t,s,.04,.035,5.2,r*4.13,3.09,-.05);for(let r=0;r<3;r++)v(t,X,.82,.08,.62,-1.25+r*.02,3.69,1.55-r*.78),v(t,i,.7,.04,.5,-1.25+r*.02,3.74,1.55-r*.78);const a=new Y;a.position.set(-.35,3.74,-1.75),t.add(a),S(a,I,.05,.08,.55,0,.27,0,8),E(a,new Ye(.42,14,6,0,Math.PI*2,0,Math.PI/2.6),ee,0,.72,0).rotation.set(Math.PI+.7,0,.35),S(a,e,.03,.03,.07,-.14,.95,.2,6),v(t,e,7.7,.025,.03,.09,.14,2.53);for(const r of[-1,1])v(t,e,.03,.025,4.9,r*3.98,.14,.02)}function Fo(t,e,n){const[s,i]=me.workshop.landmark,a=T(s,i),o=new Y;o.position.set(s,a,i),o.rotation.y=-.095,t.add(o),v(o,re,8.05,.46,5.26,.09,-.12,-.12),j(o,I,[[-3.94,0],[3.94,0],[3.94,.13],[3.74,.23],[-3.74,.23],[-3.94,.13]],5.2,.09,-.035,.1,.035),v(o,X,7.81,3,.41,.025,1.54,-2.43),v(o,X,.41,2.81,4.72,-3.81,1.51,-.17),v(o,X,.41,2.81,4.72,3.81,1.51,-.17),v(o,re,7.58,2.9,.28,.03,1.51,.9),v(o,X,7.72,.65,.31,.02,.51,2.15);const r=[[-4.05,2.76],[4.12,2.76],[4.12,3.07],[3.77,3.31],[1.27,3.31],[.87,3.65],[-3.49,3.65],[-4.05,3.18]];j(o,X,r,5.4,0,0,-.05,.05),j(o,_t,r,.21,0,.015,2.61,.037),j(o,I,[[-1.16,2.79],[1.21,2.79],[1.04,3.05],[-.92,3.05]],1.11,.54,0,2.49,.025),v(o,ee,4.63,.078,.1,-1.45,3.49,2.735),v(o,ne,3.45,.058,.08,-2.02,2.89,2.762),v(o,ne,1.77,.058,.08,2.81,2.89,2.762);for(const g of[-3.92,1.42,3.91])j(o,I,[[-.18,.12],[.18,.12],[.14,2.53],[-.05,2.81],[-.18,2.66]],.25,g,0,2.21,.023);Eo(o);const c=[[-.9,0],[.9,0],[.9,1.84],[.58,2.18],[-.66,2.18],[-.9,1.94]];j(o,I,c,.23,.53,.18,2.2,.042),j(o,ne,c,.033,.53,.224,2.33).scale.set(.916,.94,1),j(o,re,c,.035,.53,.247,2.36).scale.set(.851,.91,1);for(const g of[-1,1])v(o,X,.64,1.57,.035,.53+g*.362,1.13,2.39),v(o,I,.04,.66,.046,.53+g*.124,1.01,2.399);v(o,ne,.99,.07,.05,.53,1.58,2.424),v(o,Fe,.14,.088,.056,1.68,1.2,2.33),v(o,I,2.55,.13,.79,.53,.147,2.77);for(const g of[-1,1])v(o,ne,.12,.024,.54,.53+g*1.02,.221,2.86);Bo(o),v(o,X,1.96,.447,.12,.54,2.61,2.64);const h=new F(new Pe(1.86,.407),Ao());h.position.set(.54,2.61,2.706),o.add(h);for(const g of[-1,1]){for(let w=0;w<5;w++)v(o,I,.16,1.27,.28,g*4.03,1.78,-.89+w*.43);v(o,ee,.11,.105,3.38,g*4.07,2.52,.04),v(o,ne,.11,.065,2.2,g*4.08,2.78,.34),v(o,re,1.48,1.1,.11,2.22*g,1.61,-2.677),v(o,Fe,1.29,.075,.042,2.22*g,2.07,-2.746)}for(let g=0;g<4;g++)v(o,I,3.23,.12,.16,-1.1,3.72,-2.06+g*.42);const l=-2.97,f=-1.29;S(o,X,.45,.68,.23,l,3.78,f,8);for(const[g,w]of[[-.32,1.8],[.01,2.49],[.38,1.21]])S(o,I,.032,.068,w,l+g,3.84+w/2,f,8),S(o,ee,.09,.09,.12,l+g,3.88+w*.2,f,8),S(o,g>0?ne:Gt,.041,.051,.094,l+g,3.84+w,f,8);for(const g of[4.62,4.88,5.15])v(o,I,.82,.045,.05,l+.03,g,f);Io(o),ko(o);const u=o.localToWorld(new C(2.37,0,4.04)),p=T(u.x,u.z);v(t,_t,1.29,.11,.41,u.x,p+.46,u.z).rotation.y=o.rotation.y;for(const g of[-.45,.45])v(t,X,.13,.46,.35,u.x+g,p+.22,u.z);v(t,ee,1.04,.045,.037,u.x,p+.45,u.z+.21),e.add(u.x,u.z,1.26,.4,p-.07,.61,o.rotation.y);const m=o.localToWorld(new C(0,-.4,-.15));e.add(m.x,m.z,8.07,4.94,m.y,4.1,o.rotation.y);const d=o.localToWorld(new C(2.77,.41,2.44));return e.add(d.x,d.z,2.3,.62,d.y,2.09,o.rotation.y),Ro(o,n)}const Me=P("#374b54"),Ee=P("#4c3435"),lt=P("#775342"),Xe=P("#c6a580"),Lt=P("#edd0a9"),je=P("#3f444b",.59,.3),Ce=P("#b27656",.49,.24),ie=P("#d9aa67",.5,.15),vs=J(15309381,1.35),zt=J(16761976,2.2);function vt(t,e,n){const[s,i]=me[e].landmark,a=new Y;return a.position.set(s,T(s,i),i),a.rotation.y=n,t.add(a),a}function Uo(t,e,n,s,i,a=i){const o=s.clone().sub(n),r=n.clone().lerp(s,.5);v(t,e,i,o.length(),a,r.x,r.y,r.z).quaternion.setFromUnitVectors(new C(0,1,0),o.normalize())}function ws(t,e){const n=e-t;return new gt().moveTo(-t,0).lineTo(t,0).lineTo(t,n).quadraticCurveTo(t,e,0,e).quadraticCurveTo(-t,e,-t,n).lineTo(-t,0)}function At(t,e,n,s,i,a,o){return E(t,new rs(ws(a,o),12),e,n,s,i)}function Do(t,e,n,s,i,a){At(t,Ee,e,n-.05,s,i*.57,a+.11),At(t,vs,e,n,s+.018,i*.43,a),v(t,lt,i*1.26,.108,.24,e,n-.045,s+.056),v(t,Ee,.06,a*.87,.044,e,n+a*.43,s+.047),v(t,Ee,i*.93,.05,.044,e,n+a*.48,s+.047)}function Go(t,e,n,s){const a=vt(t,"dream-ocean",.29),[o,r,c]=a.position,h=[P("#606f81"),P("#7a8499"),P("#8b9ba6"),P("#707787")],l=P("#3b586a"),f=P("#a1b4c3"),u=J(10017008,.45),p=S(a,l,2.97,3.3,.33,0,-.06,.03,12);p.scale.z=.59;const m=S(a,h[1],2.53,2.86,.2,0,.2,.16,14);m.scale.z=.55;const d=v(a,f,3.15,.16,1.25,0,.14,1.13);d.rotation.y=-.03;const g=1.61,w=2.61,_=new gt().moveTo(-g,.25).lineTo(g,.25).lineTo(g,w).quadraticCurveTo(g,w+1.2,0,w+2.2).quadraticCurveTo(-g,w+1.2,-g,w).closePath(),R=new F(new rs(_,36),So(e,s));R.position.z=.17,a.add(R);for(const y of[-1,1])for(let b=0;b<4;b++){const M=.84-.044*b,A=v(a,h[(b+1)%h.length],M,.58,.94-b*.057,y*(g+M/2-.04),.49+b*.61,.03);A.rotation.z=(b%2-.5)*.035,v(a,f,.036,.45,.05,y*1.72,.51+b*.61,.55-b*.025)}const z=(y,b)=>{const M=Math.sign(1-y*2),A=1-Math.abs(1-y*2);return[M*((1-A*A)*(g+b)),w+(2.4*A-.2*A*A)*(1+b*.44)]};for(let y=0;y<15;y++){const b=(y+.031)/15,M=(y+.969)/15,A=y===7,Q=[z(b,-.075),z(M,-.075),z(M,A?.73:.61),z(b,A?.73:.61)];if(j(a,h[y%h.length],Q,A?.91:.7,0,0,0,.035),y%2===0){const[G,V]=z((b+M)/2,.18),D=v(a,u,.044,.18,.02,G,V,A?.491:.394);D.rotation.z=(y-7)*-.11}}for(const[y,b,M,A]of[[-3.62,-.68,1,-.24],[3.18,-.63,.84,.29],[-4.2,1.23,.61,-.3],[3.72,1,.45,.32],[1.56,-2.95,.57,-.21]]){const Q=E(a,new it(1,0),h[Math.round(M*3)],y,1.22*M,b);Q.scale.set(.66*M,2.33*M,.61*M),Q.rotation.z=A,Q.rotation.y=b,E(a,new it(.21,0),u,y,.7*M,b+.42*M).scale.set(.34,1.9,.49)}for(const y of[-2.85,2.82])S(a,l,.24,.32,.62,y,.32,1.6,7),E(a,new it(.21,0),u,y,.76,1.6).scale.y=1.35;n.add(o,c,5.4,1.75,r-.5,5.65,.29)}function Lo(t,e,n){const s=vt(t,"pocket-orbit",.15),[i,a,o]=s.position,r=P("#8c857d"),c=P("#646b6b"),h=P("#c78d50");S(s,Xe,3.38,3.68,.52,0,-.3,0,12),S(s,Me,3.31,3.51,.25,0,-.01,0,12),S(s,r,3.19,3.33,.13,0,.162,0,12),S(s,c,2.85,2.85,.03,0,.237,0,30);const l=E(s,new pe(2.42,.035,4,64),Lt,0,.26,0);l.rotation.x=-Math.PI/2;for(let f=0;f<12;f++){const u=f*Math.PI/6,p=Math.cos(u)*3.07,m=Math.sin(u)*3.07,d=v(s,f%3===0?zt:h,.25,.074,.14,p,.247,m);d.rotation.y=-u}v(s,Xe,1.69,.22,.73,-.08,.04,3.45);for(const f of[-2.56,2.56])S(s,je,.095,.14,1.42,f,.68,-2.12),S(s,zt,.15,.15,.2,f,1.43,-2.12,11),S(s,ie,.16,.18,.07,f,1.57,-2.12);for(const f of[-1.9,-.91,1.93])v(s,je,.56,.41,.73,-3.54,.04,f),v(s,Ce,.58,.1,.75,-3.54,.28,f),v(s,Me,.26,.162,.022,-3.54,.1,f+.37);oo(async()=>{const{addPocketOrbitShuttle:f}=await import("./pocketOrbitShuttle-Bhcs-OWI.js");return{addPocketOrbitShuttle:f}},__vite__mapDeps([0,1,2]),import.meta.url).then(({addPocketOrbitShuttle:f})=>f(s,n)),e.add(i,o,5.3,5.25,a-.42,3.4,.15)}function $t(t,e,n,s,i,a){const o=c=>i*(1-Math.abs(c/n))**1.55+Math.abs(c/n)**11*.24,r=[];for(let c=0;c<=20;c++){const h=-n+c*n/10;r.push([h,o(h)])}for(let c=20;c>=0;c--){const h=-n+c*n/10;r.push([h,o(h)-.17])}j(t,a,r,s,0,e,0,.015);for(let c=0;c<=22;c++){const h=-n+c*n/11,l=S(t,c%3===0?Ce:a,.06,.06,s+.05,h,e+o(h)+.02,0,7);l.rotation.x=Math.PI/2}for(const c of[-s/2-.012,s/2+.012])for(let h=0;h<14;h++){const l=-n+h*n/7,f=l+n/7;Uo(t,ie,new C(l,e+o(l)-.043,c),new C(f,e+o(f)-.043,c),.075)}}function Kt(t,e,n){const s=new Y;s.position.set(e,.2,.55),t.add(s);const i=[[-.61,0],[.63,0],[.63,.92],[.34,1.26],[.39,1.98],[.12,2.19],[-.61,2.19]];j(s,n,i,.94,0,0,0,.042).rotation.y=-Math.PI/2,v(s,Me,.89,.83,.078,0,1.59,.348).rotation.x=-.09,v(s,J(9753296,.36),.73,.57,.025,0,1.61,.402).rotation.x=-.09;const a=new Y;a.position.set(0,1.61,.436),s.add(a);for(let o=0;o<4;o++)v(a,n,.116,.106,.012,(o%2-.5)*.18,(Math.floor(o/2)-.5)*.15,0);v(s,Ce,.99,.14,.46,0,1.06,.45),S(s,je,.039,.041,.14,-.28,1.19,.49,10),E(s,new Ye(.071,10,7),vs,-.28,1.28,.49);for(const o of[.08,.23])S(s,ie,.06,.052,.048,o,1.16,.5,10);v(s,Lt,.69,.16,.036,0,2.01,.388)}function No(t,e){const s=vt(t,"hanzizap",-.17),[i,a,o]=s.position,r=P("#a75f4a"),c=P("#426564"),h=P("#d9a34f");v(s,Xe,5.57,.37,3.9,0,-.07,.17),v(s,lt,5.44,.12,3.8,0,.145,.17),v(s,r,4.8,2.57,.24,0,1.36,-1.39);for(const f of[-2.23,2.23]){for(const u of[-1.31,1.39])S(s,r,.115,.15,2.95,f,1.53,u),S(s,je,.19,.21,.21,f,.22,u),S(s,ie,.155,.156,.15,f,2.67,u);v(s,c,.119,1.43,2.81,f,.85,0);for(let u=0;u<6;u++)v(s,h,.037,.94,.089,f+Math.sign(f)*.074,.91,-1.13+u*.448)}for(const f of[-1.42,1.42])v(s,lt,5.11,.24,.23,0,2.88,f);$t(s,3.08,2.99,3.89,.99,c),v(s,c,2.82,.57,1.98,0,3.96,0),v(s,lt,2.96,.105,2.04,0,4.21,0);for(let f=0;f<9;f++)v(s,ie,.045,.3,.034,(f-4)*.265,3.99,1.005);$t(s,3.97,1.88,2.64,.61,c),v(s,ie,.19,.17,2.7,0,4.64,0),v(s,Ee,2.77,.28,.13,0,2.66,1.49),v(s,ie,2.46,.055,.05,0,2.66,1.58);for(const f of[-1.95,1.95]){const u=E(s,new Ye(.222,12,9),zt,f,2.49,1.72);u.scale.y=1.19,S(s,Ce,.18,.16,.08,f,2.76,1.72),S(s,Ce,.15,.18,.08,f,2.22,1.72),v(s,r,.031,.15,.031,f,2.12,1.72)}Kt(s,-.93,h),Kt(s,.76,r);const l=v(s,r,3.5,.037,.61,0,.071,2.01);l.rotation.y=.022;for(const f of[-1.58,1.58])v(s,ie,.042,.04,.52,f,.085,2.01);e.add(i,o,5.13,3.63,a-.42,4.8,-.17)}function Ho(t,e){const s=vt(t,"observatory",.34),[i,a,o]=s.position,r=[P("#64928d",.48,.25),P("#588682",.45,.26),P("#7a9e92",.45,.25)],c=P("#c2b3a2");S(s,je,2.1,2.37,.35,0,.04,0,12),S(s,c,1.84,1.95,2.78,0,1.45,0,15),S(s,Lt,1.98,1.91,.21,0,2.81,0,15),S(s,Me,2.02,1.997,.29,0,3.058,0,16);for(let u=0;u<12;u++){const p=new Ye(1.98,6,11,u*Math.PI/6,Math.PI/6,0,Math.PI/2),m=E(s,p,r[u%3],0,3.18,0);m.scale.y=.83;const d=E(s,new pe(1.975,.028,5,22,Math.PI/2),Ce,0,3.19,0);d.rotation.y=u*Math.PI/6,d.scale.y=.83}const h=E(s,new pe(2.11,.062,6,40),ie,0,3.04,0);h.rotation.x=Math.PI/2;const l=new Bt(ws(.59,1.75),{depth:.26,bevelEnabled:!0,bevelSize:.035,bevelThickness:.034,bevelSegments:1,curveSegments:12});E(s,l,Ee,0,.16,1.76),At(s,Me,0,.204,2.055,.47,1.58);for(const u of[-.24,0,.24])v(s,Ee,.025,1.17,.032,u,.81,2.063);v(s,ie,.08,.11,.056,.27,.75,2.082);for(const u of[-1,1]){const p=new Y;p.rotation.y=u*.78,s.add(p),Do(p,0,1.27,1.86,.47,1.04)}const f=new Y;f.position.set(.56,4.32,.23),f.rotation.z=-.85,f.rotation.x=.26,s.add(f),S(f,Me,.48,.39,2.23,0,.82,0,18),S(f,Ce,.58,.52,.24,0,2.04,0,18),S(f,P("#a4c8c8",.23,.41),.442,.452,.041,0,2.17,0,18),S(f,ie,.47,.49,.12,0,1.58,0,18),S(f,ie,.44,.44,.1,0,.19,0,16),S(f,Me,.17,.15,.56,0,-.51,0,12),v(s,Xe,1.2,.26,.76,0,.1,2.07).rotation.x=-.13,v(s,Xe,1.32,.19,.65,0,-.07,2.56).rotation.x=-.2,e.add(i,o,3.57,3.63,a-.61,5.3,.34)}function Oo(t,e,n,s){const i=Fo(t,e,n);return Go(t,n,e,s),Lo(t,e,s),No(t,e),Ho(t,e),i}let st=null;function xs(){if(st)return st;const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=e.createRadialGradient(64,64,0,64,64,63);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,255,255,.42)"),n.addColorStop(.6,"rgba(255,255,255,.1)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,128,128),st=new It(t),st}function ot(t,e,n,s,i,a){const o=new F(new Pe(i,i),new te({map:xs(),color:e,opacity:a,transparent:!0,blending:Ke,depthWrite:!1,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-4}));o.rotation.x=-Math.PI/2,o.position.set(n,T(n,s)+.09,s),o.renderOrder=2,t.add(o)}function Vo(t,e,n,s,i,a,o){const r=new Ft(new ls({map:xs(),color:e,opacity:o,transparent:!0,blending:Ke,depthWrite:!1,toneMapped:!1}));r.position.set(n,s,i),r.scale.setScalar(a),t.add(r)}function qo(t,e){const n=P("#3c3a44",.6,.35),s=J(16762482,2.4),i=[[2.9,17.6],[.25,14.7],[2.45,10.7],[-1.4,8.35],[-4.88,5.6],[-8.52,3.55],[-12.32,2.31],[6.28,5.4],[9.2,2.73],[11.55,-.85],[7.3,11.5],[10.1,14.65],[-7.98,-.65],[-8.35,-5.9],[-6.55,-9.09]],a=ue(71893);for(const[r,c]of i){const h=T(r,c),l=.64+a()*.22;S(t,n,.055,.08,l,r,h+l*.5,c,7),S(t,n,.12,.1,.13,r,h+.06,c,7),S(t,s,.081,.11,.19,r,h+l,c,8),S(t,n,.041,.15,.107,r,h+l+.102,c,8);const f=v(t,n,.19,.041,.19,r,h+l-.088,c);f.rotation.y=Math.PI/4,Vo(t,16757340,r,h+l,c,1.05,.55),ot(t,16752714,r,c,3.4,.34)}const o=[[.4,1.7,3.6,4645103,14,11],[-2.3,1.8,3.1,16751186,10,9],[-15.2,2.4,-1.4,8370431,16,12],[13.2,2.6,11.8,16757854,14,10],[-3.6,2,-11.4,16761466,7,8],[12.4,2.2,-4.2,9427199,10,10]];for(const[r,c,h,l,f,u]of e?o:o.slice(0,3)){const p=new qs(l,f,u,1.6);p.position.set(r,T(r,h)+c,h),t.add(p)}ot(t,8370431,-15.2,-.6,7.5,.26),ot(t,16757854,13.2,12.6,6.5,.22),ot(t,4645103,.5,4.6,5.5,.18)}const Wo=[{id:"dream-ocean",logo:"dream-ocean-logo.webp",aspect:680/277,x:-11.86,z:-.78,yaw:.3,width:3.46,height:1.63,lift:.65,frame:"#677d8e",panel:"#cadde5",lamp:10212583},{id:"pocket-orbit",logo:"pocket-orbit-logo.webp",aspect:680/375,x:9.14,z:-3.09,yaw:-.19,width:3.16,height:1.85,lift:.57,frame:"#a69c8b",panel:"#272a42",lamp:15969383},{id:"hanzizap",logo:"hanzizap-logo.svg",aspect:290/69,x:10.02,z:12.03,yaw:.13,width:3.44,height:1.01,lift:.79,frame:"#b4814c",panel:"#4c3435",lamp:16761976}];function Xo(t,e,n){const s=new Et;return Wo.map(({id:i,logo:a,aspect:o,x:r,z:c,yaw:h,width:l,height:f,lift:u,frame:p,panel:m,lamp:d})=>{const g=new Y,w=T(r,c);g.position.set(r,w,c),g.rotation.y=h,t.add(g);const x=P(p,.65,.16),_=P(m,.81),R=J(d,.52),z=u+f*.5,y=l*.5,b=f*.5,M=.15;j(g,x,[[-y+M,-b],[y-M,-b],[y,-b+M],[y,b-M],[y-M,b],[-y+M,b],[-y,b-M],[-y,-b+M]],.24,0,z,0,.027),v(g,_,l-.22,f-.2,.31,0,z,0);for(const D of[-1,1])v(g,x,.2,u+.31,.25,D*l*.34,u*.4,0),v(g,_,.39,.15,.49,D*l*.34,.035,0),v(g,R,.4,.035,.055,D*(y-.39),u+.071,.164),v(g,R,.4,.035,.055,D*(y-.39),u+.071,-.164);const A=Math.min(l-.5,(f-.34)*o),Q=new Pe(A,A/o),G=s.load(`./island-media/${a}`,n);G.colorSpace=mt,G.anisotropy=4;const V=new te({map:G,transparent:!0,depthWrite:!1,toneMapped:!1});for(const D of[-1,1]){const B=new F(Q,V);B.position.set(0,z,D*.166),B.rotation.y=D<0?Math.PI:0,g.add(B)}return e.add(r,c,l,.38,w-.2,f+u+.28,h),{id:i,box:new cs().setFromObject(g)}})}const ys=Math.PI*2,jo=new O("#2e7255"),Qo=new O("#7d9e58"),$o=new O("#41747a"),Ko=new O("#8d8052"),Yo=new O("#74654f");function kt(t,e,n){const s=T(t,e),i=.41+Math.sin(t*1.37+e*.64)*.07+Math.cos(t*.43-e*.77)*.15;return n.copy(jo).lerp(Qo,i+Math.max(0,s)*.062),n.lerp($o,Math.exp(-((t+15)**2+(e+1)**2)/54)*.59),n.lerp(Ko,Math.exp(-((t-13)**2+(e+4)**2)/39)*.77),n.lerp(Yo,Math.max(0,(xe(t,e)-.83)*3.4)+Math.max(0,-.5-s)*.21),n}function Tt(t,e,n){t.onBeforeCompile=s=>{s.vertexShader=`varying vec3 terrainPoint;
`+s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
terrainPoint = position;`),s.fragmentShader=`
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
    `+s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      vec2 groundUV = terrainPoint.xz + terrainPoint.y * vec2(.42, .86);
      vec2 gritUV = groundUV * ${n.toFixed(2)};
      float sharpness = 1.0 - smoothstep(.42, 1.32, length(fwidth(gritUV)));
      float grit = (earthShade(gritUV) - .5) * sharpness;
      float coarse = earthShade(groundUV * .83 + 4.0) - .5;
      diffuseColor.rgb *= 1.0 + grit * ${e.toFixed(2)} + coarse * .18;`)},t.customProgramCacheKey=()=>`ground-${e}-${n}`}function Zo(){const n=[0,T(0,0),0],s=[kt(0,0,new O)],i=[];for(let o=1;o<=37;o++)for(let r=0;r<144;r++){const c=Te((r+o%2*.5*(o<37?1:0))/144*ys,o/37),[h,l]=c;n.push(h,T(h,l),l),s.push(kt(h,l,new O));const f=1+(o-1)*144+r,u=1+(o-1)*144+(r+1)%144;o===1?i.push(0,u,f):i.push(f-144,u,f,f-144,u-144,u)}const a=new de;return a.setAttribute("position",new K(n,3)),a.setAttribute("color",Dt(s)),a.setIndex(i),a.computeVertexNormals(),a}function Yt(t,e,n,s,i){const a=[1,1,.96,.985,.83,.765,.63,.34,.035,0],o=[0,-.65,-2.1,-3.05,-4.65,-6.6,-8.65,-11.9,-13.3,-13.82],r=["#746e56","#695451","#635569","#937364","#594e66","#484656","#63536b","#45415a","#4b4357","#3c384e"].map(p=>new O(p)),c=[],h=[],l=[];for(let p=0;p<o.length;p++)for(let m=0;m<t;m++){const d=m/t*ys,g=Math.sin(d*5+p*.59)*.67+Math.cos(d*13-.9)*.22,w=Math.sin(d*39+.4)*.2+Math.cos(d*49)*.12,x=p>0&&p<9?(g+w)*(.031+p*.003):0,[_,R]=Te(d,a[p]+x),[z,y]=Te(d),b=p>0?Math.sin(d*4+.6)*.55+g*.44:0;if(c.push(n+(_-p*p*.025)*e,s+(o[p]+T(z,y)/(1+p*.18)+b)*e,i+(R+p*p*.022)*e),h.push(r[p].clone().multiplyScalar(.87+g*.1+w*.44)),p>0){const M=p*t+m,A=p*t+(m+1)%t;l.push(M-t,A,M,M-t,A-t,A)}}const f=new de;f.setAttribute("position",new K(c,3)),f.setAttribute("color",Dt(h)),f.setIndex(l);const u=f.toNonIndexed();return f.dispose(),u.computeVertexNormals(),u}function Jo(t){const e=[];for(let n=0;n<t.length-1;n++){const[s,i]=t[Math.max(0,n-1)],[a,o]=t[n],[r,c]=t[n+1],[h,l]=t[Math.min(t.length-1,n+2)],f=Math.ceil(Math.hypot(r-a,c-o)*4);for(let u=0;u<f;u++){const p=u/f,m=(d,g,w,x)=>.5*(2*g+(-d+w)*p+(2*d-5*g+4*w-x)*p*p+(-d+3*g-3*w+x)*p*p*p);e.push(new H(m(s,a,r,h),m(i,o,c,l)))}}return e.push(new H(...t[t.length-1])),e}const bs=no.map(Jo),en=new O("#b89f71"),tn=new O("#c7af84");function sn(){const t=[],e=[],n=[],s=[-1,-.79,-.32,.19,.8,1],i=ue(19309);for(const[o,r]of bs.entries()){const c=t.length/3,h=o===0?.94:.66;for(const[l,f]of r.entries()){const u=r[Math.max(0,l-1)],p=r[Math.min(r.length-1,l+1)],m=new H(p.y-u.y,u.x-p.x).normalize(),d=h*(.9+.11*Math.sin(l*.32)+.13*i()),g=Math.min(1,(l+2)/5,(r.length-l)/7);for(const[w,x]of s.entries()){const _=f.x+m.x*x*d,R=f.y+m.y*x*d;t.push(_,T(_,R)+.041+.003*o,R);const z=Math.abs(x)>.99?.02:Math.min(1,(1-Math.abs(x))*1.95);e.push(kt(_,R,new O).lerp(w%2===0?en:tn,z*g).multiplyScalar(.9+i()*.2))}if(l!==0)for(let w=1;w<s.length;w++){const x=c+l*s.length+w,_=x-s.length;n.push(_-1,x-1,x,_-1,x,_)}}}const a=new de;return a.setAttribute("position",new K(t,3)),a.setAttribute("color",Dt(e)),a.setIndex(n),a.computeVertexNormals(),a}function on(t){const e=new Se({vertexColors:!0,roughness:1});Tt(e,.23,6.2);const n=new F(Zo(),e);n.receiveShadow=!0,n.castShadow=!0,t.add(n);const s=new Se({vertexColors:!0,roughness:.96});Tt(s,.31,3.6);const i=new F(Yt(144,1,0,0,0),s);i.receiveShadow=!0,i.castShadow=!0,t.add(i);const a=new Se({vertexColors:!0,roughness:.92});Tt(a,.39,15.6);const o=new F(sn(),a);o.receiveShadow=!0,t.add(o);for(const[r,c,h,l]of[[-72,-3,-90,.38],[-46,-6,-84,.22],[49,-4,-93,.32],[75,-1.5,-138,.44],[89,-7,-67,.17],[-89,-5.2,-65,.29]]){t.add(new F(Yt(48,l,r,c,h),s));const f=new F(n.geometry,e);f.position.set(r,c,h),f.scale.setScalar(l),t.add(f)}}const Ct=8,Pt=8,nn=64,Zt=2.23,an=Math.SQRT2-1,rn=4,Jt=1.8,ln=2.0625;function cn(t,e,n,s){const i=n.matrixWorld.elements,a=t*i[0]+e*i[2],o=-t*i[2]+e*i[0],r=Math.abs(a),c=Math.abs(o),h=an*(s%2===1?.72:1);return Math.min(r,c)>=Math.max(r,c)*h?o<0?a<0?3:5:a<0?1:7:r>c?a<0?2:6:o<0?4:0}function es(t,e,n,s){let i=!1;const a=t.load(new URL(`./island-media/andi/${e}.webp`,document.baseURI).href,()=>{i=!0,s()});a.colorSpace=mt,a.magFilter=ft,a.minFilter=ft,a.generateMipmaps=!1,a.repeat.set(1/n,1/Ct);const o=new Ft(new ls({map:a,transparent:!1,alphaTest:.5,toneMapped:!1}));return o.name=`Andi ${e}`,o.scale.set(Zt,Zt,1),o.center.set(.5,1/nn),o.position.y=.044,o.visible=!1,{sprite:o,get loaded(){return i},pose(r,c){a.offset.set(c/n,(Ct-1-r)/Ct)}}}function fn(t,e){const n=new Y;n.name="Andi";const s=new Et,i=es(s,"walk",Pt+1,e),a=es(s,"sprint",Pt,e);n.add(i.sprite,a.sprite);const o=new F(new Pe(1.62,1.38),new Z({uniforms:{tint:{value:new O("#201c28")}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`
      varying vec2 coords;
      void main() {
        coords = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 tint;
      varying vec2 coords;
      void main() {
        float radius = length((coords - .5) * vec2(2.2, 2.6));
        gl_FragColor = vec4(tint, .57 * (1.0 - smoothstep(.09, .91, radius)));
        #include <colorspace_fragment>
      }
    `}));o.position.y=.049,n.add(o);const r=new C(0,0,1),c=new C,h=rn/t;let l=4,f="idle",u=0,p=!1;return{root:n,get ready(){return i.loaded},update(m,d,g,w,x,_,R){const z=m.x-n.position.x,y=m.z-n.position.z;n.position.copy(m);const b=p&&!R&&!_?Math.hypot(z,y):0,M=b/g;p=!0;const A=M>.015;l=cn(A?z:Math.sin(d),A?y:Math.cos(d),w,l);const Q=t*(f==="sprint"?1.035:1.075);if(f=A?x||M<Q?"walk":"sprint":"idle",f==="idle")u=0;else{const q=M*h/(2*Jt),De=Re.clamp(Math.sqrt(q),.7,2.2),Je=ln*Jt*De;u=(u+b*h/Je)%1}const G=f==="sprint"&&a.loaded,V=Math.floor(u*Pt);i.sprite.visible=i.loaded&&!G,a.sprite.visible=G,G?a.pose(l,V):i.pose(l,f==="idle"?0:V+1),o.visible=i.loaded&&!_;const{x:D,z:B}=m;c.set(T(D-.29,B)-T(D+.29,B),.58,T(D,B-.29)-T(D,B+.29)).normalize(),o.quaternion.setFromUnitVectors(r,c)}}}const Be=P("#4a3c3a"),Qe=P("#6a5548");function wt(t,e=0){const n=new Se({color:t,roughness:.78,flatShading:!0});return e&&(n.emissive=new O(t),n.emissiveIntensity=e),n.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace("#include <emissivemap_fragment>",`
      #include <emissivemap_fragment>
      float leafRim = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
      vec3 leafRimColor = mix(vec3(.10, .32, .34), vec3(.34, .30, .62), clamp(normal.y * .5 + .5, 0.0, 1.0));
      totalEmissiveRadiance += leafRimColor * leafRim * .42 * diffuseColor.rgb * 3.0;
    `)},n.customProgramCacheKey=()=>`foliage-rim-${e}`,n}const hn=["#2f6a52","#43805a","#5a9064","#3f7a63","#6f9768"].map(t=>wt(t)),dn=["#2f5f74","#3f7a8c","#4f8e90","#4a7894","#6a9aa2"].map(t=>wt(t)),ts=["#1f4d48","#285c50","#2f6a5a","#234f5a"].map(t=>wt(t)),nt=["#c66fae","#9a6fd6","#e38bb8","#7d8de6"].map(t=>wt(t,.32)),un=J(16766704,2.2);function Rt(t,e,n){const s=new ht(t,e),i=ue(n),a=s.attributes.position,o=new Map;for(let r=0;r<a.count;r++){const c=`${a.getX(r).toFixed(3)},${a.getY(r).toFixed(3)},${a.getZ(r).toFixed(3)}`;o.has(c)||o.set(c,.84+i()*.3);const h=o.get(c);a.setXYZ(r,a.getX(r)*h,a.getY(r)*h,a.getZ(r)*h)}return s.computeVertexNormals(),s}function we(t,e,n,s,i,a){const o=n.clone().sub(e),r=e.clone().lerp(n,.5);E(t,new as(i,s,o.length()*1.05,7),a,r.x,r.y,r.z).quaternion.setFromUnitVectors(new C(0,1,0),o.normalize())}function pn(t,e,n,s,i,a,o,r=!1){const c=T(n,s),h=r?dn:hn,l=ue(o),f=new Y;f.position.set(n,c-.18,s),f.rotation.y=a,f.scale.setScalar(i),t.add(f);const u=[new C(0,-.02,0),new C(-.11,.96,.09),new C(.055,1.88,.16),new C(.49,2.68,.2),new C(.75,3.3,.14)],p=[.238,.174,.118,.071,.023];for(let m=1;m<u.length;m++)we(f,u[m-1],u[m],p[m-1],p[m],m%2===0?Be:Qe);for(let m=0;m<5;m++){const d=m*Math.PI*.4+l()*.31;we(f,new C(-.02,.31,.03),new C(Math.cos(d)*.62,-.02,Math.sin(d)*.6),.12,.036,Be)}for(let m=0;m<10;m++){const d=m/10,g=m*2.4+l()*.41,w=new C(Math.cos(g),0,Math.sin(g)),x=u[1].clone().lerp(u[4],.25+.67*d),_=(1-d*.69)*(1.32+l()*.51),R=x.clone().addScaledVector(w,_);R.y+=.31+l()*.19;const z=x.clone().lerp(R,.53);z.y-=.14,we(f,x,z,.079-d*.033,.049,Be),we(f,z,R,.052,.017,Qe);for(let y=0;y<3;y++){const b=z.clone().lerp(R,.22+y*.32),M=(1-d*.54)*(1-y*.18),A=E(f,Rt(1,1,o+m*7+y),h[(m+y+1)%h.length],b.x,b.y+.1,b.z);A.scale.set((.86+l()*.25)*M,(.32+l()*.15)*M,(.81+l()*.22)*M),A.rotation.y=m*.94,A.rotation.z=-.16+l()*.35}}for(let m=0;m<3;m++)E(f,Rt(.56-m*.09,1,o+91+m),h[2+m],.62+.139*m,3.07+.2*m,.14).scale.set(1.22,.57,.92);e.add(n,s,i*.43,i*.43,c-.2,i*1.8)}function mn(t,e,n,s,i,a){const o=ue(a),r=T(n,s),c=new Y;c.position.set(n,r-.1,s),c.rotation.y=o()*6.28,c.scale.setScalar(i),t.add(c),S(c,Be,.07,.14,1.3,0,.62,0,6);const h=4+Math.floor(o()*2);for(let l=0;l<h;l++){const f=l/h,u=(1-f*.72)*(.95+o()*.14),p=.95-f*.25,m=new js(u,p,7,1),d=m.attributes.position;for(let w=0;w<d.count;w++)d.getY(w)<0&&(d.setY(w,d.getY(w)-.08+o()*.05),d.setX(w,d.getX(w)*(.9+o()*.2)),d.setZ(w,d.getZ(w)*(.9+o()*.2)));m.computeVertexNormals();const g=E(c,m,ts[(l+a)%ts.length],(o()-.5)*.05,.9+l*.52,(o()-.5)*.05);g.rotation.y=o()*6.28}e.add(n,s,i*.5,i*.5,r-.2,i*3)}function gn(t,e,n,s,i,a){const o=ue(a),r=T(n,s),c=new Y;c.position.set(n,r-.1,s),c.rotation.y=o()*6.28,c.scale.setScalar(i),t.add(c);const h=[new C(0,0,0),new C(.12,.8,.05),new C(-.05,1.55,.1),new C(.15,2.1,0)],l=[.17,.12,.08,.05];for(let p=1;p<h.length;p++)we(c,h[p-1],h[p],l[p-1],l[p],Qe);const f=nt[a%nt.length],u=nt[(a+1)%nt.length];for(let p=0;p<7;p++){const m=p*2.4+o()*.5,d=p===0?0:.55+o()*.45,g=h[3].x+Math.cos(m)*d,w=h[3].z+Math.sin(m)*d,x=h[3].y+.1+(p===0?.35:o()*.3-.1);p&&we(c,h[2],new C(g,x-.1,w),.05,.02,Qe);const _=E(c,Rt(.5+o()*.2,1,a+p),p%3?f:u,g,x,w);if(_.scale.y=.7,p&&o()>.35){const R=E(c,new ht(.055,0),un,g*1.08,x-.42,w*1.08);R.castShadow=!1}}e.add(n,s,i*.4,i*.4,r-.2,i*2.5)}const vn=[[-12.9,9.6,.95],[-19.4,10.9,.85],[-11.4,-4.6,.8],[-19.6,1.1,.78],[6.9,15.1,.82],[17.7,4.2,.74]];function wn(t,e,n){const s=ue(48151);let i=0;const a=n?22:38;for(let o=0;o<900&&i<a;o++){const r=s()*Math.PI*2,c=.74+s()*.17,[h,l]=Te(r,c),f=T(h,l);l>12.5&&Math.abs(h-2)<9||f<ae+.25||$e(h,l,1.7)||e.solid(h,l,1.1,f-.5,f+3)||(mn(t,e,h,l,.8+s()*.65,3001+o),i++)}}const xn=[[-21.4,-1.2,1.22,.75,1],[-17.1,-7.15,1.32,.12,1],[-12.35,-5.4,.94,-1.2,1],[-17.95,2.62,.83,.68,1],[-22.2,5.9,.83,.24,1],[-8.15,-12.3,1.13,.28,0],[-.42,-16.85,1.12,-.43,0],[-9.65,-14.48,.78,1.1,0],[4.35,-15.45,1.29,.12,0],[8.67,-12.66,.88,1.68,0],[16.7,-10.47,1.01,-.29,0],[19.55,-6.5,1.03,.52,0],[22.02,-1.73,.79,-1,0],[20.45,5.3,1.26,.98,0],[18.05,10.94,1.12,-.4,0],[16.43,13.64,.66,2.12,0],[-7.15,13.7,1.13,.8,0],[-8.9,10.6,.86,1.46,0],[-3.2,14.32,.72,1.24,0],[-2.75,-6.9,.72,.26,0],[5.9,-.96,.78,-.46,0],[-10.5,-2.3,.72,.89,1],[-5.72,-3.48,.73,-.89,0]];function $e(t,e,n){const s=n*n;return bs.some(i=>i.some(a=>(a.x-t)**2+(a.y-e)**2<s))}function yn(t,e,n,s){const i=ue(9270),a=s?1200:2860,o=[],r=[],c=s?4:6;for(let d=0;d<c;d++){const g=i()*Math.PI*2,w=Math.cos(g),x=Math.sin(g),_=.18+i()*.36,R=.022+i()*.015,z=(i()-.5)*.28,y=(i()-.5)*.25,b=_*(.16+i()*.38),M=(B,q)=>[z+w*b*q*q+x*B*R*(1-q),_*q,y+x*b*q*q-w*B*R*(1-q)],A=M(-1,0),Q=M(1,0),G=M(-1,.47),V=M(1,.47),D=M(0,1);for(const B of[A,Q,G,Q,V,G,G,V,D]){o.push(...B);const q=.44+B[1]*1.02;r.push(q*1.06,q,q*.87)}}const h=new de;h.setAttribute("position",new K(o,3)),h.setAttribute("color",new K(r,3)),h.computeVertexNormals();const l=new Se({side:pt,vertexColors:!0,roughness:1});l.onBeforeCompile=d=>{d.uniforms.winds=n,d.vertexShader=`uniform float winds;
`+d.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      float breeze = sin(winds * 1.55 + instanceMatrix[3].x * .37 + instanceMatrix[3].z * .52);
      transformed.x += (breeze * .17 + .04) * position.y;
      transformed.z += breeze * .085 * position.y;
    `)},l.customProgramCacheKey=()=>"meadow-wind";const f=new Ws(h,l,a);f.receiveShadow=!0;const u=new Xs,p=new O;let m=0;for(let d=0;m<a&&d<a*5;d++){const g=(i()-.5)*55,w=(i()-.5)*42,x=T(g,w);if(xe(g,w)>.967||x<ae+.03||$e(g,w,.9)||e.solid(g,w,.2,x,x+.5))continue;const _=.48+.24*Math.sin(g*.71-w*.82)+.21*Math.cos(w*.63+g*.18);i()>_||(u.position.set(g,x-.018,w),u.rotation.y=i()*6.28,u.scale.set(.71+i()*.69,.52+i()*1.06,.71+i()*.65),u.updateMatrix(),p.setHSL(.146+i()*.12,.12+i()*.2,.33+i()*.19),f.setMatrixAt(m,u.matrix),f.setColorAt(m,p),m++)}f.count=m,t.add(f)}function bn(t,e,n){const s=["#6f7073","#827263","#697b77","#9d8a76","#51636a"].map(r=>P(r)),i=["#49694f","#5d805f","#798b61"].map(r=>P(r)),a=[J(10466559,.9),J(16757611,.8),J(16744383,.9),J(16773280,.7)],o=ue(5256);for(let r=0;r<(n?290:505);r++){const c=(o()-.5)*56,h=(o()-.5)*42,l=T(c,h),f=xe(c,h);if(f>.995||l<ae-.12||e.solid(c,h,.15,l,l+.3))continue;const p=f>.82?.23+o()**2*.79:.06+o()**2*.26;if($e(c,h,.89)&&p>.12)continue;const m=E(t,new it(p,0),s[r%s.length],c,l-p*.06,h);if(m.scale.set(.98+o()*.52,.35+o()*.43,.75+o()*.39),m.rotation.set(.25,o()*6.28,(o()-.5)*.43),p>.64&&e.add(c,h,p*1.15,p*1.17,l-.3,p*.75),!(f>.91||p<.16||r%4!==0))for(let d=0;d<4;d++)E(t,new ht(.2+o()*.25,0),i[d%i.length],c+(o()-.5)*.85,l+.132,h+(o()-.5)*.62).scale.set(1.22,.65+o()*.3,.78)}for(const[r,c,h]of[[-10.7,6.35,0],[-17.8,4.45,0],[-2.8,6.8,2],[3.5,3.84,1],[9.77,10.8,1],[15.76,11.53,3],[-5.4,-9.9,0],[15.2,-3.56,1],[3.12,14.72,3],[-4.88,11.4,2]])for(let l=0;l<(n?14:28);l++){const f=r+(o()-.5)*2.4,u=c+(o()-.5)*1.55,p=T(f,u),m=.19+o()*.31;if($e(f,u,.69)||p<ae||e.solid(f,u,.1,p,p+.3))continue;S(t,i[l%3],.011,.018,m,f,p+m/2,u,5);const d=E(t,new ht(.069+o()*.045,0),a[h],f,p+m,u);d.scale.y=.59}for(const[r,c]of[[-12.4,6.9],[-16.7,5.08],[-19.6,7.05],[-17.1,10.55]])if(!(T(r,c)<ae-.2))for(let h=0;h<13;h++){const l=(o()-.5)*.92,f=(o()-.5)*.67,u=.21+o()*.62,p=S(t,i[h%3],.012,.023,u,r+l,T(r+l,c+f)+u/2,c+f,5);p.rotation.z=l*.22}}function Mn(t){const e=P("#a68c67");for(const[n,s]of[[[.565,.64,.715,.79],.895],[[1.881,1.954,2.027],.925]]){let i;for(const a of n){const[o,r]=Te(a,s),c=T(o,r);S(t,Qe,.086,.11,1.04,o,c+.43,r,7),v(t,Be,.235,.145,.235,o,c+.965,r).rotation.y=a;const h=new C(o,c+.73,r);if(i){const l=i.clone().lerp(h,.5);l.y-=.15,we(t,i,l,.025,.023,e),we(t,l,h,.023,.025,e)}i=h}}}function Sn(t,e,n,s){xn.forEach(([a,o,r,c,h],l)=>pn(t,e,a,o,r,c,772+l*331,!!h)),vn.forEach(([a,o,r],c)=>{const h=T(a,o);h>ae+.2&&!$e(a,o,1.2)&&!e.solid(a,o,.9,h-.5,h+2)&&gn(t,e,a,o,r,61+c*17)}),wn(t,e,s),bn(t,e,s),yn(t,e,n,s),Mn(t),[-15,-1.02,10.5].forEach((a,o)=>{const[r,c]=o===0?he:[a,15.65],h=T(r,c);h>ae&&(v(t,Be,.28,.14,.83,r,h+.04,c).rotation.y=o*.27)})}class Tn{constructor(e){this.land=e}camera=new Qs(48,1,.18,700);yaw=.19;pitch=.415;aspect=1;position=new C;aim=new C;target=new C;sample=new C;initialized=!1;resize(e,n){this.aspect=e/Math.max(1,n),this.camera.aspect=this.aspect,this.camera.updateProjectionMatrix()}turn(e,n){this.yaw=(this.yaw-e*.0078)%(Math.PI*2),this.pitch=Re.clamp(this.pitch+n*.0057,.16,1.08)}recenter(){this.yaw=.19,this.pitch=.415}update(e,n,s,i,a,o=!1){const r=this.aspect<.76,c=s?r?58:52:48;if(s)this.walkPose(n,r);else{const f=67.5/Math.max(.32,this.aspect),u=r?Math.max(82,f):63+Math.max(0,1.28-this.aspect)*28,p=a?0:Math.sin(i*.16)*1.5;this.position.set(12.9+p,r?38.5:24.6,u),this.aim.set(r?-.25:-9.75*Math.min(1,this.aspect/1.46),r?u*.229:7.9,0)}const l=!this.initialized||o||a?1:1-Math.exp(-e*(s?9:3.5));this.camera.position.lerp(this.position,l),this.target.lerp(this.aim,s?Math.min(1,l*1.22):l),this.camera.fov=Re.lerp(this.camera.fov,c,l),this.camera.updateProjectionMatrix(),this.camera.lookAt(this.target),this.camera.updateMatrixWorld(),this.initialized=!0}walkPose(e,n){const s=Math.sin(this.yaw),i=Math.cos(this.yaw),a=n?8.9:9.3,o=a*Math.cos(this.pitch);this.aim.set(e.x-s*1.6,Math.max(-2,e.y)+1.78,e.z-i*1.6),this.position.set(e.x+s*o+i*.5,Math.max(-.5,e.y)+1.17+a*Math.sin(this.pitch),e.z+i*o-s*.5),this.sample.set(e.x,Math.max(-2,e.y)+1.5,e.z);for(let r=1;r<=20;r++){const c=r/20,h=Re.lerp(this.sample.x,this.position.x,c),l=Re.lerp(this.sample.y,this.position.y,c),f=Re.lerp(this.sample.z,this.position.z,c);if(this.land.solid(h,f,.42,l-.39,l+.38)||xe(h,f)<1&&T(h,f)>l-.45){this.position.lerp(this.sample,1-Math.max(.2,(r-1)/20));break}}}}const Cn=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowLeft","ArrowDown","ArrowRight"]),Pn=new Set(["ShiftLeft","ShiftRight"]);class _n{constructor(e,n,s,i){this.stick=n,this.paceButton=s;const a={signal:this.events.signal},o=(...d)=>d.some(g=>this.held.has(g)),r=()=>{const d=Number(o("KeyD","ArrowRight"))-Number(o("KeyA","ArrowLeft")),g=Number(o("KeyS","ArrowDown"))-Number(o("KeyW","ArrowUp"));this.axes.set(d+this.joystick.x,g+this.joystick.y),this.axes.lengthSq()>1&&this.axes.normalize(),i.invalidate()};e.addEventListener("keydown",d=>{d.altKey||d.ctrlKey||d.metaKey||d.isComposing||!i.active()||(Cn.has(d.code)||Pn.has(d.code)?(d.preventDefault(),this.held.add(d.code),r()):!d.repeat&&d.code==="KeyE"?(d.preventDefault(),i.inspect()):!d.repeat&&d.code==="KeyR"&&(d.preventDefault(),i.reset()))},a),window.addEventListener("keyup",d=>{this.held.delete(d.code)&&r()},a),e.addEventListener("blur",()=>{this.held.clear(),r()},a),window.addEventListener("blur",()=>this.clear(),a),s.addEventListener("pointerdown",d=>{d.button!==0||this.pacePointer!==null||!i.active()||(d.preventDefault(),this.pacePointer=d.pointerId,s.setPointerCapture(d.pointerId),s.setAttribute("data-held",""),i.invalidate())},a);const c=d=>{this.pacePointer===d.pointerId&&(this.pacePointer=null,s.removeAttribute("data-held"),i.invalidate())};s.addEventListener("pointerup",c,a),s.addEventListener("pointercancel",c,a),s.addEventListener("lostpointercapture",c,a);let h=null;e.addEventListener("pointerdown",d=>{d.button!==0||h||!i.active()||(h={id:d.pointerId,startX:d.clientX,startY:d.clientY,lastX:d.clientX,lastY:d.clientY,moving:!1},e.setPointerCapture(d.pointerId))},a),e.addEventListener("pointermove",d=>{if(i.active()){if(!h){d.pointerType==="mouse"&&i.hover(d.clientX,d.clientY);return}h.id===d.pointerId&&(!h.moving&&Math.hypot(h.startX-d.clientX,h.startY-d.clientY)<5||(h.moving=!0,i.look(d.clientX-h.lastX,d.clientY-h.lastY),h.lastX=d.clientX,h.lastY=d.clientY))}},a),e.addEventListener("pointerup",d=>{!h||h.id!==d.pointerId||(!h.moving&&i.active()&&i.pick(d.clientX,d.clientY),h=null)},a);const l=d=>{h?.id===d.pointerId&&(h=null)};e.addEventListener("pointercancel",l,a),e.addEventListener("lostpointercapture",l,a),e.addEventListener("pointerleave",()=>e.removeAttribute("data-inspectable"),a);const f=n.querySelector("span");let u=-1;const p=d=>{const g=n.getBoundingClientRect(),w=g.width*.32;this.joystick.set((d.clientX-g.left-g.width/2)/w,(d.clientY-g.top-g.height/2)/w),this.joystick.lengthSq()>1&&this.joystick.normalize(),f.style.transform=`translate(${this.joystick.x*w}px, ${this.joystick.y*w}px)`,r()};n.addEventListener("pointerdown",d=>{u!==-1||!i.active()||(d.preventDefault(),u=d.pointerId,n.setPointerCapture(u),p(d))},a),n.addEventListener("pointermove",d=>{d.pointerId===u&&i.active()&&p(d)},a);const m=d=>{u===d.pointerId&&(u=-1,this.joystick.set(0,0),f.style.removeProperty("transform"),r())};n.addEventListener("pointerup",m,a),n.addEventListener("pointercancel",m,a),n.addEventListener("lostpointercapture",m,a)}axes=new H;held=new Set;joystick=new H;events=new AbortController;pacePointer=null;get walkHeld(){return this.pacePointer!==null||this.held.has("ShiftLeft")||this.held.has("ShiftRight")}clear(){this.held.clear(),this.joystick.set(0,0),this.axes.set(0,0),this.stick.querySelector("span").style.removeProperty("transform");const e=this.pacePointer;this.pacePointer=null,this.paceButton.removeAttribute("data-held"),e!==null&&this.paceButton.hasPointerCapture(e)&&this.paceButton.releasePointerCapture(e)}dispose(){this.events.abort()}}const zn=matchMedia("(pointer: coarse)"),ss=matchMedia("(prefers-reduced-motion: reduce)");class An{samples=0;slow=0;adjusted=!1;scale=1;light=zn.matches||navigator.hardwareConcurrency>0&&navigator.hardwareConcurrency<=4;pixels(e,n){const s=this.light?135e4:255e4;return Math.min(window.devicePixelRatio||1,this.light?1.35:1.75,Math.sqrt(s/Math.max(1,e*n)))*this.scale}measure(e){if(this.adjusted||e<=0||(this.samples++,e>.031&&this.slow++,this.samples<100))return!1;const n=this.slow/this.samples>.48;return this.samples=0,this.slow=0,n&&(this.scale=.79,this.adjusted=!0),n}}function kn(t){const e=new Set,n=new Set,s=new Set;t.traverse(i=>{if("geometry"in i&&i.geometry instanceof de&&e.add(i.geometry),i instanceof F&&"instanceMatrix"in i&&"dispose"in i&&typeof i.dispose=="function"&&i.dispose(),!("material"in i))return;const a=Array.isArray(i.material)?i.material:[i.material];for(const o of a)if(o instanceof $s){n.add(o);for(const r of Object.values(o))r instanceof Wt&&s.add(r);if(o instanceof Z)for(const r of Object.values(o.uniforms))r.value instanceof Wt&&s.add(r.value)}});for(const i of s)i.dispose();for(const i of e)i.dispose();for(const i of n)i.dispose();t.clear()}const Nt=3.5,Rn=Nt*1.6,fe=.9,En=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];function Bn(t,e,n,s){if(t.clearPath(e,n,...s))return[s];const i=(f,u)=>{const p=Math.round(f/fe),m=Math.round(u/fe);let d=null,g=1/0;for(let w=-2;w<=2;w++)for(let x=-2;x<=2;x++){const _=p+w,R=m+x,z=_*fe,y=R*fe,b=Math.hypot(z-f,y-u);b<g&&t.canStand(z,y,.025)&&t.clearPath(f,u,z,y)&&(d=[_,R],g=b)}return d},a=i(e,n),o=i(...s);if(!a||!o)return[];const r=(f,u)=>Math.hypot(o[0]-f,o[1]-u),c={x:a[0],z:a[1],cost:0,estimate:r(...a),last:null,checked:!1},h=[c],l=new Map([[a.join(","),c]]);for(;h.length;){let f=0;for(let p=1;p<h.length;p++)h[p].estimate<h[f].estimate&&(f=p);const u=h.splice(f,1)[0];if(u.x===o[0]&&u.z===o[1]){const p=[s];for(let g=u;g;g=g.last)p.push([g.x*fe,g.z*fe]);p.reverse();const m=[];let d=[e,n];for(let g=0;g<p.length;g++){for(;g+1<p.length&&t.clearPath(...d,...p[g+1]);)g++;d=p[g],m.push(d)}return m}u.checked=!0;for(const[p,m]of En){const d=u.x+p,g=u.z+m,w=`${d},${g}`,x=l.get(w),_=u.cost+Math.hypot(p,m);if(x&&(x.checked||_>=x.cost)||!t.clearPath(u.x*fe,u.z*fe,d*fe,g*fe))continue;const R=_+r(d,g);if(x)Object.assign(x,{cost:_,estimate:R,last:u});else{const z={x:d,z:g,cost:_,estimate:R,last:u,checked:!1};l.set(w,z),h.push(z)}}}return[]}class In{constructor(e){this.land=e,this.reset()}position=new C;velocity=new H;heading=Math.PI;falling=!1;gravity=0;path=[];lastRange=1/0;obstruction=0;desired=new H;get walkingRoute(){return this.path.length>0}get moving(){return this.velocity.lengthSq()>0}reset(){const[e,n]=io;this.position.set(e,T(e,n),n),this.velocity.set(0,0),this.heading=Math.PI,this.falling=!1,this.gravity=0,this.cancel()}cancel(){this.path.length=0,this.lastRange=1/0,this.obstruction=0}guide(e){this.cancel();const{x:n,z:s}=this.position;return this.falling||(this.path=Bn(this.land,n,s,e)),this.walkingRoute}update(e,n,s,i){if(n.lengthSq()>.001){this.cancel();const p=Math.cos(s),m=Math.sin(s);this.desired.set(n.x*p+n.y*m,-n.x*m+n.y*p)}else if(this.path.length){const[p,m]=this.path[0];this.desired.set(p-this.position.x,m-this.position.z);const d=this.desired.length();d<.32?(this.path.shift(),this.lastRange=1/0,this.obstruction=0):(this.obstruction=d+.005<this.lastRange?0:this.obstruction+e,this.lastRange=d,this.obstruction>1.35&&this.cancel()),this.desired.multiplyScalar(1/Math.max(1,d)),this.path.length||this.desired.set(0,0)}else this.desired.set(0,0);const a=this.walkingRoute||i?Nt:Rn;if(this.desired.multiplyScalar(a),this.falling)return this.gravity-=14.3*e,this.position.y+=this.gravity*e,this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.y*e,this.position.y<-7.7?(this.reset(),!0):!1;const o=this.desired.lengthSq()>.04?12.4:15.1;this.velocity.lerp(this.desired,1-Math.exp(-o*e)),this.velocity.lengthSq()<.001&&this.velocity.set(0,0);const r=this.position.x,c=this.position.z,h=r+this.velocity.x*e,l=c+this.velocity.y*e;this.canMove(h,l)?(this.position.x=h,this.position.z=l):(this.canMove(h,c)&&(this.position.x=h),this.canMove(this.position.x,l)&&(this.position.z=l));const f=this.position.x-r,u=this.position.z-c;if(Math.abs(f)+Math.abs(u)>4e-4){const p=Math.atan2(f,u),m=Math.atan2(Math.sin(p-this.heading),Math.cos(p-this.heading));this.heading+=m*(1-Math.exp(-e*14))}else this.desired.lengthSq()>.04&&this.velocity.multiplyScalar(.55);return xe(this.position.x,this.position.z)>1.003?(this.falling=!0,this.cancel()):this.position.y=T(this.position.x,this.position.z),!1}canMove(e,n){const s=T(e,n);return s>ae-.19&&s-this.position.y<.27&&!this.land.solid(e,n,ds,s+.04,s+1.57)}}const Ms=1.22;function os(t){St.common.includes("NIGHT_ACES")||(St.common+=`
      #ifdef NIGHT_ACES
      vec3 nightAces(vec3 color) {
        const mat3 inputMat = mat3(vec3(0.59719, 0.07600, 0.02840), vec3(0.35458, 0.90834, 0.13383),
          vec3(0.04823, 0.01566, 0.83777));
        const mat3 outputMat = mat3(vec3(1.60475, -0.10208, -0.00327), vec3(-0.53108, 1.10813, -0.07276),
          vec3(-0.07367, -0.00605, 1.07602));
        color = inputMat * (color * NIGHT_ACES / 0.6);
        vec3 a = color * (color + 0.0245786) - 0.000090537;
        vec3 b = color * (0.983729 * color + 0.4329510) + 0.238081;
        return clamp(outputMat * (a / b), 0.0, 1.0);
      }
      #endif
    `,St.tonemapping_fragment=`
      #if defined( TONE_MAPPING )
        gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
      #elif defined( NIGHT_ACES )
        gl_FragColor.rgb = nightAces( gl_FragColor.rgb );
      #endif
    `);const e=new Set;t.traverse(n=>{if(n instanceof F||n instanceof is||n instanceof Ft)for(const s of Array.isArray(n.material)?n.material:[n.material])e.has(s)||!s.toneMapped||s.defines?.NIGHT_ACES||(e.add(s),s.defines={...s.defines,NIGHT_ACES:Ms.toFixed(3)},s.needsUpdate=!0)})}function Fn(t){const e=new An,n={antialias:!e.light,alpha:!1,powerPreference:"default",stencil:!1},s=t.canvas.getContext("webgl2",n);if(!s)return null;const i=new Ks({canvas:t.canvas,context:s,...n});i.toneMapping=ns,i.toneMappingExposure=Ms,i.shadowMap.enabled=!0,i.shadowMap.type=Ys,i.shadowMap.autoUpdate=!1,i.shadowMap.needsUpdate=!0;const a=new Zs;a.fog=new Js("#0b0e28",.0046);const o=new Y;a.add(o),a.add(new eo("#94a6ff","#43305a",1.55));const r=new Mt("#c7d4ff",2.05);r.position.set(-24,33,24),r.castShadow=!0,r.shadow.mapSize.setScalar(e.light?1024:2048),Object.assign(r.shadow.camera,{near:2,far:96,left:-32,right:32,top:31,bottom:-31}),r.shadow.camera.updateProjectionMatrix(),r.shadow.normalBias=.049,r.shadow.bias=-21e-5,r.shadow.radius=3,r.shadow.intensity=.79,a.add(r);const c=new Mt("#d58cff",1.35);c.position.set(12,14,-35),a.add(c);const h=new Mt("#5ce6d6",.55);h.position.set(-34,8,-12),a.add(h);const l=new Po,f={value:0},u=fn(Nt,se);a.add(u.root),Co(o,f,e.light),on(o);let p=!1;const m=Oo(o,l,f,()=>{p&&os(a),i.shadowMap.needsUpdate=!0,se()}),d=Xo(o,l,se);qo(o,!e.light),Sn(o,l,f,e.light),zo(o);const g=new In(l),w=new Tn(l);let x=null;e.light||(x=new ho(i,new qe(1,1,{type:We,samples:4})),x.addPass(new po(a,w.camera)),x.addPass(new Ie(new H(1,1),.6,.4,.94)),x.addPass(new uo),i.toneMapping=to,os(a),p=!0);const _=Object.values(me).map(k=>{const[L,U]=k.landmark,W=T(L,U),[oe,N,$]=k.hit;return{...k,point:new C(L+(k.id==="hanzizap"?2.1:0),W+k.signHeight,U),box:new cs(new C(L-oe/2,W-.5,U-$/2),new C(L+oe/2,W+N,U+$/2))}}),R=[..._,...d],z=new C,y=new C,b=new C,M=new so,A=new H,Q=new AbortController,G={signal:Q.signal};let V="overview",D=null,B=null,q=!1,De=!1,Je=!1,xt=!0,_e=!0,Ge=0,Le=0,ge=1,ve=1,Ne=0;const yt=()=>!q&&!De&&!Je;function se(){yt()&&!document.hidden&&Ge===0&&(Ge=requestAnimationFrame(Ts))}function ze(k,L){V!==k&&(V=k,Ne=.72,t.mode(V),V==="overview"&&(He(),g.velocity.set(0,0),le.clear())),L&&t.canvas.focus({preventScroll:!0}),se()}function He(){g.cancel(),B&&(B=null,t.walking(null))}function Ht(){He(),g.reset(),w.recenter(),_e=!0,t.status("Back at arrival."),ze("walk",!0)}function Ot(k,L){const U=t.canvas.getBoundingClientRect();A.set((k-U.left)/U.width*2-1,1-(L-U.top)/U.height*2),M.setFromCamera(A,w.camera);let W=1/0,oe=null;for(const N of R){if(!M.ray.intersectBox(N.box,y))continue;const $=y.distanceTo(M.ray.origin);$<W&&(W=$,oe=N.id)}if(!oe)return null;for(let N=1;N<W;N+=.9)if(M.ray.at(N,b),xe(b.x,b.z)<.985&&b.y+.2<T(b.x,b.z))return null;return oe}const le=new _n(t.canvas,t.stick,t.paceButton,{active:yt,invalidate:se,reset:Ht,hover:(k,L)=>t.canvas.toggleAttribute("data-inspectable",Ot(k,L)!==null),pick:(k,L)=>{const U=Ot(k,L);U&&t.inspect(U)},look:(k,L)=>{ze("walk",!0),w.turn(k,L),se()},inspect:()=>{D&&t.inspect(D)}});function bt(){const k=t.viewport.getBoundingClientRect();ge=Math.max(1,k.width),ve=Math.max(1,k.height),i.setPixelRatio(e.pixels(ge,ve)),i.setSize(ge,ve,!1),x&&(x.setPixelRatio(i.getPixelRatio()),x.setSize(ge,ve)),w.resize(ge,ve),_e=!0,se()}function Ss(){const k=V==="overview",L=ge/ve<.76,U=Ne>.4;let W=null,oe=3.04;for(const N of _){const $=Math.hypot(g.position.x-N.approach[0],g.position.z-N.approach[1]);!k&&!g.falling&&$<oe&&(oe=$,W=N.id),z.copy(N.point).project(w.camera);const Ae=(z.x+1)*.5*ge,Oe=(1-z.y)*.5*ve,Cs=z.z>-1&&z.z<1&&Ae>49&&Ae<ge-49&&Oe>(L?82:105)&&Oe<ve-95,Ps=k?N.id!=="observatory"&&N.id!=="workshop":!U&&$<29&&$>3.9;t.sign(N.id,Cs&&Ps?{x:Ae,y:Oe}:null)}D!==W&&(D=W,t.nearby(W))}function et(){cancelAnimationFrame(Ge),Ge=0,Le=0}function Ts(k){if(Ge=0,!yt()||document.hidden)return;const L=Le?Math.max(0,(k-Le)/1e3):0,U=Math.min(L||1/60,.065),W=ss.matches;if(Le=k,Ne=Math.max(0,Ne-U),le.axes.lengthSq()>.001&&ze("walk",!1),V==="walk"){const oe=U>.033?2:1;let N=!1;for(let $=0;$<oe;$++)if(g.update(U/oe,le.axes,w.yaw,le.walkHeld)){N=!0;break}if(N&&(w.recenter(),_e=!0,t.status("You returned to arrival.")),B&&!g.walkingRoute){const $=me[B].name,Ae=me[B].approach,Oe=Math.hypot(g.position.x-Ae[0],g.position.z-Ae[1])<.85;t.status(Oe?`Arrived at ${$}.`:"Assisted walk ended."),B=null,t.walking(null)}}W||(f.value+=U),m(),w.update(U,g.position,V==="walk",f.value,W,_e),u.update(g.position,g.heading,U,w.camera,le.walkHeld||!!B,g.falling,_e),_e=!1,x?x.render(U):i.render(a,w.camera),xt&&u.ready&&(xt=!1,t.ready(!0)),Ss(),!W&&e.measure(L)&&bt(),!W||g.falling||g.walkingRoute||g.moving||le.axes.lengthSq()>0||Ne>0?se():Le=0}const Vt=new ResizeObserver(bt);return Vt.observe(t.viewport),bt(),ss.addEventListener("change",se,G),document.addEventListener("visibilitychange",()=>{document.hidden?(le.clear(),et()):se()},G),t.canvas.addEventListener("webglcontextlost",k=>{k.preventDefault(),De=!0,et(),He(),le.clear(),t.ready(!1)},G),t.canvas.addEventListener("webglcontextrestored",()=>{De=!1,xt=!0,i.shadowMap.needsUpdate=!0,se()},G),{play:()=>ze("walk",!0),overview:()=>ze("overview",!1),pause(k){q=k,q?(le.clear(),et()):se()},walk(k){if(He(),ze("walk",!0),!g.guide(me[k].approach)){t.status("Walk from arrival or select another destination.");return}B=k,t.walking(k),t.status(`Walking to ${me[k].name}.`)},stopWalking:He,reset:Ht,dispose(){Je=!0,et(),Q.abort(),Vt.disconnect(),le.dispose(),r.shadow.dispose(),x?.dispose(),kn(a),i.dispose()}}}const Ln=Object.freeze(Object.defineProperty({__proto__:null,createIsland:Fn},Symbol.toStringTag,{value:"Module"}));export{kn as d,Ln as i,Gn as t};
