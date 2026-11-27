const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./pocketOrbitShuttle-DLs6NCVV.js","./three-Da-3Iyaf.js","./shared-C-DZESF8.js"])))=>i.map(i=>d[i]);
import{M as E,O as Ms,B as te,F,S as ne,U as Ze,V as K,W as Ye,H as $e,N as Ss,T as Ts,R as zs,C as Cs,a as Ps,L as _s,b as As,c as ks,A as Vo,d as Rs,e as Es,f as Ds,g as D,h as b,i as ze,j as ee,k as Is,l as Dt,P as qo,m as To,n as Bs,o as zo,p as Ut,q as Fs,r as Pe,s as ot,t as St,u as Ue,v as st,w as Os,D as nt,x as le,y as vt,z as Ls,E as co,G as Tt,I as Ot,J as Gs,K as Ns,Q as Co,X as Us,Y as Wt,Z as lo,_ as Ws,$ as jo,a0 as W,a1 as Me,a2 as fo,a3 as Xo,a4 as Yo,a5 as $o,a6 as Xe,a7 as Hs,a8 as Po,a9 as Vs,aa as Lt,ab as qs,ac as _o,ad as js,ae as Xs,af as Ys,ag as $s,ah as Qs,ai as Ks,aj as jt,ak as Zs,al as Xt,am as Js}from"./three-Da-3Iyaf.js";import{d as me,_ as en,r as tn,a as eo,c as on,Q as sn}from"./shared-C-DZESF8.js";const It={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class at{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const nn=new Ms(-1,1,1,-1,0,1);class an extends te{constructor(){super(),this.setAttribute("position",new F([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new F([0,2,0,0,2,0],2))}}const rn=new an;class uo{constructor(e){this._mesh=new E(rn,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,nn)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class cn extends at{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ne?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ze.clone(e.uniforms),this.material=new ne({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new uo(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ao extends at{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const a=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let s,r;this.inverse?(s=0,r=1):(s=1,r=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),i.buffers.stencil.setFunc(a.ALWAYS,s,4294967295),i.buffers.stencil.setClear(r),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(a.EQUAL,1,4294967295),i.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),i.buffers.stencil.setLocked(!0)}}class ln extends at{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class dn{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new K);this._width=n.width,this._height=n.height,t=new Ye(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$e}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cn(It),this.copyPass.material.blending=Ss,this.timer=new Ts}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let a=0,i=this.passes.length;a<i;a++){const s=this.passes[a];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),s.needsSwap){if(n){const r=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Ao!==void 0&&(s instanceof Ao?n=!0:s instanceof ln&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new K);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(n,a),this.renderTarget2.setSize(n,a);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(n,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Pt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class fn extends at{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ze.clone(Pt.uniforms),this.material=new zs({name:Pt.name,uniforms:this.uniforms,vertexShader:Pt.vertexShader,fragmentShader:Pt.fragmentShader}),this._fsQuad=new uo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Cs.getTransfer(this._outputColorSpace)===Ps&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===_s?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===As?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ks?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Vo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Rs?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Es?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Ds&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class un extends at{constructor(e,t,n=null,a=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=a,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new D}render(e,t,n){const a=e.autoClear;e.autoClear=!1;let i,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=a}}const hn={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new D(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Je extends at{constructor(e,t=1,n,a){super(),this.strength=t,this.radius=n,this.threshold=a,this.resolution=e!==void 0?new K(e.x,e.y):new K(256,256),this.clearColor=new D(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new Ye(i,s,{type:$e,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const c=new Ye(i,s,{type:$e,depthBuffer:!1});c.texture.name="UnrealBloomPass.h"+f,c.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(c);const d=new Ye(i,s,{type:$e,depthBuffer:!1});d.texture.name="UnrealBloomPass.v"+f,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),i=Math.round(i/2),s=Math.round(s/2)}const r=hn;this.highPassUniforms=Ze.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ne({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];i=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new K(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ze.clone(It.uniforms),this.blendMaterial=new ne({uniforms:this.copyUniforms,vertexShader:It.vertexShader,fragmentShader:It.fragmentShader,premultipliedAlpha:!0,blending:ze,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new D,this._oldClearAlpha=1,this._basic=new ee,this._fsQuad=new uo(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),a=Math.round(t/2);this.renderTargetBright.setSize(n,a);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(n,a),this.renderTargetsVertical[i].setSize(n,a),this.separableBlurMaterials[i].uniforms.invSize.value=new K(1/n,1/a),n=Math.round(n/2),a=Math.round(a/2)}render(e,t,n,a,i){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let r=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[l].uniforms.direction.value=Je.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Je.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),r=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(n*n))/n);const a=[],i=[];for(let s=1;s<e;s+=2){const r=t[s],l=s+1<e?t[s+1]:0,u=r+l;a.push((s*r+(s+1)*l)/u),i.push(u)}return new ne({defines:{KERNEL_PAIRS:a.length},uniforms:{colorTexture:{value:null},invSize:{value:new K(.5,.5)},direction:{value:new K(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:a},gaussianWeights:{value:i}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new ne({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Je.BlurDirectionX=new K(1,0);Je.BlurDirectionY=new K(0,1);class pn extends E{constructor(e,t={}){super(e),this.isWater=!0;const n=this,a=t.textureWidth!==void 0?t.textureWidth:512,i=t.textureHeight!==void 0?t.textureHeight:512,s=t.clipBias!==void 0?t.clipBias:0,r=t.alpha!==void 0?t.alpha:1,l=t.time!==void 0?t.time:0,u=t.waterNormals!==void 0?t.waterNormals:null,f=t.sunDirection!==void 0?t.sunDirection:new b(.70707,.70707,0),c=new D(t.sunColor!==void 0?t.sunColor:16777215),d=new D(t.waterColor!==void 0?t.waterColor:8355711),h=t.eye!==void 0?t.eye:new b(0,0,0),m=t.distortionScale!==void 0?t.distortionScale:20,p=t.side!==void 0?t.side:Is,g=t.fog!==void 0?t.fog:!1,v=new Bs,w=new b,x=new b,M=new b,C=new Dt,z=new b(0,0,-1),T=new zo,S=new b,A=new b,B=new zo,H=new Dt,N=new qo,U=new Ye(a,i,{type:$e}),V={name:"MirrorShader",uniforms:Ze.merge([To.fog,To.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new Dt},sunColor:{value:new D(8355711)},sunDirection:{value:new b(.70707,.70707,0)},eye:{value:new b},waterColor:{value:new D(5592405)}}]),vertexShader:`
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
				}`},P=new ne({name:V.name,uniforms:Ze.clone(V.uniforms),vertexShader:V.vertexShader,fragmentShader:V.fragmentShader,lights:!0,side:p,fog:g});P.uniforms.mirrorSampler.value=U.texture,P.uniforms.textureMatrix.value=H,P.uniforms.alpha.value=r,P.uniforms.time.value=l,P.uniforms.normalSampler.value=u,P.uniforms.sunColor.value=c,P.uniforms.waterColor.value=d,P.uniforms.sunDirection.value=f,P.uniforms.distortionScale.value=m,P.uniforms.eye.value=h,n.material=P,n.onBeforeRender=function(R,L,q){if(x.setFromMatrixPosition(n.matrixWorld),M.setFromMatrixPosition(q.matrixWorld),C.extractRotation(n.matrixWorld),w.set(0,0,1),w.applyMatrix4(C),S.subVectors(x,M),S.dot(w)>0)return;S.reflect(w).negate(),S.add(x),C.extractRotation(q.matrixWorld),z.set(0,0,-1),z.applyMatrix4(C),z.add(M),A.subVectors(x,z),A.reflect(w).negate(),A.add(x),N.position.copy(S),N.up.set(0,1,0),N.up.applyMatrix4(C),N.up.reflect(w),N.lookAt(A),N.far=q.far,N.updateMatrixWorld(),N.projectionMatrix.copy(q.projectionMatrix),H.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),H.multiply(N.projectionMatrix),H.multiply(N.matrixWorldInverse),v.setFromNormalAndCoplanarPoint(w,x),v.applyMatrix4(N.matrixWorldInverse),T.set(v.normal.x,v.normal.y,v.normal.z,v.constant);const Y=N.projectionMatrix;B.x=(Math.sign(T.x)+Y.elements[8])/Y.elements[0],B.y=(Math.sign(T.y)+Y.elements[9])/Y.elements[5],B.z=-1,B.w=(1+Y.elements[10])/Y.elements[14],T.multiplyScalar(2/T.dot(B)),Y.elements[2]=T.x,Y.elements[6]=T.y,Y.elements[10]=T.z+1-s,Y.elements[14]=T.w,h.setFromMatrixPosition(q.matrixWorld);const _e=R.getRenderTarget(),Te=R.xr.enabled,Be=R.shadowMap.autoUpdate;n.visible=!1,R.xr.enabled=!1,R.shadowMap.autoUpdate=!1,R.setRenderTarget(U),R.state.buffers.depth.setMask(!0),R.autoClear===!1&&R.clear(),R.render(L,N),n.visible=!0,R.xr.enabled=Te,R.shadowMap.autoUpdate=Be,R.setRenderTarget(_e);const ue=q.viewport;ue!==void 0&&R.state.viewport(ue)}}}const et=[26,20],Ie=-42,de=-.45,se=[-16.4,7.85],Qo=2.41,Ko=.32;function fe(o){return()=>(o=Math.imul(1664525,o)+1013904223|0,(o>>>0)/4294967296)}function Zo(o){return 1+.074*Math.sin(o*3+.7)+.086*Math.cos(o*5-.58)+.031*Math.sin(o*11+.52)+.018*Math.cos(o*19)}function Ce(o,e=1){const t=Zo(o)*e;return[Math.cos(o)*et[0]*t,Math.sin(o)*et[1]*t]}function Se(o,e){const t=o/et[0],n=e/et[1];return Math.hypot(t,n)/Zo(Math.atan2(n,t))}function dt(o,e,t,n,a){return Math.exp(-(((o-t[0])/n)**2+((e-t[1])/a)**2))}const Gt=Ce(Qo),je=[Gt[0]-se[0],Gt[1]-se[1]];function mn(o,e){const t=Math.max(0,Math.min(1.1,((o-se[0])*je[0]+(e-se[1])*je[1])/(je[0]**2+je[1]**2))),n=se[0]+je[0]*t,a=se[1]+je[1]*t;return Math.exp(-((o-n)**2+(e-a)**2)/1.16)}function k(o,e){const t=dt(o,e,me.observatory.landmark,7.1,5.8)*3.7,n=dt(o,e,me["pocket-orbit"].landmark,5.3,5.9)*1.75,a=dt(o,e,[-19.1,-5.7],7.4,5.5)*1.15,i=dt(o,e,[15.6,10],6.8,5.5)*.61,s=dt(o,e,se,3.9,3.3)*1.9+mn(o,e)*.92;return .42+Math.sin(o*.19+e*.24)*.29+Math.cos(e*.31-o*.12)*.32+Math.sin(o*.36+e*.18)*.15+t+n+a+i-s}function Jo(){const o=Math.atan2(-se[1],-se[0]);return[-.95,1.05].map(e=>{const t=o+e;for(let n=1.5;n<9;n+=.1){const a=se[0]+Math.cos(t)*n,i=se[1]+Math.sin(t)*n;if(k(a,i)>de+.15)return[a+Math.cos(t)*.55,i+Math.sin(t)*.55]}return[se[0]+Math.cos(t)*4,se[1]+Math.sin(t)*4]})}const ft={cyan:"#27cfe3",violet:"#676bdb",magenta:"#bd4f91",indigo:"#172b78",gold:"#d6aa63"},gn=()=>`
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
  ${it}
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
`;function vn(){const o=document.createElement("canvas");o.width=o.height=64;const e=o.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255,255,255,.9)"),t.addColorStop(.5,"rgba(255,255,255,.3)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new Ue(o)}function wn(o,e,t,n,a){const i=new Ut().load(new URL("./island-media/water-normals.jpg",document.baseURI).href);i.wrapS=i.wrapT=Fs;const s=new pn(new Pe(1400,1400),{textureWidth:t?512:4,textureHeight:t?512:4,waterNormals:i,sunDirection:a.clone().normalize(),sunColor:"#5a66a0",waterColor:"#04122a",distortionScale:3.2,alpha:1,fog:!1});s.name="Dream Ocean",s.rotation.x=-Math.PI/2,s.position.y=Ie,s.receiveShadow=!0;const r=s.material;r.uniforms.size.value=2.6;const l={uDreamOceanCyan:{value:new D(ft.cyan)},uDreamOceanViolet:{value:new D(ft.violet)},uDreamOceanMagenta:{value:new D(ft.magenta)},uDreamOceanIndigo:{value:new D(ft.indigo)},uDreamOceanGold:{value:new D(ft.gold)},uDreamOceanBandScale:{value:3.2},uDreamOceanTint:{value:.46},uDreamOceanGlint:{value:1},clock:e,uSplash:{value:n.slice(0,5)},uReflect:{value:t?1:0}};if(Object.assign(r.uniforms,l),r.fragmentShader=r.fragmentShader.replace("void main() {",`${gn()}
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
      #include <tonemapping_fragment>`),r.needsUpdate=!0,o.add(s),t){const c=s.onBeforeRender;let d=0;s.onBeforeRender=function(...h){(d++&1)===0&&c.apply(this,h)}}else s.onBeforeRender=()=>{};const u=vn(),f=n.flatMap(c=>Array.from({length:9},(d,h)=>{const m=new ot(new St({map:u,color:"#bcd6ff",transparent:!0,depthWrite:!1,toneMapped:!1,blending:ze,opacity:0}));return o.add(m),{sprite:m,splash:c,phase:h/9}}));return()=>{r.uniforms.time.value=e.value;const c=e.value;for(const d of f){const h=(c*.22+d.phase)%1,m=d.phase*41.3,p=1+h*5.5;d.sprite.position.set(d.splash.x+Math.cos(m)*p,Ie+.6+h*6.5,d.splash.z+Math.sin(m)*p),d.sprite.scale.setScalar(3+h*9),d.sprite.material.opacity=Math.sin(h*Math.PI)*.2}}}const it=`
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
`,xn=`
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
`,yn=`
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${it}
  ${ho}
  ${xn}

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
  ${it}
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
`,Mn=`
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${it}
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
`;function Sn(o,e,t,n,a,i,s){const r=new E(new Pe(e,t),s);return r.rotation.x=-Math.PI/2,r.position.set(n,a,i),o.add(r),r}function Tn(o,e){const t=[],n=[],a=[],s=(l,u)=>{const f=Gt[0]-2.2+l*.21,c=se[1]-4.8+u*.21;return Se(f,c)<=1.002&&k(f,c)<de+.43};for(let l=0;l<=70;l++)for(let u=0;u<=70;u++){if(t.push(Gt[0]-2.2+u*.21,de,se[1]-4.8+l*.21),n.push(u/70,l/70),!l||!u||!s(u,l)||!s(u-1,l-1))continue;const f=l*71+u,c=f-70-2;s(u-1,l)&&a.push(c,f-1,f),s(u,l-1)&&a.push(c,f,f-70-1)}const r=new te;r.setAttribute("position",new F(t,3)),r.setAttribute("uv",new F(n,2)),r.setIndex(a),o.add(new E(r,e))}function zn(o){return new ne({uniforms:{clock:o},transparent:!0,depthWrite:!1,side:nt,toneMapped:!1,vertexShader:Bt,fragmentShader:`
      uniform float clock;
      varying vec2 coords;
      ${it}
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
    `})}function es(o,e,t,n=60,a=15){const i=[],s=[],r=[];for(let c=0;c<=n;c++){const d=c/n;for(let h=0;h<=a;h++){const m=h/a;if(i.push(...t(m,d)),s.push(m,d),c===0||h===0)continue;const p=c*(a+1)+h,g=p-a-1;r.push(g-1,g,p,g-1,p,p-1)}}const l=new te;l.setAttribute("position",new F(i,3)),l.setAttribute("uv",new F(s,2)),l.setIndex(r),o.add(new E(l,e));const[u,,f]=t(.5,1);return new b(u,Ie,f)}function Cn(o,e){return es(o,e,(t,n)=>{const a=Qo+(t-.5)*(.109+.07*n),[i,s]=Ce(a,1.003+Math.sin(n*2.1)*.057),r=Math.max(de+.06,k(i,s)+.02);return[i-n*.19,r+(Ie-r)*n,s+Math.sin(n*2.5)*.71]})}function Pn(o){const e=(t,n,a)=>{const i=Math.sin(o*5+t*.59)*.67+Math.cos(o*13-.9)*.22,s=Math.sin(o*39+.4)*.2+Math.cos(o*49)*.12,r=(i+s)*(.031+t*.003),[l,u]=Ce(o,n+r),[f,c]=Ce(o),d=Math.sin(o*4+.6)*.55+i*.44;return new b(l-t*t*.025,a+k(f,c)/(1+t*.18)+d,u+t*t*.022)};return e(2,.96,-2.1).lerp(e(3,.985,-3.05),.5)}const _n=[1.22,.3,3.55,4.95];function An(o,e){const t=new ee({color:"#05040c"}),n=new le({color:"#5d5163",roughness:.9,flatShading:!0}),a=new vt(1,0),i=fe(4411);return _n.map(s=>{const r=Pn(s),l=new b(r.x/et[0]**2,0,r.z/et[1]**2).normalize(),u=new b(-l.z,0,l.x),f=r.clone().addScaledVector(l,.12),c=new E(new Ls(1,20),t);c.scale.set(.95,.72,1),c.position.copy(f).addScaledVector(l,-.05).add(new b(0,.35,0)),c.lookAt(c.position.clone().add(l)),o.add(c);for(let h=0;h<9;h++){const m=h/9*Math.PI*2,p=new E(a,n);p.position.copy(f).addScaledVector(u,Math.cos(m)*1.05).add(new b(0,.35+Math.sin(m)*.8,0)).addScaledVector(l,.1+i()*.12),p.scale.setScalar(.28+i()*.2),p.rotation.set(i()*6,i()*6,i()*6),o.add(p)}const d=f.clone().add(new b(0,-.12,0));return es(o,e,(h,m)=>{const p=1.5*Math.sqrt(m)+m*.8,g=.55+m*1.6;return[d.x+l.x*p+u.x*(h-.5)*g,d.y+(Ie-d.y)*m*m*.35+(Ie-d.y)*m*.65,d.z+l.z*p+u.z*(h-.5)*g]},70,12)})}function kn(o,e){const t={value:0},n=new Ut().load("./island-media/dream-ocean-reflections.webp",()=>{t.value=1,e()});return n.colorSpace=Tt,n.magFilter=Ot,n.minFilter=Ot,n.generateMipmaps=!1,new ne({uniforms:{clock:o,heroes:{value:n},reflectionReady:t},toneMapped:!1,side:nt,vertexShader:`
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
      ${it}
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
    `})}function Rn(o,e,t){const n=fe(6067),a=[],i=[],s=[];for(let u=0;u<t;u++){const f=(n()-.5)*48,c=(n()-.5)*34;a.push(f,k(f,c)+n()*5+.35,c),i.push(n()*6.283),s.push(n())}const r=new te;r.setAttribute("position",new F(a,3)),r.setAttribute("phase",new F(i,1)),r.setAttribute("hue",new F(s,1));const l=new ne({uniforms:{clock:e},transparent:!0,depthWrite:!1,toneMapped:!1,blending:ze,vertexShader:`
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
    `});o.add(new co(r,l))}function En(o,e,t,n){const a=new E(new st(510,32,20),new ne({uniforms:{clock:e},vertexShader:Bt,fragmentShader:yn,side:Os,depthWrite:!1,fog:!1}));a.renderOrder=-10,a.frustumCulled=!1,o.add(a);const s=(f=>new ne({uniforms:{clock:e,isPool:{value:f}},vertexShader:Bt,fragmentShader:bn}))(1),r=[...Jo().map(([f,c])=>new b(f,k(f,c)+.78,c)),new b(-15.2,k(-15.2,-1.4)+2.4,-1.4)];s.defines={POOL_LAMPS:""},s.uniforms.lampPos={value:r},s.uniforms.lampTint={value:[new D(1,.62,.26),new D(1,.62,.26),new D(.4,.66,1)]},Tn(o,s),Sn(o,830,830,0,Ie+3.5,0,new ne({uniforms:{clock:e},vertexShader:Bt,fragmentShader:Mn,transparent:!0,depthWrite:!1}));const l=zn(e),u=[Cn(o,l),...An(o,l)];return Rn(o,e,t?90:240),wn(o,e,!t,u,n)}class Dn{obstacles=[];add(e,t,n,a,i,s,r=0){this.obstacles.push({x:e,z:t,halfWidth:n/2,halfDepth:a/2,bottom:i,top:i+s,cosine:Math.cos(r),sine:Math.sin(r)})}solid(e,t,n,a,i){return this.obstacles.some(s=>{if(a>=s.top||i<=s.bottom)return!1;const r=e-s.x,l=t-s.z,u=Math.abs(r*s.cosine-l*s.sine)-s.halfWidth,f=Math.abs(r*s.sine+l*s.cosine)-s.halfDepth,c=Math.max(u,0),d=Math.max(f,0);return c*c+d*d<n*n})}canStand(e,t,n=0){const a=k(e,t);return Se(e,t)<.994-n&&a>de-.18&&!this.solid(e,t,Ko,a+.06,a+1.52)}clearPath(e,t,n,a){const i=Math.max(1,Math.ceil(Math.hypot(n-e,a-t)/.28));let s=k(e,t);for(let r=1;r<=i;r++){const l=e+(n-e)*r/i,u=t+(a-t)*r/i,f=k(l,u);if(Math.abs(f-s)>.28||!this.canStand(l,u,.022))return!1;s=f}return!0}}function mt(o,e=!1){const t=o[0].index!==null,n=new Set(Object.keys(o[0].attributes)),a=new Set(Object.keys(o[0].morphAttributes)),i={},s={},r=o[0].morphTargetsRelative,l=new te;l.morphTargetsRelative=r;let u=0;for(let f=0;f<o.length;++f){const c=o[f];let d=0,h=0;if(t!==(c.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in c.attributes){if(!n.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;i[m]===void 0&&(i[m]=[]),i[m].push(c.attributes[m]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(r!==c.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in c.morphAttributes){if(!a.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;if(c.morphAttributes[m].length!==o[0].morphAttributes[m].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have the same number of morph targets for the "'+m+'" morph attribute.'),null;s[m]===void 0&&(s[m]=[]),s[m].push(c.morphAttributes[m]),h++}if(h!==a.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of morph attributes."),null;if(e){let m;if(t)m=c.index.count;else if(c.attributes.position!==void 0)m=c.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;l.addGroup(u,m,f),u+=m}}if(t){let f=0;const c=[];for(let d=0;d<o.length;++d){const h=o[d].index;for(let m=0;m<h.count;++m)c.push(h.getX(m)+f);f+=o[d].attributes.position.count}l.setIndex(c)}for(const f in i){const c=ko(i[f]);if(!c)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;l.setAttribute(f,c)}for(const f in s){const c=s[f][0].length;if(c!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[f]=[];for(let d=0;d<c;++d){const h=[];for(let p=0;p<s[f].length;++p)h.push(s[f][p][d]);const m=ko(h);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;l.morphAttributes[f].push(m)}}}return l}function ko(o){let e,t,n,a=-1,i=0;for(let u=0;u<o.length;++u){const f=o[u];if(e===void 0&&(e=f.array.constructor),e!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=f.itemSize),t!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=f.normalized),n!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(a===-1&&(a=f.gpuType),a!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;i+=f.count*t}const s=new e(i),r=new Gs(s,t,n);let l=0;for(let u=0;u<o.length;++u){const f=o[u];if(f.isInterleavedBufferAttribute){const c=l/t;for(let d=0,h=f.count;d<h;d++)for(let m=0;m<t;m++){const p=f.getComponent(d,m);r.setComponent(d+c,m,p)}}else s.set(f.array,l);l+=f.count*t}return a!==void 0&&(r.gpuType=a),r}function yi(o,e){if(e===Ns)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(e===Co||e===Us){let t=o.getIndex();if(t===null){const i=[],s=o.getAttribute("position");if(s!==void 0){for(let r=0;r<s.count;r++)i.push(r);o.setIndex(i),t=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}const n=t.count-2,a=[];if(e===Co)for(let i=1;i<=n;i++)a.push(t.getX(0)),a.push(t.getX(i)),a.push(t.getX(i+1));else for(let i=0;i<n;i++)i%2===0?(a.push(t.getX(i)),a.push(t.getX(i+1)),a.push(t.getX(i+2))):(a.push(t.getX(i+2)),a.push(t.getX(i+1)),a.push(t.getX(i)));return a.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),o.setIndex(a),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),o}const I=(o,e=.83,t=0)=>new le({color:o,roughness:e,metalness:t});function re(o,e=.75){return new le({color:o,emissive:o,emissiveIntensity:e,roughness:.52})}function G(o,e,t,n=0,a=0,i=0){const s=new E(e,t);return s.position.set(n,a,i),s.castShadow=!0,s.receiveShadow=!0,s.userData.bake=!0,o.add(s),s}function y(o,e,t,n,a,i,s,r){return G(o,new Ws(t,n,a),e,i,s,r)}function _(o,e,t,n,a,i,s,r,l=10){return G(o,new jo(t,n,a,l),e,i,s,r)}function oe(o,e,t,n,a=0,i=0,s=0,r=0){const l=new Wt;t.forEach(([f,c],d)=>d?l.lineTo(f,c):l.moveTo(f,c)),l.closePath();const u=new lo(l,{depth:n,bevelEnabled:r>0,bevelSize:r,bevelThickness:r,bevelSegments:1,steps:1});return G(o,u,e,a,i,s-n/2)}const po=o=>new F(o.flatMap(e=>[e.r,e.g,e.b]),3);function In(o){o.updateMatrixWorld(!0);const e=new Map;o.traverse(t=>{if(!(t instanceof E)||!t.userData.bake||Array.isArray(t.material))return;const n=t.material,a=n.uuid;e.has(a)||e.set(a,{material:n,sources:[],geometries:[]});const i=e.get(a),s=t.geometry.index?t.geometry.toNonIndexed():t.geometry.clone();s.applyMatrix4(t.matrixWorld),i.sources.push(t),i.geometries.push(s)});for(const{material:t,sources:n,geometries:a}of e.values()){const i=mt(a);for(const r of a)r.dispose();if(!i)continue;for(const r of n)r.geometry.dispose(),r.removeFromParent();const s=new E(i,t);s.castShadow=!0,s.receiveShadow=!0,o.add(s)}}const J=I("#25384b",.64,.22),j=I("#49586c",.56,.24),to=I("#557c88",.54,.15),xe=I("#131c2b",.79),ae=I("#b47b57",.54,.26),ie=new ee({color:"#6aefeb",toneMapped:!1}),tt=re(16756065,2.2),mo=new ee({color:"#f589bc",toneMapped:!1}),ts="#13cbb7",ye=(o,e)=>[(o-497)/436,(502-e)/436],os=new Wt().moveTo(...ye(487,114)).quadraticCurveTo(...ye(498,105),...ye(510,114)).lineTo(...ye(715,293)).lineTo(...ye(715,724)).lineTo(...ye(510,890)).quadraticCurveTo(...ye(498,900),...ye(486,890)).lineTo(...ye(279,724)).lineTo(...ye(279,293)).closePath(),Fe=0,Oe=0;function Bn(){const o=document.createElement("canvas");o.width=512,o.height=112;const e=o.getContext("2d");e.fillStyle="#1c2735",e.fillRect(0,0,512,112),e.fillStyle=ts,e.save(),e.translate(48,56),e.scale(43,-43),e.beginPath(),os.getPoints(6).forEach(({x:n,y:a},i)=>i?e.lineTo(n,a):e.moveTo(n,a)),e.closePath(),e.fill(),e.restore(),e.fillStyle="#ebeeef",e.font="750 48px system-ui, sans-serif",e.textBaseline="middle",e.fillText("ALHUISSI",83,54),e.fillStyle="#f4b674";for(let n=0;n<3;n++)e.fillRect(457+n*13,49,5,14);const t=new Ue(o);return t.colorSpace=Tt,new ee({map:t,toneMapped:!1})}function Fn(o){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),n=t.createRadialGradient(64,64,0,64,64,63);n.addColorStop(0,"rgba(255,255,255,.8)"),n.addColorStop(.4,"rgba(255,255,255,.32)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128);const a=new Ue(e),i=(l,u,f,c)=>new E(new Pe(u,f),new ee({map:a,color:l,opacity:c,transparent:!0,blending:ze,depthWrite:!1,toneMapped:!1})),s=i(4708838,3.6,1.8,.55);s.rotation.x=-Math.PI/2,s.position.set(.53,.217,2.83);const r=i(16357197,4.2,1.6,.5);r.rotation.x=-Math.PI/2,r.position.set(-2.04,.205,2.72),o.add(s,r)}function On(o,e){const t=new W;t.position.set(Fe,5.15,Oe),t.rotation.set(-.14,.27,-.17),o.add(t),_(o,J,.99,1.3,.37,Fe,3.5,Oe,8),_(o,ae,.95,.99,.105,Fe,3.72,Oe,8),_(o,xe,.73,.95,.31,Fe,3.89,Oe,10);for(const s of[-1,1]){const r=[[0,0],[s*.49,.03],[s*.55,.82],[s*.88,1.46],[s*.57,1.59],[s*.09,1.04]];oe(o,j,r,.47,Fe+s*.85,3.57,Oe,.045),oe(o,ae,r,.071,Fe+s*.85,3.57,Oe+.27,.014)}G(t,new Me(1.57,.147,8,64),J),G(t,new Me(1.64,.051,5,54),j,0,0,-.15),G(t,new Me(1.43,.044,6,56),ae,0,0,.073);for(let s=0;s<8;s++){const r=s*Math.PI/4;G(t,new Me(1.57,.041,5,9,.66),s===5?tt:ie,0,0,.144).rotation.z=r+.065;const l=y(t,j,.255,.28,.33,Math.cos(r)*1.58,Math.sin(r)*1.58,.047);l.rotation.z=r;const u=y(t,ae,.155,.072,.04,l.position.x,l.position.y,.23);u.rotation.z=r}const n=new W;n.rotation.set(.69,-.69,.36),t.add(n),G(n,new Me(1.2,.069,6,48),j);for(const s of[.18,Math.PI+.18])G(n,new Me(1.2,.033,5,20,2.2),mo,0,0,.053).rotation.z=s;for(const s of n.children)s.userData.bake=!1,s.castShadow=!1;const a=new lo(os,{depth:.12,bevelEnabled:!1,curveSegments:8});a.translate(0,0,-.06);const i=new E(a,new ee({color:ts,toneMapped:!1,fog:!1}));return i.position.set(Fe,5.15,Oe),o.add(i),()=>{n.rotation.x=.69+.26*Math.sin(e.value*.73),n.rotation.y=-.69+.53*Math.sin(e.value*.51),n.rotation.z=.36-e.value*.22,i.rotation.y=.21*Math.sin(e.value*.55)}}function Ln(o){const e=new ee({color:"#ffca92",toneMapped:!1}),t=re(10510658,.9);y(o,t,3.41,1.79,.095,-2.16,1.66,1.16),y(o,xe,3.4,.13,.94,-2.16,2.62,1.7),y(o,ae,3.4,.13,.9,-2.16,.84,1.67),y(o,J,2.91,.144,.62,-2.14,1.24,1.63),y(o,tt,2.89,.051,.045,-2.14,1.17,1.94);for(const a of[-3.27,-2.47,-1.5]){y(o,xe,.59,.44,.13,a,1.68,1.32),y(o,a===-2.47?ie:e,.51,.35,.027,a,1.69,1.397),y(o,J,.066,.19,.1,a,1.4,1.42);for(let i=0;i<8;i++){const s=.035+.11*Math.abs(Math.sin(i*.82+a));y(o,xe,.017,s,.009,a-.177+i*.05,1.7,1.417)}}y(o,xe,.9,.143,.31,-2.72,1.366,1.79);for(let a=0;a<12;a++)y(o,a%3===2?j:e,.054,.022,.15,-3.073+a*.065,1.45,1.826);for(const[a,i]of[-1.87,-1.73,-1.59,-1.45,-1.31].entries())_(o,J,.036,.042,.048,i,1.38,1.74,8),y(o,a%2===0?ie:tt,.048,.019,.031,i,1.36,1.83);const n=new E(new Pe(3.47,1.78),new ee({color:"#7dc6d4",transparent:!0,opacity:.13,depthWrite:!1,side:nt}));n.position.set(-2.16,1.68,2.24),o.add(n);for(const a of[-3.91,-2.63,-1.55,-.5])y(o,j,.1,1.81,.18,a,1.67,2.23);for(const a of[.82,2.58])y(o,J,3.58,.15,.27,-2.16,a,2.22);oe(o,j,[[-3.99,2.44],[-.46,2.44],[-.68,2.72],[-3.59,2.83]],.58,0,0,2.19,.034),y(o,ae,2.88,.049,.058,-2.08,2.59,2.52).rotation.z=-.029}function Gn(o){const e=[[-1.1,.48],[.91,.48],[1.19,.75],[1.19,2.1],[.86,2.46],[-.84,2.46],[-1.1,2.18]];oe(o,j,e,.45,2.77,0,2.24,.055),oe(o,xe,e,.06,2.77,.14,2.494).scale.set(.91,.91,1),y(o,to,1.97,.19,.35,2.78,.71,2.57),y(o,J,1.94,.31,.35,2.76,2.21,2.57);for(const[t,n]of[2.1,2.7,3.3].entries()){_(o,t===1?mo:ie,.091,.091,1.32,n,1.45,2.64,12);for(const a of[.78,1.11,1.82,2.09])_(o,a===1.11||a===1.82?ae:j,.15,.15,.096,n,a,2.64,10);y(o,t===1?tt:ie,.065,.036,.021,n,2.22,2.758)}y(o,ae,.081,1.08,.16,3.68,1.49,2.56);for(let t=0;t<5;t++)y(o,j,.13,.041,.16,3.64,.96+t*.21,2.62)}function Nn(o){const t=new W;t.position.set(1.85,3.31,-.7),o.add(t);const n=re(16758903,1.6),a=8.1-3.31,i=.42,s=a-i,r=i+s/2;_(t,J,1.18,1.3,.24,0,.12,0,8),_(t,j,.98,1.08,.2,0,.33,0,8),_(t,ie,1.1,1.1,.025,0,.245,0,24),_(t,J,.66,.84,s,0,r,0,8);const l=d=>.84-(d-i)/s*.18;for(const d of[1.05,2.15,3.25,4.25]){const h=l(d);_(t,n,h+.012,h+.016,.32,0,d,0,8),_(t,ae,h+.05,h+.05,.05,0,d+.19,0,8),_(t,ae,h+.05,h+.05,.05,0,d-.19,0,8)}const u=Math.atan(.18/s);for(let d=0;d<8;d++){const h=(d+.5)*Math.PI/4,m=l(r)-.02,p=y(t,j,.08,s-.1,.11,Math.sin(h)*m,r,Math.cos(h)*m);p.rotation.y=h,p.rotation.x=-u*Math.cos(h),p.rotation.z=u*Math.sin(h)}for(const d of[-.39,.39]){const h=l(r)-.03,m=y(t,ie,.03,s-.4,.03,Math.sin(d)*h,r,Math.cos(d)*h);m.rotation.y=d,m.rotation.x=-u*Math.cos(d),m.rotation.z=u*Math.sin(d)}_(t,j,1.45,.68,.5,0,a+.25,0,8),_(t,ae,1.5,1.5,.1,0,a+.55,0,16),_(t,ie,1.52,1.52,.03,0,a+.47,0,24);const f=G(t,new Me(1.46,.03,5,40),ae,0,a+.95,0);f.rotation.x=Math.PI/2;for(let d=0;d<16;d++){const h=d*Math.PI/8;_(t,j,.02,.02,.38,Math.sin(h)*1.46,a+.77,Math.cos(h)*1.46,5)}const c=new W;return c.position.set(0,a+.6-3.31,0),t.add(c),c}function Un(o){const e=new ee({color:"#7ff6f0",toneMapped:!1}),t=new ee({color:"#ffc58a",toneMapped:!1}),n=new ee({color:"#b48cff",toneMapped:!1}),a=re(6543078,.9);for(const r of[-1,1]){y(o,xe,.06,.82,1.5,r*4.02,1.5,1.45),y(o,t,.03,.66,1.32,r*4.055,1.5,1.45);for(const l of[-.33,.33])y(o,j,.05,.7,.05,r*4.07,1.5,1.45+l);y(o,j,.05,.05,1.36,r*4.07,1.5,1.45)}y(o,n,8.05,.035,.04,.035,3.09,2.79),y(o,e,4.3,.03,.04,-1.31,3.67,2.79);for(const r of[-1,1])y(o,n,.04,.035,5.2,r*4.13,3.09,-.05);for(let r=0;r<3;r++)y(o,J,.82,.08,.62,-1.25+r*.02,3.69,1.55-r*.78),y(o,a,.7,.04,.5,-1.25+r*.02,3.74,1.55-r*.78);const i=new W;i.position.set(-.35,3.74,-1.75),o.add(i),_(i,j,.05,.08,.55,0,.27,0,8),G(i,new st(.42,14,6,0,Math.PI*2,0,Math.PI/2.6),ae,0,.72,0).rotation.set(Math.PI+.7,0,.35),_(i,e,.03,.03,.07,-.14,.95,.2,6),y(o,e,7.7,.025,.03,.09,.14,2.53);for(const r of[-1,1])y(o,e,.03,.025,4.9,r*3.98,.14,.02)}function Wn(o,e,t,n,a,i){const s=I("#d9884a",.86),r=I("#a85a2c",.88),l=I("#f2d6b0",.88),u=new ee({color:"#c8ff7a",toneMapped:!1}),f=new st(1,14,10),c=new W;c.name="Workshop cat",c.position.set(e,t,n),c.rotation.y=a,c.scale.setScalar(1.35),o.add(c);const d=(g,v,w,x,M,C,z,T)=>{const S=new E(f,v);return S.scale.set(w,x,M),S.position.set(C,z,T),S.castShadow=v!==u,g.add(S),S};d(c,s,.15,.12,.18,0,.1,-.04),d(c,s,.105,.16,.1,0,.21,.06),d(c,l,.07,.1,.05,0,.2,.13);for(const g of[-1,1])d(c,l,.04,.03,.055,g*.055,.025,.16),d(c,r,.03,.07,.1,g*.135,.12,-.05);const h=new W;h.position.set(0,.38,.09),c.add(h),d(h,s,.105,.09,.095,0,0,0),d(h,r,.06,.02,.06,0,.075,-.01),d(h,l,.05,.036,.04,0,-.028,.075);for(const g of[-1,1])d(h,u,.016,.019,.01,g*.042,.012,.088);const m=[-1,1].map(g=>{const v=new E(new fo(.042,.085,4),s);return v.position.set(g*.058,.085,-.005),v.rotation.set(-.12,Math.PI/4,g*-.32),v.castShadow=!0,h.add(v),v}),p=new W;p.position.set(.06,.04,-.2),c.add(p);for(let g=0;g<7;g++){const v=g/6,w=v*2.1;d(p,g%2?r:s,.036-v*.008,.036-v*.008,.05,Math.sin(w)*.22,.01+v*.03,-Math.cos(w)*.1+.1-v*.02)}return()=>{const g=i.value;p.rotation.y=Math.sin(g*1.1)*.28,p.rotation.z=Math.sin(g*.7+1)*.08,h.rotation.y=Math.sin(g*.23)*.35+Math.sin(g*.061)*.2,h.rotation.x=Math.sin(g*.31)*.06;const v=Math.max(0,Math.sin(g*.9)-.94)*6;m[0].rotation.z=.32+v*.35}}function Hn(o,e,t){const[n,a]=me.workshop.landmark,i=k(n,a),s=new W;s.position.set(n,i,a),s.rotation.y=-.095,o.add(s),y(s,xe,8.05,.46,5.26,.09,-.12,-.12),oe(s,j,[[-3.94,0],[3.94,0],[3.94,.13],[3.74,.23],[-3.74,.23],[-3.94,.13]],5.2,.09,-.035,.1,.035),y(s,J,7.81,3,.41,.025,1.54,-2.43),y(s,J,.41,2.81,4.72,-3.81,1.51,-.17),y(s,J,.41,2.81,4.72,3.81,1.51,-.17),y(s,xe,7.58,2.9,.28,.03,1.51,.9),y(s,J,7.72,.65,.31,.02,.51,2.15);const r=[[-4.05,2.76],[4.12,2.76],[4.12,3.07],[3.77,3.31],[1.27,3.31],[.87,3.65],[-3.49,3.65],[-4.05,3.18]];oe(s,J,r,5.4,0,0,-.05,.05),oe(s,to,r,.21,0,.015,2.61,.037),oe(s,j,[[-1.16,2.79],[1.21,2.79],[1.04,3.05],[-.92,3.05]],1.11,.54,0,2.49,.025),y(s,ae,4.63,.078,.1,-1.45,3.49,2.735),y(s,ie,3.45,.058,.08,-2.02,2.89,2.762),y(s,ie,1.77,.058,.08,2.81,2.89,2.762);for(const w of[-3.92,1.42,3.91])oe(s,j,[[-.18,.12],[.18,.12],[.14,2.53],[-.05,2.81],[-.18,2.66]],.25,w,0,2.21,.023);Ln(s);const l=[[-.9,0],[.9,0],[.9,1.84],[.58,2.18],[-.66,2.18],[-.9,1.94]];oe(s,j,l,.23,.53,.18,2.2,.042),oe(s,ie,l,.033,.53,.224,2.33).scale.set(.916,.94,1),oe(s,xe,l,.035,.53,.247,2.36).scale.set(.851,.91,1);for(const w of[-1,1])y(s,J,.64,1.57,.035,.53+w*.362,1.13,2.39),y(s,j,.04,.66,.046,.53+w*.124,1.01,2.399);y(s,ie,.99,.07,.05,.53,1.58,2.424),y(s,tt,.14,.088,.056,1.68,1.2,2.33),y(s,j,2.55,.13,.79,.53,.147,2.77);for(const w of[-1,1])y(s,ie,.12,.024,.54,.53+w*1.02,.221,2.86);Gn(s),y(s,J,1.96,.447,.12,.54,2.61,2.64);const u=new E(new Pe(1.86,.407),Bn());u.position.set(.54,2.61,2.706),s.add(u);for(const w of[-1,1]){for(let x=0;x<5;x++)y(s,j,.16,1.27,.28,w*4.03,1.78,-.89+x*.43);y(s,ae,.11,.105,3.38,w*4.07,2.52,.04),y(s,ie,.11,.065,2.2,w*4.08,2.78,.34),y(s,xe,1.48,1.1,.11,2.22*w,1.61,-2.677),y(s,tt,1.29,.075,.042,2.22*w,2.07,-2.746)}for(let w=0;w<4;w++)y(s,j,3.23,.12,.16,-1.1,3.72,-2.06+w*.42);for(const[w,x]of[[-.2,1.2],[.22,.8]])_(s,j,.03,.06,x,-2.97+w,3.7+x/2,-1.29,8),_(s,w>0?ie:mo,.04,.05,.09,-2.97+w,3.7+x,-1.29,8);const f=Nn(s);Un(s),Fn(s);const c=s.localToWorld(new b(2.37,0,4.04)),d=k(c.x,c.z);y(o,to,1.29,.11,.41,c.x,d+.46,c.z).rotation.y=s.rotation.y;for(const w of[-.45,.45])y(o,J,.13,.46,.35,c.x+w,d+.22,c.z);y(o,ae,1.04,.045,.037,c.x,d+.45,c.z+.21),e.add(c.x,c.z,1.26,.4,d-.07,.61,s.rotation.y);const h=s.localToWorld(new b(0,-.4,-.15));e.add(h.x,h.z,8.07,4.94,h.y,4.1,s.rotation.y);const m=s.localToWorld(new b(2.77,.41,2.44));e.add(m.x,m.z,2.3,.62,m.y,2.09,s.rotation.y);const p=s.localToWorld(new b(2.72,0,4.04)),g=Wn(o,p.x,d+.515,p.z,s.rotation.y,t),v=On(f,t);return()=>{v(),g()}}const Ge=I("#374b54"),Qe=I("#4c3435"),Ft=I("#775342"),wt=I("#c6a580"),go=I("#edd0a9"),xt=I("#3f444b",.59,.3),Ne=I("#b27656",.49,.24),ve=I("#d9aa67",.5,.15),ss=re(15309381,1.35),oo=re(16761976,2.2);function Ht(o,e,t){const[n,a]=me[e].landmark,i=new W;return i.position.set(n,k(n,a),a),i.rotation.y=t,o.add(i),i}function Vn(o,e,t,n,a,i=a){const s=n.clone().sub(t),r=t.clone().lerp(n,.5);y(o,e,a,s.length(),i,r.x,r.y,r.z).quaternion.setFromUnitVectors(new b(0,1,0),s.normalize())}function ns(o,e){const t=e-o;return new Wt().moveTo(-o,0).lineTo(o,0).lineTo(o,t).quadraticCurveTo(o,e,0,e).quadraticCurveTo(-o,e,-o,t).lineTo(-o,0)}function so(o,e,t,n,a,i,s){return G(o,new Yo(ns(i,s),12),e,t,n,a)}function qn(o,e,t,n,a,i){so(o,Qe,e,t-.05,n,a*.57,i+.11),so(o,ss,e,t,n+.018,a*.43,i),y(o,Ft,a*1.26,.108,.24,e,t-.045,n+.056),y(o,Qe,.06,i*.87,.044,e,t+i*.43,n+.047),y(o,Qe,a*.93,.05,.044,e,t+i*.48,n+.047)}function jn(o,e,t,n){const i=Ht(o,"dream-ocean",.29),[s,r,l]=i.position,u=[I("#606f81"),I("#7a8499"),I("#8b9ba6"),I("#707787")],f=I("#3b586a"),c=I("#a1b4c3"),d=re(10017008,.45),h=_(i,f,2.97,3.3,.33,0,-.06,.03,12);h.scale.z=.59;const m=_(i,u[1],2.53,2.86,.2,0,.2,.16,14);m.scale.z=.55;const p=y(i,c,3.15,.16,1.25,0,.14,1.13);p.rotation.y=-.03;const g=1.61,v=2.61,x=new Wt().moveTo(-g,.25).lineTo(g,.25).lineTo(g,v).quadraticCurveTo(g,v+1.2,0,v+2.2).quadraticCurveTo(-g,v+1.2,-g,v).closePath(),M=new E(new Yo(x,36),kn(e,n));M.position.z=.17,i.add(M);for(const z of[-1,1])for(let T=0;T<4;T++){const S=.84-.044*T,A=y(i,u[(T+1)%u.length],S,.58,.94-T*.057,z*(g+S/2-.04),.49+T*.61,.03);A.rotation.z=(T%2-.5)*.035,y(i,c,.036,.45,.05,z*1.72,.51+T*.61,.55-T*.025)}const C=(z,T)=>{const S=Math.sign(1-z*2),A=1-Math.abs(1-z*2);return[S*((1-A*A)*(g+T)),v+(2.4*A-.2*A*A)*(1+T*.44)]};for(let z=0;z<15;z++){const T=(z+.031)/15,S=(z+.969)/15,A=z===7,B=[C(T,-.075),C(S,-.075),C(S,A?.73:.61),C(T,A?.73:.61)];if(oe(i,u[z%u.length],B,A?.91:.7,0,0,0,.035),z%2===0){const[H,N]=C((T+S)/2,.18),U=y(i,d,.044,.18,.02,H,N,A?.491:.394);U.rotation.z=(z-7)*-.11}}for(const[z,T,S,A]of[[-3.62,-.68,1,-.24],[3.18,-.63,.84,.29],[-4.2,1.23,.61,-.3],[3.72,1,.45,.32],[1.56,-2.95,.57,-.21]]){const B=G(i,new vt(1,0),u[Math.round(S*3)],z,1.22*S,T);B.scale.set(.66*S,2.33*S,.61*S),B.rotation.z=A,B.rotation.y=T,G(i,new vt(.21,0),d,z,.7*S,T+.42*S).scale.set(.34,1.9,.49)}for(const z of[-2.85,2.82])_(i,f,.24,.32,.62,z,.32,1.6,7),G(i,new vt(.21,0),d,z,.76,1.6).scale.y=1.35;t.add(s,l,5.4,1.75,r-.5,5.65,.29)}function Xn(o,e,t){const n=Ht(o,"pocket-orbit",.15),[a,i,s]=n.position,r=I("#8c857d"),l=I("#646b6b"),u=I("#c78d50");_(n,wt,3.38,3.68,.52,0,-.3,0,12),_(n,Ge,3.31,3.51,.25,0,-.01,0,12),_(n,r,3.19,3.33,.13,0,.162,0,12),_(n,l,2.85,2.85,.03,0,.237,0,30);const f=G(n,new Me(2.42,.035,4,64),go,0,.26,0);f.rotation.x=-Math.PI/2;for(let c=0;c<12;c++){const d=c*Math.PI/6,h=Math.cos(d)*3.07,m=Math.sin(d)*3.07,p=y(n,c%3===0?oo:u,.25,.074,.14,h,.247,m);p.rotation.y=-d}y(n,wt,1.69,.22,.73,-.08,.04,3.45);for(const c of[-2.56,2.56])_(n,xt,.095,.14,1.42,c,.68,-2.12),_(n,oo,.15,.15,.2,c,1.43,-2.12,11),_(n,ve,.16,.18,.07,c,1.57,-2.12);for(const c of[-1.9,-.91,1.93])y(n,xt,.56,.41,.73,-3.54,.04,c),y(n,Ne,.58,.1,.75,-3.54,.28,c),y(n,Ge,.26,.162,.022,-3.54,.1,c+.37);en(async()=>{const{addPocketOrbitShuttle:c}=await import("./pocketOrbitShuttle-DLs6NCVV.js");return{addPocketOrbitShuttle:c}},__vite__mapDeps([0,1,2]),import.meta.url).then(({addPocketOrbitShuttle:c})=>c(n,t)),e.add(a,s,5.3,5.25,i-.42,3.4,.15)}function Ro(o,e,t,n,a,i){const s=l=>a*(1-Math.abs(l/t))**1.55+Math.abs(l/t)**11*.24,r=[];for(let l=0;l<=20;l++){const u=-t+l*t/10;r.push([u,s(u)])}for(let l=20;l>=0;l--){const u=-t+l*t/10;r.push([u,s(u)-.17])}oe(o,i,r,n,0,e,0,.015);for(let l=0;l<=22;l++){const u=-t+l*t/11,f=_(o,l%3===0?Ne:i,.06,.06,n+.05,u,e+s(u)+.02,0,7);f.rotation.x=Math.PI/2}for(const l of[-n/2-.012,n/2+.012])for(let u=0;u<14;u++){const f=-t+u*t/7,c=f+t/7;Vn(o,ve,new b(f,e+s(f)-.043,l),new b(c,e+s(c)-.043,l),.075)}}function Eo(o,e,t){const n=new W;n.position.set(e,.2,.55),o.add(n);const a=[[-.61,0],[.63,0],[.63,.92],[.34,1.26],[.39,1.98],[.12,2.19],[-.61,2.19]];oe(n,t,a,.94,0,0,0,.042).rotation.y=-Math.PI/2,y(n,Ge,.89,.83,.078,0,1.59,.348).rotation.x=-.09,y(n,re(9753296,.36),.73,.57,.025,0,1.61,.402).rotation.x=-.09;const i=new W;i.position.set(0,1.61,.436),n.add(i);for(let s=0;s<4;s++)y(i,t,.116,.106,.012,(s%2-.5)*.18,(Math.floor(s/2)-.5)*.15,0);y(n,Ne,.99,.14,.46,0,1.06,.45),_(n,xt,.039,.041,.14,-.28,1.19,.49,10),G(n,new st(.071,10,7),ss,-.28,1.28,.49);for(const s of[.08,.23])_(n,ve,.06,.052,.048,s,1.16,.5,10);y(n,go,.69,.16,.036,0,2.01,.388)}function Yn(o,e){const n=Ht(o,"hanzizap",-.17),[a,i,s]=n.position,r=I("#a75f4a"),l=I("#426564"),u=I("#d9a34f");y(n,wt,5.57,.37,3.9,0,-.07,.17),y(n,Ft,5.44,.12,3.8,0,.145,.17),y(n,r,4.8,2.57,.24,0,1.36,-1.39);for(const c of[-2.23,2.23]){for(const d of[-1.31,1.39])_(n,r,.115,.15,2.95,c,1.53,d),_(n,xt,.19,.21,.21,c,.22,d),_(n,ve,.155,.156,.15,c,2.67,d);y(n,l,.119,1.43,2.81,c,.85,0);for(let d=0;d<6;d++)y(n,u,.037,.94,.089,c+Math.sign(c)*.074,.91,-1.13+d*.448)}for(const c of[-1.42,1.42])y(n,Ft,5.11,.24,.23,0,2.88,c);Ro(n,3.08,2.99,3.89,.99,l),y(n,l,2.82,.57,1.98,0,3.96,0),y(n,Ft,2.96,.105,2.04,0,4.21,0);for(let c=0;c<9;c++)y(n,ve,.045,.3,.034,(c-4)*.265,3.99,1.005);Ro(n,3.97,1.88,2.64,.61,l),y(n,ve,.19,.17,2.7,0,4.64,0),y(n,Qe,2.77,.28,.13,0,2.66,1.49),y(n,ve,2.46,.055,.05,0,2.66,1.58);for(const c of[-1.95,1.95]){const d=G(n,new st(.222,12,9),oo,c,2.49,1.72);d.scale.y=1.19,_(n,Ne,.18,.16,.08,c,2.76,1.72),_(n,Ne,.15,.18,.08,c,2.22,1.72),y(n,r,.031,.15,.031,c,2.12,1.72)}Eo(n,-.93,u),Eo(n,.76,r);const f=y(n,r,3.5,.037,.61,0,.071,2.01);f.rotation.y=.022;for(const c of[-1.58,1.58])y(n,ve,.042,.04,.52,c,.085,2.01);e.add(a,s,5.13,3.63,i-.42,4.8,-.17)}function $n(o,e){const n=Ht(o,"observatory",.34),[a,i,s]=n.position,r=[I("#64928d",.48,.25),I("#588682",.45,.26),I("#7a9e92",.45,.25)],l=I("#c2b3a2");_(n,xt,2.1,2.37,.35,0,.04,0,12),_(n,l,1.84,1.95,2.78,0,1.45,0,15),_(n,go,1.98,1.91,.21,0,2.81,0,15),_(n,Ge,2.02,1.997,.29,0,3.058,0,16);for(let d=0;d<12;d++){const h=new st(1.98,6,11,d*Math.PI/6,Math.PI/6,0,Math.PI/2),m=G(n,h,r[d%3],0,3.18,0);m.scale.y=.83;const p=G(n,new Me(1.975,.028,5,22,Math.PI/2),Ne,0,3.19,0);p.rotation.y=d*Math.PI/6,p.scale.y=.83}const u=G(n,new Me(2.11,.062,6,40),ve,0,3.04,0);u.rotation.x=Math.PI/2;const f=new lo(ns(.59,1.75),{depth:.26,bevelEnabled:!0,bevelSize:.035,bevelThickness:.034,bevelSegments:1,curveSegments:12});G(n,f,Qe,0,.16,1.76),so(n,Ge,0,.204,2.055,.47,1.58);for(const d of[-.24,0,.24])y(n,Qe,.025,1.17,.032,d,.81,2.063);y(n,ve,.08,.11,.056,.27,.75,2.082);for(const d of[-1,1]){const h=new W;h.rotation.y=d*.78,n.add(h),qn(h,0,1.27,1.86,.47,1.04)}const c=new W;c.position.set(.56,4.32,.23),c.rotation.z=-.85,c.rotation.x=.26,n.add(c),_(c,Ge,.48,.39,2.23,0,.82,0,18),_(c,Ne,.58,.52,.24,0,2.04,0,18),_(c,I("#a4c8c8",.23,.41),.442,.452,.041,0,2.17,0,18),_(c,ve,.47,.49,.12,0,1.58,0,18),_(c,ve,.44,.44,.1,0,.19,0,16),_(c,Ge,.17,.15,.56,0,-.51,0,12),y(n,wt,1.2,.26,.76,0,.1,2.07).rotation.x=-.13,y(n,wt,1.32,.19,.65,0,-.07,2.56).rotation.x=-.2,e.add(a,s,3.57,3.63,i-.61,5.3,.34)}function Qn(o,e,t,n){const a=Hn(o,e,t);return jn(o,t,e,n),Xn(o,e,n),Yn(o,e),$n(o,e),a}let _t=null;function as(){if(_t)return _t;const o=document.createElement("canvas");o.width=o.height=128;const e=o.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,63);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,255,255,.42)"),t.addColorStop(.6,"rgba(255,255,255,.1)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),_t=new Ue(o),_t}function At(o,e,t,n,a,i){const s=new E(new Pe(a,a),new ee({map:as(),color:e,opacity:i,transparent:!0,blending:ze,depthWrite:!1,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-4}));s.rotation.x=-Math.PI/2,s.position.set(t,k(t,n)+.09,n),s.renderOrder=2,o.add(s)}function Kn(o,e,t,n,a,i,s){const r=new ot(new St({map:as(),color:e,opacity:s,transparent:!0,blending:ze,depthWrite:!1,toneMapped:!1}));r.position.set(t,n,a),r.scale.setScalar(i),o.add(r)}function Zn(o,e,t){const n=fe(5521),a=[],i=[],s=[];for(const u of e)for(let f=0;f<3;f++)a.push(u.x,u.y,u.z),i.push(n()*6.283),s.push(.17+n()*.22);const r=new te;r.setAttribute("position",new F(a,3)),r.setAttribute("phase",new F(i,1)),r.setAttribute("radius",new F(s,1));const l=new co(r,new ne({uniforms:{clock:t},transparent:!0,depthWrite:!1,toneMapped:!1,blending:ze,vertexShader:`
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
    `}));l.frustumCulled=!1,o.add(l)}function Jn(o,e,t,n){const a=I("#3c3a44",.6,.35),i=re(16762482,2.4),s=[[2.9,17.6],[.25,14.7],[2.45,10.7],[-1.4,8.35],[-4.88,5.6],[-8.52,3.55],[-12.32,2.31],[6.28,5.4],[9.2,2.73],[11.55,-.85],[7.3,11.5],[10.1,14.65],[-7.98,-.65],[-8.35,-5.9],[-6.55,-9.09]],r=fe(71893),l=[],u=Jo();for(const[c,d]of[...s,...u]){const h=k(c,d),m=.64+r()*.22;_(o,a,.055,.08,m,c,h+m*.5,d,7),_(o,a,.12,.1,.13,c,h+.06,d,7),_(o,i,.081,.11,.19,c,h+m,d,8),_(o,a,.041,.15,.107,c,h+m+.102,d,8);const p=y(o,a,.19,.041,.19,c,h+m-.088,d);p.rotation.y=Math.PI/4,Kn(o,16757340,c,h+m,d,1.05,.55),At(o,16752714,c,d,3.4,.34),l.push(new b(c,h+m,d))}for(const[c,d]of u)n.add(c,d,.3,.3,k(c,d),1,0);Zn(o,l,t);const f=[[.4,1.7,3.6,4645103,14,11],[-2.3,1.8,3.1,16751186,10,9],[-15.2,2.4,-1.4,8370431,16,12],[13.2,2.6,11.8,16757854,14,10],[-3.6,2,-11.4,16761466,7,8],[12.4,2.2,-4.2,9427199,10,10]];for(const[c,d,h,m,p,g]of e?f:f.slice(0,3)){const v=new Xo(m,p,g,1.6);v.position.set(c,k(c,h)+d,h),o.add(v)}At(o,8370431,-15.2,-.6,7.5,.26),At(o,16757854,13.2,12.6,6.5,.22),At(o,4645103,.5,4.6,5.5,.18)}const ea=[{id:"dream-ocean",logo:"dream-ocean-logo.webp",aspect:680/277,x:-11.86,z:-.78,yaw:.3,width:3.46,height:1.63,lift:.65,frame:"#677d8e",panel:"#cadde5",lamp:10212583},{id:"pocket-orbit",logo:"pocket-orbit-logo.webp",aspect:680/375,x:9.14,z:-3.09,yaw:-.19,width:3.16,height:1.85,lift:.57,frame:"#a69c8b",panel:"#272a42",lamp:15969383},{id:"hanzizap",logo:"hanzizap-logo.svg",aspect:290/69,x:10.02,z:12.03,yaw:.13,width:3.44,height:1.01,lift:.79,frame:"#b4814c",panel:"#4c3435",lamp:16761976}];function ta(o,e,t){const n=new Ut;return ea.map(({id:a,logo:i,aspect:s,x:r,z:l,yaw:u,width:f,height:c,lift:d,frame:h,panel:m,lamp:p})=>{const g=new W,v=k(r,l);g.position.set(r,v,l),g.rotation.y=u,o.add(g);const w=I(h,.65,.16),x=I(m,.81),M=re(p,.52),C=d+c*.5,z=f*.5,T=c*.5,S=.15;oe(g,w,[[-z+S,-T],[z-S,-T],[z,-T+S],[z,T-S],[z-S,T],[-z+S,T],[-z,T-S],[-z,-T+S]],.24,0,C,0,.027),y(g,x,f-.22,c-.2,.31,0,C,0);for(const U of[-1,1])y(g,w,.2,d+.31,.25,U*f*.34,d*.4,0),y(g,x,.39,.15,.49,U*f*.34,.035,0),y(g,M,.4,.035,.055,U*(z-.39),d+.071,.164),y(g,M,.4,.035,.055,U*(z-.39),d+.071,-.164);const A=Math.min(f-.5,(c-.34)*s),B=new Pe(A,A/s),H=n.load(`./island-media/${i}`,t);H.colorSpace=Tt,H.anisotropy=4;const N=new ee({map:H,transparent:!0,depthWrite:!1,toneMapped:!1});a==="hanzizap"&&N.color.setScalar(.8);for(const U of[-1,1]){const V=new E(B,N);V.position.set(0,C,U*.166),V.rotation.y=U<0?Math.PI:0,g.add(V)}return e.add(r,l,f,.38,v-.2,c+d+.28,u),{id:a,box:new $o().setFromObject(g)}})}const is=Math.PI*2,oa=new D("#2e7255"),sa=new D("#7d9e58"),na=new D("#41747a"),aa=new D("#8d8052"),ia=new D("#74654f");function yt(o,e,t){const n=k(o,e),a=.41+Math.sin(o*1.37+e*.64)*.07+Math.cos(o*.43-e*.77)*.15;return t.copy(oa).lerp(sa,a+Math.max(0,n)*.062),t.lerp(na,Math.exp(-((o+15)**2+(e+1)**2)/54)*.59),t.lerp(aa,Math.exp(-((o-13)**2+(e+4)**2)/39)*.77),t.lerp(ia,Math.max(0,(Se(o,e)-.83)*3.4)+Math.max(0,-.5-n)*.21),t}function Yt(o,e,t){o.onBeforeCompile=n=>{n.vertexShader=`varying vec3 terrainPoint;
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
      vec2 gritUV = groundUV * ${t.toFixed(2)};
      float sharpness = 1.0 - smoothstep(.42, 1.32, length(fwidth(gritUV)));
      float grit = (earthShade(gritUV) - .5) * sharpness;
      float coarse = earthShade(groundUV * .83 + 4.0) - .5;
      diffuseColor.rgb *= 1.0 + grit * ${e.toFixed(2)} + coarse * .18;`)},o.customProgramCacheKey=()=>`ground-${e}-${t}`}function ra(){const t=[0,k(0,0),0],n=[yt(0,0,new D)],a=[];for(let s=1;s<=37;s++)for(let r=0;r<144;r++){const l=Ce((r+s%2*.5*(s<37?1:0))/144*is,s/37),[u,f]=l;t.push(u,k(u,f),f),n.push(yt(u,f,new D));const c=1+(s-1)*144+r,d=1+(s-1)*144+(r+1)%144;s===1?a.push(0,d,c):a.push(c-144,d,c,c-144,d-144,d)}const i=new te;return i.setAttribute("position",new F(t,3)),i.setAttribute("color",po(n)),i.setIndex(a),i.computeVertexNormals(),i}function Do(o,e,t,n,a){const i=[1,1,.96,.985,.83,.765,.63,.34,.035,0],s=[0,-.65,-2.1,-3.05,-4.65,-6.6,-8.65,-11.9,-13.3,-13.82],r=["#746e56","#695451","#635569","#937364","#594e66","#484656","#63536b","#45415a","#4b4357","#3c384e"].map(h=>new D(h)),l=[],u=[],f=[];for(let h=0;h<s.length;h++)for(let m=0;m<o;m++){const p=m/o*is,g=Math.sin(p*5+h*.59)*.67+Math.cos(p*13-.9)*.22,v=Math.sin(p*39+.4)*.2+Math.cos(p*49)*.12,w=h>0&&h<9?(g+v)*(.031+h*.003):0,[x,M]=Ce(p,i[h]+w),[C,z]=Ce(p),T=h>0?Math.sin(p*4+.6)*.55+g*.44:0;if(l.push(t+(x-h*h*.025)*e,n+(s[h]+k(C,z)/(1+h*.18)+T)*e,a+(M+h*h*.022)*e),u.push(r[h].clone().multiplyScalar(.87+g*.1+v*.44)),h>0){const S=h*o+m,A=h*o+(m+1)%o;f.push(S-o,A,S,S-o,A-o,A)}}const c=new te;c.setAttribute("position",new F(l,3)),c.setAttribute("color",po(u)),c.setIndex(f);const d=c.toNonIndexed();return c.dispose(),d.computeVertexNormals(),d}function ca(o){const e=[];for(let t=0;t<o.length-1;t++){const[n,a]=o[Math.max(0,t-1)],[i,s]=o[t],[r,l]=o[t+1],[u,f]=o[Math.min(o.length-1,t+2)],c=Math.ceil(Math.hypot(r-i,l-s)*4);for(let d=0;d<c;d++){const h=d/c,m=(p,g,v,w)=>.5*(2*g+(-p+v)*h+(2*p-5*g+4*v-w)*h*h+(-p+3*g-3*v+w)*h*h*h);e.push(new K(m(n,i,r,u),m(a,s,l,f)))}}return e.push(new K(...o[o.length-1])),e}const rs=tn.map(ca),la=new D("#b89f71"),da=new D("#c7af84");function fa(){const o=[],e=[],t=[],n=[-1,-.79,-.32,.19,.8,1],a=fe(19309);for(const[s,r]of rs.entries()){const l=o.length/3,u=s===0?.94:.66;for(const[f,c]of r.entries()){const d=r[Math.max(0,f-1)],h=r[Math.min(r.length-1,f+1)],m=new K(h.y-d.y,d.x-h.x).normalize(),p=u*(.9+.11*Math.sin(f*.32)+.13*a()),g=Math.min(1,(f+2)/5,(r.length-f)/7);for(const[v,w]of n.entries()){const x=c.x+m.x*w*p,M=c.y+m.y*w*p;o.push(x,k(x,M)+.041+.003*s,M);const C=Math.abs(w)>.99?.02:Math.min(1,(1-Math.abs(w))*1.95);e.push(yt(x,M,new D).lerp(v%2===0?la:da,C*g).multiplyScalar(.9+a()*.2))}if(f!==0)for(let v=1;v<n.length;v++){const w=l+f*n.length+v,x=w-n.length;t.push(x-1,w-1,w,x-1,w,x)}}}const i=new te;return i.setAttribute("position",new F(o,3)),i.setAttribute("color",po(e)),i.setIndex(t),i.computeVertexNormals(),i}function ua(o){const e=new le({vertexColors:!0,roughness:1});Yt(e,.23,6.2);const t=new E(ra(),e);t.receiveShadow=!0,t.castShadow=!0,o.add(t);const n=new le({vertexColors:!0,roughness:.96});Yt(n,.31,3.6);const a=new E(Do(144,1,0,0,0),n);a.receiveShadow=!0,a.castShadow=!0,o.add(a);const i=new le({vertexColors:!0,roughness:.92});Yt(i,.39,15.6);const s=new E(fa(),i);s.receiveShadow=!0,o.add(s);for(const[r,l,u,f]of[[-72,-3,-90,.38],[-46,-6,-84,.22],[49,-4,-93,.32],[75,-1.5,-138,.44],[89,-7,-67,.17],[-89,-5.2,-65,.29]]){o.add(new E(Do(48,f,r,l,u),n));const c=new E(t.geometry,e);c.position.set(r,l,u),c.scale.setScalar(f),o.add(c)}}const $t=8,Qt=8,ha=64,Io=2.23,pa=Math.SQRT2-1,ma=4,Bo=1.8,ga=2.0625;function va(o,e,t,n){const a=t.matrixWorld.elements,i=o*a[0]+e*a[2],s=-o*a[2]+e*a[0],r=Math.abs(i),l=Math.abs(s),u=pa*(n%2===1?.72:1);return Math.min(r,l)>=Math.max(r,l)*u?s<0?i<0?3:5:i<0?1:7:r>l?i<0?2:6:s<0?4:0}function Fo(o,e,t,n){let a=!1;const i=o.load(new URL(`./island-media/andi/${e}.webp`,document.baseURI).href,()=>{a=!0,n()});i.colorSpace=Tt,i.magFilter=Ot,i.minFilter=Ot,i.generateMipmaps=!1,i.repeat.set(1/t,1/$t);const s=new ot(new St({map:i,transparent:!1,alphaTest:.5,toneMapped:!1}));return s.name=`Andi ${e}`,s.scale.set(Io,Io,1),s.center.set(.5,1/ha),s.position.y=.044,s.visible=!1,{sprite:s,get loaded(){return a},pose(r,l){i.offset.set(l/t,($t-1-r)/$t)}}}function wa(){const o=document.createElement("canvas");o.width=o.height=64;const e=o.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.45,"rgba(255,255,255,.45)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64);const n=new Ue(o),a=new W;a.name="Footstep dust";const i=.75,s=Array.from({length:14},()=>{const l=new ot(new St({map:n,color:"#a99fc8",transparent:!0,depthWrite:!1,toneMapped:!1,opacity:0}));return l.visible=!1,a.add(l),{sprite:l,age:i,drift:new b}});let r=0;return{group:a,spawn(l,u,f,c){const d=s[r];r=(r+1)%s.length,d.age=0,d.sprite.position.set(l-f*.25+(Math.random()-.5)*.2,k(l,u)+.12,u-c*.25),d.drift.set(-f*.35+(Math.random()-.5)*.3,.32,-c*.35+(Math.random()-.5)*.3),d.sprite.visible=!0},update(l){for(const u of s){if(u.age>=i)continue;u.age=Math.min(i,u.age+l);const f=u.age/i;u.sprite.position.addScaledVector(u.drift,l*(1-f)),u.sprite.scale.setScalar(.28+f*.75),u.sprite.material.opacity=.34*(1-f)*Math.min(1,f*6),u.sprite.visible=u.age<i}}}}function xa(o,e){const t=new W;t.name="Andi";const n=new Ut,a=Fo(n,"walk",Qt+1,e),i=Fo(n,"sprint",Qt,e);t.add(a.sprite,i.sprite);const s=new E(new Pe(1.62,1.38),new ne({uniforms:{tint:{value:new D("#201c28")}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`
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
    `}));s.position.y=.049,t.add(s);const r=wa(),l=new b(0,0,1),u=new b,f=ma/o;let c=4,d="idle",h=0,m=!1,p=-1;return{root:t,dust:r.group,get ready(){return a.loaded},update(g,v,w,x,M,C,z){const T=g.x-t.position.x,S=g.z-t.position.z;t.position.copy(g);const A=m&&!z&&!C?Math.hypot(T,S):0,B=A/w;m=!0;const H=B>.015;c=va(H?T:Math.sin(v),H?S:Math.cos(v),x,c);const N=o*(d==="sprint"?1.035:1.075);if(d=H?M||B<N?"walk":"sprint":"idle",d==="idle")h=0;else{const L=B*f/(2*Bo),q=Xe.clamp(Math.sqrt(L),.7,2.2),Y=ga*Bo*q;h=(h+A*f/Y)%1}const U=d==="sprint"&&i.loaded,V=Math.floor(h*Qt);U&&V!==p&&(V===1||V===5)&&!eo.matches&&A>0&&r.spawn(g.x,g.z,T/A,S/A),p=U?V:-1,r.update(w),a.sprite.visible=a.loaded&&!U,i.sprite.visible=U,U?i.pose(c,V):a.pose(c,d==="idle"?0:V+1),s.visible=a.loaded&&!C;const{x:P,z:R}=g;u.set(k(P-.29,R)-k(P+.29,R),.58,k(P,R-.29)-k(P,R+.29)).normalize(),s.quaternion.setFromUnitVectors(l,u)}}}const Kt=[.25,.35,.28],Oo=[1.04,1.1,.94],Zt=[1.66,1.52,.98],Lo=(o,e,t)=>[o[0]+(e[0]-o[0])*t,o[1]+(e[1]-o[1])*t,o[2]+(e[2]-o[2])*t];function ya(o,e,t){return o<.45?Lo(e,Oo,Math.pow(o/.45,.8)):Lo(Oo,t,Math.pow((o-.45)/.55,1.4))}const kt=new b,ba=new b,Ma=new b(0,1,0);function Sa(o,e){const t=Math.cos(e.angle),n=Math.sin(e.angle),a=c=>{const d=e.lean*c*c,h=e.height*(2*c*(1-c)*.82+c*c*(1-e.droop*.75));return[e.x+t*d,h,e.z+n*d]},i=c=>e.width*Math.pow(Math.max(0,1-Math.pow(c,1.6)),.9),s={positions:[],normals:[],shade:[],sway:[],phase:[],indices:[],heart:e.heart},r=(c,d)=>{s.positions.push(c[0],c[1],c[2]);const h=a(Math.max(0,d-.05)),m=a(Math.min(1,d+.05)),p=(m[0]-h[0])*t+(m[2]-h[2])*n,g=m[1]-h[1],v=Math.max(1e-5,Math.hypot(p,g));kt.set(-t*g/v,p/v,-n*g/v).multiplyScalar(.6).addScaledVector(Ma,.75).addScaledVector(ba.set(t,0,n),.3).normalize(),s.normals.push(kt.x,kt.y,kt.z);const w=ya(d,e.root,e.tip),x=e.value*(1-e.inner*.26*Math.pow(1-d,1.5));return s.shade.push(w[0]*x,w[1]*x,w[2]*x),s.sway.push(d),s.phase.push(e.phase),s.sway.length-1},l=[];for(let c=0;c<e.segments;c++){const d=c/e.segments,h=a(d),m=e.angle+Math.PI*.5+e.twist*d,p=i(d),g=Math.cos(m)*p,v=Math.sin(m)*p;l.push([r([h[0]-g,h[1],h[2]-v],d),r([h[0]+g,h[1],h[2]+v],d)])}for(let c=0;c<l.length-1;c++){const[d,h]=l[c],[m,p]=l[c+1];s.indices.push(d,h,p,d,p,m)}const[u,f]=l[l.length-1];s.indices.push(u,f,r(a(1),1)),o.push(s)}function cs(o){let e=o;return()=>(e=e*16807%2147483647,(e-1)/2147483646)}function ls(o,e,t){const n=t()*Math.PI*2;for(let a=0;a<e.blades;a++){const i=e.blades>1?a/(e.blades-1):0,s=n+a*2.39996+(t()-.5)*.4,r=e.spread*Math.sqrt(i)*(.7+t()*.3);Sa(o,{x:e.x+Math.cos(s)*r,z:e.z+Math.sin(s)*r,angle:s+(t()-.5)*.5,height:e.height*(1-i*e.fall)*(.88+t()*.24),width:e.width*(.85+t()*.3)*(1-i*.15),lean:e.lean*(.25+i*.95)*(.8+t()*.4),droop:e.droop*Math.pow(i,.8)+t()*.08,twist:(t()-.5)*.9,phase:t(),segments:a<e.curved?3:2,value:e.value*(.93+t()*.14),inner:1-i,heart:[e.x,e.z],root:[Kt[0]*e.tint[0],Kt[1]*e.tint[1],Kt[2]*e.tint[2]],tip:[Zt[0]*e.tint[0],Zt[1]*e.tint[1],Zt[2]*e.tint[2]]})}}const Ta=o=>o<.28?[1.05,1.03,.88]:o>.74?[.92,1,1.05]:[1,1,1];function za(o,e,t){return Array.from({length:o},(n,a)=>{const i=e*Math.sqrt((a+.5)/o),s=a*2.39996+t()*.6;return[Math.cos(s)*i+(t()-.5)*.08,Math.sin(s)*i+(t()-.5)*.08]})}function ds(o,e){const t=[],n=[],a=[],i=[],s=[],r=[],l=new b;for(const f of o){for(let d=0;d<f.sway.length;d++){const h=f.positions[d*3]-f.heart[0],m=f.positions[d*3+2]-f.heart[1],p=Math.hypot(h,m);l.set(h,0,m).multiplyScalar(p>1e-4?1/p:0).multiplyScalar(e*(.35+.65*f.sway[d])),l.x+=f.normals[d*3],l.y+=f.normals[d*3+1],l.z+=f.normals[d*3+2],l.normalize(),f.normals[d*3]=l.x,f.normals[d*3+1]=l.y,f.normals[d*3+2]=l.z}const c=i.length;t.push(...f.positions),n.push(...f.normals),a.push(...f.shade),i.push(...f.sway),s.push(...f.phase);for(const d of f.indices)r.push(c+d)}const u=new te;return u.setIndex(r),u.setAttribute("position",new F(t,3)),u.setAttribute("normal",new F(n,3)),u.setAttribute("color",new F(a,3)),u.setAttribute("aSway",new F(i,1)),u.setAttribute("aPhase",new F(s,1)),u.computeBoundingSphere(),u}function Ca(o){const e=[],t=cs(2711),n=o?5:7;for(const[a,i]of za(6,.55,t)){const s=.82+t()*.36;ls(e,{x:a,z:i,blades:n,height:.7*s,fall:.4,spread:.3,lean:.44,droop:.5,width:o?.052:.046,curved:o?0:2,tint:Ta(t()),value:.9+t()*.2},t)}return ds(e,.45)}function Pa(){const o=[];return ls(o,{x:0,z:0,blades:13,height:1,fall:.38,spread:.12,lean:.44,droop:.85,width:.042,curved:13,tint:[1,1,1],value:1},cs(9127)),ds(o,.85)}const _a=`
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
`;function Aa(o){const e=new Vs({vertexColors:!0,side:nt}),t={value:.35},n={value:new b(.8,.15,.55).normalize()};return e.onBeforeCompile=a=>{a.uniforms.uTime=o,a.uniforms.uWind=t,a.uniforms.uWindDir=n,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
attribute float aSway;
attribute float aPhase;
uniform float uTime;
uniform float uWind;
uniform vec3 uWindDir;
varying float vTip;
${_a}`).replace("#include <begin_vertex>",`#include <begin_vertex>
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
totalEmissiveRadiance += diffuseColor.rgb * (0.05 + 0.16 * vTip * vTip) * vec3(0.8, 0.9, 1.15);`)},e.customProgramCacheKey=()=>"pocket-orbit-meadow",e}function ka(o,e,t,n,a){const i=Aa(t),s=fe(31337),r=new Hs,l=new D,u=new D,f=(g,v,w,x)=>Se(g,v)<.965&&w>de+.05&&!a(g,v,x)&&!e.solid(g,v,.3,w,w+.6),c=n?1.15:.82,d=[];for(let g=-28;g<=28;g+=c)for(let v=-22;v<=22;v+=c){const w=g+(s()-.5)*c*.8,x=v+(s()-.5)*c*.8,M=k(w,x);f(w,x,M,1.02)&&d.push([w,M,x])}const h=new Po(Ca(n),i,d.length);d.forEach(([g,v,w],x)=>{const M=(n?.72:.6)+s()*.2;r.position.set(g,v-.03,w),r.rotation.set(0,s()*Math.PI*2,0),r.scale.set(M,(.5+s()*.3)*1,M),r.updateMatrix(),h.setMatrixAt(x,r.matrix),yt(g,w,u),l.copy(u).multiplyScalar(1.12+s()*.1),h.setColorAt(x,l)}),h.receiveShadow=!0,h.layers.set(1),o.add(h);const m=[];for(let g=0;g<(n?900:1800)&&m.length<(n?110:240);g++){const v=(s()-.5)*54,w=(s()-.5)*42,x=k(v,w);Se(v,w)<.8&&s()>.25||!f(v,w,x,1.3)||m.push([v,x,w])}const p=new Po(Pa(),i,m.length);m.forEach(([g,v,w],x)=>{const M=.45+s()*.3;r.position.set(g,v-.03,w),r.rotation.set(0,s()*Math.PI*2,0),r.scale.set(M,M*(.8+s()*.4),M),r.updateMatrix(),p.setMatrixAt(x,r.matrix),yt(g,w,u),l.copy(u).multiplyScalar(1.05+s()*.12),p.setColorAt(x,l)}),p.receiveShadow=!0,p.layers.set(1),o.add(p)}const Ke=I("#4a3c3a"),bt=I("#6a5548");let fs={value:0},ut=null;function Ra(){if(ut)return ut;const o=256,e=document.createElement("canvas");e.width=e.height=o;const t=e.getContext("2d");t.fillStyle="#ffffff";const n=fe(1337),a=(s,r,l,u,f)=>{t.save(),t.translate(s,r),t.rotate(f),t.beginPath(),t.moveTo(0,-l/2),t.quadraticCurveTo(u,-l*.1,0,l/2),t.quadraticCurveTo(-u,-l*.1,0,-l/2),t.fill(),t.restore()},i=o/2;for(let s=0;s<70;s++){const r=Math.sqrt(n())*o*.36,l=n()*Math.PI*2,u=i+Math.cos(l)*r,f=i+Math.sin(l)*r*.9;a(u,f,30+n()*26,11+n()*6,l+Math.PI/2+(n()-.5)*.9)}return t.beginPath(),t.arc(i,i,o*.2,0,Math.PI*2),t.fill(),ut=new Ue(e),ut.colorSpace=Tt,ut}function We(o,e=0,t=!1){const n=new le({color:o,roughness:.8});return e&&(n.emissive=new D(o),n.emissiveIntensity=e),t&&(n.map=Ra(),n.alphaTest=.5,n.side=nt),n.onBeforeCompile=a=>{a.uniforms.uLeafTime=fs,a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
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
    `)},n.customProgramCacheKey=()=>`foliage-${e}-${t}`,n}const us=["#2f6a52","#43805a","#5a9064","#3f7a63","#6f9768"],hs=["#2f5f74","#3f7a8c","#4f8e90","#4a7894","#6a9aa2"],ps=["#c66fae","#9a6fd6","#e38bb8","#7d8de6"],Ea=us.map(o=>We(o)),Da=hs.map(o=>We(o)),vo=(o,e)=>`#${new D(o).offsetHSL(0,-.02,e).getHexString()}`,Ia=us.map(o=>We(vo(o,.09),0,!0)),Ba=hs.map(o=>We(vo(o,.09),0,!0)),Go=["#1f4d48","#285c50","#2f6a5a","#234f5a"].map(o=>We(o)),Rt=ps.map(o=>We(o,.32)),No=ps.map(o=>We(vo(o,.06),.38,!0)),Fa=re(16766704,2.2);function no(o,e,t){const n=new Lt(o,e),a=fe(t),i=n.attributes.position,s=n.attributes.normal,r=new Map;for(let l=0;l<i.count;l++){const u=`${i.getX(l).toFixed(3)},${i.getY(l).toFixed(3)},${i.getZ(l).toFixed(3)}`;r.has(u)||r.set(u,.84+a()*.3);const f=r.get(u),c=i.getX(l),d=i.getY(l),h=i.getZ(l),m=Math.hypot(c,d,h)||1;s.setXYZ(l,c/m,d/m,h/m),i.setXYZ(l,c*f,d*f,h*f)}return n}function De(o,e,t,n,a,i){const s=t.clone().sub(e),r=e.clone().lerp(t,.5);G(o,new jo(a,n,s.length()*1.05,7),i,r.x,r.y,r.z).quaternion.setFromUnitVectors(new b(0,1,0),s.normalize())}function Oa(o,e,t,n,a,i,s,r=!1){const l=k(t,n),u=r?Da:Ea,f=r?Ba:Ia,c=fe(s),d=new W;d.position.set(t,l-.18,n),d.rotation.y=i,d.scale.setScalar(a),o.add(d);const h=[new b(0,-.02,0),new b(-.11,.96,.09),new b(.055,1.88,.16),new b(.49,2.68,.2),new b(.75,3.3,.14)],m=[.238,.174,.118,.071,.023];for(let p=1;p<h.length;p++)De(d,h[p-1],h[p],m[p-1],m[p],p%2===0?Ke:bt);for(let p=0;p<5;p++){const g=p*Math.PI*.4+c()*.31;De(d,new b(-.02,.31,.03),new b(Math.cos(g)*.62,-.02,Math.sin(g)*.6),.12,.036,Ke)}for(let p=0;p<10;p++){const g=p/10,v=p*2.4+c()*.41,w=new b(Math.cos(v),0,Math.sin(v)),x=h[1].clone().lerp(h[4],.25+.67*g),M=(1-g*.69)*(1.32+c()*.51),C=x.clone().addScaledVector(w,M);C.y+=.31+c()*.19;const z=x.clone().lerp(C,.53);z.y-=.14,De(d,x,z,.079-g*.033,.049,Ke),De(d,z,C,.052,.017,bt);for(let T=0;T<3;T++){const S=z.clone().lerp(C,.22+T*.32),A=(1-g*.54)*(1-T*.18),B=G(d,no(1,1,s+p*7+T),u[(p+T+1)%u.length],S.x,S.y+.1,S.z);B.scale.set((.9+c()*.25)*A,(.46+c()*.16)*A,(.86+c()*.22)*A),B.rotation.y=p*.94,B.rotation.z=-.16+c()*.35,ao(d,f[(p+T+1)%f.length],B.position,B.scale.x,B.scale.y,B.scale.z,T===0?6:4,c)}}for(let p=0;p<3;p++){const g=G(d,no(.56-p*.09,1,s+91+p),u[2+p],.62+.139*p,3.07+.2*p,.14);g.scale.set(1.22,.57,.92),ao(d,f[2+p],g.position,.68-p*.1,.32-p*.05,.5-p*.08,4,c)}e.add(t,n,a*.43,a*.43,l-.2,a*1.8)}const La=new b(0,0,1),ht=new b;function ao(o,e,t,n,a,i,s,r){for(let l=0;l<s;l++){const u=r()*Math.PI*2,f=-.25+r()*1.15;ht.set(Math.cos(u),f,Math.sin(u)).normalize();const c=(n+i)*(.62+r()*.26),d=G(o,new Pe(c,c*(.8+r()*.3)),e,t.x+ht.x*n*.82,t.y+ht.y*a*.9,t.z+ht.z*i*.82);d.quaternion.setFromUnitVectors(La,ht),d.rotateZ(r()*Math.PI*2)}}function Ga(o,e,t,n,a,i){const s=fe(i),r=k(t,n),l=new W;l.position.set(t,r-.1,n),l.rotation.y=s()*6.28,l.scale.setScalar(a),o.add(l),_(l,Ke,.07,.14,1.3,0,.62,0,6);const u=4+Math.floor(s()*2);for(let f=0;f<u;f++){const c=f/u,d=(1-c*.72)*(.95+s()*.14),h=.95-c*.25,m=new fo(d,h,7,1),p=m.attributes.position;for(let v=0;v<p.count;v++)p.getY(v)<0&&(p.setY(v,p.getY(v)-.08+s()*.05),p.setX(v,p.getX(v)*(.9+s()*.2)),p.setZ(v,p.getZ(v)*(.9+s()*.2)));m.computeVertexNormals();const g=G(l,m,Go[(f+i)%Go.length],(s()-.5)*.05,.9+f*.52,(s()-.5)*.05);g.rotation.y=s()*6.28}e.add(t,n,a*.5,a*.5,r-.2,a*3)}function Na(o,e,t,n,a,i){const s=fe(i),r=k(t,n),l=new W;l.position.set(t,r-.1,n),l.rotation.y=s()*6.28,l.scale.setScalar(a),o.add(l);const u=[new b(0,0,0),new b(.12,.8,.05),new b(-.05,1.55,.1),new b(.15,2.1,0)],f=[.17,.12,.08,.05];for(let h=1;h<u.length;h++)De(l,u[h-1],u[h],f[h-1],f[h],bt);const c=Rt[i%Rt.length],d=Rt[(i+1)%Rt.length];for(let h=0;h<7;h++){const m=h*2.4+s()*.5,p=h===0?0:.55+s()*.45,g=u[3].x+Math.cos(m)*p,v=u[3].z+Math.sin(m)*p,w=u[3].y+.1+(h===0?.35:s()*.3-.1);h&&De(l,u[2],new b(g,w-.1,v),.05,.02,bt);const x=G(l,no(.5+s()*.2,1,i+h),h%3?c:d,g,w,v);if(x.scale.y=.7,ao(l,No[(i+(h%3?0:1))%No.length],x.position,.6,.38,.6,5,s),h&&s()>.35){const M=G(l,new Lt(.055,0),Fa,g*1.08,w-.42,v*1.08);M.castShadow=!1}}e.add(t,n,a*.4,a*.4,r-.2,a*2.5)}const Ua=[[-12.9,9.6,.95],[-19.4,10.9,.85],[-11.4,-4.6,.8],[-19.6,1.1,.78],[6.9,15.1,.82],[17.7,4.2,.74]];function Wa(o,e,t){const n=fe(48151);let a=0;const i=t?22:38;for(let s=0;s<900&&a<i;s++){const r=n()*Math.PI*2,l=.74+n()*.17,[u,f]=Ce(r,l),c=k(u,f);f>12.5&&Math.abs(u-2)<9||c<de+.25||Mt(u,f,1.7)||e.solid(u,f,1.1,c-.5,c+3)||(Ga(o,e,u,f,.8+n()*.65,3001+s),a++)}}const Ha=[[-21.4,-1.2,1.22,.75,1],[-17.1,-7.15,1.32,.12,1],[-12.35,-5.4,.94,-1.2,1],[-17.95,2.62,.83,.68,1],[-22.2,5.9,.83,.24,1],[-8.15,-12.3,1.13,.28,0],[-.42,-16.85,1.12,-.43,0],[-9.65,-14.48,.78,1.1,0],[4.35,-15.45,1.29,.12,0],[8.67,-12.66,.88,1.68,0],[16.7,-10.47,1.01,-.29,0],[19.55,-6.5,1.03,.52,0],[22.02,-1.73,.79,-1,0],[20.45,5.3,1.26,.98,0],[18.05,10.94,1.12,-.4,0],[16.43,13.64,.66,2.12,0],[-7.15,13.7,1.13,.8,0],[-8.9,10.6,.86,1.46,0],[-3.2,14.32,.72,1.24,0],[-2.75,-6.9,.72,.26,0],[5.9,-.96,.78,-.46,0],[-10.5,-2.3,.72,.89,1],[-5.5,-4.75,.73,-.89,0]];function Mt(o,e,t){const n=t*t;return rs.some(a=>a.some(i=>(i.x-o)**2+(i.y-e)**2<n))}function Va(o,e,t){const n=["#6f7073","#827263","#697b77","#9d8a76","#51636a"].map(r=>I(r)),a=["#49694f","#5d805f","#798b61"].map(r=>I(r)),i=[re(10466559,.9),re(16757611,.8),re(16744383,.9),re(16773280,.7)],s=fe(5256);for(let r=0;r<(t?290:505);r++){const l=(s()-.5)*56,u=(s()-.5)*42,f=k(l,u),c=Se(l,u);if(c>.995||f<de-.12||e.solid(l,u,.15,f,f+.3))continue;const h=c>.82?.23+s()**2*.79:.06+s()**2*.26;if(Mt(l,u,.89)&&h>.12)continue;const m=G(o,new vt(h,0),n[r%n.length],l,f-h*.06,u);if(m.scale.set(.98+s()*.52,.35+s()*.43,.75+s()*.39),m.rotation.set(.25,s()*6.28,(s()-.5)*.43),h>.64&&e.add(l,u,h*1.15,h*1.17,f-.3,h*.75),!(c>.91||h<.16||r%4!==0))for(let p=0;p<4;p++)G(o,new Lt(.2+s()*.25,0),a[p%a.length],l+(s()-.5)*.85,f+.132,u+(s()-.5)*.62).scale.set(1.22,.65+s()*.3,.78)}for(const[r,l,u]of[[-10.7,6.35,0],[-17.8,4.45,0],[-2.8,6.8,2],[3.5,3.84,1],[9.77,10.8,1],[15.76,11.53,3],[-5.4,-9.9,0],[15.2,-3.56,1],[3.12,14.72,3],[-4.88,11.4,2]])for(let f=0;f<(t?14:28);f++){const c=r+(s()-.5)*2.4,d=l+(s()-.5)*1.55,h=k(c,d),m=.19+s()*.31;if(Mt(c,d,.69)||h<de||e.solid(c,d,.1,h,h+.3))continue;_(o,a[f%3],.011,.018,m,c,h+m/2,d,5);const p=G(o,new Lt(.069+s()*.045,0),i[u],c,h+m,d);p.scale.y=.59}for(const[r,l]of[[-12.4,6.9],[-16.7,5.08],[-19.6,7.05],[-17.1,10.55]])if(!(k(r,l)<de-.2))for(let u=0;u<13;u++){const f=(s()-.5)*.92,c=(s()-.5)*.67,d=.21+s()*.62,h=_(o,a[u%3],.012,.023,d,r+f,k(r+f,l+c)+d/2,l+c,5);h.rotation.z=f*.22}}function qa(o){const e=I("#a68c67");for(const[t,n]of[[[.565,.64,.715,.79],.895],[[1.881,1.954,2.027],.925]]){let a;for(const i of t){const[s,r]=Ce(i,n),l=k(s,r);_(o,bt,.086,.11,1.04,s,l+.43,r,7),y(o,Ke,.235,.145,.235,s,l+.965,r).rotation.y=i;const u=new b(s,l+.73,r);if(a){const f=a.clone().lerp(u,.5);f.y-=.15,De(o,a,f,.025,.023,e),De(o,f,u,.023,.025,e)}a=u}}}function ja(o,e,t,n){fs=t,Ha.forEach(([i,s,r,l,u],f)=>Oa(o,e,i,s,r,l,772+f*331,!!u)),Ua.forEach(([i,s,r],l)=>{const u=k(i,s);u>de+.2&&!Mt(i,s,1.2)&&!e.solid(i,s,.9,u-.5,u+2)&&Na(o,e,i,s,r,61+l*17)}),Wa(o,e,n),Va(o,e,n),ka(o,e,t,n,Mt),qa(o),[-15,-1.02,10.5].forEach((i,s)=>{const[r,l]=s===0?se:[i,15.65],u=k(r,l);u>de&&(y(o,Ke,.28,.14,.83,r,u+.04,l).rotation.y=s*.27)})}class Xa{constructor(e){this.land=e,this.camera.layers.enable(1)}camera=new qo(48,1,.18,700);yaw=.19;pitch=.415;aspect=1;position=new b;aim=new b;target=new b;sample=new b;initialized=!1;intro=0;resize(e,t){this.aspect=e/Math.max(1,t),this.camera.aspect=this.aspect,this.camera.updateProjectionMatrix()}turn(e,t){this.yaw=(this.yaw-e*.0078)%(Math.PI*2),this.pitch=Xe.clamp(this.pitch+t*.0057,.16,1.08)}arrive(){this.intro=1}recenter(){this.yaw=.19,this.pitch=.415}update(e,t,n,a,i,s=!1){const r=this.aspect<.76,l=n?r?58:52:48;if(n)this.walkPose(t,r);else{const c=67.5/Math.max(.32,this.aspect),d=r?Math.max(82,c):63+Math.max(0,1.28-this.aspect)*28,h=i?0:Math.sin(a*.16)*1.5;if(this.position.set(12.9+h,r?38.5:24.6,d),this.aim.set(r?-.25:-9.75*Math.min(1,this.aspect/1.46),r?d*.229:7.9,0),this.intro>0&&!i){this.intro=Math.max(0,this.intro-e/4.6);const m=this.intro,p=m*m*(3-2*m),g=-.38*p,v=this.position.x-this.aim.x,w=this.position.z-this.aim.z,x=1+.14*p;this.position.set(this.aim.x+(v*Math.cos(g)-w*Math.sin(g))*x,this.position.y+10*p,this.aim.z+(v*Math.sin(g)+w*Math.cos(g))*x),this.aim.y+=3.5*p}}(n||i)&&(this.intro=0);const f=!this.initialized||s||i||this.intro>0?1:1-Math.exp(-e*(n?9:3.5));this.camera.position.lerp(this.position,f),this.target.lerp(this.aim,n?Math.min(1,f*1.22):f),this.camera.fov=Xe.lerp(this.camera.fov,l,f),this.camera.updateProjectionMatrix(),this.camera.lookAt(this.target),this.camera.updateMatrixWorld(),this.initialized=!0}walkPose(e,t){const n=Math.sin(this.yaw),a=Math.cos(this.yaw),i=t?8.9:9.3,s=i*Math.cos(this.pitch);this.aim.set(e.x-n*1.6,Math.max(-2,e.y)+1.78,e.z-a*1.6),this.position.set(e.x+n*s+a*.5,Math.max(-.5,e.y)+1.17+i*Math.sin(this.pitch),e.z+a*s-n*.5),this.sample.set(e.x,Math.max(-2,e.y)+1.5,e.z);for(let r=1;r<=20;r++){const l=r/20,u=Xe.lerp(this.sample.x,this.position.x,l),f=Xe.lerp(this.sample.y,this.position.y,l),c=Xe.lerp(this.sample.z,this.position.z,l);if(this.land.solid(u,c,.42,f-.39,f+.38)||Se(u,c)<1&&k(u,c)>f-.45){this.position.lerp(this.sample,1-Math.max(.2,(r-1)/20));break}}}}const Ya=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowLeft","ArrowDown","ArrowRight"]),$a=new Set(["ShiftLeft","ShiftRight"]),Qa=new Set(["KeyQ","KeyE"]),Ka=new Set(["Space","Enter","NumpadEnter"]);class Za{constructor(e,t,n,a){this.stick=t,this.paceButton=n;const i={signal:this.events.signal},s=(...p)=>p.some(g=>this.held.has(g)),r=()=>{const p=Number(s("KeyD","ArrowRight"))-Number(s("KeyA","ArrowLeft")),g=Number(s("KeyS","ArrowDown"))-Number(s("KeyW","ArrowUp"));this.axes.set(p+this.joystick.x,g+this.joystick.y),this.axes.lengthSq()>1&&this.axes.normalize(),a.invalidate()};e.addEventListener("keydown",p=>{p.altKey||p.ctrlKey||p.metaKey||p.isComposing||!a.active()||(Ya.has(p.code)||$a.has(p.code)||Qa.has(p.code)?(p.preventDefault(),this.held.add(p.code),r()):!p.repeat&&Ka.has(p.code)?(p.preventDefault(),a.inspect()):!p.repeat&&p.code==="KeyR"&&(p.preventDefault(),a.reset()))},i),window.addEventListener("keyup",p=>{this.held.delete(p.code)&&r()},i),e.addEventListener("blur",()=>{this.held.clear(),r()},i),window.addEventListener("blur",()=>this.clear(),i),n.addEventListener("pointerdown",p=>{p.button!==0||this.pacePointer!==null||!a.active()||(p.preventDefault(),this.pacePointer=p.pointerId,n.setPointerCapture(p.pointerId),n.setAttribute("data-held",""),a.invalidate())},i);const l=p=>{this.pacePointer===p.pointerId&&(this.pacePointer=null,n.removeAttribute("data-held"),a.invalidate())};n.addEventListener("pointerup",l,i),n.addEventListener("pointercancel",l,i),n.addEventListener("lostpointercapture",l,i);let u=null;e.addEventListener("pointerdown",p=>{p.button!==0||u||!a.active()||(u={id:p.pointerId,startX:p.clientX,startY:p.clientY,lastX:p.clientX,lastY:p.clientY,moving:!1},e.setPointerCapture(p.pointerId))},i),e.addEventListener("pointermove",p=>{if(a.active()){if(!u){p.pointerType==="mouse"&&a.hover(p.clientX,p.clientY);return}u.id===p.pointerId&&(!u.moving&&Math.hypot(u.startX-p.clientX,u.startY-p.clientY)<5||(u.moving=!0,a.look(p.clientX-u.lastX,p.clientY-u.lastY),u.lastX=p.clientX,u.lastY=p.clientY))}},i),e.addEventListener("pointerup",p=>{!u||u.id!==p.pointerId||(!u.moving&&a.active()&&a.pick(p.clientX,p.clientY),u=null)},i);const f=p=>{u?.id===p.pointerId&&(u=null)};e.addEventListener("pointercancel",f,i),e.addEventListener("lostpointercapture",f,i),e.addEventListener("pointerleave",()=>e.removeAttribute("data-inspectable"),i);const c=t.querySelector("span");let d=-1;const h=p=>{const g=t.getBoundingClientRect(),v=g.width*.32;this.joystick.set((p.clientX-g.left-g.width/2)/v,(p.clientY-g.top-g.height/2)/v),this.joystick.lengthSq()>1&&this.joystick.normalize(),c.style.transform=`translate(${this.joystick.x*v}px, ${this.joystick.y*v}px)`,r()};t.addEventListener("pointerdown",p=>{d!==-1||!a.active()||(p.preventDefault(),d=p.pointerId,t.setPointerCapture(d),h(p))},i),t.addEventListener("pointermove",p=>{p.pointerId===d&&a.active()&&h(p)},i);const m=p=>{d===p.pointerId&&(d=-1,this.joystick.set(0,0),c.style.removeProperty("transform"),r())};t.addEventListener("pointerup",m,i),t.addEventListener("pointercancel",m,i),t.addEventListener("lostpointercapture",m,i)}axes=new K;held=new Set;joystick=new K;events=new AbortController;pacePointer=null;get turn(){return Number(this.held.has("KeyE"))-Number(this.held.has("KeyQ"))}get walkHeld(){return this.pacePointer!==null||this.held.has("ShiftLeft")||this.held.has("ShiftRight")}clear(){this.held.clear(),this.joystick.set(0,0),this.axes.set(0,0),this.stick.querySelector("span").style.removeProperty("transform");const e=this.pacePointer;this.pacePointer=null,this.paceButton.removeAttribute("data-held"),e!==null&&this.paceButton.hasPointerCapture(e)&&this.paceButton.releasePointerCapture(e)}dispose(){this.events.abort()}}function Ja(o){const e=new Set,t=new Set,n=new Set;o.traverse(a=>{if("geometry"in a&&a.geometry instanceof te&&e.add(a.geometry),a instanceof E&&"instanceMatrix"in a&&"dispose"in a&&typeof a.dispose=="function"&&a.dispose(),!("material"in a))return;const i=Array.isArray(a.material)?a.material:[a.material];for(const s of i)if(s instanceof qs){t.add(s);for(const r of Object.values(s))r instanceof _o&&n.add(r);if(s instanceof ne)for(const r of Object.values(s.uniforms))r.value instanceof _o&&n.add(r.value)}});for(const a of n)a.dispose();for(const a of e)a.dispose();for(const a of t)a.dispose();o.clear()}const wo=3.5,ei=wo*1.6,be=.9,ti=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];function oi(o,e,t,n){if(o.clearPath(e,t,...n))return[n];const a=(c,d)=>{const h=Math.round(c/be),m=Math.round(d/be);let p=null,g=1/0;for(let v=-2;v<=2;v++)for(let w=-2;w<=2;w++){const x=h+v,M=m+w,C=x*be,z=M*be,T=Math.hypot(C-c,z-d);T<g&&o.canStand(C,z,.025)&&o.clearPath(c,d,C,z)&&(p=[x,M],g=T)}return p},i=a(e,t),s=a(...n);if(!i||!s)return[];const r=(c,d)=>Math.hypot(s[0]-c,s[1]-d),l={x:i[0],z:i[1],cost:0,estimate:r(...i),last:null,checked:!1},u=[l],f=new Map([[i.join(","),l]]);for(;u.length;){let c=0;for(let h=1;h<u.length;h++)u[h].estimate<u[c].estimate&&(c=h);const d=u.splice(c,1)[0];if(d.x===s[0]&&d.z===s[1]){const h=[n];for(let g=d;g;g=g.last)h.push([g.x*be,g.z*be]);h.reverse();const m=[];let p=[e,t];for(let g=0;g<h.length;g++){for(;g+1<h.length&&o.clearPath(...p,...h[g+1]);)g++;p=h[g],m.push(p)}return m}d.checked=!0;for(const[h,m]of ti){const p=d.x+h,g=d.z+m,v=`${p},${g}`,w=f.get(v),x=d.cost+Math.hypot(h,m);if(w&&(w.checked||x>=w.cost)||!o.clearPath(d.x*be,d.z*be,p*be,g*be))continue;const M=x+r(p,g);if(w)Object.assign(w,{cost:x,estimate:M,last:d});else{const C={x:p,z:g,cost:x,estimate:M,last:d,checked:!1};f.set(v,C),u.push(C)}}}return[]}class si{constructor(e){this.land=e,this.reset()}position=new b;velocity=new K;heading=Math.PI;falling=!1;gravity=0;path=[];lastRange=1/0;obstruction=0;desired=new K;get walkingRoute(){return this.path.length>0}get moving(){return this.velocity.lengthSq()>0}reset(){const[e,t]=on;this.position.set(e,k(e,t),t),this.velocity.set(0,0),this.heading=Math.PI,this.falling=!1,this.gravity=0,this.cancel()}cancel(){this.path.length=0,this.lastRange=1/0,this.obstruction=0}guide(e){this.cancel();const{x:t,z:n}=this.position;return this.falling||(this.path=oi(this.land,t,n,e)),this.walkingRoute}update(e,t,n,a){if(t.lengthSq()>.001){this.cancel();const h=Math.cos(n),m=Math.sin(n);this.desired.set(t.x*h+t.y*m,-t.x*m+t.y*h)}else if(this.path.length){const[h,m]=this.path[0];this.desired.set(h-this.position.x,m-this.position.z);const p=this.desired.length();p<.32?(this.path.shift(),this.lastRange=1/0,this.obstruction=0):(this.obstruction=p+.005<this.lastRange?0:this.obstruction+e,this.lastRange=p,this.obstruction>1.35&&this.cancel()),this.desired.multiplyScalar(1/Math.max(1,p)),this.path.length||this.desired.set(0,0)}else this.desired.set(0,0);const i=this.walkingRoute||a?wo:ei;if(this.desired.multiplyScalar(i),this.falling)return this.gravity-=14.3*e,this.position.y+=this.gravity*e,this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.y*e,this.position.y<-7.7?(this.reset(),!0):!1;const s=this.desired.lengthSq()>.04?12.4:15.1;this.velocity.lerp(this.desired,1-Math.exp(-s*e)),this.velocity.lengthSq()<.001&&this.velocity.set(0,0);const r=this.position.x,l=this.position.z,u=r+this.velocity.x*e,f=l+this.velocity.y*e;this.canMove(u,f)?(this.position.x=u,this.position.z=f):(this.canMove(u,l)&&(this.position.x=u),this.canMove(this.position.x,f)&&(this.position.z=f));const c=this.position.x-r,d=this.position.z-l;if(Math.abs(c)+Math.abs(d)>4e-4){const h=Math.atan2(c,d),m=Math.atan2(Math.sin(h-this.heading),Math.cos(h-this.heading));this.heading+=m*(1-Math.exp(-e*14))}else this.desired.lengthSq()>.04&&this.velocity.multiplyScalar(.55);return Se(this.position.x,this.position.z)>1.003?(this.falling=!0,this.cancel()):this.position.y=k(this.position.x,this.position.z),!1}canMove(e,t){if(Se(e,t)>.975)return!1;const n=k(e,t);return n>de-.19&&n-this.position.y<.27&&!this.land.solid(e,t,Ko,n+.04,n+1.57)}}const Nt={rings:96,sides:24,length:96},ni=1.15,io=11/Nt.length,ge={jade:"#597d68",dark:"#334e47",belly:"#deca9f",mane:"#b45a30",maneLight:"#e88b40",horn:"#eee0bc",eye:"#ecb84c"};function Uo(o){const e=Math.min(1,Math.max(0,o/io));return Math.max(.035,1.9*Math.pow(1-Math.min(1,o),.72)*(1+.12*Math.sin(o*Math.PI))*(.72+.28*e*e*(3-2*e)))}function ai(){const{rings:o,sides:e}=Nt,t=(o+1)*(e+1),n=new te,a=new Float32Array(t*3),i=new Float32Array(t*2),s=[],r=new D(ge.jade),l=new D(ge.belly),u=new D(ge.dark),f=new D;for(let c=0;c<=o;c++)for(let d=0;d<=e;d++){const h=c*(e+1)+d,m=-Math.cos(d/e*Math.PI*2);if(f.copy(r).lerp(u,Math.max(0,m)*.24).lerp(l,Math.max(0,Math.min(1,(m-.06)*5))),f.toArray(a,h*3),i[h*2]=d/e,i[h*2+1]=c/o,c<o&&d<e){const p=h+e+1;s.push(h,h+1,p,h+1,p+1,p)}}return n.setAttribute("position",new F(new Float32Array(t*3),3)),n.setAttribute("normal",new F(new Float32Array(t*3),3)),n.setAttribute("color",new F(a,3)),n.setAttribute("uv",new F(i,2)),n.setIndex(s),n}function ms(o,e=24){const t=new te,n=[],a=[],i=[];o.forEach(([s,r,l,u],f)=>{for(let c=0;c<=e;c++){const d=c/e*Math.PI*2,h=Math.sin(d),m=Math.cos(d);if(n.push(Math.sign(h)*Math.pow(Math.abs(h),.82)*r,u+Math.sign(m)*Math.pow(Math.abs(m),.88)*l,s),a.push(c/e,f/(o.length-1)),f<o.length-1&&c<e){const p=f*(e+1)+c,g=p+e+1;i.push(p,g,p+1,p+1,g,g+1)}}});for(const s of[0,o.length-1]){const r=n.length/3,l=o[s];n.push(0,l[3],l[0]),a.push(.5,s===0?0:1);for(let u=0;u<e;u++){const f=s*(e+1)+u;s===0?i.push(r,f,f+1):i.push(r,f+1,f)}}return t.setAttribute("position",new F(n,3)),t.setAttribute("uv",new F(a,2)),t.setIndex(i),t.computeVertexNormals(),t}const gt=[[-1.85,.06,.1,.45],[-1.45,1.3,1.03,.5],[-.5,1.85,1.25,.57],[.55,2.12,1.32,.59],[1.45,2.01,1.18,.5],[2.15,1.72,.92,.34],[2.95,1.36,.67,.18],[3.8,1.12,.52,.08],[4.6,.96,.42,.035],[5.18,.91,.37,.02],[5.48,.99,.36,.03],[5.67,.77,.3,.03],[5.8,.015,.025,.03]],ii=[[-.65,.03,.03,.03],[0,.98,.17,-.06],[1,1.05,.18,-.04],[2.2,.92,.16,-.04],[3.25,.84,.15,-.12],[3.9,.7,.12,-.15],[4.2,.33,.08,-.14],[4.28,.015,.015,-.12]];function gs(o){const e=Math.max(0,Math.min(1,(o-2.5)/1.5)),t=e*e*(3-2*e);return[.82-t*.08,.88-t*.26]}function ro(o){const e=gt,t=(n,a)=>{const i=l=>(e[l+1][a]-e[l][a])/(e[l+1][0]-e[l][0]);if(n===0)return i(0);if(n===e.length-1)return i(n-1);const s=i(n-1),r=i(n);return s*r<=0?0:2*s*r/(s+r)};for(let n=1;n<e.length;n++){if(o>e[n][0])continue;const a=Math.max(0,(o-e[n-1][0])/(e[n][0]-e[n-1][0])),i=e[n-1],s=e[n],r=s[0]-i[0],l=u=>(2*a*a*a-3*a*a+1)*i[u]+(a*a*a-2*a*a+a)*r*t(n-1,u)+(-2*a*a*a+3*a*a)*s[u]+(a*a*a-a*a)*r*t(n,u);return[o,l(1),l(2),l(3)]}return e[e.length-1]}function ri(o,e,t){const n=Math.max(0,Math.min(1,(t-5.12)/.4)),a=n*n*(3-2*n),i=(l,u,f,c)=>Math.exp(-Math.pow((Math.abs(o)-l)/f,2)-Math.pow((e-u)/c,2)),s=a*(i(.67,.12,.25,.2)*.11+i(.34,-.18,.28,.16)*.025+i(0,.26,.24,.2)*.035-i(.54,.16,.15,.07)*.105-i(0,-.12,.075,.18)*.045-i(.86,-.02,.065,.18)*.028);if(s<=0)return s;const r=Math.max(0,5.8-t);return r>1e-5?r*(1-Math.exp(-s/r)):0}function ci(){const o=[];gt.slice(1).forEach((a,i)=>{const s=gt[i][0],r=a[0]>=3.5?12:6;for(let l=0;l<r;l++)o.push(ro(s+(a[0]-s)*l/r))}),o.push(gt[gt.length-1]);const e=ms(o,80),t=e.getAttribute("position"),n=e.getAttribute("uv");for(let a=0;a<t.count;a++){const i=t.getZ(a),[,s,r,l]=ro(i),[u,f]=gs(i),c=n.getX(a)*Math.PI*2,d=Math.sign(Math.sin(c))*Math.pow(Math.abs(Math.sin(c)),u)*s,h=l+Math.sign(Math.cos(c))*Math.pow(Math.abs(Math.cos(c)),f)*r;if(a>=o.length*81)continue;n.setY(a,(i+1.85)/7.65),t.setX(a,d);const m=Math.max(0,Math.min(1,(h-l)/r)),p=Math.max(0,Math.min(1,(i+.7)/1.2))*Math.max(0,Math.min(1,(3.6-i)/1.2));t.setY(a,h+Math.exp(-d*d*3.5)*m*m*p*.11),t.setZ(a,i+ri(d,h,i))}return e.computeVertexNormals(),e}function vs(o,e){const[,t,n,a]=ro(e),[i,s]=gs(e),r=Math.pow(Math.min(1,Math.abs((o-a)/n)),1/s);return t*Math.pow(Math.sqrt(Math.max(0,1-r*r)),i)}const li={z:1.85,y:.76,length:.62,height:.31,tilt:-.24};function xo(o,e,t,n=0){const a=li,i=a.z+o*a.length,s=a.y+a.tilt*o+e*(e>0?.86-o*.24:.82*(1-o*.16))*Math.pow(Math.max(0,1-o*o),.75)*a.height;return t.set(vs(s,i)+.065+.075*(1-o*o)*(1-e*e)+n,s,i)}function di(){const o=[],e=[],t=[],n=new b,a=32,i=16;for(let r=0;r<=a;r++)for(let l=0;l<=i;l++)if(xo(r/a*2-1,l/i*2-1,n),o.push(n.x,n.y,n.z),e.push(r/a,l/i),r<a&&l<i){const u=r*(i+1)+l,f=u+i+1;t.push(u,u+1,f,u+1,f+1,f)}const s=new te;return s.setAttribute("position",new F(o,3)),s.setAttribute("uv",new F(e,2)),s.setIndex(t),s.computeVertexNormals(),s}function fi(){const o=[],e=[],t=new b,n=32,a=6;for(let s=0;s<=n;s++)for(let r=0;r<=a;r++){const l=s/n*2.8-1.75,u=r/a,f=Math.pow(Math.sin(s/n*Math.PI),.6);xo(l,1,t);const c=t.x;if(t.y+=Math.max(0,-l-.45)*.27+u*.23*f*(.9-l*.24),t.z-=u*.16*f,t.x=Math.max(c-.14*u,vs(t.y,t.z)+.025)+Math.sin(u*Math.PI)*.09*f,o.push(t.x,t.y,t.z),s<n&&r<a){const d=s*(a+1)+r,h=d+a+1;e.push(d,d+1,h,d+1,h+1,h)}}const i=new te;return i.setAttribute("position",new F(o,3)),i.setIndex(e),i.computeVertexNormals(),i}function ui(o,e){const t=Math.max(0,Math.min(1,e))*(o.length-1),n=Math.min(o.length-2,Math.floor(t)),a=t-n;return o[n]*(1-a)+o[n+1]*a}function Le(o,e,t=22,n=8,a){const i=new js(o.map(c=>new b(...c))),s=i.computeFrenetFrames(t,!1),r=[],l=[],u=[];for(let c=0;c<=t;c++){const d=c/t,h=i.getPointAt(d),m=a?e*ui(a,d):e*Math.pow(1-d,.72)+.008;for(let p=0;p<=n;p++){l.push(p/n,c/t);const g=p/n*Math.PI*2,v=s.normals[c],w=s.binormals[c];if(r.push(h.x+m*(v.x*Math.cos(g)+w.x*Math.sin(g)),h.y+m*(v.y*Math.cos(g)+w.y*Math.sin(g)),h.z+m*(v.z*Math.cos(g)+w.z*Math.sin(g))),c<t&&p<n){const x=c*(n+1)+p,M=x+n+1;u.push(x,M,x+1,x+1,M,M+1)}}}const f=new te;return f.setAttribute("position",new F(r,3)),f.setAttribute("uv",new F(l,2)),f.setIndex(u),f.computeVertexNormals(),f}function Jt(o,e,t){const n=e.clone().sub(o),a=new b().crossVectors(n,new b(0,0,1)).normalize();a.lengthSq()<.01&&a.set(1,0,0);const i=new b().crossVectors(a,n).normalize(),s=[];for(let d=0;d<=10;d++){const h=d/10,m=o.clone().addScaledVector(n,h).addScaledVector(i,Math.sin(h*Math.PI)*t*.42),p=t*(.16*(1-h)+Math.pow(Math.sin(h*Math.PI),.75)*Math.pow(1-h,.35));s.push([-1,0,1,0].map((g,v)=>m.clone().addScaledVector(a,g*p*(g<0&&d===6?.67:g>0&&d===8?.48:1)).addScaledVector(i,v===1?p*.1:v===3?-p*.025:0)))}const r=[],l=[],u=[],f=[new D(ge.maneLight),new D(ge.mane),new D("#853f27"),new D(ge.mane)];for(let d=0;d<4;d++){const h=r.length/3;for(let m=0;m<s.length;m++)for(const p of[d,(d+1)%4]){const g=s[m][p];if(r.push(g.x,g.y,g.z),f[d].toArray(l,l.length),m<s.length-1&&p===d){const v=h+m*2;u.push(v,v+1,v+2,v+1,v+3,v+2)}}}const c=new te;return c.setAttribute("position",new F(r,3)),c.setAttribute("color",new F(l,3)),c.setIndex(u),c.computeVertexNormals(),c}const pt=.15;function hi(){const o=[];for(const a of[-1,1])for(let i=0;i<2;i++)for(let s=0;s<(i?7:9);s++){const r=(i?-.64:-.74)+s*(i?.33:.29),l=(i?1.36:1.72)+s%3*.13;o.push(Jt(new b(a*(1.22+Math.cos(r)*.8),.36+Math.sin(r)*1.34,i?.15:-.85),new b(a*(1.25+Math.cos(r)*l),.45+Math.sin(r)*(i?1.8:2.3),(i?-1.55:-2.7)-s%3*.27),i?.3+s%2*.04:.42+s%3*.035))}for(let a=0;a<3;a++)o.push(Jt(new b(0,1.8,-.3-a*.7),new b(0,2.8+a%2*.4,-2.3-a*.6),.6));const e=[];for(let a=0;a<9;a++){const i=(a/8-.5)*1.5,s=3.4-Math.abs(a-4)*.42;e.push(Jt(new b(Math.sin(i)*.05,0,.25),new b(Math.sin(i)*s*.55,.25-Math.abs(i)*.35,-s),.34-Math.abs(a-4)*.03))}const t=[-1,1].map(a=>Le(Array.from({length:25},(i,s)=>xo(s/12-1,a,new b,.012).toArray()),a>0?.035:.04,28,6,[.1,1,1,.1])),n={body:ai(),head:ci(),jaw:ms(ii),eye:di(),brow:fi(),lids:mt(t),mane:mt(o),tail:mt(e),horn:mt([Le([[1.42,1.5,-.7],[1.74,2.7,-1.13],[1.97,3.8,-1.62],[1.75,4.45,-2.5]],.27,28,12),Le([[1.74,2.7,-1.13],[2.35,3.05,-1.48],[2.72,3.66,-2.02]],.15,24,10),Le([[1.91,3.63,-1.52],[2.35,3.85,-1.91],[2.51,4.2,-2.45]],.105,22,10)]),whisker:Le([[1,-.24,5.12],[2.6,-.4,5.3],[4.5,.05,4.3],[4.8,.82,2.2],[4.3,1.38,.55]],.03,36,6),arm:Le([[0,0,0],[.85,-.55,-.72],[1.25,-1.35,-.4],[1.02,-2.25,.6]],.6,22,12,[1,.98,.65,.6]),finger:Le([[0,0,0],[0,-.12,.24],[0,-.38,.45],[0,-.56,.39]],.17,12,8,[1,.95,.7,.5]),spike:new fo(.32,1.1,5)};for(const a of[...o,...e,...t])a.dispose();return n}function pi(o,e,t){const n=hi(),a=new le({color:ge.jade,roughness:.5,emissive:"#2f8a6a",emissiveIntensity:.7}),i={body:new le({vertexColors:!0,roughness:.48,emissive:"#2f8a6a",emissiveIntensity:.6}),mane:new le({vertexColors:!0,roughness:.6,emissive:ge.maneLight,emissiveIntensity:.35,side:nt}),horn:new le({color:ge.horn,roughness:.45}),belly:new le({color:ge.belly,roughness:.6}),dark:new le({color:ge.dark,roughness:.7}),eye:new ee({color:new D(ge.eye).multiplyScalar(2.2),toneMapped:!1})},s=new W;s.name="Pocket Orbit dragon",s.scale.setScalar(pt),s.position.set(t[0],k(t[0],t[1]),t[1]),o.add(s);const r=new E(n.body,i.body);r.frustumCulled=!1,r.castShadow=!0,s.add(r);const l=new W;l.scale.setScalar(ni),s.add(l);const u=new E(n.head,a);u.castShadow=!0,l.add(u,new E(n.mane,i.mane));const f=new W;f.position.set(0,-.26,1.4),f.scale.set(.9,1,1),f.add(new E(n.jaw,i.belly)),l.add(f);for(const P of[-1,1]){const R=new W;R.scale.set(P,1,1),R.add(new E(n.eye,i.eye),new E(n.brow,i.dark),new E(n.lids,i.dark),new E(n.horn,i.horn),new E(n.whisker,i.horn)),l.add(R)}const c=[-1,1].map(P=>{const R=new W,L=new W;L.position.set(P*1.48,-.45,0),L.scale.set(P,1,1),L.add(new E(n.arm,a));for(const q of[-.28,0,.28]){const Y=new E(n.finger,a);Y.position.set(1.02+q,-2.39,1.02),Y.rotation.y=q*.7,L.add(Y)}return R.add(L),s.add(R),{mount:R,limb:L,side:P}}),d=Array.from({length:22},()=>{const P=new E(n.spike,i.mane);return s.add(P),P}),h=new E(n.tail,i.mane);h.scale.setScalar(2.3),s.add(h);const m=10.5/pt,p=.16,g=7/pt,v=new b,w=new b,x=new b,M=new b,C=new b,z=new b(0,1,0),T=new Dt;let S=0;const A=(P,R)=>{const L=S*p-P/m,q=m*(1+.14*Math.sin(L*2+1));return R.set(Math.cos(L)*q,g+Math.sin(L*3)*1.6/pt+Math.sin(L*1.3)*.8/pt,Math.sin(L)*q)},B=P=>{const R=P*Nt.length;A(R,v),A(R+.35,w),x.subVectors(v,w).normalize(),M.crossVectors(z,x).normalize(),C.crossVectors(x,M).normalize(),v.addScaledVector(M,Math.sin(S*1.15-P*8.5)*(.15+P*1.5)).addScaledVector(C,Math.sin(S*.8-P*6)*(.1+P*.7)),T.makeBasis(M,C,x)},H=n.body.getAttribute("position"),N=n.body.getAttribute("normal"),{rings:U,sides:V}=Nt;return()=>{S=e.value;for(let P=0;P<=U;P++){const R=P/U,L=Uo(R);B(R);for(let q=0;q<=V;q++){const Y=q/V*Math.PI*2,_e=Math.sin(Y),Te=Math.cos(Y),Be=M.x*_e+C.x*Te,ue=M.y*_e+C.y*Te,Ae=M.z*_e+C.z*Te,ke=P*(V+1)+q;H.setXYZ(ke,v.x+Be*L,v.y+ue*L*.92,v.z+Ae*L),N.setXYZ(ke,Be,ue,Ae)}}H.needsUpdate=!0,N.needsUpdate=!0,B(0),l.position.copy(v),l.quaternion.setFromRotationMatrix(T),f.rotation.x=.08+Math.max(0,Math.sin(S*.7))*.2,B(io);for(const P of c){P.mount.position.copy(v),P.mount.quaternion.setFromRotationMatrix(T);const R=Math.sin(S*.85-io*7);P.limb.rotation.x=.05+R*.09,P.limb.rotation.z=P.side*(.1+R*.05)}d.forEach((P,R)=>{const L=(R+1)/(d.length+3),q=Uo(L);B(L),P.position.copy(v).addScaledVector(C,q*.9),P.quaternion.setFromRotationMatrix(T),P.rotateX(-.5),P.scale.setScalar(Math.max(.25,q/1.9)*1.6)}),B(.985),h.position.copy(v),h.quaternion.setFromRotationMatrix(T),h.rotateY(Math.sin(S*1.9)*.22)}}function mi(){const o=document.createElement("canvas");o.width=o.height=128;const e=o.getContext("2d");for(let t=0;t<9;t++){const n=30+Math.random()*68,a=34+Math.random()*60,i=22+Math.random()*26,s=e.createRadialGradient(n,a,0,n,a,i);s.addColorStop(0,"rgba(255,255,255,.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=s,e.fillRect(0,0,128,128)}return new Ue(o)}function Wo(o,e,t){let n=[o.clone(),e.clone()],a=o.distanceTo(e)*t;for(let i=0;i<6;i++){const s=[n[0]];for(let r=1;r<n.length;r++){const l=n[r-1],u=n[r],f=l.clone().lerp(u,.5);f.x+=(Math.random()-.5)*a,f.z+=(Math.random()-.5)*a,f.y+=(Math.random()-.5)*a*.3,s.push(f,u)}n=s,a*=.55}return n}function Et(o,e,t){const n=[],a=[],i=new b,s=new b,r=new b;o.forEach((u,f)=>{r.subVectors(o[Math.min(o.length-1,f+1)],o[Math.max(0,f-1)]).normalize(),s.subVectors(t,u).normalize(),i.crossVectors(r,s).normalize();const c=e*(1-f/o.length*.6);if(n.push(u.x-i.x*c,u.y-i.y*c,u.z-i.z*c,u.x+i.x*c,u.y+i.y*c,u.z+i.z*c),f<o.length-1){const d=f*2;a.push(d,d+1,d+2,d+1,d+3,d+2)}});const l=new te;return l.setAttribute("position",new F(n,3)),l.setIndex(a),l}function gi(o,e){const t=e[0]-9,n=e[1]-3.5,a=k(e[0],e[1]),i=a+6.5,s=new W;s.name="Dream Ocean thunderhead",o.add(s);const r=mi(),l=Array.from({length:14},(x,M)=>{const C=new St({map:r,color:"#2b2446",transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}),z=new ot(C),T=M/14*Math.PI*2,S=3+M%3*3.2;return z.position.set(t+Math.cos(T)*S,i+M%4*1.1,n+Math.sin(T)*S*1.3),z.scale.setScalar(11+M%5*2.4),s.add(z),{sprite:z,material:C,drift:Math.random()*6.28}}),u=new ee({color:new D("#b9a2ff").multiplyScalar(1.6),transparent:!0,opacity:0,blending:ze,depthWrite:!1,toneMapped:!1}),f=new ee({color:new D("#f4efff").multiplyScalar(3.2),transparent:!0,opacity:0,blending:ze,depthWrite:!1,toneMapped:!1}),c=new W;o.add(c);const d=new Xo("#c8b6ff",0,34,1.4);d.position.set(t,a+6,n),o.add(d);const h=new D("#c9b8ff"),m=new D("#2b2446");let p=1.5,g=99,v=0;function w(x){for(const U of[...c.children])U.geometry.dispose();c.clear();const M=Math.random()<.35,C=Math.random()*Math.PI*2,z=M?3+Math.random()*4:2+Math.random()*7,T=(M?e[0]:t)+Math.cos(C)*z,S=(M?e[1]:n)+Math.sin(C)*z,A=new b(T,Math.max(Ie,k(T,S)),S),B=new b(t+(Math.random()-.5)*8,i,n+(Math.random()-.5)*6),H=Wo(B,A,.28),N=x.position;c.add(new E(Et(H,.55,N),u),new E(Et(H,.09,N),f));for(let U=0;U<3;U++){const V=H[4+Math.floor(Math.random()*(H.length*.55))],P=V.clone().add(new b((Math.random()-.5)*7,-3-Math.random()*5,(Math.random()-.5)*7)),R=Wo(V,P,.35);c.add(new E(Et(R,.3,N),u),new E(Et(R,.05,N),f))}d.position.copy(A).add(new b(0,3,0)),g=0}return{update(x,M,C,z){v+=(M-v)*Math.min(1,x*2);for(const A of l)A.material.opacity=v*.92,A.sprite.position.x+=Math.sin(g*.2+A.drift)*x*.1;s.visible=v>.01,!z&&v>.25&&(p-=x,p<=0&&(w(C),p=2.6+Math.random()*3.8)),g+=x;const T=g<.12?1:g<.42?.25:g<.52?.85:Math.max(0,1-(g-.52)/.35),S=z?0:T*v;u.opacity=S,f.opacity=S,c.visible=S>.01,d.intensity=S*90;for(const A of l)A.material.color.copy(m).lerp(h,S*.8);return S}}}const ws=1.22;function Ho(o){Xt.common.includes("NIGHT_ACES")||(Xt.common+=`
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
    `);const e=new Set;o.traverse(t=>{if(t instanceof E||t instanceof co||t instanceof ot)for(const n of Array.isArray(t.material)?t.material:[t.material])e.has(n)||!n.toneMapped||n.defines?.NIGHT_ACES||(e.add(n),n.defines={...n.defines,NIGHT_ACES:ws.toFixed(3)},n.needsUpdate=!0)})}function vi(o){const e=new sn,t={antialias:!e.light,alpha:!1,powerPreference:"default",stencil:!1},n=o.canvas.getContext("webgl2",t);if(!n)return null;const a=new Xs({canvas:o.canvas,context:n,...t});a.toneMapping=Vo,a.toneMappingExposure=ws,a.shadowMap.enabled=!0,a.shadowMap.type=Ys,a.shadowMap.autoUpdate=!1,a.shadowMap.needsUpdate=!0;const i=new $s;i.fog=new Qs("#0b0e28",.0046);const s=new W;i.add(s),i.add(new Ks("#94a6ff","#43305a",1.55));const r=new jt("#c7d4ff",2.05);r.position.set(-24,33,24),r.castShadow=!0,r.shadow.mapSize.setScalar(e.light?1024:2048),Object.assign(r.shadow.camera,{near:2,far:150,left:-32,right:32,top:31,bottom:-31}),r.shadow.camera.updateProjectionMatrix(),r.shadow.normalBias=.049,r.shadow.bias=-21e-5,r.shadow.radius=3,r.shadow.intensity=.79,i.add(r);const l=new jt("#d58cff",1.35);l.position.set(12,14,-35),i.add(l);const u=new jt("#5ce6d6",.55);u.position.set(-34,8,-12),i.add(u);const f=new Dn,c={value:0},d=xa(wo,he);i.add(d.root,d.dust);const h=En(s,c,e.light,new b(-24,33,24));ua(s);let m=!1;const p=Qn(s,f,c,()=>{m&&Ho(i),a.shadowMap.needsUpdate=!0,he()}),g=ta(s,f,he);Jn(s,!e.light,c,f),ja(s,f,c,e.light);const v=pi(s,c,me["pocket-orbit"].landmark),w=gi(s,me["dream-ocean"].landmark);In(s);const x=new si(f),M=new Xa(f);let C=null;e.light||(C=new dn(a,new Ye(1,1,{type:$e,samples:4})),C.addPass(new un(i,M.camera)),C.addPass(new Je(new K(1,1),.6,.4,.94)),C.addPass(new fn),a.toneMapping=Zs,Ho(i),m=!0);const z=Object.values(me).map(O=>{const[$,X]=O.landmark,Q=k($,X),[we,Z,pe]=O.hit;return{...O,point:new b($+(O.id==="hanzizap"?2.1:0),Q+O.signHeight,X),box:new $o(new b($-we/2,Q-.5,X-pe/2),new b($+we/2,Q+Z,X+pe/2))}}),T=[...z,...g],S=new b,A=new b,B=new b,H=new Js,N=new K,U=new AbortController,V={signal:U.signal};let P="overview",R=null,L=null,q=!1,Y=!1,_e=!1,Te=!0,Be=!1,ue=!0,Ae=0,ke=0,Re=1,Ee=1,rt=0;const Vt=()=>!q&&!Y&&!_e;function he(){Vt()&&!document.hidden&&Ae===0&&(Ae=requestAnimationFrame(ys))}function He(O,$){P!==O&&(P=O,rt=.72,o.mode(P),P==="overview"&&(ct(),x.velocity.set(0,0),ce.clear())),$&&o.canvas.focus({preventScroll:!0}),he()}function ct(){x.cancel(),L&&(L=null,o.walking(null))}function yo(){ct(),x.reset(),M.recenter(),ue=!0,o.status("Back at arrival."),He("walk",!0)}function bo(O,$){const X=o.canvas.getBoundingClientRect();N.set((O-X.left)/X.width*2-1,1-($-X.top)/X.height*2),H.setFromCamera(N,M.camera);let Q=1/0,we=null;for(const Z of T){if(!H.ray.intersectBox(Z.box,A))continue;const pe=A.distanceTo(H.ray.origin);pe<Q&&(Q=pe,we=Z.id)}if(!we)return null;for(let Z=1;Z<Q;Z+=.9)if(H.ray.at(Z,B),Se(B.x,B.z)<.985&&B.y+.2<k(B.x,B.z))return null;return we}const ce=new Za(o.canvas,o.stick,o.paceButton,{active:Vt,invalidate:he,reset:yo,hover:(O,$)=>o.canvas.toggleAttribute("data-inspectable",bo(O,$)!==null),pick:(O,$)=>{const X=bo(O,$);X&&o.inspect(X)},look:(O,$)=>{He("walk",!0),M.turn(O,$),he()},inspect:()=>{R&&o.inspect(R)}});function qt(){const O=o.viewport.getBoundingClientRect();Re=Math.max(1,O.width),Ee=Math.max(1,O.height),a.setPixelRatio(e.pixels(Re,Ee)),a.setSize(Re,Ee,!1),C&&(C.setPixelRatio(a.getPixelRatio()),C.setSize(Re,Ee)),M.resize(Re,Ee),ue=!0,he()}function xs(){const O=P==="overview",$=Re/Ee<.76,X=rt>.4;let Q=null,we=3.04;for(const Z of z){const pe=Math.hypot(x.position.x-Z.approach[0],x.position.z-Z.approach[1]);!O&&!x.falling&&pe<we&&(we=pe,Q=Z.id),S.copy(Z.point).project(M.camera);const lt=(S.x+1)*.5*Re,Ve=(1-S.y)*.5*Ee,Ct=S.z>-1&&S.z<1&&lt>49&&lt<Re-49&&Ve>($?82:105)&&Ve<Ee-95,qe=O?Z.id!=="observatory"&&Z.id!=="workshop":!X&&pe<29&&pe>3.9;o.sign(Z.id,Ct&&qe?{x:lt,y:Ve}:null)}R!==Q&&(R=Q,o.nearby(Q))}function zt(){cancelAnimationFrame(Ae),Ae=0,ke=0}function ys(O){if(Ae=0,!Vt()||document.hidden)return;const $=ke?Math.max(0,(O-ke)/1e3):0,X=Math.min($||1/60,.065),Q=eo.matches;if(ke=O,rt=Math.max(0,rt-X),(ce.axes.lengthSq()>.001||ce.turn)&&He("walk",!1),ce.turn&&M.turn(ce.turn*X*230,0),P==="walk"){const Ve=X>.033?2:1;let Ct=!1;for(let qe=0;qe<Ve;qe++)if(x.update(X/Ve,ce.axes,M.yaw,ce.walkHeld)){Ct=!0;break}if(Ct&&(M.recenter(),ue=!0,o.status("You returned to arrival.")),L&&!x.walkingRoute){const qe=me[L].name,So=me[L].approach,bs=Math.hypot(x.position.x-So[0],x.position.z-So[1])<.85;o.status(bs?`Arrived at ${qe}.`:"Assisted walk ended."),L=null,o.walking(null)}}Q||(c.value+=X),!Be&&d.ready&&(Be=!0,!Q&&P==="overview"&&!q&&M.arrive()),p(),M.update(X,x.position,P==="walk",c.value,Q,ue),d.update(x.position,x.heading,X,M.camera,ce.walkHeld||!!L,x.falling,ue),ue=!1,v(),h();const[we,Z]=me["dream-ocean"].landmark,pe=Math.hypot(x.position.x-we,x.position.z-Z),lt=P==="walk"?Math.min(1,Math.max(0,(18-pe)/10)):0;w.update(X,lt,M.camera,Q),C?C.render(X):a.render(i,M.camera),Te&&d.ready&&(Te=!1,o.ready(!0)),xs(),!Q&&e.measure($)&&(e.plain&&C&&(C.dispose(),C=null),qt()),!Q||x.falling||x.walkingRoute||x.moving||ce.axes.lengthSq()>0||ce.turn||rt>0?he():ke=0}const Mo=new ResizeObserver(qt);return Mo.observe(o.viewport),qt(),eo.addEventListener("change",he,V),document.addEventListener("visibilitychange",()=>{document.hidden?(ce.clear(),zt()):he()},V),o.canvas.addEventListener("webglcontextlost",O=>{O.preventDefault(),Y=!0,zt(),ct(),ce.clear(),o.ready(!1)},V),o.canvas.addEventListener("webglcontextrestored",()=>{Y=!1,Te=!0,a.shadowMap.needsUpdate=!0,he()},V),{play:()=>He("walk",!0),overview:()=>He("overview",!1),pause(O){q=O,q?(ce.clear(),zt()):he()},walk(O){if(ct(),He("walk",!0),!x.guide(me[O].approach)){o.status("Walk from arrival or select another destination.");return}L=O,o.walking(O),o.status(`Walking to ${me[O].name}.`)},stopWalking:ct,reset:yo,dispose(){_e=!0,zt(),U.abort(),Mo.disconnect(),ce.dispose(),r.shadow.dispose(),C?.dispose(),Ja(i),a.dispose()}}}const bi=Object.freeze(Object.defineProperty({__proto__:null,createIsland:vi},Symbol.toStringTag,{value:"Module"}));export{Ja as d,bi as i,yi as t};
