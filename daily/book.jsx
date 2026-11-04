function Book({ setView, sel, setSel, openAsk }) {
  const w = useWidth(), m = w < 900;
  const Dd = window.DAILY;
  const chIdx = Math.max(0, Dd.chapters.findIndex(c => c.items.includes(sel)));
  const exFor = i => (Dd.chapters[i] && Dd.chapters[i].items.length === 1) ? 1 : i;
  const [ex, setEx] = React.useState(exFor(chIdx));
  const [reading, setReading] = React.useState(false);
  const [more, setMore] = React.useState(false);
  const [shared, setShared] = React.useState(null);
  const [chartStyle, setChartStyle] = useChartStyle();
  React.useEffect(()=>{ const i = Dd.chapters.findIndex(c => c.items.includes(sel)); if (i>=0) setEx(exFor(i)); setMore(false); if (scRef.current) scRef.current.scrollTop = 0; },[sel]);
  const scRef = React.useRef(null);
  const [atEnd, setAtEnd] = React.useState(false);
  const checkEnd = () => { const el = scRef.current; if (el) setAtEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 24); };
  React.useEffect(()=>{ const t = setTimeout(checkEnd, 80); window.addEventListener('resize', checkEnd); return ()=>{ clearTimeout(t); window.removeEventListener('resize', checkEnd); }; },[sel, more, w]);
  const I = Dd.insights[sel] || Dd.insights.overview;
  const chapter = Dd.chapters[chIdx];
  const total = Object.keys(Dd.insights).length - 1;
  const title = I.t.join('').replace('.','');
  const choose = id => { setSel(id); setReading(true); if (!m) window.scrollTo({top:0,behavior:'smooth'}); };
  const sentences = I.deep ? (I.deep.match(/[^.!?]+[.!?]+[”"]?/g) || [I.deep]) : [];
  const preview = sentences.slice(0,3).join(' ');
  const rest = sentences.slice(3).join(' ');
  const R = Dd.reminders.today[new Date().getDate() % Dd.reminders.today.length];
  const theme = { bg: (Dd.chapters[chIdx]||{}).bg, ink: (Dd.chapters[chIdx]||{}).ink };
  const askThis = () => openAsk(null, I.overview
    ? { theme, title:'Your pattern', prefill:'Looking at my whole pattern, what’s the one thing I should lean into this month?' }
    : { theme, title, prefill:`How does “${title.toLowerCase()}” show up for me at work — and what should I try this week?` });

  const toc = (
    <div style={{display:'flex',flexDirection:'column',borderTop:`1.5px solid ${CX.ch}`}}>
      {Dd.chapters.map((c,i)=>{const on=ex===i, single=c.items.length===1;return(
        <div key={c.t} style={{borderBottom:`1px solid ${CX.g}`}}>
          <button onClick={()=>single?choose(c.items[0]):setEx(on?-1:i)} style={{width:'100%',background:'none',border:'none',display:'grid',gridTemplateColumns:'28px 1fr auto',alignItems:'center',padding:m?'18px 0':'22px 0',cursor:'pointer',color:CX.ch,textAlign:'left'}}>
            <span style={{width:10,height:10,borderRadius:'50%',background:c.bg}}></span>
            <span style={{fontFamily:FX.serif,fontSize:m?21:28,lineHeight:1.15,fontStyle:single?'italic':'normal'}}>{c.t}</span>
            <span style={{fontFamily:FX.mono,fontSize:single?16:20,color:CX.mg}}>{single?'→':on?'–':'+'}</span>
          </button>
          {on && !single && (
            <div className="cx-fade" style={{padding:'0 0 22px 28px',display:'flex',gap:10,flexWrap:'wrap'}}>
              {c.items.map((id,j)=>{const act=sel===id&&(!m||reading);return(
                <button key={id} onClick={()=>choose(id)} style={{minHeight:44,borderRadius:999,border:`1px solid ${CX.ch}`,background:act?CX.ch:'transparent',color:act?'#fff':CX.ch,padding:'0 18px 0 8px',display:'flex',alignItems:'center',gap:10,cursor:'pointer',fontFamily:FX.sans,fontSize:15,transition:'all .2s'}}>
                  <span style={{width:28,height:28,borderRadius:'50%',flexShrink:0,background:`radial-gradient(circle, #fff 0%, ${c.bg} 60%)`,boxShadow:act?'0 0 0 2px rgba(255,255,255,.6)':'none'}}></span>{Dd.insights[id].t.join('').replace('.','')}<Arrow></Arrow>
                </button>);})}
            </div>
          )}
        </div>);})}
    </div>
  );

  const cardW = m ? w - 40 : (w - 128 - 56) * 1.2 / 2.05;
  const narrow = cardW < 620;
  const C = chapter;
  const lightInk = C.ink === '#FFFFFF';
  const bannerAura = C.kind === 'personal' ? { grad: personalAura(Dd.traits) } : { kind: C.kind };
  const P = m ? 20 : 44;
  const rule = { borderTop:`1px solid ${CX.ch}`, paddingTop:m?20:24 };
  const label = t => <Lbl style={{fontSize:10,color:CX.ch}}>{t}</Lbl>;
  const panel = { background:CX.linen, borderRadius:4, padding:m?18:24, display:'flex', flexDirection:'column', gap:14 };

  const share = k => { const url = location.href.split('#')[0]; if (k==='li') window.open('https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(url),'_blank'); else if (navigator.clipboard) navigator.clipboard.writeText(k==='text' ? Dd.brand.line + ' — my professional brand, by Conduxt' : url).catch(()=>{}); setShared(k); setTimeout(()=>setShared(null), 2200); };
  const sBtn = (k, l) => <button key={k} onClick={()=>share(k)} style={{minHeight:44,padding:'0 16px',borderRadius:999,border:`1px solid ${CX.ch}`,background:k==='li'?CX.ch:'transparent',color:k==='li'?'#fff':CX.ch,cursor:'pointer',fontFamily:FX.sans,fontSize:14,display:'flex',alignItems:'center',gap:8}}>{shared===k ? 'Copied ✓' : l}</button>;
  const overviewBody = (
    <>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <div style={{position:'relative',aspectRatio:narrow?'auto':'1.91 / 1',borderRadius:6,overflow:'hidden',background:CX.linen,border:`1px solid ${CX.smoke}`,color:CX.ch,padding:m?22:32,display:'grid',gridTemplateColumns:narrow?'1fr':'minmax(0,.8fr) minmax(0,1.2fr)',gridTemplateRows:narrow?'1fr auto':'1fr',alignItems:'center',gap:narrow?16:28}}>
          <Grain o={.2}></Grain>
          <div style={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center'}}><AuraOrb size={narrow?150:Math.min(240,cardW*.34)} grad={personalAura(Dd.traits)} full breathe ring={CX.ch} ringO={.22}></AuraOrb></div>
          <div style={{position:'relative',display:'flex',flexDirection:'column',gap:14,minWidth:0}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}><Lbl style={{fontSize:10,color:CX.mg}}>Professional brand</Lbl><Logo h={12}></Logo></div>
            <p style={{margin:0,fontFamily:FX.serif,fontSize:narrow?(m?22:26):30,lineHeight:1.2,textWrap:'pretty'}}>{Dd.brand.line}</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{Dd.brand.words.map((x,i)=><span key={x} style={{display:'flex',alignItems:'center',gap:8,background:'#fff',border:`1px solid ${CX.smoke}`,borderRadius:999,padding:'5px 12px'}}><span style={{width:8,height:8,borderRadius:'50%',background:Dd.traits[i].c}}></span><Lbl style={{fontSize:10,color:CX.ch}}>{x}</Lbl></span>)}</div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>{sBtn('li','Share on LinkedIn')}{sBtn('text','Copy text')}{sBtn('link','Copy link')}</div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:narrow?'1fr':'minmax(0,1fr) minmax(0,1fr)',gap:12}}>
        <div style={panel}>
          {label('Top 5 traits')}
          {Dd.traits.map((x,i)=>(
            <div key={x.t} style={{display:'grid',gridTemplateColumns:'14px 1fr',gap:12,alignItems:'start'}}>
              <span style={{width:12,height:12,borderRadius:'50%',background:x.c,marginTop:5}}></span>
              <span style={{display:'flex',flexDirection:'column',gap:2}}><span style={{fontFamily:FX.serif,fontSize:18}}>{x.t}</span><span style={{fontSize:14,color:CX.dg,lineHeight:1.4}}>{x.d}</span></span>
            </div>))}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div style={panel}>
            {label('Your reminder')}
            <p style={{margin:0,fontFamily:FX.serif,fontSize:m?20:22,lineHeight:1.25}}>{R.h[0]}<em style={{color:CX.mg}}>{R.h[1]}</em></p>
            <span style={{fontSize:14,color:CX.dg,lineHeight:1.45}}>{R.b}</span>
          </div>
        </div>
      </div>
      <div style={{...panel,background:'#fff',border:`1px solid ${CX.smoke}`}}>
        <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>{label('Your map · you vs. everyone')}<Lbl style={{fontSize:10,color:CX.mg}}>All areas at a glance</Lbl></div>
        <PatternMap onPick={choose} m={m}></PatternMap>
      </div>
      <div style={rule}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:14}}>{label('Your assessments')}<Lbl style={{fontSize:10,color:CX.mg}}>{Dd.results.length} synthesized</Lbl></div>
        <div style={{display:'grid',gridTemplateColumns:cardW<560?'repeat(2,minmax(0,1fr))':'repeat(3,minmax(0,1fr))',border:`1px solid ${CX.ch}`,borderRadius:4,overflow:'hidden'}}>
          {Dd.results.map((x,i)=>{const cols=cardW<560?2:3;return(
            <div key={x.a} style={{padding:m?14:18,display:'flex',flexDirection:'column',gap:6,borderRight:(i%cols)<cols-1?`1px solid ${CX.ch}`:'none',borderTop:i>=cols?`1px solid ${CX.ch}`:'none',minWidth:0}}>
              <Lbl style={{fontSize:10,color:CX.mg}}>{x.a}</Lbl>
              <span style={{fontFamily:FX.serif,fontSize:cardW<560?22:26,lineHeight:1.05,minWidth:0,overflowWrap:'anywhere'}}>{x.r}</span>
              <span style={{fontSize:13,color:CX.dg,lineHeight:1.35}}>{x.n}</span>
            </div>);})}
        </div>
      </div>
    </>
  );

  const insightBody = (
    <>
      {I.spec && <div style={{...panel,background:'#fff',border:`1px solid ${CX.smoke}`,gap:22}}>
        <div style={{display:'flex',flexDirection:'column',gap:12,minWidth:0}}>
          <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',minWidth:0}}>{label('You vs. everyone')}<Lbl style={{fontSize:10,color:CX.mg}}>Validated research scales</Lbl></div>
          <ChartSwitch value={chartStyle} onChange={setChartStyle}></ChartSwitch>
        </div>
        {I.spec.map(sp=><SpecChart key={sp[0]+chartStyle} sp={sp} c={C.bg} m={m} style={chartStyle}></SpecChart>)}
      </div>}
      <div style={{display:'grid',gridTemplateColumns:narrow?'1fr':'minmax(0,1.25fr) minmax(0,1fr)',gap:12}}>
        <div style={panel}>
          {label('What helps')}
          {I.helps.map((h,i)=><div key={i} style={{display:'grid',gridTemplateColumns:'30px 1fr',paddingTop:i?12:0,borderTop:i?`1px solid ${CX.g}`:'none',fontSize:16,lineHeight:1.45}}><span style={{fontFamily:FX.serif,fontSize:18,color:CX.mg}}>{i+1}</span><span>{h}</span></div>)}
        </div>
        <div style={{...panel,background:CX.ch,color:'#fff'}}>
          <Lbl style={{fontSize:10}}>Watch for</Lbl>
          {I.watch.map((x,i)=><div key={x} style={{display:'flex',gap:12,alignItems:'flex-start',fontSize:15,lineHeight:1.45,paddingTop:i?12:0,borderTop:i?'1px solid rgba(255,255,255,.25)':'none'}}><span style={{width:8,height:8,borderRadius:'50%',background:CX.coral,marginTop:7,flexShrink:0}}></span>{x}</div>)}
        </div>
      </div>
      <div style={rule}>
        <div style={{marginBottom:14}}>{label('Read deeper')}</div>
        <p style={{margin:0,fontSize:m?16:17,lineHeight:1.75,color:CX.ch}}>{preview}{more && rest ? ' ' + rest : ''}</p>
        {rest && <button onClick={()=>setMore(!more)} style={{marginTop:10,background:'none',border:'none',padding:'6px 0',cursor:'pointer',color:CX.ch}}><Lbl style={{fontSize:10}}>{more ? 'Show less –' : 'Keep reading +'}</Lbl></button>}
      </div>
    </>
  );

  const page = (
    <article key={sel} className="cx-fade" style={{background:'#fff',borderRadius:6,border:`1px solid ${CX.ch}`,overflow:'hidden',boxShadow:'0 20px 50px rgba(32,34,33,.10)'}}>
      <div style={{position:'relative',height:m?180:180,background:C.bg,color:C.ink,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',transition:'background .6s'}}>
        <AuraOrb size={m?150:150} {...bannerAura} full breathe ring={lightInk?'#fff':CX.ch} ringO={lightInk?.75:.45}></AuraOrb>
        <Grain></Grain>
        <div style={{position:'absolute',left:P,right:P,top:m?18:24,display:'flex',justifyContent:'space-between',gap:12,zIndex:5}}>
          <Lbl style={{minWidth:0,overflow:'hidden',textOverflow:'ellipsis'}}>{chapter.t}</Lbl>
          {m ? <button onClick={()=>setReading(false)} style={{background:'none',border:'none',color:C.ink,padding:0,cursor:'pointer',flexShrink:0}}><Lbl style={{fontSize:10}}>× Close</Lbl></button> : <Lbl style={{flexShrink:0}}>Your patterns</Lbl>}
        </div>
      </div>
      <div style={{padding:`${m?28:40}px ${P}px ${m?28:44}px`,display:'flex',flexDirection:'column',gap:m?24:32}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:14}}>
          <Serif size={m?36:52}>{I.t[0]}<em style={{color:CX.mg}}>{I.t[1]}</em></Serif>
          <p style={{fontFamily:FX.serif,fontSize:m?18:21,lineHeight:1.4,margin:0,color:CX.dg,maxWidth:520}}>{I.lead}</p>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
            {I.src.map(s=><span key={s} style={{border:`1px solid ${CX.g}`,borderRadius:999,padding:'5px 12px'}}><Lbl style={{fontSize:10,color:CX.dg}}>{s}</Lbl></span>)}
          </div>
        </div>
        {I.overview ? overviewBody : insightBody}
        <button onClick={askThis} style={{border:'none',borderRadius:4,background:C.bg,color:C.ink,padding:m?'16px 18px':'18px 22px',display:'flex',alignItems:'center',gap:16,cursor:'pointer',textAlign:'left'}}>
          <span style={{width:40,height:40,borderRadius:'50%',flexShrink:0,background:personalAura(Dd.traits),boxShadow:`0 0 0 2px ${lightInk?'rgba(255,255,255,.5)':'rgba(32,34,33,.25)'}`}}></span>
          <span style={{display:'flex',flexDirection:'column',gap:3,flex:1,minWidth:0}}>
            <span style={{fontFamily:FX.serif,fontSize:m?19:22}}>Ask about <em>this pattern</em></span>
            <span style={{fontSize:14,opacity:.85}}>We’ll start the question for you.</span>
          </span>
          <span style={{fontFamily:FX.mono,fontSize:18}}>→</span>
        </button>
      </div>
    </article>
  );

  return (
    <div style={{minHeight:'100vh',background:CX.linen,color:CX.ch}}>
      <CalmTop view="book" setView={setView}></CalmTop>
      <div style={{padding:m?'24px 20px 48px':'40px 64px 80px',display:'flex',flexDirection:'column',gap:m?24:44}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:16,flexWrap:'wrap'}}>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <Lbl style={{color:CX.mg}}>— Your patterns</Lbl>
            <Serif as="h1" size={m?40:72}>How you’re <em style={{color:CX.mg}}>built</em> to work.</Serif>
          </div>
          <Lbl style={{color:CX.mg}}>{Dd.insightCount || total} insights · {Dd.chapters.length - 1} areas</Lbl>
        </div>
        {m
          ? (reading ? page : toc)
          : <div style={{display:'grid',gridTemplateColumns:'minmax(0,.85fr) minmax(0,1.2fr)',gap:56,alignItems:'start'}}><div>{toc}</div><div style={{position:'sticky',top:24}}>
              <div ref={scRef} onScroll={checkEnd} style={{maxHeight:'calc(100vh - 48px)',overflowY:'auto',borderRadius:6,scrollbarWidth:'thin'}}>{page}</div>
              <button onClick={()=>scRef.current && scRef.current.scrollBy({top:scRef.current.clientHeight*.7,behavior:'smooth'})} style={{position:'absolute',left:1,right:1,bottom:1,height:110,border:'none',borderRadius:'0 0 6px 6px',background:'linear-gradient(to bottom, rgba(255,255,255,0), #fff 70%)',display:'flex',alignItems:'flex-end',justifyContent:'center',paddingBottom:18,cursor:'pointer',opacity:atEnd?0:1,pointerEvents:atEnd?'none':'auto',transition:'opacity .4s'}}>
                <span style={{display:'flex',alignItems:'center',gap:8,background:CX.ch,color:'#fff',borderRadius:999,padding:'8px 16px',boxShadow:'0 8px 20px rgba(32,34,33,.18)'}}><Lbl style={{fontSize:10}}>Scroll for more</Lbl><span style={{fontFamily:FX.mono}}>↓</span></span>
              </button>
            </div></div>}
      </div>
    </div>
  );
}

function DistBar({ sp, c, m }) {
  const [l, r, you, src] = sp, mu = .5, sd = .2;
  const N = m ? 25 : 37, yi = Math.round(you*(N-1));
  const g = x => Math.exp(-((x-mu)**2)/(2*sd*sd));
  const hs = Array.from({length:N}, (_,i) => g(i/(N-1)));
  const mx = Math.max(...hs);
  const erf = x => { const s = Math.sign(x), a = Math.abs(x), t = 1/(1+.3275911*a); return s*(1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-a*a)); };
  const cdf = x => .5*(1+erf((x-mu)/(sd*Math.SQRT2)));
  const left = you < mu, pct = Math.round((left ? 1-cdf(you) : cdf(you))*100);
  const [on, setOn] = React.useState(false);
  React.useEffect(()=>{ const t = setTimeout(()=>setOn(true), 120); return ()=>clearTimeout(t); },[]);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      <span style={{fontSize:15,lineHeight:1.4}}>More <em style={{fontFamily:FX.serif,fontSize:17}}>{(left?l:r).toLowerCase()}</em> than <b>{pct}%</b> of people</span>
      <div style={{position:'relative',display:'flex',alignItems:'flex-end',gap:2,height:m?56:68,paddingTop:22}}>
        {hs.map((h,i)=>{const isY=i===yi, side=left?i<yi:i>yi;return (
          <div key={i} style={{position:'relative',flex:1,height:on?Math.max(4,h/mx*100)+'%':'4%',borderRadius:'2px 2px 0 0',background:isY?CX.ch:side?c:CX.smoke,opacity:isY?1:side?.45:1,transition:`height .8s cubic-bezier(.2,.7,.2,1) ${i*14}ms`}}>
            {isY && <span style={{position:'absolute',left:'50%',bottom:'100%',transform:'translate(-50%,-6px)',display:'flex',flexDirection:'column',alignItems:'center',gap:3}}><Lbl style={{fontSize:10,color:CX.ch}}>You</Lbl></span>}
          </div>);})}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',gap:12,borderTop:`1px solid ${CX.g}`,paddingTop:8}}><Lbl style={{fontSize:10,color:left?CX.ch:CX.mg,whiteSpace:'normal'}}>{l}</Lbl><Lbl style={{fontSize:10,color:left?CX.mg:CX.ch,whiteSpace:'normal',textAlign:'right'}}>{r}</Lbl></div>
      {src && <span style={{fontSize:12,color:CX.mg}}>Scale: {src}</span>}
    </div>
  );
}
Object.assign(window, { Book, DistBar });
