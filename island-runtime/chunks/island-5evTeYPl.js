const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./pocketOrbitShuttle-DHRSxsM1.js","./three-O_NOraUL.js","./shared-C-DZESF8.js"])))=>i.map(i=>d[i]);
import{M as I,O as jo,B as ct,F as U,S as J,U as xe,V,W as Yt,H as Kt,N as Yo,T as Ko,R as Zo,C as Jo,a as ts,L as es,b as os,c as ss,A as xo,d as ns,e as is,f as as,g as F,h as S,i as Ut,j as ot,k as Gt,l as rs,P as bt,D as se,m as Oe,n as We,o as ne,p as ye,q as ls,r as cs,s as eo,t as fs,u as Bt,v as Te,E as Ve,w as ds,x as yo,G,y as ie,z as ut,I as bo,J as hs,K as Mo,Q as me,X as Pe,Y as qe,Z as So,_ as Et,$ as us,a0 as oo,a1 as ps,a2 as be,a3 as ms,a4 as gs,a5 as so,a6 as vs,a7 as ws,a8 as xs,a9 as ys,aa as bs,ab as Ae,ac as Ms,ad as ke,ae as Ss}from"./three-O_NOraUL.js";import{d as mt,_ as Ts,r as Ps,a as Le,c as zs,Q as Cs}from"./shared-C-DZESF8.js";const ge={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ht{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const _s=new jo(-1,1,1,-1,0,1);class As extends ct{constructor(){super(),this.setAttribute("position",new U([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new U([0,2,0,0,2,0],2))}}const ks=new As;class Xe{constructor(t){this._mesh=new I(ks,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,_s)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Rs extends Ht{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof J?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=xe.clone(t.uniforms),this.material=new J({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Xe(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class no extends Ht{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const a=t.getContext(),i=t.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let s,r;this.inverse?(s=0,r=1):(s=1,r=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),i.buffers.stencil.setFunc(a.ALWAYS,s,4294967295),i.buffers.stencil.setClear(r),i.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(a.EQUAL,1,4294967295),i.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),i.buffers.stencil.setLocked(!0)}}class Es extends Ht{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Bs{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new V);this._width=n.width,this._height=n.height,e=new Yt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Kt}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Rs(ge),this.copyPass.material.blending=Yo,this.timer=new Ko}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let a=0,i=this.passes.length;a<i;a++){const s=this.passes[a];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),s.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),s.needsSwap){if(n){const r=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}no!==void 0&&(s instanceof no?n=!0:s instanceof Es&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new V);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(n,a),this.renderTarget2.setSize(n,a);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(n,a)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const fe={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Is extends Ht{constructor(){super(),this.isOutputPass=!0,this.uniforms=xe.clone(fe.uniforms),this.material=new Zo({name:fe.name,uniforms:this.uniforms,vertexShader:fe.vertexShader,fragmentShader:fe.fragmentShader}),this._fsQuad=new Xe(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Jo.getTransfer(this._outputColorSpace)===ts&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===es?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===os?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ss?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===xo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ns?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===is?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===as&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Fs extends Ht{constructor(t,e,n=null,a=null,i=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=a,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new F}render(t,e,n){const a=t.autoClear;t.autoClear=!1;let i,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(i=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),t.autoClear=a}}const Ls={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new F(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Lt extends Ht{constructor(t,e=1,n,a){super(),this.strength=e,this.radius=n,this.threshold=a,this.resolution=t!==void 0?new V(t.x,t.y):new V(256,256),this.clearColor=new F(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new Yt(i,s,{type:Kt,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const l=new Yt(i,s,{type:Kt,depthBuffer:!1});l.texture.name="UnrealBloomPass.h"+d,l.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(l);const f=new Yt(i,s,{type:Kt,depthBuffer:!1});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),i=Math.round(i/2),s=Math.round(s/2)}const r=Ls;this.highPassUniforms=xe.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new J({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];i=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new V(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=xe.clone(ge.uniforms),this.blendMaterial=new J({uniforms:this.copyUniforms,vertexShader:ge.vertexShader,fragmentShader:ge.fragmentShader,premultipliedAlpha:!0,blending:Ut,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new F,this._oldClearAlpha=1,this._basic=new ot,this._fsQuad=new Xe(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),a=Math.round(e/2);this.renderTargetBright.setSize(n,a);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(n,a),this.renderTargetsVertical[i].setSize(n,a),this.separableBlurMaterials[i].uniforms.invSize.value=new V(1/n,1/a),n=Math.round(n/2),a=Math.round(a/2)}render(t,e,n,a,i){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const s=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),i&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let r=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[c].uniforms.direction.value=Lt.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Lt.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),r=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=s}_getSeparableBlurMaterial(t){const e=[],n=t/3;for(let s=0;s<t;s++)e.push(.39894*Math.exp(-.5*s*s/(n*n))/n);const a=[],i=[];for(let s=1;s<t;s+=2){const r=e[s],c=s+1<t?e[s+1]:0,h=r+c;a.push((s*r+(s+1)*c)/h),i.push(h)}return new J({defines:{KERNEL_PAIRS:a.length},uniforms:{colorTexture:{value:null},invSize:{value:new V(.5,.5)},direction:{value:new V(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:a},gaussianWeights:{value:i}},vertexShader:`

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

				}`})}_getCompositeMaterial(t){return new J({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Lt.BlurDirectionX=new V(1,0);Lt.BlurDirectionY=new V(0,1);const Me=[26,20],To=-15.4,st=-.45,$=[-16.4,7.85],Po=2.41,zo=.32;function rt(o){return()=>(o=Math.imul(1664525,o)+1013904223|0,(o>>>0)/4294967296)}function Co(o){return 1+.074*Math.sin(o*3+.7)+.086*Math.cos(o*5-.58)+.031*Math.sin(o*11+.52)+.018*Math.cos(o*19)}function Pt(o,t=1){const e=Co(o)*t;return[Math.cos(o)*Me[0]*e,Math.sin(o)*Me[1]*e]}function gt(o,t){const e=o/Me[0],n=t/Me[1];return Math.hypot(e,n)/Co(Math.atan2(n,e))}function Qt(o,t,e,n,a){return Math.exp(-(((o-e[0])/n)**2+((t-e[1])/a)**2))}const Se=Pt(Po),Rt=[Se[0]-$[0],Se[1]-$[1]];function Ds(o,t){const e=Math.max(0,Math.min(1.1,((o-$[0])*Rt[0]+(t-$[1])*Rt[1])/(Rt[0]**2+Rt[1]**2))),n=$[0]+Rt[0]*e,a=$[1]+Rt[1]*e;return Math.exp(-((o-n)**2+(t-a)**2)/1.16)}function z(o,t){const e=Qt(o,t,mt.observatory.landmark,7.1,5.8)*3.7,n=Qt(o,t,mt["pocket-orbit"].landmark,5.3,5.9)*1.75,a=Qt(o,t,[-19.1,-5.7],7.4,5.5)*1.15,i=Qt(o,t,[15.6,10],6.8,5.5)*.61,s=Qt(o,t,$,3.9,3.3)*1.9+Ds(o,t)*.92;return .42+Math.sin(o*.19+t*.24)*.29+Math.cos(t*.31-o*.12)*.32+Math.sin(o*.36+t*.18)*.15+e+n+a+i-s}function _o(){const o=Math.atan2(-$[1],-$[0]);return[-.95,1.05].map(t=>{const e=o+t;for(let n=1.5;n<9;n+=.1){const a=$[0]+Math.cos(e)*n,i=$[1]+Math.sin(e)*n;if(z(a,i)>st+.15)return[a+Math.cos(e)*.55,i+Math.sin(e)*.55]}return[$[0]+Math.cos(e)*4,$[1]+Math.sin(e)*4]})}const ae=`
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
`,ve=`
  varying vec2 coords;
  varying vec3 worldPoint;
  void main() {
    coords = uv;
    vec4 p = modelMatrix * vec4(position, 1.0);
    worldPoint = p.xyz;
    gl_Position = projectionMatrix * viewMatrix * p;
  }
`,Ao=`
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
`,Us=`
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
`,Gs=`
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${ae}
  ${Ao}
  ${Us}

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
`,Hs=`
  #include <common>
  uniform float clock;
  uniform float isPool;
  varying vec3 worldPoint;
  #ifdef POOL_LAMPS
  uniform vec3 lampPos[3];
  uniform vec3 lampTint[3];
  #endif
  ${ae}
  ${Ao}

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
    #ifdef POOL_LAMPS
    // Lantern light broken into shimmering streaks by the ripples.
    for (int i = 0; i < 3; i++) {
      vec3 toLamp = lampPos[i] - worldPoint;
      float d = length(toLamp);
      vec3 h = normalize(toLamp / d + view);
      float spec = pow(max(dot(n, h), 0.0), 70.0);
      color += lampTint[i] * (spec * 2.4 + .05 / (1.0 + d * d * .35)) / (1.0 + d * d * .045);
    }
    #endif
    float haze = smoothstep(76.0, 370.0, distanceToEye) * (1.0 - isPool);
    color = mix(color, nightHorizon(-view, clock), haze);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,Ns=`
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${ae}
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
`;function io(o,t,e,n,a,i,s){const r=new I(new bt(t,e),s);return r.rotation.x=-Math.PI/2,r.position.set(n,a,i),o.add(r),r}function Os(o,t){const e=[],n=[],a=[],s=(c,h)=>{const d=Se[0]-2.2+c*.21,l=$[1]-4.8+h*.21;return gt(d,l)<=1.002&&z(d,l)<st+.43};for(let c=0;c<=70;c++)for(let h=0;h<=70;h++){if(e.push(Se[0]-2.2+h*.21,st,$[1]-4.8+c*.21),n.push(h/70,c/70),!c||!h||!s(h,c)||!s(h-1,c-1))continue;const d=c*71+h,l=d-70-2;s(h-1,c)&&a.push(l,d-1,d),s(h,c-1)&&a.push(l,d,d-70-1)}const r=new ct;r.setAttribute("position",new U(e,3)),r.setAttribute("uv",new U(n,2)),r.setIndex(a),o.add(new I(r,t))}function Ws(o,t){const a=[],i=[],s=[];for(let h=0;h<=26;h++){const d=h/26;for(let l=0;l<=15;l++){const f=l/15,p=Po+(f-.5)*(.109+.07*d),[g,u]=Pt(p,1.003+Math.sin(d*2.1)*.057),m=Math.max(st+.06,z(g,u)+.02);if(a.push(g-d*.19,m+(To-m)*d,u+Math.sin(d*2.5)*.71),i.push(f,d),h===0||l===0)continue;const v=h*16+l,w=v-15-1;s.push(w-1,w,v,w-1,v,v-1)}}const r=new ct;r.setAttribute("position",new U(a,3)),r.setAttribute("uv",new U(i,2)),r.setIndex(s);const c=new J({uniforms:{clock:t},transparent:!0,depthWrite:!1,side:se,toneMapped:!1,vertexShader:ve,fragmentShader:`
      uniform float clock;
      varying vec2 coords;
      ${ae}
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
    `});o.add(new I(r,c))}function Vs(o,t){const e={value:0},n=new We().load("./island-media/dream-ocean-reflections.webp",()=>{e.value=1,t()});return n.colorSpace=ne,n.magFilter=ye,n.minFilter=ye,n.generateMipmaps=!1,new J({uniforms:{clock:o,heroes:{value:n},reflectionReady:e},toneMapped:!1,side:se,vertexShader:`
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
      ${ae}
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
    `})}function qs(o,t,e){const n=rt(6067),a=[],i=[],s=[];for(let h=0;h<e;h++){const d=(n()-.5)*48,l=(n()-.5)*34;a.push(d,z(d,l)+n()*5+.35,l),i.push(n()*6.283),s.push(n())}const r=new ct;r.setAttribute("position",new U(a,3)),r.setAttribute("phase",new U(i,1)),r.setAttribute("hue",new U(s,1));const c=new J({uniforms:{clock:t},transparent:!0,depthWrite:!1,toneMapped:!1,blending:Ut,vertexShader:`
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
    `});o.add(new Oe(r,c))}function Xs(o,t,e){const n=new I(new Gt(510,32,20),new J({uniforms:{clock:t},vertexShader:ve,fragmentShader:Gs,side:rs,depthWrite:!1,fog:!1}));n.renderOrder=-10,n.frustumCulled=!1,o.add(n);const a=r=>new J({uniforms:{clock:t,isPool:{value:r}},vertexShader:ve,fragmentShader:Hs}),i=a(1),s=[..._o().map(([r,c])=>new S(r,z(r,c)+.78,c)),new S(-15.2,z(-15.2,-1.4)+2.4,-1.4)];i.defines={POOL_LAMPS:""},i.uniforms.lampPos={value:s},i.uniforms.lampTint={value:[new F(1,.62,.26),new F(1,.62,.26),new F(.4,.66,1)]},io(o,900,900,0,To,0,a(0)),Os(o,i),io(o,830,830,0,-13.2,0,new J({uniforms:{clock:t},vertexShader:ve,fragmentShader:Ns,transparent:!0,depthWrite:!1})),Ws(o,t),qs(o,t,e?90:240)}class Qs{obstacles=[];add(t,e,n,a,i,s,r=0){this.obstacles.push({x:t,z:e,halfWidth:n/2,halfDepth:a/2,bottom:i,top:i+s,cosine:Math.cos(r),sine:Math.sin(r)})}solid(t,e,n,a,i){return this.obstacles.some(s=>{if(a>=s.top||i<=s.bottom)return!1;const r=t-s.x,c=e-s.z,h=Math.abs(r*s.cosine-c*s.sine)-s.halfWidth,d=Math.abs(r*s.sine+c*s.cosine)-s.halfDepth,l=Math.max(h,0),f=Math.max(d,0);return l*l+f*f<n*n})}canStand(t,e,n=0){const a=z(t,e);return gt(t,e)<.994-n&&a>st-.18&&!this.solid(t,e,zo,a+.06,a+1.52)}clearPath(t,e,n,a){const i=Math.max(1,Math.ceil(Math.hypot(n-t,a-e)/.28));let s=z(t,e);for(let r=1;r<=i;r++){const c=t+(n-t)*r/i,h=e+(a-e)*r/i,d=z(c,h);if(Math.abs(d-s)>.28||!this.canStand(c,h,.022))return!1;s=d}return!0}}function $s(o,t=!1){const e=o[0].index!==null,n=new Set(Object.keys(o[0].attributes)),a=new Set(Object.keys(o[0].morphAttributes)),i={},s={},r=o[0].morphTargetsRelative,c=new ct;c.morphTargetsRelative=r;let h=0;for(let d=0;d<o.length;++d){const l=o[d];let f=0,p=0;if(e!==(l.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const g in l.attributes){if(!n.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;i[g]===void 0&&(i[g]=[]),i[g].push(l.attributes[g]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(r!==l.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const g in l.morphAttributes){if(!a.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;if(l.morphAttributes[g].length!==o[0].morphAttributes[g].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have the same number of morph targets for the "'+g+'" morph attribute.'),null;s[g]===void 0&&(s[g]=[]),s[g].push(l.morphAttributes[g]),p++}if(p!==a.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of morph attributes."),null;if(t){let g;if(e)g=l.index.count;else if(l.attributes.position!==void 0)g=l.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(h,g,d),h+=g}}if(e){let d=0;const l=[];for(let f=0;f<o.length;++f){const p=o[f].index;for(let g=0;g<p.count;++g)l.push(p.getX(g)+d);d+=o[f].attributes.position.count}c.setIndex(l)}for(const d in i){const l=ao(i[d]);if(!l)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,l)}for(const d in s){const l=s[d][0].length;if(l!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let f=0;f<l;++f){const p=[];for(let u=0;u<s[d].length;++u)p.push(s[d][u][f]);const g=ao(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(g)}}}return c}function ao(o){let t,e,n,a=-1,i=0;for(let h=0;h<o.length;++h){const d=o[h];if(t===void 0&&(t=d.array.constructor),t!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=d.itemSize),e!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=d.normalized),n!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(a===-1&&(a=d.gpuType),a!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;i+=d.count*e}const s=new t(i),r=new ls(s,e,n);let c=0;for(let h=0;h<o.length;++h){const d=o[h];if(d.isInterleavedBufferAttribute){const l=c/e;for(let f=0,p=d.count;f<p;f++)for(let g=0;g<e;g++){const u=d.getComponent(f,g);r.setComponent(f+l,g,u)}}else s.set(d.array,c);c+=d.count*e}return a!==void 0&&(r.gpuType=a),r}function bi(o,t){if(t===cs)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(t===eo||t===fs){let e=o.getIndex();if(e===null){const i=[],s=o.getAttribute("position");if(s!==void 0){for(let r=0;r<s.count;r++)i.push(r);o.setIndex(i),e=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}const n=e.count-2,a=[];if(t===eo)for(let i=1;i<=n;i++)a.push(e.getX(0)),a.push(e.getX(i)),a.push(e.getX(i+1));else for(let i=0;i<n;i++)i%2===0?(a.push(e.getX(i)),a.push(e.getX(i+1)),a.push(e.getX(i+2))):(a.push(e.getX(i+2)),a.push(e.getX(i+1)),a.push(e.getX(i)));return a.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),o.setIndex(a),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),o}const C=(o,t=.83,e=0)=>new Bt({color:o,roughness:t,metalness:e});function tt(o,t=.75){return new Bt({color:o,emissive:o,emissiveIntensity:t,roughness:.52})}function E(o,t,e,n=0,a=0,i=0){const s=new I(t,e);return s.position.set(n,a,i),s.castShadow=!0,s.receiveShadow=!0,s.userData.bake=!0,o.add(s),s}function x(o,t,e,n,a,i,s,r){return E(o,new ds(e,n,a),t,i,s,r)}function b(o,t,e,n,a,i,s,r,c=10){return E(o,new yo(e,n,a,c),t,i,s,r)}function Q(o,t,e,n,a=0,i=0,s=0,r=0){const c=new Te;e.forEach(([d,l],f)=>f?c.lineTo(d,l):c.moveTo(d,l)),c.closePath();const h=new Ve(c,{depth:n,bevelEnabled:r>0,bevelSize:r,bevelThickness:r,bevelSegments:1,steps:1});return E(o,h,t,a,i,s-n/2)}const Qe=o=>new U(o.flatMap(t=>[t.r,t.g,t.b]),3);function js(o){o.updateMatrixWorld(!0);const t=new Map;o.traverse(e=>{if(!(e instanceof I)||!e.userData.bake||Array.isArray(e.material))return;const n=e.material,a=n.uuid;t.has(a)||t.set(a,{material:n,sources:[],geometries:[]});const i=t.get(a),s=e.geometry.index?e.geometry.toNonIndexed():e.geometry.clone();s.applyMatrix4(e.matrixWorld),i.sources.push(e),i.geometries.push(s)});for(const{material:e,sources:n,geometries:a}of t.values()){const i=$s(a);for(const r of a)r.dispose();if(!i)continue;for(const r of n)r.geometry.dispose(),r.removeFromParent();const s=new I(i,e);s.castShadow=!0,s.receiveShadow=!0,o.add(s)}}const X=C("#25384b",.64,.22),B=C("#49586c",.56,.24),De=C("#557c88",.54,.15),lt=C("#131c2b",.79),j=C("#b47b57",.54,.26),Z=new ot({color:"#6aefeb",toneMapped:!1}),Dt=tt(16756065,2.2),$e=new ot({color:"#f589bc",toneMapped:!1}),ko="#13cbb7",dt=(o,t)=>[(o-497)/436,(502-t)/436],Ro=new Te().moveTo(...dt(487,114)).quadraticCurveTo(...dt(498,105),...dt(510,114)).lineTo(...dt(715,293)).lineTo(...dt(715,724)).lineTo(...dt(510,890)).quadraticCurveTo(...dt(498,900),...dt(486,890)).lineTo(...dt(279,724)).lineTo(...dt(279,293)).closePath(),Mt=0,St=0;function Ys(){const o=document.createElement("canvas");o.width=512,o.height=112;const t=o.getContext("2d");t.fillStyle="#1c2735",t.fillRect(0,0,512,112),t.fillStyle=ko,t.save(),t.translate(48,56),t.scale(43,-43),t.beginPath(),Ro.getPoints(6).forEach(({x:n,y:a},i)=>i?t.lineTo(n,a):t.moveTo(n,a)),t.closePath(),t.fill(),t.restore(),t.fillStyle="#ebeeef",t.font="750 48px system-ui, sans-serif",t.textBaseline="middle",t.fillText("ALHUISSI",83,54),t.fillStyle="#f4b674";for(let n=0;n<3;n++)t.fillRect(457+n*13,49,5,14);const e=new ie(o);return e.colorSpace=ne,new ot({map:e,toneMapped:!1})}function Ks(o){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d"),n=e.createRadialGradient(64,64,0,64,64,63);n.addColorStop(0,"rgba(255,255,255,.8)"),n.addColorStop(.4,"rgba(255,255,255,.32)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,128,128);const a=new ie(t),i=(c,h,d,l)=>new I(new bt(h,d),new ot({map:a,color:c,opacity:l,transparent:!0,blending:Ut,depthWrite:!1,toneMapped:!1})),s=i(4708838,3.6,1.8,.55);s.rotation.x=-Math.PI/2,s.position.set(.53,.217,2.83);const r=i(16357197,4.2,1.6,.5);r.rotation.x=-Math.PI/2,r.position.set(-2.04,.205,2.72),o.add(s,r)}function Zs(o,t){const e=new G;e.position.set(Mt,5.15,St),e.rotation.set(-.14,.27,-.17),o.add(e),b(o,X,.99,1.3,.37,Mt,3.5,St,8),b(o,j,.95,.99,.105,Mt,3.72,St,8),b(o,lt,.73,.95,.31,Mt,3.89,St,10);for(const s of[-1,1]){const r=[[0,0],[s*.49,.03],[s*.55,.82],[s*.88,1.46],[s*.57,1.59],[s*.09,1.04]];Q(o,B,r,.47,Mt+s*.85,3.57,St,.045),Q(o,j,r,.071,Mt+s*.85,3.57,St+.27,.014)}E(e,new ut(1.57,.147,8,64),X),E(e,new ut(1.64,.051,5,54),B,0,0,-.15),E(e,new ut(1.43,.044,6,56),j,0,0,.073);for(let s=0;s<8;s++){const r=s*Math.PI/4;E(e,new ut(1.57,.041,5,9,.66),s===5?Dt:Z,0,0,.144).rotation.z=r+.065;const c=x(e,B,.255,.28,.33,Math.cos(r)*1.58,Math.sin(r)*1.58,.047);c.rotation.z=r;const h=x(e,j,.155,.072,.04,c.position.x,c.position.y,.23);h.rotation.z=r}const n=new G;n.rotation.set(.69,-.69,.36),e.add(n),E(n,new ut(1.2,.069,6,48),B);for(const s of[.18,Math.PI+.18])E(n,new ut(1.2,.033,5,20,2.2),$e,0,0,.053).rotation.z=s;for(const s of n.children)s.userData.bake=!1,s.castShadow=!1;const a=new Ve(Ro,{depth:.12,bevelEnabled:!1,curveSegments:8});a.translate(0,0,-.06);const i=new I(a,new ot({color:ko,toneMapped:!1,fog:!1}));return i.position.set(Mt,5.15,St),o.add(i),()=>{n.rotation.x=.69+.26*Math.sin(t.value*.73),n.rotation.y=-.69+.53*Math.sin(t.value*.51),n.rotation.z=.36-t.value*.22,i.rotation.y=.21*Math.sin(t.value*.55)}}function Js(o){const t=new ot({color:"#ffca92",toneMapped:!1}),e=tt(10510658,.9);x(o,e,3.41,1.79,.095,-2.16,1.66,1.16),x(o,lt,3.4,.13,.94,-2.16,2.62,1.7),x(o,j,3.4,.13,.9,-2.16,.84,1.67),x(o,X,2.91,.144,.62,-2.14,1.24,1.63),x(o,Dt,2.89,.051,.045,-2.14,1.17,1.94);for(const a of[-3.27,-2.47,-1.5]){x(o,lt,.59,.44,.13,a,1.68,1.32),x(o,a===-2.47?Z:t,.51,.35,.027,a,1.69,1.397),x(o,X,.066,.19,.1,a,1.4,1.42);for(let i=0;i<8;i++){const s=.035+.11*Math.abs(Math.sin(i*.82+a));x(o,lt,.017,s,.009,a-.177+i*.05,1.7,1.417)}}x(o,lt,.9,.143,.31,-2.72,1.366,1.79);for(let a=0;a<12;a++)x(o,a%3===2?B:t,.054,.022,.15,-3.073+a*.065,1.45,1.826);for(const[a,i]of[-1.87,-1.73,-1.59,-1.45,-1.31].entries())b(o,X,.036,.042,.048,i,1.38,1.74,8),x(o,a%2===0?Z:Dt,.048,.019,.031,i,1.36,1.83);const n=new I(new bt(3.47,1.78),new ot({color:"#7dc6d4",transparent:!0,opacity:.13,depthWrite:!1,side:se}));n.position.set(-2.16,1.68,2.24),o.add(n);for(const a of[-3.91,-2.63,-1.55,-.5])x(o,B,.1,1.81,.18,a,1.67,2.23);for(const a of[.82,2.58])x(o,X,3.58,.15,.27,-2.16,a,2.22);Q(o,B,[[-3.99,2.44],[-.46,2.44],[-.68,2.72],[-3.59,2.83]],.58,0,0,2.19,.034),x(o,j,2.88,.049,.058,-2.08,2.59,2.52).rotation.z=-.029}function tn(o){const t=[[-1.1,.48],[.91,.48],[1.19,.75],[1.19,2.1],[.86,2.46],[-.84,2.46],[-1.1,2.18]];Q(o,B,t,.45,2.77,0,2.24,.055),Q(o,lt,t,.06,2.77,.14,2.494).scale.set(.91,.91,1),x(o,De,1.97,.19,.35,2.78,.71,2.57),x(o,X,1.94,.31,.35,2.76,2.21,2.57);for(const[e,n]of[2.1,2.7,3.3].entries()){b(o,e===1?$e:Z,.091,.091,1.32,n,1.45,2.64,12);for(const a of[.78,1.11,1.82,2.09])b(o,a===1.11||a===1.82?j:B,.15,.15,.096,n,a,2.64,10);x(o,e===1?Dt:Z,.065,.036,.021,n,2.22,2.758)}x(o,j,.081,1.08,.16,3.68,1.49,2.56);for(let e=0;e<5;e++)x(o,B,.13,.041,.16,3.64,.96+e*.21,2.62)}function en(o){const e=new G;e.position.set(1.85,3.31,-.7),o.add(e);const n=tt(16758903,1.6),a=8.1-3.31,i=.42,s=a-i,r=i+s/2;b(e,X,1.18,1.3,.24,0,.12,0,8),b(e,B,.98,1.08,.2,0,.33,0,8),b(e,Z,1.1,1.1,.025,0,.245,0,24),b(e,X,.66,.84,s,0,r,0,8);const c=f=>.84-(f-i)/s*.18;for(const f of[1.05,2.15,3.25,4.25]){const p=c(f);b(e,n,p+.012,p+.016,.32,0,f,0,8),b(e,j,p+.05,p+.05,.05,0,f+.19,0,8),b(e,j,p+.05,p+.05,.05,0,f-.19,0,8)}const h=Math.atan(.18/s);for(let f=0;f<8;f++){const p=(f+.5)*Math.PI/4,g=c(r)-.02,u=x(e,B,.08,s-.1,.11,Math.sin(p)*g,r,Math.cos(p)*g);u.rotation.y=p,u.rotation.x=-h*Math.cos(p),u.rotation.z=h*Math.sin(p)}for(const f of[-.39,.39]){const p=c(r)-.03,g=x(e,Z,.03,s-.4,.03,Math.sin(f)*p,r,Math.cos(f)*p);g.rotation.y=f,g.rotation.x=-h*Math.cos(f),g.rotation.z=h*Math.sin(f)}b(e,B,1.45,.68,.5,0,a+.25,0,8),b(e,j,1.5,1.5,.1,0,a+.55,0,16),b(e,Z,1.52,1.52,.03,0,a+.47,0,24);const d=E(e,new ut(1.46,.03,5,40),j,0,a+.95,0);d.rotation.x=Math.PI/2;for(let f=0;f<16;f++){const p=f*Math.PI/8;b(e,B,.02,.02,.38,Math.sin(p)*1.46,a+.77,Math.cos(p)*1.46,5)}const l=new G;return l.position.set(0,a+.6-3.31,0),e.add(l),l}function on(o){const t=new ot({color:"#7ff6f0",toneMapped:!1}),e=new ot({color:"#ffc58a",toneMapped:!1}),n=new ot({color:"#b48cff",toneMapped:!1}),a=tt(6543078,.9);for(const r of[-1,1]){x(o,lt,.06,.82,1.5,r*4.02,1.5,1.45),x(o,e,.03,.66,1.32,r*4.055,1.5,1.45);for(const c of[-.33,.33])x(o,B,.05,.7,.05,r*4.07,1.5,1.45+c);x(o,B,.05,.05,1.36,r*4.07,1.5,1.45)}x(o,n,8.05,.035,.04,.035,3.09,2.79),x(o,t,4.3,.03,.04,-1.31,3.67,2.79);for(const r of[-1,1])x(o,n,.04,.035,5.2,r*4.13,3.09,-.05);for(let r=0;r<3;r++)x(o,X,.82,.08,.62,-1.25+r*.02,3.69,1.55-r*.78),x(o,a,.7,.04,.5,-1.25+r*.02,3.74,1.55-r*.78);const i=new G;i.position.set(-.35,3.74,-1.75),o.add(i),b(i,B,.05,.08,.55,0,.27,0,8),E(i,new Gt(.42,14,6,0,Math.PI*2,0,Math.PI/2.6),j,0,.72,0).rotation.set(Math.PI+.7,0,.35),b(i,t,.03,.03,.07,-.14,.95,.2,6),x(o,t,7.7,.025,.03,.09,.14,2.53);for(const r of[-1,1])x(o,t,.03,.025,4.9,r*3.98,.14,.02)}function sn(o,t,e,n,a,i){const s=C("#d9884a",.86),r=C("#a85a2c",.88),c=C("#f2d6b0",.88),h=new ot({color:"#c8ff7a",toneMapped:!1}),d=new Gt(1,14,10),l=new G;l.name="Workshop cat",l.position.set(t,e,n),l.rotation.y=a,l.scale.setScalar(1.35),o.add(l);const f=(m,v,w,y,_,A,T,M)=>{const P=new I(d,v);return P.scale.set(w,y,_),P.position.set(A,T,M),P.castShadow=v!==h,m.add(P),P};f(l,s,.15,.12,.18,0,.1,-.04),f(l,s,.105,.16,.1,0,.21,.06),f(l,c,.07,.1,.05,0,.2,.13);for(const m of[-1,1])f(l,c,.04,.03,.055,m*.055,.025,.16),f(l,r,.03,.07,.1,m*.135,.12,-.05);const p=new G;p.position.set(0,.38,.09),l.add(p),f(p,s,.105,.09,.095,0,0,0),f(p,r,.06,.02,.06,0,.075,-.01),f(p,c,.05,.036,.04,0,-.028,.075);for(const m of[-1,1])f(p,h,.016,.019,.01,m*.042,.012,.088);const g=[-1,1].map(m=>{const v=new I(new bo(.042,.085,4),s);return v.position.set(m*.058,.085,-.005),v.rotation.set(-.12,Math.PI/4,m*-.32),v.castShadow=!0,p.add(v),v}),u=new G;u.position.set(.06,.04,-.2),l.add(u);for(let m=0;m<7;m++){const v=m/6,w=v*2.1;f(u,m%2?r:s,.036-v*.008,.036-v*.008,.05,Math.sin(w)*.22,.01+v*.03,-Math.cos(w)*.1+.1-v*.02)}return()=>{const m=i.value;u.rotation.y=Math.sin(m*1.1)*.28,u.rotation.z=Math.sin(m*.7+1)*.08,p.rotation.y=Math.sin(m*.23)*.35+Math.sin(m*.061)*.2,p.rotation.x=Math.sin(m*.31)*.06;const v=Math.max(0,Math.sin(m*.9)-.94)*6;g[0].rotation.z=.32+v*.35}}function nn(o,t,e){const[n,a]=mt.workshop.landmark,i=z(n,a),s=new G;s.position.set(n,i,a),s.rotation.y=-.095,o.add(s),x(s,lt,8.05,.46,5.26,.09,-.12,-.12),Q(s,B,[[-3.94,0],[3.94,0],[3.94,.13],[3.74,.23],[-3.74,.23],[-3.94,.13]],5.2,.09,-.035,.1,.035),x(s,X,7.81,3,.41,.025,1.54,-2.43),x(s,X,.41,2.81,4.72,-3.81,1.51,-.17),x(s,X,.41,2.81,4.72,3.81,1.51,-.17),x(s,lt,7.58,2.9,.28,.03,1.51,.9),x(s,X,7.72,.65,.31,.02,.51,2.15);const r=[[-4.05,2.76],[4.12,2.76],[4.12,3.07],[3.77,3.31],[1.27,3.31],[.87,3.65],[-3.49,3.65],[-4.05,3.18]];Q(s,X,r,5.4,0,0,-.05,.05),Q(s,De,r,.21,0,.015,2.61,.037),Q(s,B,[[-1.16,2.79],[1.21,2.79],[1.04,3.05],[-.92,3.05]],1.11,.54,0,2.49,.025),x(s,j,4.63,.078,.1,-1.45,3.49,2.735),x(s,Z,3.45,.058,.08,-2.02,2.89,2.762),x(s,Z,1.77,.058,.08,2.81,2.89,2.762);for(const w of[-3.92,1.42,3.91])Q(s,B,[[-.18,.12],[.18,.12],[.14,2.53],[-.05,2.81],[-.18,2.66]],.25,w,0,2.21,.023);Js(s);const c=[[-.9,0],[.9,0],[.9,1.84],[.58,2.18],[-.66,2.18],[-.9,1.94]];Q(s,B,c,.23,.53,.18,2.2,.042),Q(s,Z,c,.033,.53,.224,2.33).scale.set(.916,.94,1),Q(s,lt,c,.035,.53,.247,2.36).scale.set(.851,.91,1);for(const w of[-1,1])x(s,X,.64,1.57,.035,.53+w*.362,1.13,2.39),x(s,B,.04,.66,.046,.53+w*.124,1.01,2.399);x(s,Z,.99,.07,.05,.53,1.58,2.424),x(s,Dt,.14,.088,.056,1.68,1.2,2.33),x(s,B,2.55,.13,.79,.53,.147,2.77);for(const w of[-1,1])x(s,Z,.12,.024,.54,.53+w*1.02,.221,2.86);tn(s),x(s,X,1.96,.447,.12,.54,2.61,2.64);const h=new I(new bt(1.86,.407),Ys());h.position.set(.54,2.61,2.706),s.add(h);for(const w of[-1,1]){for(let y=0;y<5;y++)x(s,B,.16,1.27,.28,w*4.03,1.78,-.89+y*.43);x(s,j,.11,.105,3.38,w*4.07,2.52,.04),x(s,Z,.11,.065,2.2,w*4.08,2.78,.34),x(s,lt,1.48,1.1,.11,2.22*w,1.61,-2.677),x(s,Dt,1.29,.075,.042,2.22*w,2.07,-2.746)}for(let w=0;w<4;w++)x(s,B,3.23,.12,.16,-1.1,3.72,-2.06+w*.42);for(const[w,y]of[[-.2,1.2],[.22,.8]])b(s,B,.03,.06,y,-2.97+w,3.7+y/2,-1.29,8),b(s,w>0?Z:$e,.04,.05,.09,-2.97+w,3.7+y,-1.29,8);const d=en(s);on(s),Ks(s);const l=s.localToWorld(new S(2.37,0,4.04)),f=z(l.x,l.z);x(o,De,1.29,.11,.41,l.x,f+.46,l.z).rotation.y=s.rotation.y;for(const w of[-.45,.45])x(o,X,.13,.46,.35,l.x+w,f+.22,l.z);x(o,j,1.04,.045,.037,l.x,f+.45,l.z+.21),t.add(l.x,l.z,1.26,.4,f-.07,.61,s.rotation.y);const p=s.localToWorld(new S(0,-.4,-.15));t.add(p.x,p.z,8.07,4.94,p.y,4.1,s.rotation.y);const g=s.localToWorld(new S(2.77,.41,2.44));t.add(g.x,g.z,2.3,.62,g.y,2.09,s.rotation.y);const u=s.localToWorld(new S(2.72,0,4.04)),m=sn(o,u.x,f+.515,u.z,s.rotation.y,e),v=Zs(d,e);return()=>{v(),m()}}const Tt=C("#374b54"),It=C("#4c3435"),we=C("#775342"),Zt=C("#c6a580"),je=C("#edd0a9"),Jt=C("#3f444b",.59,.3),zt=C("#b27656",.49,.24),at=C("#d9aa67",.5,.15),Eo=tt(15309381,1.35),Ue=tt(16761976,2.2);function ze(o,t,e){const[n,a]=mt[t].landmark,i=new G;return i.position.set(n,z(n,a),a),i.rotation.y=e,o.add(i),i}function an(o,t,e,n,a,i=a){const s=n.clone().sub(e),r=e.clone().lerp(n,.5);x(o,t,a,s.length(),i,r.x,r.y,r.z).quaternion.setFromUnitVectors(new S(0,1,0),s.normalize())}function Bo(o,t){const e=t-o;return new Te().moveTo(-o,0).lineTo(o,0).lineTo(o,e).quadraticCurveTo(o,t,0,t).quadraticCurveTo(-o,t,-o,e).lineTo(-o,0)}function Ge(o,t,e,n,a,i,s){return E(o,new Mo(Bo(i,s),12),t,e,n,a)}function rn(o,t,e,n,a,i){Ge(o,It,t,e-.05,n,a*.57,i+.11),Ge(o,Eo,t,e,n+.018,a*.43,i),x(o,we,a*1.26,.108,.24,t,e-.045,n+.056),x(o,It,.06,i*.87,.044,t,e+i*.43,n+.047),x(o,It,a*.93,.05,.044,t,e+i*.48,n+.047)}function ln(o,t,e,n){const i=ze(o,"dream-ocean",.29),[s,r,c]=i.position,h=[C("#606f81"),C("#7a8499"),C("#8b9ba6"),C("#707787")],d=C("#3b586a"),l=C("#a1b4c3"),f=tt(10017008,.45),p=b(i,d,2.97,3.3,.33,0,-.06,.03,12);p.scale.z=.59;const g=b(i,h[1],2.53,2.86,.2,0,.2,.16,14);g.scale.z=.55;const u=x(i,l,3.15,.16,1.25,0,.14,1.13);u.rotation.y=-.03;const m=1.61,v=2.61,y=new Te().moveTo(-m,.25).lineTo(m,.25).lineTo(m,v).quadraticCurveTo(m,v+1.2,0,v+2.2).quadraticCurveTo(-m,v+1.2,-m,v).closePath(),_=new I(new Mo(y,36),Vs(t,n));_.position.z=.17,i.add(_);for(const T of[-1,1])for(let M=0;M<4;M++){const P=.84-.044*M,k=x(i,h[(M+1)%h.length],P,.58,.94-M*.057,T*(m+P/2-.04),.49+M*.61,.03);k.rotation.z=(M%2-.5)*.035,x(i,l,.036,.45,.05,T*1.72,.51+M*.61,.55-M*.025)}const A=(T,M)=>{const P=Math.sign(1-T*2),k=1-Math.abs(1-T*2);return[P*((1-k*k)*(m+M)),v+(2.4*k-.2*k*k)*(1+M*.44)]};for(let T=0;T<15;T++){const M=(T+.031)/15,P=(T+.969)/15,k=T===7,L=[A(M,-.075),A(P,-.075),A(P,k?.73:.61),A(M,k?.73:.61)];if(Q(i,h[T%h.length],L,k?.91:.7,0,0,0,.035),T%2===0){const[Y,et]=A((M+P)/2,.18),H=x(i,f,.044,.18,.02,Y,et,k?.491:.394);H.rotation.z=(T-7)*-.11}}for(const[T,M,P,k]of[[-3.62,-.68,1,-.24],[3.18,-.63,.84,.29],[-4.2,1.23,.61,-.3],[3.72,1,.45,.32],[1.56,-2.95,.57,-.21]]){const L=E(i,new me(1,0),h[Math.round(P*3)],T,1.22*P,M);L.scale.set(.66*P,2.33*P,.61*P),L.rotation.z=k,L.rotation.y=M,E(i,new me(.21,0),f,T,.7*P,M+.42*P).scale.set(.34,1.9,.49)}for(const T of[-2.85,2.82])b(i,d,.24,.32,.62,T,.32,1.6,7),E(i,new me(.21,0),f,T,.76,1.6).scale.y=1.35;e.add(s,c,5.4,1.75,r-.5,5.65,.29)}function cn(o,t,e){const n=ze(o,"pocket-orbit",.15),[a,i,s]=n.position,r=C("#8c857d"),c=C("#646b6b"),h=C("#c78d50");b(n,Zt,3.38,3.68,.52,0,-.3,0,12),b(n,Tt,3.31,3.51,.25,0,-.01,0,12),b(n,r,3.19,3.33,.13,0,.162,0,12),b(n,c,2.85,2.85,.03,0,.237,0,30);const d=E(n,new ut(2.42,.035,4,64),je,0,.26,0);d.rotation.x=-Math.PI/2;for(let l=0;l<12;l++){const f=l*Math.PI/6,p=Math.cos(f)*3.07,g=Math.sin(f)*3.07,u=x(n,l%3===0?Ue:h,.25,.074,.14,p,.247,g);u.rotation.y=-f}x(n,Zt,1.69,.22,.73,-.08,.04,3.45);for(const l of[-2.56,2.56])b(n,Jt,.095,.14,1.42,l,.68,-2.12),b(n,Ue,.15,.15,.2,l,1.43,-2.12,11),b(n,at,.16,.18,.07,l,1.57,-2.12);for(const l of[-1.9,-.91,1.93])x(n,Jt,.56,.41,.73,-3.54,.04,l),x(n,zt,.58,.1,.75,-3.54,.28,l),x(n,Tt,.26,.162,.022,-3.54,.1,l+.37);Ts(async()=>{const{addPocketOrbitShuttle:l}=await import("./pocketOrbitShuttle-DHRSxsM1.js");return{addPocketOrbitShuttle:l}},__vite__mapDeps([0,1,2]),import.meta.url).then(({addPocketOrbitShuttle:l})=>l(n,e)),t.add(a,s,5.3,5.25,i-.42,3.4,.15)}function ro(o,t,e,n,a,i){const s=c=>a*(1-Math.abs(c/e))**1.55+Math.abs(c/e)**11*.24,r=[];for(let c=0;c<=20;c++){const h=-e+c*e/10;r.push([h,s(h)])}for(let c=20;c>=0;c--){const h=-e+c*e/10;r.push([h,s(h)-.17])}Q(o,i,r,n,0,t,0,.015);for(let c=0;c<=22;c++){const h=-e+c*e/11,d=b(o,c%3===0?zt:i,.06,.06,n+.05,h,t+s(h)+.02,0,7);d.rotation.x=Math.PI/2}for(const c of[-n/2-.012,n/2+.012])for(let h=0;h<14;h++){const d=-e+h*e/7,l=d+e/7;an(o,at,new S(d,t+s(d)-.043,c),new S(l,t+s(l)-.043,c),.075)}}function lo(o,t,e){const n=new G;n.position.set(t,.2,.55),o.add(n);const a=[[-.61,0],[.63,0],[.63,.92],[.34,1.26],[.39,1.98],[.12,2.19],[-.61,2.19]];Q(n,e,a,.94,0,0,0,.042).rotation.y=-Math.PI/2,x(n,Tt,.89,.83,.078,0,1.59,.348).rotation.x=-.09,x(n,tt(9753296,.36),.73,.57,.025,0,1.61,.402).rotation.x=-.09;const i=new G;i.position.set(0,1.61,.436),n.add(i);for(let s=0;s<4;s++)x(i,e,.116,.106,.012,(s%2-.5)*.18,(Math.floor(s/2)-.5)*.15,0);x(n,zt,.99,.14,.46,0,1.06,.45),b(n,Jt,.039,.041,.14,-.28,1.19,.49,10),E(n,new Gt(.071,10,7),Eo,-.28,1.28,.49);for(const s of[.08,.23])b(n,at,.06,.052,.048,s,1.16,.5,10);x(n,je,.69,.16,.036,0,2.01,.388)}function fn(o,t){const n=ze(o,"hanzizap",-.17),[a,i,s]=n.position,r=C("#a75f4a"),c=C("#426564"),h=C("#d9a34f");x(n,Zt,5.57,.37,3.9,0,-.07,.17),x(n,we,5.44,.12,3.8,0,.145,.17),x(n,r,4.8,2.57,.24,0,1.36,-1.39);for(const l of[-2.23,2.23]){for(const f of[-1.31,1.39])b(n,r,.115,.15,2.95,l,1.53,f),b(n,Jt,.19,.21,.21,l,.22,f),b(n,at,.155,.156,.15,l,2.67,f);x(n,c,.119,1.43,2.81,l,.85,0);for(let f=0;f<6;f++)x(n,h,.037,.94,.089,l+Math.sign(l)*.074,.91,-1.13+f*.448)}for(const l of[-1.42,1.42])x(n,we,5.11,.24,.23,0,2.88,l);ro(n,3.08,2.99,3.89,.99,c),x(n,c,2.82,.57,1.98,0,3.96,0),x(n,we,2.96,.105,2.04,0,4.21,0);for(let l=0;l<9;l++)x(n,at,.045,.3,.034,(l-4)*.265,3.99,1.005);ro(n,3.97,1.88,2.64,.61,c),x(n,at,.19,.17,2.7,0,4.64,0),x(n,It,2.77,.28,.13,0,2.66,1.49),x(n,at,2.46,.055,.05,0,2.66,1.58);for(const l of[-1.95,1.95]){const f=E(n,new Gt(.222,12,9),Ue,l,2.49,1.72);f.scale.y=1.19,b(n,zt,.18,.16,.08,l,2.76,1.72),b(n,zt,.15,.18,.08,l,2.22,1.72),x(n,r,.031,.15,.031,l,2.12,1.72)}lo(n,-.93,h),lo(n,.76,r);const d=x(n,r,3.5,.037,.61,0,.071,2.01);d.rotation.y=.022;for(const l of[-1.58,1.58])x(n,at,.042,.04,.52,l,.085,2.01);t.add(a,s,5.13,3.63,i-.42,4.8,-.17)}function dn(o,t){const n=ze(o,"observatory",.34),[a,i,s]=n.position,r=[C("#64928d",.48,.25),C("#588682",.45,.26),C("#7a9e92",.45,.25)],c=C("#c2b3a2");b(n,Jt,2.1,2.37,.35,0,.04,0,12),b(n,c,1.84,1.95,2.78,0,1.45,0,15),b(n,je,1.98,1.91,.21,0,2.81,0,15),b(n,Tt,2.02,1.997,.29,0,3.058,0,16);for(let f=0;f<12;f++){const p=new Gt(1.98,6,11,f*Math.PI/6,Math.PI/6,0,Math.PI/2),g=E(n,p,r[f%3],0,3.18,0);g.scale.y=.83;const u=E(n,new ut(1.975,.028,5,22,Math.PI/2),zt,0,3.19,0);u.rotation.y=f*Math.PI/6,u.scale.y=.83}const h=E(n,new ut(2.11,.062,6,40),at,0,3.04,0);h.rotation.x=Math.PI/2;const d=new Ve(Bo(.59,1.75),{depth:.26,bevelEnabled:!0,bevelSize:.035,bevelThickness:.034,bevelSegments:1,curveSegments:12});E(n,d,It,0,.16,1.76),Ge(n,Tt,0,.204,2.055,.47,1.58);for(const f of[-.24,0,.24])x(n,It,.025,1.17,.032,f,.81,2.063);x(n,at,.08,.11,.056,.27,.75,2.082);for(const f of[-1,1]){const p=new G;p.rotation.y=f*.78,n.add(p),rn(p,0,1.27,1.86,.47,1.04)}const l=new G;l.position.set(.56,4.32,.23),l.rotation.z=-.85,l.rotation.x=.26,n.add(l),b(l,Tt,.48,.39,2.23,0,.82,0,18),b(l,zt,.58,.52,.24,0,2.04,0,18),b(l,C("#a4c8c8",.23,.41),.442,.452,.041,0,2.17,0,18),b(l,at,.47,.49,.12,0,1.58,0,18),b(l,at,.44,.44,.1,0,.19,0,16),b(l,Tt,.17,.15,.56,0,-.51,0,12),x(n,Zt,1.2,.26,.76,0,.1,2.07).rotation.x=-.13,x(n,Zt,1.32,.19,.65,0,-.07,2.56).rotation.x=-.2,t.add(a,s,3.57,3.63,i-.61,5.3,.34)}function hn(o,t,e,n){const a=nn(o,t,e);return ln(o,e,t,n),cn(o,t,n),fn(o,t),dn(o,t),a}let de=null;function Io(){if(de)return de;const o=document.createElement("canvas");o.width=o.height=128;const t=o.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,63);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,.42)"),e.addColorStop(.6,"rgba(255,255,255,.1)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),de=new ie(o),de}function he(o,t,e,n,a,i){const s=new I(new bt(a,a),new ot({map:Io(),color:t,opacity:i,transparent:!0,blending:Ut,depthWrite:!1,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-4}));s.rotation.x=-Math.PI/2,s.position.set(e,z(e,n)+.09,n),s.renderOrder=2,o.add(s)}function un(o,t,e,n,a,i,s){const r=new Pe(new qe({map:Io(),color:t,opacity:s,transparent:!0,blending:Ut,depthWrite:!1,toneMapped:!1}));r.position.set(e,n,a),r.scale.setScalar(i),o.add(r)}function pn(o,t,e){const n=rt(5521),a=[],i=[],s=[];for(const h of t)for(let d=0;d<3;d++)a.push(h.x,h.y,h.z),i.push(n()*6.283),s.push(.17+n()*.22);const r=new ct;r.setAttribute("position",new U(a,3)),r.setAttribute("phase",new U(i,1)),r.setAttribute("radius",new U(s,1));const c=new Oe(r,new J({uniforms:{clock:e},transparent:!0,depthWrite:!1,toneMapped:!1,blending:Ut,vertexShader:`
      uniform float clock;
      attribute float phase;
      attribute float radius;
      varying float fade;
      void main() {
        float t = clock * (2.4 + fract(phase * 7.13) * 2.2) + phase;
        vec3 p = position + vec3(cos(t) * radius, sin(t * 1.7 + phase) * .13 + .06, sin(t * 1.3) * radius);
        p += vec3(sin(t * 9.1), cos(t * 11.3), sin(t * 8.7)) * .03;
        vec4 view = modelViewMatrix * vec4(p, 1.0);
        fade = 1.0 - smoothstep(30.0, 48.0, -view.z);
        gl_PointSize = clamp(34.0 / max(1.0, -view.z), 1.2, 3.6);
        gl_Position = projectionMatrix * view;
      }
    `,fragmentShader:`
      varying float fade;
      void main() {
        float r = length(gl_PointCoord - .5);
        gl_FragColor = vec4(vec3(1.0, .9, .74) * exp(-r * r * 24.0) * .85 * fade, 1.0);
        #include <colorspace_fragment>
      }
    `}));c.frustumCulled=!1,o.add(c)}function mn(o,t,e,n){const a=C("#3c3a44",.6,.35),i=tt(16762482,2.4),s=[[2.9,17.6],[.25,14.7],[2.45,10.7],[-1.4,8.35],[-4.88,5.6],[-8.52,3.55],[-12.32,2.31],[6.28,5.4],[9.2,2.73],[11.55,-.85],[7.3,11.5],[10.1,14.65],[-7.98,-.65],[-8.35,-5.9],[-6.55,-9.09]],r=rt(71893),c=[],h=_o();for(const[l,f]of[...s,...h]){const p=z(l,f),g=.64+r()*.22;b(o,a,.055,.08,g,l,p+g*.5,f,7),b(o,a,.12,.1,.13,l,p+.06,f,7),b(o,i,.081,.11,.19,l,p+g,f,8),b(o,a,.041,.15,.107,l,p+g+.102,f,8);const u=x(o,a,.19,.041,.19,l,p+g-.088,f);u.rotation.y=Math.PI/4,un(o,16757340,l,p+g,f,1.05,.55),he(o,16752714,l,f,3.4,.34),c.push(new S(l,p+g,f))}for(const[l,f]of h)n.add(l,f,.3,.3,z(l,f),1,0);pn(o,c,e);const d=[[.4,1.7,3.6,4645103,14,11],[-2.3,1.8,3.1,16751186,10,9],[-15.2,2.4,-1.4,8370431,16,12],[13.2,2.6,11.8,16757854,14,10],[-3.6,2,-11.4,16761466,7,8],[12.4,2.2,-4.2,9427199,10,10]];for(const[l,f,p,g,u,m]of t?d:d.slice(0,3)){const v=new hs(g,u,m,1.6);v.position.set(l,z(l,p)+f,p),o.add(v)}he(o,8370431,-15.2,-.6,7.5,.26),he(o,16757854,13.2,12.6,6.5,.22),he(o,4645103,.5,4.6,5.5,.18)}const gn=[{id:"dream-ocean",logo:"dream-ocean-logo.webp",aspect:680/277,x:-11.86,z:-.78,yaw:.3,width:3.46,height:1.63,lift:.65,frame:"#677d8e",panel:"#cadde5",lamp:10212583},{id:"pocket-orbit",logo:"pocket-orbit-logo.webp",aspect:680/375,x:9.14,z:-3.09,yaw:-.19,width:3.16,height:1.85,lift:.57,frame:"#a69c8b",panel:"#272a42",lamp:15969383},{id:"hanzizap",logo:"hanzizap-logo.svg",aspect:290/69,x:10.02,z:12.03,yaw:.13,width:3.44,height:1.01,lift:.79,frame:"#b4814c",panel:"#4c3435",lamp:16761976}];function vn(o,t,e){const n=new We;return gn.map(({id:a,logo:i,aspect:s,x:r,z:c,yaw:h,width:d,height:l,lift:f,frame:p,panel:g,lamp:u})=>{const m=new G,v=z(r,c);m.position.set(r,v,c),m.rotation.y=h,o.add(m);const w=C(p,.65,.16),y=C(g,.81),_=tt(u,.52),A=f+l*.5,T=d*.5,M=l*.5,P=.15;Q(m,w,[[-T+P,-M],[T-P,-M],[T,-M+P],[T,M-P],[T-P,M],[-T+P,M],[-T,M-P],[-T,-M+P]],.24,0,A,0,.027),x(m,y,d-.22,l-.2,.31,0,A,0);for(const H of[-1,1])x(m,w,.2,f+.31,.25,H*d*.34,f*.4,0),x(m,y,.39,.15,.49,H*d*.34,.035,0),x(m,_,.4,.035,.055,H*(T-.39),f+.071,.164),x(m,_,.4,.035,.055,H*(T-.39),f+.071,-.164);const k=Math.min(d-.5,(l-.34)*s),L=new bt(k,k/s),Y=n.load(`./island-media/${i}`,e);Y.colorSpace=ne,Y.anisotropy=4;const et=new ot({map:Y,transparent:!0,depthWrite:!1,toneMapped:!1});for(const H of[-1,1]){const N=new I(L,et);N.position.set(0,A,H*.166),N.rotation.y=H<0?Math.PI:0,m.add(N)}return t.add(r,c,d,.38,v-.2,l+f+.28,h),{id:a,box:new So().setFromObject(m)}})}const Fo=Math.PI*2,wn=new F("#2e7255"),xn=new F("#7d9e58"),yn=new F("#41747a"),bn=new F("#8d8052"),Mn=new F("#74654f");function te(o,t,e){const n=z(o,t),a=.41+Math.sin(o*1.37+t*.64)*.07+Math.cos(o*.43-t*.77)*.15;return e.copy(wn).lerp(xn,a+Math.max(0,n)*.062),e.lerp(yn,Math.exp(-((o+15)**2+(t+1)**2)/54)*.59),e.lerp(bn,Math.exp(-((o-13)**2+(t+4)**2)/39)*.77),e.lerp(Mn,Math.max(0,(gt(o,t)-.83)*3.4)+Math.max(0,-.5-n)*.21),e}function Re(o,t,e){o.onBeforeCompile=n=>{n.vertexShader=`varying vec3 terrainPoint;
`+n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
terrainPoint = position;`),n.fragmentShader=`
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
    `+n.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      vec2 groundUV = terrainPoint.xz + terrainPoint.y * vec2(.42, .86);
      vec2 gritUV = groundUV * ${e.toFixed(2)};
      float sharpness = 1.0 - smoothstep(.42, 1.32, length(fwidth(gritUV)));
      float grit = (earthShade(gritUV) - .5) * sharpness;
      float coarse = earthShade(groundUV * .83 + 4.0) - .5;
      diffuseColor.rgb *= 1.0 + grit * ${t.toFixed(2)} + coarse * .18;`)},o.customProgramCacheKey=()=>`ground-${t}-${e}`}function Sn(){const e=[0,z(0,0),0],n=[te(0,0,new F)],a=[];for(let s=1;s<=37;s++)for(let r=0;r<144;r++){const c=Pt((r+s%2*.5*(s<37?1:0))/144*Fo,s/37),[h,d]=c;e.push(h,z(h,d),d),n.push(te(h,d,new F));const l=1+(s-1)*144+r,f=1+(s-1)*144+(r+1)%144;s===1?a.push(0,f,l):a.push(l-144,f,l,l-144,f-144,f)}const i=new ct;return i.setAttribute("position",new U(e,3)),i.setAttribute("color",Qe(n)),i.setIndex(a),i.computeVertexNormals(),i}function co(o,t,e,n,a){const i=[1,1,.96,.985,.83,.765,.63,.34,.035,0],s=[0,-.65,-2.1,-3.05,-4.65,-6.6,-8.65,-11.9,-13.3,-13.82],r=["#746e56","#695451","#635569","#937364","#594e66","#484656","#63536b","#45415a","#4b4357","#3c384e"].map(p=>new F(p)),c=[],h=[],d=[];for(let p=0;p<s.length;p++)for(let g=0;g<o;g++){const u=g/o*Fo,m=Math.sin(u*5+p*.59)*.67+Math.cos(u*13-.9)*.22,v=Math.sin(u*39+.4)*.2+Math.cos(u*49)*.12,w=p>0&&p<9?(m+v)*(.031+p*.003):0,[y,_]=Pt(u,i[p]+w),[A,T]=Pt(u),M=p>0?Math.sin(u*4+.6)*.55+m*.44:0;if(c.push(e+(y-p*p*.025)*t,n+(s[p]+z(A,T)/(1+p*.18)+M)*t,a+(_+p*p*.022)*t),h.push(r[p].clone().multiplyScalar(.87+m*.1+v*.44)),p>0){const P=p*o+g,k=p*o+(g+1)%o;d.push(P-o,k,P,P-o,k-o,k)}}const l=new ct;l.setAttribute("position",new U(c,3)),l.setAttribute("color",Qe(h)),l.setIndex(d);const f=l.toNonIndexed();return l.dispose(),f.computeVertexNormals(),f}function Tn(o){const t=[];for(let e=0;e<o.length-1;e++){const[n,a]=o[Math.max(0,e-1)],[i,s]=o[e],[r,c]=o[e+1],[h,d]=o[Math.min(o.length-1,e+2)],l=Math.ceil(Math.hypot(r-i,c-s)*4);for(let f=0;f<l;f++){const p=f/l,g=(u,m,v,w)=>.5*(2*m+(-u+v)*p+(2*u-5*m+4*v-w)*p*p+(-u+3*m-3*v+w)*p*p*p);t.push(new V(g(n,i,r,h),g(a,s,c,d)))}}return t.push(new V(...o[o.length-1])),t}const Lo=Ps.map(Tn),Pn=new F("#b89f71"),zn=new F("#c7af84");function Cn(){const o=[],t=[],e=[],n=[-1,-.79,-.32,.19,.8,1],a=rt(19309);for(const[s,r]of Lo.entries()){const c=o.length/3,h=s===0?.94:.66;for(const[d,l]of r.entries()){const f=r[Math.max(0,d-1)],p=r[Math.min(r.length-1,d+1)],g=new V(p.y-f.y,f.x-p.x).normalize(),u=h*(.9+.11*Math.sin(d*.32)+.13*a()),m=Math.min(1,(d+2)/5,(r.length-d)/7);for(const[v,w]of n.entries()){const y=l.x+g.x*w*u,_=l.y+g.y*w*u;o.push(y,z(y,_)+.041+.003*s,_);const A=Math.abs(w)>.99?.02:Math.min(1,(1-Math.abs(w))*1.95);t.push(te(y,_,new F).lerp(v%2===0?Pn:zn,A*m).multiplyScalar(.9+a()*.2))}if(d!==0)for(let v=1;v<n.length;v++){const w=c+d*n.length+v,y=w-n.length;e.push(y-1,w-1,w,y-1,w,y)}}}const i=new ct;return i.setAttribute("position",new U(o,3)),i.setAttribute("color",Qe(t)),i.setIndex(e),i.computeVertexNormals(),i}function _n(o){const t=new Bt({vertexColors:!0,roughness:1});Re(t,.23,6.2);const e=new I(Sn(),t);e.receiveShadow=!0,e.castShadow=!0,o.add(e);const n=new Bt({vertexColors:!0,roughness:.96});Re(n,.31,3.6);const a=new I(co(144,1,0,0,0),n);a.receiveShadow=!0,a.castShadow=!0,o.add(a);const i=new Bt({vertexColors:!0,roughness:.92});Re(i,.39,15.6);const s=new I(Cn(),i);s.receiveShadow=!0,o.add(s);for(const[r,c,h,d]of[[-72,-3,-90,.38],[-46,-6,-84,.22],[49,-4,-93,.32],[75,-1.5,-138,.44],[89,-7,-67,.17],[-89,-5.2,-65,.29]]){o.add(new I(co(48,d,r,c,h),n));const l=new I(e.geometry,t);l.position.set(r,c,h),l.scale.setScalar(d),o.add(l)}}const Ee=8,Be=8,An=64,fo=2.23,kn=Math.SQRT2-1,Rn=4,ho=1.8,En=2.0625;function Bn(o,t,e,n){const a=e.matrixWorld.elements,i=o*a[0]+t*a[2],s=-o*a[2]+t*a[0],r=Math.abs(i),c=Math.abs(s),h=kn*(n%2===1?.72:1);return Math.min(r,c)>=Math.max(r,c)*h?s<0?i<0?3:5:i<0?1:7:r>c?i<0?2:6:s<0?4:0}function uo(o,t,e,n){let a=!1;const i=o.load(new URL(`./island-media/andi/${t}.webp`,document.baseURI).href,()=>{a=!0,n()});i.colorSpace=ne,i.magFilter=ye,i.minFilter=ye,i.generateMipmaps=!1,i.repeat.set(1/e,1/Ee);const s=new Pe(new qe({map:i,transparent:!1,alphaTest:.5,toneMapped:!1}));return s.name=`Andi ${t}`,s.scale.set(fo,fo,1),s.center.set(.5,1/An),s.position.y=.044,s.visible=!1,{sprite:s,get loaded(){return a},pose(r,c){i.offset.set(c/e,(Ee-1-r)/Ee)}}}function In(){const o=document.createElement("canvas");o.width=o.height=64;const t=o.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.45,"rgba(255,255,255,.45)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const n=new ie(o),a=new G;a.name="Footstep dust";const i=.75,s=Array.from({length:14},()=>{const c=new Pe(new qe({map:n,color:"#a99fc8",transparent:!0,depthWrite:!1,toneMapped:!1,opacity:0}));return c.visible=!1,a.add(c),{sprite:c,age:i,drift:new S}});let r=0;return{group:a,spawn(c,h,d,l){const f=s[r];r=(r+1)%s.length,f.age=0,f.sprite.position.set(c-d*.25+(Math.random()-.5)*.2,z(c,h)+.12,h-l*.25),f.drift.set(-d*.35+(Math.random()-.5)*.3,.32,-l*.35+(Math.random()-.5)*.3),f.sprite.visible=!0},update(c){for(const h of s){if(h.age>=i)continue;h.age=Math.min(i,h.age+c);const d=h.age/i;h.sprite.position.addScaledVector(h.drift,c*(1-d)),h.sprite.scale.setScalar(.28+d*.75),h.sprite.material.opacity=.34*(1-d)*Math.min(1,d*6),h.sprite.visible=h.age<i}}}}function Fn(o,t){const e=new G;e.name="Andi";const n=new We,a=uo(n,"walk",Be+1,t),i=uo(n,"sprint",Be,t);e.add(a.sprite,i.sprite);const s=new I(new bt(1.62,1.38),new J({uniforms:{tint:{value:new F("#201c28")}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`
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
    `}));s.position.y=.049,e.add(s);const r=In(),c=new S(0,0,1),h=new S,d=Rn/o;let l=4,f="idle",p=0,g=!1,u=-1;return{root:e,dust:r.group,get ready(){return a.loaded},update(m,v,w,y,_,A,T){const M=m.x-e.position.x,P=m.z-e.position.z;e.position.copy(m);const k=g&&!T&&!A?Math.hypot(M,P):0,L=k/w;g=!0;const Y=L>.015;l=Bn(Y?M:Math.sin(v),Y?P:Math.cos(v),y,l);const et=o*(f==="sprint"?1.035:1.075);if(f=Y?_||L<et?"walk":"sprint":"idle",f==="idle")p=0;else{const re=L*d/(2*ho),Nt=Et.clamp(Math.sqrt(re),.7,2.2),le=En*ho*Nt;p=(p+k*d/le)%1}const H=f==="sprint"&&i.loaded,N=Math.floor(p*Be);H&&N!==u&&(N===1||N===5)&&!Le.matches&&k>0&&r.spawn(m.x,m.z,M/k,P/k),u=H?N:-1,r.update(w),a.sprite.visible=a.loaded&&!H,i.sprite.visible=H,H?i.pose(l,N):a.pose(l,f==="idle"?0:N+1),s.visible=a.loaded&&!A;const{x:pt,z:vt}=m;h.set(z(pt-.29,vt)-z(pt+.29,vt),.58,z(pt,vt-.29)-z(pt,vt+.29)).normalize(),s.quaternion.setFromUnitVectors(c,h)}}}const Ie=[.25,.35,.28],po=[1.04,1.1,.94],Fe=[1.66,1.52,.98],mo=(o,t,e)=>[o[0]+(t[0]-o[0])*e,o[1]+(t[1]-o[1])*e,o[2]+(t[2]-o[2])*e];function Ln(o,t,e){return o<.45?mo(t,po,Math.pow(o/.45,.8)):mo(po,e,Math.pow((o-.45)/.55,1.4))}const ue=new S,Dn=new S,Un=new S(0,1,0);function Gn(o,t){const e=Math.cos(t.angle),n=Math.sin(t.angle),a=l=>{const f=t.lean*l*l,p=t.height*(2*l*(1-l)*.82+l*l*(1-t.droop*.75));return[t.x+e*f,p,t.z+n*f]},i=l=>t.width*Math.pow(Math.max(0,1-Math.pow(l,1.6)),.9),s={positions:[],normals:[],shade:[],sway:[],phase:[],indices:[],heart:t.heart},r=(l,f)=>{s.positions.push(l[0],l[1],l[2]);const p=a(Math.max(0,f-.05)),g=a(Math.min(1,f+.05)),u=(g[0]-p[0])*e+(g[2]-p[2])*n,m=g[1]-p[1],v=Math.max(1e-5,Math.hypot(u,m));ue.set(-e*m/v,u/v,-n*m/v).multiplyScalar(.6).addScaledVector(Un,.75).addScaledVector(Dn.set(e,0,n),.3).normalize(),s.normals.push(ue.x,ue.y,ue.z);const w=Ln(f,t.root,t.tip),y=t.value*(1-t.inner*.26*Math.pow(1-f,1.5));return s.shade.push(w[0]*y,w[1]*y,w[2]*y),s.sway.push(f),s.phase.push(t.phase),s.sway.length-1},c=[];for(let l=0;l<t.segments;l++){const f=l/t.segments,p=a(f),g=t.angle+Math.PI*.5+t.twist*f,u=i(f),m=Math.cos(g)*u,v=Math.sin(g)*u;c.push([r([p[0]-m,p[1],p[2]-v],f),r([p[0]+m,p[1],p[2]+v],f)])}for(let l=0;l<c.length-1;l++){const[f,p]=c[l],[g,u]=c[l+1];s.indices.push(f,p,u,f,u,g)}const[h,d]=c[c.length-1];s.indices.push(h,d,r(a(1),1)),o.push(s)}function Do(o){let t=o;return()=>(t=t*16807%2147483647,(t-1)/2147483646)}function Uo(o,t,e){const n=e()*Math.PI*2;for(let a=0;a<t.blades;a++){const i=t.blades>1?a/(t.blades-1):0,s=n+a*2.39996+(e()-.5)*.4,r=t.spread*Math.sqrt(i)*(.7+e()*.3);Gn(o,{x:t.x+Math.cos(s)*r,z:t.z+Math.sin(s)*r,angle:s+(e()-.5)*.5,height:t.height*(1-i*t.fall)*(.88+e()*.24),width:t.width*(.85+e()*.3)*(1-i*.15),lean:t.lean*(.25+i*.95)*(.8+e()*.4),droop:t.droop*Math.pow(i,.8)+e()*.08,twist:(e()-.5)*.9,phase:e(),segments:a<t.curved?3:2,value:t.value*(.93+e()*.14),inner:1-i,heart:[t.x,t.z],root:[Ie[0]*t.tint[0],Ie[1]*t.tint[1],Ie[2]*t.tint[2]],tip:[Fe[0]*t.tint[0],Fe[1]*t.tint[1],Fe[2]*t.tint[2]]})}}const Hn=o=>o<.28?[1.05,1.03,.88]:o>.74?[.92,1,1.05]:[1,1,1];function Nn(o,t,e){return Array.from({length:o},(n,a)=>{const i=t*Math.sqrt((a+.5)/o),s=a*2.39996+e()*.6;return[Math.cos(s)*i+(e()-.5)*.08,Math.sin(s)*i+(e()-.5)*.08]})}function Go(o,t){const e=[],n=[],a=[],i=[],s=[],r=[],c=new S;for(const d of o){for(let f=0;f<d.sway.length;f++){const p=d.positions[f*3]-d.heart[0],g=d.positions[f*3+2]-d.heart[1],u=Math.hypot(p,g);c.set(p,0,g).multiplyScalar(u>1e-4?1/u:0).multiplyScalar(t*(.35+.65*d.sway[f])),c.x+=d.normals[f*3],c.y+=d.normals[f*3+1],c.z+=d.normals[f*3+2],c.normalize(),d.normals[f*3]=c.x,d.normals[f*3+1]=c.y,d.normals[f*3+2]=c.z}const l=i.length;e.push(...d.positions),n.push(...d.normals),a.push(...d.shade),i.push(...d.sway),s.push(...d.phase);for(const f of d.indices)r.push(l+f)}const h=new ct;return h.setIndex(r),h.setAttribute("position",new U(e,3)),h.setAttribute("normal",new U(n,3)),h.setAttribute("color",new U(a,3)),h.setAttribute("aSway",new U(i,1)),h.setAttribute("aPhase",new U(s,1)),h.computeBoundingSphere(),h}function On(o){const t=[],e=Do(2711),n=o?5:7;for(const[a,i]of Nn(6,.55,e)){const s=.82+e()*.36;Uo(t,{x:a,z:i,blades:n,height:.7*s,fall:.4,spread:.3,lean:.44,droop:.5,width:o?.052:.046,curved:o?0:2,tint:Hn(e()),value:.9+e()*.2},e)}return Go(t,.45)}function Wn(){const o=[];return Uo(o,{x:0,z:0,blades:13,height:1,fall:.38,spread:.12,lean:.44,droop:.85,width:.042,curved:13,tint:[1,1,1],value:1},Do(9127)),Go(o,.85)}const Vn=`
float meadowGust;
vec3 meadowWind(vec3 root, vec3 up, float t, float phase) {
  vec3 dir = uWindDir - up * dot(uWindDir, up);
  dir = dir / max(length(dir), 1e-4);
  float g1 = sin(dot(root, uWindDir * 0.085 + vec3(0.031, -0.047, 0.022)) - uTime * 0.7);
  float g2 = sin(dot(root, uWindDir * 0.06 + vec3(-0.052, 0.018, 0.041)) - uTime * 0.43 + 1.7);
  float g3 = sin(dot(root, vec3(0.017, 0.029, -0.023)) + uTime * 0.11);
  meadowGust = smoothstep(0.35, 1.0, (g1 + g2) * 0.5 + g3 * 0.35);
  float along = dot(root, uWindDir);
  float wave = sin(along * 0.42 - uTime * 1.9 + sin(dot(root, vec3(0.13, 0.07, -0.11))) * 1.6) * 0.5 + 0.5;
  float clump = fract(sin(dot(root, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
  float stiff = 0.75 + clump * 0.5;
  float flutter = sin(uTime * (2.6 + phase * 1.9) + phase * 6.2832 + clump * 6.2832);
  float strength = 0.25 + uWind * 1.1;
  float push = strength * stiff * (0.18 + wave * 0.32 + meadowGust * 0.75) + flutter * 0.07 * strength;
  vec3 side = cross(up, dir);
  float sway = sin(uTime * 0.83 + clump * 4.0 + along * 0.15) * 0.12 * strength;
  return (dir * push + side * sway) * t * t;
}
vec3 meadowComb(vec3 p, vec3 up) {
  vec3 comb = vec3(sin(dot(p, vec3(0.071, 0.043, -0.052)) + 0.7), sin(dot(p, vec3(-0.038, 0.066, 0.049)) + 2.1), sin(dot(p, vec3(0.057, -0.061, 0.035)) + 4.4))
    + 0.6 * vec3(sin(dot(p, vec3(0.31, -0.22, 0.17)) + 1.3), sin(dot(p, vec3(0.19, 0.27, -0.33)) + 3.7), sin(dot(p, vec3(-0.26, 0.21, 0.29)) + 5.9))
    + 0.55 * vec3(sin(dot(p, vec3(0.83, 0.61, -0.52)) + 0.4), sin(dot(p, vec3(-0.57, 0.94, 0.41)) + 2.6), sin(dot(p, vec3(0.66, -0.48, 0.97)) + 4.8));
  return comb - up * dot(comb, up);
}
`;function qn(o){const t=new ps({vertexColors:!0,side:se}),e={value:.35},n={value:new S(.8,.15,.55).normalize()};return t.onBeforeCompile=a=>{a.uniforms.uTime=o,a.uniforms.uWind=e,a.uniforms.uWindDir=n,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
attribute float aSway;
attribute float aPhase;
uniform float uTime;
uniform float uWind;
uniform vec3 uWindDir;
varying float vTip;
${Vn}`).replace("#include <begin_vertex>",`#include <begin_vertex>
{
  mat4 plant = modelMatrix * instanceMatrix;
  mat3 basis = mat3(plant);
  vec3 root = (plant * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vec3 up = vec3(0.0, 1.0, 0.0);
  vec3 axisScale = vec3(dot(basis[0], basis[0]), dot(basis[1], basis[1]), dot(basis[2], basis[2]));
  float seed = fract(sin(dot(root, vec3(7.13, 157.1, 113.7))) * 43758.5453);
  // Low sweeps between taller heads, so the meadow reads in masses.
  float swale = 0.5 + 0.25 * (sin(dot(root, vec3(0.41, -0.25, 0.33)) + 1.3) + sin(dot(root, vec3(-0.22, 0.38, 0.29)) + 4.1));
  transformed.y *= mix(.62, 1.10, smoothstep(.20, .74, swale));
  // No two clumps alike: each squashed along its own axis.
  float sa = seed * 12.566;
  vec2 axis = vec2(cos(sa), sin(sa));
  transformed.xz += axis * dot(transformed.xz, axis) * (seed - 0.5) * 0.6;
  // Wind and the combed flow in world space, carried back into the plant's frame; a bent blade
  // dips so its length is kept.
  float heightHere = max(transformed.y, 0.0) * sqrt(axisScale.y);
  vec3 push = meadowWind(root, up, aSway, aPhase) * heightHere * 0.5;
  push += meadowComb(root, up) * 0.68 * aSway * aSway * heightHere;
  vec3 local = (transpose(basis) * push) / axisScale;
  transformed.xz += local.xz;
  float lateral = length(local.xz);
  transformed.y = transformed.y * transformed.y / sqrt(transformed.y * transformed.y + lateral * lateral + 1e-6);
  vTip = aSway;
  // The meadow's colour field: cool teal, fresh green, warm olive-gold and a faint plum, in
  // rolling patches; a passing gust lights the tips it bends.
  float w2 = 0.5 + 0.25 * (sin(dot(root, vec3(-0.3, 0.18, 0.39)) + 2.2) + sin(dot(root, vec3(0.26, 0.34, -0.21)) + 5.3));
  vec3 tint = mix(vec3(0.72, 0.88, 0.98), vec3(1.0, 1.04, 0.95), smoothstep(0.28, 0.65, swale));
  tint = mix(tint, vec3(1.06, 1.0, 0.88), smoothstep(0.58, 0.82, swale * 0.8 + seed * 0.2));
  tint = mix(tint, vec3(1.04, 0.9, 1.0), smoothstep(0.74, 0.9, w2) * 0.45);
  vColor.rgb *= tint * (1.0 + meadowGust * aSway * (0.14 + uWind * 0.18));
  vColor.rgb = mix(vec3(dot(vColor.rgb, vec3(0.3, 0.59, 0.11))), vColor.rgb, 0.88);
}`),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
varying float vTip;`).replace("#include <normal_fragment_begin>",`#include <normal_fragment_begin>
normal = normalize( vNormal );`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance += diffuseColor.rgb * (0.05 + 0.16 * vTip * vTip) * vec3(0.8, 0.9, 1.15);`)},t.customProgramCacheKey=()=>"pocket-orbit-meadow",t}function Xn(o,t,e,n,a){const i=qn(e),s=rt(31337),r=new us,c=new F,h=new F,d=(m,v,w,y)=>gt(m,v)<.965&&w>st+.05&&!a(m,v,y)&&!t.solid(m,v,.3,w,w+.6),l=n?1.15:.82,f=[];for(let m=-28;m<=28;m+=l)for(let v=-22;v<=22;v+=l){const w=m+(s()-.5)*l*.8,y=v+(s()-.5)*l*.8,_=z(w,y);d(w,y,_,1.02)&&f.push([w,_,y])}const p=new oo(On(n),i,f.length);f.forEach(([m,v,w],y)=>{const _=(n?.72:.6)+s()*.2;r.position.set(m,v-.03,w),r.rotation.set(0,s()*Math.PI*2,0),r.scale.set(_,(.5+s()*.3)*1,_),r.updateMatrix(),p.setMatrixAt(y,r.matrix),te(m,w,h),c.copy(h).multiplyScalar(1.12+s()*.1),p.setColorAt(y,c)}),p.receiveShadow=!0,o.add(p);const g=[];for(let m=0;m<(n?900:1800)&&g.length<(n?110:240);m++){const v=(s()-.5)*54,w=(s()-.5)*42,y=z(v,w);gt(v,w)<.8&&s()>.25||!d(v,w,y,1.3)||g.push([v,y,w])}const u=new oo(Wn(),i,g.length);g.forEach(([m,v,w],y)=>{const _=.45+s()*.3;r.position.set(m,v-.03,w),r.rotation.set(0,s()*Math.PI*2,0),r.scale.set(_,_*(.8+s()*.4),_),r.updateMatrix(),u.setMatrixAt(y,r.matrix),te(m,w,h),c.copy(h).multiplyScalar(1.05+s()*.12),u.setColorAt(y,c)}),u.receiveShadow=!0,o.add(u)}const Ft=C("#4a3c3a"),ee=C("#6a5548");let Ho={value:0},$t=null;function Qn(){if($t)return $t;const o=256,t=document.createElement("canvas");t.width=t.height=o;const e=t.getContext("2d");e.fillStyle="#ffffff";const n=rt(1337),a=(s,r,c,h,d)=>{e.save(),e.translate(s,r),e.rotate(d),e.beginPath(),e.moveTo(0,-c/2),e.quadraticCurveTo(h,-c*.1,0,c/2),e.quadraticCurveTo(-h,-c*.1,0,-c/2),e.fill(),e.restore()},i=o/2;for(let s=0;s<70;s++){const r=Math.sqrt(n())*o*.36,c=n()*Math.PI*2,h=i+Math.cos(c)*r,d=i+Math.sin(c)*r*.9;a(h,d,30+n()*26,11+n()*6,c+Math.PI/2+(n()-.5)*.9)}return e.beginPath(),e.arc(i,i,o*.2,0,Math.PI*2),e.fill(),$t=new ie(t),$t.colorSpace=ne,$t}function Ct(o,t=0,e=!1){const n=new Bt({color:o,roughness:.8});return t&&(n.emissive=new F(o),n.emissiveIntensity=t),e&&(n.map=Qn(),n.alphaTest=.5,n.side=se),n.onBeforeCompile=a=>{a.uniforms.uLeafTime=Ho,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
uniform float uLeafTime;`).replace("#include <begin_vertex>",`#include <begin_vertex>
      float leafLift = max(0.0, transformed.y - 1.2);
      float leafWave = sin(uLeafTime * .9 + transformed.x * .35 + transformed.z * .22);
      transformed.x += leafWave * .011 * leafLift;
      transformed.z += cos(uLeafTime * .7 + transformed.z * .31) * .008 * leafLift;`),a.fragmentShader=a.fragmentShader.replace("#include <normal_fragment_begin>",`#include <normal_fragment_begin>
      ${e?"normal = normalize( vNormal );":""}`).replace("#include <emissivemap_fragment>",`
      #include <emissivemap_fragment>
      float leafRim = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 2.4);
      vec3 leafRimColor = mix(vec3(.10, .32, .34), vec3(.34, .30, .62), clamp(normal.y * .5 + .5, 0.0, 1.0));
      totalEmissiveRadiance += leafRimColor * leafRim * .42 * diffuseColor.rgb * 3.0;
    `)},n.customProgramCacheKey=()=>`foliage-${t}-${e}`,n}const No=["#2f6a52","#43805a","#5a9064","#3f7a63","#6f9768"],Oo=["#2f5f74","#3f7a8c","#4f8e90","#4a7894","#6a9aa2"],Wo=["#c66fae","#9a6fd6","#e38bb8","#7d8de6"],$n=No.map(o=>Ct(o)),jn=Oo.map(o=>Ct(o)),Ye=(o,t)=>`#${new F(o).offsetHSL(0,-.02,t).getHexString()}`,Yn=No.map(o=>Ct(Ye(o,.09),0,!0)),Kn=Oo.map(o=>Ct(Ye(o,.09),0,!0)),go=["#1f4d48","#285c50","#2f6a5a","#234f5a"].map(o=>Ct(o)),pe=Wo.map(o=>Ct(o,.32)),vo=Wo.map(o=>Ct(Ye(o,.06),.38,!0)),Zn=tt(16766704,2.2);function He(o,t,e){const n=new be(o,t),a=rt(e),i=n.attributes.position,s=n.attributes.normal,r=new Map;for(let c=0;c<i.count;c++){const h=`${i.getX(c).toFixed(3)},${i.getY(c).toFixed(3)},${i.getZ(c).toFixed(3)}`;r.has(h)||r.set(h,.84+a()*.3);const d=r.get(h),l=i.getX(c),f=i.getY(c),p=i.getZ(c),g=Math.hypot(l,f,p)||1;s.setXYZ(c,l/g,f/g,p/g),i.setXYZ(c,l*d,f*d,p*d)}return n}function yt(o,t,e,n,a,i){const s=e.clone().sub(t),r=t.clone().lerp(e,.5);E(o,new yo(a,n,s.length()*1.05,7),i,r.x,r.y,r.z).quaternion.setFromUnitVectors(new S(0,1,0),s.normalize())}function Jn(o,t,e,n,a,i,s,r=!1){const c=z(e,n),h=r?jn:$n,d=r?Kn:Yn,l=rt(s),f=new G;f.position.set(e,c-.18,n),f.rotation.y=i,f.scale.setScalar(a),o.add(f);const p=[new S(0,-.02,0),new S(-.11,.96,.09),new S(.055,1.88,.16),new S(.49,2.68,.2),new S(.75,3.3,.14)],g=[.238,.174,.118,.071,.023];for(let u=1;u<p.length;u++)yt(f,p[u-1],p[u],g[u-1],g[u],u%2===0?Ft:ee);for(let u=0;u<5;u++){const m=u*Math.PI*.4+l()*.31;yt(f,new S(-.02,.31,.03),new S(Math.cos(m)*.62,-.02,Math.sin(m)*.6),.12,.036,Ft)}for(let u=0;u<10;u++){const m=u/10,v=u*2.4+l()*.41,w=new S(Math.cos(v),0,Math.sin(v)),y=p[1].clone().lerp(p[4],.25+.67*m),_=(1-m*.69)*(1.32+l()*.51),A=y.clone().addScaledVector(w,_);A.y+=.31+l()*.19;const T=y.clone().lerp(A,.53);T.y-=.14,yt(f,y,T,.079-m*.033,.049,Ft),yt(f,T,A,.052,.017,ee);for(let M=0;M<3;M++){const P=T.clone().lerp(A,.22+M*.32),k=(1-m*.54)*(1-M*.18),L=E(f,He(1,1,s+u*7+M),h[(u+M+1)%h.length],P.x,P.y+.1,P.z);L.scale.set((.9+l()*.25)*k,(.46+l()*.16)*k,(.86+l()*.22)*k),L.rotation.y=u*.94,L.rotation.z=-.16+l()*.35,Ne(f,d[(u+M+1)%d.length],L.position,L.scale.x,L.scale.y,L.scale.z,M===0?6:4,l)}}for(let u=0;u<3;u++){const m=E(f,He(.56-u*.09,1,s+91+u),h[2+u],.62+.139*u,3.07+.2*u,.14);m.scale.set(1.22,.57,.92),Ne(f,d[2+u],m.position,.68-u*.1,.32-u*.05,.5-u*.08,4,l)}t.add(e,n,a*.43,a*.43,c-.2,a*1.8)}const ti=new S(0,0,1),jt=new S;function Ne(o,t,e,n,a,i,s,r){for(let c=0;c<s;c++){const h=r()*Math.PI*2,d=-.25+r()*1.15;jt.set(Math.cos(h),d,Math.sin(h)).normalize();const l=(n+i)*(.62+r()*.26),f=E(o,new bt(l,l*(.8+r()*.3)),t,e.x+jt.x*n*.82,e.y+jt.y*a*.9,e.z+jt.z*i*.82);f.quaternion.setFromUnitVectors(ti,jt),f.rotateZ(r()*Math.PI*2)}}function ei(o,t,e,n,a,i){const s=rt(i),r=z(e,n),c=new G;c.position.set(e,r-.1,n),c.rotation.y=s()*6.28,c.scale.setScalar(a),o.add(c),b(c,Ft,.07,.14,1.3,0,.62,0,6);const h=4+Math.floor(s()*2);for(let d=0;d<h;d++){const l=d/h,f=(1-l*.72)*(.95+s()*.14),p=.95-l*.25,g=new bo(f,p,7,1),u=g.attributes.position;for(let v=0;v<u.count;v++)u.getY(v)<0&&(u.setY(v,u.getY(v)-.08+s()*.05),u.setX(v,u.getX(v)*(.9+s()*.2)),u.setZ(v,u.getZ(v)*(.9+s()*.2)));g.computeVertexNormals();const m=E(c,g,go[(d+i)%go.length],(s()-.5)*.05,.9+d*.52,(s()-.5)*.05);m.rotation.y=s()*6.28}t.add(e,n,a*.5,a*.5,r-.2,a*3)}function oi(o,t,e,n,a,i){const s=rt(i),r=z(e,n),c=new G;c.position.set(e,r-.1,n),c.rotation.y=s()*6.28,c.scale.setScalar(a),o.add(c);const h=[new S(0,0,0),new S(.12,.8,.05),new S(-.05,1.55,.1),new S(.15,2.1,0)],d=[.17,.12,.08,.05];for(let p=1;p<h.length;p++)yt(c,h[p-1],h[p],d[p-1],d[p],ee);const l=pe[i%pe.length],f=pe[(i+1)%pe.length];for(let p=0;p<7;p++){const g=p*2.4+s()*.5,u=p===0?0:.55+s()*.45,m=h[3].x+Math.cos(g)*u,v=h[3].z+Math.sin(g)*u,w=h[3].y+.1+(p===0?.35:s()*.3-.1);p&&yt(c,h[2],new S(m,w-.1,v),.05,.02,ee);const y=E(c,He(.5+s()*.2,1,i+p),p%3?l:f,m,w,v);if(y.scale.y=.7,Ne(c,vo[(i+(p%3?0:1))%vo.length],y.position,.6,.38,.6,5,s),p&&s()>.35){const _=E(c,new be(.055,0),Zn,m*1.08,w-.42,v*1.08);_.castShadow=!1}}t.add(e,n,a*.4,a*.4,r-.2,a*2.5)}const si=[[-12.9,9.6,.95],[-19.4,10.9,.85],[-11.4,-4.6,.8],[-19.6,1.1,.78],[6.9,15.1,.82],[17.7,4.2,.74]];function ni(o,t,e){const n=rt(48151);let a=0;const i=e?22:38;for(let s=0;s<900&&a<i;s++){const r=n()*Math.PI*2,c=.74+n()*.17,[h,d]=Pt(r,c),l=z(h,d);d>12.5&&Math.abs(h-2)<9||l<st+.25||oe(h,d,1.7)||t.solid(h,d,1.1,l-.5,l+3)||(ei(o,t,h,d,.8+n()*.65,3001+s),a++)}}const ii=[[-21.4,-1.2,1.22,.75,1],[-17.1,-7.15,1.32,.12,1],[-12.35,-5.4,.94,-1.2,1],[-17.95,2.62,.83,.68,1],[-22.2,5.9,.83,.24,1],[-8.15,-12.3,1.13,.28,0],[-.42,-16.85,1.12,-.43,0],[-9.65,-14.48,.78,1.1,0],[4.35,-15.45,1.29,.12,0],[8.67,-12.66,.88,1.68,0],[16.7,-10.47,1.01,-.29,0],[19.55,-6.5,1.03,.52,0],[22.02,-1.73,.79,-1,0],[20.45,5.3,1.26,.98,0],[18.05,10.94,1.12,-.4,0],[16.43,13.64,.66,2.12,0],[-7.15,13.7,1.13,.8,0],[-8.9,10.6,.86,1.46,0],[-3.2,14.32,.72,1.24,0],[-2.75,-6.9,.72,.26,0],[5.9,-.96,.78,-.46,0],[-10.5,-2.3,.72,.89,1],[-5.5,-4.75,.73,-.89,0]];function oe(o,t,e){const n=e*e;return Lo.some(a=>a.some(i=>(i.x-o)**2+(i.y-t)**2<n))}function ai(o,t,e){const n=["#6f7073","#827263","#697b77","#9d8a76","#51636a"].map(r=>C(r)),a=["#49694f","#5d805f","#798b61"].map(r=>C(r)),i=[tt(10466559,.9),tt(16757611,.8),tt(16744383,.9),tt(16773280,.7)],s=rt(5256);for(let r=0;r<(e?290:505);r++){const c=(s()-.5)*56,h=(s()-.5)*42,d=z(c,h),l=gt(c,h);if(l>.995||d<st-.12||t.solid(c,h,.15,d,d+.3))continue;const p=l>.82?.23+s()**2*.79:.06+s()**2*.26;if(oe(c,h,.89)&&p>.12)continue;const g=E(o,new me(p,0),n[r%n.length],c,d-p*.06,h);if(g.scale.set(.98+s()*.52,.35+s()*.43,.75+s()*.39),g.rotation.set(.25,s()*6.28,(s()-.5)*.43),p>.64&&t.add(c,h,p*1.15,p*1.17,d-.3,p*.75),!(l>.91||p<.16||r%4!==0))for(let u=0;u<4;u++)E(o,new be(.2+s()*.25,0),a[u%a.length],c+(s()-.5)*.85,d+.132,h+(s()-.5)*.62).scale.set(1.22,.65+s()*.3,.78)}for(const[r,c,h]of[[-10.7,6.35,0],[-17.8,4.45,0],[-2.8,6.8,2],[3.5,3.84,1],[9.77,10.8,1],[15.76,11.53,3],[-5.4,-9.9,0],[15.2,-3.56,1],[3.12,14.72,3],[-4.88,11.4,2]])for(let d=0;d<(e?14:28);d++){const l=r+(s()-.5)*2.4,f=c+(s()-.5)*1.55,p=z(l,f),g=.19+s()*.31;if(oe(l,f,.69)||p<st||t.solid(l,f,.1,p,p+.3))continue;b(o,a[d%3],.011,.018,g,l,p+g/2,f,5);const u=E(o,new be(.069+s()*.045,0),i[h],l,p+g,f);u.scale.y=.59}for(const[r,c]of[[-12.4,6.9],[-16.7,5.08],[-19.6,7.05],[-17.1,10.55]])if(!(z(r,c)<st-.2))for(let h=0;h<13;h++){const d=(s()-.5)*.92,l=(s()-.5)*.67,f=.21+s()*.62,p=b(o,a[h%3],.012,.023,f,r+d,z(r+d,c+l)+f/2,c+l,5);p.rotation.z=d*.22}}function ri(o){const t=C("#a68c67");for(const[e,n]of[[[.565,.64,.715,.79],.895],[[1.881,1.954,2.027],.925]]){let a;for(const i of e){const[s,r]=Pt(i,n),c=z(s,r);b(o,ee,.086,.11,1.04,s,c+.43,r,7),x(o,Ft,.235,.145,.235,s,c+.965,r).rotation.y=i;const h=new S(s,c+.73,r);if(a){const d=a.clone().lerp(h,.5);d.y-=.15,yt(o,a,d,.025,.023,t),yt(o,d,h,.023,.025,t)}a=h}}}function li(o,t,e,n){Ho=e,ii.forEach(([i,s,r,c,h],d)=>Jn(o,t,i,s,r,c,772+d*331,!!h)),si.forEach(([i,s,r],c)=>{const h=z(i,s);h>st+.2&&!oe(i,s,1.2)&&!t.solid(i,s,.9,h-.5,h+2)&&oi(o,t,i,s,r,61+c*17)}),ni(o,t,n),ai(o,t,n),Xn(o,t,e,n,oe),ri(o),[-15,-1.02,10.5].forEach((i,s)=>{const[r,c]=s===0?$:[i,15.65],h=z(r,c);h>st&&(x(o,Ft,.28,.14,.83,r,h+.04,c).rotation.y=s*.27)})}class ci{constructor(t){this.land=t}camera=new ms(48,1,.18,700);yaw=.19;pitch=.415;aspect=1;position=new S;aim=new S;target=new S;sample=new S;initialized=!1;intro=0;resize(t,e){this.aspect=t/Math.max(1,e),this.camera.aspect=this.aspect,this.camera.updateProjectionMatrix()}turn(t,e){this.yaw=(this.yaw-t*.0078)%(Math.PI*2),this.pitch=Et.clamp(this.pitch+e*.0057,.16,1.08)}arrive(){this.intro=1}recenter(){this.yaw=.19,this.pitch=.415}update(t,e,n,a,i,s=!1){const r=this.aspect<.76,c=n?r?58:52:48;if(n)this.walkPose(e,r);else{const l=67.5/Math.max(.32,this.aspect),f=r?Math.max(82,l):63+Math.max(0,1.28-this.aspect)*28,p=i?0:Math.sin(a*.16)*1.5;if(this.position.set(12.9+p,r?38.5:24.6,f),this.aim.set(r?-.25:-9.75*Math.min(1,this.aspect/1.46),r?f*.229:7.9,0),this.intro>0&&!i){this.intro=Math.max(0,this.intro-t/4.6);const g=this.intro,u=g*g*(3-2*g),m=-.38*u,v=this.position.x-this.aim.x,w=this.position.z-this.aim.z,y=1+.14*u;this.position.set(this.aim.x+(v*Math.cos(m)-w*Math.sin(m))*y,this.position.y+10*u,this.aim.z+(v*Math.sin(m)+w*Math.cos(m))*y),this.aim.y+=3.5*u}}(n||i)&&(this.intro=0);const d=!this.initialized||s||i||this.intro>0?1:1-Math.exp(-t*(n?9:3.5));this.camera.position.lerp(this.position,d),this.target.lerp(this.aim,n?Math.min(1,d*1.22):d),this.camera.fov=Et.lerp(this.camera.fov,c,d),this.camera.updateProjectionMatrix(),this.camera.lookAt(this.target),this.camera.updateMatrixWorld(),this.initialized=!0}walkPose(t,e){const n=Math.sin(this.yaw),a=Math.cos(this.yaw),i=e?8.9:9.3,s=i*Math.cos(this.pitch);this.aim.set(t.x-n*1.6,Math.max(-2,t.y)+1.78,t.z-a*1.6),this.position.set(t.x+n*s+a*.5,Math.max(-.5,t.y)+1.17+i*Math.sin(this.pitch),t.z+a*s-n*.5),this.sample.set(t.x,Math.max(-2,t.y)+1.5,t.z);for(let r=1;r<=20;r++){const c=r/20,h=Et.lerp(this.sample.x,this.position.x,c),d=Et.lerp(this.sample.y,this.position.y,c),l=Et.lerp(this.sample.z,this.position.z,c);if(this.land.solid(h,l,.42,d-.39,d+.38)||gt(h,l)<1&&z(h,l)>d-.45){this.position.lerp(this.sample,1-Math.max(.2,(r-1)/20));break}}}}const fi=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowLeft","ArrowDown","ArrowRight"]),di=new Set(["ShiftLeft","ShiftRight"]);class hi{constructor(t,e,n,a){this.stick=e,this.paceButton=n;const i={signal:this.events.signal},s=(...u)=>u.some(m=>this.held.has(m)),r=()=>{const u=Number(s("KeyD","ArrowRight"))-Number(s("KeyA","ArrowLeft")),m=Number(s("KeyS","ArrowDown"))-Number(s("KeyW","ArrowUp"));this.axes.set(u+this.joystick.x,m+this.joystick.y),this.axes.lengthSq()>1&&this.axes.normalize(),a.invalidate()};t.addEventListener("keydown",u=>{u.altKey||u.ctrlKey||u.metaKey||u.isComposing||!a.active()||(fi.has(u.code)||di.has(u.code)?(u.preventDefault(),this.held.add(u.code),r()):!u.repeat&&u.code==="KeyE"?(u.preventDefault(),a.inspect()):!u.repeat&&u.code==="KeyR"&&(u.preventDefault(),a.reset()))},i),window.addEventListener("keyup",u=>{this.held.delete(u.code)&&r()},i),t.addEventListener("blur",()=>{this.held.clear(),r()},i),window.addEventListener("blur",()=>this.clear(),i),n.addEventListener("pointerdown",u=>{u.button!==0||this.pacePointer!==null||!a.active()||(u.preventDefault(),this.pacePointer=u.pointerId,n.setPointerCapture(u.pointerId),n.setAttribute("data-held",""),a.invalidate())},i);const c=u=>{this.pacePointer===u.pointerId&&(this.pacePointer=null,n.removeAttribute("data-held"),a.invalidate())};n.addEventListener("pointerup",c,i),n.addEventListener("pointercancel",c,i),n.addEventListener("lostpointercapture",c,i);let h=null;t.addEventListener("pointerdown",u=>{u.button!==0||h||!a.active()||(h={id:u.pointerId,startX:u.clientX,startY:u.clientY,lastX:u.clientX,lastY:u.clientY,moving:!1},t.setPointerCapture(u.pointerId))},i),t.addEventListener("pointermove",u=>{if(a.active()){if(!h){u.pointerType==="mouse"&&a.hover(u.clientX,u.clientY);return}h.id===u.pointerId&&(!h.moving&&Math.hypot(h.startX-u.clientX,h.startY-u.clientY)<5||(h.moving=!0,a.look(u.clientX-h.lastX,u.clientY-h.lastY),h.lastX=u.clientX,h.lastY=u.clientY))}},i),t.addEventListener("pointerup",u=>{!h||h.id!==u.pointerId||(!h.moving&&a.active()&&a.pick(u.clientX,u.clientY),h=null)},i);const d=u=>{h?.id===u.pointerId&&(h=null)};t.addEventListener("pointercancel",d,i),t.addEventListener("lostpointercapture",d,i),t.addEventListener("pointerleave",()=>t.removeAttribute("data-inspectable"),i);const l=e.querySelector("span");let f=-1;const p=u=>{const m=e.getBoundingClientRect(),v=m.width*.32;this.joystick.set((u.clientX-m.left-m.width/2)/v,(u.clientY-m.top-m.height/2)/v),this.joystick.lengthSq()>1&&this.joystick.normalize(),l.style.transform=`translate(${this.joystick.x*v}px, ${this.joystick.y*v}px)`,r()};e.addEventListener("pointerdown",u=>{f!==-1||!a.active()||(u.preventDefault(),f=u.pointerId,e.setPointerCapture(f),p(u))},i),e.addEventListener("pointermove",u=>{u.pointerId===f&&a.active()&&p(u)},i);const g=u=>{f===u.pointerId&&(f=-1,this.joystick.set(0,0),l.style.removeProperty("transform"),r())};e.addEventListener("pointerup",g,i),e.addEventListener("pointercancel",g,i),e.addEventListener("lostpointercapture",g,i)}axes=new V;held=new Set;joystick=new V;events=new AbortController;pacePointer=null;get walkHeld(){return this.pacePointer!==null||this.held.has("ShiftLeft")||this.held.has("ShiftRight")}clear(){this.held.clear(),this.joystick.set(0,0),this.axes.set(0,0),this.stick.querySelector("span").style.removeProperty("transform");const t=this.pacePointer;this.pacePointer=null,this.paceButton.removeAttribute("data-held"),t!==null&&this.paceButton.hasPointerCapture(t)&&this.paceButton.releasePointerCapture(t)}dispose(){this.events.abort()}}function ui(o){const t=new Set,e=new Set,n=new Set;o.traverse(a=>{if("geometry"in a&&a.geometry instanceof ct&&t.add(a.geometry),a instanceof I&&"instanceMatrix"in a&&"dispose"in a&&typeof a.dispose=="function"&&a.dispose(),!("material"in a))return;const i=Array.isArray(a.material)?a.material:[a.material];for(const s of i)if(s instanceof gs){e.add(s);for(const r of Object.values(s))r instanceof so&&n.add(r);if(s instanceof J)for(const r of Object.values(s.uniforms))r.value instanceof so&&n.add(r.value)}});for(const a of n)a.dispose();for(const a of t)a.dispose();for(const a of e)a.dispose();o.clear()}const Ke=3.5,pi=Ke*1.6,ht=.9,mi=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];function gi(o,t,e,n){if(o.clearPath(t,e,...n))return[n];const a=(l,f)=>{const p=Math.round(l/ht),g=Math.round(f/ht);let u=null,m=1/0;for(let v=-2;v<=2;v++)for(let w=-2;w<=2;w++){const y=p+v,_=g+w,A=y*ht,T=_*ht,M=Math.hypot(A-l,T-f);M<m&&o.canStand(A,T,.025)&&o.clearPath(l,f,A,T)&&(u=[y,_],m=M)}return u},i=a(t,e),s=a(...n);if(!i||!s)return[];const r=(l,f)=>Math.hypot(s[0]-l,s[1]-f),c={x:i[0],z:i[1],cost:0,estimate:r(...i),last:null,checked:!1},h=[c],d=new Map([[i.join(","),c]]);for(;h.length;){let l=0;for(let p=1;p<h.length;p++)h[p].estimate<h[l].estimate&&(l=p);const f=h.splice(l,1)[0];if(f.x===s[0]&&f.z===s[1]){const p=[n];for(let m=f;m;m=m.last)p.push([m.x*ht,m.z*ht]);p.reverse();const g=[];let u=[t,e];for(let m=0;m<p.length;m++){for(;m+1<p.length&&o.clearPath(...u,...p[m+1]);)m++;u=p[m],g.push(u)}return g}f.checked=!0;for(const[p,g]of mi){const u=f.x+p,m=f.z+g,v=`${u},${m}`,w=d.get(v),y=f.cost+Math.hypot(p,g);if(w&&(w.checked||y>=w.cost)||!o.clearPath(f.x*ht,f.z*ht,u*ht,m*ht))continue;const _=y+r(u,m);if(w)Object.assign(w,{cost:y,estimate:_,last:f});else{const A={x:u,z:m,cost:y,estimate:_,last:f,checked:!1};d.set(v,A),h.push(A)}}}return[]}class vi{constructor(t){this.land=t,this.reset()}position=new S;velocity=new V;heading=Math.PI;falling=!1;gravity=0;path=[];lastRange=1/0;obstruction=0;desired=new V;get walkingRoute(){return this.path.length>0}get moving(){return this.velocity.lengthSq()>0}reset(){const[t,e]=zs;this.position.set(t,z(t,e),e),this.velocity.set(0,0),this.heading=Math.PI,this.falling=!1,this.gravity=0,this.cancel()}cancel(){this.path.length=0,this.lastRange=1/0,this.obstruction=0}guide(t){this.cancel();const{x:e,z:n}=this.position;return this.falling||(this.path=gi(this.land,e,n,t)),this.walkingRoute}update(t,e,n,a){if(e.lengthSq()>.001){this.cancel();const p=Math.cos(n),g=Math.sin(n);this.desired.set(e.x*p+e.y*g,-e.x*g+e.y*p)}else if(this.path.length){const[p,g]=this.path[0];this.desired.set(p-this.position.x,g-this.position.z);const u=this.desired.length();u<.32?(this.path.shift(),this.lastRange=1/0,this.obstruction=0):(this.obstruction=u+.005<this.lastRange?0:this.obstruction+t,this.lastRange=u,this.obstruction>1.35&&this.cancel()),this.desired.multiplyScalar(1/Math.max(1,u)),this.path.length||this.desired.set(0,0)}else this.desired.set(0,0);const i=this.walkingRoute||a?Ke:pi;if(this.desired.multiplyScalar(i),this.falling)return this.gravity-=14.3*t,this.position.y+=this.gravity*t,this.position.x+=this.velocity.x*t,this.position.z+=this.velocity.y*t,this.position.y<-7.7?(this.reset(),!0):!1;const s=this.desired.lengthSq()>.04?12.4:15.1;this.velocity.lerp(this.desired,1-Math.exp(-s*t)),this.velocity.lengthSq()<.001&&this.velocity.set(0,0);const r=this.position.x,c=this.position.z,h=r+this.velocity.x*t,d=c+this.velocity.y*t;this.canMove(h,d)?(this.position.x=h,this.position.z=d):(this.canMove(h,c)&&(this.position.x=h),this.canMove(this.position.x,d)&&(this.position.z=d));const l=this.position.x-r,f=this.position.z-c;if(Math.abs(l)+Math.abs(f)>4e-4){const p=Math.atan2(l,f),g=Math.atan2(Math.sin(p-this.heading),Math.cos(p-this.heading));this.heading+=g*(1-Math.exp(-t*14))}else this.desired.lengthSq()>.04&&this.velocity.multiplyScalar(.55);return gt(this.position.x,this.position.z)>1.003?(this.falling=!0,this.cancel()):this.position.y=z(this.position.x,this.position.z),!1}canMove(t,e){const n=z(t,e);return n>st-.19&&n-this.position.y<.27&&!this.land.solid(t,e,zo,n+.04,n+1.57)}}const Vo=1.22;function wo(o){ke.common.includes("NIGHT_ACES")||(ke.common+=`
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
    `,ke.tonemapping_fragment=`
      #if defined( TONE_MAPPING )
        gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
      #elif defined( NIGHT_ACES )
        gl_FragColor.rgb = nightAces( gl_FragColor.rgb );
      #endif
    `);const t=new Set;o.traverse(e=>{if(e instanceof I||e instanceof Oe||e instanceof Pe)for(const n of Array.isArray(e.material)?e.material:[e.material])t.has(n)||!n.toneMapped||n.defines?.NIGHT_ACES||(t.add(n),n.defines={...n.defines,NIGHT_ACES:Vo.toFixed(3)},n.needsUpdate=!0)})}function wi(o){const t=new Cs,e={antialias:!t.light,alpha:!1,powerPreference:"default",stencil:!1},n=o.canvas.getContext("webgl2",e);if(!n)return null;const a=new vs({canvas:o.canvas,context:n,...e});a.toneMapping=xo,a.toneMappingExposure=Vo,a.shadowMap.enabled=!0,a.shadowMap.type=ws,a.shadowMap.autoUpdate=!1,a.shadowMap.needsUpdate=!0;const i=new xs;i.fog=new ys("#0b0e28",.0046);const s=new G;i.add(s),i.add(new bs("#94a6ff","#43305a",1.55));const r=new Ae("#c7d4ff",2.05);r.position.set(-24,33,24),r.castShadow=!0,r.shadow.mapSize.setScalar(t.light?1024:2048),Object.assign(r.shadow.camera,{near:2,far:96,left:-32,right:32,top:31,bottom:-31}),r.shadow.camera.updateProjectionMatrix(),r.shadow.normalBias=.049,r.shadow.bias=-21e-5,r.shadow.radius=3,r.shadow.intensity=.79,i.add(r);const c=new Ae("#d58cff",1.35);c.position.set(12,14,-35),i.add(c);const h=new Ae("#5ce6d6",.55);h.position.set(-34,8,-12),i.add(h);const d=new Qs,l={value:0},f=Fn(Ke,nt);i.add(f.root,f.dust),Xs(s,l,t.light),_n(s);let p=!1;const g=hn(s,d,l,()=>{p&&wo(i),a.shadowMap.needsUpdate=!0,nt()}),u=vn(s,d,nt);mn(s,!t.light,l,d),li(s,d,l,t.light),js(s);const m=new vi(d),v=new ci(d);let w=null;t.light||(w=new Bs(a,new Yt(1,1,{type:Kt,samples:4})),w.addPass(new Fs(i,v.camera)),w.addPass(new Lt(new V(1,1),.6,.4,.94)),w.addPass(new Is),a.toneMapping=Ms,wo(i),p=!0);const y=Object.values(mt).map(R=>{const[O,D]=R.landmark,q=z(O,D),[it,W,K]=R.hit;return{...R,point:new S(O+(R.id==="hanzizap"?2.1:0),q+R.signHeight,D),box:new So(new S(O-it/2,q-.5,D-K/2),new S(O+it/2,q+W,D+K/2))}}),_=[...y,...u],A=new S,T=new S,M=new S,P=new Ss,k=new V,L=new AbortController,Y={signal:L.signal};let et="overview",H=null,N=null,pt=!1,vt=!1,re=!1,Nt=!0,le=!1,_t=!0,Ot=0,Wt=0,wt=1,xt=1,Vt=0;const Ce=()=>!pt&&!vt&&!re;function nt(){Ce()&&!document.hidden&&Ot===0&&(Ot=requestAnimationFrame(Xo))}function At(R,O){et!==R&&(et=R,Vt=.72,o.mode(et),et==="overview"&&(qt(),m.velocity.set(0,0),ft.clear())),O&&o.canvas.focus({preventScroll:!0}),nt()}function qt(){m.cancel(),N&&(N=null,o.walking(null))}function Ze(){qt(),m.reset(),v.recenter(),_t=!0,o.status("Back at arrival."),At("walk",!0)}function Je(R,O){const D=o.canvas.getBoundingClientRect();k.set((R-D.left)/D.width*2-1,1-(O-D.top)/D.height*2),P.setFromCamera(k,v.camera);let q=1/0,it=null;for(const W of _){if(!P.ray.intersectBox(W.box,T))continue;const K=T.distanceTo(P.ray.origin);K<q&&(q=K,it=W.id)}if(!it)return null;for(let W=1;W<q;W+=.9)if(P.ray.at(W,M),gt(M.x,M.z)<.985&&M.y+.2<z(M.x,M.z))return null;return it}const ft=new hi(o.canvas,o.stick,o.paceButton,{active:Ce,invalidate:nt,reset:Ze,hover:(R,O)=>o.canvas.toggleAttribute("data-inspectable",Je(R,O)!==null),pick:(R,O)=>{const D=Je(R,O);D&&o.inspect(D)},look:(R,O)=>{At("walk",!0),v.turn(R,O),nt()},inspect:()=>{H&&o.inspect(H)}});function _e(){const R=o.viewport.getBoundingClientRect();wt=Math.max(1,R.width),xt=Math.max(1,R.height),a.setPixelRatio(t.pixels(wt,xt)),a.setSize(wt,xt,!1),w&&(w.setPixelRatio(a.getPixelRatio()),w.setSize(wt,xt)),v.resize(wt,xt),_t=!0,nt()}function qo(){const R=et==="overview",O=wt/xt<.76,D=Vt>.4;let q=null,it=3.04;for(const W of y){const K=Math.hypot(m.position.x-W.approach[0],m.position.z-W.approach[1]);!R&&!m.falling&&K<it&&(it=K,q=W.id),A.copy(W.point).project(v.camera);const kt=(A.x+1)*.5*wt,Xt=(1-A.y)*.5*xt,Qo=A.z>-1&&A.z<1&&kt>49&&kt<wt-49&&Xt>(O?82:105)&&Xt<xt-95,$o=R?W.id!=="observatory"&&W.id!=="workshop":!D&&K<29&&K>3.9;o.sign(W.id,Qo&&$o?{x:kt,y:Xt}:null)}H!==q&&(H=q,o.nearby(q))}function ce(){cancelAnimationFrame(Ot),Ot=0,Wt=0}function Xo(R){if(Ot=0,!Ce()||document.hidden)return;const O=Wt?Math.max(0,(R-Wt)/1e3):0,D=Math.min(O||1/60,.065),q=Le.matches;if(Wt=R,Vt=Math.max(0,Vt-D),ft.axes.lengthSq()>.001&&At("walk",!1),et==="walk"){const it=D>.033?2:1;let W=!1;for(let K=0;K<it;K++)if(m.update(D/it,ft.axes,v.yaw,ft.walkHeld)){W=!0;break}if(W&&(v.recenter(),_t=!0,o.status("You returned to arrival.")),N&&!m.walkingRoute){const K=mt[N].name,kt=mt[N].approach,Xt=Math.hypot(m.position.x-kt[0],m.position.z-kt[1])<.85;o.status(Xt?`Arrived at ${K}.`:"Assisted walk ended."),N=null,o.walking(null)}}q||(l.value+=D),!le&&f.ready&&(le=!0,!q&&et==="overview"&&!pt&&v.arrive()),g(),v.update(D,m.position,et==="walk",l.value,q,_t),f.update(m.position,m.heading,D,v.camera,ft.walkHeld||!!N,m.falling,_t),_t=!1,w?w.render(D):a.render(i,v.camera),Nt&&f.ready&&(Nt=!1,o.ready(!0)),qo(),!q&&t.measure(O)&&(t.plain&&w&&(w.dispose(),w=null),_e()),!q||m.falling||m.walkingRoute||m.moving||ft.axes.lengthSq()>0||Vt>0?nt():Wt=0}const to=new ResizeObserver(_e);return to.observe(o.viewport),_e(),Le.addEventListener("change",nt,Y),document.addEventListener("visibilitychange",()=>{document.hidden?(ft.clear(),ce()):nt()},Y),o.canvas.addEventListener("webglcontextlost",R=>{R.preventDefault(),vt=!0,ce(),qt(),ft.clear(),o.ready(!1)},Y),o.canvas.addEventListener("webglcontextrestored",()=>{vt=!1,Nt=!0,a.shadowMap.needsUpdate=!0,nt()},Y),{play:()=>At("walk",!0),overview:()=>At("overview",!1),pause(R){pt=R,pt?(ft.clear(),ce()):nt()},walk(R){if(qt(),At("walk",!0),!m.guide(mt[R].approach)){o.status("Walk from arrival or select another destination.");return}N=R,o.walking(R),o.status(`Walking to ${mt[R].name}.`)},stopWalking:qt,reset:Ze,dispose(){re=!0,ce(),L.abort(),to.disconnect(),ft.dispose(),r.shadow.dispose(),w?.dispose(),ui(i),a.dispose()}}}const Mi=Object.freeze(Object.defineProperty({__proto__:null,createIsland:wi},Symbol.toStringTag,{value:"Module"}));export{ui as d,Mi as i,bi as t};
