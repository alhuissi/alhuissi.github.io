const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./pocketOrbitShuttle-CbPnwuU4.js","./three-jFD2GI6k.js","../app.js"])))=>i.map(i=>d[i]);
import{M as F,O as zo,B as ue,F as ee,S as te,U as ct,V,W as We,H as qe,N as Ao,T as ko,R as Ro,C as Eo,a as Bo,L as Io,b as Fo,c as Uo,A as no,d as Do,e as Go,f as Lo,g as q,h as C,i as Ke,j as oe,k as Ye,l as No,P as Ce,D as mt,m as io,n as Et,o as gt,p as ft,q as Ho,r as Oo,s as Wt,t as Vo,u as Se,v as vt,E as Bt,w as Wo,x as ao,G as $,y as It,z as he,I as qo,J as ro,K as it,Q as Ft,X as lo,Y as co,Z as Re,_ as ht,$ as Xo,a0 as jo,a1 as Qo,a2 as $o,a3 as Ko,a4 as qt,a5 as Yo,a6 as Zo,a7 as Jo,a8 as es,a9 as ts,aa as St,ab as os,ac as Tt,ad as ss}from"./three-jFD2GI6k.js";import{d as me,_ as ns,r as is,a as as}from"../app.js";const at={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ue{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const rs=new zo(-1,1,1,-1,0,1);class ls extends ue{constructor(){super(),this.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ee([0,2,0,0,2,0],2))}}const cs=new ls;class Ut{constructor(e){this._mesh=new F(cs,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,rs)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class fs extends Ue{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof te?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ct.clone(e.uniforms),this.material=new te({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ut(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Xt extends Ue{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const i=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let n,r;this.inverse?(n=0,r=1):(n=1,r=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),a.buffers.stencil.setFunc(i.ALWAYS,n,4294967295),a.buffers.stencil.setClear(r),a.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(i.EQUAL,1,4294967295),a.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),a.buffers.stencil.setLocked(!0)}}class hs extends Ue{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ds{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const s=e.getSize(new V);this._width=s.width,this._height=s.height,t=new We(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:qe}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new fs(at),this.copyPass.material.blending=Ao,this.timer=new ko}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let s=!1;for(let i=0,a=this.passes.length;i<a;i++){const n=this.passes[i];if(n.enabled!==!1){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),n.needsSwap){if(s){const r=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Xt!==void 0&&(n instanceof Xt?s=!0:n instanceof hs&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new V);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(s,i),this.renderTarget2.setSize(s,i);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(s,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const tt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class us extends Ue{constructor(){super(),this.isOutputPass=!0,this.uniforms=ct.clone(tt.uniforms),this.material=new Ro({name:tt.name,uniforms:this.uniforms,vertexShader:tt.vertexShader,fragmentShader:tt.fragmentShader}),this._fsQuad=new Ut(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Eo.getTransfer(this._outputColorSpace)===Bo&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Io?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Fo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Uo?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===no?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Do?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Go?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Lo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ps extends Ue{constructor(e,t,s=null,i=null,a=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=i,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new q}render(e,t,s){const i=e.autoClear;e.autoClear=!1;let a,n;this.overrideMaterial!==null&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(a=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=n),e.autoClear=i}}const ms={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new q(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ie extends Ue{constructor(e,t=1,s,i){super(),this.strength=t,this.radius=s,this.threshold=i,this.resolution=e!==void 0?new V(e.x,e.y):new V(256,256),this.clearColor=new q(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new We(a,n,{type:qe,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const c=new We(a,n,{type:qe,depthBuffer:!1});c.texture.name="UnrealBloomPass.h"+f,c.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(c);const u=new We(a,n,{type:qe,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+f,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),a=Math.round(a/2),n=Math.round(n/2)}const r=ms;this.highPassUniforms=ct.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new te({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];a=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new V(1/a,1/n),a=Math.round(a/2),n=Math.round(n/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ct.clone(at.uniforms),this.blendMaterial=new te({uniforms:this.copyUniforms,vertexShader:at.vertexShader,fragmentShader:at.fragmentShader,premultipliedAlpha:!0,blending:Ke,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new q,this._oldClearAlpha=1,this._basic=new oe,this._fsQuad=new Ut(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let s=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(s,i);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(s,i),this.renderTargetsVertical[a].setSize(s,i),this.separableBlurMaterials[a].uniforms.invSize.value=new V(1/s,1/i),s=Math.round(s/2),i=Math.round(i/2)}render(e,t,s,i,a){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const n=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=s.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let r=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ie.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ie.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),r=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(s),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=n}_getSeparableBlurMaterial(e){const t=[],s=e/3;for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(s*s))/s);const i=[],a=[];for(let n=1;n<e;n+=2){const r=t[n],l=n+1<e?t[n+1]:0,h=r+l;i.push((n*r+(n+1)*l)/h),a.push(h)}return new te({defines:{KERNEL_PAIRS:i.length},uniforms:{colorTexture:{value:null},invSize:{value:new V(.5,.5)},direction:{value:new V(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:i},gaussianWeights:{value:a}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new te({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Ie.BlurDirectionX=new V(1,0);Ie.BlurDirectionY=new V(0,1);const dt=[26,20],fo=-15.4,re=-.45,de=[-16.4,7.85],ho=2.41,uo=.32;function pe(o){return()=>(o=Math.imul(1664525,o)+1013904223|0,(o>>>0)/4294967296)}function po(o){return 1+.074*Math.sin(o*3+.7)+.086*Math.cos(o*5-.58)+.031*Math.sin(o*11+.52)+.018*Math.cos(o*19)}function Te(o,e=1){const t=po(o)*e;return[Math.cos(o)*dt[0]*t,Math.sin(o)*dt[1]*t]}function xe(o,e){const t=o/dt[0],s=e/dt[1];return Math.hypot(t,s)/po(Math.atan2(s,t))}function Ve(o,e,t,s,i){return Math.exp(-(((o-t[0])/s)**2+((e-t[1])/i)**2))}const ut=Te(ho),ke=[ut[0]-de[0],ut[1]-de[1]];function gs(o,e){const t=Math.max(0,Math.min(1.1,((o-de[0])*ke[0]+(e-de[1])*ke[1])/(ke[0]**2+ke[1]**2))),s=de[0]+ke[0]*t,i=de[1]+ke[1]*t;return Math.exp(-((o-s)**2+(e-i)**2)/1.16)}function T(o,e){const t=Ve(o,e,me.observatory.landmark,7.1,5.8)*3.7,s=Ve(o,e,me["pocket-orbit"].landmark,5.3,5.9)*1.75,i=Ve(o,e,[-19.1,-5.7],7.4,5.5)*1.15,a=Ve(o,e,[15.6,10],6.8,5.5)*.61,n=Ve(o,e,de,3.9,3.3)*1.9+gs(o,e)*.92;return .42+Math.sin(o*.19+e*.24)*.29+Math.cos(e*.31-o*.12)*.32+Math.sin(o*.36+e*.18)*.15+t+s+i+a-n}const Ze=`
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
`,mo=`
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
`,vs=`
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
`,ws=`
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${Ze}
  ${mo}
  ${vs}

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
`,xs=`
  #include <common>
  uniform float clock;
  uniform float isPool;
  varying vec3 worldPoint;
  ${Ze}
  ${mo}

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
`,ys=`
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
`;function jt(o,e,t,s,i,a,n){const r=new F(new Ce(e,t),n);return r.rotation.x=-Math.PI/2,r.position.set(s,i,a),o.add(r),r}function bs(o,e){const t=[],s=[],i=[],n=(l,h)=>{const f=ut[0]-2.2+l*.21,c=de[1]-4.8+h*.21;return xe(f,c)<=1.002&&T(f,c)<re+.43};for(let l=0;l<=70;l++)for(let h=0;h<=70;h++){if(t.push(ut[0]-2.2+h*.21,re,de[1]-4.8+l*.21),s.push(h/70,l/70),!l||!h||!n(h,l)||!n(h-1,l-1))continue;const f=l*71+h,c=f-70-2;n(h-1,l)&&i.push(c,f-1,f),n(h,l-1)&&i.push(c,f,f-70-1)}const r=new ue;r.setAttribute("position",new ee(t,3)),r.setAttribute("uv",new ee(s,2)),r.setIndex(i),o.add(new F(r,e))}function Ms(o,e){const i=[],a=[],n=[];for(let h=0;h<=26;h++){const f=h/26;for(let c=0;c<=15;c++){const u=c/15,p=ho+(u-.5)*(.109+.07*f),[m,d]=Te(p,1.003+Math.sin(f*2.1)*.057),g=Math.max(re+.06,T(m,d)+.02);if(i.push(m-f*.19,g+(fo-g)*f,d+Math.sin(f*2.5)*.71),a.push(u,f),h===0||c===0)continue;const w=h*16+c,x=w-15-1;n.push(x-1,x,w,x-1,w,w-1)}}const r=new ue;r.setAttribute("position",new ee(i,3)),r.setAttribute("uv",new ee(a,2)),r.setIndex(n);const l=new te({uniforms:{clock:e},transparent:!0,depthWrite:!1,side:mt,toneMapped:!1,vertexShader:rt,fragmentShader:`
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
    `});o.add(new F(r,l))}function Ss(o,e){const t={value:0},s=new Et().load("./island-media/dream-ocean-reflections.webp",()=>{t.value=1,e()});return s.colorSpace=gt,s.magFilter=ft,s.minFilter=ft,s.generateMipmaps=!1,new te({uniforms:{clock:o,heroes:{value:s},reflectionReady:t},toneMapped:!1,side:mt,vertexShader:`
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
    `})}function Ts(o,e,t){const s=pe(6067),i=[],a=[],n=[];for(let h=0;h<t;h++){const f=(s()-.5)*48,c=(s()-.5)*34;i.push(f,T(f,c)+s()*5+.35,c),a.push(s()*6.283),n.push(s())}const r=new ue;r.setAttribute("position",new ee(i,3)),r.setAttribute("phase",new ee(a,1)),r.setAttribute("hue",new ee(n,1));const l=new te({uniforms:{clock:e},transparent:!0,depthWrite:!1,toneMapped:!1,blending:Ke,vertexShader:`
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
    `});o.add(new io(r,l))}function Ps(o,e,t){const s=new F(new Ye(510,32,20),new te({uniforms:{clock:e},vertexShader:rt,fragmentShader:ws,side:No,depthWrite:!1,fog:!1}));s.renderOrder=-10,s.frustumCulled=!1,o.add(s);const i=a=>new te({uniforms:{clock:e,isPool:{value:a}},vertexShader:rt,fragmentShader:xs});jt(o,900,900,0,fo,0,i(0)),bs(o,i(1)),jt(o,830,830,0,-13.2,0,new te({uniforms:{clock:e},vertexShader:rt,fragmentShader:ys,transparent:!0,depthWrite:!1})),Ms(o,e),Ts(o,e,t?90:240)}class Cs{obstacles=[];add(e,t,s,i,a,n,r=0){this.obstacles.push({x:e,z:t,halfWidth:s/2,halfDepth:i/2,bottom:a,top:a+n,cosine:Math.cos(r),sine:Math.sin(r)})}solid(e,t,s,i,a){return this.obstacles.some(n=>{if(i>=n.top||a<=n.bottom)return!1;const r=e-n.x,l=t-n.z,h=Math.abs(r*n.cosine-l*n.sine)-n.halfWidth,f=Math.abs(r*n.sine+l*n.cosine)-n.halfDepth,c=Math.max(h,0),u=Math.max(f,0);return c*c+u*u<s*s})}canStand(e,t,s=0){const i=T(e,t);return xe(e,t)<.994-s&&i>re-.18&&!this.solid(e,t,uo,i+.06,i+1.52)}clearPath(e,t,s,i){const a=Math.max(1,Math.ceil(Math.hypot(s-e,i-t)/.28));let n=T(e,t);for(let r=1;r<=a;r++){const l=e+(s-e)*r/a,h=t+(i-t)*r/a,f=T(l,h);if(Math.abs(f-n)>.28||!this.canStand(l,h,.022))return!1;n=f}return!0}}function _s(o,e=!1){const t=o[0].index!==null,s=new Set(Object.keys(o[0].attributes)),i=new Set(Object.keys(o[0].morphAttributes)),a={},n={},r=o[0].morphTargetsRelative,l=new ue;l.morphTargetsRelative=r;let h=0;for(let f=0;f<o.length;++f){const c=o[f];let u=0,p=0;if(t!==(c.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in c.attributes){if(!s.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;a[m]===void 0&&(a[m]=[]),a[m].push(c.attributes[m]),u++}if(u!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(r!==c.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in c.morphAttributes){if(!i.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;if(c.morphAttributes[m].length!==o[0].morphAttributes[m].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have the same number of morph targets for the "'+m+'" morph attribute.'),null;n[m]===void 0&&(n[m]=[]),n[m].push(c.morphAttributes[m]),p++}if(p!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of morph attributes."),null;if(e){let m;if(t)m=c.index.count;else if(c.attributes.position!==void 0)m=c.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,m,f),h+=m}}if(t){let f=0;const c=[];for(let u=0;u<o.length;++u){const p=o[u].index;for(let m=0;m<p.count;++m)c.push(p.getX(m)+f);f+=o[u].attributes.position.count}l.setIndex(c)}for(const f in a){const c=Qt(a[f]);if(!c)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;l.setAttribute(f,c)}for(const f in n){const c=n[f][0].length;if(c!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[f]=[];for(let u=0;u<c;++u){const p=[];for(let d=0;d<n[f].length;++d)p.push(n[f][d][u]);const m=Qt(p);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;l.morphAttributes[f].push(m)}}}return l}function Qt(o){let e,t,s,i=-1,a=0;for(let h=0;h<o.length;++h){const f=o[h];if(e===void 0&&(e=f.array.constructor),e!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=f.itemSize),t!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(s===void 0&&(s=f.normalized),s!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=f.gpuType),i!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;a+=f.count*t}const n=new e(a),r=new Ho(n,t,s);let l=0;for(let h=0;h<o.length;++h){const f=o[h];if(f.isInterleavedBufferAttribute){const c=l/t;for(let u=0,p=f.count;u<p;u++)for(let m=0;m<t;m++){const d=f.getComponent(u,m);r.setComponent(u+c,m,d)}}else n.set(f.array,l);l+=f.count*t}return i!==void 0&&(r.gpuType=i),r}function Nn(o,e){if(e===Oo)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(e===Wt||e===Vo){let t=o.getIndex();if(t===null){const a=[],n=o.getAttribute("position");if(n!==void 0){for(let r=0;r<n.count;r++)a.push(r);o.setIndex(a),t=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}const s=t.count-2,i=[];if(e===Wt)for(let a=1;a<=s;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<s;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));return i.length/3!==s&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),o.setIndex(i),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),o}const _=(o,e=.83,t=0)=>new Se({color:o,roughness:e,metalness:t});function K(o,e=.75){return new Se({color:o,emissive:o,emissiveIntensity:e,roughness:.52})}function E(o,e,t,s=0,i=0,a=0){const n=new F(e,t);return n.position.set(s,i,a),n.castShadow=!0,n.receiveShadow=!0,n.userData.bake=!0,o.add(n),n}function v(o,e,t,s,i,a,n,r){return E(o,new Wo(t,s,i),e,a,n,r)}function y(o,e,t,s,i,a,n,r,l=10){return E(o,new ao(t,s,i,l),e,a,n,r)}function O(o,e,t,s,i=0,a=0,n=0,r=0){const l=new vt;t.forEach(([f,c],u)=>u?l.lineTo(f,c):l.moveTo(f,c)),l.closePath();const h=new Bt(l,{depth:s,bevelEnabled:r>0,bevelSize:r,bevelThickness:r,bevelSegments:1,steps:1});return E(o,h,e,i,a,n-s/2)}const Dt=o=>new ee(o.flatMap(e=>[e.r,e.g,e.b]),3);function zs(o){o.updateMatrixWorld(!0);const e=new Map;o.traverse(t=>{if(!(t instanceof F)||!t.userData.bake||Array.isArray(t.material))return;const s=t.material,i=s.uuid;e.has(i)||e.set(i,{material:s,sources:[],geometries:[]});const a=e.get(i),n=t.geometry.index?t.geometry.toNonIndexed():t.geometry.clone();n.applyMatrix4(t.matrixWorld),a.sources.push(t),a.geometries.push(n)});for(const{material:t,sources:s,geometries:i}of e.values()){const a=_s(i);for(const r of i)r.dispose();if(!a)continue;for(const r of s)r.geometry.dispose(),r.removeFromParent();const n=new F(a,t);n.castShadow=!0,n.receiveShadow=!0,o.add(n)}}const G=_("#25384b",.64,.22),B=_("#49586c",.56,.24),pt=_("#557c88",.54,.15),ae=_("#131c2b",.79),W=_("#b47b57",.54,.26),J=new oe({color:"#6aefeb",toneMapped:!1}),Fe=K(16756065,2.2),Gt=new oe({color:"#f589bc",toneMapped:!1}),go="#13cbb7",ce=(o,e)=>[(o-497)/436,(502-e)/436],vo=new vt().moveTo(...ce(487,114)).quadraticCurveTo(...ce(498,105),...ce(510,114)).lineTo(...ce(715,293)).lineTo(...ce(715,724)).lineTo(...ce(510,890)).quadraticCurveTo(...ce(498,900),...ce(486,890)).lineTo(...ce(279,724)).lineTo(...ce(279,293)).closePath(),ye=0,be=0;function As(){const o=document.createElement("canvas");o.width=512,o.height=112;const e=o.getContext("2d");e.fillStyle="#1c2735",e.fillRect(0,0,512,112),e.fillStyle=go,e.save(),e.translate(48,56),e.scale(43,-43),e.beginPath(),vo.getPoints(6).forEach(({x:s,y:i},a)=>a?e.lineTo(s,i):e.moveTo(s,i)),e.closePath(),e.fill(),e.restore(),e.fillStyle="#ebeeef",e.font="750 48px system-ui, sans-serif",e.textBaseline="middle",e.fillText("ALHUISSI",83,54),e.fillStyle="#f4b674";for(let s=0;s<3;s++)e.fillRect(457+s*13,49,5,14);const t=new It(o);return t.colorSpace=gt,new oe({map:t,toneMapped:!1})}function ks(o){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),s=t.createRadialGradient(64,64,0,64,64,63);s.addColorStop(0,"rgba(255,255,255,.8)"),s.addColorStop(.4,"rgba(255,255,255,.32)"),s.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=s,t.fillRect(0,0,128,128);const i=new It(e),a=(l,h,f,c)=>new F(new Ce(h,f),new oe({map:i,color:l,opacity:c,transparent:!0,blending:Ke,depthWrite:!1,toneMapped:!1})),n=a(4708838,3.6,1.8,.55);n.rotation.x=-Math.PI/2,n.position.set(.53,.217,2.83);const r=a(16357197,4.2,1.6,.5);r.rotation.x=-Math.PI/2,r.position.set(-2.04,.205,2.72),o.add(n,r)}function Rs(o,e){const t=new $;t.position.set(ye,5.15,be),t.rotation.set(-.14,.27,-.17),o.add(t),y(o,G,.99,1.3,.37,ye,3.5,be,8),y(o,W,.95,.99,.105,ye,3.72,be,8),y(o,ae,.73,.95,.31,ye,3.89,be,10);for(const n of[-1,1]){const r=[[0,0],[n*.49,.03],[n*.55,.82],[n*.88,1.46],[n*.57,1.59],[n*.09,1.04]];O(o,B,r,.47,ye+n*.85,3.57,be,.045),O(o,W,r,.071,ye+n*.85,3.57,be+.27,.014)}E(t,new he(1.57,.147,8,64),G),E(t,new he(1.64,.051,5,54),B,0,0,-.15),E(t,new he(1.43,.044,6,56),W,0,0,.073);for(let n=0;n<8;n++){const r=n*Math.PI/4;E(t,new he(1.57,.041,5,9,.66),n===5?Fe:J,0,0,.144).rotation.z=r+.065;const l=v(t,B,.255,.28,.33,Math.cos(r)*1.58,Math.sin(r)*1.58,.047);l.rotation.z=r;const h=v(t,W,.155,.072,.04,l.position.x,l.position.y,.23);h.rotation.z=r}const s=new $;s.rotation.set(.69,-.69,.36),t.add(s),E(s,new he(1.2,.069,6,48),B);for(const n of[.18,Math.PI+.18])E(s,new he(1.2,.033,5,20,2.2),Gt,0,0,.053).rotation.z=n;for(const n of s.children)n.userData.bake=!1,n.castShadow=!1;const i=new Bt(vo,{depth:.12,bevelEnabled:!1,curveSegments:8});i.translate(0,0,-.06);const a=new F(i,new oe({color:go,toneMapped:!1,fog:!1}));return a.position.set(ye,5.15,be),o.add(a),()=>{s.rotation.x=.69+.26*Math.sin(e.value*.73),s.rotation.y=-.69+.53*Math.sin(e.value*.51),s.rotation.z=.36-e.value*.22,a.rotation.y=.21*Math.sin(e.value*.55)}}function Es(o){const e=new oe({color:"#ffca92",toneMapped:!1}),t=K(10510658,.9);v(o,t,3.41,1.79,.095,-2.16,1.66,1.16),v(o,ae,3.4,.13,.94,-2.16,2.62,1.7),v(o,W,3.4,.13,.9,-2.16,.84,1.67),v(o,G,2.91,.144,.62,-2.14,1.24,1.63),v(o,Fe,2.89,.051,.045,-2.14,1.17,1.94);for(const i of[-3.27,-2.47,-1.5]){v(o,ae,.59,.44,.13,i,1.68,1.32),v(o,i===-2.47?J:e,.51,.35,.027,i,1.69,1.397),v(o,G,.066,.19,.1,i,1.4,1.42);for(let a=0;a<8;a++){const n=.035+.11*Math.abs(Math.sin(a*.82+i));v(o,ae,.017,n,.009,i-.177+a*.05,1.7,1.417)}}v(o,ae,.9,.143,.31,-2.72,1.366,1.79);for(let i=0;i<12;i++)v(o,i%3===2?B:e,.054,.022,.15,-3.073+i*.065,1.45,1.826);for(const[i,a]of[-1.87,-1.73,-1.59,-1.45,-1.31].entries())y(o,G,.036,.042,.048,a,1.38,1.74,8),v(o,i%2===0?J:Fe,.048,.019,.031,a,1.36,1.83);const s=new F(new Ce(3.47,1.78),new oe({color:"#7dc6d4",transparent:!0,opacity:.13,depthWrite:!1,side:mt}));s.position.set(-2.16,1.68,2.24),o.add(s);for(const i of[-3.91,-2.63,-1.55,-.5])v(o,B,.1,1.81,.18,i,1.67,2.23);for(const i of[.82,2.58])v(o,G,3.58,.15,.27,-2.16,i,2.22);O(o,B,[[-3.99,2.44],[-.46,2.44],[-.68,2.72],[-3.59,2.83]],.58,0,0,2.19,.034),v(o,W,2.88,.049,.058,-2.08,2.59,2.52).rotation.z=-.029}function Bs(o){const e=[[-1.1,.48],[.91,.48],[1.19,.75],[1.19,2.1],[.86,2.46],[-.84,2.46],[-1.1,2.18]];O(o,B,e,.45,2.77,0,2.24,.055),O(o,ae,e,.06,2.77,.14,2.494).scale.set(.91,.91,1),v(o,pt,1.97,.19,.35,2.78,.71,2.57),v(o,G,1.94,.31,.35,2.76,2.21,2.57);for(const[t,s]of[2.1,2.7,3.3].entries()){y(o,t===1?Gt:J,.091,.091,1.32,s,1.45,2.64,12);for(const i of[.78,1.11,1.82,2.09])y(o,i===1.11||i===1.82?W:B,.15,.15,.096,s,i,2.64,10);v(o,t===1?Fe:J,.065,.036,.021,s,2.22,2.758)}v(o,W,.081,1.08,.16,3.68,1.49,2.56);for(let t=0;t<5;t++)v(o,B,.13,.041,.16,3.64,.96+t*.21,2.62)}function Is(o,e){const t=new $,s=new C(-5.15,0,-.05),i=o.localToWorld(s.clone()),a=T(i.x,i.z)-o.position.y;t.position.set(s.x,Math.min(0,a),s.z),o.add(t);const n=K(16758903,1.6),r=8.1,l=r-.66,h=.66+l/2;y(t,ae,1.25,1.38,.5,0,.05,0,8),y(t,G,1.06,1.18,.4,0,.48,0,8),y(t,G,.7,.9,l,0,h,0,8),y(t,pt,.94,.94,.1,0,.7,0,8),O(t,B,[[-.3,0],[.3,0],[.3,.9],[0,1.12],[-.3,.9]],.12,0,.72,.9,.02),O(t,n,[[-.22,0],[.22,0],[.22,.82],[0,.99],[-.22,.82]],.04,0,.74,.97);const f=g=>.9-(g-.66)/l*.2;for(const g of[1.95,3.25,4.55,5.85,7.15]){const w=f(g);y(t,n,w+.012,w+.016,.34,0,g,0,8),y(t,W,w+.05,w+.05,.05,0,g+.2,0,8),y(t,W,w+.05,w+.05,.05,0,g-.2,0,8)}const c=Math.atan(.2/l);for(let g=0;g<8;g++){const w=(g+.5)*Math.PI/4,x=f(h)-.02,P=v(t,B,.08,l-.1,.11,Math.sin(w)*x,h,Math.cos(w)*x);P.rotation.y=w,P.rotation.x=-c*Math.cos(w),P.rotation.z=c*Math.sin(w)}for(const g of[-.39,.39]){const w=f(h)-.03,x=v(t,J,.03,l-.5,.03,Math.sin(g)*w,h,Math.cos(g)*w);x.rotation.y=g,x.rotation.x=-c*Math.cos(g),x.rotation.z=c*Math.sin(g)}const u=-4-(s.x+.74)+.12,p=.74+u/2;v(t,G,u,.62,.9,p,2.43-t.position.y,0),v(t,n,u-.1,.26,.92,p,2.46-t.position.y,0),v(t,W,u,.05,.96,p,2.76-t.position.y,0),v(t,J,u,.025,.03,p,2.14-t.position.y,.47),y(t,B,1.45,.72,.5,0,r+.25,0,8),y(t,W,1.5,1.5,.1,0,r+.55,0,16),y(t,J,1.52,1.52,.03,0,r+.47,0,24);const m=E(t,new he(1.46,.03,5,40),W,0,r+.95,0);m.rotation.x=Math.PI/2;for(let g=0;g<16;g++){const w=g*Math.PI/8;y(t,B,.02,.02,.38,Math.sin(w)*1.46,r+.77,Math.cos(w)*1.46,5)}const d=new $;return d.position.set(0,r+.6-3.31,0),t.add(d),e.add(i.x,i.z,2.1,2.1,T(i.x,i.z)-.4,13,o.rotation.y),d}function Fs(o){const e=_("#1f3b6b",.25,.55);for(let t=0;t<2;t++)for(let s=0;s<3;s++){const i=1.6+s*.76,a=-1.55+t*.95;y(o,B,.03,.03,.26,i,3.44,a,5);const n=v(o,e,.7,.04,.62,i,3.6,a);n.rotation.x=-.42;const r=v(o,W,.72,.02,.025,i,3.6+Math.sin(.42)*.31,a-Math.cos(.42)*.31);r.rotation.x=-.42}v(o,G,.7,.12,.7,2.6,3.37,.55),v(o,K(6543078,1.2),.5,.03,.5,2.6,3.44,.55)}function Us(o){const e=new oe({color:"#7ff6f0",toneMapped:!1}),t=new oe({color:"#ffc58a",toneMapped:!1}),s=new oe({color:"#b48cff",toneMapped:!1}),i=K(6543078,.9);for(const r of[-1,1]){v(o,ae,.06,.82,1.5,r*4.02,1.5,1.45),v(o,t,.03,.66,1.32,r*4.055,1.5,1.45);for(const l of[-.33,.33])v(o,B,.05,.7,.05,r*4.07,1.5,1.45+l);v(o,B,.05,.05,1.36,r*4.07,1.5,1.45)}v(o,s,8.05,.035,.04,.035,3.09,2.79),v(o,e,4.3,.03,.04,-1.31,3.67,2.79);for(const r of[-1,1])v(o,s,.04,.035,5.2,r*4.13,3.09,-.05);for(let r=0;r<3;r++)v(o,G,.82,.08,.62,-1.25+r*.02,3.69,1.55-r*.78),v(o,i,.7,.04,.5,-1.25+r*.02,3.74,1.55-r*.78);const a=new $;a.position.set(-.35,3.74,-1.75),o.add(a),y(a,B,.05,.08,.55,0,.27,0,8),E(a,new Ye(.42,14,6,0,Math.PI*2,0,Math.PI/2.6),W,0,.72,0).rotation.set(Math.PI+.7,0,.35),y(a,e,.03,.03,.07,-.14,.95,.2,6),v(o,e,7.7,.025,.03,.09,.14,2.53);for(const r of[-1,1])v(o,e,.03,.025,4.9,r*3.98,.14,.02)}function Ds(o,e,t){const[s,i]=me.workshop.landmark,a=T(s,i),n=new $;n.position.set(s,a,i),n.rotation.y=-.095,o.add(n),v(n,ae,8.05,.46,5.26,.09,-.12,-.12),O(n,B,[[-3.94,0],[3.94,0],[3.94,.13],[3.74,.23],[-3.74,.23],[-3.94,.13]],5.2,.09,-.035,.1,.035),v(n,G,7.81,3,.41,.025,1.54,-2.43),v(n,G,.41,2.81,4.72,-3.81,1.51,-.17),v(n,G,.41,2.81,4.72,3.81,1.51,-.17),v(n,ae,7.58,2.9,.28,.03,1.51,.9),v(n,G,7.72,.65,.31,.02,.51,2.15);const r=[[-4.05,2.76],[4.12,2.76],[4.12,3.07],[3.77,3.31],[1.27,3.31],[.87,3.65],[-3.49,3.65],[-4.05,3.18]];O(n,G,r,5.4,0,0,-.05,.05),O(n,pt,r,.21,0,.015,2.61,.037),O(n,B,[[-1.16,2.79],[1.21,2.79],[1.04,3.05],[-.92,3.05]],1.11,.54,0,2.49,.025),v(n,W,4.63,.078,.1,-1.45,3.49,2.735),v(n,J,3.45,.058,.08,-2.02,2.89,2.762),v(n,J,1.77,.058,.08,2.81,2.89,2.762);for(const d of[-3.92,1.42,3.91])O(n,B,[[-.18,.12],[.18,.12],[.14,2.53],[-.05,2.81],[-.18,2.66]],.25,d,0,2.21,.023);Es(n);const l=[[-.9,0],[.9,0],[.9,1.84],[.58,2.18],[-.66,2.18],[-.9,1.94]];O(n,B,l,.23,.53,.18,2.2,.042),O(n,J,l,.033,.53,.224,2.33).scale.set(.916,.94,1),O(n,ae,l,.035,.53,.247,2.36).scale.set(.851,.91,1);for(const d of[-1,1])v(n,G,.64,1.57,.035,.53+d*.362,1.13,2.39),v(n,B,.04,.66,.046,.53+d*.124,1.01,2.399);v(n,J,.99,.07,.05,.53,1.58,2.424),v(n,Fe,.14,.088,.056,1.68,1.2,2.33),v(n,B,2.55,.13,.79,.53,.147,2.77);for(const d of[-1,1])v(n,J,.12,.024,.54,.53+d*1.02,.221,2.86);Bs(n),v(n,G,1.96,.447,.12,.54,2.61,2.64);const h=new F(new Ce(1.86,.407),As());h.position.set(.54,2.61,2.706),n.add(h);for(const d of[-1,1]){for(let g=0;g<5;g++)v(n,B,.16,1.27,.28,d*4.03,1.78,-.89+g*.43);v(n,W,.11,.105,3.38,d*4.07,2.52,.04),v(n,J,.11,.065,2.2,d*4.08,2.78,.34),v(n,ae,1.48,1.1,.11,2.22*d,1.61,-2.677),v(n,Fe,1.29,.075,.042,2.22*d,2.07,-2.746)}for(let d=0;d<4;d++)v(n,B,3.23,.12,.16,-1.1,3.72,-2.06+d*.42);for(const[d,g]of[[-.2,1.2],[.22,.8]])y(n,B,.03,.06,g,-2.97+d,3.7+g/2,-1.29,8),y(n,d>0?J:Gt,.04,.05,.09,-2.97+d,3.7+g,-1.29,8);const f=Is(n,e);Fs(n),Us(n),ks(n);const c=n.localToWorld(new C(2.37,0,4.04)),u=T(c.x,c.z);v(o,pt,1.29,.11,.41,c.x,u+.46,c.z).rotation.y=n.rotation.y;for(const d of[-.45,.45])v(o,G,.13,.46,.35,c.x+d,u+.22,c.z);v(o,W,1.04,.045,.037,c.x,u+.45,c.z+.21),e.add(c.x,c.z,1.26,.4,u-.07,.61,n.rotation.y);const p=n.localToWorld(new C(0,-.4,-.15));e.add(p.x,p.z,8.07,4.94,p.y,4.1,n.rotation.y);const m=n.localToWorld(new C(2.77,.41,2.44));return e.add(m.x,m.z,2.3,.62,m.y,2.09,n.rotation.y),Rs(f,t)}const Me=_("#374b54"),Ee=_("#4c3435"),lt=_("#775342"),Xe=_("#c6a580"),Lt=_("#edd0a9"),je=_("#3f444b",.59,.3),Pe=_("#b27656",.49,.24),ie=_("#d9aa67",.5,.15),wo=K(15309381,1.35),zt=K(16761976,2.2);function wt(o,e,t){const[s,i]=me[e].landmark,a=new $;return a.position.set(s,T(s,i),i),a.rotation.y=t,o.add(a),a}function Gs(o,e,t,s,i,a=i){const n=s.clone().sub(t),r=t.clone().lerp(s,.5);v(o,e,i,n.length(),a,r.x,r.y,r.z).quaternion.setFromUnitVectors(new C(0,1,0),n.normalize())}function xo(o,e){const t=e-o;return new vt().moveTo(-o,0).lineTo(o,0).lineTo(o,t).quadraticCurveTo(o,e,0,e).quadraticCurveTo(-o,e,-o,t).lineTo(-o,0)}function At(o,e,t,s,i,a,n){return E(o,new ro(xo(a,n),12),e,t,s,i)}function Ls(o,e,t,s,i,a){At(o,Ee,e,t-.05,s,i*.57,a+.11),At(o,wo,e,t,s+.018,i*.43,a),v(o,lt,i*1.26,.108,.24,e,t-.045,s+.056),v(o,Ee,.06,a*.87,.044,e,t+a*.43,s+.047),v(o,Ee,i*.93,.05,.044,e,t+a*.48,s+.047)}function Ns(o,e,t,s){const a=wt(o,"dream-ocean",.29),[n,r,l]=a.position,h=[_("#606f81"),_("#7a8499"),_("#8b9ba6"),_("#707787")],f=_("#3b586a"),c=_("#a1b4c3"),u=K(10017008,.45),p=y(a,f,2.97,3.3,.33,0,-.06,.03,12);p.scale.z=.59;const m=y(a,h[1],2.53,2.86,.2,0,.2,.16,14);m.scale.z=.55;const d=v(a,c,3.15,.16,1.25,0,.14,1.13);d.rotation.y=-.03;const g=1.61,w=2.61,P=new vt().moveTo(-g,.25).lineTo(g,.25).lineTo(g,w).quadraticCurveTo(g,w+1.2,0,w+2.2).quadraticCurveTo(-g,w+1.2,-g,w).closePath(),R=new F(new ro(P,36),Ss(e,s));R.position.z=.17,a.add(R);for(const b of[-1,1])for(let M=0;M<4;M++){const S=.84-.044*M,A=v(a,h[(M+1)%h.length],S,.58,.94-M*.057,b*(g+S/2-.04),.49+M*.61,.03);A.rotation.z=(M%2-.5)*.035,v(a,c,.036,.45,.05,b*1.72,.51+M*.61,.55-M*.025)}const z=(b,M)=>{const S=Math.sign(1-b*2),A=1-Math.abs(1-b*2);return[S*((1-A*A)*(g+M)),w+(2.4*A-.2*A*A)*(1+M*.44)]};for(let b=0;b<15;b++){const M=(b+.031)/15,S=(b+.969)/15,A=b===7,Y=[z(M,-.075),z(S,-.075),z(S,A?.73:.61),z(M,A?.73:.61)];if(O(a,h[b%h.length],Y,A?.91:.7,0,0,0,.035),b%2===0){const[L,X]=z((M+S)/2,.18),D=v(a,u,.044,.18,.02,L,X,A?.491:.394);D.rotation.z=(b-7)*-.11}}for(const[b,M,S,A]of[[-3.62,-.68,1,-.24],[3.18,-.63,.84,.29],[-4.2,1.23,.61,-.3],[3.72,1,.45,.32],[1.56,-2.95,.57,-.21]]){const Y=E(a,new it(1,0),h[Math.round(S*3)],b,1.22*S,M);Y.scale.set(.66*S,2.33*S,.61*S),Y.rotation.z=A,Y.rotation.y=M,E(a,new it(.21,0),u,b,.7*S,M+.42*S).scale.set(.34,1.9,.49)}for(const b of[-2.85,2.82])y(a,f,.24,.32,.62,b,.32,1.6,7),E(a,new it(.21,0),u,b,.76,1.6).scale.y=1.35;t.add(n,l,5.4,1.75,r-.5,5.65,.29)}function Hs(o,e,t){const s=wt(o,"pocket-orbit",.15),[i,a,n]=s.position,r=_("#8c857d"),l=_("#646b6b"),h=_("#c78d50");y(s,Xe,3.38,3.68,.52,0,-.3,0,12),y(s,Me,3.31,3.51,.25,0,-.01,0,12),y(s,r,3.19,3.33,.13,0,.162,0,12),y(s,l,2.85,2.85,.03,0,.237,0,30);const f=E(s,new he(2.42,.035,4,64),Lt,0,.26,0);f.rotation.x=-Math.PI/2;for(let c=0;c<12;c++){const u=c*Math.PI/6,p=Math.cos(u)*3.07,m=Math.sin(u)*3.07,d=v(s,c%3===0?zt:h,.25,.074,.14,p,.247,m);d.rotation.y=-u}v(s,Xe,1.69,.22,.73,-.08,.04,3.45);for(const c of[-2.56,2.56])y(s,je,.095,.14,1.42,c,.68,-2.12),y(s,zt,.15,.15,.2,c,1.43,-2.12,11),y(s,ie,.16,.18,.07,c,1.57,-2.12);for(const c of[-1.9,-.91,1.93])v(s,je,.56,.41,.73,-3.54,.04,c),v(s,Pe,.58,.1,.75,-3.54,.28,c),v(s,Me,.26,.162,.022,-3.54,.1,c+.37);ns(async()=>{const{addPocketOrbitShuttle:c}=await import("./pocketOrbitShuttle-CbPnwuU4.js");return{addPocketOrbitShuttle:c}},__vite__mapDeps([0,1,2]),import.meta.url).then(({addPocketOrbitShuttle:c})=>c(s,t)),e.add(i,n,5.3,5.25,a-.42,3.4,.15)}function $t(o,e,t,s,i,a){const n=l=>i*(1-Math.abs(l/t))**1.55+Math.abs(l/t)**11*.24,r=[];for(let l=0;l<=20;l++){const h=-t+l*t/10;r.push([h,n(h)])}for(let l=20;l>=0;l--){const h=-t+l*t/10;r.push([h,n(h)-.17])}O(o,a,r,s,0,e,0,.015);for(let l=0;l<=22;l++){const h=-t+l*t/11,f=y(o,l%3===0?Pe:a,.06,.06,s+.05,h,e+n(h)+.02,0,7);f.rotation.x=Math.PI/2}for(const l of[-s/2-.012,s/2+.012])for(let h=0;h<14;h++){const f=-t+h*t/7,c=f+t/7;Gs(o,ie,new C(f,e+n(f)-.043,l),new C(c,e+n(c)-.043,l),.075)}}function Kt(o,e,t){const s=new $;s.position.set(e,.2,.55),o.add(s);const i=[[-.61,0],[.63,0],[.63,.92],[.34,1.26],[.39,1.98],[.12,2.19],[-.61,2.19]];O(s,t,i,.94,0,0,0,.042).rotation.y=-Math.PI/2,v(s,Me,.89,.83,.078,0,1.59,.348).rotation.x=-.09,v(s,K(9753296,.36),.73,.57,.025,0,1.61,.402).rotation.x=-.09;const a=new $;a.position.set(0,1.61,.436),s.add(a);for(let n=0;n<4;n++)v(a,t,.116,.106,.012,(n%2-.5)*.18,(Math.floor(n/2)-.5)*.15,0);v(s,Pe,.99,.14,.46,0,1.06,.45),y(s,je,.039,.041,.14,-.28,1.19,.49,10),E(s,new Ye(.071,10,7),wo,-.28,1.28,.49);for(const n of[.08,.23])y(s,ie,.06,.052,.048,n,1.16,.5,10);v(s,Lt,.69,.16,.036,0,2.01,.388)}function Os(o,e){const s=wt(o,"hanzizap",-.17),[i,a,n]=s.position,r=_("#a75f4a"),l=_("#426564"),h=_("#d9a34f");v(s,Xe,5.57,.37,3.9,0,-.07,.17),v(s,lt,5.44,.12,3.8,0,.145,.17),v(s,r,4.8,2.57,.24,0,1.36,-1.39);for(const c of[-2.23,2.23]){for(const u of[-1.31,1.39])y(s,r,.115,.15,2.95,c,1.53,u),y(s,je,.19,.21,.21,c,.22,u),y(s,ie,.155,.156,.15,c,2.67,u);v(s,l,.119,1.43,2.81,c,.85,0);for(let u=0;u<6;u++)v(s,h,.037,.94,.089,c+Math.sign(c)*.074,.91,-1.13+u*.448)}for(const c of[-1.42,1.42])v(s,lt,5.11,.24,.23,0,2.88,c);$t(s,3.08,2.99,3.89,.99,l),v(s,l,2.82,.57,1.98,0,3.96,0),v(s,lt,2.96,.105,2.04,0,4.21,0);for(let c=0;c<9;c++)v(s,ie,.045,.3,.034,(c-4)*.265,3.99,1.005);$t(s,3.97,1.88,2.64,.61,l),v(s,ie,.19,.17,2.7,0,4.64,0),v(s,Ee,2.77,.28,.13,0,2.66,1.49),v(s,ie,2.46,.055,.05,0,2.66,1.58);for(const c of[-1.95,1.95]){const u=E(s,new Ye(.222,12,9),zt,c,2.49,1.72);u.scale.y=1.19,y(s,Pe,.18,.16,.08,c,2.76,1.72),y(s,Pe,.15,.18,.08,c,2.22,1.72),v(s,r,.031,.15,.031,c,2.12,1.72)}Kt(s,-.93,h),Kt(s,.76,r);const f=v(s,r,3.5,.037,.61,0,.071,2.01);f.rotation.y=.022;for(const c of[-1.58,1.58])v(s,ie,.042,.04,.52,c,.085,2.01);e.add(i,n,5.13,3.63,a-.42,4.8,-.17)}function Vs(o,e){const s=wt(o,"observatory",.34),[i,a,n]=s.position,r=[_("#64928d",.48,.25),_("#588682",.45,.26),_("#7a9e92",.45,.25)],l=_("#c2b3a2");y(s,je,2.1,2.37,.35,0,.04,0,12),y(s,l,1.84,1.95,2.78,0,1.45,0,15),y(s,Lt,1.98,1.91,.21,0,2.81,0,15),y(s,Me,2.02,1.997,.29,0,3.058,0,16);for(let u=0;u<12;u++){const p=new Ye(1.98,6,11,u*Math.PI/6,Math.PI/6,0,Math.PI/2),m=E(s,p,r[u%3],0,3.18,0);m.scale.y=.83;const d=E(s,new he(1.975,.028,5,22,Math.PI/2),Pe,0,3.19,0);d.rotation.y=u*Math.PI/6,d.scale.y=.83}const h=E(s,new he(2.11,.062,6,40),ie,0,3.04,0);h.rotation.x=Math.PI/2;const f=new Bt(xo(.59,1.75),{depth:.26,bevelEnabled:!0,bevelSize:.035,bevelThickness:.034,bevelSegments:1,curveSegments:12});E(s,f,Ee,0,.16,1.76),At(s,Me,0,.204,2.055,.47,1.58);for(const u of[-.24,0,.24])v(s,Ee,.025,1.17,.032,u,.81,2.063);v(s,ie,.08,.11,.056,.27,.75,2.082);for(const u of[-1,1]){const p=new $;p.rotation.y=u*.78,s.add(p),Ls(p,0,1.27,1.86,.47,1.04)}const c=new $;c.position.set(.56,4.32,.23),c.rotation.z=-.85,c.rotation.x=.26,s.add(c),y(c,Me,.48,.39,2.23,0,.82,0,18),y(c,Pe,.58,.52,.24,0,2.04,0,18),y(c,_("#a4c8c8",.23,.41),.442,.452,.041,0,2.17,0,18),y(c,ie,.47,.49,.12,0,1.58,0,18),y(c,ie,.44,.44,.1,0,.19,0,16),y(c,Me,.17,.15,.56,0,-.51,0,12),v(s,Xe,1.2,.26,.76,0,.1,2.07).rotation.x=-.13,v(s,Xe,1.32,.19,.65,0,-.07,2.56).rotation.x=-.2,e.add(i,n,3.57,3.63,a-.61,5.3,.34)}function Ws(o,e,t,s){const i=Ds(o,e,t);return Ns(o,t,e,s),Hs(o,e,s),Os(o,e),Vs(o,e),i}let ot=null;function yo(){if(ot)return ot;const o=document.createElement("canvas");o.width=o.height=128;const e=o.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,63);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,255,255,.42)"),t.addColorStop(.6,"rgba(255,255,255,.1)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),ot=new It(o),ot}function st(o,e,t,s,i,a){const n=new F(new Ce(i,i),new oe({map:yo(),color:e,opacity:a,transparent:!0,blending:Ke,depthWrite:!1,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-4}));n.rotation.x=-Math.PI/2,n.position.set(t,T(t,s)+.09,s),n.renderOrder=2,o.add(n)}function qs(o,e,t,s,i,a,n){const r=new Ft(new lo({map:yo(),color:e,opacity:n,transparent:!0,blending:Ke,depthWrite:!1,toneMapped:!1}));r.position.set(t,s,i),r.scale.setScalar(a),o.add(r)}function Xs(o,e){const t=_("#3c3a44",.6,.35),s=K(16762482,2.4),i=[[2.9,17.6],[.25,14.7],[2.45,10.7],[-1.4,8.35],[-4.88,5.6],[-8.52,3.55],[-12.32,2.31],[6.28,5.4],[9.2,2.73],[11.55,-.85],[7.3,11.5],[10.1,14.65],[-7.98,-.65],[-8.35,-5.9],[-6.55,-9.09]],a=pe(71893);for(const[r,l]of i){const h=T(r,l),f=.64+a()*.22;y(o,t,.055,.08,f,r,h+f*.5,l,7),y(o,t,.12,.1,.13,r,h+.06,l,7),y(o,s,.081,.11,.19,r,h+f,l,8),y(o,t,.041,.15,.107,r,h+f+.102,l,8);const c=v(o,t,.19,.041,.19,r,h+f-.088,l);c.rotation.y=Math.PI/4,qs(o,16757340,r,h+f,l,1.05,.55),st(o,16752714,r,l,3.4,.34)}const n=[[.4,1.7,3.6,4645103,14,11],[-2.3,1.8,3.1,16751186,10,9],[-15.2,2.4,-1.4,8370431,16,12],[13.2,2.6,11.8,16757854,14,10],[-3.6,2,-11.4,16761466,7,8],[12.4,2.2,-4.2,9427199,10,10]];for(const[r,l,h,f,c,u]of e?n:n.slice(0,3)){const p=new qo(f,c,u,1.6);p.position.set(r,T(r,h)+l,h),o.add(p)}st(o,8370431,-15.2,-.6,7.5,.26),st(o,16757854,13.2,12.6,6.5,.22),st(o,4645103,.5,4.6,5.5,.18)}const js=[{id:"dream-ocean",logo:"dream-ocean-logo.webp",aspect:680/277,x:-11.86,z:-.78,yaw:.3,width:3.46,height:1.63,lift:.65,frame:"#677d8e",panel:"#cadde5",lamp:10212583},{id:"pocket-orbit",logo:"pocket-orbit-logo.webp",aspect:680/375,x:9.14,z:-3.09,yaw:-.19,width:3.16,height:1.85,lift:.57,frame:"#a69c8b",panel:"#272a42",lamp:15969383},{id:"hanzizap",logo:"hanzizap-logo.svg",aspect:290/69,x:10.02,z:12.03,yaw:.13,width:3.44,height:1.01,lift:.79,frame:"#b4814c",panel:"#4c3435",lamp:16761976}];function Qs(o,e,t){const s=new Et;return js.map(({id:i,logo:a,aspect:n,x:r,z:l,yaw:h,width:f,height:c,lift:u,frame:p,panel:m,lamp:d})=>{const g=new $,w=T(r,l);g.position.set(r,w,l),g.rotation.y=h,o.add(g);const x=_(p,.65,.16),P=_(m,.81),R=K(d,.52),z=u+c*.5,b=f*.5,M=c*.5,S=.15;O(g,x,[[-b+S,-M],[b-S,-M],[b,-M+S],[b,M-S],[b-S,M],[-b+S,M],[-b,M-S],[-b,-M+S]],.24,0,z,0,.027),v(g,P,f-.22,c-.2,.31,0,z,0);for(const D of[-1,1])v(g,x,.2,u+.31,.25,D*f*.34,u*.4,0),v(g,P,.39,.15,.49,D*f*.34,.035,0),v(g,R,.4,.035,.055,D*(b-.39),u+.071,.164),v(g,R,.4,.035,.055,D*(b-.39),u+.071,-.164);const A=Math.min(f-.5,(c-.34)*n),Y=new Ce(A,A/n),L=s.load(`./island-media/${a}`,t);L.colorSpace=gt,L.anisotropy=4;const X=new oe({map:L,transparent:!0,depthWrite:!1,toneMapped:!1});for(const D of[-1,1]){const I=new F(Y,X);I.position.set(0,z,D*.166),I.rotation.y=D<0?Math.PI:0,g.add(I)}return e.add(r,l,f,.38,w-.2,c+u+.28,h),{id:i,box:new co().setFromObject(g)}})}const bo=Math.PI*2,$s=new q("#2e7255"),Ks=new q("#7d9e58"),Ys=new q("#41747a"),Zs=new q("#8d8052"),Js=new q("#74654f");function kt(o,e,t){const s=T(o,e),i=.41+Math.sin(o*1.37+e*.64)*.07+Math.cos(o*.43-e*.77)*.15;return t.copy($s).lerp(Ks,i+Math.max(0,s)*.062),t.lerp(Ys,Math.exp(-((o+15)**2+(e+1)**2)/54)*.59),t.lerp(Zs,Math.exp(-((o-13)**2+(e+4)**2)/39)*.77),t.lerp(Js,Math.max(0,(xe(o,e)-.83)*3.4)+Math.max(0,-.5-s)*.21),t}function Pt(o,e,t){o.onBeforeCompile=s=>{s.vertexShader=`varying vec3 terrainPoint;
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
      vec2 gritUV = groundUV * ${t.toFixed(2)};
      float sharpness = 1.0 - smoothstep(.42, 1.32, length(fwidth(gritUV)));
      float grit = (earthShade(gritUV) - .5) * sharpness;
      float coarse = earthShade(groundUV * .83 + 4.0) - .5;
      diffuseColor.rgb *= 1.0 + grit * ${e.toFixed(2)} + coarse * .18;`)},o.customProgramCacheKey=()=>`ground-${e}-${t}`}function en(){const t=[0,T(0,0),0],s=[kt(0,0,new q)],i=[];for(let n=1;n<=37;n++)for(let r=0;r<144;r++){const l=Te((r+n%2*.5*(n<37?1:0))/144*bo,n/37),[h,f]=l;t.push(h,T(h,f),f),s.push(kt(h,f,new q));const c=1+(n-1)*144+r,u=1+(n-1)*144+(r+1)%144;n===1?i.push(0,u,c):i.push(c-144,u,c,c-144,u-144,u)}const a=new ue;return a.setAttribute("position",new ee(t,3)),a.setAttribute("color",Dt(s)),a.setIndex(i),a.computeVertexNormals(),a}function Yt(o,e,t,s,i){const a=[1,1,.96,.985,.83,.765,.63,.34,.035,0],n=[0,-.65,-2.1,-3.05,-4.65,-6.6,-8.65,-11.9,-13.3,-13.82],r=["#746e56","#695451","#635569","#937364","#594e66","#484656","#63536b","#45415a","#4b4357","#3c384e"].map(p=>new q(p)),l=[],h=[],f=[];for(let p=0;p<n.length;p++)for(let m=0;m<o;m++){const d=m/o*bo,g=Math.sin(d*5+p*.59)*.67+Math.cos(d*13-.9)*.22,w=Math.sin(d*39+.4)*.2+Math.cos(d*49)*.12,x=p>0&&p<9?(g+w)*(.031+p*.003):0,[P,R]=Te(d,a[p]+x),[z,b]=Te(d),M=p>0?Math.sin(d*4+.6)*.55+g*.44:0;if(l.push(t+(P-p*p*.025)*e,s+(n[p]+T(z,b)/(1+p*.18)+M)*e,i+(R+p*p*.022)*e),h.push(r[p].clone().multiplyScalar(.87+g*.1+w*.44)),p>0){const S=p*o+m,A=p*o+(m+1)%o;f.push(S-o,A,S,S-o,A-o,A)}}const c=new ue;c.setAttribute("position",new ee(l,3)),c.setAttribute("color",Dt(h)),c.setIndex(f);const u=c.toNonIndexed();return c.dispose(),u.computeVertexNormals(),u}function tn(o){const e=[];for(let t=0;t<o.length-1;t++){const[s,i]=o[Math.max(0,t-1)],[a,n]=o[t],[r,l]=o[t+1],[h,f]=o[Math.min(o.length-1,t+2)],c=Math.ceil(Math.hypot(r-a,l-n)*4);for(let u=0;u<c;u++){const p=u/c,m=(d,g,w,x)=>.5*(2*g+(-d+w)*p+(2*d-5*g+4*w-x)*p*p+(-d+3*g-3*w+x)*p*p*p);e.push(new V(m(s,a,r,h),m(i,n,l,f)))}}return e.push(new V(...o[o.length-1])),e}const Mo=is.map(tn),on=new q("#b89f71"),sn=new q("#c7af84");function nn(){const o=[],e=[],t=[],s=[-1,-.79,-.32,.19,.8,1],i=pe(19309);for(const[n,r]of Mo.entries()){const l=o.length/3,h=n===0?.94:.66;for(const[f,c]of r.entries()){const u=r[Math.max(0,f-1)],p=r[Math.min(r.length-1,f+1)],m=new V(p.y-u.y,u.x-p.x).normalize(),d=h*(.9+.11*Math.sin(f*.32)+.13*i()),g=Math.min(1,(f+2)/5,(r.length-f)/7);for(const[w,x]of s.entries()){const P=c.x+m.x*x*d,R=c.y+m.y*x*d;o.push(P,T(P,R)+.041+.003*n,R);const z=Math.abs(x)>.99?.02:Math.min(1,(1-Math.abs(x))*1.95);e.push(kt(P,R,new q).lerp(w%2===0?on:sn,z*g).multiplyScalar(.9+i()*.2))}if(f!==0)for(let w=1;w<s.length;w++){const x=l+f*s.length+w,P=x-s.length;t.push(P-1,x-1,x,P-1,x,P)}}}const a=new ue;return a.setAttribute("position",new ee(o,3)),a.setAttribute("color",Dt(e)),a.setIndex(t),a.computeVertexNormals(),a}function an(o){const e=new Se({vertexColors:!0,roughness:1});Pt(e,.23,6.2);const t=new F(en(),e);t.receiveShadow=!0,t.castShadow=!0,o.add(t);const s=new Se({vertexColors:!0,roughness:.96});Pt(s,.31,3.6);const i=new F(Yt(144,1,0,0,0),s);i.receiveShadow=!0,i.castShadow=!0,o.add(i);const a=new Se({vertexColors:!0,roughness:.92});Pt(a,.39,15.6);const n=new F(nn(),a);n.receiveShadow=!0,o.add(n);for(const[r,l,h,f]of[[-72,-3,-90,.38],[-46,-6,-84,.22],[49,-4,-93,.32],[75,-1.5,-138,.44],[89,-7,-67,.17],[-89,-5.2,-65,.29]]){o.add(new F(Yt(48,f,r,l,h),s));const c=new F(t.geometry,e);c.position.set(r,l,h),c.scale.setScalar(f),o.add(c)}}const Ct=8,_t=8,rn=64,Zt=2.23,ln=Math.SQRT2-1,cn=4,Jt=1.8,fn=2.0625;function hn(o,e,t,s){const i=t.matrixWorld.elements,a=o*i[0]+e*i[2],n=-o*i[2]+e*i[0],r=Math.abs(a),l=Math.abs(n),h=ln*(s%2===1?.72:1);return Math.min(r,l)>=Math.max(r,l)*h?n<0?a<0?3:5:a<0?1:7:r>l?a<0?2:6:n<0?4:0}function eo(o,e,t,s){let i=!1;const a=o.load(new URL(`./island-media/andi/${e}.webp`,document.baseURI).href,()=>{i=!0,s()});a.colorSpace=gt,a.magFilter=ft,a.minFilter=ft,a.generateMipmaps=!1,a.repeat.set(1/t,1/Ct);const n=new Ft(new lo({map:a,transparent:!1,alphaTest:.5,toneMapped:!1}));return n.name=`Andi ${e}`,n.scale.set(Zt,Zt,1),n.center.set(.5,1/rn),n.position.y=.044,n.visible=!1,{sprite:n,get loaded(){return i},pose(r,l){a.offset.set(l/t,(Ct-1-r)/Ct)}}}function dn(o,e){const t=new $;t.name="Andi";const s=new Et,i=eo(s,"walk",_t+1,e),a=eo(s,"sprint",_t,e);t.add(i.sprite,a.sprite);const n=new F(new Ce(1.62,1.38),new te({uniforms:{tint:{value:new q("#201c28")}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`
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
    `}));n.position.y=.049,t.add(n);const r=new C(0,0,1),l=new C,h=cn/o;let f=4,c="idle",u=0,p=!1;return{root:t,get ready(){return i.loaded},update(m,d,g,w,x,P,R){const z=m.x-t.position.x,b=m.z-t.position.z;t.position.copy(m);const M=p&&!R&&!P?Math.hypot(z,b):0,S=M/g;p=!0;const A=S>.015;f=hn(A?z:Math.sin(d),A?b:Math.cos(d),w,f);const Y=o*(c==="sprint"?1.035:1.075);if(c=A?x||S<Y?"walk":"sprint":"idle",c==="idle")u=0;else{const j=S*h/(2*Jt),De=Re.clamp(Math.sqrt(j),.7,2.2),Je=fn*Jt*De;u=(u+M*h/Je)%1}const L=c==="sprint"&&a.loaded,X=Math.floor(u*_t);i.sprite.visible=i.loaded&&!L,a.sprite.visible=L,L?a.pose(f,X):i.pose(f,c==="idle"?0:X+1),n.visible=i.loaded&&!P;const{x:D,z:I}=m;l.set(T(D-.29,I)-T(D+.29,I),.58,T(D,I-.29)-T(D,I+.29)).normalize(),n.quaternion.setFromUnitVectors(r,l)}}}const Be=_("#4a3c3a"),Qe=_("#6a5548");function xt(o,e=0){const t=new Se({color:o,roughness:.78,flatShading:!0});return e&&(t.emissive=new q(o),t.emissiveIntensity=e),t.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace("#include <emissivemap_fragment>",`
      #include <emissivemap_fragment>
      float leafRim = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.4);
      vec3 leafRimColor = mix(vec3(.10, .32, .34), vec3(.34, .30, .62), clamp(normal.y * .5 + .5, 0.0, 1.0));
      totalEmissiveRadiance += leafRimColor * leafRim * .42 * diffuseColor.rgb * 3.0;
    `)},t.customProgramCacheKey=()=>`foliage-rim-${e}`,t}const un=["#2f6a52","#43805a","#5a9064","#3f7a63","#6f9768"].map(o=>xt(o)),pn=["#2f5f74","#3f7a8c","#4f8e90","#4a7894","#6a9aa2"].map(o=>xt(o)),to=["#1f4d48","#285c50","#2f6a5a","#234f5a"].map(o=>xt(o)),nt=["#c66fae","#9a6fd6","#e38bb8","#7d8de6"].map(o=>xt(o,.32)),mn=K(16766704,2.2);function Rt(o,e,t){const s=new ht(o,e),i=pe(t),a=s.attributes.position,n=new Map;for(let r=0;r<a.count;r++){const l=`${a.getX(r).toFixed(3)},${a.getY(r).toFixed(3)},${a.getZ(r).toFixed(3)}`;n.has(l)||n.set(l,.84+i()*.3);const h=n.get(l);a.setXYZ(r,a.getX(r)*h,a.getY(r)*h,a.getZ(r)*h)}return s.computeVertexNormals(),s}function we(o,e,t,s,i,a){const n=t.clone().sub(e),r=e.clone().lerp(t,.5);E(o,new ao(i,s,n.length()*1.05,7),a,r.x,r.y,r.z).quaternion.setFromUnitVectors(new C(0,1,0),n.normalize())}function gn(o,e,t,s,i,a,n,r=!1){const l=T(t,s),h=r?pn:un,f=pe(n),c=new $;c.position.set(t,l-.18,s),c.rotation.y=a,c.scale.setScalar(i),o.add(c);const u=[new C(0,-.02,0),new C(-.11,.96,.09),new C(.055,1.88,.16),new C(.49,2.68,.2),new C(.75,3.3,.14)],p=[.238,.174,.118,.071,.023];for(let m=1;m<u.length;m++)we(c,u[m-1],u[m],p[m-1],p[m],m%2===0?Be:Qe);for(let m=0;m<5;m++){const d=m*Math.PI*.4+f()*.31;we(c,new C(-.02,.31,.03),new C(Math.cos(d)*.62,-.02,Math.sin(d)*.6),.12,.036,Be)}for(let m=0;m<10;m++){const d=m/10,g=m*2.4+f()*.41,w=new C(Math.cos(g),0,Math.sin(g)),x=u[1].clone().lerp(u[4],.25+.67*d),P=(1-d*.69)*(1.32+f()*.51),R=x.clone().addScaledVector(w,P);R.y+=.31+f()*.19;const z=x.clone().lerp(R,.53);z.y-=.14,we(c,x,z,.079-d*.033,.049,Be),we(c,z,R,.052,.017,Qe);for(let b=0;b<3;b++){const M=z.clone().lerp(R,.22+b*.32),S=(1-d*.54)*(1-b*.18),A=E(c,Rt(1,1,n+m*7+b),h[(m+b+1)%h.length],M.x,M.y+.1,M.z);A.scale.set((.86+f()*.25)*S,(.32+f()*.15)*S,(.81+f()*.22)*S),A.rotation.y=m*.94,A.rotation.z=-.16+f()*.35}}for(let m=0;m<3;m++)E(c,Rt(.56-m*.09,1,n+91+m),h[2+m],.62+.139*m,3.07+.2*m,.14).scale.set(1.22,.57,.92);e.add(t,s,i*.43,i*.43,l-.2,i*1.8)}function vn(o,e,t,s,i,a){const n=pe(a),r=T(t,s),l=new $;l.position.set(t,r-.1,s),l.rotation.y=n()*6.28,l.scale.setScalar(i),o.add(l),y(l,Be,.07,.14,1.3,0,.62,0,6);const h=4+Math.floor(n()*2);for(let f=0;f<h;f++){const c=f/h,u=(1-c*.72)*(.95+n()*.14),p=.95-c*.25,m=new Qo(u,p,7,1),d=m.attributes.position;for(let w=0;w<d.count;w++)d.getY(w)<0&&(d.setY(w,d.getY(w)-.08+n()*.05),d.setX(w,d.getX(w)*(.9+n()*.2)),d.setZ(w,d.getZ(w)*(.9+n()*.2)));m.computeVertexNormals();const g=E(l,m,to[(f+a)%to.length],(n()-.5)*.05,.9+f*.52,(n()-.5)*.05);g.rotation.y=n()*6.28}e.add(t,s,i*.5,i*.5,r-.2,i*3)}function wn(o,e,t,s,i,a){const n=pe(a),r=T(t,s),l=new $;l.position.set(t,r-.1,s),l.rotation.y=n()*6.28,l.scale.setScalar(i),o.add(l);const h=[new C(0,0,0),new C(.12,.8,.05),new C(-.05,1.55,.1),new C(.15,2.1,0)],f=[.17,.12,.08,.05];for(let p=1;p<h.length;p++)we(l,h[p-1],h[p],f[p-1],f[p],Qe);const c=nt[a%nt.length],u=nt[(a+1)%nt.length];for(let p=0;p<7;p++){const m=p*2.4+n()*.5,d=p===0?0:.55+n()*.45,g=h[3].x+Math.cos(m)*d,w=h[3].z+Math.sin(m)*d,x=h[3].y+.1+(p===0?.35:n()*.3-.1);p&&we(l,h[2],new C(g,x-.1,w),.05,.02,Qe);const P=E(l,Rt(.5+n()*.2,1,a+p),p%3?c:u,g,x,w);if(P.scale.y=.7,p&&n()>.35){const R=E(l,new ht(.055,0),mn,g*1.08,x-.42,w*1.08);R.castShadow=!1}}e.add(t,s,i*.4,i*.4,r-.2,i*2.5)}const xn=[[-12.9,9.6,.95],[-19.4,10.9,.85],[-11.4,-4.6,.8],[-19.6,1.1,.78],[6.9,15.1,.82],[17.7,4.2,.74]];function yn(o,e,t){const s=pe(48151);let i=0;const a=t?22:38;for(let n=0;n<900&&i<a;n++){const r=s()*Math.PI*2,l=.74+s()*.17,[h,f]=Te(r,l),c=T(h,f);f>12.5&&Math.abs(h-2)<9||c<re+.25||$e(h,f,1.7)||e.solid(h,f,1.1,c-.5,c+3)||(vn(o,e,h,f,.8+s()*.65,3001+n),i++)}}const bn=[[-21.4,-1.2,1.22,.75,1],[-17.1,-7.15,1.32,.12,1],[-12.35,-5.4,.94,-1.2,1],[-17.95,2.62,.83,.68,1],[-22.2,5.9,.83,.24,1],[-8.15,-12.3,1.13,.28,0],[-.42,-16.85,1.12,-.43,0],[-9.65,-14.48,.78,1.1,0],[4.35,-15.45,1.29,.12,0],[8.67,-12.66,.88,1.68,0],[16.7,-10.47,1.01,-.29,0],[19.55,-6.5,1.03,.52,0],[22.02,-1.73,.79,-1,0],[20.45,5.3,1.26,.98,0],[18.05,10.94,1.12,-.4,0],[16.43,13.64,.66,2.12,0],[-7.15,13.7,1.13,.8,0],[-8.9,10.6,.86,1.46,0],[-3.2,14.32,.72,1.24,0],[-2.75,-6.9,.72,.26,0],[5.9,-.96,.78,-.46,0],[-10.5,-2.3,.72,.89,1],[-5.5,-4.75,.73,-.89,0]];function $e(o,e,t){const s=t*t;return Mo.some(i=>i.some(a=>(a.x-o)**2+(a.y-e)**2<s))}function Mn(o,e,t,s){const i=pe(9270),a=s?1200:2860,n=[],r=[],l=s?4:6;for(let d=0;d<l;d++){const g=i()*Math.PI*2,w=Math.cos(g),x=Math.sin(g),P=.18+i()*.36,R=.022+i()*.015,z=(i()-.5)*.28,b=(i()-.5)*.25,M=P*(.16+i()*.38),S=(I,j)=>[z+w*M*j*j+x*I*R*(1-j),P*j,b+x*M*j*j-w*I*R*(1-j)],A=S(-1,0),Y=S(1,0),L=S(-1,.47),X=S(1,.47),D=S(0,1);for(const I of[A,Y,L,Y,X,L,L,X,D]){n.push(...I);const j=.44+I[1]*1.02;r.push(j*1.06,j,j*.87)}}const h=new ue;h.setAttribute("position",new ee(n,3)),h.setAttribute("color",new ee(r,3)),h.computeVertexNormals();const f=new Se({side:mt,vertexColors:!0,roughness:1});f.onBeforeCompile=d=>{d.uniforms.winds=t,d.vertexShader=`uniform float winds;
`+d.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      float breeze = sin(winds * 1.55 + instanceMatrix[3].x * .37 + instanceMatrix[3].z * .52);
      transformed.x += (breeze * .17 + .04) * position.y;
      transformed.z += breeze * .085 * position.y;
    `)},f.customProgramCacheKey=()=>"meadow-wind";const c=new Xo(h,f,a);c.receiveShadow=!0;const u=new jo,p=new q;let m=0;for(let d=0;m<a&&d<a*5;d++){const g=(i()-.5)*55,w=(i()-.5)*42,x=T(g,w);if(xe(g,w)>.967||x<re+.03||$e(g,w,.9)||e.solid(g,w,.2,x,x+.5))continue;const P=.48+.24*Math.sin(g*.71-w*.82)+.21*Math.cos(w*.63+g*.18);i()>P||(u.position.set(g,x-.018,w),u.rotation.y=i()*6.28,u.scale.set(.71+i()*.69,.52+i()*1.06,.71+i()*.65),u.updateMatrix(),p.setHSL(.146+i()*.12,.12+i()*.2,.33+i()*.19),c.setMatrixAt(m,u.matrix),c.setColorAt(m,p),m++)}c.count=m,o.add(c)}function Sn(o,e,t){const s=["#6f7073","#827263","#697b77","#9d8a76","#51636a"].map(r=>_(r)),i=["#49694f","#5d805f","#798b61"].map(r=>_(r)),a=[K(10466559,.9),K(16757611,.8),K(16744383,.9),K(16773280,.7)],n=pe(5256);for(let r=0;r<(t?290:505);r++){const l=(n()-.5)*56,h=(n()-.5)*42,f=T(l,h),c=xe(l,h);if(c>.995||f<re-.12||e.solid(l,h,.15,f,f+.3))continue;const p=c>.82?.23+n()**2*.79:.06+n()**2*.26;if($e(l,h,.89)&&p>.12)continue;const m=E(o,new it(p,0),s[r%s.length],l,f-p*.06,h);if(m.scale.set(.98+n()*.52,.35+n()*.43,.75+n()*.39),m.rotation.set(.25,n()*6.28,(n()-.5)*.43),p>.64&&e.add(l,h,p*1.15,p*1.17,f-.3,p*.75),!(c>.91||p<.16||r%4!==0))for(let d=0;d<4;d++)E(o,new ht(.2+n()*.25,0),i[d%i.length],l+(n()-.5)*.85,f+.132,h+(n()-.5)*.62).scale.set(1.22,.65+n()*.3,.78)}for(const[r,l,h]of[[-10.7,6.35,0],[-17.8,4.45,0],[-2.8,6.8,2],[3.5,3.84,1],[9.77,10.8,1],[15.76,11.53,3],[-5.4,-9.9,0],[15.2,-3.56,1],[3.12,14.72,3],[-4.88,11.4,2]])for(let f=0;f<(t?14:28);f++){const c=r+(n()-.5)*2.4,u=l+(n()-.5)*1.55,p=T(c,u),m=.19+n()*.31;if($e(c,u,.69)||p<re||e.solid(c,u,.1,p,p+.3))continue;y(o,i[f%3],.011,.018,m,c,p+m/2,u,5);const d=E(o,new ht(.069+n()*.045,0),a[h],c,p+m,u);d.scale.y=.59}for(const[r,l]of[[-12.4,6.9],[-16.7,5.08],[-19.6,7.05],[-17.1,10.55]])if(!(T(r,l)<re-.2))for(let h=0;h<13;h++){const f=(n()-.5)*.92,c=(n()-.5)*.67,u=.21+n()*.62,p=y(o,i[h%3],.012,.023,u,r+f,T(r+f,l+c)+u/2,l+c,5);p.rotation.z=f*.22}}function Tn(o){const e=_("#a68c67");for(const[t,s]of[[[.565,.64,.715,.79],.895],[[1.881,1.954,2.027],.925]]){let i;for(const a of t){const[n,r]=Te(a,s),l=T(n,r);y(o,Qe,.086,.11,1.04,n,l+.43,r,7),v(o,Be,.235,.145,.235,n,l+.965,r).rotation.y=a;const h=new C(n,l+.73,r);if(i){const f=i.clone().lerp(h,.5);f.y-=.15,we(o,i,f,.025,.023,e),we(o,f,h,.023,.025,e)}i=h}}}function Pn(o,e,t,s){bn.forEach(([a,n,r,l,h],f)=>gn(o,e,a,n,r,l,772+f*331,!!h)),xn.forEach(([a,n,r],l)=>{const h=T(a,n);h>re+.2&&!$e(a,n,1.2)&&!e.solid(a,n,.9,h-.5,h+2)&&wn(o,e,a,n,r,61+l*17)}),yn(o,e,s),Sn(o,e,s),Mn(o,e,t,s),Tn(o),[-15,-1.02,10.5].forEach((a,n)=>{const[r,l]=n===0?de:[a,15.65],h=T(r,l);h>re&&(v(o,Be,.28,.14,.83,r,h+.04,l).rotation.y=n*.27)})}class Cn{constructor(e){this.land=e}camera=new $o(48,1,.18,700);yaw=.19;pitch=.415;aspect=1;position=new C;aim=new C;target=new C;sample=new C;initialized=!1;resize(e,t){this.aspect=e/Math.max(1,t),this.camera.aspect=this.aspect,this.camera.updateProjectionMatrix()}turn(e,t){this.yaw=(this.yaw-e*.0078)%(Math.PI*2),this.pitch=Re.clamp(this.pitch+t*.0057,.16,1.08)}recenter(){this.yaw=.19,this.pitch=.415}update(e,t,s,i,a,n=!1){const r=this.aspect<.76,l=s?r?58:52:48;if(s)this.walkPose(t,r);else{const c=67.5/Math.max(.32,this.aspect),u=r?Math.max(82,c):63+Math.max(0,1.28-this.aspect)*28,p=a?0:Math.sin(i*.16)*1.5;this.position.set(12.9+p,r?38.5:24.6,u),this.aim.set(r?-.25:-9.75*Math.min(1,this.aspect/1.46),r?u*.229:7.9,0)}const f=!this.initialized||n||a?1:1-Math.exp(-e*(s?9:3.5));this.camera.position.lerp(this.position,f),this.target.lerp(this.aim,s?Math.min(1,f*1.22):f),this.camera.fov=Re.lerp(this.camera.fov,l,f),this.camera.updateProjectionMatrix(),this.camera.lookAt(this.target),this.camera.updateMatrixWorld(),this.initialized=!0}walkPose(e,t){const s=Math.sin(this.yaw),i=Math.cos(this.yaw),a=t?8.9:9.3,n=a*Math.cos(this.pitch);this.aim.set(e.x-s*1.6,Math.max(-2,e.y)+1.78,e.z-i*1.6),this.position.set(e.x+s*n+i*.5,Math.max(-.5,e.y)+1.17+a*Math.sin(this.pitch),e.z+i*n-s*.5),this.sample.set(e.x,Math.max(-2,e.y)+1.5,e.z);for(let r=1;r<=20;r++){const l=r/20,h=Re.lerp(this.sample.x,this.position.x,l),f=Re.lerp(this.sample.y,this.position.y,l),c=Re.lerp(this.sample.z,this.position.z,l);if(this.land.solid(h,c,.42,f-.39,f+.38)||xe(h,c)<1&&T(h,c)>f-.45){this.position.lerp(this.sample,1-Math.max(.2,(r-1)/20));break}}}}const _n=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowLeft","ArrowDown","ArrowRight"]),zn=new Set(["ShiftLeft","ShiftRight"]);class An{constructor(e,t,s,i){this.stick=t,this.paceButton=s;const a={signal:this.events.signal},n=(...d)=>d.some(g=>this.held.has(g)),r=()=>{const d=Number(n("KeyD","ArrowRight"))-Number(n("KeyA","ArrowLeft")),g=Number(n("KeyS","ArrowDown"))-Number(n("KeyW","ArrowUp"));this.axes.set(d+this.joystick.x,g+this.joystick.y),this.axes.lengthSq()>1&&this.axes.normalize(),i.invalidate()};e.addEventListener("keydown",d=>{d.altKey||d.ctrlKey||d.metaKey||d.isComposing||!i.active()||(_n.has(d.code)||zn.has(d.code)?(d.preventDefault(),this.held.add(d.code),r()):!d.repeat&&d.code==="KeyE"?(d.preventDefault(),i.inspect()):!d.repeat&&d.code==="KeyR"&&(d.preventDefault(),i.reset()))},a),window.addEventListener("keyup",d=>{this.held.delete(d.code)&&r()},a),e.addEventListener("blur",()=>{this.held.clear(),r()},a),window.addEventListener("blur",()=>this.clear(),a),s.addEventListener("pointerdown",d=>{d.button!==0||this.pacePointer!==null||!i.active()||(d.preventDefault(),this.pacePointer=d.pointerId,s.setPointerCapture(d.pointerId),s.setAttribute("data-held",""),i.invalidate())},a);const l=d=>{this.pacePointer===d.pointerId&&(this.pacePointer=null,s.removeAttribute("data-held"),i.invalidate())};s.addEventListener("pointerup",l,a),s.addEventListener("pointercancel",l,a),s.addEventListener("lostpointercapture",l,a);let h=null;e.addEventListener("pointerdown",d=>{d.button!==0||h||!i.active()||(h={id:d.pointerId,startX:d.clientX,startY:d.clientY,lastX:d.clientX,lastY:d.clientY,moving:!1},e.setPointerCapture(d.pointerId))},a),e.addEventListener("pointermove",d=>{if(i.active()){if(!h){d.pointerType==="mouse"&&i.hover(d.clientX,d.clientY);return}h.id===d.pointerId&&(!h.moving&&Math.hypot(h.startX-d.clientX,h.startY-d.clientY)<5||(h.moving=!0,i.look(d.clientX-h.lastX,d.clientY-h.lastY),h.lastX=d.clientX,h.lastY=d.clientY))}},a),e.addEventListener("pointerup",d=>{!h||h.id!==d.pointerId||(!h.moving&&i.active()&&i.pick(d.clientX,d.clientY),h=null)},a);const f=d=>{h?.id===d.pointerId&&(h=null)};e.addEventListener("pointercancel",f,a),e.addEventListener("lostpointercapture",f,a),e.addEventListener("pointerleave",()=>e.removeAttribute("data-inspectable"),a);const c=t.querySelector("span");let u=-1;const p=d=>{const g=t.getBoundingClientRect(),w=g.width*.32;this.joystick.set((d.clientX-g.left-g.width/2)/w,(d.clientY-g.top-g.height/2)/w),this.joystick.lengthSq()>1&&this.joystick.normalize(),c.style.transform=`translate(${this.joystick.x*w}px, ${this.joystick.y*w}px)`,r()};t.addEventListener("pointerdown",d=>{u!==-1||!i.active()||(d.preventDefault(),u=d.pointerId,t.setPointerCapture(u),p(d))},a),t.addEventListener("pointermove",d=>{d.pointerId===u&&i.active()&&p(d)},a);const m=d=>{u===d.pointerId&&(u=-1,this.joystick.set(0,0),c.style.removeProperty("transform"),r())};t.addEventListener("pointerup",m,a),t.addEventListener("pointercancel",m,a),t.addEventListener("lostpointercapture",m,a)}axes=new V;held=new Set;joystick=new V;events=new AbortController;pacePointer=null;get walkHeld(){return this.pacePointer!==null||this.held.has("ShiftLeft")||this.held.has("ShiftRight")}clear(){this.held.clear(),this.joystick.set(0,0),this.axes.set(0,0),this.stick.querySelector("span").style.removeProperty("transform");const e=this.pacePointer;this.pacePointer=null,this.paceButton.removeAttribute("data-held"),e!==null&&this.paceButton.hasPointerCapture(e)&&this.paceButton.releasePointerCapture(e)}dispose(){this.events.abort()}}const kn=matchMedia("(pointer: coarse)"),oo=matchMedia("(prefers-reduced-motion: reduce)");class Rn{samples=0;slow=0;adjusted=!1;scale=1;light=kn.matches||navigator.hardwareConcurrency>0&&navigator.hardwareConcurrency<=4;pixels(e,t){const s=this.light?135e4:255e4;return Math.min(window.devicePixelRatio||1,this.light?1.35:1.75,Math.sqrt(s/Math.max(1,e*t)))*this.scale}measure(e){if(this.adjusted||e<=0||(this.samples++,e>.031&&this.slow++,this.samples<100))return!1;const t=this.slow/this.samples>.48;return this.samples=0,this.slow=0,t&&(this.scale=.79,this.adjusted=!0),t}}function En(o){const e=new Set,t=new Set,s=new Set;o.traverse(i=>{if("geometry"in i&&i.geometry instanceof ue&&e.add(i.geometry),i instanceof F&&"instanceMatrix"in i&&"dispose"in i&&typeof i.dispose=="function"&&i.dispose(),!("material"in i))return;const a=Array.isArray(i.material)?i.material:[i.material];for(const n of a)if(n instanceof Ko){t.add(n);for(const r of Object.values(n))r instanceof qt&&s.add(r);if(n instanceof te)for(const r of Object.values(n.uniforms))r.value instanceof qt&&s.add(r.value)}});for(const i of s)i.dispose();for(const i of e)i.dispose();for(const i of t)i.dispose();o.clear()}const Nt=3.5,Bn=Nt*1.6,fe=.9,In=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];function Fn(o,e,t,s){if(o.clearPath(e,t,...s))return[s];const i=(c,u)=>{const p=Math.round(c/fe),m=Math.round(u/fe);let d=null,g=1/0;for(let w=-2;w<=2;w++)for(let x=-2;x<=2;x++){const P=p+w,R=m+x,z=P*fe,b=R*fe,M=Math.hypot(z-c,b-u);M<g&&o.canStand(z,b,.025)&&o.clearPath(c,u,z,b)&&(d=[P,R],g=M)}return d},a=i(e,t),n=i(...s);if(!a||!n)return[];const r=(c,u)=>Math.hypot(n[0]-c,n[1]-u),l={x:a[0],z:a[1],cost:0,estimate:r(...a),last:null,checked:!1},h=[l],f=new Map([[a.join(","),l]]);for(;h.length;){let c=0;for(let p=1;p<h.length;p++)h[p].estimate<h[c].estimate&&(c=p);const u=h.splice(c,1)[0];if(u.x===n[0]&&u.z===n[1]){const p=[s];for(let g=u;g;g=g.last)p.push([g.x*fe,g.z*fe]);p.reverse();const m=[];let d=[e,t];for(let g=0;g<p.length;g++){for(;g+1<p.length&&o.clearPath(...d,...p[g+1]);)g++;d=p[g],m.push(d)}return m}u.checked=!0;for(const[p,m]of In){const d=u.x+p,g=u.z+m,w=`${d},${g}`,x=f.get(w),P=u.cost+Math.hypot(p,m);if(x&&(x.checked||P>=x.cost)||!o.clearPath(u.x*fe,u.z*fe,d*fe,g*fe))continue;const R=P+r(d,g);if(x)Object.assign(x,{cost:P,estimate:R,last:u});else{const z={x:d,z:g,cost:P,estimate:R,last:u,checked:!1};f.set(w,z),h.push(z)}}}return[]}class Un{constructor(e){this.land=e,this.reset()}position=new C;velocity=new V;heading=Math.PI;falling=!1;gravity=0;path=[];lastRange=1/0;obstruction=0;desired=new V;get walkingRoute(){return this.path.length>0}get moving(){return this.velocity.lengthSq()>0}reset(){const[e,t]=as;this.position.set(e,T(e,t),t),this.velocity.set(0,0),this.heading=Math.PI,this.falling=!1,this.gravity=0,this.cancel()}cancel(){this.path.length=0,this.lastRange=1/0,this.obstruction=0}guide(e){this.cancel();const{x:t,z:s}=this.position;return this.falling||(this.path=Fn(this.land,t,s,e)),this.walkingRoute}update(e,t,s,i){if(t.lengthSq()>.001){this.cancel();const p=Math.cos(s),m=Math.sin(s);this.desired.set(t.x*p+t.y*m,-t.x*m+t.y*p)}else if(this.path.length){const[p,m]=this.path[0];this.desired.set(p-this.position.x,m-this.position.z);const d=this.desired.length();d<.32?(this.path.shift(),this.lastRange=1/0,this.obstruction=0):(this.obstruction=d+.005<this.lastRange?0:this.obstruction+e,this.lastRange=d,this.obstruction>1.35&&this.cancel()),this.desired.multiplyScalar(1/Math.max(1,d)),this.path.length||this.desired.set(0,0)}else this.desired.set(0,0);const a=this.walkingRoute||i?Nt:Bn;if(this.desired.multiplyScalar(a),this.falling)return this.gravity-=14.3*e,this.position.y+=this.gravity*e,this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.y*e,this.position.y<-7.7?(this.reset(),!0):!1;const n=this.desired.lengthSq()>.04?12.4:15.1;this.velocity.lerp(this.desired,1-Math.exp(-n*e)),this.velocity.lengthSq()<.001&&this.velocity.set(0,0);const r=this.position.x,l=this.position.z,h=r+this.velocity.x*e,f=l+this.velocity.y*e;this.canMove(h,f)?(this.position.x=h,this.position.z=f):(this.canMove(h,l)&&(this.position.x=h),this.canMove(this.position.x,f)&&(this.position.z=f));const c=this.position.x-r,u=this.position.z-l;if(Math.abs(c)+Math.abs(u)>4e-4){const p=Math.atan2(c,u),m=Math.atan2(Math.sin(p-this.heading),Math.cos(p-this.heading));this.heading+=m*(1-Math.exp(-e*14))}else this.desired.lengthSq()>.04&&this.velocity.multiplyScalar(.55);return xe(this.position.x,this.position.z)>1.003?(this.falling=!0,this.cancel()):this.position.y=T(this.position.x,this.position.z),!1}canMove(e,t){const s=T(e,t);return s>re-.19&&s-this.position.y<.27&&!this.land.solid(e,t,uo,s+.04,s+1.57)}}const So=1.22;function so(o){Tt.common.includes("NIGHT_ACES")||(Tt.common+=`
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
    `,Tt.tonemapping_fragment=`
      #if defined( TONE_MAPPING )
        gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
      #elif defined( NIGHT_ACES )
        gl_FragColor.rgb = nightAces( gl_FragColor.rgb );
      #endif
    `);const e=new Set;o.traverse(t=>{if(t instanceof F||t instanceof io||t instanceof Ft)for(const s of Array.isArray(t.material)?t.material:[t.material])e.has(s)||!s.toneMapped||s.defines?.NIGHT_ACES||(e.add(s),s.defines={...s.defines,NIGHT_ACES:So.toFixed(3)},s.needsUpdate=!0)})}function Dn(o){const e=new Rn,t={antialias:!e.light,alpha:!1,powerPreference:"default",stencil:!1},s=o.canvas.getContext("webgl2",t);if(!s)return null;const i=new Yo({canvas:o.canvas,context:s,...t});i.toneMapping=no,i.toneMappingExposure=So,i.shadowMap.enabled=!0,i.shadowMap.type=Zo,i.shadowMap.autoUpdate=!1,i.shadowMap.needsUpdate=!0;const a=new Jo;a.fog=new es("#0b0e28",.0046);const n=new $;a.add(n),a.add(new ts("#94a6ff","#43305a",1.55));const r=new St("#c7d4ff",2.05);r.position.set(-24,33,24),r.castShadow=!0,r.shadow.mapSize.setScalar(e.light?1024:2048),Object.assign(r.shadow.camera,{near:2,far:96,left:-32,right:32,top:31,bottom:-31}),r.shadow.camera.updateProjectionMatrix(),r.shadow.normalBias=.049,r.shadow.bias=-21e-5,r.shadow.radius=3,r.shadow.intensity=.79,a.add(r);const l=new St("#d58cff",1.35);l.position.set(12,14,-35),a.add(l);const h=new St("#5ce6d6",.55);h.position.set(-34,8,-12),a.add(h);const f=new Cs,c={value:0},u=dn(Nt,se);a.add(u.root),Ps(n,c,e.light),an(n);let p=!1;const m=Ws(n,f,c,()=>{p&&so(a),i.shadowMap.needsUpdate=!0,se()}),d=Qs(n,f,se);Xs(n,!e.light),Pn(n,f,c,e.light),zs(n);const g=new Un(f),w=new Cn(f);let x=null;e.light||(x=new ds(i,new We(1,1,{type:qe,samples:4})),x.addPass(new ps(a,w.camera)),x.addPass(new Ie(new V(1,1),.6,.4,.94)),x.addPass(new us),i.toneMapping=os,so(a),p=!0);const P=Object.values(me).map(k=>{const[N,U]=k.landmark,Q=T(N,U),[ne,H,Z]=k.hit;return{...k,point:new C(N+(k.id==="hanzizap"?2.1:0),Q+k.signHeight,U),box:new co(new C(N-ne/2,Q-.5,U-Z/2),new C(N+ne/2,Q+H,U+Z/2))}}),R=[...P,...d],z=new C,b=new C,M=new C,S=new ss,A=new V,Y=new AbortController,L={signal:Y.signal};let X="overview",D=null,I=null,j=!1,De=!1,Je=!1,yt=!0,_e=!0,Ge=0,Le=0,ge=1,ve=1,Ne=0;const bt=()=>!j&&!De&&!Je;function se(){bt()&&!document.hidden&&Ge===0&&(Ge=requestAnimationFrame(Po))}function ze(k,N){X!==k&&(X=k,Ne=.72,o.mode(X),X==="overview"&&(He(),g.velocity.set(0,0),le.clear())),N&&o.canvas.focus({preventScroll:!0}),se()}function He(){g.cancel(),I&&(I=null,o.walking(null))}function Ht(){He(),g.reset(),w.recenter(),_e=!0,o.status("Back at arrival."),ze("walk",!0)}function Ot(k,N){const U=o.canvas.getBoundingClientRect();A.set((k-U.left)/U.width*2-1,1-(N-U.top)/U.height*2),S.setFromCamera(A,w.camera);let Q=1/0,ne=null;for(const H of R){if(!S.ray.intersectBox(H.box,b))continue;const Z=b.distanceTo(S.ray.origin);Z<Q&&(Q=Z,ne=H.id)}if(!ne)return null;for(let H=1;H<Q;H+=.9)if(S.ray.at(H,M),xe(M.x,M.z)<.985&&M.y+.2<T(M.x,M.z))return null;return ne}const le=new An(o.canvas,o.stick,o.paceButton,{active:bt,invalidate:se,reset:Ht,hover:(k,N)=>o.canvas.toggleAttribute("data-inspectable",Ot(k,N)!==null),pick:(k,N)=>{const U=Ot(k,N);U&&o.inspect(U)},look:(k,N)=>{ze("walk",!0),w.turn(k,N),se()},inspect:()=>{D&&o.inspect(D)}});function Mt(){const k=o.viewport.getBoundingClientRect();ge=Math.max(1,k.width),ve=Math.max(1,k.height),i.setPixelRatio(e.pixels(ge,ve)),i.setSize(ge,ve,!1),x&&(x.setPixelRatio(i.getPixelRatio()),x.setSize(ge,ve)),w.resize(ge,ve),_e=!0,se()}function To(){const k=X==="overview",N=ge/ve<.76,U=Ne>.4;let Q=null,ne=3.04;for(const H of P){const Z=Math.hypot(g.position.x-H.approach[0],g.position.z-H.approach[1]);!k&&!g.falling&&Z<ne&&(ne=Z,Q=H.id),z.copy(H.point).project(w.camera);const Ae=(z.x+1)*.5*ge,Oe=(1-z.y)*.5*ve,Co=z.z>-1&&z.z<1&&Ae>49&&Ae<ge-49&&Oe>(N?82:105)&&Oe<ve-95,_o=k?H.id!=="observatory"&&H.id!=="workshop":!U&&Z<29&&Z>3.9;o.sign(H.id,Co&&_o?{x:Ae,y:Oe}:null)}D!==Q&&(D=Q,o.nearby(Q))}function et(){cancelAnimationFrame(Ge),Ge=0,Le=0}function Po(k){if(Ge=0,!bt()||document.hidden)return;const N=Le?Math.max(0,(k-Le)/1e3):0,U=Math.min(N||1/60,.065),Q=oo.matches;if(Le=k,Ne=Math.max(0,Ne-U),le.axes.lengthSq()>.001&&ze("walk",!1),X==="walk"){const ne=U>.033?2:1;let H=!1;for(let Z=0;Z<ne;Z++)if(g.update(U/ne,le.axes,w.yaw,le.walkHeld)){H=!0;break}if(H&&(w.recenter(),_e=!0,o.status("You returned to arrival.")),I&&!g.walkingRoute){const Z=me[I].name,Ae=me[I].approach,Oe=Math.hypot(g.position.x-Ae[0],g.position.z-Ae[1])<.85;o.status(Oe?`Arrived at ${Z}.`:"Assisted walk ended."),I=null,o.walking(null)}}Q||(c.value+=U),m(),w.update(U,g.position,X==="walk",c.value,Q,_e),u.update(g.position,g.heading,U,w.camera,le.walkHeld||!!I,g.falling,_e),_e=!1,x?x.render(U):i.render(a,w.camera),yt&&u.ready&&(yt=!1,o.ready(!0)),To(),!Q&&e.measure(N)&&Mt(),!Q||g.falling||g.walkingRoute||g.moving||le.axes.lengthSq()>0||Ne>0?se():Le=0}const Vt=new ResizeObserver(Mt);return Vt.observe(o.viewport),Mt(),oo.addEventListener("change",se,L),document.addEventListener("visibilitychange",()=>{document.hidden?(le.clear(),et()):se()},L),o.canvas.addEventListener("webglcontextlost",k=>{k.preventDefault(),De=!0,et(),He(),le.clear(),o.ready(!1)},L),o.canvas.addEventListener("webglcontextrestored",()=>{De=!1,yt=!0,i.shadowMap.needsUpdate=!0,se()},L),{play:()=>ze("walk",!0),overview:()=>ze("overview",!1),pause(k){j=k,j?(le.clear(),et()):se()},walk(k){if(He(),ze("walk",!0),!g.guide(me[k].approach)){o.status("Walk from arrival or select another destination.");return}I=k,o.walking(k),o.status(`Walking to ${me[k].name}.`)},stopWalking:He,reset:Ht,dispose(){Je=!0,et(),Y.abort(),Vt.disconnect(),le.dispose(),r.shadow.dispose(),x?.dispose(),En(a),i.dispose()}}}const Hn=Object.freeze(Object.defineProperty({__proto__:null,createIsland:Dn},Symbol.toStringTag,{value:"Module"}));export{En as d,Hn as i,Nn as t};
