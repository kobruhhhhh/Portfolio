import{r as o,j as e,A as re,t as le,v as ae,q as ie,h as se,N as Z}from"./vendor-react-kATJjRVF.js";import{f as ce,P as f}from"./vendor-gZAhS3EQ.js";import{W as ue,V as ee,C as de,S as fe,O as me,a as pe,G as he,P as ve,M as xe,b as ge}from"./vendor-three-DVGIcGzi.js";import{g as i}from"./vendor-gsap-wzD98drf.js";import{T as ye,B as be,r as K}from"./index-a15eABsb.js";const we="_header_11l5d_1",Ce="_scrolled_11l5d_13",Re="_dark_11l5d_17",Ee="_light_11l5d_20",Se="_container_11l5d_24",L={header:we,scrolled:Ce,dark:Re,light:Ee,container:Se},V=()=>o.useContext(ye),ke=({children:d})=>{const[p,u]=o.useState(!1),{dark:l}=V();return o.useEffect(()=>{const g=()=>{u(window.scrollY>20)};return window.addEventListener("scroll",g),()=>window.removeEventListener("scroll",g)},[]),e.jsx("header",{className:ce(L.header,{[L.scrolled]:p,[L.dark]:l,[L.light]:!l}),role:"banner",children:e.jsx("div",{className:L.container,children:d})})};ke.propTypes={children:f.node.isRequired};const Te={square:0},_e=`
void main() {
  gl_Position = vec4(position, 1.0);
}
`,je=`
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;

uniform int   uShapeType;
const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int   MAX_CLICKS = 10;

uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float speed     = uRippleSpeed;
  float thickness = uRippleThickness;
  const float dampT     = 1.0;
  const float dampR     = 10.0;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      float cellPixelSize = 8.0 * pixelSize;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = speed * t;
      float ring  = exp(-pow((r - waveR) / thickness, 2.0));
      float atten = exp(-dampT * t) * exp(-dampR * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  vec3 color = uColor;

  vec3 srgbColor = mix(
    color * 12.92,
    1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, color)
  );

  fragColor = vec4(srgbColor, M);
}
`,W=10,Xe=()=>{const{dark:d}=V(),p=o.useRef(null),u=o.useRef(null),l=d?"#B19EEF":"#8400b8",g=d?"#0a0416":"#ffffff";return o.useEffect(()=>{var q,z,F;const v=p.current;if(!v)return;if(u.current){const r=u.current;(q=r.resizeObserver)==null||q.disconnect(),cancelAnimationFrame(r.raf),(z=r.quad)==null||z.geometry.dispose(),r.material.dispose(),(F=r.composer)==null||F.dispose(),r.renderer.dispose(),r.renderer.forceContextLoss(),r.renderer.domElement.parentElement===v&&v.removeChild(r.renderer.domElement),u.current=null}const $=document.createElement("canvas"),s=new ue({canvas:$,antialias:!0,alpha:!0,powerPreference:"high-performance"});s.domElement.style.width="100%",s.domElement.style.height="100%",s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),v.appendChild(s.domElement),s.setClearColor(g,1);const h={uResolution:{value:new ee(0,0)},uTime:{value:0},uColor:{value:new de(l)},uClickPos:{value:Array.from({length:W},()=>new ee(-1,-1))},uClickTimes:{value:new Float32Array(W)},uShapeType:{value:Te.square},uPixelSize:{value:4*s.getPixelRatio()},uScale:{value:2},uDensity:{value:1},uPixelJitter:{value:0},uEnableRipples:{value:1},uRippleSpeed:{value:.4},uRippleThickness:{value:.12},uRippleIntensity:{value:1.5},uEdgeFade:{value:.25}},w=new fe,G=new me(-1,1,1,-1,0,1),_=new pe({vertexShader:_e,fragmentShader:je,uniforms:h,transparent:!0,depthTest:!1,depthWrite:!1,glslVersion:he}),Y=new ve(2,2),M=new xe(Y,_);w.add(M);const C=new ge,R=()=>{const r=v.clientWidth||1,c=v.clientHeight||1;s.setSize(r,c,!1),h.uResolution.value.set(s.domElement.width,s.domElement.height),h.uPixelSize.value=4*s.getPixelRatio()};R();const y=new ResizeObserver(R);y.observe(v);const P=(()=>{var r;if(typeof window<"u"&&((r=window.crypto)!=null&&r.getRandomValues)){const c=new Uint32Array(1);return window.crypto.getRandomValues(c),c[0]/4294967295}return Math.random()})()*1e3,I=r=>{const c=s.domElement.getBoundingClientRect(),t=s.domElement.width/c.width,n=s.domElement.height/c.height,a=(r.clientX-c.left)*t,x=(c.height-(r.clientY-c.top))*n;return{fx:a,fy:x}},N=r=>{var a;const{fx:c,fy:t}=I(r),n=((a=u.current)==null?void 0:a.clickIx)??0;h.uClickPos.value[n].set(c,t),h.uClickTimes.value[n]=h.uTime.value,u.current&&(u.current.clickIx=(n+1)%W)};s.domElement.addEventListener("pointerdown",N,{passive:!0});let E=0;const S=()=>{h.uTime.value=P+C.getElapsedTime()*.5,s.render(w,G),E=requestAnimationFrame(S)};return E=requestAnimationFrame(S),u.current={renderer:s,scene:w,camera:G,material:_,clock:C,clickIx:0,uniforms:h,resizeObserver:y,raf:E,quad:M,timeOffset:P},()=>{var r,c;if(u.current){const t=u.current;(r=t.resizeObserver)==null||r.disconnect(),cancelAnimationFrame(t.raf),(c=t.quad)==null||c.geometry.dispose(),t.material.dispose(),t.renderer.dispose(),t.renderer.forceContextLoss(),t.renderer.domElement.parentElement===v&&v.removeChild(t.renderer.domElement),u.current=null}}},[l,d]),e.jsx("div",{ref:p,className:"pixel-blast-container","aria-label":"PixelBlast interactive background"})},Pe="_footer_qgges_1",Ne="_container_qgges_11",Ae="_copyright_qgges_25",Le="_body_qgges_30",Me="_socialIcons_qgges_42",Ie="_purple_qgges_51",T={footer:Pe,container:Ne,copyright:Ae,body:Le,socialIcons:Me,purple:Ie},Ke=()=>e.jsx("footer",{className:T.footer,role:"contentinfo",children:e.jsxs("div",{className:T.container,children:[e.jsx("div",{className:T.copyright,children:e.jsxs("p",{children:["Made by ",e.jsx("b",{className:T.purple,children:"KoBruH"})]})}),e.jsx("nav",{className:T.body,"aria-label":"Social media links",children:e.jsxs("ul",{className:T.socialIcons,children:[e.jsx("li",{children:e.jsx("a",{href:"https://github.com/kobruhhhhh",target:"_blank",rel:"noreferrer","aria-label":"github",children:e.jsx(re,{})})}),e.jsx("li",{children:e.jsx("a",{href:"https://t.me/Kobruh_69",target:"_blank",rel:"noreferrer","aria-label":"TelegramPlane",children:e.jsx(le,{})})}),e.jsx("li",{children:e.jsx("a",{href:"https://discordid.netlify.app/?id=898419793709912104",target:"_blank",rel:"noreferrer","aria-label":"discord",children:e.jsx(ae,{})})}),e.jsx("li",{children:e.jsx("a",{href:"https://www.linkedin.com/in/lalit-kumar-696086204/",target:"_blank",rel:"noreferrer","aria-label":"linkedin",children:e.jsx(ie,{})})})]})})]})}),te=({themeToggle:d,items:p,className:u="",ease:l="power3.easeOut",baseColor:g="#fff",pillColor:v="#060010",hoveredPillTextColor:$="#060010",pillTextColor:s,onMobileMenuClick:h,initialLoadAnimation:w=!0})=>{const _=se().pathname,Y=s??g,[M,C]=o.useState(!1),R=o.useRef([]),y=o.useRef([]),j=o.useRef([]),P=o.useRef(null),I=o.useRef(null),N=o.useRef(null),E=o.useRef(null),S=o.useRef(null);o.useEffect(()=>{var x;const t=()=>{R.current.forEach(m=>{var Q;if(!(m!=null&&m.parentElement))return;const b=m.parentElement,oe=b.getBoundingClientRect(),{width:B,height:k}=oe,O=(B*B/4+k*k)/(2*k),U=Math.ceil(2*O)+2,J=Math.ceil(O-Math.sqrt(Math.max(0,O*O-B*B/4)))+1,ne=U-J;m.style.width=`${U}px`,m.style.height=`${U}px`,m.style.bottom=`-${J}px`,i.set(m,{xPercent:-50,scale:0,transformOrigin:`50% ${ne}px`});const H=b.querySelector(".pill-label"),A=b.querySelector(".pill-label-hover");H&&i.set(H,{y:0}),A&&i.set(A,{y:k+12,opacity:0});const X=R.current.indexOf(m);if(X===-1)return;(Q=y.current[X])==null||Q.kill();const D=i.timeline({paused:!0});D.to(m,{scale:1.2,xPercent:-50,duration:2,ease:l,overwrite:"auto"},0),H&&D.to(H,{y:-(k+8),duration:2,ease:l,overwrite:"auto"},0),A&&(i.set(A,{y:Math.ceil(k+100),opacity:0}),D.to(A,{y:0,opacity:1,duration:2,ease:l,overwrite:"auto"},0)),y.current[X]=D})};t();const n=()=>t();window.addEventListener("resize",n),(x=document.fonts)!=null&&x.ready&&document.fonts.ready.then(t).catch(()=>{});const a=N.current;if(a&&i.set(a,{visibility:"hidden",opacity:0,scaleY:1}),w){const m=S.current,b=E.current;m&&(i.set(m,{scale:0}),i.to(m,{scale:1,duration:.6,ease:l})),b&&(i.set(b,{width:0,overflow:"hidden"}),i.to(b,{width:"auto",duration:.6,ease:l}))}return()=>window.removeEventListener("resize",n)},[p,l,w]);const q=t=>{var a;const n=y.current[t];n&&((a=j.current[t])==null||a.kill(),j.current[t]=n.tweenTo(n.duration(),{duration:.3,ease:l,overwrite:"auto"}))},z=t=>{var a;const n=y.current[t];n&&((a=j.current[t])==null||a.kill(),j.current[t]=n.tweenTo(0,{duration:.2,ease:l,overwrite:"auto"}))},F=()=>{var n;const t=S.current;t&&((n=P.current)==null||n.kill(),i.set(t,{rotate:0}),P.current=i.to(t,{rotate:360,duration:.2,ease:l,overwrite:"auto"}))},r=()=>{const t=!M;C(t);const n=I.current,a=N.current;if(n){const x=n.querySelectorAll(".hamburger-line");t?(i.to(x[0],{rotation:45,y:3,duration:.3,ease:l}),i.to(x[1],{rotation:-45,y:-3,duration:.3,ease:l})):(i.to(x[0],{rotation:0,y:0,duration:.3,ease:l}),i.to(x[1],{rotation:0,y:0,duration:.3,ease:l}))}a&&(t?(i.set(a,{visibility:"visible"}),i.fromTo(a,{opacity:0,y:10,scaleY:1},{opacity:1,y:0,scaleY:1,duration:.3,ease:l,transformOrigin:"top center"})):i.to(a,{opacity:0,y:10,scaleY:1,duration:.2,ease:l,transformOrigin:"top center",onComplete:()=>{i.set(a,{visibility:"hidden"})}})),h==null||h()},c={"--base":g,"--pill-bg":v,"--hover-text":$,"--pill-text":Y};return e.jsxs("div",{className:"pill-nav-container",children:[e.jsxs("nav",{className:`pill-nav ${u}`,"aria-label":"Primary",style:c,children:[e.jsx("div",{className:"pill-logo","aria-label":"Theme toggle",onMouseEnter:F,role:"button",tabIndex:0,ref:S,children:d}),e.jsx("div",{className:"pill-nav-items desktop-only",ref:E,children:e.jsx("ul",{className:"pill-list",role:"menubar",children:p.map((t,n)=>e.jsx("li",{role:"none",children:e.jsxs(Z,{role:"menuitem",to:t.href,className:`pill${_===t.href?" is-active":""}`,"aria-label":t.ariaLabel||t.label,onMouseEnter:()=>q(n),onMouseLeave:()=>z(n),children:[e.jsx("span",{className:"hover-circle","aria-hidden":"true",ref:a=>{R.current[n]=a}}),e.jsxs("span",{className:"label-stack",children:[e.jsx("span",{className:"pill-label",children:t.label}),e.jsx("span",{className:"pill-label-hover","aria-hidden":"true",children:t.label})]})]})},t.href||`item-${n}`))})}),e.jsxs("button",{className:"mobile-menu-button mobile-only",onClick:r,"aria-label":"Toggle menu",ref:I,children:[e.jsx("span",{className:"hamburger-line"}),e.jsx("span",{className:"hamburger-line"})]})]}),e.jsx("div",{className:"mobile-menu-popover mobile-only",ref:N,style:c,children:e.jsxs("ul",{className:"mobile-menu-list",children:[p.map((t,n)=>e.jsx("li",{children:e.jsx(Z,{to:t.href,className:`mobile-menu-link${_===t.href?" is-active":""}`,onClick:()=>C(!1),children:t.label})},t.href||`mobile-item-${n}`)),e.jsx("li",{children:e.jsx("div",{className:"mobile-theme-toggle",onClick:()=>C(!1),children:d})})]})})]})};te.propTypes={themeToggle:f.node.isRequired,items:f.arrayOf(f.shape({label:f.string.isRequired,href:f.string.isRequired,ariaLabel:f.string})).isRequired,className:f.string,ease:f.string,baseColor:f.string,pillColor:f.string,hoveredPillTextColor:f.string,pillTextColor:f.string,onMobileMenuClick:f.func,initialLoadAnimation:f.bool};const qe="_toggleTheme_1jyu6_1",ze={toggleTheme:qe},Fe=d=>o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",...d},o.createElement("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})),Be=d=>o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",...d},o.createElement("circle",{cx:12,cy:12,r:5}),o.createElement("line",{x1:12,y1:1,x2:12,y2:3}),o.createElement("line",{x1:12,y1:21,x2:12,y2:23}),o.createElement("line",{x1:4.22,y1:4.22,x2:5.64,y2:5.64}),o.createElement("line",{x1:18.36,y1:18.36,x2:19.78,y2:19.78}),o.createElement("line",{x1:1,y1:12,x2:3,y2:12}),o.createElement("line",{x1:21,y1:12,x2:23,y2:12}),o.createElement("line",{x1:4.22,y1:19.78,x2:5.64,y2:18.36}),o.createElement("line",{x1:18.36,y1:5.64,x2:19.78,y2:4.22})),Oe=({className:d})=>{const{dark:p,toggleTheme:u}=V(),l=o.useMemo(()=>p?Be:Fe,[p]);return e.jsx(be,{addClass:d,onClick:u,label:"theme toggle",children:e.jsx(l,{className:ze.toggleTheme})})},We=()=>{const{dark:d}=V(),p=[{label:"Home",href:K.HOME,ariaLabel:"Navigate to home page"},{label:"About",href:K.ABOUT,ariaLabel:"Navigate to about page"},{label:"Projects",href:K.PROJECTS,ariaLabel:"Navigate to projects page"}];return e.jsx(te,{themeToggle:e.jsx(Oe,{}),items:p,ease:"power3.easeOut",baseColor:"#c4b5fd",pillColor:"#1a1625",hoveredPillTextColor:"#000000",pillTextColor:"#ffffff",initialLoadAnimation:!0})},He="_skipLink_14au2_1",De={skipLink:He},Je=()=>e.jsx("a",{href:"#main-content",className:De.skipLink,children:"Skip to main content"});export{Ke as F,ke as H,We as M,Xe as P,Je as S};
//# sourceMappingURL=SkipToContent-C2kxgBFQ.js.map
