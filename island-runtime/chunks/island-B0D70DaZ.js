const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./pocketOrbitShuttle-CBbrilQp.js","./three-Da-3Iyaf.js","./shared-C-DZESF8.js"])))=>i.map(i=>d[i]);
import{M as E,O as Ss,B as te,F as L,S as ae,U as Ze,V as K,W as Ye,H as $e,N as Ts,T as zs,R as Cs,C as Ps,a as _s,L as As,b as ks,c as Rs,A as qo,d as Es,e as Ds,f as Is,g as D,h as M,i as Pe,j as Z,k as Bs,l as Dt,P as jo,m as To,n as Fs,o as zo,p as Ut,q as Os,r as Te,s as ot,t as Tt,u as Be,v as st,w as Ls,D as nt,x as de,y as wt,z as Gs,E as co,G as at,I as Ot,J as Ns,K as Us,Q as Co,X as Ws,Y as Wt,Z as lo,_ as Hs,$ as Xo,a0 as H,a1 as Se,a2 as fo,a3 as Yo,a4 as $o,a5 as Qo,a6 as Xe,a7 as Vs,a8 as Po,a9 as qs,aa as Lt,ab as js,ac as _o,ad as Xs,ae as Ys,af as $s,ag as Qs,ah as Ks,ai as Zs,aj as jt,ak as Js,al as Xt,am as en}from"./three-Da-3Iyaf.js";import{d as ge,_ as tn,r as on,a as eo,c as sn,Q as nn}from"./shared-C-DZESF8.js";const It={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class it{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const an=new Ss(-1,1,1,-1,0,1);class rn extends te{constructor(){super(),this.setAttribute("position",new L([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new L([0,2,0,0,2,0],2))}}const cn=new rn;class uo{constructor(e){this._mesh=new E(cn,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,an)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ln extends it{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ae?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ze.clone(e.uniforms),this.material=new ae({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new uo(this.material)}render(e,t,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ao extends it{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,o){const a=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let n,r;this.inverse?(n=0,r=1):(n=1,r=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),i.buffers.stencil.setFunc(a.ALWAYS,n,4294967295),i.buffers.stencil.setClear(r),i.buffers.stencil.setLocked(!0),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(a.EQUAL,1,4294967295),i.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),i.buffers.stencil.setLocked(!0)}}class dn extends it{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class fn{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const o=e.getSize(new K);this._width=o.width,this._height=o.height,t=new Ye(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$e}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ln(It),this.copyPass.material.blending=Ts,this.timer=new zs}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let o=!1;for(let a=0,i=this.passes.length;a<i;a++){const n=this.passes[a];if(n.enabled!==!1){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,o),n.needsSwap){if(o){const r=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Ao!==void 0&&(n instanceof Ao?o=!0:n instanceof dn&&(o=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new K);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const o=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(o,a),this.renderTarget2.setSize(o,a);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(o,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Pt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class un extends it{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ze.clone(Pt.uniforms),this.material=new Cs({name:Pt.name,uniforms:this.uniforms,vertexShader:Pt.vertexShader,fragmentShader:Pt.fragmentShader}),this._fsQuad=new uo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,o){this.uniforms.tDiffuse.value=o.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ps.getTransfer(this._outputColorSpace)===_s&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===As?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ks?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Rs?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===qo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Es?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ds?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Is&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class hn extends it{constructor(e,t,o=null,a=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=o,this.clearColor=a,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new D}render(e,t,o){const a=e.autoClear;e.autoClear=!1;let i,n;this.overrideMaterial!==null&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=n),e.autoClear=a}}const pn={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new D(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Je extends it{constructor(e,t=1,o,a){super(),this.strength=t,this.radius=o,this.threshold=a,this.resolution=e!==void 0?new K(e.x,e.y):new K(256,256),this.clearColor=new D(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new Ye(i,n,{type:$e,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const c=new Ye(i,n,{type:$e,depthBuffer:!1});c.texture.name="UnrealBloomPass.h"+f,c.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(c);const d=new Ye(i,n,{type:$e,depthBuffer:!1});d.texture.name="UnrealBloomPass.v"+f,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),i=Math.round(i/2),n=Math.round(n/2)}const r=pn;this.highPassUniforms=Ze.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ae({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];i=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new K(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new M(1,1,1),new M(1,1,1),new M(1,1,1),new M(1,1,1),new M(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ze.clone(It.uniforms),this.blendMaterial=new ae({uniforms:this.copyUniforms,vertexShader:It.vertexShader,fragmentShader:It.fragmentShader,premultipliedAlpha:!0,blending:Pe,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new D,this._oldClearAlpha=1,this._basic=new Z,this._fsQuad=new uo(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let o=Math.round(e/2),a=Math.round(t/2);this.renderTargetBright.setSize(o,a);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(o,a),this.renderTargetsVertical[i].setSize(o,a),this.separableBlurMaterials[i].uniforms.invSize.value=new K(1/o,1/a),o=Math.round(o/2),a=Math.round(a/2)}render(e,t,o,a,i){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const n=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=o.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let r=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[l].uniforms.direction.value=Je.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Je.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),r=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(o),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=n}_getSeparableBlurMaterial(e){const t=[],o=e/3;for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(o*o))/o);const a=[],i=[];for(let n=1;n<e;n+=2){const r=t[n],l=n+1<e?t[n+1]:0,u=r+l;a.push((n*r+(n+1)*l)/u),i.push(u)}return new ae({defines:{KERNEL_PAIRS:a.length},uniforms:{colorTexture:{value:null},invSize:{value:new K(.5,.5)},direction:{value:new K(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:a},gaussianWeights:{value:i}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new ae({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Je.BlurDirectionX=new K(1,0);Je.BlurDirectionY=new K(0,1);class mn extends E{constructor(e,t={}){super(e),this.isWater=!0;const o=this,a=t.textureWidth!==void 0?t.textureWidth:512,i=t.textureHeight!==void 0?t.textureHeight:512,n=t.clipBias!==void 0?t.clipBias:0,r=t.alpha!==void 0?t.alpha:1,l=t.time!==void 0?t.time:0,u=t.waterNormals!==void 0?t.waterNormals:null,f=t.sunDirection!==void 0?t.sunDirection:new M(.70707,.70707,0),c=new D(t.sunColor!==void 0?t.sunColor:16777215),d=new D(t.waterColor!==void 0?t.waterColor:8355711),h=t.eye!==void 0?t.eye:new M(0,0,0),m=t.distortionScale!==void 0?t.distortionScale:20,p=t.side!==void 0?t.side:Bs,g=t.fog!==void 0?t.fog:!1,v=new Fs,x=new M,w=new M,b=new M,C=new Dt,P=new M(0,0,-1),S=new zo,T=new M,_=new M,I=new zo,V=new Dt,N=new jo,X=new Ye(a,i,{type:$e}),q={name:"MirrorShader",uniforms:Ze.merge([To.fog,To.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new Dt},sunColor:{value:new D(8355711)},sunDirection:{value:new M(.70707,.70707,0)},eye:{value:new M},waterColor:{value:new D(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.02;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), reflectionSample + specularLight, reflectance );
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <fog_fragment>	
				}`},z=new ae({name:q.name,uniforms:Ze.clone(q.uniforms),vertexShader:q.vertexShader,fragmentShader:q.fragmentShader,lights:!0,side:p,fog:g});z.uniforms.mirrorSampler.value=X.texture,z.uniforms.textureMatrix.value=V,z.uniforms.alpha.value=r,z.uniforms.time.value=l,z.uniforms.normalSampler.value=u,z.uniforms.sunColor.value=c,z.uniforms.waterColor.value=d,z.uniforms.sunDirection.value=f,z.uniforms.distortionScale.value=m,z.uniforms.eye.value=h,o.material=z,o.onBeforeRender=function(k,F,W){if(w.setFromMatrixPosition(o.matrixWorld),b.setFromMatrixPosition(W.matrixWorld),C.extractRotation(o.matrixWorld),x.set(0,0,1),x.applyMatrix4(C),T.subVectors(w,b),T.dot(x)>0)return;T.reflect(x).negate(),T.add(w),C.extractRotation(W.matrixWorld),P.set(0,0,-1),P.applyMatrix4(C),P.add(b),_.subVectors(w,P),_.reflect(x).negate(),_.add(w),N.position.copy(T),N.up.set(0,1,0),N.up.applyMatrix4(C),N.up.reflect(x),N.lookAt(_),N.far=W.far,N.updateMatrixWorld(),N.projectionMatrix.copy(W.projectionMatrix),V.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),V.multiply(N.projectionMatrix),V.multiply(N.matrixWorldInverse),v.setFromNormalAndCoplanarPoint(x,w),v.applyMatrix4(N.matrixWorldInverse),S.set(v.normal.x,v.normal.y,v.normal.z,v.constant);const O=N.projectionMatrix;I.x=(Math.sign(S.x)+O.elements[8])/O.elements[0],I.y=(Math.sign(S.y)+O.elements[9])/O.elements[5],I.z=-1,I.w=(1+O.elements[10])/O.elements[14],S.multiplyScalar(2/S.dot(I)),O.elements[2]=S.x,O.elements[6]=S.y,O.elements[10]=S.z+1-n,O.elements[14]=S.w,h.setFromMatrixPosition(W.matrixWorld);const se=k.getRenderTarget(),Ce=k.xr.enabled,Fe=k.shadowMap.autoUpdate;o.visible=!1,k.xr.enabled=!1,k.shadowMap.autoUpdate=!1,k.setRenderTarget(X),k.state.buffers.depth.setMask(!0),k.autoClear===!1&&k.clear(),k.render(F,N),o.visible=!0,k.xr.enabled=Ce,k.shadowMap.autoUpdate=Fe,k.setRenderTarget(se);const he=W.viewport;he!==void 0&&k.state.viewport(he)}}}const et=[26,20],Ie=-42,fe=-.45,ne=[-16.4,7.85],Ko=2.41,Zo=.32;function ue(s){return()=>(s=Math.imul(1664525,s)+1013904223|0,(s>>>0)/4294967296)}function Jo(s){return 1+.074*Math.sin(s*3+.7)+.086*Math.cos(s*5-.58)+.031*Math.sin(s*11+.52)+.018*Math.cos(s*19)}function _e(s,e=1){const t=Jo(s)*e;return[Math.cos(s)*et[0]*t,Math.sin(s)*et[1]*t]}function ze(s,e){const t=s/et[0],o=e/et[1];return Math.hypot(t,o)/Jo(Math.atan2(o,t))}function ft(s,e,t,o,a){return Math.exp(-(((s-t[0])/o)**2+((e-t[1])/a)**2))}const Gt=_e(Ko),je=[Gt[0]-ne[0],Gt[1]-ne[1]];function gn(s,e){const t=Math.max(0,Math.min(1.1,((s-ne[0])*je[0]+(e-ne[1])*je[1])/(je[0]**2+je[1]**2))),o=ne[0]+je[0]*t,a=ne[1]+je[1]*t;return Math.exp(-((s-o)**2+(e-a)**2)/1.16)}function R(s,e){const t=ft(s,e,ge.observatory.landmark,7.1,5.8)*3.7,o=ft(s,e,ge["pocket-orbit"].landmark,5.3,5.9)*1.75,a=ft(s,e,[-19.1,-5.7],7.4,5.5)*1.15,i=ft(s,e,[15.6,10],6.8,5.5)*.61,n=ft(s,e,ne,3.9,3.3)*1.9+gn(s,e)*.92;return .42+Math.sin(s*.19+e*.24)*.29+Math.cos(e*.31-s*.12)*.32+Math.sin(s*.36+e*.18)*.15+t+o+a+i-n}function es(){const s=Math.atan2(-ne[1],-ne[0]);return[-.95,1.05].map(e=>{const t=s+e;for(let o=1.5;o<9;o+=.1){const a=ne[0]+Math.cos(t)*o,i=ne[1]+Math.sin(t)*o;if(R(a,i)>fe+.15)return[a+Math.cos(t)*.55,i+Math.sin(t)*.55]}return[ne[0]+Math.cos(t)*4,ne[1]+Math.sin(t)*4]})}const ut={cyan:"#27cfe3",violet:"#676bdb",magenta:"#bd4f91",indigo:"#172b78",gold:"#d6aa63"},vn=()=>`
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
  ${rt}
  ${ho}


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
`;function wn(){const s=document.createElement("canvas");s.width=s.height=64;const e=s.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,.9)"),t.addColorStop(.5,"rgba(255,255,255,.3)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new Be(s)}function xn(s,e,t,o,a){const i=new Ut().load(new URL("./island-media/water-normals.jpg",document.baseURI).href);i.wrapS=i.wrapT=Os;const n=new mn(new Te(1400,1400),{textureWidth:t?512:4,textureHeight:t?512:4,waterNormals:i,sunDirection:a.clone().normalize(),sunColor:"#5a66a0",waterColor:"#04122a",distortionScale:3.2,alpha:1,fog:!1});n.name="Dream Ocean",n.rotation.x=-Math.PI/2,n.position.y=Ie,n.receiveShadow=!0;const r=n.material;r.uniforms.size.value=2.6;const l={uDreamOceanCyan:{value:new D(ut.cyan)},uDreamOceanViolet:{value:new D(ut.violet)},uDreamOceanMagenta:{value:new D(ut.magenta)},uDreamOceanIndigo:{value:new D(ut.indigo)},uDreamOceanGold:{value:new D(ut.gold)},uDreamOceanBandScale:{value:3.2},uDreamOceanTint:{value:.46},uDreamOceanGlint:{value:1},clock:e,uSplash:{value:o.slice(0,5)},uReflect:{value:t?1:0}};if(Object.assign(r.uniforms,l),r.fragmentShader=r.fragmentShader.replace("void main() {",`${vn()}
 uniform float uReflect;
 void main() {`).replace("vec3 reflectionSample = vec3(","vec3 reflectionSample = uReflect * vec3(").replace("#include <tonemapping_fragment>",`
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
      #include <tonemapping_fragment>`),r.needsUpdate=!0,s.add(n),t){const c=n.onBeforeRender;let d=0;n.onBeforeRender=function(...h){(d++&1)===0&&c.apply(this,h)}}else n.onBeforeRender=()=>{};const u=wn(),f=o.flatMap(c=>Array.from({length:9},(d,h)=>{const m=new ot(new Tt({map:u,color:"#bcd6ff",transparent:!0,depthWrite:!1,toneMapped:!1,blending:Pe,opacity:0}));return s.add(m),{sprite:m,splash:c,phase:h/9}}));return()=>{r.uniforms.time.value=e.value;const c=e.value;for(const d of f){const h=(c*.22+d.phase)%1,m=d.phase*41.3,p=1+h*5.5;d.sprite.position.set(d.splash.x+Math.cos(m)*p,Ie+.6+h*6.5,d.splash.z+Math.sin(m)*p),d.sprite.scale.setScalar(3+h*9),d.sprite.material.opacity=Math.sin(h*Math.PI)*.2}}}const rt=`
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
`,Bt=`
  varying vec2 coords;
  varying vec3 worldPoint;
  void main() {
    coords = uv;
    vec4 p = modelMatrix * vec4(position, 1.0);
    worldPoint = p.xyz;
    gl_Position = projectionMatrix * viewMatrix * p;
  }
`,ho=`
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
`,yn=`
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
`,Mn=`
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${rt}
  ${ho}
  ${yn}

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
`,bn=`
  #include <common>
  uniform float clock;
  uniform float isPool;
  varying vec3 worldPoint;
  #ifdef POOL_LAMPS
  uniform vec3 lampPos[3];
  uniform vec3 lampTint[3];
  #endif
  ${rt}
  ${ho}

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
`,Sn=`
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${rt}
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
`;function Tn(s,e,t,o,a,i,n){const r=new E(new Te(e,t),n);return r.rotation.x=-Math.PI/2,r.position.set(o,a,i),s.add(r),r}function zn(s,e){const t=[],o=[],a=[],n=(l,u)=>{const f=Gt[0]-2.2+l*.21,c=ne[1]-4.8+u*.21;return ze(f,c)<=1.002&&R(f,c)<fe+.43};for(let l=0;l<=70;l++)for(let u=0;u<=70;u++){if(t.push(Gt[0]-2.2+u*.21,fe,ne[1]-4.8+l*.21),o.push(u/70,l/70),!l||!u||!n(u,l)||!n(u-1,l-1))continue;const f=l*71+u,c=f-70-2;n(u-1,l)&&a.push(c,f-1,f),n(u,l-1)&&a.push(c,f,f-70-1)}const r=new te;r.setAttribute("position",new L(t,3)),r.setAttribute("uv",new L(o,2)),r.setIndex(a),s.add(new E(r,e))}function Cn(s){return new ae({uniforms:{clock:s},transparent:!0,depthWrite:!1,side:nt,toneMapped:!1,vertexShader:Bt,fragmentShader:`
      uniform float clock;
      varying vec2 coords;
      ${rt}
      void main() {
        vec2 p = vec2(coords.x * 17.0, coords.y * 26.0 - clock * 4.4);
        float film = layers(p) * .45 + .55 * field(p * vec2(1.85, .33) + 6.0);
        float ribbons = smoothstep(.39, .77, film);
        float edge = smoothstep(0.0, .16, coords.x) * (1.0 - smoothstep(.84, 1.0, coords.x));
        float alpha = edge * (1.0 - smoothstep(.985, 1.0, coords.y)) * (.42 + .53 * ribbons);
        vec3 color = mix(vec3(.22, .42, .58), vec3(.66, .84, .95), ribbons);
        gl_FragColor = vec4(color * color, alpha);
        #include <colorspace_fragment>
      }
    `})}function ts(s,e,t,o=60,a=15){const i=[],n=[],r=[];for(let c=0;c<=o;c++){const d=c/o;for(let h=0;h<=a;h++){const m=h/a;if(i.push(...t(m,d)),n.push(m,d),c===0||h===0)continue;const p=c*(a+1)+h,g=p-a-1;r.push(g-1,g,p,g-1,p,p-1)}}const l=new te;l.setAttribute("position",new L(i,3)),l.setAttribute("uv",new L(n,2)),l.setIndex(r),s.add(new E(l,e));const[u,,f]=t(.5,1);return new M(u,Ie,f)}function Pn(s,e){return ts(s,e,(t,o)=>{const a=Ko+(t-.5)*(.109+.07*o),[i,n]=_e(a,1.003+Math.sin(o*2.1)*.057),r=Math.max(fe+.06,R(i,n)+.02);return[i-o*.19,r+(Ie-r)*o,n+Math.sin(o*2.5)*.71]})}function _n(s){const e=(t,o,a)=>{const i=Math.sin(s*5+t*.59)*.67+Math.cos(s*13-.9)*.22,n=Math.sin(s*39+.4)*.2+Math.cos(s*49)*.12,r=(i+n)*(.031+t*.003),[l,u]=_e(s,o+r),[f,c]=_e(s),d=Math.sin(s*4+.6)*.55+i*.44;return new M(l-t*t*.025,a+R(f,c)/(1+t*.18)+d,u+t*t*.022)};return e(2,.96,-2.1).lerp(e(3,.985,-3.05),.5)}const An=[1.22,.3,3.55,4.95];function kn(s,e){const t=new Z({color:"#05040c"}),o=new de({color:"#5d5163",roughness:.9,flatShading:!0}),a=new wt(1,0),i=ue(4411);return An.map(n=>{const r=_n(n),l=new M(r.x/et[0]**2,0,r.z/et[1]**2).normalize(),u=new M(-l.z,0,l.x),f=r.clone().addScaledVector(l,.12),c=new E(new Gs(1,20),t);c.scale.set(.95,.72,1),c.position.copy(f).addScaledVector(l,-.05).add(new M(0,.35,0)),c.lookAt(c.position.clone().add(l)),s.add(c);for(let h=0;h<9;h++){const m=h/9*Math.PI*2,p=new E(a,o);p.position.copy(f).addScaledVector(u,Math.cos(m)*1.05).add(new M(0,.35+Math.sin(m)*.8,0)).addScaledVector(l,.1+i()*.12),p.scale.setScalar(.28+i()*.2),p.rotation.set(i()*6,i()*6,i()*6),s.add(p)}const d=f.clone().add(new M(0,-.12,0));return ts(s,e,(h,m)=>{const p=1.5*Math.sqrt(m)+m*.8,g=.55+m*1.6;return[d.x+l.x*p+u.x*(h-.5)*g,d.y+(Ie-d.y)*m*m*.35+(Ie-d.y)*m*.65,d.z+l.z*p+u.z*(h-.5)*g]},70,12)})}function Rn(s,e){const t={value:0},o=new Ut().load("./island-media/dream-ocean-reflections.webp",()=>{t.value=1,e()});return o.colorSpace=at,o.magFilter=Ot,o.minFilter=Ot,o.generateMipmaps=!1,new ae({uniforms:{clock:s,heroes:{value:o},reflectionReady:t},toneMapped:!1,side:nt,vertexShader:`
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
      ${rt}
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
    `})}function En(s,e,t){const o=ue(6067),a=[],i=[],n=[];for(let u=0;u<t;u++){const f=(o()-.5)*48,c=(o()-.5)*34;a.push(f,R(f,c)+o()*5+.35,c),i.push(o()*6.283),n.push(o())}const r=new te;r.setAttribute("position",new L(a,3)),r.setAttribute("phase",new L(i,1)),r.setAttribute("hue",new L(n,1));const l=new ae({uniforms:{clock:e},transparent:!0,depthWrite:!1,toneMapped:!1,blending:Pe,vertexShader:`
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
    `});s.add(new co(r,l))}function Dn(s,e,t,o){const a=new E(new st(510,32,20),new ae({uniforms:{clock:e},vertexShader:Bt,fragmentShader:Mn,side:Ls,depthWrite:!1,fog:!1}));a.renderOrder=-10,a.frustumCulled=!1,s.add(a);const n=(f=>new ae({uniforms:{clock:e,isPool:{value:f}},vertexShader:Bt,fragmentShader:bn}))(1),r=[...es().map(([f,c])=>new M(f,R(f,c)+.78,c)),new M(-15.2,R(-15.2,-1.4)+2.4,-1.4)];n.defines={POOL_LAMPS:""},n.uniforms.lampPos={value:r},n.uniforms.lampTint={value:[new D(1,.62,.26),new D(1,.62,.26),new D(.4,.66,1)]},zn(s,n),Tn(s,830,830,0,Ie+3.5,0,new ae({uniforms:{clock:e},vertexShader:Bt,fragmentShader:Sn,transparent:!0,depthWrite:!1}));const l=Cn(e),u=[Pn(s,l),...kn(s,l)];return En(s,e,t?90:240),xn(s,e,!t,u,o)}class In{obstacles=[];add(e,t,o,a,i,n,r=0){this.obstacles.push({x:e,z:t,halfWidth:o/2,halfDepth:a/2,bottom:i,top:i+n,cosine:Math.cos(r),sine:Math.sin(r)})}solid(e,t,o,a,i){return this.obstacles.some(n=>{if(a>=n.top||i<=n.bottom)return!1;const r=e-n.x,l=t-n.z,u=Math.abs(r*n.cosine-l*n.sine)-n.halfWidth,f=Math.abs(r*n.sine+l*n.cosine)-n.halfDepth,c=Math.max(u,0),d=Math.max(f,0);return c*c+d*d<o*o})}canStand(e,t,o=0){const a=R(e,t);return ze(e,t)<.994-o&&a>fe-.18&&!this.solid(e,t,Zo,a+.06,a+1.52)}clearPath(e,t,o,a){const i=Math.max(1,Math.ceil(Math.hypot(o-e,a-t)/.28));let n=R(e,t);for(let r=1;r<=i;r++){const l=e+(o-e)*r/i,u=t+(a-t)*r/i,f=R(l,u);if(Math.abs(f-n)>.28||!this.canStand(l,u,.022))return!1;n=f}return!0}}function gt(s,e=!1){const t=s[0].index!==null,o=new Set(Object.keys(s[0].attributes)),a=new Set(Object.keys(s[0].morphAttributes)),i={},n={},r=s[0].morphTargetsRelative,l=new te;l.morphTargetsRelative=r;let u=0;for(let f=0;f<s.length;++f){const c=s[f];let d=0,h=0;if(t!==(c.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in c.attributes){if(!o.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;i[m]===void 0&&(i[m]=[]),i[m].push(c.attributes[m]),d++}if(d!==o.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(r!==c.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in c.morphAttributes){if(!a.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;if(c.morphAttributes[m].length!==s[0].morphAttributes[m].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have the same number of morph targets for the "'+m+'" morph attribute.'),null;n[m]===void 0&&(n[m]=[]),n[m].push(c.morphAttributes[m]),h++}if(h!==a.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of morph attributes."),null;if(e){let m;if(t)m=c.index.count;else if(c.attributes.position!==void 0)m=c.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;l.addGroup(u,m,f),u+=m}}if(t){let f=0;const c=[];for(let d=0;d<s.length;++d){const h=s[d].index;for(let m=0;m<h.count;++m)c.push(h.getX(m)+f);f+=s[d].attributes.position.count}l.setIndex(c)}for(const f in i){const c=ko(i[f]);if(!c)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;l.setAttribute(f,c)}for(const f in n){const c=n[f][0].length;if(c!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[f]=[];for(let d=0;d<c;++d){const h=[];for(let p=0;p<n[f].length;++p)h.push(n[f][p][d]);const m=ko(h);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;l.morphAttributes[f].push(m)}}}return l}function ko(s){let e,t,o,a=-1,i=0;for(let u=0;u<s.length;++u){const f=s[u];if(e===void 0&&(e=f.array.constructor),e!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=f.itemSize),t!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(o===void 0&&(o=f.normalized),o!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(a===-1&&(a=f.gpuType),a!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;i+=f.count*t}const n=new e(i),r=new Ns(n,t,o);let l=0;for(let u=0;u<s.length;++u){const f=s[u];if(f.isInterleavedBufferAttribute){const c=l/t;for(let d=0,h=f.count;d<h;d++)for(let m=0;m<t;m++){const p=f.getComponent(d,m);r.setComponent(d+c,m,p)}}else n.set(f.array,l);l+=f.count*t}return a!==void 0&&(r.gpuType=a),r}function bi(s,e){if(e===Us)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Co||e===Ws){let t=s.getIndex();if(t===null){const i=[],n=s.getAttribute("position");if(n!==void 0){for(let r=0;r<n.count;r++)i.push(r);s.setIndex(i),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const o=t.count-2,a=[];if(e===Co)for(let i=1;i<=o;i++)a.push(t.getX(0)),a.push(t.getX(i)),a.push(t.getX(i+1));else for(let i=0;i<o;i++)i%2===0?(a.push(t.getX(i)),a.push(t.getX(i+1)),a.push(t.getX(i+2))):(a.push(t.getX(i+2)),a.push(t.getX(i+1)),a.push(t.getX(i)));return a.length/3!==o&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),s.setIndex(a),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}const B=(s,e=.83,t=0)=>new de({color:s,roughness:e,metalness:t});function ce(s,e=.75){return new de({color:s,emissive:s,emissiveIntensity:e,roughness:.52})}function U(s,e,t,o=0,a=0,i=0){const n=new E(e,t);return n.position.set(o,a,i),n.castShadow=!0,n.receiveShadow=!0,n.userData.bake=!0,s.add(n),n}function y(s,e,t,o,a,i,n,r){return U(s,new Hs(t,o,a),e,i,n,r)}function A(s,e,t,o,a,i,n,r,l=10){return U(s,new Xo(t,o,a,l),e,i,n,r)}function oe(s,e,t,o,a=0,i=0,n=0,r=0){const l=new Wt;t.forEach(([f,c],d)=>d?l.lineTo(f,c):l.moveTo(f,c)),l.closePath();const u=new lo(l,{depth:o,bevelEnabled:r>0,bevelSize:r,bevelThickness:r,bevelSegments:1,steps:1});return U(s,u,e,a,i,n-o/2)}const po=s=>new L(s.flatMap(e=>[e.r,e.g,e.b]),3);function Bn(s){s.updateMatrixWorld(!0);const e=new Map;s.traverse(t=>{if(!(t instanceof E)||!t.userData.bake||Array.isArray(t.material))return;const o=t.material,a=o.uuid;e.has(a)||e.set(a,{material:o,sources:[],geometries:[]});const i=e.get(a),n=t.geometry.index?t.geometry.toNonIndexed():t.geometry.clone();n.applyMatrix4(t.matrixWorld),i.sources.push(t),i.geometries.push(n)});for(const{material:t,sources:o,geometries:a}of e.values()){const i=gt(a);for(const r of a)r.dispose();if(!i)continue;for(const r of o)r.geometry.dispose(),r.removeFromParent();const n=new E(i,t);n.castShadow=!0,n.receiveShadow=!0,s.add(n)}}const ee=B("#25384b",.64,.22),j=B("#49586c",.56,.24),to=B("#557c88",.54,.15),ye=B("#131c2b",.79),ie=B("#b47b57",.54,.26),re=new Z({color:"#6aefeb",toneMapped:!1}),tt=ce(16756065,2.2),mo=new Z({color:"#f589bc",toneMapped:!1}),os="#13cbb7",Me=(s,e)=>[(s-497)/436,(502-e)/436],ss=new Wt().moveTo(...Me(487,114)).quadraticCurveTo(...Me(498,105),...Me(510,114)).lineTo(...Me(715,293)).lineTo(...Me(715,724)).lineTo(...Me(510,890)).quadraticCurveTo(...Me(498,900),...Me(486,890)).lineTo(...Me(279,724)).lineTo(...Me(279,293)).closePath(),Oe=0,Le=0;function Fn(){const s=document.createElement("canvas");s.width=512,s.height=112;const e=s.getContext("2d");e.fillStyle="#1c2735",e.fillRect(0,0,512,112),e.fillStyle=os,e.save(),e.translate(48,56),e.scale(43,-43),e.beginPath(),ss.getPoints(6).forEach(({x:o,y:a},i)=>i?e.lineTo(o,a):e.moveTo(o,a)),e.closePath(),e.fill(),e.restore(),e.fillStyle="#ebeeef",e.font="750 48px system-ui, sans-serif",e.textBaseline="middle",e.fillText("ALHUISSI",83,54),e.fillStyle="#f4b674";for(let o=0;o<3;o++)e.fillRect(457+o*13,49,5,14);const t=new Be(s);return t.colorSpace=at,new Z({map:t,toneMapped:!1})}function On(s){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),o=t.createRadialGradient(64,64,0,64,64,63);o.addColorStop(0,"rgba(255,255,255,.8)"),o.addColorStop(.4,"rgba(255,255,255,.32)"),o.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=o,t.fillRect(0,0,128,128);const a=new Be(e),i=(l,u,f,c)=>new E(new Te(u,f),new Z({map:a,color:l,opacity:c,transparent:!0,blending:Pe,depthWrite:!1,toneMapped:!1})),n=i(4708838,3.6,1.8,.55);n.rotation.x=-Math.PI/2,n.position.set(.53,.217,2.83);const r=i(16357197,4.2,1.6,.5);r.rotation.x=-Math.PI/2,r.position.set(-2.04,.205,2.72),s.add(n,r)}function Ln(s,e){const t=new H;t.position.set(Oe,5.15,Le),t.rotation.set(-.14,.27,-.17),s.add(t),A(s,ee,.99,1.3,.37,Oe,3.5,Le,8),A(s,ie,.95,.99,.105,Oe,3.72,Le,8),A(s,ye,.73,.95,.31,Oe,3.89,Le,10);for(const n of[-1,1]){const r=[[0,0],[n*.49,.03],[n*.55,.82],[n*.88,1.46],[n*.57,1.59],[n*.09,1.04]];oe(s,j,r,.47,Oe+n*.85,3.57,Le,.045),oe(s,ie,r,.071,Oe+n*.85,3.57,Le+.27,.014)}U(t,new Se(1.57,.147,8,64),ee),U(t,new Se(1.64,.051,5,54),j,0,0,-.15),U(t,new Se(1.43,.044,6,56),ie,0,0,.073);for(let n=0;n<8;n++){const r=n*Math.PI/4;U(t,new Se(1.57,.041,5,9,.66),n===5?tt:re,0,0,.144).rotation.z=r+.065;const l=y(t,j,.255,.28,.33,Math.cos(r)*1.58,Math.sin(r)*1.58,.047);l.rotation.z=r;const u=y(t,ie,.155,.072,.04,l.position.x,l.position.y,.23);u.rotation.z=r}const o=new H;o.rotation.set(.69,-.69,.36),t.add(o),U(o,new Se(1.2,.069,6,48),j);for(const n of[.18,Math.PI+.18])U(o,new Se(1.2,.033,5,20,2.2),mo,0,0,.053).rotation.z=n;for(const n of o.children)n.userData.bake=!1,n.castShadow=!1;const a=new lo(ss,{depth:.12,bevelEnabled:!1,curveSegments:8});a.translate(0,0,-.06);const i=new E(a,new Z({color:os,toneMapped:!1,fog:!1}));return i.position.set(Oe,5.15,Le),s.add(i),()=>{o.rotation.x=.69+.26*Math.sin(e.value*.73),o.rotation.y=-.69+.53*Math.sin(e.value*.51),o.rotation.z=.36-e.value*.22,i.rotation.y=.21*Math.sin(e.value*.55)}}function Gn(s){const e=new Z({color:"#ffca92",toneMapped:!1}),t=ce(10510658,.9);y(s,t,3.41,1.79,.095,-2.16,1.66,1.16),y(s,ye,3.4,.13,.94,-2.16,2.62,1.7),y(s,ie,3.4,.13,.9,-2.16,.84,1.67),y(s,ee,2.91,.144,.62,-2.14,1.24,1.63),y(s,tt,2.89,.051,.045,-2.14,1.17,1.94);for(const a of[-3.27,-2.47,-1.5]){y(s,ye,.59,.44,.13,a,1.68,1.32),y(s,a===-2.47?re:e,.51,.35,.027,a,1.69,1.397),y(s,ee,.066,.19,.1,a,1.4,1.42);for(let i=0;i<8;i++){const n=.035+.11*Math.abs(Math.sin(i*.82+a));y(s,ye,.017,n,.009,a-.177+i*.05,1.7,1.417)}}y(s,ye,.9,.143,.31,-2.72,1.366,1.79);for(let a=0;a<12;a++)y(s,a%3===2?j:e,.054,.022,.15,-3.073+a*.065,1.45,1.826);for(const[a,i]of[-1.87,-1.73,-1.59,-1.45,-1.31].entries())A(s,ee,.036,.042,.048,i,1.38,1.74,8),y(s,a%2===0?re:tt,.048,.019,.031,i,1.36,1.83);const o=new E(new Te(3.47,1.78),new Z({color:"#7dc6d4",transparent:!0,opacity:.13,depthWrite:!1,side:nt}));o.position.set(-2.16,1.68,2.24),s.add(o);for(const a of[-3.91,-2.63,-1.55,-.5])y(s,j,.1,1.81,.18,a,1.67,2.23);for(const a of[.82,2.58])y(s,ee,3.58,.15,.27,-2.16,a,2.22);oe(s,j,[[-3.99,2.44],[-.46,2.44],[-.68,2.72],[-3.59,2.83]],.58,0,0,2.19,.034),y(s,ie,2.88,.049,.058,-2.08,2.59,2.52).rotation.z=-.029}function Nn(s){const e=[[-1.1,.48],[.91,.48],[1.19,.75],[1.19,2.1],[.86,2.46],[-.84,2.46],[-1.1,2.18]];oe(s,j,e,.45,2.77,0,2.24,.055),oe(s,ye,e,.06,2.77,.14,2.494).scale.set(.91,.91,1),y(s,to,1.97,.19,.35,2.78,.71,2.57),y(s,ee,1.94,.31,.35,2.76,2.21,2.57);for(const[t,o]of[2.1,2.7,3.3].entries()){A(s,t===1?mo:re,.091,.091,1.32,o,1.45,2.64,12);for(const a of[.78,1.11,1.82,2.09])A(s,a===1.11||a===1.82?ie:j,.15,.15,.096,o,a,2.64,10);y(s,t===1?tt:re,.065,.036,.021,o,2.22,2.758)}y(s,ie,.081,1.08,.16,3.68,1.49,2.56);for(let t=0;t<5;t++)y(s,j,.13,.041,.16,3.64,.96+t*.21,2.62)}function Un(s){const t=new H;t.position.set(1.85,3.31,-.7),s.add(t);const o=ce(16758903,1.6),a=8.1-3.31,i=.42,n=a-i,r=i+n/2;A(t,ee,1.18,1.3,.24,0,.12,0,8),A(t,j,.98,1.08,.2,0,.33,0,8),A(t,re,1.1,1.1,.025,0,.245,0,24),A(t,ee,.66,.84,n,0,r,0,8);const l=d=>.84-(d-i)/n*.18;for(const d of[1.05,2.15,3.25,4.25]){const h=l(d);A(t,o,h+.012,h+.016,.32,0,d,0,8),A(t,ie,h+.05,h+.05,.05,0,d+.19,0,8),A(t,ie,h+.05,h+.05,.05,0,d-.19,0,8)}const u=Math.atan(.18/n);for(let d=0;d<8;d++){const h=(d+.5)*Math.PI/4,m=l(r)-.02,p=y(t,j,.08,n-.1,.11,Math.sin(h)*m,r,Math.cos(h)*m);p.rotation.y=h,p.rotation.x=-u*Math.cos(h),p.rotation.z=u*Math.sin(h)}for(const d of[-.39,.39]){const h=l(r)-.03,m=y(t,re,.03,n-.4,.03,Math.sin(d)*h,r,Math.cos(d)*h);m.rotation.y=d,m.rotation.x=-u*Math.cos(d),m.rotation.z=u*Math.sin(d)}A(t,j,1.45,.68,.5,0,a+.25,0,8),A(t,ie,1.5,1.5,.1,0,a+.55,0,16),A(t,re,1.52,1.52,.03,0,a+.47,0,24);const f=U(t,new Se(1.46,.03,5,40),ie,0,a+.95,0);f.rotation.x=Math.PI/2;for(let d=0;d<16;d++){const h=d*Math.PI/8;A(t,j,.02,.02,.38,Math.sin(h)*1.46,a+.77,Math.cos(h)*1.46,5)}const c=new H;return c.position.set(0,a+.6-3.31,0),t.add(c),c}function Wn(s){const e=new Z({color:"#7ff6f0",toneMapped:!1}),t=new Z({color:"#ffc58a",toneMapped:!1}),o=new Z({color:"#b48cff",toneMapped:!1}),a=ce(6543078,.9);for(const r of[-1,1]){y(s,ye,.06,.82,1.5,r*4.02,1.5,1.45),y(s,t,.03,.66,1.32,r*4.055,1.5,1.45);for(const l of[-.33,.33])y(s,j,.05,.7,.05,r*4.07,1.5,1.45+l);y(s,j,.05,.05,1.36,r*4.07,1.5,1.45)}y(s,o,8.05,.035,.04,.035,3.09,2.79),y(s,e,4.3,.03,.04,-1.31,3.67,2.79);for(const r of[-1,1])y(s,o,.04,.035,5.2,r*4.13,3.09,-.05);for(let r=0;r<3;r++)y(s,ee,.82,.08,.62,-1.25+r*.02,3.69,1.55-r*.78),y(s,a,.7,.04,.5,-1.25+r*.02,3.74,1.55-r*.78);const i=new H;i.position.set(-.35,3.74,-1.75),s.add(i),A(i,j,.05,.08,.55,0,.27,0,8),U(i,new st(.42,14,6,0,Math.PI*2,0,Math.PI/2.6),ie,0,.72,0).rotation.set(Math.PI+.7,0,.35),A(i,e,.03,.03,.07,-.14,.95,.2,6),y(s,e,7.7,.025,.03,.09,.14,2.53);for(const r of[-1,1])y(s,e,.03,.025,4.9,r*3.98,.14,.02)}function Hn(s,e,t,o,a,i){const n=B("#d9884a",.86),r=B("#a85a2c",.88),l=B("#f2d6b0",.88),u=new Z({color:"#c8ff7a",toneMapped:!1}),f=new st(1,14,10),c=new H;c.name="Workshop cat",c.position.set(e,t,o),c.rotation.y=a,c.scale.setScalar(1.35),s.add(c);const d=(g,v,x,w,b,C,P,S)=>{const T=new E(f,v);return T.scale.set(x,w,b),T.position.set(C,P,S),T.castShadow=v!==u,g.add(T),T};d(c,n,.15,.12,.18,0,.1,-.04),d(c,n,.105,.16,.1,0,.21,.06),d(c,l,.07,.1,.05,0,.2,.13);for(const g of[-1,1])d(c,l,.04,.03,.055,g*.055,.025,.16),d(c,r,.03,.07,.1,g*.135,.12,-.05);const h=new H;h.position.set(0,.38,.09),c.add(h),d(h,n,.105,.09,.095,0,0,0),d(h,r,.06,.02,.06,0,.075,-.01),d(h,l,.05,.036,.04,0,-.028,.075);for(const g of[-1,1])d(h,u,.016,.019,.01,g*.042,.012,.088);const m=[-1,1].map(g=>{const v=new E(new fo(.042,.085,4),n);return v.position.set(g*.058,.085,-.005),v.rotation.set(-.12,Math.PI/4,g*-.32),v.castShadow=!0,h.add(v),v}),p=new H;p.position.set(.06,.04,-.2),c.add(p);for(let g=0;g<7;g++){const v=g/6,x=v*2.1;d(p,g%2?r:n,.036-v*.008,.036-v*.008,.05,Math.sin(x)*.22,.01+v*.03,-Math.cos(x)*.1+.1-v*.02)}return()=>{const g=i.value;p.rotation.y=Math.sin(g*1.1)*.28,p.rotation.z=Math.sin(g*.7+1)*.08,h.rotation.y=Math.sin(g*.23)*.35+Math.sin(g*.061)*.2,h.rotation.x=Math.sin(g*.31)*.06;const v=Math.max(0,Math.sin(g*.9)-.94)*6;m[0].rotation.z=.32+v*.35}}function Vn(s,e,t){const[o,a]=ge.workshop.landmark,i=R(o,a),n=new H;n.position.set(o,i,a),n.rotation.y=-.095,s.add(n),y(n,ye,8.05,.46,5.26,.09,-.12,-.12),oe(n,j,[[-3.94,0],[3.94,0],[3.94,.13],[3.74,.23],[-3.74,.23],[-3.94,.13]],5.2,.09,-.035,.1,.035),y(n,ee,7.81,3,.41,.025,1.54,-2.43),y(n,ee,.41,2.81,4.72,-3.81,1.51,-.17),y(n,ee,.41,2.81,4.72,3.81,1.51,-.17),y(n,ye,7.58,2.9,.28,.03,1.51,.9),y(n,ee,7.72,.65,.31,.02,.51,2.15);const r=[[-4.05,2.76],[4.12,2.76],[4.12,3.07],[3.77,3.31],[1.27,3.31],[.87,3.65],[-3.49,3.65],[-4.05,3.18]];oe(n,ee,r,5.4,0,0,-.05,.05),oe(n,to,r,.21,0,.015,2.61,.037),oe(n,j,[[-1.16,2.79],[1.21,2.79],[1.04,3.05],[-.92,3.05]],1.11,.54,0,2.49,.025),y(n,ie,4.63,.078,.1,-1.45,3.49,2.735),y(n,re,3.45,.058,.08,-2.02,2.89,2.762),y(n,re,1.77,.058,.08,2.81,2.89,2.762);for(const x of[-3.92,1.42,3.91])oe(n,j,[[-.18,.12],[.18,.12],[.14,2.53],[-.05,2.81],[-.18,2.66]],.25,x,0,2.21,.023);Gn(n);const l=[[-.9,0],[.9,0],[.9,1.84],[.58,2.18],[-.66,2.18],[-.9,1.94]];oe(n,j,l,.23,.53,.18,2.2,.042),oe(n,re,l,.033,.53,.224,2.33).scale.set(.916,.94,1),oe(n,ye,l,.035,.53,.247,2.36).scale.set(.851,.91,1);for(const x of[-1,1])y(n,ee,.64,1.57,.035,.53+x*.362,1.13,2.39),y(n,j,.04,.66,.046,.53+x*.124,1.01,2.399);y(n,re,.99,.07,.05,.53,1.58,2.424),y(n,tt,.14,.088,.056,1.68,1.2,2.33),y(n,j,2.55,.13,.79,.53,.147,2.77);for(const x of[-1,1])y(n,re,.12,.024,.54,.53+x*1.02,.221,2.86);Nn(n),y(n,ee,1.96,.447,.12,.54,2.61,2.64);const u=new E(new Te(1.86,.407),Fn());u.position.set(.54,2.61,2.706),n.add(u);for(const x of[-1,1]){for(let w=0;w<5;w++)y(n,j,.16,1.27,.28,x*4.03,1.78,-.89+w*.43);y(n,ie,.11,.105,3.38,x*4.07,2.52,.04),y(n,re,.11,.065,2.2,x*4.08,2.78,.34),y(n,ye,1.48,1.1,.11,2.22*x,1.61,-2.677),y(n,tt,1.29,.075,.042,2.22*x,2.07,-2.746)}for(let x=0;x<4;x++)y(n,j,3.23,.12,.16,-1.1,3.72,-2.06+x*.42);for(const[x,w]of[[-.2,1.2],[.22,.8]])A(n,j,.03,.06,w,-2.97+x,3.7+w/2,-1.29,8),A(n,x>0?re:mo,.04,.05,.09,-2.97+x,3.7+w,-1.29,8);const f=Un(n);Wn(n),On(n);const c=n.localToWorld(new M(2.37,0,4.04)),d=R(c.x,c.z);y(s,to,1.29,.11,.41,c.x,d+.46,c.z).rotation.y=n.rotation.y;for(const x of[-.45,.45])y(s,ee,.13,.46,.35,c.x+x,d+.22,c.z);y(s,ie,1.04,.045,.037,c.x,d+.45,c.z+.21),e.add(c.x,c.z,1.26,.4,d-.07,.61,n.rotation.y);const h=n.localToWorld(new M(0,-.4,-.15));e.add(h.x,h.z,8.07,4.94,h.y,4.1,n.rotation.y);const m=n.localToWorld(new M(2.77,.41,2.44));e.add(m.x,m.z,2.3,.62,m.y,2.09,n.rotation.y);const p=n.localToWorld(new M(2.72,0,4.04)),g=Hn(s,p.x,d+.515,p.z,n.rotation.y,t),v=Ln(f,t);return()=>{v(),g()}}const Ne=B("#374b54"),Qe=B("#4c3435"),Ft=B("#775342"),xt=B("#c6a580"),go=B("#edd0a9"),yt=B("#3f444b",.59,.3),Ue=B("#b27656",.49,.24),we=B("#d9aa67",.5,.15),ns=ce(15309381,1.35),oo=ce(16761976,2.2);function Ht(s,e,t){const[o,a]=ge[e].landmark,i=new H;return i.position.set(o,R(o,a),a),i.rotation.y=t,s.add(i),i}function qn(s,e,t,o,a,i=a){const n=o.clone().sub(t),r=t.clone().lerp(o,.5);y(s,e,a,n.length(),i,r.x,r.y,r.z).quaternion.setFromUnitVectors(new M(0,1,0),n.normalize())}function as(s,e){const t=e-s;return new Wt().moveTo(-s,0).lineTo(s,0).lineTo(s,t).quadraticCurveTo(s,e,0,e).quadraticCurveTo(-s,e,-s,t).lineTo(-s,0)}function so(s,e,t,o,a,i,n){return U(s,new $o(as(i,n),12),e,t,o,a)}function jn(s,e,t,o,a,i){so(s,Qe,e,t-.05,o,a*.57,i+.11),so(s,ns,e,t,o+.018,a*.43,i),y(s,Ft,a*1.26,.108,.24,e,t-.045,o+.056),y(s,Qe,.06,i*.87,.044,e,t+i*.43,o+.047),y(s,Qe,a*.93,.05,.044,e,t+i*.48,o+.047)}function Xn(s,e,t,o){const i=Ht(s,"dream-ocean",.29),[n,r,l]=i.position,u=[B("#606f81"),B("#7a8499"),B("#8b9ba6"),B("#707787")],f=B("#3b586a"),c=B("#a1b4c3"),d=ce(10017008,.45),h=A(i,f,2.97,3.3,.33,0,-.06,.03,12);h.scale.z=.59;const m=A(i,u[1],2.53,2.86,.2,0,.2,.16,14);m.scale.z=.55;const p=y(i,c,3.15,.16,1.25,0,.14,1.13);p.rotation.y=-.03;const g=1.61,v=2.61,w=new Wt().moveTo(-g,.25).lineTo(g,.25).lineTo(g,v).quadraticCurveTo(g,v+1.2,0,v+2.2).quadraticCurveTo(-g,v+1.2,-g,v).closePath(),b=new E(new $o(w,36),Rn(e,o));b.position.z=.17,i.add(b);for(const P of[-1,1])for(let S=0;S<4;S++){const T=.84-.044*S,_=y(i,u[(S+1)%u.length],T,.58,.94-S*.057,P*(g+T/2-.04),.49+S*.61,.03);_.rotation.z=(S%2-.5)*.035,y(i,c,.036,.45,.05,P*1.72,.51+S*.61,.55-S*.025)}const C=(P,S)=>{const T=Math.sign(1-P*2),_=1-Math.abs(1-P*2);return[T*((1-_*_)*(g+S)),v+(2.4*_-.2*_*_)*(1+S*.44)]};for(let P=0;P<15;P++){const S=(P+.031)/15,T=(P+.969)/15,_=P===7,I=[C(S,-.075),C(T,-.075),C(T,_?.73:.61),C(S,_?.73:.61)];if(oe(i,u[P%u.length],I,_?.91:.7,0,0,0,.035),P%2===0){const[V,N]=C((S+T)/2,.18),X=y(i,d,.044,.18,.02,V,N,_?.491:.394);X.rotation.z=(P-7)*-.11}}for(const[P,S,T,_]of[[-3.62,-.68,1,-.24],[3.18,-.63,.84,.29],[-4.2,1.23,.61,-.3],[3.72,1,.45,.32],[1.56,-2.95,.57,-.21]]){const I=U(i,new wt(1,0),u[Math.round(T*3)],P,1.22*T,S);I.scale.set(.66*T,2.33*T,.61*T),I.rotation.z=_,I.rotation.y=S,U(i,new wt(.21,0),d,P,.7*T,S+.42*T).scale.set(.34,1.9,.49)}for(const P of[-2.85,2.82])A(i,f,.24,.32,.62,P,.32,1.6,7),U(i,new wt(.21,0),d,P,.76,1.6).scale.y=1.35;t.add(n,l,5.4,1.75,r-.5,5.65,.29)}function Yn(s,e,t){const o=Ht(s,"pocket-orbit",.15),[a,i,n]=o.position,r=B("#8c857d"),l=B("#646b6b"),u=B("#c78d50");A(o,xt,3.38,3.68,.52,0,-.3,0,12),A(o,Ne,3.31,3.51,.25,0,-.01,0,12),A(o,r,3.19,3.33,.13,0,.162,0,12),A(o,l,2.85,2.85,.03,0,.237,0,30);const f=U(o,new Se(2.42,.035,4,64),go,0,.26,0);f.rotation.x=-Math.PI/2;for(let c=0;c<12;c++){const d=c*Math.PI/6,h=Math.cos(d)*3.07,m=Math.sin(d)*3.07,p=y(o,c%3===0?oo:u,.25,.074,.14,h,.247,m);p.rotation.y=-d}y(o,xt,1.69,.22,.73,-.08,.04,3.45);for(const c of[-2.56,2.56])A(o,yt,.095,.14,1.42,c,.68,-2.12),A(o,oo,.15,.15,.2,c,1.43,-2.12,11),A(o,we,.16,.18,.07,c,1.57,-2.12);for(const c of[-1.9,-.91,1.93])y(o,yt,.56,.41,.73,-3.54,.04,c),y(o,Ue,.58,.1,.75,-3.54,.28,c),y(o,Ne,.26,.162,.022,-3.54,.1,c+.37);tn(async()=>{const{addPocketOrbitShuttle:c}=await import("./pocketOrbitShuttle-CBbrilQp.js");return{addPocketOrbitShuttle:c}},__vite__mapDeps([0,1,2]),import.meta.url).then(({addPocketOrbitShuttle:c})=>c(o,t)),e.add(a,n,5.3,5.25,i-.42,3.4,.15)}function Ro(s,e,t,o,a,i){const n=l=>a*(1-Math.abs(l/t))**1.55+Math.abs(l/t)**11*.24,r=[];for(let l=0;l<=20;l++){const u=-t+l*t/10;r.push([u,n(u)])}for(let l=20;l>=0;l--){const u=-t+l*t/10;r.push([u,n(u)-.17])}oe(s,i,r,o,0,e,0,.015);for(let l=0;l<=22;l++){const u=-t+l*t/11,f=A(s,l%3===0?Ue:i,.06,.06,o+.05,u,e+n(u)+.02,0,7);f.rotation.x=Math.PI/2}for(const l of[-o/2-.012,o/2+.012])for(let u=0;u<14;u++){const f=-t+u*t/7,c=f+t/7;qn(s,we,new M(f,e+n(f)-.043,l),new M(c,e+n(c)-.043,l),.075)}}function Eo(s,e,t){const o=new H;o.position.set(e,.2,.55),s.add(o);const a=[[-.61,0],[.63,0],[.63,.92],[.34,1.26],[.39,1.98],[.12,2.19],[-.61,2.19]];oe(o,t,a,.94,0,0,0,.042).rotation.y=-Math.PI/2,y(o,Ne,.89,.83,.078,0,1.59,.348).rotation.x=-.09,y(o,ce(9753296,.36),.73,.57,.025,0,1.61,.402).rotation.x=-.09;const i=new H;i.position.set(0,1.61,.436),o.add(i);for(let n=0;n<4;n++)y(i,t,.116,.106,.012,(n%2-.5)*.18,(Math.floor(n/2)-.5)*.15,0);y(o,Ue,.99,.14,.46,0,1.06,.45),A(o,yt,.039,.041,.14,-.28,1.19,.49,10),U(o,new st(.071,10,7),ns,-.28,1.28,.49);for(const n of[.08,.23])A(o,we,.06,.052,.048,n,1.16,.5,10);y(o,go,.69,.16,.036,0,2.01,.388)}function $n(s,e){const o=Ht(s,"hanzizap",-.17),[a,i,n]=o.position,r=B("#a75f4a"),l=B("#426564"),u=B("#d9a34f");y(o,xt,5.57,.37,3.9,0,-.07,.17),y(o,Ft,5.44,.12,3.8,0,.145,.17),y(o,r,4.8,2.57,.24,0,1.36,-1.39);for(const c of[-2.23,2.23]){for(const d of[-1.31,1.39])A(o,r,.115,.15,2.95,c,1.53,d),A(o,yt,.19,.21,.21,c,.22,d),A(o,we,.155,.156,.15,c,2.67,d);y(o,l,.119,1.43,2.81,c,.85,0);for(let d=0;d<6;d++)y(o,u,.037,.94,.089,c+Math.sign(c)*.074,.91,-1.13+d*.448)}for(const c of[-1.42,1.42])y(o,Ft,5.11,.24,.23,0,2.88,c);Ro(o,3.08,2.99,3.89,.99,l),y(o,l,2.82,.57,1.98,0,3.96,0),y(o,Ft,2.96,.105,2.04,0,4.21,0);for(let c=0;c<9;c++)y(o,we,.045,.3,.034,(c-4)*.265,3.99,1.005);Ro(o,3.97,1.88,2.64,.61,l),y(o,we,.19,.17,2.7,0,4.64,0),y(o,Qe,2.77,.28,.13,0,2.66,1.49),y(o,we,2.46,.055,.05,0,2.66,1.58);for(const c of[-1.95,1.95]){const d=U(o,new st(.222,12,9),oo,c,2.49,1.72);d.scale.y=1.19,A(o,Ue,.18,.16,.08,c,2.76,1.72),A(o,Ue,.15,.18,.08,c,2.22,1.72),y(o,r,.031,.15,.031,c,2.12,1.72)}Eo(o,-.93,u),Eo(o,.76,r);const f=y(o,r,3.5,.037,.61,0,.071,2.01);f.rotation.y=.022;for(const c of[-1.58,1.58])y(o,we,.042,.04,.52,c,.085,2.01);e.add(a,n,5.13,3.63,i-.42,4.8,-.17)}function Qn(s,e){const o=Ht(s,"observatory",.34),[a,i,n]=o.position,r=[B("#64928d",.48,.25),B("#588682",.45,.26),B("#7a9e92",.45,.25)],l=B("#c2b3a2");A(o,yt,2.1,2.37,.35,0,.04,0,12),A(o,l,1.84,1.95,2.78,0,1.45,0,15),A(o,go,1.98,1.91,.21,0,2.81,0,15),A(o,Ne,2.02,1.997,.29,0,3.058,0,16);for(let d=0;d<12;d++){const h=new st(1.98,6,11,d*Math.PI/6,Math.PI/6,0,Math.PI/2),m=U(o,h,r[d%3],0,3.18,0);m.scale.y=.83;const p=U(o,new Se(1.975,.028,5,22,Math.PI/2),Ue,0,3.19,0);p.rotation.y=d*Math.PI/6,p.scale.y=.83}const u=U(o,new Se(2.11,.062,6,40),we,0,3.04,0);u.rotation.x=Math.PI/2;const f=new lo(as(.59,1.75),{depth:.26,bevelEnabled:!0,bevelSize:.035,bevelThickness:.034,bevelSegments:1,curveSegments:12});U(o,f,Qe,0,.16,1.76),so(o,Ne,0,.204,2.055,.47,1.58);for(const d of[-.24,0,.24])y(o,Qe,.025,1.17,.032,d,.81,2.063);y(o,we,.08,.11,.056,.27,.75,2.082);for(const d of[-1,1]){const h=new H;h.rotation.y=d*.78,o.add(h),jn(h,0,1.27,1.86,.47,1.04)}const c=new H;c.position.set(.56,4.32,.23),c.rotation.z=-.85,c.rotation.x=.26,o.add(c),A(c,Ne,.48,.39,2.23,0,.82,0,18),A(c,Ue,.58,.52,.24,0,2.04,0,18),A(c,B("#a4c8c8",.23,.41),.442,.452,.041,0,2.17,0,18),A(c,we,.47,.49,.12,0,1.58,0,18),A(c,we,.44,.44,.1,0,.19,0,16),A(c,Ne,.17,.15,.56,0,-.51,0,12),y(o,xt,1.2,.26,.76,0,.1,2.07).rotation.x=-.13,y(o,xt,1.32,.19,.65,0,-.07,2.56).rotation.x=-.2,e.add(a,n,3.57,3.63,i-.61,5.3,.34)}function Kn(s,e,t,o){const a=Vn(s,e,t);return Xn(s,t,e,o),Yn(s,e,o),$n(s,e),Qn(s,e),a}let _t=null;function is(){if(_t)return _t;const s=document.createElement("canvas");s.width=s.height=128;const e=s.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,63);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,255,255,.42)"),t.addColorStop(.6,"rgba(255,255,255,.1)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),_t=new Be(s),_t}function At(s,e,t,o,a,i){const n=new E(new Te(a,a),new Z({map:is(),color:e,opacity:i,transparent:!0,blending:Pe,depthWrite:!1,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-4}));n.rotation.x=-Math.PI/2,n.position.set(t,R(t,o)+.09,o),n.renderOrder=2,s.add(n)}function Zn(s,e,t,o,a,i,n){const r=new ot(new Tt({map:is(),color:e,opacity:n,transparent:!0,blending:Pe,depthWrite:!1,toneMapped:!1}));r.position.set(t,o,a),r.scale.setScalar(i),s.add(r)}function Jn(s,e,t){const o=ue(5521),a=[],i=[],n=[];for(const u of e)for(let f=0;f<3;f++)a.push(u.x,u.y,u.z),i.push(o()*6.283),n.push(.17+o()*.22);const r=new te;r.setAttribute("position",new L(a,3)),r.setAttribute("phase",new L(i,1)),r.setAttribute("radius",new L(n,1));const l=new co(r,new ae({uniforms:{clock:t},transparent:!0,depthWrite:!1,toneMapped:!1,blending:Pe,vertexShader:`
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
    `}));l.frustumCulled=!1,s.add(l)}function ea(s,e,t,o){const a=B("#3c3a44",.6,.35),i=ce(16762482,2.4),n=[[2.9,17.6],[.25,14.7],[2.45,10.7],[-1.4,8.35],[-4.88,5.6],[-8.52,3.55],[-12.32,2.31],[6.28,5.4],[9.2,2.73],[11.55,-.85],[7.3,11.5],[10.1,14.65],[-7.98,-.65],[-8.35,-5.9],[-6.55,-9.09]],r=ue(71893),l=[],u=es();for(const[c,d]of[...n,...u]){const h=R(c,d),m=.64+r()*.22;A(s,a,.055,.08,m,c,h+m*.5,d,7),A(s,a,.12,.1,.13,c,h+.06,d,7),A(s,i,.081,.11,.19,c,h+m,d,8),A(s,a,.041,.15,.107,c,h+m+.102,d,8);const p=y(s,a,.19,.041,.19,c,h+m-.088,d);p.rotation.y=Math.PI/4,Zn(s,16757340,c,h+m,d,1.05,.55),At(s,16752714,c,d,3.4,.34),l.push(new M(c,h+m,d))}for(const[c,d]of u)o.add(c,d,.3,.3,R(c,d),1,0);Jn(s,l,t);const f=[[.4,1.7,3.6,4645103,14,11],[-2.3,1.8,3.1,16751186,10,9],[-15.2,2.4,-1.4,8370431,16,12],[13.2,2.6,11.8,16757854,14,10],[-3.6,2,-11.4,16761466,7,8],[12.4,2.2,-4.2,9427199,10,10]];for(const[c,d,h,m,p,g]of e?f:f.slice(0,3)){const v=new Yo(m,p,g,1.6);v.position.set(c,R(c,h)+d,h),s.add(v)}At(s,8370431,-15.2,-.6,7.5,.26),At(s,16757854,13.2,12.6,6.5,.22),At(s,4645103,.5,4.6,5.5,.18)}const ta=[{id:"dream-ocean",logo:"dream-ocean-logo.webp",aspect:680/277,x:-11.86,z:-.78,yaw:.3,width:3.46,height:1.63,lift:.65,frame:"#677d8e",panel:"#cadde5",lamp:10212583,category:"game"},{id:"pocket-orbit",logo:"pocket-orbit-logo.webp",aspect:680/375,x:9.14,z:-3.09,yaw:-.19,width:3.16,height:1.85,lift:.57,frame:"#a69c8b",panel:"#272a42",lamp:15969383,category:"game"},{id:"hanzizap",logo:"hanzizap-logo.svg",aspect:290/69,x:10.02,z:12.03,yaw:.13,width:3.44,height:1.01,lift:.79,frame:"#b4814c",panel:"#4c3435",lamp:16761976,category:"app"}],Do={game:{label:"VIDEO GAME",paths:["M7.5 7h9a5 5 0 0 1 4.9 6l-.8 3.8a2.4 2.4 0 0 1-4.1 1.1L14.6 16H9.4l-1.9 1.9a2.4 2.4 0 0 1-4.1-1.1L2.6 13a5 5 0 0 1 4.9-6Z","M7.5 10v4M5.5 12h4M15.5 11.2h.01M17.8 13h.01"]},app:{label:"iOS APP",paths:["M9.1 2.5h5.8a2.6 2.6 0 0 1 2.6 2.6v13.8a2.6 2.6 0 0 1-2.6 2.6H9.1a2.6 2.6 0 0 1-2.6-2.6V5.1a2.6 2.6 0 0 1 2.6-2.6Z","M10.5 18.5h3"]}};function oa(s,e){const t=document.createElement("canvas");t.width=512,t.height=160;const o=t.getContext("2d");o.fillStyle="#16202c",o.beginPath(),o.roundRect(6,6,500,148,30),o.fill(),o.lineWidth=6,o.strokeStyle=e,o.stroke(),o.save(),o.translate(40,26),o.scale(4.4,4.4),o.lineWidth=1.6,o.lineCap="round",o.lineJoin="round",o.strokeStyle="#e9e1cf";for(const i of Do[s].paths)o.stroke(new Path2D(i));o.restore(),o.fillStyle="#e9e1cf",o.font="700 52px Geist, system-ui, sans-serif",o.textBaseline="middle",o.fillText(Do[s].label,168,84,310);const a=new Be(t);return a.colorSpace=at,a.anisotropy=4,a}function sa(s,e,t){const o=new Ut;return ta.map(({id:a,logo:i,aspect:n,x:r,z:l,yaw:u,width:f,height:c,lift:d,frame:h,panel:m,lamp:p,category:g})=>{const v=new H,x=R(r,l);v.position.set(r,x,l),v.rotation.y=u,s.add(v);const w=B(h,.65,.16),b=B(m,.81),C=ce(p,.52),P=d+c*.5,S=f*.5,T=c*.5,_=.15;oe(v,w,[[-S+_,-T],[S-_,-T],[S,-T+_],[S,T-_],[S-_,T],[-S+_,T],[-S,T-_],[-S,-T+_]],.24,0,P,0,.027),y(v,b,f-.22,c-.2,.31,0,P,0);for(const O of[-1,1])y(v,w,.2,d+.31,.25,O*f*.34,d*.4,0),y(v,b,.39,.15,.49,O*f*.34,.035,0),y(v,C,.4,.035,.055,O*(S-.39),d+.071,.164),y(v,C,.4,.035,.055,O*(S-.39),d+.071,-.164);const I=Math.min(f-.5,(c-.34)*n),V=new Te(I,I/n),N=o.load(`./island-media/${i}`,t);N.colorSpace=at,N.anisotropy=4;const X=new Z({map:N,transparent:!0,depthWrite:!1,toneMapped:!1});a==="hanzizap"&&X.color.setScalar(.8);for(const O of[-1,1]){const se=new E(V,X);se.position.set(0,P,O*.166),se.rotation.y=O<0?Math.PI:0,v.add(se)}const q=new Z({map:oa(g,h),toneMapped:!1});q.color.setScalar(.82);const z=.44,k=z*512/160,F=d-.3;y(v,w,k+.08,z+.08,.06,0,F,0);for(const O of[-1,1])y(v,w,.025,.14,.025,O*k*.32,F+z*.5+.1,0);const W=new Te(k,z);for(const O of[-1,1]){const se=new E(W,q);se.position.set(0,F,O*.032),se.rotation.y=O<0?Math.PI:0,v.add(se)}return e.add(r,l,f,.38,x-.2,c+d+.28,u),{id:a,box:new Qo().setFromObject(v)}})}const rs=Math.PI*2,na=new D("#2e7255"),aa=new D("#7d9e58"),ia=new D("#41747a"),ra=new D("#8d8052"),ca=new D("#74654f");function Mt(s,e,t){const o=R(s,e),a=.41+Math.sin(s*1.37+e*.64)*.07+Math.cos(s*.43-e*.77)*.15;return t.copy(na).lerp(aa,a+Math.max(0,o)*.062),t.lerp(ia,Math.exp(-((s+15)**2+(e+1)**2)/54)*.59),t.lerp(ra,Math.exp(-((s-13)**2+(e+4)**2)/39)*.77),t.lerp(ca,Math.max(0,(ze(s,e)-.83)*3.4)+Math.max(0,-.5-o)*.21),t}function Yt(s,e,t){s.onBeforeCompile=o=>{o.vertexShader=`varying vec3 terrainPoint;
`+o.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
terrainPoint = position;`),o.fragmentShader=`
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
    `+o.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
      vec2 groundUV = terrainPoint.xz + terrainPoint.y * vec2(.42, .86);
      vec2 gritUV = groundUV * ${t.toFixed(2)};
      float sharpness = 1.0 - smoothstep(.42, 1.32, length(fwidth(gritUV)));
      float grit = (earthShade(gritUV) - .5) * sharpness;
      float coarse = earthShade(groundUV * .83 + 4.0) - .5;
      diffuseColor.rgb *= 1.0 + grit * ${e.toFixed(2)} + coarse * .18;`)},s.customProgramCacheKey=()=>`ground-${e}-${t}`}function la(){const t=[0,R(0,0),0],o=[Mt(0,0,new D)],a=[];for(let n=1;n<=37;n++)for(let r=0;r<144;r++){const l=_e((r+n%2*.5*(n<37?1:0))/144*rs,n/37),[u,f]=l;t.push(u,R(u,f),f),o.push(Mt(u,f,new D));const c=1+(n-1)*144+r,d=1+(n-1)*144+(r+1)%144;n===1?a.push(0,d,c):a.push(c-144,d,c,c-144,d-144,d)}const i=new te;return i.setAttribute("position",new L(t,3)),i.setAttribute("color",po(o)),i.setIndex(a),i.computeVertexNormals(),i}function Io(s,e,t,o,a){const i=[1,1,.96,.985,.83,.765,.63,.34,.035,0],n=[0,-.65,-2.1,-3.05,-4.65,-6.6,-8.65,-11.9,-13.3,-13.82],r=["#746e56","#695451","#635569","#937364","#594e66","#484656","#63536b","#45415a","#4b4357","#3c384e"].map(h=>new D(h)),l=[],u=[],f=[];for(let h=0;h<n.length;h++)for(let m=0;m<s;m++){const p=m/s*rs,g=Math.sin(p*5+h*.59)*.67+Math.cos(p*13-.9)*.22,v=Math.sin(p*39+.4)*.2+Math.cos(p*49)*.12,x=h>0&&h<9?(g+v)*(.031+h*.003):0,[w,b]=_e(p,i[h]+x),[C,P]=_e(p),S=h>0?Math.sin(p*4+.6)*.55+g*.44:0;if(l.push(t+(w-h*h*.025)*e,o+(n[h]+R(C,P)/(1+h*.18)+S)*e,a+(b+h*h*.022)*e),u.push(r[h].clone().multiplyScalar(.87+g*.1+v*.44)),h>0){const T=h*s+m,_=h*s+(m+1)%s;f.push(T-s,_,T,T-s,_-s,_)}}const c=new te;c.setAttribute("position",new L(l,3)),c.setAttribute("color",po(u)),c.setIndex(f);const d=c.toNonIndexed();return c.dispose(),d.computeVertexNormals(),d}function da(s){const e=[];for(let t=0;t<s.length-1;t++){const[o,a]=s[Math.max(0,t-1)],[i,n]=s[t],[r,l]=s[t+1],[u,f]=s[Math.min(s.length-1,t+2)],c=Math.ceil(Math.hypot(r-i,l-n)*4);for(let d=0;d<c;d++){const h=d/c,m=(p,g,v,x)=>.5*(2*g+(-p+v)*h+(2*p-5*g+4*v-x)*h*h+(-p+3*g-3*v+x)*h*h*h);e.push(new K(m(o,i,r,u),m(a,n,l,f)))}}return e.push(new K(...s[s.length-1])),e}const cs=on.map(da),fa=new D("#b89f71"),ua=new D("#c7af84");function ha(){const s=[],e=[],t=[],o=[-1,-.79,-.32,.19,.8,1],a=ue(19309);for(const[n,r]of cs.entries()){const l=s.length/3,u=n===0?.94:.66;for(const[f,c]of r.entries()){const d=r[Math.max(0,f-1)],h=r[Math.min(r.length-1,f+1)],m=new K(h.y-d.y,d.x-h.x).normalize(),p=u*(.9+.11*Math.sin(f*.32)+.13*a()),g=Math.min(1,(f+2)/5,(r.length-f)/7);for(const[v,x]of o.entries()){const w=c.x+m.x*x*p,b=c.y+m.y*x*p;s.push(w,R(w,b)+.041+.003*n,b);const C=Math.abs(x)>.99?.02:Math.min(1,(1-Math.abs(x))*1.95);e.push(Mt(w,b,new D).lerp(v%2===0?fa:ua,C*g).multiplyScalar(.9+a()*.2))}if(f!==0)for(let v=1;v<o.length;v++){const x=l+f*o.length+v,w=x-o.length;t.push(w-1,x-1,x,w-1,x,w)}}}const i=new te;return i.setAttribute("position",new L(s,3)),i.setAttribute("color",po(e)),i.setIndex(t),i.computeVertexNormals(),i}function pa(s){const e=new de({vertexColors:!0,roughness:1});Yt(e,.23,6.2);const t=new E(la(),e);t.receiveShadow=!0,t.castShadow=!0,s.add(t);const o=new de({vertexColors:!0,roughness:.96});Yt(o,.31,3.6);const a=new E(Io(144,1,0,0,0),o);a.receiveShadow=!0,a.castShadow=!0,s.add(a);const i=new de({vertexColors:!0,roughness:.92});Yt(i,.39,15.6);const n=new E(ha(),i);n.receiveShadow=!0,s.add(n);for(const[r,l,u,f]of[[-72,-3,-90,.38],[-46,-6,-84,.22],[49,-4,-93,.32],[75,-1.5,-138,.44],[89,-7,-67,.17],[-89,-5.2,-65,.29]]){s.add(new E(Io(48,f,r,l,u),o));const c=new E(t.geometry,e);c.position.set(r,l,u),c.scale.setScalar(f),s.add(c)}}const $t=8,Qt=8,ma=64,Bo=2.23,ga=Math.SQRT2-1,va=4,Fo=1.8,wa=2.0625;function xa(s,e,t,o){const a=t.matrixWorld.elements,i=s*a[0]+e*a[2],n=-s*a[2]+e*a[0],r=Math.abs(i),l=Math.abs(n),u=ga*(o%2===1?.72:1);return Math.min(r,l)>=Math.max(r,l)*u?n<0?i<0?3:5:i<0?1:7:r>l?i<0?2:6:n<0?4:0}function Oo(s,e,t,o){let a=!1;const i=s.load(new URL(`./island-media/andi/${e}.webp`,document.baseURI).href,()=>{a=!0,o()});i.colorSpace=at,i.magFilter=Ot,i.minFilter=Ot,i.generateMipmaps=!1,i.repeat.set(1/t,1/$t);const n=new ot(new Tt({map:i,transparent:!1,alphaTest:.5,toneMapped:!1}));return n.name=`Andi ${e}`,n.scale.set(Bo,Bo,1),n.center.set(.5,1/ma),n.position.y=.044,n.visible=!1,{sprite:n,get loaded(){return a},pose(r,l){i.offset.set(l/t,($t-1-r)/$t)}}}function ya(){const s=document.createElement("canvas");s.width=s.height=64;const e=s.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.45,"rgba(255,255,255,.45)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64);const o=new Be(s),a=new H;a.name="Footstep dust";const i=.75,n=Array.from({length:14},()=>{const l=new ot(new Tt({map:o,color:"#a99fc8",transparent:!0,depthWrite:!1,toneMapped:!1,opacity:0}));return l.visible=!1,a.add(l),{sprite:l,age:i,drift:new M}});let r=0;return{group:a,spawn(l,u,f,c){const d=n[r];r=(r+1)%n.length,d.age=0,d.sprite.position.set(l-f*.25+(Math.random()-.5)*.2,R(l,u)+.12,u-c*.25),d.drift.set(-f*.35+(Math.random()-.5)*.3,.32,-c*.35+(Math.random()-.5)*.3),d.sprite.visible=!0},update(l){for(const u of n){if(u.age>=i)continue;u.age=Math.min(i,u.age+l);const f=u.age/i;u.sprite.position.addScaledVector(u.drift,l*(1-f)),u.sprite.scale.setScalar(.28+f*.75),u.sprite.material.opacity=.34*(1-f)*Math.min(1,f*6),u.sprite.visible=u.age<i}}}}function Ma(s,e){const t=new H;t.name="Andi";const o=new Ut,a=Oo(o,"walk",Qt+1,e),i=Oo(o,"sprint",Qt,e);t.add(a.sprite,i.sprite);const n=new E(new Te(1.62,1.38),new ae({uniforms:{tint:{value:new D("#201c28")}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`
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
    `}));n.position.y=.049,t.add(n);const r=ya(),l=new M(0,0,1),u=new M,f=va/s;let c=4,d="idle",h=0,m=!1,p=-1;return{root:t,dust:r.group,get ready(){return a.loaded},update(g,v,x,w,b,C,P){const S=g.x-t.position.x,T=g.z-t.position.z;t.position.copy(g);const _=m&&!P&&!C?Math.hypot(S,T):0,I=_/x;m=!0;const V=I>.015;c=xa(V?S:Math.sin(v),V?T:Math.cos(v),w,c);const N=s*(d==="sprint"?1.035:1.075);if(d=V?b||I<N?"walk":"sprint":"idle",d==="idle")h=0;else{const F=I*f/(2*Fo),W=Xe.clamp(Math.sqrt(F),.7,2.2),O=wa*Fo*W;h=(h+_*f/O)%1}const X=d==="sprint"&&i.loaded,q=Math.floor(h*Qt);X&&q!==p&&(q===1||q===5)&&!eo.matches&&_>0&&r.spawn(g.x,g.z,S/_,T/_),p=X?q:-1,r.update(x),a.sprite.visible=a.loaded&&!X,i.sprite.visible=X,X?i.pose(c,q):a.pose(c,d==="idle"?0:q+1),n.visible=a.loaded&&!C;const{x:z,z:k}=g;u.set(R(z-.29,k)-R(z+.29,k),.58,R(z,k-.29)-R(z,k+.29)).normalize(),n.quaternion.setFromUnitVectors(l,u)}}}const Kt=[.25,.35,.28],Lo=[1.04,1.1,.94],Zt=[1.66,1.52,.98],Go=(s,e,t)=>[s[0]+(e[0]-s[0])*t,s[1]+(e[1]-s[1])*t,s[2]+(e[2]-s[2])*t];function ba(s,e,t){return s<.45?Go(e,Lo,Math.pow(s/.45,.8)):Go(Lo,t,Math.pow((s-.45)/.55,1.4))}const kt=new M,Sa=new M,Ta=new M(0,1,0);function za(s,e){const t=Math.cos(e.angle),o=Math.sin(e.angle),a=c=>{const d=e.lean*c*c,h=e.height*(2*c*(1-c)*.82+c*c*(1-e.droop*.75));return[e.x+t*d,h,e.z+o*d]},i=c=>e.width*Math.pow(Math.max(0,1-Math.pow(c,1.6)),.9),n={positions:[],normals:[],shade:[],sway:[],phase:[],indices:[],heart:e.heart},r=(c,d)=>{n.positions.push(c[0],c[1],c[2]);const h=a(Math.max(0,d-.05)),m=a(Math.min(1,d+.05)),p=(m[0]-h[0])*t+(m[2]-h[2])*o,g=m[1]-h[1],v=Math.max(1e-5,Math.hypot(p,g));kt.set(-t*g/v,p/v,-o*g/v).multiplyScalar(.6).addScaledVector(Ta,.75).addScaledVector(Sa.set(t,0,o),.3).normalize(),n.normals.push(kt.x,kt.y,kt.z);const x=ba(d,e.root,e.tip),w=e.value*(1-e.inner*.26*Math.pow(1-d,1.5));return n.shade.push(x[0]*w,x[1]*w,x[2]*w),n.sway.push(d),n.phase.push(e.phase),n.sway.length-1},l=[];for(let c=0;c<e.segments;c++){const d=c/e.segments,h=a(d),m=e.angle+Math.PI*.5+e.twist*d,p=i(d),g=Math.cos(m)*p,v=Math.sin(m)*p;l.push([r([h[0]-g,h[1],h[2]-v],d),r([h[0]+g,h[1],h[2]+v],d)])}for(let c=0;c<l.length-1;c++){const[d,h]=l[c],[m,p]=l[c+1];n.indices.push(d,h,p,d,p,m)}const[u,f]=l[l.length-1];n.indices.push(u,f,r(a(1),1)),s.push(n)}function ls(s){let e=s;return()=>(e=e*16807%2147483647,(e-1)/2147483646)}function ds(s,e,t){const o=t()*Math.PI*2;for(let a=0;a<e.blades;a++){const i=e.blades>1?a/(e.blades-1):0,n=o+a*2.39996+(t()-.5)*.4,r=e.spread*Math.sqrt(i)*(.7+t()*.3);za(s,{x:e.x+Math.cos(n)*r,z:e.z+Math.sin(n)*r,angle:n+(t()-.5)*.5,height:e.height*(1-i*e.fall)*(.88+t()*.24),width:e.width*(.85+t()*.3)*(1-i*.15),lean:e.lean*(.25+i*.95)*(.8+t()*.4),droop:e.droop*Math.pow(i,.8)+t()*.08,twist:(t()-.5)*.9,phase:t(),segments:a<e.curved?3:2,value:e.value*(.93+t()*.14),inner:1-i,heart:[e.x,e.z],root:[Kt[0]*e.tint[0],Kt[1]*e.tint[1],Kt[2]*e.tint[2]],tip:[Zt[0]*e.tint[0],Zt[1]*e.tint[1],Zt[2]*e.tint[2]]})}}const Ca=s=>s<.28?[1.05,1.03,.88]:s>.74?[.92,1,1.05]:[1,1,1];function Pa(s,e,t){return Array.from({length:s},(o,a)=>{const i=e*Math.sqrt((a+.5)/s),n=a*2.39996+t()*.6;return[Math.cos(n)*i+(t()-.5)*.08,Math.sin(n)*i+(t()-.5)*.08]})}function fs(s,e){const t=[],o=[],a=[],i=[],n=[],r=[],l=new M;for(const f of s){for(let d=0;d<f.sway.length;d++){const h=f.positions[d*3]-f.heart[0],m=f.positions[d*3+2]-f.heart[1],p=Math.hypot(h,m);l.set(h,0,m).multiplyScalar(p>1e-4?1/p:0).multiplyScalar(e*(.35+.65*f.sway[d])),l.x+=f.normals[d*3],l.y+=f.normals[d*3+1],l.z+=f.normals[d*3+2],l.normalize(),f.normals[d*3]=l.x,f.normals[d*3+1]=l.y,f.normals[d*3+2]=l.z}const c=i.length;t.push(...f.positions),o.push(...f.normals),a.push(...f.shade),i.push(...f.sway),n.push(...f.phase);for(const d of f.indices)r.push(c+d)}const u=new te;return u.setIndex(r),u.setAttribute("position",new L(t,3)),u.setAttribute("normal",new L(o,3)),u.setAttribute("color",new L(a,3)),u.setAttribute("aSway",new L(i,1)),u.setAttribute("aPhase",new L(n,1)),u.computeBoundingSphere(),u}function _a(s){const e=[],t=ls(2711),o=s?5:7;for(const[a,i]of Pa(6,.55,t)){const n=.82+t()*.36;ds(e,{x:a,z:i,blades:o,height:.7*n,fall:.4,spread:.3,lean:.44,droop:.5,width:s?.052:.046,curved:s?0:2,tint:Ca(t()),value:.9+t()*.2},t)}return fs(e,.45)}function Aa(){const s=[];return ds(s,{x:0,z:0,blades:13,height:1,fall:.38,spread:.12,lean:.44,droop:.85,width:.042,curved:13,tint:[1,1,1],value:1},ls(9127)),fs(s,.85)}const ka=`
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
`;function Ra(s){const e=new qs({vertexColors:!0,side:nt}),t={value:.35},o={value:new M(.8,.15,.55).normalize()};return e.onBeforeCompile=a=>{a.uniforms.uTime=s,a.uniforms.uWind=t,a.uniforms.uWindDir=o,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
attribute float aSway;
attribute float aPhase;
uniform float uTime;
uniform float uWind;
uniform vec3 uWindDir;
varying float vTip;
${ka}`).replace("#include <begin_vertex>",`#include <begin_vertex>
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
totalEmissiveRadiance += diffuseColor.rgb * (0.05 + 0.16 * vTip * vTip) * vec3(0.8, 0.9, 1.15);`)},e.customProgramCacheKey=()=>"pocket-orbit-meadow",e}function Ea(s,e,t,o,a){const i=Ra(t),n=ue(31337),r=new Vs,l=new D,u=new D,f=(g,v,x,w)=>ze(g,v)<.965&&x>fe+.05&&!a(g,v,w)&&!e.solid(g,v,.3,x,x+.6),c=o?1.15:.82,d=[];for(let g=-28;g<=28;g+=c)for(let v=-22;v<=22;v+=c){const x=g+(n()-.5)*c*.8,w=v+(n()-.5)*c*.8,b=R(x,w);f(x,w,b,1.02)&&d.push([x,b,w])}const h=new Po(_a(o),i,d.length);d.forEach(([g,v,x],w)=>{const b=(o?.72:.6)+n()*.2;r.position.set(g,v-.03,x),r.rotation.set(0,n()*Math.PI*2,0),r.scale.set(b,(.5+n()*.3)*1,b),r.updateMatrix(),h.setMatrixAt(w,r.matrix),Mt(g,x,u),l.copy(u).multiplyScalar(1.12+n()*.1),h.setColorAt(w,l)}),h.receiveShadow=!0,h.layers.set(1),s.add(h);const m=[];for(let g=0;g<(o?900:1800)&&m.length<(o?110:240);g++){const v=(n()-.5)*54,x=(n()-.5)*42,w=R(v,x);ze(v,x)<.8&&n()>.25||!f(v,x,w,1.3)||m.push([v,w,x])}const p=new Po(Aa(),i,m.length);m.forEach(([g,v,x],w)=>{const b=.45+n()*.3;r.position.set(g,v-.03,x),r.rotation.set(0,n()*Math.PI*2,0),r.scale.set(b,b*(.8+n()*.4),b),r.updateMatrix(),p.setMatrixAt(w,r.matrix),Mt(g,x,u),l.copy(u).multiplyScalar(1.05+n()*.12),p.setColorAt(w,l)}),p.receiveShadow=!0,p.layers.set(1),s.add(p)}const Ke=B("#4a3c3a"),bt=B("#6a5548");let us={value:0},ht=null;function Da(){if(ht)return ht;const s=256,e=document.createElement("canvas");e.width=e.height=s;const t=e.getContext("2d");t.fillStyle="#ffffff";const o=ue(1337),a=(n,r,l,u,f)=>{t.save(),t.translate(n,r),t.rotate(f),t.beginPath(),t.moveTo(0,-l/2),t.quadraticCurveTo(u,-l*.1,0,l/2),t.quadraticCurveTo(-u,-l*.1,0,-l/2),t.fill(),t.restore()},i=s/2;for(let n=0;n<70;n++){const r=Math.sqrt(o())*s*.36,l=o()*Math.PI*2,u=i+Math.cos(l)*r,f=i+Math.sin(l)*r*.9;a(u,f,30+o()*26,11+o()*6,l+Math.PI/2+(o()-.5)*.9)}return t.beginPath(),t.arc(i,i,s*.2,0,Math.PI*2),t.fill(),ht=new Be(e),ht.colorSpace=at,ht}function We(s,e=0,t=!1){const o=new de({color:s,roughness:.8});return e&&(o.emissive=new D(s),o.emissiveIntensity=e),t&&(o.map=Da(),o.alphaTest=.5,o.side=nt),o.onBeforeCompile=a=>{a.uniforms.uLeafTime=us,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
uniform float uLeafTime;`).replace("#include <begin_vertex>",`#include <begin_vertex>
      float leafLift = max(0.0, transformed.y - 1.2);
      float leafWave = sin(uLeafTime * .9 + transformed.x * .35 + transformed.z * .22);
      transformed.x += leafWave * .011 * leafLift;
      transformed.z += cos(uLeafTime * .7 + transformed.z * .31) * .008 * leafLift;`),a.fragmentShader=a.fragmentShader.replace("#include <normal_fragment_begin>",`#include <normal_fragment_begin>
      ${t?"normal = normalize( vNormal );":""}`).replace("#include <emissivemap_fragment>",`
      #include <emissivemap_fragment>
      float leafRim = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 2.4);
      vec3 leafRimColor = mix(vec3(.10, .32, .34), vec3(.34, .30, .62), clamp(normal.y * .5 + .5, 0.0, 1.0));
      totalEmissiveRadiance += leafRimColor * leafRim * .42 * diffuseColor.rgb * 3.0;
    `)},o.customProgramCacheKey=()=>`foliage-${e}-${t}`,o}const hs=["#2f6a52","#43805a","#5a9064","#3f7a63","#6f9768"],ps=["#2f5f74","#3f7a8c","#4f8e90","#4a7894","#6a9aa2"],ms=["#c66fae","#9a6fd6","#e38bb8","#7d8de6"],Ia=hs.map(s=>We(s)),Ba=ps.map(s=>We(s)),vo=(s,e)=>`#${new D(s).offsetHSL(0,-.02,e).getHexString()}`,Fa=hs.map(s=>We(vo(s,.09),0,!0)),Oa=ps.map(s=>We(vo(s,.09),0,!0)),No=["#1f4d48","#285c50","#2f6a5a","#234f5a"].map(s=>We(s)),Rt=ms.map(s=>We(s,.32)),Uo=ms.map(s=>We(vo(s,.06),.38,!0)),La=ce(16766704,2.2);function no(s,e,t){const o=new Lt(s,e),a=ue(t),i=o.attributes.position,n=o.attributes.normal,r=new Map;for(let l=0;l<i.count;l++){const u=`${i.getX(l).toFixed(3)},${i.getY(l).toFixed(3)},${i.getZ(l).toFixed(3)}`;r.has(u)||r.set(u,.84+a()*.3);const f=r.get(u),c=i.getX(l),d=i.getY(l),h=i.getZ(l),m=Math.hypot(c,d,h)||1;n.setXYZ(l,c/m,d/m,h/m),i.setXYZ(l,c*f,d*f,h*f)}return o}function De(s,e,t,o,a,i){const n=t.clone().sub(e),r=e.clone().lerp(t,.5);U(s,new Xo(a,o,n.length()*1.05,7),i,r.x,r.y,r.z).quaternion.setFromUnitVectors(new M(0,1,0),n.normalize())}function Ga(s,e,t,o,a,i,n,r=!1){const l=R(t,o),u=r?Ba:Ia,f=r?Oa:Fa,c=ue(n),d=new H;d.position.set(t,l-.18,o),d.rotation.y=i,d.scale.setScalar(a),s.add(d);const h=[new M(0,-.02,0),new M(-.11,.96,.09),new M(.055,1.88,.16),new M(.49,2.68,.2),new M(.75,3.3,.14)],m=[.238,.174,.118,.071,.023];for(let p=1;p<h.length;p++)De(d,h[p-1],h[p],m[p-1],m[p],p%2===0?Ke:bt);for(let p=0;p<5;p++){const g=p*Math.PI*.4+c()*.31;De(d,new M(-.02,.31,.03),new M(Math.cos(g)*.62,-.02,Math.sin(g)*.6),.12,.036,Ke)}for(let p=0;p<10;p++){const g=p/10,v=p*2.4+c()*.41,x=new M(Math.cos(v),0,Math.sin(v)),w=h[1].clone().lerp(h[4],.25+.67*g),b=(1-g*.69)*(1.32+c()*.51),C=w.clone().addScaledVector(x,b);C.y+=.31+c()*.19;const P=w.clone().lerp(C,.53);P.y-=.14,De(d,w,P,.079-g*.033,.049,Ke),De(d,P,C,.052,.017,bt);for(let S=0;S<3;S++){const T=P.clone().lerp(C,.22+S*.32),_=(1-g*.54)*(1-S*.18),I=U(d,no(1,1,n+p*7+S),u[(p+S+1)%u.length],T.x,T.y+.1,T.z);I.scale.set((.9+c()*.25)*_,(.46+c()*.16)*_,(.86+c()*.22)*_),I.rotation.y=p*.94,I.rotation.z=-.16+c()*.35,ao(d,f[(p+S+1)%f.length],I.position,I.scale.x,I.scale.y,I.scale.z,S===0?6:4,c)}}for(let p=0;p<3;p++){const g=U(d,no(.56-p*.09,1,n+91+p),u[2+p],.62+.139*p,3.07+.2*p,.14);g.scale.set(1.22,.57,.92),ao(d,f[2+p],g.position,.68-p*.1,.32-p*.05,.5-p*.08,4,c)}e.add(t,o,a*.43,a*.43,l-.2,a*1.8)}const Na=new M(0,0,1),pt=new M;function ao(s,e,t,o,a,i,n,r){for(let l=0;l<n;l++){const u=r()*Math.PI*2,f=-.25+r()*1.15;pt.set(Math.cos(u),f,Math.sin(u)).normalize();const c=(o+i)*(.62+r()*.26),d=U(s,new Te(c,c*(.8+r()*.3)),e,t.x+pt.x*o*.82,t.y+pt.y*a*.9,t.z+pt.z*i*.82);d.quaternion.setFromUnitVectors(Na,pt),d.rotateZ(r()*Math.PI*2)}}function Ua(s,e,t,o,a,i){const n=ue(i),r=R(t,o),l=new H;l.position.set(t,r-.1,o),l.rotation.y=n()*6.28,l.scale.setScalar(a),s.add(l),A(l,Ke,.07,.14,1.3,0,.62,0,6);const u=4+Math.floor(n()*2);for(let f=0;f<u;f++){const c=f/u,d=(1-c*.72)*(.95+n()*.14),h=.95-c*.25,m=new fo(d,h,7,1),p=m.attributes.position;for(let v=0;v<p.count;v++)p.getY(v)<0&&(p.setY(v,p.getY(v)-.08+n()*.05),p.setX(v,p.getX(v)*(.9+n()*.2)),p.setZ(v,p.getZ(v)*(.9+n()*.2)));m.computeVertexNormals();const g=U(l,m,No[(f+i)%No.length],(n()-.5)*.05,.9+f*.52,(n()-.5)*.05);g.rotation.y=n()*6.28}e.add(t,o,a*.5,a*.5,r-.2,a*3)}function Wa(s,e,t,o,a,i){const n=ue(i),r=R(t,o),l=new H;l.position.set(t,r-.1,o),l.rotation.y=n()*6.28,l.scale.setScalar(a),s.add(l);const u=[new M(0,0,0),new M(.12,.8,.05),new M(-.05,1.55,.1),new M(.15,2.1,0)],f=[.17,.12,.08,.05];for(let h=1;h<u.length;h++)De(l,u[h-1],u[h],f[h-1],f[h],bt);const c=Rt[i%Rt.length],d=Rt[(i+1)%Rt.length];for(let h=0;h<7;h++){const m=h*2.4+n()*.5,p=h===0?0:.55+n()*.45,g=u[3].x+Math.cos(m)*p,v=u[3].z+Math.sin(m)*p,x=u[3].y+.1+(h===0?.35:n()*.3-.1);h&&De(l,u[2],new M(g,x-.1,v),.05,.02,bt);const w=U(l,no(.5+n()*.2,1,i+h),h%3?c:d,g,x,v);if(w.scale.y=.7,ao(l,Uo[(i+(h%3?0:1))%Uo.length],w.position,.6,.38,.6,5,n),h&&n()>.35){const b=U(l,new Lt(.055,0),La,g*1.08,x-.42,v*1.08);b.castShadow=!1}}e.add(t,o,a*.4,a*.4,r-.2,a*2.5)}const Ha=[[-12.9,9.6,.95],[-19.4,10.9,.85],[-11.4,-4.6,.8],[-19.6,1.1,.78],[6.9,15.1,.82],[17.7,4.2,.74]];function Va(s,e,t){const o=ue(48151);let a=0;const i=t?22:38;for(let n=0;n<900&&a<i;n++){const r=o()*Math.PI*2,l=.74+o()*.17,[u,f]=_e(r,l),c=R(u,f);f>12.5&&Math.abs(u-2)<9||c<fe+.25||St(u,f,1.7)||e.solid(u,f,1.1,c-.5,c+3)||(Ua(s,e,u,f,.8+o()*.65,3001+n),a++)}}const qa=[[-21.4,-1.2,1.22,.75,1],[-17.1,-7.15,1.32,.12,1],[-12.35,-5.4,.94,-1.2,1],[-17.95,2.62,.83,.68,1],[-22.2,5.9,.83,.24,1],[-8.15,-12.3,1.13,.28,0],[-.42,-16.85,1.12,-.43,0],[-9.65,-14.48,.78,1.1,0],[4.35,-15.45,1.29,.12,0],[8.67,-12.66,.88,1.68,0],[16.7,-10.47,1.01,-.29,0],[19.55,-6.5,1.03,.52,0],[22.02,-1.73,.79,-1,0],[20.45,5.3,1.26,.98,0],[18.05,10.94,1.12,-.4,0],[16.43,13.64,.66,2.12,0],[-7.15,13.7,1.13,.8,0],[-8.9,10.6,.86,1.46,0],[-3.2,14.32,.72,1.24,0],[-2.75,-6.9,.72,.26,0],[5.9,-.96,.78,-.46,0],[-10.5,-2.3,.72,.89,1],[-5.5,-4.75,.73,-.89,0]];function St(s,e,t){const o=t*t;return cs.some(a=>a.some(i=>(i.x-s)**2+(i.y-e)**2<o))}function ja(s,e,t){const o=["#6f7073","#827263","#697b77","#9d8a76","#51636a"].map(r=>B(r)),a=["#49694f","#5d805f","#798b61"].map(r=>B(r)),i=[ce(10466559,.9),ce(16757611,.8),ce(16744383,.9),ce(16773280,.7)],n=ue(5256);for(let r=0;r<(t?290:505);r++){const l=(n()-.5)*56,u=(n()-.5)*42,f=R(l,u),c=ze(l,u);if(c>.995||f<fe-.12||e.solid(l,u,.15,f,f+.3))continue;const h=c>.82?.23+n()**2*.79:.06+n()**2*.26;if(St(l,u,.89)&&h>.12)continue;const m=U(s,new wt(h,0),o[r%o.length],l,f-h*.06,u);if(m.scale.set(.98+n()*.52,.35+n()*.43,.75+n()*.39),m.rotation.set(.25,n()*6.28,(n()-.5)*.43),h>.64&&e.add(l,u,h*1.15,h*1.17,f-.3,h*.75),!(c>.91||h<.16||r%4!==0))for(let p=0;p<4;p++)U(s,new Lt(.2+n()*.25,0),a[p%a.length],l+(n()-.5)*.85,f+.132,u+(n()-.5)*.62).scale.set(1.22,.65+n()*.3,.78)}for(const[r,l,u]of[[-10.7,6.35,0],[-17.8,4.45,0],[-2.8,6.8,2],[3.5,3.84,1],[9.77,10.8,1],[15.76,11.53,3],[-5.4,-9.9,0],[15.2,-3.56,1],[3.12,14.72,3],[-4.88,11.4,2]])for(let f=0;f<(t?14:28);f++){const c=r+(n()-.5)*2.4,d=l+(n()-.5)*1.55,h=R(c,d),m=.19+n()*.31;if(St(c,d,.69)||h<fe||e.solid(c,d,.1,h,h+.3))continue;A(s,a[f%3],.011,.018,m,c,h+m/2,d,5);const p=U(s,new Lt(.069+n()*.045,0),i[u],c,h+m,d);p.scale.y=.59}for(const[r,l]of[[-12.4,6.9],[-16.7,5.08],[-19.6,7.05],[-17.1,10.55]])if(!(R(r,l)<fe-.2))for(let u=0;u<13;u++){const f=(n()-.5)*.92,c=(n()-.5)*.67,d=.21+n()*.62,h=A(s,a[u%3],.012,.023,d,r+f,R(r+f,l+c)+d/2,l+c,5);h.rotation.z=f*.22}}function Xa(s){const e=B("#a68c67");for(const[t,o]of[[[.565,.64,.715,.79],.895],[[1.881,1.954,2.027],.925]]){let a;for(const i of t){const[n,r]=_e(i,o),l=R(n,r);A(s,bt,.086,.11,1.04,n,l+.43,r,7),y(s,Ke,.235,.145,.235,n,l+.965,r).rotation.y=i;const u=new M(n,l+.73,r);if(a){const f=a.clone().lerp(u,.5);f.y-=.15,De(s,a,f,.025,.023,e),De(s,f,u,.023,.025,e)}a=u}}}function Ya(s,e,t,o){us=t,qa.forEach(([i,n,r,l,u],f)=>Ga(s,e,i,n,r,l,772+f*331,!!u)),Ha.forEach(([i,n,r],l)=>{const u=R(i,n);u>fe+.2&&!St(i,n,1.2)&&!e.solid(i,n,.9,u-.5,u+2)&&Wa(s,e,i,n,r,61+l*17)}),Va(s,e,o),ja(s,e,o),Ea(s,e,t,o,St),Xa(s),[-15,-1.02,10.5].forEach((i,n)=>{const[r,l]=n===0?ne:[i,15.65],u=R(r,l);u>fe&&(y(s,Ke,.28,.14,.83,r,u+.04,l).rotation.y=n*.27)})}class $a{constructor(e){this.land=e,this.camera.layers.enable(1)}camera=new jo(48,1,.18,700);yaw=.19;pitch=.415;aspect=1;position=new M;aim=new M;target=new M;sample=new M;initialized=!1;intro=0;resize(e,t){this.aspect=e/Math.max(1,t),this.camera.aspect=this.aspect,this.camera.updateProjectionMatrix()}turn(e,t){this.yaw=(this.yaw-e*.0078)%(Math.PI*2),this.pitch=Xe.clamp(this.pitch+t*.0057,.16,1.08)}arrive(){this.intro=1}recenter(){this.yaw=.19,this.pitch=.415}update(e,t,o,a,i,n=!1){const r=this.aspect<.76,l=o?r?58:52:48;if(o)this.walkPose(t,r);else{const c=67.5/Math.max(.32,this.aspect),d=r?Math.max(82,c):63+Math.max(0,1.28-this.aspect)*28,h=i?0:Math.sin(a*.16)*1.5;if(this.position.set(12.9+h,r?38.5:24.6,d),this.aim.set(r?-.25:-9.75*Math.min(1,this.aspect/1.46),r?d*.229:7.9,0),this.intro>0&&!i){this.intro=Math.max(0,this.intro-e/4.6);const m=this.intro,p=m*m*(3-2*m),g=-.38*p,v=this.position.x-this.aim.x,x=this.position.z-this.aim.z,w=1+.14*p;this.position.set(this.aim.x+(v*Math.cos(g)-x*Math.sin(g))*w,this.position.y+10*p,this.aim.z+(v*Math.sin(g)+x*Math.cos(g))*w),this.aim.y+=3.5*p}}(o||i)&&(this.intro=0);const f=!this.initialized||n||i||this.intro>0?1:1-Math.exp(-e*(o?9:3.5));this.camera.position.lerp(this.position,f),this.target.lerp(this.aim,o?Math.min(1,f*1.22):f),this.camera.fov=Xe.lerp(this.camera.fov,l,f),this.camera.updateProjectionMatrix(),this.camera.lookAt(this.target),this.camera.updateMatrixWorld(),this.initialized=!0}walkPose(e,t){const o=Math.sin(this.yaw),a=Math.cos(this.yaw),i=t?8.9:9.3,n=i*Math.cos(this.pitch);this.aim.set(e.x-o*1.6,Math.max(-2,e.y)+1.78,e.z-a*1.6),this.position.set(e.x+o*n+a*.5,Math.max(-.5,e.y)+1.17+i*Math.sin(this.pitch),e.z+a*n-o*.5),this.sample.set(e.x,Math.max(-2,e.y)+1.5,e.z);for(let r=1;r<=20;r++){const l=r/20,u=Xe.lerp(this.sample.x,this.position.x,l),f=Xe.lerp(this.sample.y,this.position.y,l),c=Xe.lerp(this.sample.z,this.position.z,l);if(this.land.solid(u,c,.42,f-.39,f+.38)||ze(u,c)<1&&R(u,c)>f-.45){this.position.lerp(this.sample,1-Math.max(.2,(r-1)/20));break}}}}const Qa=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowLeft","ArrowDown","ArrowRight"]),Ka=new Set(["ShiftLeft","ShiftRight"]),Za=new Set(["KeyQ","KeyE"]),Ja=new Set(["Space","Enter","NumpadEnter"]);class ei{constructor(e,t,o,a){this.stick=t,this.paceButton=o;const i={signal:this.events.signal},n=(...p)=>p.some(g=>this.held.has(g)),r=()=>{const p=Number(n("KeyD","ArrowRight"))-Number(n("KeyA","ArrowLeft")),g=Number(n("KeyS","ArrowDown"))-Number(n("KeyW","ArrowUp"));this.axes.set(p+this.joystick.x,g+this.joystick.y),this.axes.lengthSq()>1&&this.axes.normalize(),a.invalidate()};e.addEventListener("keydown",p=>{p.altKey||p.ctrlKey||p.metaKey||p.isComposing||!a.active()||(Qa.has(p.code)||Ka.has(p.code)||Za.has(p.code)?(p.preventDefault(),this.held.add(p.code),r()):!p.repeat&&Ja.has(p.code)?(p.preventDefault(),a.inspect()):!p.repeat&&p.code==="KeyR"&&(p.preventDefault(),a.reset()))},i),window.addEventListener("keyup",p=>{this.held.delete(p.code)&&r()},i),e.addEventListener("blur",()=>{this.held.clear(),r()},i),window.addEventListener("blur",()=>this.clear(),i),o.addEventListener("pointerdown",p=>{p.button!==0||this.pacePointer!==null||!a.active()||(p.preventDefault(),this.pacePointer=p.pointerId,o.setPointerCapture(p.pointerId),o.setAttribute("data-held",""),a.invalidate())},i);const l=p=>{this.pacePointer===p.pointerId&&(this.pacePointer=null,o.removeAttribute("data-held"),a.invalidate())};o.addEventListener("pointerup",l,i),o.addEventListener("pointercancel",l,i),o.addEventListener("lostpointercapture",l,i);let u=null;e.addEventListener("pointerdown",p=>{p.button!==0||u||!a.active()||(u={id:p.pointerId,startX:p.clientX,startY:p.clientY,lastX:p.clientX,lastY:p.clientY,moving:!1},e.setPointerCapture(p.pointerId))},i),e.addEventListener("pointermove",p=>{if(a.active()){if(!u){p.pointerType==="mouse"&&a.hover(p.clientX,p.clientY);return}u.id===p.pointerId&&(!u.moving&&Math.hypot(u.startX-p.clientX,u.startY-p.clientY)<5||(u.moving=!0,a.look(p.clientX-u.lastX,p.clientY-u.lastY),u.lastX=p.clientX,u.lastY=p.clientY))}},i),e.addEventListener("pointerup",p=>{!u||u.id!==p.pointerId||(!u.moving&&a.active()&&a.pick(p.clientX,p.clientY),u=null)},i);const f=p=>{u?.id===p.pointerId&&(u=null)};e.addEventListener("pointercancel",f,i),e.addEventListener("lostpointercapture",f,i),e.addEventListener("pointerleave",()=>e.removeAttribute("data-inspectable"),i);const c=t.querySelector("span");let d=-1;const h=p=>{const g=t.getBoundingClientRect(),v=g.width*.32;this.joystick.set((p.clientX-g.left-g.width/2)/v,(p.clientY-g.top-g.height/2)/v),this.joystick.lengthSq()>1&&this.joystick.normalize(),c.style.transform=`translate(${this.joystick.x*v}px, ${this.joystick.y*v}px)`,r()};t.addEventListener("pointerdown",p=>{d!==-1||!a.active()||(p.preventDefault(),d=p.pointerId,t.setPointerCapture(d),h(p))},i),t.addEventListener("pointermove",p=>{p.pointerId===d&&a.active()&&h(p)},i);const m=p=>{d===p.pointerId&&(d=-1,this.joystick.set(0,0),c.style.removeProperty("transform"),r())};t.addEventListener("pointerup",m,i),t.addEventListener("pointercancel",m,i),t.addEventListener("lostpointercapture",m,i)}axes=new K;held=new Set;joystick=new K;events=new AbortController;pacePointer=null;get turn(){return Number(this.held.has("KeyE"))-Number(this.held.has("KeyQ"))}get walkHeld(){return this.pacePointer!==null||this.held.has("ShiftLeft")||this.held.has("ShiftRight")}clear(){this.held.clear(),this.joystick.set(0,0),this.axes.set(0,0),this.stick.querySelector("span").style.removeProperty("transform");const e=this.pacePointer;this.pacePointer=null,this.paceButton.removeAttribute("data-held"),e!==null&&this.paceButton.hasPointerCapture(e)&&this.paceButton.releasePointerCapture(e)}dispose(){this.events.abort()}}function ti(s){const e=new Set,t=new Set,o=new Set;s.traverse(a=>{if("geometry"in a&&a.geometry instanceof te&&e.add(a.geometry),a instanceof E&&"instanceMatrix"in a&&"dispose"in a&&typeof a.dispose=="function"&&a.dispose(),!("material"in a))return;const i=Array.isArray(a.material)?a.material:[a.material];for(const n of i)if(n instanceof js){t.add(n);for(const r of Object.values(n))r instanceof _o&&o.add(r);if(n instanceof ae)for(const r of Object.values(n.uniforms))r.value instanceof _o&&o.add(r.value)}});for(const a of o)a.dispose();for(const a of e)a.dispose();for(const a of t)a.dispose();s.clear()}const wo=3.5,oi=wo*1.6,be=.9,si=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];function ni(s,e,t,o){if(s.clearPath(e,t,...o))return[o];const a=(c,d)=>{const h=Math.round(c/be),m=Math.round(d/be);let p=null,g=1/0;for(let v=-2;v<=2;v++)for(let x=-2;x<=2;x++){const w=h+v,b=m+x,C=w*be,P=b*be,S=Math.hypot(C-c,P-d);S<g&&s.canStand(C,P,.025)&&s.clearPath(c,d,C,P)&&(p=[w,b],g=S)}return p},i=a(e,t),n=a(...o);if(!i||!n)return[];const r=(c,d)=>Math.hypot(n[0]-c,n[1]-d),l={x:i[0],z:i[1],cost:0,estimate:r(...i),last:null,checked:!1},u=[l],f=new Map([[i.join(","),l]]);for(;u.length;){let c=0;for(let h=1;h<u.length;h++)u[h].estimate<u[c].estimate&&(c=h);const d=u.splice(c,1)[0];if(d.x===n[0]&&d.z===n[1]){const h=[o];for(let g=d;g;g=g.last)h.push([g.x*be,g.z*be]);h.reverse();const m=[];let p=[e,t];for(let g=0;g<h.length;g++){for(;g+1<h.length&&s.clearPath(...p,...h[g+1]);)g++;p=h[g],m.push(p)}return m}d.checked=!0;for(const[h,m]of si){const p=d.x+h,g=d.z+m,v=`${p},${g}`,x=f.get(v),w=d.cost+Math.hypot(h,m);if(x&&(x.checked||w>=x.cost)||!s.clearPath(d.x*be,d.z*be,p*be,g*be))continue;const b=w+r(p,g);if(x)Object.assign(x,{cost:w,estimate:b,last:d});else{const C={x:p,z:g,cost:w,estimate:b,last:d,checked:!1};f.set(v,C),u.push(C)}}}return[]}class ai{constructor(e){this.land=e,this.reset()}position=new M;velocity=new K;heading=Math.PI;falling=!1;gravity=0;path=[];lastRange=1/0;obstruction=0;desired=new K;get walkingRoute(){return this.path.length>0}get moving(){return this.velocity.lengthSq()>0}reset(){const[e,t]=sn;this.position.set(e,R(e,t),t),this.velocity.set(0,0),this.heading=Math.PI,this.falling=!1,this.gravity=0,this.cancel()}cancel(){this.path.length=0,this.lastRange=1/0,this.obstruction=0}guide(e){this.cancel();const{x:t,z:o}=this.position;return this.falling||(this.path=ni(this.land,t,o,e)),this.walkingRoute}update(e,t,o,a){if(t.lengthSq()>.001){this.cancel();const h=Math.cos(o),m=Math.sin(o);this.desired.set(t.x*h+t.y*m,-t.x*m+t.y*h)}else if(this.path.length){const[h,m]=this.path[0];this.desired.set(h-this.position.x,m-this.position.z);const p=this.desired.length();p<.32?(this.path.shift(),this.lastRange=1/0,this.obstruction=0):(this.obstruction=p+.005<this.lastRange?0:this.obstruction+e,this.lastRange=p,this.obstruction>1.35&&this.cancel()),this.desired.multiplyScalar(1/Math.max(1,p)),this.path.length||this.desired.set(0,0)}else this.desired.set(0,0);const i=this.walkingRoute||a?wo:oi;if(this.desired.multiplyScalar(i),this.falling)return this.gravity-=14.3*e,this.position.y+=this.gravity*e,this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.y*e,this.position.y<-7.7?(this.reset(),!0):!1;const n=this.desired.lengthSq()>.04?12.4:15.1;this.velocity.lerp(this.desired,1-Math.exp(-n*e)),this.velocity.lengthSq()<.001&&this.velocity.set(0,0);const r=this.position.x,l=this.position.z,u=r+this.velocity.x*e,f=l+this.velocity.y*e;this.canMove(u,f)?(this.position.x=u,this.position.z=f):(this.canMove(u,l)&&(this.position.x=u),this.canMove(this.position.x,f)&&(this.position.z=f));const c=this.position.x-r,d=this.position.z-l;if(Math.abs(c)+Math.abs(d)>4e-4){const h=Math.atan2(c,d),m=Math.atan2(Math.sin(h-this.heading),Math.cos(h-this.heading));this.heading+=m*(1-Math.exp(-e*14))}else this.desired.lengthSq()>.04&&this.velocity.multiplyScalar(.55);return ze(this.position.x,this.position.z)>1.003?(this.falling=!0,this.cancel()):this.position.y=R(this.position.x,this.position.z),!1}canMove(e,t){if(ze(e,t)>.975)return!1;const o=R(e,t);return o>fe-.19&&o-this.position.y<.27&&!this.land.solid(e,t,Zo,o+.04,o+1.57)}}const Nt={rings:96,sides:24,length:96},ii=1.15,io=11/Nt.length,ve={jade:"#597d68",dark:"#334e47",belly:"#deca9f",mane:"#b45a30",maneLight:"#e88b40",horn:"#eee0bc",eye:"#ecb84c"};function Wo(s){const e=Math.min(1,Math.max(0,s/io));return Math.max(.035,1.9*Math.pow(1-Math.min(1,s),.72)*(1+.12*Math.sin(s*Math.PI))*(.72+.28*e*e*(3-2*e)))}function ri(){const{rings:s,sides:e}=Nt,t=(s+1)*(e+1),o=new te,a=new Float32Array(t*3),i=new Float32Array(t*2),n=[],r=new D(ve.jade),l=new D(ve.belly),u=new D(ve.dark),f=new D;for(let c=0;c<=s;c++)for(let d=0;d<=e;d++){const h=c*(e+1)+d,m=-Math.cos(d/e*Math.PI*2);if(f.copy(r).lerp(u,Math.max(0,m)*.24).lerp(l,Math.max(0,Math.min(1,(m-.06)*5))),f.toArray(a,h*3),i[h*2]=d/e,i[h*2+1]=c/s,c<s&&d<e){const p=h+e+1;n.push(h,h+1,p,h+1,p+1,p)}}return o.setAttribute("position",new L(new Float32Array(t*3),3)),o.setAttribute("normal",new L(new Float32Array(t*3),3)),o.setAttribute("color",new L(a,3)),o.setAttribute("uv",new L(i,2)),o.setIndex(n),o}function gs(s,e=24){const t=new te,o=[],a=[],i=[];s.forEach(([n,r,l,u],f)=>{for(let c=0;c<=e;c++){const d=c/e*Math.PI*2,h=Math.sin(d),m=Math.cos(d);if(o.push(Math.sign(h)*Math.pow(Math.abs(h),.82)*r,u+Math.sign(m)*Math.pow(Math.abs(m),.88)*l,n),a.push(c/e,f/(s.length-1)),f<s.length-1&&c<e){const p=f*(e+1)+c,g=p+e+1;i.push(p,g,p+1,p+1,g,g+1)}}});for(const n of[0,s.length-1]){const r=o.length/3,l=s[n];o.push(0,l[3],l[0]),a.push(.5,n===0?0:1);for(let u=0;u<e;u++){const f=n*(e+1)+u;n===0?i.push(r,f,f+1):i.push(r,f+1,f)}}return t.setAttribute("position",new L(o,3)),t.setAttribute("uv",new L(a,2)),t.setIndex(i),t.computeVertexNormals(),t}const vt=[[-1.85,.06,.1,.45],[-1.45,1.3,1.03,.5],[-.5,1.85,1.25,.57],[.55,2.12,1.32,.59],[1.45,2.01,1.18,.5],[2.15,1.72,.92,.34],[2.95,1.36,.67,.18],[3.8,1.12,.52,.08],[4.6,.96,.42,.035],[5.18,.91,.37,.02],[5.48,.99,.36,.03],[5.67,.77,.3,.03],[5.8,.015,.025,.03]],ci=[[-.65,.03,.03,.03],[0,.98,.17,-.06],[1,1.05,.18,-.04],[2.2,.92,.16,-.04],[3.25,.84,.15,-.12],[3.9,.7,.12,-.15],[4.2,.33,.08,-.14],[4.28,.015,.015,-.12]];function vs(s){const e=Math.max(0,Math.min(1,(s-2.5)/1.5)),t=e*e*(3-2*e);return[.82-t*.08,.88-t*.26]}function ro(s){const e=vt,t=(o,a)=>{const i=l=>(e[l+1][a]-e[l][a])/(e[l+1][0]-e[l][0]);if(o===0)return i(0);if(o===e.length-1)return i(o-1);const n=i(o-1),r=i(o);return n*r<=0?0:2*n*r/(n+r)};for(let o=1;o<e.length;o++){if(s>e[o][0])continue;const a=Math.max(0,(s-e[o-1][0])/(e[o][0]-e[o-1][0])),i=e[o-1],n=e[o],r=n[0]-i[0],l=u=>(2*a*a*a-3*a*a+1)*i[u]+(a*a*a-2*a*a+a)*r*t(o-1,u)+(-2*a*a*a+3*a*a)*n[u]+(a*a*a-a*a)*r*t(o,u);return[s,l(1),l(2),l(3)]}return e[e.length-1]}function li(s,e,t){const o=Math.max(0,Math.min(1,(t-5.12)/.4)),a=o*o*(3-2*o),i=(l,u,f,c)=>Math.exp(-Math.pow((Math.abs(s)-l)/f,2)-Math.pow((e-u)/c,2)),n=a*(i(.67,.12,.25,.2)*.11+i(.34,-.18,.28,.16)*.025+i(0,.26,.24,.2)*.035-i(.54,.16,.15,.07)*.105-i(0,-.12,.075,.18)*.045-i(.86,-.02,.065,.18)*.028);if(n<=0)return n;const r=Math.max(0,5.8-t);return r>1e-5?r*(1-Math.exp(-n/r)):0}function di(){const s=[];vt.slice(1).forEach((a,i)=>{const n=vt[i][0],r=a[0]>=3.5?12:6;for(let l=0;l<r;l++)s.push(ro(n+(a[0]-n)*l/r))}),s.push(vt[vt.length-1]);const e=gs(s,80),t=e.getAttribute("position"),o=e.getAttribute("uv");for(let a=0;a<t.count;a++){const i=t.getZ(a),[,n,r,l]=ro(i),[u,f]=vs(i),c=o.getX(a)*Math.PI*2,d=Math.sign(Math.sin(c))*Math.pow(Math.abs(Math.sin(c)),u)*n,h=l+Math.sign(Math.cos(c))*Math.pow(Math.abs(Math.cos(c)),f)*r;if(a>=s.length*81)continue;o.setY(a,(i+1.85)/7.65),t.setX(a,d);const m=Math.max(0,Math.min(1,(h-l)/r)),p=Math.max(0,Math.min(1,(i+.7)/1.2))*Math.max(0,Math.min(1,(3.6-i)/1.2));t.setY(a,h+Math.exp(-d*d*3.5)*m*m*p*.11),t.setZ(a,i+li(d,h,i))}return e.computeVertexNormals(),e}function ws(s,e){const[,t,o,a]=ro(e),[i,n]=vs(e),r=Math.pow(Math.min(1,Math.abs((s-a)/o)),1/n);return t*Math.pow(Math.sqrt(Math.max(0,1-r*r)),i)}const fi={z:1.85,y:.76,length:.62,height:.31,tilt:-.24};function xo(s,e,t,o=0){const a=fi,i=a.z+s*a.length,n=a.y+a.tilt*s+e*(e>0?.86-s*.24:.82*(1-s*.16))*Math.pow(Math.max(0,1-s*s),.75)*a.height;return t.set(ws(n,i)+.065+.075*(1-s*s)*(1-e*e)+o,n,i)}function ui(){const s=[],e=[],t=[],o=new M,a=32,i=16;for(let r=0;r<=a;r++)for(let l=0;l<=i;l++)if(xo(r/a*2-1,l/i*2-1,o),s.push(o.x,o.y,o.z),e.push(r/a,l/i),r<a&&l<i){const u=r*(i+1)+l,f=u+i+1;t.push(u,u+1,f,u+1,f+1,f)}const n=new te;return n.setAttribute("position",new L(s,3)),n.setAttribute("uv",new L(e,2)),n.setIndex(t),n.computeVertexNormals(),n}function hi(){const s=[],e=[],t=new M,o=32,a=6;for(let n=0;n<=o;n++)for(let r=0;r<=a;r++){const l=n/o*2.8-1.75,u=r/a,f=Math.pow(Math.sin(n/o*Math.PI),.6);xo(l,1,t);const c=t.x;if(t.y+=Math.max(0,-l-.45)*.27+u*.23*f*(.9-l*.24),t.z-=u*.16*f,t.x=Math.max(c-.14*u,ws(t.y,t.z)+.025)+Math.sin(u*Math.PI)*.09*f,s.push(t.x,t.y,t.z),n<o&&r<a){const d=n*(a+1)+r,h=d+a+1;e.push(d,d+1,h,d+1,h+1,h)}}const i=new te;return i.setAttribute("position",new L(s,3)),i.setIndex(e),i.computeVertexNormals(),i}function pi(s,e){const t=Math.max(0,Math.min(1,e))*(s.length-1),o=Math.min(s.length-2,Math.floor(t)),a=t-o;return s[o]*(1-a)+s[o+1]*a}function Ge(s,e,t=22,o=8,a){const i=new Xs(s.map(c=>new M(...c))),n=i.computeFrenetFrames(t,!1),r=[],l=[],u=[];for(let c=0;c<=t;c++){const d=c/t,h=i.getPointAt(d),m=a?e*pi(a,d):e*Math.pow(1-d,.72)+.008;for(let p=0;p<=o;p++){l.push(p/o,c/t);const g=p/o*Math.PI*2,v=n.normals[c],x=n.binormals[c];if(r.push(h.x+m*(v.x*Math.cos(g)+x.x*Math.sin(g)),h.y+m*(v.y*Math.cos(g)+x.y*Math.sin(g)),h.z+m*(v.z*Math.cos(g)+x.z*Math.sin(g))),c<t&&p<o){const w=c*(o+1)+p,b=w+o+1;u.push(w,b,w+1,w+1,b,b+1)}}}const f=new te;return f.setAttribute("position",new L(r,3)),f.setAttribute("uv",new L(l,2)),f.setIndex(u),f.computeVertexNormals(),f}function Jt(s,e,t){const o=e.clone().sub(s),a=new M().crossVectors(o,new M(0,0,1)).normalize();a.lengthSq()<.01&&a.set(1,0,0);const i=new M().crossVectors(a,o).normalize(),n=[];for(let d=0;d<=10;d++){const h=d/10,m=s.clone().addScaledVector(o,h).addScaledVector(i,Math.sin(h*Math.PI)*t*.42),p=t*(.16*(1-h)+Math.pow(Math.sin(h*Math.PI),.75)*Math.pow(1-h,.35));n.push([-1,0,1,0].map((g,v)=>m.clone().addScaledVector(a,g*p*(g<0&&d===6?.67:g>0&&d===8?.48:1)).addScaledVector(i,v===1?p*.1:v===3?-p*.025:0)))}const r=[],l=[],u=[],f=[new D(ve.maneLight),new D(ve.mane),new D("#853f27"),new D(ve.mane)];for(let d=0;d<4;d++){const h=r.length/3;for(let m=0;m<n.length;m++)for(const p of[d,(d+1)%4]){const g=n[m][p];if(r.push(g.x,g.y,g.z),f[d].toArray(l,l.length),m<n.length-1&&p===d){const v=h+m*2;u.push(v,v+1,v+2,v+1,v+3,v+2)}}}const c=new te;return c.setAttribute("position",new L(r,3)),c.setAttribute("color",new L(l,3)),c.setIndex(u),c.computeVertexNormals(),c}const mt=.15;function mi(){const s=[];for(const a of[-1,1])for(let i=0;i<2;i++)for(let n=0;n<(i?7:9);n++){const r=(i?-.64:-.74)+n*(i?.33:.29),l=(i?1.36:1.72)+n%3*.13;s.push(Jt(new M(a*(1.22+Math.cos(r)*.8),.36+Math.sin(r)*1.34,i?.15:-.85),new M(a*(1.25+Math.cos(r)*l),.45+Math.sin(r)*(i?1.8:2.3),(i?-1.55:-2.7)-n%3*.27),i?.3+n%2*.04:.42+n%3*.035))}for(let a=0;a<3;a++)s.push(Jt(new M(0,1.8,-.3-a*.7),new M(0,2.8+a%2*.4,-2.3-a*.6),.6));const e=[];for(let a=0;a<9;a++){const i=(a/8-.5)*1.5,n=3.4-Math.abs(a-4)*.42;e.push(Jt(new M(Math.sin(i)*.05,0,.25),new M(Math.sin(i)*n*.55,.25-Math.abs(i)*.35,-n),.34-Math.abs(a-4)*.03))}const t=[-1,1].map(a=>Ge(Array.from({length:25},(i,n)=>xo(n/12-1,a,new M,.012).toArray()),a>0?.035:.04,28,6,[.1,1,1,.1])),o={body:ri(),head:di(),jaw:gs(ci),eye:ui(),brow:hi(),lids:gt(t),mane:gt(s),tail:gt(e),horn:gt([Ge([[1.42,1.5,-.7],[1.74,2.7,-1.13],[1.97,3.8,-1.62],[1.75,4.45,-2.5]],.27,28,12),Ge([[1.74,2.7,-1.13],[2.35,3.05,-1.48],[2.72,3.66,-2.02]],.15,24,10),Ge([[1.91,3.63,-1.52],[2.35,3.85,-1.91],[2.51,4.2,-2.45]],.105,22,10)]),whisker:Ge([[1,-.24,5.12],[2.6,-.4,5.3],[4.5,.05,4.3],[4.8,.82,2.2],[4.3,1.38,.55]],.03,36,6),arm:Ge([[0,0,0],[.85,-.55,-.72],[1.25,-1.35,-.4],[1.02,-2.25,.6]],.6,22,12,[1,.98,.65,.6]),finger:Ge([[0,0,0],[0,-.12,.24],[0,-.38,.45],[0,-.56,.39]],.17,12,8,[1,.95,.7,.5]),spike:new fo(.32,1.1,5)};for(const a of[...s,...e,...t])a.dispose();return o}function gi(s,e,t){const o=mi(),a=new de({color:ve.jade,roughness:.5,emissive:"#2f8a6a",emissiveIntensity:.7}),i={body:new de({vertexColors:!0,roughness:.48,emissive:"#2f8a6a",emissiveIntensity:.6}),mane:new de({vertexColors:!0,roughness:.6,emissive:ve.maneLight,emissiveIntensity:.35,side:nt}),horn:new de({color:ve.horn,roughness:.45}),belly:new de({color:ve.belly,roughness:.6}),dark:new de({color:ve.dark,roughness:.7}),eye:new Z({color:new D(ve.eye).multiplyScalar(2.2),toneMapped:!1})},n=new H;n.name="Pocket Orbit dragon",n.scale.setScalar(mt),n.position.set(t[0],R(t[0],t[1]),t[1]),s.add(n);const r=new E(o.body,i.body);r.frustumCulled=!1,r.castShadow=!0,n.add(r);const l=new H;l.scale.setScalar(ii),n.add(l);const u=new E(o.head,a);u.castShadow=!0,l.add(u,new E(o.mane,i.mane));const f=new H;f.position.set(0,-.26,1.4),f.scale.set(.9,1,1),f.add(new E(o.jaw,i.belly)),l.add(f);for(const z of[-1,1]){const k=new H;k.scale.set(z,1,1),k.add(new E(o.eye,i.eye),new E(o.brow,i.dark),new E(o.lids,i.dark),new E(o.horn,i.horn),new E(o.whisker,i.horn)),l.add(k)}const c=[-1,1].map(z=>{const k=new H,F=new H;F.position.set(z*1.48,-.45,0),F.scale.set(z,1,1),F.add(new E(o.arm,a));for(const W of[-.28,0,.28]){const O=new E(o.finger,a);O.position.set(1.02+W,-2.39,1.02),O.rotation.y=W*.7,F.add(O)}return k.add(F),n.add(k),{mount:k,limb:F,side:z}}),d=Array.from({length:22},()=>{const z=new E(o.spike,i.mane);return n.add(z),z}),h=new E(o.tail,i.mane);h.scale.setScalar(2.3),n.add(h);const m=10.5/mt,p=.16,g=7/mt,v=new M,x=new M,w=new M,b=new M,C=new M,P=new M(0,1,0),S=new Dt;let T=0;const _=(z,k)=>{const F=T*p-z/m,W=m*(1+.14*Math.sin(F*2+1));return k.set(Math.cos(F)*W,g+Math.sin(F*3)*1.6/mt+Math.sin(F*1.3)*.8/mt,Math.sin(F)*W)},I=z=>{const k=z*Nt.length;_(k,v),_(k+.35,x),w.subVectors(v,x).normalize(),b.crossVectors(P,w).normalize(),C.crossVectors(w,b).normalize(),v.addScaledVector(b,Math.sin(T*1.15-z*8.5)*(.15+z*1.5)).addScaledVector(C,Math.sin(T*.8-z*6)*(.1+z*.7)),S.makeBasis(b,C,w)},V=o.body.getAttribute("position"),N=o.body.getAttribute("normal"),{rings:X,sides:q}=Nt;return()=>{T=e.value;for(let z=0;z<=X;z++){const k=z/X,F=Wo(k);I(k);for(let W=0;W<=q;W++){const O=W/q*Math.PI*2,se=Math.sin(O),Ce=Math.cos(O),Fe=b.x*se+C.x*Ce,he=b.y*se+C.y*Ce,Ae=b.z*se+C.z*Ce,ke=z*(q+1)+W;V.setXYZ(ke,v.x+Fe*F,v.y+he*F*.92,v.z+Ae*F),N.setXYZ(ke,Fe,he,Ae)}}V.needsUpdate=!0,N.needsUpdate=!0,I(0),l.position.copy(v),l.quaternion.setFromRotationMatrix(S),f.rotation.x=.08+Math.max(0,Math.sin(T*.7))*.2,I(io);for(const z of c){z.mount.position.copy(v),z.mount.quaternion.setFromRotationMatrix(S);const k=Math.sin(T*.85-io*7);z.limb.rotation.x=.05+k*.09,z.limb.rotation.z=z.side*(.1+k*.05)}d.forEach((z,k)=>{const F=(k+1)/(d.length+3),W=Wo(F);I(F),z.position.copy(v).addScaledVector(C,W*.9),z.quaternion.setFromRotationMatrix(S),z.rotateX(-.5),z.scale.setScalar(Math.max(.25,W/1.9)*1.6)}),I(.985),h.position.copy(v),h.quaternion.setFromRotationMatrix(S),h.rotateY(Math.sin(T*1.9)*.22)}}function vi(){const s=document.createElement("canvas");s.width=s.height=128;const e=s.getContext("2d");for(let t=0;t<9;t++){const o=30+Math.random()*68,a=34+Math.random()*60,i=22+Math.random()*26,n=e.createRadialGradient(o,a,0,o,a,i);n.addColorStop(0,"rgba(255,255,255,.55)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,128,128)}return new Be(s)}function Ho(s,e,t){let o=[s.clone(),e.clone()],a=s.distanceTo(e)*t;for(let i=0;i<6;i++){const n=[o[0]];for(let r=1;r<o.length;r++){const l=o[r-1],u=o[r],f=l.clone().lerp(u,.5);f.x+=(Math.random()-.5)*a,f.z+=(Math.random()-.5)*a,f.y+=(Math.random()-.5)*a*.3,n.push(f,u)}o=n,a*=.55}return o}function Et(s,e,t){const o=[],a=[],i=new M,n=new M,r=new M;s.forEach((u,f)=>{r.subVectors(s[Math.min(s.length-1,f+1)],s[Math.max(0,f-1)]).normalize(),n.subVectors(t,u).normalize(),i.crossVectors(r,n).normalize();const c=e*(1-f/s.length*.6);if(o.push(u.x-i.x*c,u.y-i.y*c,u.z-i.z*c,u.x+i.x*c,u.y+i.y*c,u.z+i.z*c),f<s.length-1){const d=f*2;a.push(d,d+1,d+2,d+1,d+3,d+2)}});const l=new te;return l.setAttribute("position",new L(o,3)),l.setIndex(a),l}function wi(s,e){const t=e[0]-9,o=e[1]-3.5,a=R(e[0],e[1]),i=a+6.5,n=new H;n.name="Dream Ocean thunderhead",s.add(n);const r=vi(),l=Array.from({length:14},(w,b)=>{const C=new Tt({map:r,color:"#2b2446",transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),P=new ot(C),S=b/14*Math.PI*2,T=3+b%3*3.2;return P.position.set(t+Math.cos(S)*T,i+b%4*1.1,o+Math.sin(S)*T*1.3),P.scale.setScalar(11+b%5*2.4),n.add(P),{sprite:P,material:C,drift:Math.random()*6.28}}),u=new Z({color:new D("#b9a2ff").multiplyScalar(1.6),transparent:!0,opacity:0,blending:Pe,depthWrite:!1,toneMapped:!1}),f=new Z({color:new D("#f4efff").multiplyScalar(3.2),transparent:!0,opacity:0,blending:Pe,depthWrite:!1,toneMapped:!1}),c=new H;s.add(c);const d=new Yo("#c8b6ff",0,34,1.4);d.position.set(t,a+6,o),s.add(d);const h=new D("#c9b8ff"),m=new D("#2b2446");let p=1.5,g=99,v=0;function x(w){for(const X of[...c.children])X.geometry.dispose();c.clear();const b=Math.random()<.35,C=Math.random()*Math.PI*2,P=b?3+Math.random()*4:2+Math.random()*7,S=(b?e[0]:t)+Math.cos(C)*P,T=(b?e[1]:o)+Math.sin(C)*P,_=new M(S,Math.max(Ie,R(S,T)),T),I=new M(t+(Math.random()-.5)*8,i,o+(Math.random()-.5)*6),V=Ho(I,_,.28),N=w.position;c.add(new E(Et(V,.55,N),u),new E(Et(V,.09,N),f));for(let X=0;X<3;X++){const q=V[4+Math.floor(Math.random()*(V.length*.55))],z=q.clone().add(new M((Math.random()-.5)*7,-3-Math.random()*5,(Math.random()-.5)*7)),k=Ho(q,z,.35);c.add(new E(Et(k,.3,N),u),new E(Et(k,.05,N),f))}d.position.copy(_).add(new M(0,3,0)),g=0}return{update(w,b,C,P){v+=(b-v)*Math.min(1,w*2);for(const _ of l)_.material.opacity=v*.92,_.sprite.position.x+=Math.sin(g*.2+_.drift)*w*.1;n.visible=v>.01,!P&&v>.25&&(p-=w,p<=0&&(x(C),p=2.6+Math.random()*3.8)),g+=w;const S=g<.12?1:g<.42?.25:g<.52?.85:Math.max(0,1-(g-.52)/.35),T=P?0:S*v;u.opacity=T,f.opacity=T,c.visible=T>.01,d.intensity=T*90;for(const _ of l)_.material.color.copy(m).lerp(h,T*.8);return T}}}const xs=1.22;function Vo(s){Xt.common.includes("NIGHT_ACES")||(Xt.common+=`
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
    `,Xt.tonemapping_fragment=`
      #if defined( TONE_MAPPING )
        gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
      #elif defined( NIGHT_ACES )
        gl_FragColor.rgb = nightAces( gl_FragColor.rgb );
      #endif
    `);const e=new Set;s.traverse(t=>{if(t instanceof E||t instanceof co||t instanceof ot)for(const o of Array.isArray(t.material)?t.material:[t.material])e.has(o)||!o.toneMapped||o.defines?.NIGHT_ACES||(e.add(o),o.defines={...o.defines,NIGHT_ACES:xs.toFixed(3)},o.needsUpdate=!0)})}function xi(s){const e=new nn,t={antialias:!e.light,alpha:!1,powerPreference:"default",stencil:!1},o=s.canvas.getContext("webgl2",t);if(!o)return null;const a=new Ys({canvas:s.canvas,context:o,...t});a.toneMapping=qo,a.toneMappingExposure=xs,a.shadowMap.enabled=!0,a.shadowMap.type=$s,a.shadowMap.autoUpdate=!1,a.shadowMap.needsUpdate=!0;const i=new Qs;i.fog=new Ks("#0b0e28",.0046);const n=new H;i.add(n),i.add(new Zs("#94a6ff","#43305a",1.55));const r=new jt("#c7d4ff",2.05);r.position.set(-24,33,24),r.castShadow=!0,r.shadow.mapSize.setScalar(e.light?1024:2048),Object.assign(r.shadow.camera,{near:2,far:150,left:-32,right:32,top:31,bottom:-31}),r.shadow.camera.updateProjectionMatrix(),r.shadow.normalBias=.049,r.shadow.bias=-21e-5,r.shadow.radius=3,r.shadow.intensity=.79,i.add(r);const l=new jt("#d58cff",1.35);l.position.set(12,14,-35),i.add(l);const u=new jt("#5ce6d6",.55);u.position.set(-34,8,-12),i.add(u);const f=new In,c={value:0},d=Ma(wo,pe);i.add(d.root,d.dust);const h=Dn(n,c,e.light,new M(-24,33,24));pa(n);let m=!1;const p=Kn(n,f,c,()=>{m&&Vo(i),a.shadowMap.needsUpdate=!0,pe()}),g=sa(n,f,pe);ea(n,!e.light,c,f),Ya(n,f,c,e.light);const v=gi(n,c,ge["pocket-orbit"].landmark),x=wi(n,ge["dream-ocean"].landmark);Bn(n);const w=new ai(f),b=new $a(f);let C=null;e.light||(C=new fn(a,new Ye(1,1,{type:$e,samples:4})),C.addPass(new hn(i,b.camera)),C.addPass(new Je(new K(1,1),.6,.4,.94)),C.addPass(new un),a.toneMapping=Js,Vo(i),m=!0);const P=Object.values(ge).map(G=>{const[$,Y]=G.landmark,Q=R($,Y),[xe,J,me]=G.hit;return{...G,point:new M($+(G.id==="hanzizap"?2.1:0),Q+G.signHeight,Y),box:new Qo(new M($-xe/2,Q-.5,Y-me/2),new M($+xe/2,Q+J,Y+me/2))}}),S=[...P,...g],T=new M,_=new M,I=new M,V=new en,N=new K,X=new AbortController,q={signal:X.signal};let z="overview",k=null,F=null,W=!1,O=!1,se=!1,Ce=!0,Fe=!1,he=!0,Ae=0,ke=0,Re=1,Ee=1,ct=0;const Vt=()=>!W&&!O&&!se;function pe(){Vt()&&!document.hidden&&Ae===0&&(Ae=requestAnimationFrame(Ms))}function He(G,$){z!==G&&(z=G,ct=.72,s.mode(z),z==="overview"&&(lt(),w.velocity.set(0,0),le.clear())),$&&s.canvas.focus({preventScroll:!0}),pe()}function lt(){w.cancel(),F&&(F=null,s.walking(null))}function yo(){lt(),w.reset(),b.recenter(),he=!0,s.status("Back at arrival."),He("walk",!0)}function Mo(G,$){const Y=s.canvas.getBoundingClientRect();N.set((G-Y.left)/Y.width*2-1,1-($-Y.top)/Y.height*2),V.setFromCamera(N,b.camera);let Q=1/0,xe=null;for(const J of S){if(!V.ray.intersectBox(J.box,_))continue;const me=_.distanceTo(V.ray.origin);me<Q&&(Q=me,xe=J.id)}if(!xe)return null;for(let J=1;J<Q;J+=.9)if(V.ray.at(J,I),ze(I.x,I.z)<.985&&I.y+.2<R(I.x,I.z))return null;return xe}const le=new ei(s.canvas,s.stick,s.paceButton,{active:Vt,invalidate:pe,reset:yo,hover:(G,$)=>s.canvas.toggleAttribute("data-inspectable",Mo(G,$)!==null),pick:(G,$)=>{const Y=Mo(G,$);Y&&s.inspect(Y)},look:(G,$)=>{He("walk",!0),b.turn(G,$),pe()},inspect:()=>{k&&s.inspect(k)}});function qt(){const G=s.viewport.getBoundingClientRect();Re=Math.max(1,G.width),Ee=Math.max(1,G.height),a.setPixelRatio(e.pixels(Re,Ee)),a.setSize(Re,Ee,!1),C&&(C.setPixelRatio(a.getPixelRatio()),C.setSize(Re,Ee)),b.resize(Re,Ee),he=!0,pe()}function ys(){const G=z==="overview",$=Re/Ee<.76,Y=ct>.4;let Q=null,xe=3.04;for(const J of P){const me=Math.hypot(w.position.x-J.approach[0],w.position.z-J.approach[1]);!G&&!w.falling&&me<xe&&(xe=me,Q=J.id),T.copy(J.point).project(b.camera);const dt=(T.x+1)*.5*Re,Ve=(1-T.y)*.5*Ee,Ct=T.z>-1&&T.z<1&&dt>49&&dt<Re-49&&Ve>($?82:105)&&Ve<Ee-95,qe=G?J.id!=="observatory"&&J.id!=="workshop":!Y&&me<29&&me>3.9;s.sign(J.id,Ct&&qe?{x:dt,y:Ve}:null)}k!==Q&&(k=Q,s.nearby(Q))}function zt(){cancelAnimationFrame(Ae),Ae=0,ke=0}function Ms(G){if(Ae=0,!Vt()||document.hidden)return;const $=ke?Math.max(0,(G-ke)/1e3):0,Y=Math.min($||1/60,.065),Q=eo.matches;if(ke=G,ct=Math.max(0,ct-Y),(le.axes.lengthSq()>.001||le.turn)&&He("walk",!1),le.turn&&b.turn(le.turn*Y*230,0),z==="walk"){const Ve=Y>.033?2:1;let Ct=!1;for(let qe=0;qe<Ve;qe++)if(w.update(Y/Ve,le.axes,b.yaw,le.walkHeld)){Ct=!0;break}if(Ct&&(b.recenter(),he=!0,s.status("You returned to arrival.")),F&&!w.walkingRoute){const qe=ge[F].name,So=ge[F].approach,bs=Math.hypot(w.position.x-So[0],w.position.z-So[1])<.85;s.status(bs?`Arrived at ${qe}.`:"Assisted walk ended."),F=null,s.walking(null)}}Q||(c.value+=Y),!Fe&&d.ready&&(Fe=!0,!Q&&z==="overview"&&!W&&b.arrive()),p(),b.update(Y,w.position,z==="walk",c.value,Q,he),d.update(w.position,w.heading,Y,b.camera,le.walkHeld||!!F,w.falling,he),he=!1,v(),h();const[xe,J]=ge["dream-ocean"].landmark,me=Math.hypot(w.position.x-xe,w.position.z-J),dt=z==="walk"?Math.min(1,Math.max(0,(18-me)/10)):0;x.update(Y,dt,b.camera,Q),C?C.render(Y):a.render(i,b.camera),Ce&&d.ready&&(Ce=!1,s.ready(!0)),ys(),!Q&&e.measure($)&&(e.plain&&C&&(C.dispose(),C=null),qt()),!Q||w.falling||w.walkingRoute||w.moving||le.axes.lengthSq()>0||le.turn||ct>0?pe():ke=0}const bo=new ResizeObserver(qt);return bo.observe(s.viewport),qt(),eo.addEventListener("change",pe,q),document.addEventListener("visibilitychange",()=>{document.hidden?(le.clear(),zt()):pe()},q),s.canvas.addEventListener("webglcontextlost",G=>{G.preventDefault(),O=!0,zt(),lt(),le.clear(),s.ready(!1)},q),s.canvas.addEventListener("webglcontextrestored",()=>{O=!1,Ce=!0,a.shadowMap.needsUpdate=!0,pe()},q),{play:()=>He("walk",!0),overview:()=>He("overview",!1),pause(G){W=G,W?(le.clear(),zt()):pe()},walk(G){if(lt(),He("walk",!0),!w.guide(ge[G].approach)){s.status("Walk from arrival or select another destination.");return}F=G,s.walking(G),s.status(`Walking to ${ge[G].name}.`)},stopWalking:lt,reset:yo,dispose(){se=!0,zt(),X.abort(),bo.disconnect(),le.dispose(),r.shadow.dispose(),C?.dispose(),ti(i),a.dispose()}}}const Si=Object.freeze(Object.defineProperty({__proto__:null,createIsland:xi},Symbol.toStringTag,{value:"Module"}));export{ti as d,Si as i,bi as t};
