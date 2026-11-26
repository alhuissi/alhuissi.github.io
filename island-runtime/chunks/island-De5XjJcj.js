const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./pocketOrbitShuttle-BPYiXE6J.js","./three-DDlLQoNt.js","../app.js"])))=>i.map(i=>d[i]);
import{M as I,O as Xo,B as ue,F as W,S as ee,U as gt,V as N,W as je,H as $e,N as jo,T as $o,R as Qo,C as Yo,a as Ko,L as Zo,b as Jo,c as es,A as go,d as ts,e as os,f as ss,g as U,h as T,i as et,j as te,k as tt,l as ns,P as xe,D as ot,m as vo,n as Lt,o as st,p as vt,q as is,r as as,s as Kt,t as rs,u as Re,v as bt,E as Ht,w as ls,x as wo,G as j,y as Mt,z as he,I as cs,J as xo,K as dt,Q as Nt,X as yo,Y as bo,Z as ke,_ as fs,$ as Zt,a0 as hs,a1 as wt,a2 as ds,a3 as us,a4 as ps,a5 as Jt,a6 as ms,a7 as gs,a8 as vs,a9 as ws,aa as xs,ab as _t,ac as ys,ad as zt,ae as bs}from"./three-DDlLQoNt.js";import{d as pe,_ as Ms,r as Ss,a as Ts}from"../app.js";const ut={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class De{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Cs=new Xo(-1,1,1,-1,0,1);class Ps extends ue{constructor(){super(),this.setAttribute("position",new W([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new W([0,2,0,0,2,0],2))}}const _s=new Ps;class Ot{constructor(e){this._mesh=new I(_s,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Cs)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class zs extends De{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ee?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=gt.clone(e.uniforms),this.material=new ee({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ot(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class eo extends De{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let s,r;this.inverse?(s=0,r=1):(s=1,r=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),a.buffers.stencil.setFunc(i.ALWAYS,s,4294967295),a.buffers.stencil.setClear(r),a.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(i.EQUAL,1,4294967295),a.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),a.buffers.stencil.setLocked(!0)}}class As extends De{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ks{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new N);this._width=n.width,this._height=n.height,t=new je(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$e}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new zs(ut),this.copyPass.material.blending=jo,this.timer=new $o}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,a=this.passes.length;i<a;i++){const s=this.passes[i];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),s.needsSwap){if(n){const r=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}eo!==void 0&&(s instanceof eo?n=!0:s instanceof As&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new N);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const rt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Rs extends De{constructor(){super(),this.isOutputPass=!0,this.uniforms=gt.clone(rt.uniforms),this.material=new Qo({name:rt.name,uniforms:this.uniforms,vertexShader:rt.vertexShader,fragmentShader:rt.fragmentShader}),this._fsQuad=new Ot(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Yo.getTransfer(this._outputColorSpace)===Ko&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Zo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Jo?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===es?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===go?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ts?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===os?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===ss&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Es extends De{constructor(e,t,n=null,i=null,a=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new U}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let a,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(a=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=i}}const Bs={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new U(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ie extends De{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new N(e.x,e.y):new N(256,256),this.clearColor=new U(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new je(a,s,{type:$e,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const c=new je(a,s,{type:$e,depthBuffer:!1});c.texture.name="UnrealBloomPass.h"+f,c.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(c);const d=new je(a,s,{type:$e,depthBuffer:!1});d.texture.name="UnrealBloomPass.v"+f,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),a=Math.round(a/2),s=Math.round(s/2)}const r=Bs;this.highPassUniforms=gt.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ee({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new N(1/a,1/s),a=Math.round(a/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=gt.clone(ut.uniforms),this.blendMaterial=new ee({uniforms:this.copyUniforms,vertexShader:ut.vertexShader,fragmentShader:ut.fragmentShader,premultipliedAlpha:!0,blending:et,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new U,this._oldClearAlpha=1,this._basic=new te,this._fsQuad=new Ot(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(n,i),this.renderTargetsVertical[a].setSize(n,i),this.separableBlurMaterials[a].uniforms.invSize.value=new N(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,a){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let r=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ie.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ie.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),r=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(n*n))/n);const i=[],a=[];for(let s=1;s<e;s+=2){const r=t[s],l=s+1<e?t[s+1]:0,h=r+l;i.push((s*r+(s+1)*l)/h),a.push(h)}return new ee({defines:{KERNEL_PAIRS:i.length},uniforms:{colorTexture:{value:null},invSize:{value:new N(.5,.5)},direction:{value:new N(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:i},gaussianWeights:{value:a}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new ee({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Ie.BlurDirectionX=new N(1,0);Ie.BlurDirectionY=new N(0,1);const xt=[26,20],Mo=-15.4,ie=-.45,de=[-16.4,7.85],So=2.41,To=.32;function re(o){return()=>(o=Math.imul(1664525,o)+1013904223|0,(o>>>0)/4294967296)}function Co(o){return 1+.074*Math.sin(o*3+.7)+.086*Math.cos(o*5-.58)+.031*Math.sin(o*11+.52)+.018*Math.cos(o*19)}function Se(o,e=1){const t=Co(o)*e;return[Math.cos(o)*xt[0]*t,Math.sin(o)*xt[1]*t]}function me(o,e){const t=o/xt[0],n=e/xt[1];return Math.hypot(t,n)/Co(Math.atan2(n,t))}function qe(o,e,t,n,i){return Math.exp(-(((o-t[0])/n)**2+((e-t[1])/i)**2))}const yt=Se(So),Ae=[yt[0]-de[0],yt[1]-de[1]];function Is(o,e){const t=Math.max(0,Math.min(1.1,((o-de[0])*Ae[0]+(e-de[1])*Ae[1])/(Ae[0]**2+Ae[1]**2))),n=de[0]+Ae[0]*t,i=de[1]+Ae[1]*t;return Math.exp(-((o-n)**2+(e-i)**2)/1.16)}function P(o,e){const t=qe(o,e,pe.observatory.landmark,7.1,5.8)*3.7,n=qe(o,e,pe["pocket-orbit"].landmark,5.3,5.9)*1.75,i=qe(o,e,[-19.1,-5.7],7.4,5.5)*1.15,a=qe(o,e,[15.6,10],6.8,5.5)*.61,s=qe(o,e,de,3.9,3.3)*1.9+Is(o,e)*.92;return .42+Math.sin(o*.19+e*.24)*.29+Math.cos(e*.31-o*.12)*.32+Math.sin(o*.36+e*.18)*.15+t+n+i+a-s}const nt=`
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
`,pt=`
  varying vec2 coords;
  varying vec3 worldPoint;
  void main() {
    coords = uv;
    vec4 p = modelMatrix * vec4(position, 1.0);
    worldPoint = p.xyz;
    gl_Position = projectionMatrix * viewMatrix * p;
  }
`,Po=`
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
`,Fs=`
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
`,Ds=`
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${nt}
  ${Po}
  ${Fs}

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
`,Us=`
  #include <common>
  uniform float clock;
  uniform float isPool;
  varying vec3 worldPoint;
  ${nt}
  ${Po}

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
`,Gs=`
  #include <common>
  uniform float clock;
  varying vec3 worldPoint;
  ${nt}
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
`;function to(o,e,t,n,i,a,s){const r=new I(new xe(e,t),s);return r.rotation.x=-Math.PI/2,r.position.set(n,i,a),o.add(r),r}function Ls(o,e){const t=[],n=[],i=[],s=(l,h)=>{const f=yt[0]-2.2+l*.21,c=de[1]-4.8+h*.21;return me(f,c)<=1.002&&P(f,c)<ie+.43};for(let l=0;l<=70;l++)for(let h=0;h<=70;h++){if(t.push(yt[0]-2.2+h*.21,ie,de[1]-4.8+l*.21),n.push(h/70,l/70),!l||!h||!s(h,l)||!s(h-1,l-1))continue;const f=l*71+h,c=f-70-2;s(h-1,l)&&i.push(c,f-1,f),s(h,l-1)&&i.push(c,f,f-70-1)}const r=new ue;r.setAttribute("position",new W(t,3)),r.setAttribute("uv",new W(n,2)),r.setIndex(i),o.add(new I(r,e))}function Hs(o,e){const i=[],a=[],s=[];for(let h=0;h<=26;h++){const f=h/26;for(let c=0;c<=15;c++){const d=c/15,p=So+(d-.5)*(.109+.07*f),[g,u]=Se(p,1.003+Math.sin(f*2.1)*.057),m=Math.max(ie+.06,P(g,u)+.02);if(i.push(g-f*.19,m+(Mo-m)*f,u+Math.sin(f*2.5)*.71),a.push(d,f),h===0||c===0)continue;const w=h*16+c,x=w-15-1;s.push(x-1,x,w,x-1,w,w-1)}}const r=new ue;r.setAttribute("position",new W(i,3)),r.setAttribute("uv",new W(a,2)),r.setIndex(s);const l=new ee({uniforms:{clock:e},transparent:!0,depthWrite:!1,side:ot,toneMapped:!1,vertexShader:pt,fragmentShader:`
      uniform float clock;
      varying vec2 coords;
      ${nt}
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
    `});o.add(new I(r,l))}function Ns(o,e){const t={value:0},n=new Lt().load("./island-media/dream-ocean-reflections.webp",()=>{t.value=1,e()});return n.colorSpace=st,n.magFilter=vt,n.minFilter=vt,n.generateMipmaps=!1,new ee({uniforms:{clock:o,heroes:{value:n},reflectionReady:t},toneMapped:!1,side:ot,vertexShader:`
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
      ${nt}
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
    `})}function Os(o,e,t){const n=re(6067),i=[],a=[],s=[];for(let h=0;h<t;h++){const f=(n()-.5)*48,c=(n()-.5)*34;i.push(f,P(f,c)+n()*5+.35,c),a.push(n()*6.283),s.push(n())}const r=new ue;r.setAttribute("position",new W(i,3)),r.setAttribute("phase",new W(a,1)),r.setAttribute("hue",new W(s,1));const l=new ee({uniforms:{clock:e},transparent:!0,depthWrite:!1,toneMapped:!1,blending:et,vertexShader:`
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
    `});o.add(new vo(r,l))}function Ws(o,e,t){const n=new I(new tt(510,32,20),new ee({uniforms:{clock:e},vertexShader:pt,fragmentShader:Ds,side:ns,depthWrite:!1,fog:!1}));n.renderOrder=-10,n.frustumCulled=!1,o.add(n);const i=a=>new ee({uniforms:{clock:e,isPool:{value:a}},vertexShader:pt,fragmentShader:Us});to(o,900,900,0,Mo,0,i(0)),Ls(o,i(1)),to(o,830,830,0,-13.2,0,new ee({uniforms:{clock:e},vertexShader:pt,fragmentShader:Gs,transparent:!0,depthWrite:!1})),Hs(o,e),Os(o,e,t?90:240)}class qs{obstacles=[];add(e,t,n,i,a,s,r=0){this.obstacles.push({x:e,z:t,halfWidth:n/2,halfDepth:i/2,bottom:a,top:a+s,cosine:Math.cos(r),sine:Math.sin(r)})}solid(e,t,n,i,a){return this.obstacles.some(s=>{if(i>=s.top||a<=s.bottom)return!1;const r=e-s.x,l=t-s.z,h=Math.abs(r*s.cosine-l*s.sine)-s.halfWidth,f=Math.abs(r*s.sine+l*s.cosine)-s.halfDepth,c=Math.max(h,0),d=Math.max(f,0);return c*c+d*d<n*n})}canStand(e,t,n=0){const i=P(e,t);return me(e,t)<.994-n&&i>ie-.18&&!this.solid(e,t,To,i+.06,i+1.52)}clearPath(e,t,n,i){const a=Math.max(1,Math.ceil(Math.hypot(n-e,i-t)/.28));let s=P(e,t);for(let r=1;r<=a;r++){const l=e+(n-e)*r/a,h=t+(i-t)*r/a,f=P(l,h);if(Math.abs(f-s)>.28||!this.canStand(l,h,.022))return!1;s=f}return!0}}function Vs(o,e=!1){const t=o[0].index!==null,n=new Set(Object.keys(o[0].attributes)),i=new Set(Object.keys(o[0].morphAttributes)),a={},s={},r=o[0].morphTargetsRelative,l=new ue;l.morphTargetsRelative=r;let h=0;for(let f=0;f<o.length;++f){const c=o[f];let d=0,p=0;if(t!==(c.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const g in c.attributes){if(!n.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;a[g]===void 0&&(a[g]=[]),a[g].push(c.attributes[g]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of attributes."),null;if(r!==c.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const g in c.morphAttributes){if(!i.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+".  .morphAttributes must be consistent throughout all geometries."),null;if(c.morphAttributes[g].length!==o[0].morphAttributes[g].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+'. All geometries must have the same number of morph targets for the "'+g+'" morph attribute.'),null;s[g]===void 0&&(s[g]=[]),s[g].push(c.morphAttributes[g]),p++}if(p!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". Make sure all geometries have the same number of morph attributes."),null;if(e){let g;if(t)g=c.index.count;else if(c.attributes.position!==void 0)g=c.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+f+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,g,f),h+=g}}if(t){let f=0;const c=[];for(let d=0;d<o.length;++d){const p=o[d].index;for(let g=0;g<p.count;++g)c.push(p.getX(g)+f);f+=o[d].attributes.position.count}l.setIndex(c)}for(const f in a){const c=oo(a[f]);if(!c)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" attribute."),null;l.setAttribute(f,c)}for(const f in s){const c=s[f][0].length;if(c!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[f]=[];for(let d=0;d<c;++d){const p=[];for(let u=0;u<s[f].length;++u)p.push(s[f][u][d]);const g=oo(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+f+" morphAttribute."),null;l.morphAttributes[f].push(g)}}}return l}function oo(o){let e,t,n,i=-1,a=0;for(let h=0;h<o.length;++h){const f=o[h];if(e===void 0&&(e=f.array.constructor),e!==f.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=f.itemSize),t!==f.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=f.normalized),n!==f.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=f.gpuType),i!==f.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;a+=f.count*t}const s=new e(a),r=new is(s,t,n);let l=0;for(let h=0;h<o.length;++h){const f=o[h];if(f.isInterleavedBufferAttribute){const c=l/t;for(let d=0,p=f.count;d<p;d++)for(let g=0;g<t;g++){const u=f.getComponent(d,g);r.setComponent(d+c,g,u)}}else s.set(f.array,l);l+=f.count*t}return i!==void 0&&(r.gpuType=i),r}function vi(o,e){if(e===as)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),o;if(e===Kt||e===rs){let t=o.getIndex();if(t===null){const a=[],s=o.getAttribute("position");if(s!==void 0){for(let r=0;r<s.count;r++)a.push(r);o.setIndex(a),t=o.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),o}const n=t.count-2,i=[];if(e===Kt)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),o.setIndex(i),o.clearGroups(),o}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),o}const _=(o,e=.83,t=0)=>new Re({color:o,roughness:e,metalness:t});function Z(o,e=.75){return new Re({color:o,emissive:o,emissiveIntensity:e,roughness:.52})}function E(o,e,t,n=0,i=0,a=0){const s=new I(e,t);return s.position.set(n,i,a),s.castShadow=!0,s.receiveShadow=!0,s.userData.bake=!0,o.add(s),s}function v(o,e,t,n,i,a,s,r){return E(o,new ls(t,n,i),e,a,s,r)}function y(o,e,t,n,i,a,s,r,l=10){return E(o,new wo(t,n,i,l),e,a,s,r)}function X(o,e,t,n,i=0,a=0,s=0,r=0){const l=new bt;t.forEach(([f,c],d)=>d?l.lineTo(f,c):l.moveTo(f,c)),l.closePath();const h=new Ht(l,{depth:n,bevelEnabled:r>0,bevelSize:r,bevelThickness:r,bevelSegments:1,steps:1});return E(o,h,e,i,a,s-n/2)}const Wt=o=>new W(o.flatMap(e=>[e.r,e.g,e.b]),3);function Xs(o){o.updateMatrixWorld(!0);const e=new Map;o.traverse(t=>{if(!(t instanceof I)||!t.userData.bake||Array.isArray(t.material))return;const n=t.material,i=n.uuid;e.has(i)||e.set(i,{material:n,sources:[],geometries:[]});const a=e.get(i),s=t.geometry.index?t.geometry.toNonIndexed():t.geometry.clone();s.applyMatrix4(t.matrixWorld),a.sources.push(t),a.geometries.push(s)});for(const{material:t,sources:n,geometries:i}of e.values()){const a=Vs(i);for(const r of i)r.dispose();if(!a)continue;for(const r of n)r.geometry.dispose(),r.removeFromParent();const s=new I(a,t);s.castShadow=!0,s.receiveShadow=!0,o.add(s)}}const O=_("#25384b",.64,.22),B=_("#49586c",.56,.24),It=_("#557c88",.54,.15),ae=_("#131c2b",.79),$=_("#b47b57",.54,.26),K=new te({color:"#6aefeb",toneMapped:!1}),Fe=Z(16756065,2.2),qt=new te({color:"#f589bc",toneMapped:!1}),_o="#13cbb7",ce=(o,e)=>[(o-497)/436,(502-e)/436],zo=new bt().moveTo(...ce(487,114)).quadraticCurveTo(...ce(498,105),...ce(510,114)).lineTo(...ce(715,293)).lineTo(...ce(715,724)).lineTo(...ce(510,890)).quadraticCurveTo(...ce(498,900),...ce(486,890)).lineTo(...ce(279,724)).lineTo(...ce(279,293)).closePath(),ye=0,be=0;function js(){const o=document.createElement("canvas");o.width=512,o.height=112;const e=o.getContext("2d");e.fillStyle="#1c2735",e.fillRect(0,0,512,112),e.fillStyle=_o,e.save(),e.translate(48,56),e.scale(43,-43),e.beginPath(),zo.getPoints(6).forEach(({x:n,y:i},a)=>a?e.lineTo(n,i):e.moveTo(n,i)),e.closePath(),e.fill(),e.restore(),e.fillStyle="#ebeeef",e.font="750 48px system-ui, sans-serif",e.textBaseline="middle",e.fillText("ALHUISSI",83,54),e.fillStyle="#f4b674";for(let n=0;n<3;n++)e.fillRect(457+n*13,49,5,14);const t=new Mt(o);return t.colorSpace=st,new te({map:t,toneMapped:!1})}function $s(o){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),n=t.createRadialGradient(64,64,0,64,64,63);n.addColorStop(0,"rgba(255,255,255,.8)"),n.addColorStop(.4,"rgba(255,255,255,.32)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128);const i=new Mt(e),a=(l,h,f,c)=>new I(new xe(h,f),new te({map:i,color:l,opacity:c,transparent:!0,blending:et,depthWrite:!1,toneMapped:!1})),s=a(4708838,3.6,1.8,.55);s.rotation.x=-Math.PI/2,s.position.set(.53,.217,2.83);const r=a(16357197,4.2,1.6,.5);r.rotation.x=-Math.PI/2,r.position.set(-2.04,.205,2.72),o.add(s,r)}function Qs(o,e){const t=new j;t.position.set(ye,5.15,be),t.rotation.set(-.14,.27,-.17),o.add(t),y(o,O,.99,1.3,.37,ye,3.5,be,8),y(o,$,.95,.99,.105,ye,3.72,be,8),y(o,ae,.73,.95,.31,ye,3.89,be,10);for(const s of[-1,1]){const r=[[0,0],[s*.49,.03],[s*.55,.82],[s*.88,1.46],[s*.57,1.59],[s*.09,1.04]];X(o,B,r,.47,ye+s*.85,3.57,be,.045),X(o,$,r,.071,ye+s*.85,3.57,be+.27,.014)}E(t,new he(1.57,.147,8,64),O),E(t,new he(1.64,.051,5,54),B,0,0,-.15),E(t,new he(1.43,.044,6,56),$,0,0,.073);for(let s=0;s<8;s++){const r=s*Math.PI/4;E(t,new he(1.57,.041,5,9,.66),s===5?Fe:K,0,0,.144).rotation.z=r+.065;const l=v(t,B,.255,.28,.33,Math.cos(r)*1.58,Math.sin(r)*1.58,.047);l.rotation.z=r;const h=v(t,$,.155,.072,.04,l.position.x,l.position.y,.23);h.rotation.z=r}const n=new j;n.rotation.set(.69,-.69,.36),t.add(n),E(n,new he(1.2,.069,6,48),B);for(const s of[.18,Math.PI+.18])E(n,new he(1.2,.033,5,20,2.2),qt,0,0,.053).rotation.z=s;for(const s of n.children)s.userData.bake=!1,s.castShadow=!1;const i=new Ht(zo,{depth:.12,bevelEnabled:!1,curveSegments:8});i.translate(0,0,-.06);const a=new I(i,new te({color:_o,toneMapped:!1,fog:!1}));return a.position.set(ye,5.15,be),o.add(a),()=>{n.rotation.x=.69+.26*Math.sin(e.value*.73),n.rotation.y=-.69+.53*Math.sin(e.value*.51),n.rotation.z=.36-e.value*.22,a.rotation.y=.21*Math.sin(e.value*.55)}}function Ys(o){const e=new te({color:"#ffca92",toneMapped:!1}),t=Z(10510658,.9);v(o,t,3.41,1.79,.095,-2.16,1.66,1.16),v(o,ae,3.4,.13,.94,-2.16,2.62,1.7),v(o,$,3.4,.13,.9,-2.16,.84,1.67),v(o,O,2.91,.144,.62,-2.14,1.24,1.63),v(o,Fe,2.89,.051,.045,-2.14,1.17,1.94);for(const i of[-3.27,-2.47,-1.5]){v(o,ae,.59,.44,.13,i,1.68,1.32),v(o,i===-2.47?K:e,.51,.35,.027,i,1.69,1.397),v(o,O,.066,.19,.1,i,1.4,1.42);for(let a=0;a<8;a++){const s=.035+.11*Math.abs(Math.sin(a*.82+i));v(o,ae,.017,s,.009,i-.177+a*.05,1.7,1.417)}}v(o,ae,.9,.143,.31,-2.72,1.366,1.79);for(let i=0;i<12;i++)v(o,i%3===2?B:e,.054,.022,.15,-3.073+i*.065,1.45,1.826);for(const[i,a]of[-1.87,-1.73,-1.59,-1.45,-1.31].entries())y(o,O,.036,.042,.048,a,1.38,1.74,8),v(o,i%2===0?K:Fe,.048,.019,.031,a,1.36,1.83);const n=new I(new xe(3.47,1.78),new te({color:"#7dc6d4",transparent:!0,opacity:.13,depthWrite:!1,side:ot}));n.position.set(-2.16,1.68,2.24),o.add(n);for(const i of[-3.91,-2.63,-1.55,-.5])v(o,B,.1,1.81,.18,i,1.67,2.23);for(const i of[.82,2.58])v(o,O,3.58,.15,.27,-2.16,i,2.22);X(o,B,[[-3.99,2.44],[-.46,2.44],[-.68,2.72],[-3.59,2.83]],.58,0,0,2.19,.034),v(o,$,2.88,.049,.058,-2.08,2.59,2.52).rotation.z=-.029}function Ks(o){const e=[[-1.1,.48],[.91,.48],[1.19,.75],[1.19,2.1],[.86,2.46],[-.84,2.46],[-1.1,2.18]];X(o,B,e,.45,2.77,0,2.24,.055),X(o,ae,e,.06,2.77,.14,2.494).scale.set(.91,.91,1),v(o,It,1.97,.19,.35,2.78,.71,2.57),v(o,O,1.94,.31,.35,2.76,2.21,2.57);for(const[t,n]of[2.1,2.7,3.3].entries()){y(o,t===1?qt:K,.091,.091,1.32,n,1.45,2.64,12);for(const i of[.78,1.11,1.82,2.09])y(o,i===1.11||i===1.82?$:B,.15,.15,.096,n,i,2.64,10);v(o,t===1?Fe:K,.065,.036,.021,n,2.22,2.758)}v(o,$,.081,1.08,.16,3.68,1.49,2.56);for(let t=0;t<5;t++)v(o,B,.13,.041,.16,3.64,.96+t*.21,2.62)}function Zs(o){const t=new j;t.position.set(1.85,3.31,-.7),o.add(t);const n=Z(16758903,1.6),i=8.1-3.31,a=.42,s=i-a,r=a+s/2;y(t,O,1.18,1.3,.24,0,.12,0,8),y(t,B,.98,1.08,.2,0,.33,0,8),y(t,K,1.1,1.1,.025,0,.245,0,24),y(t,O,.66,.84,s,0,r,0,8);const l=d=>.84-(d-a)/s*.18;for(const d of[1.05,2.15,3.25,4.25]){const p=l(d);y(t,n,p+.012,p+.016,.32,0,d,0,8),y(t,$,p+.05,p+.05,.05,0,d+.19,0,8),y(t,$,p+.05,p+.05,.05,0,d-.19,0,8)}const h=Math.atan(.18/s);for(let d=0;d<8;d++){const p=(d+.5)*Math.PI/4,g=l(r)-.02,u=v(t,B,.08,s-.1,.11,Math.sin(p)*g,r,Math.cos(p)*g);u.rotation.y=p,u.rotation.x=-h*Math.cos(p),u.rotation.z=h*Math.sin(p)}for(const d of[-.39,.39]){const p=l(r)-.03,g=v(t,K,.03,s-.4,.03,Math.sin(d)*p,r,Math.cos(d)*p);g.rotation.y=d,g.rotation.x=-h*Math.cos(d),g.rotation.z=h*Math.sin(d)}y(t,B,1.45,.68,.5,0,i+.25,0,8),y(t,$,1.5,1.5,.1,0,i+.55,0,16),y(t,K,1.52,1.52,.03,0,i+.47,0,24);const f=E(t,new he(1.46,.03,5,40),$,0,i+.95,0);f.rotation.x=Math.PI/2;for(let d=0;d<16;d++){const p=d*Math.PI/8;y(t,B,.02,.02,.38,Math.sin(p)*1.46,i+.77,Math.cos(p)*1.46,5)}const c=new j;return c.position.set(0,i+.6-3.31,0),t.add(c),c}function Js(o){const e=new te({color:"#7ff6f0",toneMapped:!1}),t=new te({color:"#ffc58a",toneMapped:!1}),n=new te({color:"#b48cff",toneMapped:!1}),i=Z(6543078,.9);for(const r of[-1,1]){v(o,ae,.06,.82,1.5,r*4.02,1.5,1.45),v(o,t,.03,.66,1.32,r*4.055,1.5,1.45);for(const l of[-.33,.33])v(o,B,.05,.7,.05,r*4.07,1.5,1.45+l);v(o,B,.05,.05,1.36,r*4.07,1.5,1.45)}v(o,n,8.05,.035,.04,.035,3.09,2.79),v(o,e,4.3,.03,.04,-1.31,3.67,2.79);for(const r of[-1,1])v(o,n,.04,.035,5.2,r*4.13,3.09,-.05);for(let r=0;r<3;r++)v(o,O,.82,.08,.62,-1.25+r*.02,3.69,1.55-r*.78),v(o,i,.7,.04,.5,-1.25+r*.02,3.74,1.55-r*.78);const a=new j;a.position.set(-.35,3.74,-1.75),o.add(a),y(a,B,.05,.08,.55,0,.27,0,8),E(a,new tt(.42,14,6,0,Math.PI*2,0,Math.PI/2.6),$,0,.72,0).rotation.set(Math.PI+.7,0,.35),y(a,e,.03,.03,.07,-.14,.95,.2,6),v(o,e,7.7,.025,.03,.09,.14,2.53);for(const r of[-1,1])v(o,e,.03,.025,4.9,r*3.98,.14,.02)}function en(o,e,t){const[n,i]=pe.workshop.landmark,a=P(n,i),s=new j;s.position.set(n,a,i),s.rotation.y=-.095,o.add(s),v(s,ae,8.05,.46,5.26,.09,-.12,-.12),X(s,B,[[-3.94,0],[3.94,0],[3.94,.13],[3.74,.23],[-3.74,.23],[-3.94,.13]],5.2,.09,-.035,.1,.035),v(s,O,7.81,3,.41,.025,1.54,-2.43),v(s,O,.41,2.81,4.72,-3.81,1.51,-.17),v(s,O,.41,2.81,4.72,3.81,1.51,-.17),v(s,ae,7.58,2.9,.28,.03,1.51,.9),v(s,O,7.72,.65,.31,.02,.51,2.15);const r=[[-4.05,2.76],[4.12,2.76],[4.12,3.07],[3.77,3.31],[1.27,3.31],[.87,3.65],[-3.49,3.65],[-4.05,3.18]];X(s,O,r,5.4,0,0,-.05,.05),X(s,It,r,.21,0,.015,2.61,.037),X(s,B,[[-1.16,2.79],[1.21,2.79],[1.04,3.05],[-.92,3.05]],1.11,.54,0,2.49,.025),v(s,$,4.63,.078,.1,-1.45,3.49,2.735),v(s,K,3.45,.058,.08,-2.02,2.89,2.762),v(s,K,1.77,.058,.08,2.81,2.89,2.762);for(const u of[-3.92,1.42,3.91])X(s,B,[[-.18,.12],[.18,.12],[.14,2.53],[-.05,2.81],[-.18,2.66]],.25,u,0,2.21,.023);Ys(s);const l=[[-.9,0],[.9,0],[.9,1.84],[.58,2.18],[-.66,2.18],[-.9,1.94]];X(s,B,l,.23,.53,.18,2.2,.042),X(s,K,l,.033,.53,.224,2.33).scale.set(.916,.94,1),X(s,ae,l,.035,.53,.247,2.36).scale.set(.851,.91,1);for(const u of[-1,1])v(s,O,.64,1.57,.035,.53+u*.362,1.13,2.39),v(s,B,.04,.66,.046,.53+u*.124,1.01,2.399);v(s,K,.99,.07,.05,.53,1.58,2.424),v(s,Fe,.14,.088,.056,1.68,1.2,2.33),v(s,B,2.55,.13,.79,.53,.147,2.77);for(const u of[-1,1])v(s,K,.12,.024,.54,.53+u*1.02,.221,2.86);Ks(s),v(s,O,1.96,.447,.12,.54,2.61,2.64);const h=new I(new xe(1.86,.407),js());h.position.set(.54,2.61,2.706),s.add(h);for(const u of[-1,1]){for(let m=0;m<5;m++)v(s,B,.16,1.27,.28,u*4.03,1.78,-.89+m*.43);v(s,$,.11,.105,3.38,u*4.07,2.52,.04),v(s,K,.11,.065,2.2,u*4.08,2.78,.34),v(s,ae,1.48,1.1,.11,2.22*u,1.61,-2.677),v(s,Fe,1.29,.075,.042,2.22*u,2.07,-2.746)}for(let u=0;u<4;u++)v(s,B,3.23,.12,.16,-1.1,3.72,-2.06+u*.42);for(const[u,m]of[[-.2,1.2],[.22,.8]])y(s,B,.03,.06,m,-2.97+u,3.7+m/2,-1.29,8),y(s,u>0?K:qt,.04,.05,.09,-2.97+u,3.7+m,-1.29,8);const f=Zs(s);Js(s),$s(s);const c=s.localToWorld(new T(2.37,0,4.04)),d=P(c.x,c.z);v(o,It,1.29,.11,.41,c.x,d+.46,c.z).rotation.y=s.rotation.y;for(const u of[-.45,.45])v(o,O,.13,.46,.35,c.x+u,d+.22,c.z);v(o,$,1.04,.045,.037,c.x,d+.45,c.z+.21),e.add(c.x,c.z,1.26,.4,d-.07,.61,s.rotation.y);const p=s.localToWorld(new T(0,-.4,-.15));e.add(p.x,p.z,8.07,4.94,p.y,4.1,s.rotation.y);const g=s.localToWorld(new T(2.77,.41,2.44));return e.add(g.x,g.z,2.3,.62,g.y,2.09,s.rotation.y),Qs(f,t)}const Me=_("#374b54"),Ee=_("#4c3435"),mt=_("#775342"),Qe=_("#c6a580"),Vt=_("#edd0a9"),Ye=_("#3f444b",.59,.3),Te=_("#b27656",.49,.24),ne=_("#d9aa67",.5,.15),Ao=Z(15309381,1.35),Ft=Z(16761976,2.2);function St(o,e,t){const[n,i]=pe[e].landmark,a=new j;return a.position.set(n,P(n,i),i),a.rotation.y=t,o.add(a),a}function tn(o,e,t,n,i,a=i){const s=n.clone().sub(t),r=t.clone().lerp(n,.5);v(o,e,i,s.length(),a,r.x,r.y,r.z).quaternion.setFromUnitVectors(new T(0,1,0),s.normalize())}function ko(o,e){const t=e-o;return new bt().moveTo(-o,0).lineTo(o,0).lineTo(o,t).quadraticCurveTo(o,e,0,e).quadraticCurveTo(-o,e,-o,t).lineTo(-o,0)}function Dt(o,e,t,n,i,a,s){return E(o,new xo(ko(a,s),12),e,t,n,i)}function on(o,e,t,n,i,a){Dt(o,Ee,e,t-.05,n,i*.57,a+.11),Dt(o,Ao,e,t,n+.018,i*.43,a),v(o,mt,i*1.26,.108,.24,e,t-.045,n+.056),v(o,Ee,.06,a*.87,.044,e,t+a*.43,n+.047),v(o,Ee,i*.93,.05,.044,e,t+a*.48,n+.047)}function sn(o,e,t,n){const a=St(o,"dream-ocean",.29),[s,r,l]=a.position,h=[_("#606f81"),_("#7a8499"),_("#8b9ba6"),_("#707787")],f=_("#3b586a"),c=_("#a1b4c3"),d=Z(10017008,.45),p=y(a,f,2.97,3.3,.33,0,-.06,.03,12);p.scale.z=.59;const g=y(a,h[1],2.53,2.86,.2,0,.2,.16,14);g.scale.z=.55;const u=v(a,c,3.15,.16,1.25,0,.14,1.13);u.rotation.y=-.03;const m=1.61,w=2.61,b=new bt().moveTo(-m,.25).lineTo(m,.25).lineTo(m,w).quadraticCurveTo(m,w+1.2,0,w+2.2).quadraticCurveTo(-m,w+1.2,-m,w).closePath(),z=new I(new xo(b,36),Ns(e,n));z.position.z=.17,a.add(z);for(const S of[-1,1])for(let M=0;M<4;M++){const C=.84-.044*M,R=v(a,h[(M+1)%h.length],C,.58,.94-M*.057,S*(m+C/2-.04),.49+M*.61,.03);R.rotation.z=(M%2-.5)*.035,v(a,c,.036,.45,.05,S*1.72,.51+M*.61,.55-M*.025)}const A=(S,M)=>{const C=Math.sign(1-S*2),R=1-Math.abs(1-S*2);return[C*((1-R*R)*(m+M)),w+(2.4*R-.2*R*R)*(1+M*.44)]};for(let S=0;S<15;S++){const M=(S+.031)/15,C=(S+.969)/15,R=S===7,D=[A(M,-.075),A(C,-.075),A(C,R?.73:.61),A(M,R?.73:.61)];if(X(a,h[S%h.length],D,R?.91:.7,0,0,0,.035),S%2===0){const[Q,J]=A((M+C)/2,.18),G=v(a,d,.044,.18,.02,Q,J,R?.491:.394);G.rotation.z=(S-7)*-.11}}for(const[S,M,C,R]of[[-3.62,-.68,1,-.24],[3.18,-.63,.84,.29],[-4.2,1.23,.61,-.3],[3.72,1,.45,.32],[1.56,-2.95,.57,-.21]]){const D=E(a,new dt(1,0),h[Math.round(C*3)],S,1.22*C,M);D.scale.set(.66*C,2.33*C,.61*C),D.rotation.z=R,D.rotation.y=M,E(a,new dt(.21,0),d,S,.7*C,M+.42*C).scale.set(.34,1.9,.49)}for(const S of[-2.85,2.82])y(a,f,.24,.32,.62,S,.32,1.6,7),E(a,new dt(.21,0),d,S,.76,1.6).scale.y=1.35;t.add(s,l,5.4,1.75,r-.5,5.65,.29)}function nn(o,e,t){const n=St(o,"pocket-orbit",.15),[i,a,s]=n.position,r=_("#8c857d"),l=_("#646b6b"),h=_("#c78d50");y(n,Qe,3.38,3.68,.52,0,-.3,0,12),y(n,Me,3.31,3.51,.25,0,-.01,0,12),y(n,r,3.19,3.33,.13,0,.162,0,12),y(n,l,2.85,2.85,.03,0,.237,0,30);const f=E(n,new he(2.42,.035,4,64),Vt,0,.26,0);f.rotation.x=-Math.PI/2;for(let c=0;c<12;c++){const d=c*Math.PI/6,p=Math.cos(d)*3.07,g=Math.sin(d)*3.07,u=v(n,c%3===0?Ft:h,.25,.074,.14,p,.247,g);u.rotation.y=-d}v(n,Qe,1.69,.22,.73,-.08,.04,3.45);for(const c of[-2.56,2.56])y(n,Ye,.095,.14,1.42,c,.68,-2.12),y(n,Ft,.15,.15,.2,c,1.43,-2.12,11),y(n,ne,.16,.18,.07,c,1.57,-2.12);for(const c of[-1.9,-.91,1.93])v(n,Ye,.56,.41,.73,-3.54,.04,c),v(n,Te,.58,.1,.75,-3.54,.28,c),v(n,Me,.26,.162,.022,-3.54,.1,c+.37);Ms(async()=>{const{addPocketOrbitShuttle:c}=await import("./pocketOrbitShuttle-BPYiXE6J.js");return{addPocketOrbitShuttle:c}},__vite__mapDeps([0,1,2]),import.meta.url).then(({addPocketOrbitShuttle:c})=>c(n,t)),e.add(i,s,5.3,5.25,a-.42,3.4,.15)}function so(o,e,t,n,i,a){const s=l=>i*(1-Math.abs(l/t))**1.55+Math.abs(l/t)**11*.24,r=[];for(let l=0;l<=20;l++){const h=-t+l*t/10;r.push([h,s(h)])}for(let l=20;l>=0;l--){const h=-t+l*t/10;r.push([h,s(h)-.17])}X(o,a,r,n,0,e,0,.015);for(let l=0;l<=22;l++){const h=-t+l*t/11,f=y(o,l%3===0?Te:a,.06,.06,n+.05,h,e+s(h)+.02,0,7);f.rotation.x=Math.PI/2}for(const l of[-n/2-.012,n/2+.012])for(let h=0;h<14;h++){const f=-t+h*t/7,c=f+t/7;tn(o,ne,new T(f,e+s(f)-.043,l),new T(c,e+s(c)-.043,l),.075)}}function no(o,e,t){const n=new j;n.position.set(e,.2,.55),o.add(n);const i=[[-.61,0],[.63,0],[.63,.92],[.34,1.26],[.39,1.98],[.12,2.19],[-.61,2.19]];X(n,t,i,.94,0,0,0,.042).rotation.y=-Math.PI/2,v(n,Me,.89,.83,.078,0,1.59,.348).rotation.x=-.09,v(n,Z(9753296,.36),.73,.57,.025,0,1.61,.402).rotation.x=-.09;const a=new j;a.position.set(0,1.61,.436),n.add(a);for(let s=0;s<4;s++)v(a,t,.116,.106,.012,(s%2-.5)*.18,(Math.floor(s/2)-.5)*.15,0);v(n,Te,.99,.14,.46,0,1.06,.45),y(n,Ye,.039,.041,.14,-.28,1.19,.49,10),E(n,new tt(.071,10,7),Ao,-.28,1.28,.49);for(const s of[.08,.23])y(n,ne,.06,.052,.048,s,1.16,.5,10);v(n,Vt,.69,.16,.036,0,2.01,.388)}function an(o,e){const n=St(o,"hanzizap",-.17),[i,a,s]=n.position,r=_("#a75f4a"),l=_("#426564"),h=_("#d9a34f");v(n,Qe,5.57,.37,3.9,0,-.07,.17),v(n,mt,5.44,.12,3.8,0,.145,.17),v(n,r,4.8,2.57,.24,0,1.36,-1.39);for(const c of[-2.23,2.23]){for(const d of[-1.31,1.39])y(n,r,.115,.15,2.95,c,1.53,d),y(n,Ye,.19,.21,.21,c,.22,d),y(n,ne,.155,.156,.15,c,2.67,d);v(n,l,.119,1.43,2.81,c,.85,0);for(let d=0;d<6;d++)v(n,h,.037,.94,.089,c+Math.sign(c)*.074,.91,-1.13+d*.448)}for(const c of[-1.42,1.42])v(n,mt,5.11,.24,.23,0,2.88,c);so(n,3.08,2.99,3.89,.99,l),v(n,l,2.82,.57,1.98,0,3.96,0),v(n,mt,2.96,.105,2.04,0,4.21,0);for(let c=0;c<9;c++)v(n,ne,.045,.3,.034,(c-4)*.265,3.99,1.005);so(n,3.97,1.88,2.64,.61,l),v(n,ne,.19,.17,2.7,0,4.64,0),v(n,Ee,2.77,.28,.13,0,2.66,1.49),v(n,ne,2.46,.055,.05,0,2.66,1.58);for(const c of[-1.95,1.95]){const d=E(n,new tt(.222,12,9),Ft,c,2.49,1.72);d.scale.y=1.19,y(n,Te,.18,.16,.08,c,2.76,1.72),y(n,Te,.15,.18,.08,c,2.22,1.72),v(n,r,.031,.15,.031,c,2.12,1.72)}no(n,-.93,h),no(n,.76,r);const f=v(n,r,3.5,.037,.61,0,.071,2.01);f.rotation.y=.022;for(const c of[-1.58,1.58])v(n,ne,.042,.04,.52,c,.085,2.01);e.add(i,s,5.13,3.63,a-.42,4.8,-.17)}function rn(o,e){const n=St(o,"observatory",.34),[i,a,s]=n.position,r=[_("#64928d",.48,.25),_("#588682",.45,.26),_("#7a9e92",.45,.25)],l=_("#c2b3a2");y(n,Ye,2.1,2.37,.35,0,.04,0,12),y(n,l,1.84,1.95,2.78,0,1.45,0,15),y(n,Vt,1.98,1.91,.21,0,2.81,0,15),y(n,Me,2.02,1.997,.29,0,3.058,0,16);for(let d=0;d<12;d++){const p=new tt(1.98,6,11,d*Math.PI/6,Math.PI/6,0,Math.PI/2),g=E(n,p,r[d%3],0,3.18,0);g.scale.y=.83;const u=E(n,new he(1.975,.028,5,22,Math.PI/2),Te,0,3.19,0);u.rotation.y=d*Math.PI/6,u.scale.y=.83}const h=E(n,new he(2.11,.062,6,40),ne,0,3.04,0);h.rotation.x=Math.PI/2;const f=new Ht(ko(.59,1.75),{depth:.26,bevelEnabled:!0,bevelSize:.035,bevelThickness:.034,bevelSegments:1,curveSegments:12});E(n,f,Ee,0,.16,1.76),Dt(n,Me,0,.204,2.055,.47,1.58);for(const d of[-.24,0,.24])v(n,Ee,.025,1.17,.032,d,.81,2.063);v(n,ne,.08,.11,.056,.27,.75,2.082);for(const d of[-1,1]){const p=new j;p.rotation.y=d*.78,n.add(p),on(p,0,1.27,1.86,.47,1.04)}const c=new j;c.position.set(.56,4.32,.23),c.rotation.z=-.85,c.rotation.x=.26,n.add(c),y(c,Me,.48,.39,2.23,0,.82,0,18),y(c,Te,.58,.52,.24,0,2.04,0,18),y(c,_("#a4c8c8",.23,.41),.442,.452,.041,0,2.17,0,18),y(c,ne,.47,.49,.12,0,1.58,0,18),y(c,ne,.44,.44,.1,0,.19,0,16),y(c,Me,.17,.15,.56,0,-.51,0,12),v(n,Qe,1.2,.26,.76,0,.1,2.07).rotation.x=-.13,v(n,Qe,1.32,.19,.65,0,-.07,2.56).rotation.x=-.2,e.add(i,s,3.57,3.63,a-.61,5.3,.34)}function ln(o,e,t,n){const i=en(o,e,t);return sn(o,t,e,n),nn(o,e,n),an(o,e),rn(o,e),i}let lt=null;function Ro(){if(lt)return lt;const o=document.createElement("canvas");o.width=o.height=128;const e=o.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,63);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,255,255,.42)"),t.addColorStop(.6,"rgba(255,255,255,.1)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),lt=new Mt(o),lt}function ct(o,e,t,n,i,a){const s=new I(new xe(i,i),new te({map:Ro(),color:e,opacity:a,transparent:!0,blending:et,depthWrite:!1,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-4}));s.rotation.x=-Math.PI/2,s.position.set(t,P(t,n)+.09,n),s.renderOrder=2,o.add(s)}function cn(o,e,t,n,i,a,s){const r=new Nt(new yo({map:Ro(),color:e,opacity:s,transparent:!0,blending:et,depthWrite:!1,toneMapped:!1}));r.position.set(t,n,i),r.scale.setScalar(a),o.add(r)}function fn(o,e){const t=_("#3c3a44",.6,.35),n=Z(16762482,2.4),i=[[2.9,17.6],[.25,14.7],[2.45,10.7],[-1.4,8.35],[-4.88,5.6],[-8.52,3.55],[-12.32,2.31],[6.28,5.4],[9.2,2.73],[11.55,-.85],[7.3,11.5],[10.1,14.65],[-7.98,-.65],[-8.35,-5.9],[-6.55,-9.09]],a=re(71893);for(const[r,l]of i){const h=P(r,l),f=.64+a()*.22;y(o,t,.055,.08,f,r,h+f*.5,l,7),y(o,t,.12,.1,.13,r,h+.06,l,7),y(o,n,.081,.11,.19,r,h+f,l,8),y(o,t,.041,.15,.107,r,h+f+.102,l,8);const c=v(o,t,.19,.041,.19,r,h+f-.088,l);c.rotation.y=Math.PI/4,cn(o,16757340,r,h+f,l,1.05,.55),ct(o,16752714,r,l,3.4,.34)}const s=[[.4,1.7,3.6,4645103,14,11],[-2.3,1.8,3.1,16751186,10,9],[-15.2,2.4,-1.4,8370431,16,12],[13.2,2.6,11.8,16757854,14,10],[-3.6,2,-11.4,16761466,7,8],[12.4,2.2,-4.2,9427199,10,10]];for(const[r,l,h,f,c,d]of e?s:s.slice(0,3)){const p=new cs(f,c,d,1.6);p.position.set(r,P(r,h)+l,h),o.add(p)}ct(o,8370431,-15.2,-.6,7.5,.26),ct(o,16757854,13.2,12.6,6.5,.22),ct(o,4645103,.5,4.6,5.5,.18)}const hn=[{id:"dream-ocean",logo:"dream-ocean-logo.webp",aspect:680/277,x:-11.86,z:-.78,yaw:.3,width:3.46,height:1.63,lift:.65,frame:"#677d8e",panel:"#cadde5",lamp:10212583},{id:"pocket-orbit",logo:"pocket-orbit-logo.webp",aspect:680/375,x:9.14,z:-3.09,yaw:-.19,width:3.16,height:1.85,lift:.57,frame:"#a69c8b",panel:"#272a42",lamp:15969383},{id:"hanzizap",logo:"hanzizap-logo.svg",aspect:290/69,x:10.02,z:12.03,yaw:.13,width:3.44,height:1.01,lift:.79,frame:"#b4814c",panel:"#4c3435",lamp:16761976}];function dn(o,e,t){const n=new Lt;return hn.map(({id:i,logo:a,aspect:s,x:r,z:l,yaw:h,width:f,height:c,lift:d,frame:p,panel:g,lamp:u})=>{const m=new j,w=P(r,l);m.position.set(r,w,l),m.rotation.y=h,o.add(m);const x=_(p,.65,.16),b=_(g,.81),z=Z(u,.52),A=d+c*.5,S=f*.5,M=c*.5,C=.15;X(m,x,[[-S+C,-M],[S-C,-M],[S,-M+C],[S,M-C],[S-C,M],[-S+C,M],[-S,M-C],[-S,-M+C]],.24,0,A,0,.027),v(m,b,f-.22,c-.2,.31,0,A,0);for(const G of[-1,1])v(m,x,.2,d+.31,.25,G*f*.34,d*.4,0),v(m,b,.39,.15,.49,G*f*.34,.035,0),v(m,z,.4,.035,.055,G*(S-.39),d+.071,.164),v(m,z,.4,.035,.055,G*(S-.39),d+.071,-.164);const R=Math.min(f-.5,(c-.34)*s),D=new xe(R,R/s),Q=n.load(`./island-media/${a}`,t);Q.colorSpace=st,Q.anisotropy=4;const J=new te({map:Q,transparent:!0,depthWrite:!1,toneMapped:!1});for(const G of[-1,1]){const q=new I(D,J);q.position.set(0,A,G*.166),q.rotation.y=G<0?Math.PI:0,m.add(q)}return e.add(r,l,f,.38,w-.2,c+d+.28,h),{id:i,box:new bo().setFromObject(m)}})}const Eo=Math.PI*2,un=new U("#2e7255"),pn=new U("#7d9e58"),mn=new U("#41747a"),gn=new U("#8d8052"),vn=new U("#74654f");function Ke(o,e,t){const n=P(o,e),i=.41+Math.sin(o*1.37+e*.64)*.07+Math.cos(o*.43-e*.77)*.15;return t.copy(un).lerp(pn,i+Math.max(0,n)*.062),t.lerp(mn,Math.exp(-((o+15)**2+(e+1)**2)/54)*.59),t.lerp(gn,Math.exp(-((o-13)**2+(e+4)**2)/39)*.77),t.lerp(vn,Math.max(0,(me(o,e)-.83)*3.4)+Math.max(0,-.5-n)*.21),t}function At(o,e,t){o.onBeforeCompile=n=>{n.vertexShader=`varying vec3 terrainPoint;
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
      diffuseColor.rgb *= 1.0 + grit * ${e.toFixed(2)} + coarse * .18;`)},o.customProgramCacheKey=()=>`ground-${e}-${t}`}function wn(){const t=[0,P(0,0),0],n=[Ke(0,0,new U)],i=[];for(let s=1;s<=37;s++)for(let r=0;r<144;r++){const l=Se((r+s%2*.5*(s<37?1:0))/144*Eo,s/37),[h,f]=l;t.push(h,P(h,f),f),n.push(Ke(h,f,new U));const c=1+(s-1)*144+r,d=1+(s-1)*144+(r+1)%144;s===1?i.push(0,d,c):i.push(c-144,d,c,c-144,d-144,d)}const a=new ue;return a.setAttribute("position",new W(t,3)),a.setAttribute("color",Wt(n)),a.setIndex(i),a.computeVertexNormals(),a}function io(o,e,t,n,i){const a=[1,1,.96,.985,.83,.765,.63,.34,.035,0],s=[0,-.65,-2.1,-3.05,-4.65,-6.6,-8.65,-11.9,-13.3,-13.82],r=["#746e56","#695451","#635569","#937364","#594e66","#484656","#63536b","#45415a","#4b4357","#3c384e"].map(p=>new U(p)),l=[],h=[],f=[];for(let p=0;p<s.length;p++)for(let g=0;g<o;g++){const u=g/o*Eo,m=Math.sin(u*5+p*.59)*.67+Math.cos(u*13-.9)*.22,w=Math.sin(u*39+.4)*.2+Math.cos(u*49)*.12,x=p>0&&p<9?(m+w)*(.031+p*.003):0,[b,z]=Se(u,a[p]+x),[A,S]=Se(u),M=p>0?Math.sin(u*4+.6)*.55+m*.44:0;if(l.push(t+(b-p*p*.025)*e,n+(s[p]+P(A,S)/(1+p*.18)+M)*e,i+(z+p*p*.022)*e),h.push(r[p].clone().multiplyScalar(.87+m*.1+w*.44)),p>0){const C=p*o+g,R=p*o+(g+1)%o;f.push(C-o,R,C,C-o,R-o,R)}}const c=new ue;c.setAttribute("position",new W(l,3)),c.setAttribute("color",Wt(h)),c.setIndex(f);const d=c.toNonIndexed();return c.dispose(),d.computeVertexNormals(),d}function xn(o){const e=[];for(let t=0;t<o.length-1;t++){const[n,i]=o[Math.max(0,t-1)],[a,s]=o[t],[r,l]=o[t+1],[h,f]=o[Math.min(o.length-1,t+2)],c=Math.ceil(Math.hypot(r-a,l-s)*4);for(let d=0;d<c;d++){const p=d/c,g=(u,m,w,x)=>.5*(2*m+(-u+w)*p+(2*u-5*m+4*w-x)*p*p+(-u+3*m-3*w+x)*p*p*p);e.push(new N(g(n,a,r,h),g(i,s,l,f)))}}return e.push(new N(...o[o.length-1])),e}const Bo=Ss.map(xn),yn=new U("#b89f71"),bn=new U("#c7af84");function Mn(){const o=[],e=[],t=[],n=[-1,-.79,-.32,.19,.8,1],i=re(19309);for(const[s,r]of Bo.entries()){const l=o.length/3,h=s===0?.94:.66;for(const[f,c]of r.entries()){const d=r[Math.max(0,f-1)],p=r[Math.min(r.length-1,f+1)],g=new N(p.y-d.y,d.x-p.x).normalize(),u=h*(.9+.11*Math.sin(f*.32)+.13*i()),m=Math.min(1,(f+2)/5,(r.length-f)/7);for(const[w,x]of n.entries()){const b=c.x+g.x*x*u,z=c.y+g.y*x*u;o.push(b,P(b,z)+.041+.003*s,z);const A=Math.abs(x)>.99?.02:Math.min(1,(1-Math.abs(x))*1.95);e.push(Ke(b,z,new U).lerp(w%2===0?yn:bn,A*m).multiplyScalar(.9+i()*.2))}if(f!==0)for(let w=1;w<n.length;w++){const x=l+f*n.length+w,b=x-n.length;t.push(b-1,x-1,x,b-1,x,b)}}}const a=new ue;return a.setAttribute("position",new W(o,3)),a.setAttribute("color",Wt(e)),a.setIndex(t),a.computeVertexNormals(),a}function Sn(o){const e=new Re({vertexColors:!0,roughness:1});At(e,.23,6.2);const t=new I(wn(),e);t.receiveShadow=!0,t.castShadow=!0,o.add(t);const n=new Re({vertexColors:!0,roughness:.96});At(n,.31,3.6);const i=new I(io(144,1,0,0,0),n);i.receiveShadow=!0,i.castShadow=!0,o.add(i);const a=new Re({vertexColors:!0,roughness:.92});At(a,.39,15.6);const s=new I(Mn(),a);s.receiveShadow=!0,o.add(s);for(const[r,l,h,f]of[[-72,-3,-90,.38],[-46,-6,-84,.22],[49,-4,-93,.32],[75,-1.5,-138,.44],[89,-7,-67,.17],[-89,-5.2,-65,.29]]){o.add(new I(io(48,f,r,l,h),n));const c=new I(t.geometry,e);c.position.set(r,l,h),c.scale.setScalar(f),o.add(c)}}const kt=8,Rt=8,Tn=64,ao=2.23,Cn=Math.SQRT2-1,Pn=4,ro=1.8,_n=2.0625;function zn(o,e,t,n){const i=t.matrixWorld.elements,a=o*i[0]+e*i[2],s=-o*i[2]+e*i[0],r=Math.abs(a),l=Math.abs(s),h=Cn*(n%2===1?.72:1);return Math.min(r,l)>=Math.max(r,l)*h?s<0?a<0?3:5:a<0?1:7:r>l?a<0?2:6:s<0?4:0}function lo(o,e,t,n){let i=!1;const a=o.load(new URL(`./island-media/andi/${e}.webp`,document.baseURI).href,()=>{i=!0,n()});a.colorSpace=st,a.magFilter=vt,a.minFilter=vt,a.generateMipmaps=!1,a.repeat.set(1/t,1/kt);const s=new Nt(new yo({map:a,transparent:!1,alphaTest:.5,toneMapped:!1}));return s.name=`Andi ${e}`,s.scale.set(ao,ao,1),s.center.set(.5,1/Tn),s.position.y=.044,s.visible=!1,{sprite:s,get loaded(){return i},pose(r,l){a.offset.set(l/t,(kt-1-r)/kt)}}}function An(o,e){const t=new j;t.name="Andi";const n=new Lt,i=lo(n,"walk",Rt+1,e),a=lo(n,"sprint",Rt,e);t.add(i.sprite,a.sprite);const s=new I(new xe(1.62,1.38),new ee({uniforms:{tint:{value:new U("#201c28")}},transparent:!0,depthWrite:!1,toneMapped:!1,vertexShader:`
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
    `}));s.position.y=.049,t.add(s);const r=new T(0,0,1),l=new T,h=Pn/o;let f=4,c="idle",d=0,p=!1;return{root:t,get ready(){return i.loaded},update(g,u,m,w,x,b,z){const A=g.x-t.position.x,S=g.z-t.position.z;t.position.copy(g);const M=p&&!z&&!b?Math.hypot(A,S):0,C=M/m;p=!0;const R=C>.015;f=zn(R?A:Math.sin(u),R?S:Math.cos(u),w,f);const D=o*(c==="sprint"?1.035:1.075);if(c=R?x||C<D?"walk":"sprint":"idle",c==="idle")d=0;else{const Ue=C*h/(2*ro),Ge=ke.clamp(Math.sqrt(Ue),.7,2.2),it=_n*ro*Ge;d=(d+M*h/it)%1}const Q=c==="sprint"&&a.loaded,J=Math.floor(d*Rt);i.sprite.visible=i.loaded&&!Q,a.sprite.visible=Q,Q?a.pose(f,J):i.pose(f,c==="idle"?0:J+1),s.visible=i.loaded&&!b;const{x:G,z:q}=g;l.set(P(G-.29,q)-P(G+.29,q),.58,P(G,q-.29)-P(G,q+.29)).normalize(),s.quaternion.setFromUnitVectors(r,l)}}}const Et=[.25,.35,.28],co=[1.04,1.1,.94],Bt=[1.66,1.52,.98],fo=(o,e,t)=>[o[0]+(e[0]-o[0])*t,o[1]+(e[1]-o[1])*t,o[2]+(e[2]-o[2])*t];function kn(o,e,t){return o<.45?fo(e,co,Math.pow(o/.45,.8)):fo(co,t,Math.pow((o-.45)/.55,1.4))}const ft=new T,Rn=new T,En=new T(0,1,0);function Bn(o,e){const t=Math.cos(e.angle),n=Math.sin(e.angle),i=c=>{const d=e.lean*c*c,p=e.height*(2*c*(1-c)*.82+c*c*(1-e.droop*.75));return[e.x+t*d,p,e.z+n*d]},a=c=>e.width*Math.pow(Math.max(0,1-Math.pow(c,1.6)),.9),s={positions:[],normals:[],shade:[],sway:[],phase:[],indices:[],heart:e.heart},r=(c,d)=>{s.positions.push(c[0],c[1],c[2]);const p=i(Math.max(0,d-.05)),g=i(Math.min(1,d+.05)),u=(g[0]-p[0])*t+(g[2]-p[2])*n,m=g[1]-p[1],w=Math.max(1e-5,Math.hypot(u,m));ft.set(-t*m/w,u/w,-n*m/w).multiplyScalar(.6).addScaledVector(En,.75).addScaledVector(Rn.set(t,0,n),.3).normalize(),s.normals.push(ft.x,ft.y,ft.z);const x=kn(d,e.root,e.tip),b=e.value*(1-e.inner*.26*Math.pow(1-d,1.5));return s.shade.push(x[0]*b,x[1]*b,x[2]*b),s.sway.push(d),s.phase.push(e.phase),s.sway.length-1},l=[];for(let c=0;c<e.segments;c++){const d=c/e.segments,p=i(d),g=e.angle+Math.PI*.5+e.twist*d,u=a(d),m=Math.cos(g)*u,w=Math.sin(g)*u;l.push([r([p[0]-m,p[1],p[2]-w],d),r([p[0]+m,p[1],p[2]+w],d)])}for(let c=0;c<l.length-1;c++){const[d,p]=l[c],[g,u]=l[c+1];s.indices.push(d,p,u,d,u,g)}const[h,f]=l[l.length-1];s.indices.push(h,f,r(i(1),1)),o.push(s)}function Io(o){let e=o;return()=>(e=e*16807%2147483647,(e-1)/2147483646)}function Fo(o,e,t){const n=t()*Math.PI*2;for(let i=0;i<e.blades;i++){const a=e.blades>1?i/(e.blades-1):0,s=n+i*2.39996+(t()-.5)*.4,r=e.spread*Math.sqrt(a)*(.7+t()*.3);Bn(o,{x:e.x+Math.cos(s)*r,z:e.z+Math.sin(s)*r,angle:s+(t()-.5)*.5,height:e.height*(1-a*e.fall)*(.88+t()*.24),width:e.width*(.85+t()*.3)*(1-a*.15),lean:e.lean*(.25+a*.95)*(.8+t()*.4),droop:e.droop*Math.pow(a,.8)+t()*.08,twist:(t()-.5)*.9,phase:t(),segments:i<e.curved?3:2,value:e.value*(.93+t()*.14),inner:1-a,heart:[e.x,e.z],root:[Et[0]*e.tint[0],Et[1]*e.tint[1],Et[2]*e.tint[2]],tip:[Bt[0]*e.tint[0],Bt[1]*e.tint[1],Bt[2]*e.tint[2]]})}}const In=o=>o<.28?[1.05,1.03,.88]:o>.74?[.92,1,1.05]:[1,1,1];function Fn(o,e,t){return Array.from({length:o},(n,i)=>{const a=e*Math.sqrt((i+.5)/o),s=i*2.39996+t()*.6;return[Math.cos(s)*a+(t()-.5)*.08,Math.sin(s)*a+(t()-.5)*.08]})}function Do(o,e){const t=[],n=[],i=[],a=[],s=[],r=[],l=new T;for(const f of o){for(let d=0;d<f.sway.length;d++){const p=f.positions[d*3]-f.heart[0],g=f.positions[d*3+2]-f.heart[1],u=Math.hypot(p,g);l.set(p,0,g).multiplyScalar(u>1e-4?1/u:0).multiplyScalar(e*(.35+.65*f.sway[d])),l.x+=f.normals[d*3],l.y+=f.normals[d*3+1],l.z+=f.normals[d*3+2],l.normalize(),f.normals[d*3]=l.x,f.normals[d*3+1]=l.y,f.normals[d*3+2]=l.z}const c=a.length;t.push(...f.positions),n.push(...f.normals),i.push(...f.shade),a.push(...f.sway),s.push(...f.phase);for(const d of f.indices)r.push(c+d)}const h=new ue;return h.setIndex(r),h.setAttribute("position",new W(t,3)),h.setAttribute("normal",new W(n,3)),h.setAttribute("color",new W(i,3)),h.setAttribute("aSway",new W(a,1)),h.setAttribute("aPhase",new W(s,1)),h.computeBoundingSphere(),h}function Dn(o){const e=[],t=Io(2711),n=o?5:7;for(const[i,a]of Fn(6,.55,t)){const s=.82+t()*.36;Fo(e,{x:i,z:a,blades:n,height:.7*s,fall:.4,spread:.3,lean:.44,droop:.5,width:o?.052:.046,curved:o?0:2,tint:In(t()),value:.9+t()*.2},t)}return Do(e,.45)}function Un(){const o=[];return Fo(o,{x:0,z:0,blades:13,height:1,fall:.38,spread:.12,lean:.44,droop:.85,width:.042,curved:13,tint:[1,1,1],value:1},Io(9127)),Do(o,.85)}const Gn=`
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
`;function Ln(o){const e=new hs({vertexColors:!0,side:ot}),t={value:.35},n={value:new T(.8,.15,.55).normalize()};return e.onBeforeCompile=i=>{i.uniforms.uTime=o,i.uniforms.uWind=t,i.uniforms.uWindDir=n,i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
attribute float aSway;
attribute float aPhase;
uniform float uTime;
uniform float uWind;
uniform vec3 uWindDir;
varying float vTip;
${Gn}`).replace("#include <begin_vertex>",`#include <begin_vertex>
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
}`),i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
varying float vTip;`).replace("#include <normal_fragment_begin>",`#include <normal_fragment_begin>
normal = normalize( vNormal );`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance += diffuseColor.rgb * (0.05 + 0.16 * vTip * vTip) * vec3(0.8, 0.9, 1.15);`)},e.customProgramCacheKey=()=>"pocket-orbit-meadow",e}function Hn(o,e,t,n,i){const a=Ln(t),s=re(31337),r=new fs,l=new U,h=new U,f=(m,w,x,b)=>me(m,w)<.965&&x>ie+.05&&!i(m,w,b)&&!e.solid(m,w,.3,x,x+.6),c=n?1.15:.82,d=[];for(let m=-28;m<=28;m+=c)for(let w=-22;w<=22;w+=c){const x=m+(s()-.5)*c*.8,b=w+(s()-.5)*c*.8,z=P(x,b);f(x,b,z,1.02)&&d.push([x,z,b])}const p=new Zt(Dn(n),a,d.length);d.forEach(([m,w,x],b)=>{const z=(n?.72:.6)+s()*.2;r.position.set(m,w-.03,x),r.rotation.set(0,s()*Math.PI*2,0),r.scale.set(z,(.5+s()*.3)*1,z),r.updateMatrix(),p.setMatrixAt(b,r.matrix),Ke(m,x,h),l.copy(h).multiplyScalar(1.12+s()*.1),p.setColorAt(b,l)}),p.receiveShadow=!0,o.add(p);const g=[];for(let m=0;m<(n?900:1800)&&g.length<(n?110:240);m++){const w=(s()-.5)*54,x=(s()-.5)*42,b=P(w,x);me(w,x)<.8&&s()>.25||!f(w,x,b,1.3)||g.push([w,b,x])}const u=new Zt(Un(),a,g.length);g.forEach(([m,w,x],b)=>{const z=.45+s()*.3;r.position.set(m,w-.03,x),r.rotation.set(0,s()*Math.PI*2,0),r.scale.set(z,z*(.8+s()*.4),z),r.updateMatrix(),u.setMatrixAt(b,r.matrix),Ke(m,x,h),l.copy(h).multiplyScalar(1.05+s()*.12),u.setColorAt(b,l)}),u.receiveShadow=!0,o.add(u)}const Be=_("#4a3c3a"),Ze=_("#6a5548");let Uo={value:0},Ve=null;function Nn(){if(Ve)return Ve;const o=256,e=document.createElement("canvas");e.width=e.height=o;const t=e.getContext("2d");t.fillStyle="#ffffff";const n=re(1337),i=(s,r,l,h,f)=>{t.save(),t.translate(s,r),t.rotate(f),t.beginPath(),t.moveTo(0,-l/2),t.quadraticCurveTo(h,-l*.1,0,l/2),t.quadraticCurveTo(-h,-l*.1,0,-l/2),t.fill(),t.restore()},a=o/2;for(let s=0;s<70;s++){const r=Math.sqrt(n())*o*.36,l=n()*Math.PI*2,h=a+Math.cos(l)*r,f=a+Math.sin(l)*r*.9;i(h,f,30+n()*26,11+n()*6,l+Math.PI/2+(n()-.5)*.9)}return t.beginPath(),t.arc(a,a,o*.2,0,Math.PI*2),t.fill(),Ve=new Mt(e),Ve.colorSpace=st,Ve}function Ce(o,e=0,t=!1){const n=new Re({color:o,roughness:.8});return e&&(n.emissive=new U(o),n.emissiveIntensity=e),t&&(n.map=Nn(),n.alphaTest=.5,n.side=ot),n.onBeforeCompile=i=>{i.uniforms.uLeafTime=Uo,i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
uniform float uLeafTime;`).replace("#include <begin_vertex>",`#include <begin_vertex>
      float leafLift = max(0.0, transformed.y - 1.2);
      float leafWave = sin(uLeafTime * .9 + transformed.x * .35 + transformed.z * .22);
      transformed.x += leafWave * .011 * leafLift;
      transformed.z += cos(uLeafTime * .7 + transformed.z * .31) * .008 * leafLift;`),i.fragmentShader=i.fragmentShader.replace("#include <normal_fragment_begin>",`#include <normal_fragment_begin>
      ${t?"normal = normalize( vNormal );":""}`).replace("#include <emissivemap_fragment>",`
      #include <emissivemap_fragment>
      float leafRim = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 2.4);
      vec3 leafRimColor = mix(vec3(.10, .32, .34), vec3(.34, .30, .62), clamp(normal.y * .5 + .5, 0.0, 1.0));
      totalEmissiveRadiance += leafRimColor * leafRim * .42 * diffuseColor.rgb * 3.0;
    `)},n.customProgramCacheKey=()=>`foliage-${e}-${t}`,n}const Go=["#2f6a52","#43805a","#5a9064","#3f7a63","#6f9768"],Lo=["#2f5f74","#3f7a8c","#4f8e90","#4a7894","#6a9aa2"],Ho=["#c66fae","#9a6fd6","#e38bb8","#7d8de6"],On=Go.map(o=>Ce(o)),Wn=Lo.map(o=>Ce(o)),Xt=(o,e)=>`#${new U(o).offsetHSL(0,-.02,e).getHexString()}`,qn=Go.map(o=>Ce(Xt(o,.09),0,!0)),Vn=Lo.map(o=>Ce(Xt(o,.09),0,!0)),ho=["#1f4d48","#285c50","#2f6a5a","#234f5a"].map(o=>Ce(o)),ht=Ho.map(o=>Ce(o,.32)),uo=Ho.map(o=>Ce(Xt(o,.06),.38,!0)),Xn=Z(16766704,2.2);function Ut(o,e,t){const n=new wt(o,e),i=re(t),a=n.attributes.position,s=n.attributes.normal,r=new Map;for(let l=0;l<a.count;l++){const h=`${a.getX(l).toFixed(3)},${a.getY(l).toFixed(3)},${a.getZ(l).toFixed(3)}`;r.has(h)||r.set(h,.84+i()*.3);const f=r.get(h),c=a.getX(l),d=a.getY(l),p=a.getZ(l),g=Math.hypot(c,d,p)||1;s.setXYZ(l,c/g,d/g,p/g),a.setXYZ(l,c*f,d*f,p*f)}return n}function we(o,e,t,n,i,a){const s=t.clone().sub(e),r=e.clone().lerp(t,.5);E(o,new wo(i,n,s.length()*1.05,7),a,r.x,r.y,r.z).quaternion.setFromUnitVectors(new T(0,1,0),s.normalize())}function jn(o,e,t,n,i,a,s,r=!1){const l=P(t,n),h=r?Wn:On,f=r?Vn:qn,c=re(s),d=new j;d.position.set(t,l-.18,n),d.rotation.y=a,d.scale.setScalar(i),o.add(d);const p=[new T(0,-.02,0),new T(-.11,.96,.09),new T(.055,1.88,.16),new T(.49,2.68,.2),new T(.75,3.3,.14)],g=[.238,.174,.118,.071,.023];for(let u=1;u<p.length;u++)we(d,p[u-1],p[u],g[u-1],g[u],u%2===0?Be:Ze);for(let u=0;u<5;u++){const m=u*Math.PI*.4+c()*.31;we(d,new T(-.02,.31,.03),new T(Math.cos(m)*.62,-.02,Math.sin(m)*.6),.12,.036,Be)}for(let u=0;u<10;u++){const m=u/10,w=u*2.4+c()*.41,x=new T(Math.cos(w),0,Math.sin(w)),b=p[1].clone().lerp(p[4],.25+.67*m),z=(1-m*.69)*(1.32+c()*.51),A=b.clone().addScaledVector(x,z);A.y+=.31+c()*.19;const S=b.clone().lerp(A,.53);S.y-=.14,we(d,b,S,.079-m*.033,.049,Be),we(d,S,A,.052,.017,Ze);for(let M=0;M<3;M++){const C=S.clone().lerp(A,.22+M*.32),R=(1-m*.54)*(1-M*.18),D=E(d,Ut(1,1,s+u*7+M),h[(u+M+1)%h.length],C.x,C.y+.1,C.z);D.scale.set((.9+c()*.25)*R,(.46+c()*.16)*R,(.86+c()*.22)*R),D.rotation.y=u*.94,D.rotation.z=-.16+c()*.35,Gt(d,f[(u+M+1)%f.length],D.position,D.scale.x,D.scale.y,D.scale.z,M===0?6:4,c)}}for(let u=0;u<3;u++){const m=E(d,Ut(.56-u*.09,1,s+91+u),h[2+u],.62+.139*u,3.07+.2*u,.14);m.scale.set(1.22,.57,.92),Gt(d,f[2+u],m.position,.68-u*.1,.32-u*.05,.5-u*.08,4,c)}e.add(t,n,i*.43,i*.43,l-.2,i*1.8)}const $n=new T(0,0,1),Xe=new T;function Gt(o,e,t,n,i,a,s,r){for(let l=0;l<s;l++){const h=r()*Math.PI*2,f=-.25+r()*1.15;Xe.set(Math.cos(h),f,Math.sin(h)).normalize();const c=(n+a)*(.62+r()*.26),d=E(o,new xe(c,c*(.8+r()*.3)),e,t.x+Xe.x*n*.82,t.y+Xe.y*i*.9,t.z+Xe.z*a*.82);d.quaternion.setFromUnitVectors($n,Xe),d.rotateZ(r()*Math.PI*2)}}function Qn(o,e,t,n,i,a){const s=re(a),r=P(t,n),l=new j;l.position.set(t,r-.1,n),l.rotation.y=s()*6.28,l.scale.setScalar(i),o.add(l),y(l,Be,.07,.14,1.3,0,.62,0,6);const h=4+Math.floor(s()*2);for(let f=0;f<h;f++){const c=f/h,d=(1-c*.72)*(.95+s()*.14),p=.95-c*.25,g=new ds(d,p,7,1),u=g.attributes.position;for(let w=0;w<u.count;w++)u.getY(w)<0&&(u.setY(w,u.getY(w)-.08+s()*.05),u.setX(w,u.getX(w)*(.9+s()*.2)),u.setZ(w,u.getZ(w)*(.9+s()*.2)));g.computeVertexNormals();const m=E(l,g,ho[(f+a)%ho.length],(s()-.5)*.05,.9+f*.52,(s()-.5)*.05);m.rotation.y=s()*6.28}e.add(t,n,i*.5,i*.5,r-.2,i*3)}function Yn(o,e,t,n,i,a){const s=re(a),r=P(t,n),l=new j;l.position.set(t,r-.1,n),l.rotation.y=s()*6.28,l.scale.setScalar(i),o.add(l);const h=[new T(0,0,0),new T(.12,.8,.05),new T(-.05,1.55,.1),new T(.15,2.1,0)],f=[.17,.12,.08,.05];for(let p=1;p<h.length;p++)we(l,h[p-1],h[p],f[p-1],f[p],Ze);const c=ht[a%ht.length],d=ht[(a+1)%ht.length];for(let p=0;p<7;p++){const g=p*2.4+s()*.5,u=p===0?0:.55+s()*.45,m=h[3].x+Math.cos(g)*u,w=h[3].z+Math.sin(g)*u,x=h[3].y+.1+(p===0?.35:s()*.3-.1);p&&we(l,h[2],new T(m,x-.1,w),.05,.02,Ze);const b=E(l,Ut(.5+s()*.2,1,a+p),p%3?c:d,m,x,w);if(b.scale.y=.7,Gt(l,uo[(a+(p%3?0:1))%uo.length],b.position,.6,.38,.6,5,s),p&&s()>.35){const z=E(l,new wt(.055,0),Xn,m*1.08,x-.42,w*1.08);z.castShadow=!1}}e.add(t,n,i*.4,i*.4,r-.2,i*2.5)}const Kn=[[-12.9,9.6,.95],[-19.4,10.9,.85],[-11.4,-4.6,.8],[-19.6,1.1,.78],[6.9,15.1,.82],[17.7,4.2,.74]];function Zn(o,e,t){const n=re(48151);let i=0;const a=t?22:38;for(let s=0;s<900&&i<a;s++){const r=n()*Math.PI*2,l=.74+n()*.17,[h,f]=Se(r,l),c=P(h,f);f>12.5&&Math.abs(h-2)<9||c<ie+.25||Je(h,f,1.7)||e.solid(h,f,1.1,c-.5,c+3)||(Qn(o,e,h,f,.8+n()*.65,3001+s),i++)}}const Jn=[[-21.4,-1.2,1.22,.75,1],[-17.1,-7.15,1.32,.12,1],[-12.35,-5.4,.94,-1.2,1],[-17.95,2.62,.83,.68,1],[-22.2,5.9,.83,.24,1],[-8.15,-12.3,1.13,.28,0],[-.42,-16.85,1.12,-.43,0],[-9.65,-14.48,.78,1.1,0],[4.35,-15.45,1.29,.12,0],[8.67,-12.66,.88,1.68,0],[16.7,-10.47,1.01,-.29,0],[19.55,-6.5,1.03,.52,0],[22.02,-1.73,.79,-1,0],[20.45,5.3,1.26,.98,0],[18.05,10.94,1.12,-.4,0],[16.43,13.64,.66,2.12,0],[-7.15,13.7,1.13,.8,0],[-8.9,10.6,.86,1.46,0],[-3.2,14.32,.72,1.24,0],[-2.75,-6.9,.72,.26,0],[5.9,-.96,.78,-.46,0],[-10.5,-2.3,.72,.89,1],[-5.5,-4.75,.73,-.89,0]];function Je(o,e,t){const n=t*t;return Bo.some(i=>i.some(a=>(a.x-o)**2+(a.y-e)**2<n))}function ei(o,e,t){const n=["#6f7073","#827263","#697b77","#9d8a76","#51636a"].map(r=>_(r)),i=["#49694f","#5d805f","#798b61"].map(r=>_(r)),a=[Z(10466559,.9),Z(16757611,.8),Z(16744383,.9),Z(16773280,.7)],s=re(5256);for(let r=0;r<(t?290:505);r++){const l=(s()-.5)*56,h=(s()-.5)*42,f=P(l,h),c=me(l,h);if(c>.995||f<ie-.12||e.solid(l,h,.15,f,f+.3))continue;const p=c>.82?.23+s()**2*.79:.06+s()**2*.26;if(Je(l,h,.89)&&p>.12)continue;const g=E(o,new dt(p,0),n[r%n.length],l,f-p*.06,h);if(g.scale.set(.98+s()*.52,.35+s()*.43,.75+s()*.39),g.rotation.set(.25,s()*6.28,(s()-.5)*.43),p>.64&&e.add(l,h,p*1.15,p*1.17,f-.3,p*.75),!(c>.91||p<.16||r%4!==0))for(let u=0;u<4;u++)E(o,new wt(.2+s()*.25,0),i[u%i.length],l+(s()-.5)*.85,f+.132,h+(s()-.5)*.62).scale.set(1.22,.65+s()*.3,.78)}for(const[r,l,h]of[[-10.7,6.35,0],[-17.8,4.45,0],[-2.8,6.8,2],[3.5,3.84,1],[9.77,10.8,1],[15.76,11.53,3],[-5.4,-9.9,0],[15.2,-3.56,1],[3.12,14.72,3],[-4.88,11.4,2]])for(let f=0;f<(t?14:28);f++){const c=r+(s()-.5)*2.4,d=l+(s()-.5)*1.55,p=P(c,d),g=.19+s()*.31;if(Je(c,d,.69)||p<ie||e.solid(c,d,.1,p,p+.3))continue;y(o,i[f%3],.011,.018,g,c,p+g/2,d,5);const u=E(o,new wt(.069+s()*.045,0),a[h],c,p+g,d);u.scale.y=.59}for(const[r,l]of[[-12.4,6.9],[-16.7,5.08],[-19.6,7.05],[-17.1,10.55]])if(!(P(r,l)<ie-.2))for(let h=0;h<13;h++){const f=(s()-.5)*.92,c=(s()-.5)*.67,d=.21+s()*.62,p=y(o,i[h%3],.012,.023,d,r+f,P(r+f,l+c)+d/2,l+c,5);p.rotation.z=f*.22}}function ti(o){const e=_("#a68c67");for(const[t,n]of[[[.565,.64,.715,.79],.895],[[1.881,1.954,2.027],.925]]){let i;for(const a of t){const[s,r]=Se(a,n),l=P(s,r);y(o,Ze,.086,.11,1.04,s,l+.43,r,7),v(o,Be,.235,.145,.235,s,l+.965,r).rotation.y=a;const h=new T(s,l+.73,r);if(i){const f=i.clone().lerp(h,.5);f.y-=.15,we(o,i,f,.025,.023,e),we(o,f,h,.023,.025,e)}i=h}}}function oi(o,e,t,n){Uo=t,Jn.forEach(([a,s,r,l,h],f)=>jn(o,e,a,s,r,l,772+f*331,!!h)),Kn.forEach(([a,s,r],l)=>{const h=P(a,s);h>ie+.2&&!Je(a,s,1.2)&&!e.solid(a,s,.9,h-.5,h+2)&&Yn(o,e,a,s,r,61+l*17)}),Zn(o,e,n),ei(o,e,n),Hn(o,e,t,n,Je),ti(o),[-15,-1.02,10.5].forEach((a,s)=>{const[r,l]=s===0?de:[a,15.65],h=P(r,l);h>ie&&(v(o,Be,.28,.14,.83,r,h+.04,l).rotation.y=s*.27)})}class si{constructor(e){this.land=e}camera=new us(48,1,.18,700);yaw=.19;pitch=.415;aspect=1;position=new T;aim=new T;target=new T;sample=new T;initialized=!1;resize(e,t){this.aspect=e/Math.max(1,t),this.camera.aspect=this.aspect,this.camera.updateProjectionMatrix()}turn(e,t){this.yaw=(this.yaw-e*.0078)%(Math.PI*2),this.pitch=ke.clamp(this.pitch+t*.0057,.16,1.08)}recenter(){this.yaw=.19,this.pitch=.415}update(e,t,n,i,a,s=!1){const r=this.aspect<.76,l=n?r?58:52:48;if(n)this.walkPose(t,r);else{const c=67.5/Math.max(.32,this.aspect),d=r?Math.max(82,c):63+Math.max(0,1.28-this.aspect)*28,p=a?0:Math.sin(i*.16)*1.5;this.position.set(12.9+p,r?38.5:24.6,d),this.aim.set(r?-.25:-9.75*Math.min(1,this.aspect/1.46),r?d*.229:7.9,0)}const f=!this.initialized||s||a?1:1-Math.exp(-e*(n?9:3.5));this.camera.position.lerp(this.position,f),this.target.lerp(this.aim,n?Math.min(1,f*1.22):f),this.camera.fov=ke.lerp(this.camera.fov,l,f),this.camera.updateProjectionMatrix(),this.camera.lookAt(this.target),this.camera.updateMatrixWorld(),this.initialized=!0}walkPose(e,t){const n=Math.sin(this.yaw),i=Math.cos(this.yaw),a=t?8.9:9.3,s=a*Math.cos(this.pitch);this.aim.set(e.x-n*1.6,Math.max(-2,e.y)+1.78,e.z-i*1.6),this.position.set(e.x+n*s+i*.5,Math.max(-.5,e.y)+1.17+a*Math.sin(this.pitch),e.z+i*s-n*.5),this.sample.set(e.x,Math.max(-2,e.y)+1.5,e.z);for(let r=1;r<=20;r++){const l=r/20,h=ke.lerp(this.sample.x,this.position.x,l),f=ke.lerp(this.sample.y,this.position.y,l),c=ke.lerp(this.sample.z,this.position.z,l);if(this.land.solid(h,c,.42,f-.39,f+.38)||me(h,c)<1&&P(h,c)>f-.45){this.position.lerp(this.sample,1-Math.max(.2,(r-1)/20));break}}}}const ni=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowLeft","ArrowDown","ArrowRight"]),ii=new Set(["ShiftLeft","ShiftRight"]);class ai{constructor(e,t,n,i){this.stick=t,this.paceButton=n;const a={signal:this.events.signal},s=(...u)=>u.some(m=>this.held.has(m)),r=()=>{const u=Number(s("KeyD","ArrowRight"))-Number(s("KeyA","ArrowLeft")),m=Number(s("KeyS","ArrowDown"))-Number(s("KeyW","ArrowUp"));this.axes.set(u+this.joystick.x,m+this.joystick.y),this.axes.lengthSq()>1&&this.axes.normalize(),i.invalidate()};e.addEventListener("keydown",u=>{u.altKey||u.ctrlKey||u.metaKey||u.isComposing||!i.active()||(ni.has(u.code)||ii.has(u.code)?(u.preventDefault(),this.held.add(u.code),r()):!u.repeat&&u.code==="KeyE"?(u.preventDefault(),i.inspect()):!u.repeat&&u.code==="KeyR"&&(u.preventDefault(),i.reset()))},a),window.addEventListener("keyup",u=>{this.held.delete(u.code)&&r()},a),e.addEventListener("blur",()=>{this.held.clear(),r()},a),window.addEventListener("blur",()=>this.clear(),a),n.addEventListener("pointerdown",u=>{u.button!==0||this.pacePointer!==null||!i.active()||(u.preventDefault(),this.pacePointer=u.pointerId,n.setPointerCapture(u.pointerId),n.setAttribute("data-held",""),i.invalidate())},a);const l=u=>{this.pacePointer===u.pointerId&&(this.pacePointer=null,n.removeAttribute("data-held"),i.invalidate())};n.addEventListener("pointerup",l,a),n.addEventListener("pointercancel",l,a),n.addEventListener("lostpointercapture",l,a);let h=null;e.addEventListener("pointerdown",u=>{u.button!==0||h||!i.active()||(h={id:u.pointerId,startX:u.clientX,startY:u.clientY,lastX:u.clientX,lastY:u.clientY,moving:!1},e.setPointerCapture(u.pointerId))},a),e.addEventListener("pointermove",u=>{if(i.active()){if(!h){u.pointerType==="mouse"&&i.hover(u.clientX,u.clientY);return}h.id===u.pointerId&&(!h.moving&&Math.hypot(h.startX-u.clientX,h.startY-u.clientY)<5||(h.moving=!0,i.look(u.clientX-h.lastX,u.clientY-h.lastY),h.lastX=u.clientX,h.lastY=u.clientY))}},a),e.addEventListener("pointerup",u=>{!h||h.id!==u.pointerId||(!h.moving&&i.active()&&i.pick(u.clientX,u.clientY),h=null)},a);const f=u=>{h?.id===u.pointerId&&(h=null)};e.addEventListener("pointercancel",f,a),e.addEventListener("lostpointercapture",f,a),e.addEventListener("pointerleave",()=>e.removeAttribute("data-inspectable"),a);const c=t.querySelector("span");let d=-1;const p=u=>{const m=t.getBoundingClientRect(),w=m.width*.32;this.joystick.set((u.clientX-m.left-m.width/2)/w,(u.clientY-m.top-m.height/2)/w),this.joystick.lengthSq()>1&&this.joystick.normalize(),c.style.transform=`translate(${this.joystick.x*w}px, ${this.joystick.y*w}px)`,r()};t.addEventListener("pointerdown",u=>{d!==-1||!i.active()||(u.preventDefault(),d=u.pointerId,t.setPointerCapture(d),p(u))},a),t.addEventListener("pointermove",u=>{u.pointerId===d&&i.active()&&p(u)},a);const g=u=>{d===u.pointerId&&(d=-1,this.joystick.set(0,0),c.style.removeProperty("transform"),r())};t.addEventListener("pointerup",g,a),t.addEventListener("pointercancel",g,a),t.addEventListener("lostpointercapture",g,a)}axes=new N;held=new Set;joystick=new N;events=new AbortController;pacePointer=null;get walkHeld(){return this.pacePointer!==null||this.held.has("ShiftLeft")||this.held.has("ShiftRight")}clear(){this.held.clear(),this.joystick.set(0,0),this.axes.set(0,0),this.stick.querySelector("span").style.removeProperty("transform");const e=this.pacePointer;this.pacePointer=null,this.paceButton.removeAttribute("data-held"),e!==null&&this.paceButton.hasPointerCapture(e)&&this.paceButton.releasePointerCapture(e)}dispose(){this.events.abort()}}const ri=matchMedia("(pointer: coarse)"),po=matchMedia("(prefers-reduced-motion: reduce)");class li{samples=0;slow=0;adjusted=!1;scale=1;light=ri.matches||navigator.hardwareConcurrency>0&&navigator.hardwareConcurrency<=4;pixels(e,t){const n=this.light?135e4:255e4;return Math.min(window.devicePixelRatio||1,this.light?1.35:1.75,Math.sqrt(n/Math.max(1,e*t)))*this.scale}measure(e){if(this.adjusted||e<=0||(this.samples++,e>.031&&this.slow++,this.samples<100))return!1;const t=this.slow/this.samples>.48;return this.samples=0,this.slow=0,t&&(this.scale=.79,this.adjusted=!0),t}}function ci(o){const e=new Set,t=new Set,n=new Set;o.traverse(i=>{if("geometry"in i&&i.geometry instanceof ue&&e.add(i.geometry),i instanceof I&&"instanceMatrix"in i&&"dispose"in i&&typeof i.dispose=="function"&&i.dispose(),!("material"in i))return;const a=Array.isArray(i.material)?i.material:[i.material];for(const s of a)if(s instanceof ps){t.add(s);for(const r of Object.values(s))r instanceof Jt&&n.add(r);if(s instanceof ee)for(const r of Object.values(s.uniforms))r.value instanceof Jt&&n.add(r.value)}});for(const i of n)i.dispose();for(const i of e)i.dispose();for(const i of t)i.dispose();o.clear()}const jt=3.5,fi=jt*1.6,fe=.9,hi=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];function di(o,e,t,n){if(o.clearPath(e,t,...n))return[n];const i=(c,d)=>{const p=Math.round(c/fe),g=Math.round(d/fe);let u=null,m=1/0;for(let w=-2;w<=2;w++)for(let x=-2;x<=2;x++){const b=p+w,z=g+x,A=b*fe,S=z*fe,M=Math.hypot(A-c,S-d);M<m&&o.canStand(A,S,.025)&&o.clearPath(c,d,A,S)&&(u=[b,z],m=M)}return u},a=i(e,t),s=i(...n);if(!a||!s)return[];const r=(c,d)=>Math.hypot(s[0]-c,s[1]-d),l={x:a[0],z:a[1],cost:0,estimate:r(...a),last:null,checked:!1},h=[l],f=new Map([[a.join(","),l]]);for(;h.length;){let c=0;for(let p=1;p<h.length;p++)h[p].estimate<h[c].estimate&&(c=p);const d=h.splice(c,1)[0];if(d.x===s[0]&&d.z===s[1]){const p=[n];for(let m=d;m;m=m.last)p.push([m.x*fe,m.z*fe]);p.reverse();const g=[];let u=[e,t];for(let m=0;m<p.length;m++){for(;m+1<p.length&&o.clearPath(...u,...p[m+1]);)m++;u=p[m],g.push(u)}return g}d.checked=!0;for(const[p,g]of hi){const u=d.x+p,m=d.z+g,w=`${u},${m}`,x=f.get(w),b=d.cost+Math.hypot(p,g);if(x&&(x.checked||b>=x.cost)||!o.clearPath(d.x*fe,d.z*fe,u*fe,m*fe))continue;const z=b+r(u,m);if(x)Object.assign(x,{cost:b,estimate:z,last:d});else{const A={x:u,z:m,cost:b,estimate:z,last:d,checked:!1};f.set(w,A),h.push(A)}}}return[]}class ui{constructor(e){this.land=e,this.reset()}position=new T;velocity=new N;heading=Math.PI;falling=!1;gravity=0;path=[];lastRange=1/0;obstruction=0;desired=new N;get walkingRoute(){return this.path.length>0}get moving(){return this.velocity.lengthSq()>0}reset(){const[e,t]=Ts;this.position.set(e,P(e,t),t),this.velocity.set(0,0),this.heading=Math.PI,this.falling=!1,this.gravity=0,this.cancel()}cancel(){this.path.length=0,this.lastRange=1/0,this.obstruction=0}guide(e){this.cancel();const{x:t,z:n}=this.position;return this.falling||(this.path=di(this.land,t,n,e)),this.walkingRoute}update(e,t,n,i){if(t.lengthSq()>.001){this.cancel();const p=Math.cos(n),g=Math.sin(n);this.desired.set(t.x*p+t.y*g,-t.x*g+t.y*p)}else if(this.path.length){const[p,g]=this.path[0];this.desired.set(p-this.position.x,g-this.position.z);const u=this.desired.length();u<.32?(this.path.shift(),this.lastRange=1/0,this.obstruction=0):(this.obstruction=u+.005<this.lastRange?0:this.obstruction+e,this.lastRange=u,this.obstruction>1.35&&this.cancel()),this.desired.multiplyScalar(1/Math.max(1,u)),this.path.length||this.desired.set(0,0)}else this.desired.set(0,0);const a=this.walkingRoute||i?jt:fi;if(this.desired.multiplyScalar(a),this.falling)return this.gravity-=14.3*e,this.position.y+=this.gravity*e,this.position.x+=this.velocity.x*e,this.position.z+=this.velocity.y*e,this.position.y<-7.7?(this.reset(),!0):!1;const s=this.desired.lengthSq()>.04?12.4:15.1;this.velocity.lerp(this.desired,1-Math.exp(-s*e)),this.velocity.lengthSq()<.001&&this.velocity.set(0,0);const r=this.position.x,l=this.position.z,h=r+this.velocity.x*e,f=l+this.velocity.y*e;this.canMove(h,f)?(this.position.x=h,this.position.z=f):(this.canMove(h,l)&&(this.position.x=h),this.canMove(this.position.x,f)&&(this.position.z=f));const c=this.position.x-r,d=this.position.z-l;if(Math.abs(c)+Math.abs(d)>4e-4){const p=Math.atan2(c,d),g=Math.atan2(Math.sin(p-this.heading),Math.cos(p-this.heading));this.heading+=g*(1-Math.exp(-e*14))}else this.desired.lengthSq()>.04&&this.velocity.multiplyScalar(.55);return me(this.position.x,this.position.z)>1.003?(this.falling=!0,this.cancel()):this.position.y=P(this.position.x,this.position.z),!1}canMove(e,t){const n=P(e,t);return n>ie-.19&&n-this.position.y<.27&&!this.land.solid(e,t,To,n+.04,n+1.57)}}const No=1.22;function mo(o){zt.common.includes("NIGHT_ACES")||(zt.common+=`
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
    `,zt.tonemapping_fragment=`
      #if defined( TONE_MAPPING )
        gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
      #elif defined( NIGHT_ACES )
        gl_FragColor.rgb = nightAces( gl_FragColor.rgb );
      #endif
    `);const e=new Set;o.traverse(t=>{if(t instanceof I||t instanceof vo||t instanceof Nt)for(const n of Array.isArray(t.material)?t.material:[t.material])e.has(n)||!n.toneMapped||n.defines?.NIGHT_ACES||(e.add(n),n.defines={...n.defines,NIGHT_ACES:No.toFixed(3)},n.needsUpdate=!0)})}function pi(o){const e=new li,t={antialias:!e.light,alpha:!1,powerPreference:"default",stencil:!1},n=o.canvas.getContext("webgl2",t);if(!n)return null;const i=new ms({canvas:o.canvas,context:n,...t});i.toneMapping=go,i.toneMappingExposure=No,i.shadowMap.enabled=!0,i.shadowMap.type=gs,i.shadowMap.autoUpdate=!1,i.shadowMap.needsUpdate=!0;const a=new vs;a.fog=new ws("#0b0e28",.0046);const s=new j;a.add(s),a.add(new xs("#94a6ff","#43305a",1.55));const r=new _t("#c7d4ff",2.05);r.position.set(-24,33,24),r.castShadow=!0,r.shadow.mapSize.setScalar(e.light?1024:2048),Object.assign(r.shadow.camera,{near:2,far:96,left:-32,right:32,top:31,bottom:-31}),r.shadow.camera.updateProjectionMatrix(),r.shadow.normalBias=.049,r.shadow.bias=-21e-5,r.shadow.radius=3,r.shadow.intensity=.79,a.add(r);const l=new _t("#d58cff",1.35);l.position.set(12,14,-35),a.add(l);const h=new _t("#5ce6d6",.55);h.position.set(-34,8,-12),a.add(h);const f=new qs,c={value:0},d=An(jt,oe);a.add(d.root),Ws(s,c,e.light),Sn(s);let p=!1;const g=ln(s,f,c,()=>{p&&mo(a),i.shadowMap.needsUpdate=!0,oe()}),u=dn(s,f,oe);fn(s,!e.light),oi(s,f,c,e.light),Xs(s);const m=new ui(f),w=new si(f);let x=null;e.light||(x=new ks(i,new je(1,1,{type:$e,samples:4})),x.addPass(new Es(a,w.camera)),x.addPass(new Ie(new N(1,1),.6,.4,.94)),x.addPass(new Rs),i.toneMapping=ys,mo(a),p=!0);const b=Object.values(pe).map(k=>{const[L,F]=k.landmark,V=P(L,F),[se,H,Y]=k.hit;return{...k,point:new T(L+(k.id==="hanzizap"?2.1:0),V+k.signHeight,F),box:new bo(new T(L-se/2,V-.5,F-Y/2),new T(L+se/2,V+H,F+Y/2))}}),z=[...b,...u],A=new T,S=new T,M=new T,C=new bs,R=new N,D=new AbortController,Q={signal:D.signal};let J="overview",G=null,q=null,Ue=!1,Ge=!1,it=!1,Tt=!0,Pe=!0,Le=0,He=0,ge=1,ve=1,Ne=0;const Ct=()=>!Ue&&!Ge&&!it;function oe(){Ct()&&!document.hidden&&Le===0&&(Le=requestAnimationFrame(Wo))}function _e(k,L){J!==k&&(J=k,Ne=.72,o.mode(J),J==="overview"&&(Oe(),m.velocity.set(0,0),le.clear())),L&&o.canvas.focus({preventScroll:!0}),oe()}function Oe(){m.cancel(),q&&(q=null,o.walking(null))}function $t(){Oe(),m.reset(),w.recenter(),Pe=!0,o.status("Back at arrival."),_e("walk",!0)}function Qt(k,L){const F=o.canvas.getBoundingClientRect();R.set((k-F.left)/F.width*2-1,1-(L-F.top)/F.height*2),C.setFromCamera(R,w.camera);let V=1/0,se=null;for(const H of z){if(!C.ray.intersectBox(H.box,S))continue;const Y=S.distanceTo(C.ray.origin);Y<V&&(V=Y,se=H.id)}if(!se)return null;for(let H=1;H<V;H+=.9)if(C.ray.at(H,M),me(M.x,M.z)<.985&&M.y+.2<P(M.x,M.z))return null;return se}const le=new ai(o.canvas,o.stick,o.paceButton,{active:Ct,invalidate:oe,reset:$t,hover:(k,L)=>o.canvas.toggleAttribute("data-inspectable",Qt(k,L)!==null),pick:(k,L)=>{const F=Qt(k,L);F&&o.inspect(F)},look:(k,L)=>{_e("walk",!0),w.turn(k,L),oe()},inspect:()=>{G&&o.inspect(G)}});function Pt(){const k=o.viewport.getBoundingClientRect();ge=Math.max(1,k.width),ve=Math.max(1,k.height),i.setPixelRatio(e.pixels(ge,ve)),i.setSize(ge,ve,!1),x&&(x.setPixelRatio(i.getPixelRatio()),x.setSize(ge,ve)),w.resize(ge,ve),Pe=!0,oe()}function Oo(){const k=J==="overview",L=ge/ve<.76,F=Ne>.4;let V=null,se=3.04;for(const H of b){const Y=Math.hypot(m.position.x-H.approach[0],m.position.z-H.approach[1]);!k&&!m.falling&&Y<se&&(se=Y,V=H.id),A.copy(H.point).project(w.camera);const ze=(A.x+1)*.5*ge,We=(1-A.y)*.5*ve,qo=A.z>-1&&A.z<1&&ze>49&&ze<ge-49&&We>(L?82:105)&&We<ve-95,Vo=k?H.id!=="observatory"&&H.id!=="workshop":!F&&Y<29&&Y>3.9;o.sign(H.id,qo&&Vo?{x:ze,y:We}:null)}G!==V&&(G=V,o.nearby(V))}function at(){cancelAnimationFrame(Le),Le=0,He=0}function Wo(k){if(Le=0,!Ct()||document.hidden)return;const L=He?Math.max(0,(k-He)/1e3):0,F=Math.min(L||1/60,.065),V=po.matches;if(He=k,Ne=Math.max(0,Ne-F),le.axes.lengthSq()>.001&&_e("walk",!1),J==="walk"){const se=F>.033?2:1;let H=!1;for(let Y=0;Y<se;Y++)if(m.update(F/se,le.axes,w.yaw,le.walkHeld)){H=!0;break}if(H&&(w.recenter(),Pe=!0,o.status("You returned to arrival.")),q&&!m.walkingRoute){const Y=pe[q].name,ze=pe[q].approach,We=Math.hypot(m.position.x-ze[0],m.position.z-ze[1])<.85;o.status(We?`Arrived at ${Y}.`:"Assisted walk ended."),q=null,o.walking(null)}}V||(c.value+=F),g(),w.update(F,m.position,J==="walk",c.value,V,Pe),d.update(m.position,m.heading,F,w.camera,le.walkHeld||!!q,m.falling,Pe),Pe=!1,x?x.render(F):i.render(a,w.camera),Tt&&d.ready&&(Tt=!1,o.ready(!0)),Oo(),!V&&e.measure(L)&&Pt(),!V||m.falling||m.walkingRoute||m.moving||le.axes.lengthSq()>0||Ne>0?oe():He=0}const Yt=new ResizeObserver(Pt);return Yt.observe(o.viewport),Pt(),po.addEventListener("change",oe,Q),document.addEventListener("visibilitychange",()=>{document.hidden?(le.clear(),at()):oe()},Q),o.canvas.addEventListener("webglcontextlost",k=>{k.preventDefault(),Ge=!0,at(),Oe(),le.clear(),o.ready(!1)},Q),o.canvas.addEventListener("webglcontextrestored",()=>{Ge=!1,Tt=!0,i.shadowMap.needsUpdate=!0,oe()},Q),{play:()=>_e("walk",!0),overview:()=>_e("overview",!1),pause(k){Ue=k,Ue?(le.clear(),at()):oe()},walk(k){if(Oe(),_e("walk",!0),!m.guide(pe[k].approach)){o.status("Walk from arrival or select another destination.");return}q=k,o.walking(k),o.status(`Walking to ${pe[k].name}.`)},stopWalking:Oe,reset:$t,dispose(){it=!0,at(),D.abort(),Yt.disconnect(),le.dispose(),r.shadow.dispose(),x?.dispose(),ci(a),i.dispose()}}}const wi=Object.freeze(Object.defineProperty({__proto__:null,createIsland:pi},Symbol.toStringTag,{value:"Module"}));export{ci as d,wi as i,vi as t};
