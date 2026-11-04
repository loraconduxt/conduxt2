const CX = {sage:'#8FA590',sageD:'#6E8674',terra:'#A86B47',cream:'#D8D4C7',linen:'#EBEAE5',mist:'#DEE3E0',ch:'#202221',dg:'#3D3E3C',mg:'#767574',g:'#A7A6A4',smoke:'#E3E1E6',coral:'#FF6B5A',blue:'#6B9BD4',warm:'#F5E6D0',apple:'#CBC064',pink:'#FFB6E3',mint:'#B8D8C0',ivory:'#DDD1C1'};
const FX = {serif:"'PT Serif',Georgia,serif",sans:"'DM Sans',system-ui,sans-serif",mono:"'Space Mono',monospace"};
const DeviceCtx = React.createContext(false);
const useMobile = () => React.useContext(DeviceCtx);

const AURA = {
  spectrum:'radial-gradient(circle, rgba(107,155,212,.95) 0%, rgba(255,182,227,.85) 22%, rgba(255,107,90,.6) 44%, rgba(203,192,100,.7) 62%, rgba(221,209,193,.4) 82%, rgba(221,209,193,0) 100%)',
  coral:'radial-gradient(circle, #FF6B5A 0%, rgba(255,107,90,.85) 12%, rgba(255,150,180,.55) 30%, rgba(180,140,180,.18) 55%, rgba(0,0,0,0) 75%)',
  blue:'radial-gradient(circle, #6B9BD4 0%, rgba(107,155,212,.6) 25%, rgba(216,212,199,0) 70%)',
  warm:'radial-gradient(circle, #F5E6D0 0%, rgba(245,230,208,.75) 25%, rgba(168,107,71,0) 70%)',
  pink:'radial-gradient(circle, #CBC064 0%, #FFB6E3 30%, rgba(255,182,227,.35) 55%, rgba(0,0,0,0) 72%)',
  mint:'radial-gradient(circle, #B8D8C0 0%, rgba(184,216,192,.5) 30%, rgba(0,0,0,0) 70%)'
};
const GRAIN_BG = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

function Grain({ o = .5 }) {
  return <div style={{position:'absolute',inset:0,pointerEvents:'none',opacity:o,mixBlendMode:'overlay',backgroundImage:GRAIN_BG,zIndex:20}}></div>;
}

function Rings({ size, color = '#fff', o = .75, style }) {
  const s = { stroke: color, fill: 'none' };
  return (
    <svg viewBox="0 0 440 440" style={{position:'absolute',width:size,height:size,overflow:'visible',pointerEvents:'none',...style}}>
      <circle cx="220" cy="220" r="236" {...s} strokeOpacity={o*.55} strokeWidth=".8" strokeDasharray="1.5 5"></circle>
      <circle cx="220" cy="220" r="214" {...s} strokeOpacity={o} strokeWidth=".9"></circle>
      <circle cx="220" cy="220" r="168" {...s} strokeOpacity={o*.7} strokeWidth=".8"></circle>
      <circle cx="220" cy="220" r="120" {...s} strokeOpacity={o*.55} strokeWidth=".8" strokeDasharray="1.5 4"></circle>
      {[[220,6],[220,434],[6,220],[434,220]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3.2" fill={color} fillOpacity={o}></circle>)}
    </svg>
  );
}

// Half aura: spectrum cut on a vertical divide, full linework around it.
function HalfAura({ size, x, y, ring = '#fff', ringO = .75, full = false, kind = 'spectrum', breathe = false }) {
  const clip = full ? 'none' : 'inset(0 0 0 50%)';
  const box = { position:'absolute', width:size, height:size, left:x - size/2, top:y - size/2, borderRadius:'50%' };
  return (
    <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
      <div style={{...box, width:size*1.35, height:size*1.35, left:x-size*.675, top:y-size*.675, background:AURA.coral, opacity:.5, filter:'blur(12px)', clipPath:clip}}></div>
      <div className={breathe ? 'cx-breathe' : ''} style={{...box, background:AURA[kind], filter:'blur(3px)', clipPath:clip}}></div>
      <Rings size={size} color={ring} o={ringO} style={{left:x-size/2, top:y-size/2}}></Rings>
    </div>
  );
}

function Glow({ size, x, y, kind = 'coral', blur = 8, o = 1 }) {
  return <div style={{position:'absolute',width:size,height:size,left:x-size/2,top:y-size/2,borderRadius:'50%',background:AURA[kind],filter:`blur(${blur}px)`,opacity:o,pointerEvents:'none'}}></div>;
}

function Lbl({ children, style, wide }) {
  return <span style={{fontFamily:FX.mono,fontWeight:700,fontSize:11,letterSpacing:wide?'.32em':'.18em',textTransform:'uppercase',whiteSpace:'nowrap',...style}}>{children}</span>;
}

function Serif({ children, size = 40, style, as = 'h2' }) {
  const T = as;
  return <T style={{fontFamily:FX.serif,fontWeight:400,fontSize:size,lineHeight:1.06,letterSpacing:'-.02em',margin:0,textWrap:'balance',...style}}>{children}</T>;
}

function Btn({ children, onClick, kind = 'k', style, disabled }) {
  const [h, setH] = React.useState(false);
  const k = {
    k:{background:h?CX.dg:CX.ch,color:'#fff',border:'none'},
    w:{background:h?CX.linen:'#fff',color:CX.ch,border:'none'},
    o:{background:'transparent',color:'inherit',border:'1.5px solid currentColor'},
    t:{background:'transparent',color:'inherit',border:'none',padding:0}
  }[kind];
  return (
    <button onClick={disabled?undefined:onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{height:48,padding:'0 22px',borderRadius:4,fontFamily:FX.sans,fontWeight:700,fontSize:16,letterSpacing:'-.01em',display:'inline-flex',alignItems:'center',gap:12,cursor:disabled?'default':'pointer',opacity:disabled?.4:1,transition:'background .15s',whiteSpace:'nowrap',flexShrink:0,...k,...style}}>
      {children}
    </button>
  );
}
const Arrow = () => <span style={{fontFamily:FX.mono,fontWeight:400}}>→</span>;

function Logo({ dark, h = 22, mark }) {
  return <img src={mark ? 'assets/session/conduxt-mark.png' : 'assets/session/conduxt-lockup.png'} alt="Conduxt" style={{height:h,width:'auto',display:'block',filter:dark?'invert(1)':'none'}}></img>;
}

function Dot({ size = 28, seed = 0 }) {
  const g = [
    'radial-gradient(circle,#6B9BD4,#FFB6E3 55%,#DDD1C1)','radial-gradient(circle,#FF6B5A,#FFB6E3 50%,#CBC064)',
    'radial-gradient(circle,#CBC064,#F5E6D0 50%,#8FA590)','radial-gradient(circle,#A86B47,#FFB6E3 55%,#DDD1C1)',
    'radial-gradient(circle,#6E8674,#6B9BD4 50%,#FFB6E3)','radial-gradient(circle,#FFB6E3,#FF6B5A 50%,#CBC064)'
  ];
  return <span style={{width:size,height:size,borderRadius:'50%',flexShrink:0,display:'inline-block',background:g[seed % g.length]}}></span>;
}

Object.assign(window, { CX, FX, DeviceCtx, useMobile, AURA, Grain, Rings, HalfAura, Glow, Lbl, Serif, Btn, Arrow, Logo, Dot });
