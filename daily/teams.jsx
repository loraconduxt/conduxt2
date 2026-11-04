// Team selection + empty state (create a team, add people, invite to Conduxt).
const MY_TEAMS_KEY = 'cx-my-teams';
const PENDING_C = ['#DDD1C1','#C9C2B8','#B8B2A8','#E8E1D6'];
const loadMyTeams = () => { try { return JSON.parse(localStorage.getItem(MY_TEAMS_KEY)) || []; } catch(e) { return []; } };
const saveMyTeams = t => localStorage.setItem(MY_TEAMS_KEY, JSON.stringify(t));

function buildTeam(def) {
  const dir = window.TEAM_DIRECTORY;
  const you = dir.find(p => p.you);
  const members = [you, ...def.ids.map(id => dir.find(p => p.id === id)).filter(Boolean),
    ...(def.invites || []).map((e,i) => ({ id:'inv'+i+e, n:e.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase()), c:PENDING_C, p:'Invited · pattern appears when they join', pending:true }))];
  return { ...window.TEAM_BASE, id:def.id, name:def.name, members };
}

function TeamSwitch({ teams, active, onPick, onNew, m }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:8,overflowX:'auto',paddingBottom:2}}>
      <Lbl style={{fontSize:10,color:CX.mg,flexShrink:0,marginRight:4}}>Your teams</Lbl>
      {teams.map(t => { const on = t.id === active; return (
        <button key={t.id} onClick={()=>onPick(t.id)} aria-pressed={on} style={{flexShrink:0,minHeight:44,display:'flex',alignItems:'center',gap:10,padding:'0 16px 0 6px',borderRadius:999,border:`1px solid ${on?CX.ch:CX.smoke}`,background:on?CX.ch:'#fff',color:on?'#fff':CX.ch,cursor:'pointer',fontFamily:FX.sans,fontSize:15,transition:'all .2s'}}>
          <span style={{width:30,height:30,borderRadius:'50%',background:teamAura(t.members),flexShrink:0}}></span>
          {t.name}<span style={{fontFamily:FX.mono,fontSize:11,opacity:.7}}>{t.members.length}</span>
        </button>); })}
      <button onClick={onNew} style={{flexShrink:0,minHeight:44,padding:'0 16px',borderRadius:999,border:`1px dashed ${CX.g}`,background:'transparent',color:CX.ch,cursor:'pointer',fontFamily:FX.sans,fontSize:15}}>+ New team</button>
    </div>
  );
}

function TeamCreate({ onCreate, onCancel, first }) {
  const w = useWidth(), m = w < 900;
  const dir = window.TEAM_DIRECTORY.filter(p => !p.you);
  const [name, setName] = React.useState('');
  const [ids, setIds] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [invites, setInvites] = React.useState([]);
  const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const addInvite = () => { if (!okEmail) return; const e = email.trim().toLowerCase(); if (!invites.includes(e)) setInvites([...invites, e]); setEmail(''); };
  const count = ids.length + invites.length;
  const canCreate = name.trim() && count > 0;
  return (
    <div style={{display:'grid',gridTemplateColumns:m?'1fr':'minmax(0,1fr) minmax(0,1.1fr)',gap:m?32:72,alignItems:'start'}}>
      <div style={{display:'flex',flexDirection:'column',gap:m?18:24,position:m?'static':'sticky',top:40}}>
        <Lbl style={{color:CX.mg}}>— {first ? 'Team' : 'New team'}</Lbl>
        <Serif as="h1" size={m?40:68} style={{lineHeight:1.04}}>See clearly. <em style={{color:CX.mg}}>Work together, accordingly.</em></Serif>
        <p style={{margin:0,fontSize:m?16:18,lineHeight:1.55,color:CX.dg,maxWidth:480}}>Bring the people you work with into Conduxt. As each person adds their patterns, your team’s patterns form — and you’ll see how to work with each of them.</p>
        <div style={{position:'relative',width:m?160:220,height:m?160:220,marginTop:8}}>
          <AuraOrb size={m?160:220} grad={count ? teamAura([window.TEAM_DIRECTORY[0], ...dir.filter(p=>ids.includes(p.id)), ...invites.map(()=>({c:PENDING_C}))]) : personalAura(window.DAILY.traits)} full breathe ring={CX.ch} ringO={.3}></AuraOrb>
        </div>
        <Lbl style={{fontSize:10,color:CX.mg}}>{count ? `You + ${count} ${count===1?'person':'people'}` : 'Just you, for now'}</Lbl>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:28,background:'#fff',border:`1px solid ${CX.smoke}`,borderRadius:6,padding:m?'22px 20px':'32px 36px',boxShadow:'0 20px 50px rgba(32,34,33,.06)'}}>
        <label style={{display:'flex',flexDirection:'column',gap:10}}>
          <Lbl style={{fontSize:10,color:CX.mg}}>01 · Name your team</Lbl>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Leadership team" style={{height:52,border:`1px solid ${CX.g}`,borderRadius:4,padding:'0 16px',fontFamily:FX.sans,fontSize:16,color:CX.ch,outline:'none'}}></input>
        </label>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <Lbl style={{fontSize:10,color:CX.mg}}>02 · Add people already on Conduxt</Lbl>
          <div style={{display:'flex',flexDirection:'column',borderTop:`1px solid ${CX.smoke}`}}>
            {dir.map(p => { const on = ids.includes(p.id); return (
              <button key={p.id} onClick={()=>setIds(on ? ids.filter(i=>i!==p.id) : [...ids, p.id])} aria-pressed={on} style={{display:'flex',alignItems:'center',gap:14,minHeight:60,padding:'8px 0',background:'none',border:'none',borderBottom:`1px solid ${CX.smoke}`,cursor:'pointer',textAlign:'left',color:CX.ch}}>
                <MemberDot m={p} size={36}></MemberDot>
                <span style={{display:'flex',flexDirection:'column',gap:2,flex:1,minWidth:0}}>
                  <span style={{fontFamily:FX.serif,fontSize:18,lineHeight:1.15}}>{p.n}</span>
                  <span style={{fontSize:13,color:CX.mg,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.p}</span>
                </span>
                <span style={{width:28,height:28,borderRadius:'50%',flexShrink:0,border:`1px solid ${on?CX.ch:CX.g}`,background:on?CX.ch:'transparent',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:FX.mono,fontSize:13}}>{on?'✓':'+'}</span>
              </button>); })}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <Lbl style={{fontSize:10,color:CX.mg}}>03 · Invite people to Conduxt</Lbl>
          <div style={{display:'flex',gap:8}}>
            <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addInvite()} placeholder="name@company.com" type="email" style={{flex:1,minWidth:0,height:48,border:`1px solid ${CX.g}`,borderRadius:4,padding:'0 14px',fontFamily:FX.sans,fontSize:15,color:CX.ch,outline:'none'}}></input>
            <Btn kind="o" disabled={!okEmail} onClick={addInvite} style={{height:48,color:CX.ch}}>Invite</Btn>
          </div>
          {invites.length > 0 && <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>{invites.map(e=>(
            <span key={e} style={{display:'flex',alignItems:'center',gap:8,minHeight:36,padding:'0 6px 0 12px',borderRadius:999,background:CX.linen,fontSize:14}}>{e}
              <button onClick={()=>setInvites(invites.filter(x=>x!==e))} aria-label={'Remove '+e} style={{width:28,height:28,border:'none',background:'none',cursor:'pointer',color:CX.mg,fontFamily:FX.mono}}>×</button>
            </span>))}</div>}
          <span style={{fontSize:13,color:CX.mg}}>They’ll get a sign-in link. Their pattern joins the team when they add an assessment.</span>
        </div>
        <div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
          <Btn disabled={!canCreate} onClick={()=>onCreate({ id:'t'+Date.now(), name:name.trim(), ids, invites })} style={{height:56,justifyContent:'space-between',flex:m?'1 1 100%':'0 0 auto'}}>Create team{invites.length ? ' & send invites' : ''} <Arrow></Arrow></Btn>
          {onCancel && <button onClick={onCancel} style={{background:'none',border:'none',cursor:'pointer',color:CX.mg,padding:'10px 0'}}><Lbl style={{fontSize:10}}>Cancel</Lbl></button>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TeamSwitch, TeamCreate, buildTeam, loadMyTeams, saveMyTeams });
