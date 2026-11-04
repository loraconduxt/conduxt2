const D = window.DAILY;
const IT = { color:'#F3EFE4' };

function TopBar({ view, setView, dark }) {
  const w = useWidth(), m = w < 760;
  const c = dark ? '#fff' : CX.ch;
  const tab = (k, l) => (
    <button onClick={()=>setView(k)} style={{background:'none',border:'none',padding:'12px 0',cursor:'pointer',color:c,display:'flex',alignItems:'center',gap:8,opacity:view===k?1:.7}}>
      <span style={{width:6,height:6,borderRadius:'50%',background:view===k?CX.apple:'transparent'}}></span><Lbl style={{fontSize:m?10:11}}>{l}</Lbl>
    </button>
  );
  return (
    <div style={{position:'relative',zIndex:10,display:'flex',justifyContent:'space-between',alignItems:'center',padding:m?'18px 20px':'28px 56px',color:c}}>
      <Logo dark={dark} h={m?16:20}></Logo>
      <div style={{display:'flex',alignItems:'center',gap:m?16:32}}>{tab('today','Today')}{tab('book','Your patterns')}{tab('team','Team')}<Dot size={m?28:32} seed={0}></Dot></div>
    </div>
  );
}

function Today({ setView, openAsk, openInsight }) {
  const w = useWidth(), m = w < 760;
  const [mo, setMo] = React.useState(null);
  const [i, setI] = React.useState(0);
  const [kept, setKept] = React.useState(false);
  const M = D.moments.find(x => x.k === mo);
  const list = D.reminders[mo || 'today'];
  const R = list[i % list.length];
  const bg = M ? M.bg : CX.sage;
  const ink = M ? M.ink : '#fff';
  const lightInk = ink === '#fff' || ink === '#FFFFFF';
  const kind = M ? M.kind : 'spectrum';
  const vh = window.innerHeight;
  const orb = m ? Math.min(260, w * .7, (vh - 420) * .9) : Math.max(220, Math.min(560, w * .4, (vh - 300) * .95));
  const pick = k => { setMo(mo === k ? null : k); setI(0); setKept(false); };
  const date = new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });

  return (
    <div>
      <section style={{position:'relative',minHeight:'100vh',background:bg,color:ink,overflow:'hidden',transition:'background 1s ease',display:'flex',flexDirection:'column'}}>
        <Grain></Grain>
        <TopBar view="today" setView={setView} dark={lightInk}></TopBar>
        <div style={{position:'relative',zIndex:5,flex:1,display:'grid',gridTemplateColumns:m?'1fr':'minmax(0,1fr) auto',alignItems:'center',gap:m?8:40,padding:m?'0 20px':'0 56px'}}>
          <div key={(mo||'t')+i} className="cx-fade" style={{display:'flex',flexDirection:'column',gap:m?14:Math.min(28, vh*.035),maxWidth:680,order:m?2:1}}>
            <Lbl>{date} · {M ? M.t : 'Today’s move'}</Lbl>
            <Serif as="h1" size={m?40:Math.min(88, w*.06, vh*.11)}>{R.h[0]}<em style={lightInk?IT:{color:CX.dg}}>{R.h[1]}</em></Serif>
            <p style={{fontSize:m?17:20,lineHeight:1.5,margin:0,maxWidth:520}}>{R.b}</p>
            <div style={{display:'flex',alignItems:'center',gap:m?14:24,flexWrap:'wrap'}}>
              <Btn kind={kept?'o':'w'} onClick={()=>setKept(!kept)} style={{height:44}}>{kept ? 'Kept for today ✓' : 'Keep this today'}</Btn>
              <Btn kind="t" onClick={()=>{setI(i+1);setKept(false);}} style={{height:44,color:ink}}>Another <span style={{fontFamily:FX.mono}}>↻</span></Btn>
              <button onClick={()=>openInsight(R.ins)} style={{background:'none',border:'none',padding:0,color:ink,cursor:'pointer',opacity:.85}}><Lbl style={{fontSize:10}}>From your book: {D.insights[R.ins].t.join('').replace('.','')} →</Lbl></button>
            </div>
          </div>
          <div style={{order:m?1:2,justifySelf:m?'center':'end',display:'flex',flexDirection:'column',alignItems:'center',gap:10,marginRight:m?0:-40}}>
            <AuraOrb size={orb} grad={personalAura(D.traits)} onClick={()=>openAsk(mo)}>
              <img src="assets/session/conduxt-mark.png" alt="" style={{position:'absolute',left:'50%',top:'50%',height:orb*.11,transform:'translate(-50%,-50%)',filter:'invert(1)',pointerEvents:'none'}}></img>
            </AuraOrb>
            <Lbl wide style={{fontSize:10,opacity:.9}}>Tap your patterns · ask deeper</Lbl>
          </div>
        </div>
        <div style={{position:'relative',zIndex:5,padding:m?'16px 20px 20px':'12px 56px 28px',display:'flex',flexDirection:'column',gap:12}}>
          <div style={{display:'flex',justifyContent:'space-between'}}><Lbl>Any moment at work</Lbl>{mo && <button onClick={()=>pick(mo)} style={{background:'none',border:'none',color:ink,cursor:'pointer',padding:0}}><Lbl style={{fontSize:10}}>Back to today ×</Lbl></button>}</div>
          <div style={{display:'grid',gridTemplateColumns:m?'repeat(2,minmax(0,1fr))':'repeat(5,minmax(0,1fr))',gap:m?8:12}}>
            {D.moments.map(x => { const on = mo === x.k; return (
              <button key={x.k} onClick={()=>pick(x.k)} style={{minHeight:m?64:Math.min(96, Math.max(72, vh*.1)),borderRadius:6,border:on?'none':'1px solid rgba(255,255,255,.45)',background:on?'#fff':'rgba(255,255,255,.06)',color:on?CX.ch:'#fff',display:'flex',alignItems:'center',gap:m?10:16,padding:m?'12px 14px':'18px 22px',cursor:'pointer',textAlign:'left',transition:'all .25s',backdropFilter:'blur(4px)'}}>
                <span style={{width:m?26:36,height:m?26:36,borderRadius:'50%',flexShrink:0,background:x.bg,boxShadow:'0 0 0 3px rgba(255,255,255,.35)'}}></span>
                <span style={{display:'flex',flexDirection:'column',gap:4,minWidth:0}}>
                  <span style={{fontFamily:FX.serif,fontSize:m?18:24,lineHeight:1.1}}>{x.t}</span>
                  {!m && <span style={{fontSize:14,opacity:.8}}>{x.d}</span>}
                </span>
              </button>); })}
          </div>
        </div>
      </section>
    </div>
  );
}

const CTX_ASK = {
  'Slack': { off:'Ask about anyone you’re messaging — based on how they work.', on:'Ask about who you’re talking to.', q:['How should I message Maya?','Why is Dev slow to reply?'] },
  'Google Calendar': { off:'Ask about anyone you’re meeting — before you walk in.', on:'Ask about who you’re meeting today.', q:['How do I prep for my 2pm with Sam?','Who needs the most context tomorrow?'] },
  'Zoom': { off:'Ask how a call went — and where tension rose.', on:'Ask about your recent calls.', q:['Where did my last call get tense?'] },
  'Notion': { off:'Ask how to plan your work around your best hours.', on:'Ask about what’s on your plate.', q:['What should I protect time for this week?'] },
  'LinkedIn': { off:'Ask how to turn your patterns into your brand.', on:'Ask about your professional brand.', q:['Rewrite my headline in my voice'] }
};
function Ask({ ctx, onClose, prefill, title, theme, auraGrad, people }) {
  const w = useWidth(), m = w < 760;
  const M = D.moments.find(x => x.k === ctx);
  const TH = M || theme;
  const bg = TH ? TH.bg : CX.sageD;
  const ink = TH ? TH.ink : '#fff';
  const line = ink === '#fff' || ink === '#FFFFFF' ? 'rgba(255,255,255,.6)' : 'rgba(32,34,33,.45)';
  const lightInk = line.startsWith('rgba(255');
  const [msgs, setMsgs] = React.useState([]);
  const [v, setV] = React.useState(prefill || '');
  const inputRef = React.useRef(null);
  const tool = M && !people && window.CTX_TOOLS ? window.CTX_TOOLS.find(t=>t.for===M.t) : null;
  const [conn, setConn] = React.useState(()=>{try{return JSON.parse(localStorage.getItem('cx-conn'))||{}}catch(e){return {}}});
  const toggleConn = n => { const c = { ...conn, [n]: !conn[n] }; setConn(c); localStorage.setItem('cx-conn', JSON.stringify(c)); };
  const [who, setWho] = React.useState([]);
  const roster = people && window.TEAM ? window.TEAM.members.filter(p=>!p.you) : null;
  const whoNames = roster ? roster.filter(p=>who.includes(p.id)).map(p=>p.n.split(' ')[0]) : [];
  const [busy, setBusy] = React.useState(false);
  const [shown, setShown] = React.useState(false);
  const scroller = React.useRef(null);
  React.useEffect(()=>{ requestAnimationFrame(()=>setShown(true)); if (prefill) setTimeout(()=>{ const el=inputRef.current; if(el){ el.focus(); el.setSelectionRange(el.value.length, el.value.length); } }, 400); const k=e=>e.key==='Escape'&&onClose(); addEventListener('keydown',k); return ()=>removeEventListener('keydown',k); },[]);
  React.useEffect(()=>{ if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight; },[msgs, busy]);
  const qs = (people && D.teamQuestions[ctx]) || D.questions[ctx && D.questions[ctx] ? ctx : 'today'];
  const ask = async q => {
    if (!q.trim() || busy) return;
    const shown = whoNames.length ? q + ' (with ' + whoNames.join(', ') + ')' : q;
    setMsgs(x => [...x, { me:true, t:shown }]); setV(''); setBusy(true);
    const CO = window.COACH;
    const hit = CO && CO.answers[q];
    let a = null, recs = null;
    const prior = msgs.slice(-4).map(x => (x.me ? 'They asked: ' : 'You answered: ') + x.t).join('\n');
    const T = window.TEAM;
    const teamCtx = people && T && T.members ? 'Team members: ' + T.members.map(p=>p.n.split(' ')[0]+(p.you?' (the person asking)':'')+' — '+p.p).join('; ') + '.' : '';
    const whoCtx = whoNames.length && T ? 'People involved in this situation: ' + T.members.filter(p=>who.includes(p.id)).map(p=>p.n.split(' ')[0]+' ('+p.p+')').join('; ') + '.' : '';
    try {
      const CL = (()=>{ try { if (window.top !== window && window.top.claude && window.top.claude.complete) return window.top.claude; } catch(e){} return window.claude; })();
      const DEMO = true;
      if (DEMO) await new Promise(r => setTimeout(r, 900));
      if (!DEMO && CL && CL.complete) {
        const prompt = `You are Conduxt, a calm, direct workplace coach who knows this person deeply. Here is their full measured profile:
${CO ? CO.profile() : D.pattern}
${M ? 'They are in the work moment: ' + M.t + ' (' + M.d + ').' : ''}${title ? ' They are reading their insight: ' + title + '.' : ''}
${teamCtx}${whoCtx}
${prior ? 'Conversation so far:\n' + prior : ''}
${people ? 'This is a TEAM conversation: speak to the team using we/our/us language, never you/your/I. ' : ''}Rules: Be deeply personal. Explicitly connect the advice to at least two of their specific patterns or assessment results above (for example their chronotype, ENFP, 3w2, DISC iD, Projector, Strategist, words of affirmation, their measured positions) — name them naturally, never as a list. Never give advice that would fit anyone. Answer in 2–3 short sentences of plain prose; the first sentence is the takeaway. Wrap the single most useful phrase in **double asterisks**. Warm, no exclamation marks, no preamble.
Then, on new lines, give exactly three concrete recommendations tailored to their patterns that they can do this week, each on its own line starting with "TRY: " (under 16 words each).
Question: ${q}`;
        a = await Promise.race([CL.complete(prompt), new Promise(res=>setTimeout(()=>res(null), 8000))]);
      }
    } catch (e) { a = null; }
    if (a && typeof a === 'string') {
      const lines = a.split('\n').map(s=>s.trim()).filter(Boolean);
      const isT = s=>/^[-•*\d.\s]*TRY:/i.test(s);
      const tr = lines.filter(isT).map(s=>s.replace(/^[-•*\d.\s]*TRY:\s*/i,''));
      a = lines.filter(s=>!isT(s)).join(' ').trim();
      if (tr.length) recs = tr.slice(0,3);
    } else a = null;
    if (!a) {
      const f = hit || (CO ? CO.match(q, !!people) : null);
      a = f ? f.a : 'Start with your pattern: you think first and speak in conclusions. **Share how you got there**, then ask what the other person sees.';
      recs = f ? f.r : null;
      if (people && whoNames.length && !hit) a = `With ${whoNames.join(' and ')} involved: ` + a.charAt(0).toLowerCase() + a.slice(1);
    }
    if (!recs) { const f = hit || (CO && CO.match(q, !!people)); recs = f ? f.r : null; }
    const based = CO && CO.basis ? CO.basis(q) : [];
    setMsgs(x => [...x, { me:false, t:a, r:recs, b:based }]); setBusy(false);
  };
  const rich = (t, lead) => t.split(/\*\*(.+?)\*\*/g).map((p,j)=> j%2 ? (lead ? <em key={j}>{p}</em> : <strong key={j} style={{fontWeight:700}}>{p}</strong>) : p);
  const started = msgs.length > 0;
  const vh2 = window.innerHeight;
  const orb = started ? (m ? 72 : 96) : Math.max(roster && vh2 < 700 ? 64 : 140, Math.min(m ? 280 : 420, w*.75, vh2 - (roster ? 470 : 380)));
  return (
    <div style={{position:'fixed',inset:0,zIndex:100,background:bg,color:ink,display:'flex',flexDirection:'column',opacity:shown?1:0,transition:'opacity .5s'}}>
      <Grain></Grain>
      <div style={{position:'relative',zIndex:10,display:'flex',justifyContent:'space-between',alignItems:'center',padding:m?'18px 20px':'28px 56px'}}>
        <Lbl wide>Think it through{title && title.startsWith('Team') || title==='Your team' ? ' together' : ''}{M ? ' · ' + M.t : title ? ' · ' + title : ''}</Lbl>
        <button onClick={onClose} aria-label="Close" style={{width:44,height:44,borderRadius:'50%',border:'1px solid '+line,background:'transparent',color:ink,cursor:'pointer',fontFamily:FX.mono,fontSize:18}}>×</button>
      </div>
      <div style={{position:'relative',zIndex:5,display:'flex',justifyContent:'center',padding:started?'0 0 8px':(m?'24px 0':'8px 0'),transition:'padding .6s'}}>
        <div style={{transition:'all .8s cubic-bezier(.2,.7,.2,1)',width:orb,height:orb}}>
          <AuraOrb size={orb} grad={auraGrad || personalAura(D.traits)} full breathe={!busy} ring={ink} ringO={lightInk?.75:.45}>
            <img src="assets/session/conduxt-mark.png" alt="" className={busy?'cx-pulse':''} style={{position:'absolute',left:'50%',top:'50%',height:orb*.12,transform:'translate(-50%,-50%)',filter:lightInk?'invert(1)':'none'}}></img>
          </AuraOrb>
        </div>
      </div>
      <div ref={scroller} style={{position:'relative',zIndex:5,flex:1,minHeight:72,overflow:'auto',padding:m?'8px 20px':'8px 56px'}}>
        <div style={{maxWidth:760,margin:'0 auto',display:'flex',flexDirection:'column',gap:m?20:28}}>
          {!started && <Serif size={roster && vh2 < 700 ? (m?24:32) : (m?30:44)} style={{textAlign:'center',flexShrink:0}}>{people ? <>What do we want to <em style={lightInk?IT:{color:CX.dg}}>understand</em> today?</> : <>What do you want to <em style={lightInk?IT:{color:CX.dg}}>understand</em> today?</>}</Serif>}
          {msgs.map((x,i) => x.me
            ? <Lbl key={i} style={{fontSize:11,opacity:.85,whiteSpace:'normal',lineHeight:1.6}}>— {x.t}</Lbl>
            : <div key={i} className="cx-fade" style={{display:'flex',flexDirection:'column',gap:14}}>
                {(()=>{const ss=x.t.match(/[^.!?]+[.!?]+[”"]?/g)||[x.t], lead=ss[0], rest=ss.slice(1).join(' ').trim();return (<>
                  <p style={{fontFamily:FX.serif,fontSize:m?22:26,lineHeight:1.35,margin:0,letterSpacing:'-.005em',maxWidth:680}}>{rich(lead.trim(),true)}</p>
                  {rest && <p style={{fontFamily:FX.sans,fontSize:m?16:17,lineHeight:1.65,margin:0,maxWidth:640}}>{rich(rest)}</p>}
                </>);})()}
                {x.b && x.b.length > 0 && (
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
                    <Lbl style={{fontSize:10,opacity:.75,marginRight:4}}>Drawn from your</Lbl>
                    {x.b.map(b=><span key={b} style={{fontFamily:FX.mono,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',padding:'5px 10px',borderRadius:999,border:'1px solid '+line}}>{b}</span>)}
                  </div>)}
                {x.r && x.r.length > 0 && (
                  <div style={{display:'flex',flexDirection:'column',gap:10,maxWidth:640,paddingTop:14,borderTop:'1px solid '+line}}>
                    <Lbl style={{fontSize:10,opacity:.8}}>{people ? 'Try this as a team' : 'Try this week'}</Lbl>
                    {x.r.map((r,k)=>(
                      <div key={k} style={{display:'flex',gap:12,alignItems:'baseline'}}>
                        <span style={{fontFamily:FX.mono,fontSize:11,opacity:.75,flexShrink:0}}>0{k+1}</span>
                        <span style={{fontFamily:FX.sans,fontSize:m?15:16,lineHeight:1.5}}>{rich(r)}</span>
                      </div>))}
                  </div>)}
                {tool && i===msgs.length-1 && !busy && (()=>{const con=conn[tool.n], X=CTX_ASK[tool.n]||{};return (
                  <div className="cx-fade" style={{display:'flex',flexDirection:'column',gap:12,marginTop:6,padding:m?'16px':'18px 20px',borderRadius:6,border:'1px solid '+line,background:lightInk?'rgba(255,255,255,.12)':'rgba(255,255,255,.4)'}}>
                    <div style={{display:'flex',alignItems:'center',gap:12}}>
                      <span style={{width:36,height:36,borderRadius:8,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><img src={tool.src} alt="" style={{width:20,height:20,display:'block'}}></img></span>
                      <span style={{display:'flex',flexDirection:'column',gap:3,flex:1,minWidth:0}}>
                        <Lbl style={{fontSize:10,opacity:.8}}>{con ? tool.n+' · connected' : 'Integrate '+tool.n}</Lbl>
                        <span style={{fontFamily:FX.serif,fontSize:m?18:20,lineHeight:1.25}}>{con ? X.on : X.off}</span>
                      </span>
                      {!con && <Btn kind={lightInk?'w':'k'} onClick={()=>toggleConn(tool.n)} style={{height:44,flexShrink:0}}>Connect</Btn>}
                    </div>
                    {con && X.q && <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{X.q.map(q=><button key={q} onClick={()=>ask(q)} style={{minHeight:40,borderRadius:999,border:'1px solid '+line,background:'transparent',color:ink,padding:'0 14px',fontFamily:FX.sans,fontSize:14,cursor:'pointer'}}>{q}</button>)}</div>}
                  </div>);})()}
              </div>)}
          {busy && <Lbl style={{fontSize:10,opacity:.7}}>Reading your {D.insightCount || 22} patterns…</Lbl>}
        </div>
      </div>
      <div style={{position:'relative',zIndex:5,padding:m?'10px 20px 20px':'12px 56px 28px'}}>
        <div style={{maxWidth:760,margin:'0 auto',display:'flex',flexDirection:'column',gap:12}}>
          {roster && (
            <div style={{display:'flex',alignItems:'center',gap:8,overflowX:'auto',paddingBottom:2}}>
              <Lbl style={{fontSize:10,flexShrink:0,marginRight:4}}>Who’s involved</Lbl>
              {roster.map(p=>{const on=who.includes(p.id);return(
                <button key={p.id} onClick={()=>setWho(on?who.filter(i=>i!==p.id):[...who,p.id])} aria-pressed={on} style={{flexShrink:0,minHeight:44,display:'flex',alignItems:'center',gap:8,padding:'0 14px 0 6px',borderRadius:999,border:'1px solid '+(on?ink:line),background:on?(lightInk?'rgba(255,255,255,.22)':'rgba(32,34,33,.1)'):'transparent',color:ink,cursor:'pointer',fontFamily:FX.sans,fontSize:14,transition:'all .2s'}}>
                  <MemberDot m={p} size={30} ring={false}></MemberDot>{p.n.split(' ')[0]}{on && <span style={{fontFamily:FX.mono,fontSize:12}}>✓</span>}
                </button>);})}
            </div>
          )}
          <div style={{display:'flex',gap:8,flexWrap:started?'nowrap':'wrap',overflowX:'auto',justifyContent:started?'flex-start':'center'}}>
            {(prefill && !started ? [] : roster && vh2 < 700 && !started ? qs.slice(0,1) : started ? qs.filter(q=>!msgs.some(x=>x.t===q)).slice(0,1) : qs).map(q => <button key={q} onClick={()=>ask(q)} style={{whiteSpace:'nowrap',flexShrink:0,minHeight:40,borderRadius:999,border:'1px solid '+line,background:'transparent',color:ink,padding:'0 16px',fontFamily:FX.sans,fontSize:14,cursor:'pointer'}}>{q}</button>)}
          </div>
          <div style={{display:'flex',gap:8}}>
            <input ref={inputRef} value={v} onChange={e=>setV(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask(v)} placeholder={roster ? (whoNames.length ? 'What’s happening with us and ' + whoNames.join(', ') + '?' : 'Pick who’s involved, then describe what we’re facing…') : 'Ask anything about how you work…'} style={{flex:1,minWidth:0,height:52,borderRadius:4,border:'none',padding:'0 16px',fontFamily:FX.sans,fontSize:16,color:CX.ch,outline:'none'}}></input>
            <Btn kind="k" onClick={()=>ask(v)} style={{height:52}}>Ask</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TopBar, Today, Ask });
