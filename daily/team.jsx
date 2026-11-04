const memberAura = c => `radial-gradient(circle, ${c[3]} 0%, ${c[2]} 28%, ${c[1]} 55%, ${c[0]} 78%, ${c[0]}00 100%)`;
const teamAura = ms => {
  const cs = ms.map(x => x.c[0]); const n = cs.length;
  return 'radial-gradient(circle, ' + cs.map((c,i)=>`${c}${i===0?'FF':'E6'} ${Math.round(i/(n)*88)}%`).join(', ') + ', rgba(221,209,193,0) 100%)';
};

function MemberDot({ m, size = 44, ring }) {
  return <span style={{width:size,height:size,borderRadius:'50%',flexShrink:0,display:'inline-block',background:memberAura(m.c),boxShadow:ring?`0 0 0 2px ${CX.linen}, 0 0 0 3.5px ${CX.ch}`:'none',transition:'box-shadow .2s'}}></span>;
}

function Team({ setView, openAsk, teamsMode = 'several' }) {
  const w = useWidth(), m = w < 900;
  const [mine, setMine] = React.useState(loadMyTeams);
  const demo = teamsMode === 'none' ? [] : teamsMode === 'one' ? window.DEMO_TEAMS.slice(0,1) : window.DEMO_TEAMS;
  const teams = [...demo, ...mine].map(buildTeam);
  const [activeId, setActiveId] = React.useState(()=>localStorage.getItem('cx-team-active'));
  const [creating, setCreating] = React.useState(()=>sessionStorage.getItem('cx-team-create')==='1');
  React.useEffect(()=>{ if (creating) sessionStorage.removeItem('cx-team-create'); }, []);
  const T0 = teams.find(x => x.id === activeId) || teams[0];
  if (T0) window.TEAM = T0;
  const pickTeam = id => { setActiveId(id); localStorage.setItem('cx-team-active', id); setSel(null); setCreating(false); window.scrollTo(0,0); };
  const create = def => { const n = [...mine, def]; setMine(n); saveMyTeams(n); pickTeam(def.id); };
  const T = T0 || window.TEAM_BASE;
  const [sel, setSel] = React.useState(null);
  const [q, setQ] = React.useState('');
  const [invite, setInvite] = React.useState(false);
  const [prac, setPrac] = React.useState(null);
  const [hov, setHov] = React.useState(null);
  const HM = window.DAILY.moments.find(x => x.k === hov);
  const [what, setWhat] = React.useState('');
  const [who, setWho] = React.useState([]);
  const stack = w < 1180;
  const S = m ? Math.min(340, w - 40) : stack ? 420 : 480;
  const R = S * .41, orb = S * .5;
  const P = T.members.find(x => x.id === sel);
  const first = P ? P.n.split(' ')[0] : '';
  const list = T.members.filter(x => x.n.toLowerCase().includes(q.toLowerCase()));
  const tAura = teamAura(T.members);

  if (!T0 || creating) return (
    <div style={{minHeight:'100vh',background:CX.linen,color:CX.ch}}>
      <CalmTop view="team" setView={setView} bg={CX.linen}></CalmTop>
      <div style={{padding:m?'24px 20px 56px':'48px 64px 80px',display:'flex',flexDirection:'column',gap:m?24:40}}>
        {teams.length > 0 && <TeamSwitch teams={teams} active={creating ? null : T.id} onPick={pickTeam} onNew={()=>setCreating(true)} m={m}></TeamSwitch>}
        <TeamCreate first={!teams.length} onCreate={create} onCancel={teams.length ? ()=>setCreating(false) : null}></TeamCreate>
      </div>
    </div>
  );

  const orbit = (
    <div style={{position:'relative',width:S,height:S,flexShrink:0}}>
      <div style={{position:'absolute',left:(S-orb)/2,top:(S-orb)/2,transform:HM?'scale(1.08)':'scale(1)',transition:'transform .8s cubic-bezier(.2,.7,.2,1)'}}>
        <AuraOrb size={orb} grad={tAura} full breathe ring={CX.ch} ringO={HM?.6:.35} onClick={()=>openAsk(null,{title:'Your team',auraGrad:tAura,prefill:'What does my team need from me this week?'})}></AuraOrb>
      </div>
      <svg viewBox={`0 0 ${S} ${S}`} style={{position:'absolute',inset:0,pointerEvents:'none'}}>
        <circle cx={S/2} cy={S/2} r={R} fill="none" stroke={CX.ch} strokeOpacity=".35" strokeWidth="1" strokeDasharray="2 5"></circle>
      </svg>
      {T.members.map((x,i)=>{const a=(-90+i*360/T.members.length)*Math.PI/180, cx=S/2+R*Math.cos(a), cy=S/2+R*Math.sin(a), on=x.id===sel;return(
        <button key={x.id} onClick={()=>!x.you&&!x.pending&&setSel(x.id)} aria-label={x.n} style={{position:'absolute',left:cx,top:cy,transform:`translate(-50%,-50%) scale(${on?1.12:1})`,background:'none',border:'none',padding:0,cursor:x.you?'default':'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:6,transition:'transform .3s',zIndex:3}}>
          <MemberDot m={x} size={m?38:48} ring={on}></MemberDot>
          <Lbl style={{fontSize:10,color:on?CX.ch:CX.dg}}>{x.you?'You':x.n.split(' ')[0]}</Lbl>
        </button>);})}
    </div>
  );

  const pairCard = P && P.pair && (
    <div key={sel} className="cx-fade" style={{background:'#fff',border:`1px solid ${CX.ch}`,borderRadius:6,overflow:'hidden',boxShadow:'0 20px 50px rgba(32,34,33,.08)',display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',alignItems:'center',gap:16,padding:m?'18px 20px':'22px 28px',borderBottom:`1px solid ${CX.ch}`}}>
        <div style={{display:'flex'}}><MemberDot m={T.members[0]} size={44}></MemberDot><span style={{marginLeft:-12}}><MemberDot m={P} size={44}></MemberDot></span></div>
        <div style={{display:'flex',flexDirection:'column',gap:4,minWidth:0,flex:1}}>
          <span style={{display:'flex',justifyContent:'space-between',gap:12}}><Lbl style={{fontSize:10,color:CX.mg}}>You + {first}</Lbl><button onClick={()=>setSel(null)} style={{background:'none',border:'none',padding:0,cursor:'pointer',color:CX.mg}}><Lbl style={{fontSize:10}}>× Team</Lbl></button></span>
          <span style={{fontFamily:FX.serif,fontSize:m?22:26,lineHeight:1.1,minWidth:0,overflowWrap:'anywhere'}}>{P.n}</span>
          <span style={{fontSize:14,color:CX.dg}}>{P.p}</span>
        </div>
      </div>
      <div style={{padding:m?'18px 20px':'22px 28px',display:'flex',flexDirection:'column',gap:12}}>
        {[['Better together',P.pair.good,CX.sage],['Watch for',P.pair.watch,CX.coral],['Try this',P.pair.tip,CX.apple]].map(([l,t,c],i)=>(
          <div key={l} style={{display:'grid',gridTemplateColumns:'12px 1fr',gap:14,paddingTop:i?12:0,borderTop:i?`1px solid ${CX.smoke}`:'none'}}>
            <span style={{width:10,height:10,borderRadius:'50%',background:c,marginTop:6}}></span>
            <div style={{display:'flex',flexDirection:'column',gap:4}}><Lbl style={{fontSize:10,color:CX.mg}}>{l}</Lbl><span style={{fontFamily:i===2?FX.serif:FX.sans,fontSize:i===2?19:16,lineHeight:1.4}}>{t}</span></div>
          </div>))}
      </div>
      <button onClick={()=>openAsk(null,{title:'You + '+first,auraGrad:memberAura(P.c),theme:{bg:CX.sageD,ink:'#FFFFFF'},prefill:`I have a 1:1 with ${first} coming up. How should I approach it, given both our patterns?`})} style={{margin:m?'0 20px 20px':'0 28px 28px',height:52,border:'none',borderRadius:4,background:CX.ch,color:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 20px',cursor:'pointer',fontFamily:FX.sans,fontWeight:700,fontSize:16}}>
        Prep for time with {first} <Arrow></Arrow>
      </button>
    </div>
  );

  return (
    <div style={{minHeight:'100vh',background:HM ? HM.tint : CX.linen,transition:'background .8s ease',color:CX.ch}}>
      <CalmTop view="team" setView={setView} bg={HM ? HM.tint : CX.linen}></CalmTop>
      <div style={{padding:m?'24px 20px 56px':'40px 64px 80px',display:'flex',flexDirection:'column',gap:m?28:48}}>
        <TeamSwitch teams={teams} active={T.id} onPick={pickTeam} onNew={()=>setCreating(true)} m={m}></TeamSwitch>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:16,flexWrap:'wrap'}}>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <Lbl style={{color:CX.mg}}>— {T.name}</Lbl>
            <Serif as="h1" size={m?40:72}>Your team’s <em style={{color:CX.mg}}>patterns.</em></Serif>
          </div>
          <Lbl style={{color:CX.mg}}>{T.members.length} members · tap anyone</Lbl>
        </div>

        <div style={{display:'grid',gridTemplateColumns:stack?'1fr':'auto minmax(0,1fr)',gap:stack?24:64,alignItems:'center',justifyItems:stack?'center':'stretch'}}>
          {orbit}
          <div style={{width:'100%',maxWidth:560}}>{pairCard || (
            <div className="cx-fade" style={{display:'flex',flexDirection:'column',gap:18}}>
              <Lbl style={{color:CX.mg,fontSize:10}}>Team weather · this week</Lbl>
              <Serif size={m?30:40}>Fast, warm, <em style={{color:CX.mg}}>a little stretched.</em></Serif>
              <p style={{margin:0,fontSize:m?16:18,lineHeight:1.5,color:CX.dg}}>Big-picture builders with a steady core. Tap anyone to see how you work together, or open team patterns below.</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <Btn onClick={()=>openAsk(null,{title:'Your team',auraGrad:tAura,prefill:'What does my team need from me this week?'})}>Think it through together <Arrow></Arrow></Btn>
                <Btn kind="o" onClick={()=>{const el=document.getElementById('team-book');if(el)window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-24,behavior:'smooth'});}} style={{color:CX.ch}}>Open team patterns</Btn>
              </div>
            </div>)}</div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{display:'flex',justifyContent:'space-between',paddingTop:18,borderTop:`1.5px solid ${CX.g}`}}><Lbl style={{color:CX.mg}}>Any moment, together</Lbl>{!m && <Lbl style={{color:CX.g}}>Tap one to start</Lbl>}</div>
          <div style={{display:'grid',gridTemplateColumns:m?'repeat(2,minmax(0,1fr))':'repeat(5,minmax(0,1fr))',gap:m?8:12}}>
            {T.practices.map(x=><PracticeTile key={x.k} x={x} m={m} active={prac===x.k} onHover={on=>setHov(on?x.k:null)} onClick={()=>openAsk(x.k,{auraGrad:tAura,title:'Team',people:true})}></PracticeTile>)}
          </div>
          
        </div>

        <div id="team-book" style={{display:'flex',flexDirection:'column',gap:18}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:12,paddingTop:18,borderTop:`1.5px solid ${CX.g}`,flexWrap:'wrap'}}>
            <div style={{display:'flex',flexDirection:'column',gap:10}}><Lbl style={{color:CX.mg}}>— Team patterns</Lbl><Serif size={m?30:44}>How we’re <em style={{color:CX.mg}}>built</em> to work together.</Serif></div>
            <Lbl style={{color:CX.mg}}>{window.TEAM_BOOK.chapters.length - 1} areas</Lbl>
          </div>
          <TeamBook openAsk={openAsk} tAura={tAura}></TeamBook>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,paddingTop:18,borderTop:`1.5px solid ${CX.g}`,flexWrap:'wrap'}}>
            <Lbl style={{color:CX.mg}}>Members</Lbl>
            <div style={{display:'flex',gap:8,flex:m?'1 1 100%':'0 1 420px'}}>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search team members…" style={{flex:1,minWidth:0,height:44,border:`1px solid ${CX.g}`,borderRadius:4,background:'#fff',padding:'0 14px',fontFamily:FX.sans,fontSize:15,color:CX.ch,outline:'none'}}></input>
              <Btn kind={invite?'k':'o'} onClick={()=>setInvite(!invite)} style={{height:44,color:invite?'#fff':CX.ch}}>{invite?'Invite sent ✓':'Add member'} {!invite && <Arrow></Arrow>}</Btn>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(3,minmax(0,1fr))',gap:m?8:12}}>
            {list.map(x=>{const on=x.id===sel;return(
              <button key={x.id} onClick={()=>{if(!x.you&&!x.pending){setSel(x.id);window.scrollTo({top:0,behavior:'smooth'});}}} style={{background:'#fff',border:`1px solid ${on?CX.ch:CX.smoke}`,borderRadius:6,padding:'14px 16px',display:'flex',alignItems:'center',gap:14,cursor:x.you?'default':'pointer',textAlign:'left',color:CX.ch,minWidth:0,transition:'border-color .2s'}}>
                <MemberDot m={x} size={44}></MemberDot>
                <span style={{display:'flex',flexDirection:'column',gap:3,minWidth:0,flex:1}}>
                  <span style={{fontFamily:FX.serif,fontSize:18,lineHeight:1.15}}>{x.n}</span>
                  <span style={{fontSize:13,color:CX.mg,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{x.p}</span>
                </span>
                {x.you ? <Lbl style={{fontSize:10,color:CX.mg}}>You</Lbl> : x.pending ? <Lbl style={{fontSize:10,color:CX.mg}}>Invited</Lbl> : <span style={{fontFamily:FX.mono,color:CX.mg}}>→</span>}
              </button>);})}
            {!list.length && <span style={{fontSize:15,color:CX.mg,padding:'12px 0'}}>No one matches “{q}”.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function PracticeTile({ x, m, onClick, active, onHover }) {
  const [hv, setHv] = React.useState(false);
  const setH = v => { setHv(v); onHover && onHover(v); };
  const h = hv || active;
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{minHeight:m?64:88,borderRadius:6,border:'none',background:h?x.bg:'#fff',color:h?x.ink:CX.ch,boxShadow:'0 8px 24px rgba(32,34,33,.06)',display:'flex',alignItems:'center',gap:m?10:14,padding:m?'12px 14px':'16px 18px',cursor:'pointer',textAlign:'left',transition:'all .25s',minWidth:0}}>
      <span style={{width:m?26:32,height:m?26:32,borderRadius:'50%',flexShrink:0,background:x.bg,boxShadow:h?'0 0 0 2px rgba(255,255,255,.7)':'none'}}></span>
      <span style={{display:'flex',flexDirection:'column',gap:4,minWidth:0}}>
        <span style={{fontFamily:FX.serif,fontSize:m?17:20,lineHeight:1.1,overflowWrap:'anywhere'}}>{x.t}</span>
        {!m && <span style={{fontSize:13,opacity:.75}}>{x.d}</span>}
      </span>
    </button>
  );
}

Object.assign(window, { Team, memberAura, teamAura });
