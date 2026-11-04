// Fit-to-screen: scales a block down so it never needs scrolling. Config lives in localStorage (cx-fit).
const FIT_KEY = 'cx-fit';
const FIT_DEF = { on: true, min: .4 };
const fitCfg = () => { try { return { ...FIT_DEF, ...JSON.parse(localStorage.getItem(FIT_KEY)) }; } catch(e) { return FIT_DEF; } };
function setFitCfg(p) { localStorage.setItem(FIT_KEY, JSON.stringify({ ...fitCfg(), ...p })); window.dispatchEvent(new Event('cx-fit')); }
function useFitCfg() {
  const [c, setC] = React.useState(fitCfg);
  React.useEffect(() => { const f = () => setC(fitCfg()); window.addEventListener('cx-fit', f); return () => window.removeEventListener('cx-fit', f); }, []);
  return c;
}
function useVH() {
  const [h, setH] = React.useState(window.innerHeight);
  React.useEffect(() => { const f = () => setH(window.innerHeight); window.addEventListener('resize', f); window.addEventListener('orientationchange', f); return () => { window.removeEventListener('resize', f); window.removeEventListener('orientationchange', f); }; }, []);
  return h;
}
// Fills its parent's free space (parent must give it a definite height). center: vertically centre when it fits.
function FitBox({ children, center = true, style }) {
  const cfg = useFitCfg();
  const outer = React.useRef(null), inner = React.useRef(null);
  const [f, setF] = React.useState({ s: 1, h: 0, H: 0 });
  React.useLayoutEffect(() => {
    const o = outer.current, i = inner.current; if (!o || !i) return;
    const measure = () => { const H = o.clientHeight, h = i.offsetHeight; let s = cfg.on && h > H && H > 0 ? H / h : 1; if (s < cfg.min) s = cfg.min; setF(p => (Math.abs(p.s - s) < .002 && p.h === h && p.H === H) ? p : { s, h, H }); };
    measure();
    const ro = new ResizeObserver(measure); ro.observe(o); ro.observe(i);
    return () => ro.disconnect();
  }, [cfg.on, cfg.min]);
  const vis = f.h * f.s, off = center ? Math.max(0, (f.H - vis) / 2) : 0;
  return (
    <div ref={outer} style={{position:'relative',flex:1,minHeight:0,width:'100%',overflowY:vis > f.H + 1 ? 'auto' : 'hidden',overflowX:'hidden',...style}}>
      <div ref={inner} style={{position:'absolute',left:0,right:0,top:0,transform:`translateY(${off}px) scale(${f.s})`,transformOrigin:'top center'}}>{children}</div>
      <div style={{height:vis + off}}></div>
    </div>
  );
}
Object.assign(window, { FitBox, useVH, useFitCfg, setFitCfg, fitCfg });
