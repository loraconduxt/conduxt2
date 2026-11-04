// Calm home: linen, centered aura, "What's on your mind?", five moments below.
function CalmTop({ view, setView, bg }) {
  const w = useWidth(), m = w < 760;
  const tab = (k, l) => {
    const on = view === k;
    return (
      <button onClick={()=>setView(k)} style={{height:m?60:80,padding:m?'0 10px':'0 18px',background:'transparent',border:'none',borderBottom:`2px solid ${on?CX.ch:'transparent'}`,cursor:'pointer',color:on?CX.ch:CX.mg,fontFamily:FX.sans,fontSize:m?14:16,whiteSpace:'nowrap'}}>{l}</button>
    );
  };
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',alignItems:'center',padding:m?'0 16px':'0 40px',borderBottom:`1px solid ${CX.smoke}`,background:bg || CX.linen,transition:'background .8s ease'}}>
      <div><Logo h={m?14:18}></Logo></div>
      <div style={{display:'flex'}}>{tab('today','Today')}{tab('book','Your patterns')}{tab('team','Team')}</div>
      <div style={{justifySelf:'end'}}><Dot size={m?28:32} seed={0}></Dot></div>
    </div>
  );
}

function HomeCalm({ setView, openAsk, openInsight, name = 'Lora' }) {
  const w = useWidth(), m = w < 760, vh = useVH();
  const D2 = window.DAILY;
  const [hover, setHover] = React.useState(null);
  const [conn, setConn] = React.useState(()=>{try{return JSON.parse(localStorage.getItem('cx-conn'))||{}}catch(e){return {}}});
  const toggleConn = n => { const c = { ...conn, [n]: !conn[n] }; setConn(c); localStorage.setItem('cx-conn', JSON.stringify(c)); };
  const M = D2.moments.find(x => x.k === hover);
  const stack = !m && w < 1180;

  const orb = m ? Math.max(110, Math.min(260, w * .62, vh - 470)) : Math.max(150, Math.min(420, vh - 560));
  const date = new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
  const R = D2.reminders.today[new Date().getDate() % D2.reminders.today.length];
  return (
    <div style={{height:'100dvh',minHeight:m?560:620,overflow:'hidden',background:M ? M.tint : CX.linen,transition:'background .8s ease',color:CX.ch,display:'flex',flexDirection:'column'}}>
      <CalmTop view="today" setView={setView} bg={M ? M.tint : CX.linen}></CalmTop>
      <div style={{padding:m?'18px 20px 0':vh<800?'24px 64px 0':'36px 64px 0',display:'flex',flexDirection:m?'column':'row',justifyContent:'space-between',alignItems:m?'flex-start':'flex-end',gap:m?10:16}}>
        <div style={{display:'flex',flexDirection:'column',gap:m?4:10}}>
          <span style={{fontSize:m?13:14,color:CX.mg}}>{date}</span>
          <Serif size={m?26:36}>Welcome, {name}.</Serif>
        </div>
        <button onClick={()=>openInsight(R.ins)} style={{background:'none',border:'none',padding:0,cursor:'pointer',textAlign:m?'left':'right',display:'flex',flexDirection:'column',gap:6,alignItems:m?'flex-start':'flex-end',color:CX.ch,maxWidth:380}}>
          <Lbl style={{fontSize:10,color:CX.mg}}>Today’s move</Lbl>
          <span style={{fontFamily:FX.serif,fontSize:m?16:19,lineHeight:1.3,textWrap:'pretty'}}>{R.h[0]}<em style={{color:CX.mg}}>{R.h[1]}</em> <span style={{fontFamily:FX.mono,color:CX.mg}}>→</span></span>
        </button>
      </div>
      <div style={{flex:1,minHeight:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:m?10:vh<800?14:22,padding:m?'12px 20px':'12px 64px'}}>
        <div style={{transform:M?'scale(1.05)':'scale(1)',transition:'transform .8s cubic-bezier(.2,.7,.2,1)'}}><AuraOrb size={orb} grad={personalAura(D2.traits)} full breathe ring={CX.ch} ringO={M?.6:.4} onClick={()=>openAsk(hover)}></AuraOrb></div>
        <Serif size={m?30:vh<800?42:52} style={{textAlign:'center',marginTop:m?4:8}}>{M ? <>Ready to <em style={{color:CX.mg}}>{M.t.toLowerCase()}?</em></> : <>What’s <em style={{color:CX.mg}}>happening?</em></>}</Serif>
        <button onClick={()=>openAsk(hover)} style={{background:'none',border:'none',cursor:'pointer',color:CX.dg,fontFamily:FX.sans,fontSize:m?15:18,display:'flex',alignItems:'center',gap:10,minHeight:44,padding:0}}>See clearly. Then make your move. <span style={{fontFamily:FX.mono}}>→</span></button>
      </div>
      <div style={{padding:m?'0 0 max(16px, env(safe-area-inset-bottom))':vh<800?'0 64px 24px':'0 64px 40px',display:'flex',flexDirection:'column',gap:m?10:14}}>
        <div style={{display:'flex',justifyContent:'space-between',margin:m?'0 20px':0,paddingTop:m?14:18,borderTop:`1.5px solid ${CX.g}`}}><Lbl style={{color:CX.mg}}>Any moment at work</Lbl><Lbl style={{color:CX.g}}>{m?'Swipe →':'Tap one to start'}</Lbl></div>
        <div style={m?{display:'flex',gap:8,overflowX:'auto',scrollSnapType:'x mandatory',padding:'4px 20px 12px',scrollPaddingLeft:20,scrollbarWidth:'none',WebkitOverflowScrolling:'touch'}:{display:'grid',gridTemplateColumns:'repeat(5,minmax(0,1fr))',gap:12}}>
          {D2.moments.map((x,i) => {const tool=CTX_TOOLS.find(t=>t.for===x.t), con=conn[tool.n];return (
            <div key={x.k} style={{position:'relative',minWidth:0,display:'flex',flex:m?'0 0 150px':undefined,scrollSnapAlign:m?'start':undefined}} onMouseEnter={()=>setHover(x.k)} onMouseLeave={()=>setHover(null)}>
            <button onClick={()=>openAsk(x.k)}
              style={{flex:1,minHeight:m?68:vh<800?76:88,borderRadius:6,border:'none',background:hover===x.k?x.bg:'#fff',color:hover===x.k?x.ink:CX.ch,boxShadow:'0 8px 24px rgba(32,34,33,.06)',display:'flex',flexDirection:stack||m?'column':'row',alignItems:stack||m?'flex-start':'center',gap:m?8:stack?10:14,padding:m?'12px 14px':stack?'14px 14px':'16px 18px',cursor:'pointer',textAlign:'left',transition:'all .25s',minWidth:0}}>
              <span style={{width:m?20:32,height:m?20:32,borderRadius:'50%',flexShrink:0,background:x.bg,boxShadow:hover===x.k?'0 0 0 2px rgba(255,255,255,.7)':'none'}}></span>
              <span style={{display:'flex',flexDirection:'column',gap:4,minWidth:0,maxWidth:'100%'}}>
                <span style={{fontFamily:FX.serif,fontSize:m?18:stack?19:21,lineHeight:1.1,overflowWrap:'anywhere'}}>{x.t}</span>
                <span style={{fontSize:m?12:13,opacity:.75,lineHeight:1.3}}>{x.d}</span>
              </span>
            </button>
            </div>);})}
        </div>
      </div>
    </div>
  );
}

const CTX_TOOLS = [
  { n:'Google Calendar', src:'https://cdn.simpleicons.org/googlecalendar', for:'Collaborate' },
  { n:'Slack', src:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg', for:'Communicate' },
  { n:'Zoom', src:'https://cdn.simpleicons.org/zoom', for:'Confront' },
  { n:'Notion', src:'https://cdn.simpleicons.org/notion', for:'Create' },
  { n:'LinkedIn', src:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg', for:'Claim' }
];
function ContextNudge({ m }) {
  const [hide, setHide] = React.useState(localStorage.getItem('cx-ctx-hide') === '1');
  const [on, setOn] = React.useState({});
  if (hide) return null;
  return (
    <div style={{display:'flex',alignItems:'center',gap:m?12:20,flexWrap:'wrap',background:'#fff',borderRadius:6,padding:m?'12px 14px':'12px 18px',boxShadow:'0 8px 24px rgba(32,34,33,.05)'}}>
      <span style={{display:'flex',flexDirection:'column',gap:2,flex:'1 1 220px',minWidth:0}}>
        <span style={{fontFamily:FX.serif,fontSize:17}}>Bring your patterns <em style={{color:CX.mg}}>into your day.</em></span>
        <span style={{fontSize:13,color:CX.mg}}>Connect your tools for insights in the moment.</span>
      </span>
      <span style={{display:'flex',gap:6,flexWrap:'wrap'}}>
        {CTX_TOOLS.map(x=>{const c=on[x.n];return(
          <button key={x.n} title={(c?'Connected · ':'Connect ')+x.n+' → '+x.for} aria-label={'Connect '+x.n} onClick={()=>setOn({...on,[x.n]:!c})} style={{width:44,height:44,borderRadius:8,border:`1px solid ${c?CX.ch:CX.smoke}`,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',position:'relative',padding:0}}>
            <img src={x.src} alt="" style={{width:22,height:22,display:'block'}}></img>
            {c && <span style={{position:'absolute',right:-4,top:-4,width:16,height:16,borderRadius:'50%',background:CX.ch,color:'#fff',fontSize:10,display:'flex',alignItems:'center',justifyContent:'center'}}>✓</span>}
          </button>);})}
      </span>
      <button onClick={()=>{localStorage.setItem('cx-ctx-hide','1');setHide(true);}} aria-label="Dismiss" style={{background:'none',border:'none',cursor:'pointer',color:CX.mg,fontFamily:FX.mono,fontSize:16,width:32,height:32}}>×</button>
    </div>
  );
}

Object.assign(window, { CalmTop, HomeCalm, ContextNudge, CTX_TOOLS });
