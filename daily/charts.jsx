// Alternate displays for "You vs. everyone" data + an all-scales map for the overview.
const CHART_KEY = 'cx-chart-style';
const CHART_OPTS = [['curve','Curve'],['spectrum','Spectrum'],['rank','Ranking']];
const specStats = (you) => {
  const mu = .5, sd = .2;
  const erf = x => { const s = Math.sign(x), a = Math.abs(x), t = 1/(1+.3275911*a); return s*(1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-a*a)); };
  const cdf = x => .5*(1+erf((x-mu)/(sd*Math.SQRT2)));
  const left = you < mu;
  return { left, pct: Math.round((left ? 1-cdf(you) : cdf(you))*100) };
};

function useChartStyle() {
  const [s, setS] = React.useState(() => localStorage.getItem(CHART_KEY) || 'curve');
  React.useEffect(() => { const f = e => e.detail && setS(e.detail); window.addEventListener('cx-chart', f); return () => window.removeEventListener('cx-chart', f); }, []);
  const set = v => { localStorage.setItem(CHART_KEY, v); setS(v); window.dispatchEvent(new CustomEvent('cx-chart', { detail: v })); };
  return [s, set];
}

function ChartSwitch({ value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Chart style" style={{display:'flex',gap:2,padding:2,borderRadius:999,background:CX.linen,maxWidth:'100%',overflowX:'auto'}}>
      {CHART_OPTS.map(([k,l]) => { const on = value === k; return (
        <button key={k} role="radio" aria-checked={on} onClick={()=>onChange(k)} style={{minHeight:32,padding:'0 10px',flexShrink:0,borderRadius:999,border:'none',background:on?CX.ch:'transparent',color:on?'#fff':CX.ch,cursor:'pointer',fontFamily:FX.mono,fontSize:10,letterSpacing:'.14em',textTransform:'uppercase',transition:'all .2s'}}>{l}</button>); })}
    </div>
  );
}

function SpecHead({ sp }) {
  const [l, r, you] = sp, { left, pct } = specStats(you);
  return <span style={{fontSize:15,lineHeight:1.4}}>More <em style={{fontFamily:FX.serif,fontSize:17}}>{(left?l:r).toLowerCase()}</em> than <b>{pct}%</b> of people</span>;
}
function SpecFoot({ sp }) {
  const [l, r, you, src] = sp, left = you < .5;
  return (<>
    <div style={{display:'flex',justifyContent:'space-between',gap:12}}><Lbl style={{fontSize:10,color:left?CX.ch:CX.mg,whiteSpace:'normal'}}>{l}</Lbl><Lbl style={{fontSize:10,color:left?CX.mg:CX.ch,whiteSpace:'normal',textAlign:'right'}}>{r}</Lbl></div>
    {src && <span style={{fontSize:12,color:CX.mg}}>Scale: {src}</span>}
  </>);
}

function SpectrumBar({ sp, c }) {
  const you = sp[2];
  const [on, setOn] = React.useState(false);
  React.useEffect(()=>{ const t = setTimeout(()=>setOn(true), 120); return ()=>clearTimeout(t); },[]);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      <SpecHead sp={sp}></SpecHead>
      <div style={{position:'relative',height:44}}>
        <div style={{position:'absolute',left:0,right:0,top:20,height:4,borderRadius:2,background:CX.smoke}}></div>
        <div style={{position:'absolute',left:'30%',width:'40%',top:14,height:16,borderRadius:8,background:CX.linen,border:`1px dashed ${CX.g}`}}></div>
        <span style={{position:'absolute',left:'50%',top:36,transform:'translateX(-50%)'}}><Lbl style={{fontSize:10,color:CX.mg}}>Most people</Lbl></span>
        <div style={{position:'absolute',left:you<.5?(on?you*100:50)+'%':'50%',width:Math.abs((on?you:.5)-.5)*100+'%',top:20,height:4,background:c,transition:'all .9s cubic-bezier(.2,.7,.2,1)'}}></div>
        <div style={{position:'absolute',left:(on?you:.5)*100+'%',top:10,width:24,height:24,marginLeft:-12,borderRadius:'50%',background:CX.ch,boxShadow:`0 0 0 4px #fff, 0 0 0 5px ${c}`,transition:'left .9s cubic-bezier(.2,.7,.2,1)'}}></div>
        <span style={{position:'absolute',left:(on?you:.5)*100+'%',top:-10,transform:'translateX(-50%)',transition:'left .9s cubic-bezier(.2,.7,.2,1)'}}><Lbl style={{fontSize:10,color:CX.ch}}>You</Lbl></span>
      </div>
      <SpecFoot sp={sp}></SpecFoot>
    </div>
  );
}

function RankDots({ sp, c, m }) {
  const { pct } = specStats(sp[2]);
  const N = 50, filled = Math.round(pct/100*N);
  const [on, setOn] = React.useState(false);
  React.useEffect(()=>{ const t = setTimeout(()=>setOn(true), 120); return ()=>clearTimeout(t); },[]);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:12,minWidth:0}}>
      <div style={{display:'flex',alignItems:'baseline',gap:12,flexWrap:'wrap'}}>
        <span style={{fontFamily:FX.serif,fontSize:m?40:48,lineHeight:1}}>{pct}<span style={{fontSize:'.5em'}}>%</span></span>
        <Lbl style={{fontSize:10,color:CX.mg,whiteSpace:'normal'}}>of people sit behind you</Lbl>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10,minWidth:0}}>
        <SpecHead sp={sp}></SpecHead>
        <div style={{display:'grid',gridTemplateColumns:'repeat(25,minmax(0,1fr))',gap:m?3:4}}>
          {Array.from({length:N},(_,i)=>{ const isY = i===filled-1 || (filled===0&&i===0); return (
            <span key={i} style={{aspectRatio:'1',borderRadius:'50%',background:isY?CX.ch:(i<filled?c:CX.smoke),opacity:on?(isY?1:i<filled?.55:1):0,transform:on?'none':'scale(.4)',transition:`all .4s ease ${i*12}ms`}}></span>); })}
        </div>
        <SpecFoot sp={sp}></SpecFoot>
      </div>
    </div>
  );
}

function SpecChart({ sp, c, m, style }) {
  if (style === 'spectrum') return <SpectrumBar sp={sp} c={c}></SpectrumBar>;
  if (style === 'rank') return <RankDots sp={sp} c={c} m={m}></RankDots>;
  return <DistBar sp={sp} c={c} m={m}></DistBar>;
}

// Overview: every measured scale on one page, grouped by area.
function PatternMap({ onPick, m }) {
  const Dd = window.DAILY;
  const areas = Dd.chapters.filter(c => c.items.length > 1);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:m?18:22}}>
      {areas.map(a => (
        <div key={a.t} style={{display:'flex',flexDirection:'column',gap:8}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:10,height:10,borderRadius:'50%',background:a.bg}}></span><Lbl style={{fontSize:10,color:CX.ch}}>{a.t}</Lbl></div>
          {a.items.map(k => { const I = Dd.insights[k]; const sp = I && I.spec && I.spec[0]; if (!sp) return null; const [l, r, you] = sp; const left = you < .5; return (
            <button key={k} onClick={()=>onPick(k)} style={{display:'grid',gridTemplateColumns:m?'1fr':'minmax(0,140px) minmax(0,1fr) minmax(0,140px)',gap:m?4:12,alignItems:'center',background:'none',border:'none',padding:'6px 0',cursor:'pointer',color:CX.ch,textAlign:'left'}}>
              {!m && <span style={{fontSize:12,lineHeight:1.25,color:left?CX.ch:CX.mg,fontWeight:left?700:400}}>{l}</span>}
              {m && <span style={{display:'flex',justifyContent:'space-between',gap:8,fontSize:12}}><span style={{color:left?CX.ch:CX.mg,fontWeight:left?700:400}}>{l}</span><span style={{color:left?CX.mg:CX.ch,fontWeight:left?400:700,textAlign:'right'}}>{r}</span></span>}
              <span style={{position:'relative',height:16,display:'block'}}>
                <span style={{position:'absolute',left:0,right:0,top:7,height:2,background:CX.smoke}}></span>
                <span style={{position:'absolute',left:'50%',top:3,width:1,height:10,background:CX.g}}></span>
                <span style={{position:'absolute',left:Math.min(you,.5)*100+'%',width:Math.abs(you-.5)*100+'%',top:7,height:2,background:a.bg}}></span>
                <span style={{position:'absolute',left:you*100+'%',top:2,width:12,height:12,marginLeft:-6,borderRadius:'50%',background:a.bg,boxShadow:`0 0 0 2px #fff`}}></span>
              </span>
              {!m && <span style={{fontSize:12,lineHeight:1.25,textAlign:'right',color:left?CX.mg:CX.ch,fontWeight:left?400:700}}>{r}</span>}
            </button>); })}
        </div>))}
      <span style={{fontSize:12,color:CX.mg}}>The centre line is the average person. Tap any line to open that insight.</span>
    </div>
  );
}

Object.assign(window, { useChartStyle, ChartSwitch, SpecChart, SpectrumBar, RankDots, PatternMap });
