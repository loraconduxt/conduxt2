function useWidth() {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(() => { const f = () => setW(window.innerWidth); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  return w;
}

// Half aura by default; opens to full on hover when interactive.
function personalAura(traits) {
  const stops = [0, 22, 44, 62, 80];
  const al = ['FF','F2','E0','CC','A6'];
  return 'radial-gradient(circle, ' + traits.slice(0,5).map((t,i)=>t.c+al[i]+' '+stops[i]+'%').join(', ') + ', rgba(221,209,193,0) 100%)';
}
function AuraOrb({ size, kind = 'spectrum', grad, full = false, onClick, ring = '#fff', ringO = .75, breathe, children }) {
  const [h, setH] = React.useState(false);
  const open = full || h;
  const clip = open ? 'inset(0 0 0 0%)' : 'inset(0 0 0 50%)';
  const tr = 'clip-path .9s cubic-bezier(.2,.7,.2,1), opacity .6s';
  return (
    <div onClick={onClick} onMouseEnter={()=>onClick&&setH(true)} onMouseLeave={()=>setH(false)}
      role={onClick ? 'button' : undefined} aria-label={onClick ? 'Ask about your patterns' : undefined}
      style={{position:'relative',width:size,height:size,cursor:onClick?'pointer':'default',flexShrink:0}}>
      <div style={{position:'absolute',inset:'-16%',borderRadius:'50%',background:AURA.coral,opacity:.42,filter:'blur(14px)',clipPath:clip,transition:tr}}></div>
      {grad ? <div className={breathe ? 'cx-breathe' : ''} style={{position:'absolute',inset:0,borderRadius:'50%',background:grad,filter:'blur(3px)',clipPath:clip,transition:tr}}></div>
      : Object.keys(AURA).map(k => (
        <div key={k} className={breathe ? 'cx-breathe' : ''} style={{position:'absolute',inset:0,borderRadius:'50%',background:AURA[k],filter:'blur(3px)',clipPath:clip,opacity:k===kind?1:0,transition:tr}}></div>
      ))}
      <Rings size={size} color={ring} o={ringO} style={{left:0,top:0}}></Rings>
      {children}
    </div>
  );
}

Object.assign(window, { useWidth, AuraOrb, personalAura });
