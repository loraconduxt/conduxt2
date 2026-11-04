window.TEAM_BOOK = {
  traits: [
    { t:'Big-picture builders', c:'#6B9BD4', d:'Most of the team starts with vision, not detail.' },
    { t:'Fast to act', c:'#FF6B5A', d:'Decisions move quickly — sometimes before alignment.' },
    { t:'Warm and candid', c:'#FFB6E3', d:'People say what they think, and care how it lands.' },
    { t:'Steady core', c:'#8FA590', d:'Two calm analysts keep the system grounded.' }
  ],
  brand: 'A team that sees the future clearly and moves fast to build it — at its best when it slows down to bring everyone along.',
  mix: [ ['Thinkers out loud','4'], ['Quiet processors','3'], ['Detail first','2'], ['Vision first','5'] ],
  chapters: [
    { id:'glance', t:'At a glance', bg:'#8FA590', ink:'#FFFFFF', kind:'team' },
    { id:'work', t:'How we work', bg:'#6B9BD4', ink:'#FFFFFF', kind:'blue',
      title:['How we',' work.'], lead:'A vision-heavy team with a steady core. You generate direction fast and rely on a few people to turn it into a plan.',
      helps:['Name the owner of “the plan” for every project.','Give detail-first people the brief a day early.','Protect one no-meeting block per week.'],
      watch:['Five visions, no single plan','Over-relying on Nikki and Dana to land things'],
      deep:'Most of this team starts from the big picture. That’s why kickoffs are energizing and ideas are never in short supply. The cost shows up later, when it’s unclear who is turning direction into a plan. Nikki and Dana quietly carry much of that work. When they’re stretched, timelines slip without anyone deciding they should. Making the planning role explicit — and rotating it — spreads the load and makes the work visible.' },
    { id:'talk', t:'How we communicate', bg:'#FFB6E3', ink:'#202221', kind:'coral',
      title:['How we',' communicate.'], lead:'Four of you think out loud, three think first. Meetings reward the talkers unless you design for both.',
      helps:['Share the question before the meeting.','Start with two minutes of silent writing.','Close by naming the decision and the owner.'],
      watch:['Mistaking silence for agreement','The loudest idea winning by default'],
      deep:'This team splits almost evenly between people who process out loud and people who process first. Left alone, meetings tilt toward whoever speaks first and fastest. The quieter half often has the sharpest read on risk, but it surfaces a day later in a DM. A simple structure changes that: send the question ahead, open with silent writing, and go around the room before open discussion.' },
    { id:'pressure', t:'Under pressure', bg:'#A86B47', ink:'#FFFFFF', kind:'warm',
      title:['Under',' pressure.'], lead:'When stakes rise, the fast movers push harder and the steady core goes quiet. Both are trying to help.',
      helps:['Agree on the decision deadline first.','Name your state: “I’m pushing” or “I’m thinking.”','Debrief within 48 hours of a crunch.'],
      watch:['Pushing past the people who need a pause','Quiet read as checked out'],
      deep:'Pressure reveals two opposite instincts on this team. Carrie and Shaye speed up and push for action. Lora, Dana and Nikki slow down and go inward to re-map the problem. Each side can read the other as the problem. Naming the instinct out loud turns friction into information, and a short debrief after each crunch keeps it from building.' },
    { id:'decide', t:'How we decide', bg:'#CBC064', ink:'#202221', kind:'pink',
      title:['How we',' decide.'], lead:'You decide fast and revisit often. Clear criteria up front would save the second round.',
      helps:['Write the two or three criteria before debating.','Say who decides — and who is consulted.','Set a review date instead of reopening.'],
      watch:['Re-deciding in hallway conversations','Consensus that’s really fatigue'],
      deep:'Decisions on this team happen quickly, which keeps momentum high. But because the criteria are rarely stated, decisions get quietly reopened when someone who wasn’t convinced brings it back. Writing down what matters, naming the decider, and agreeing on a review date lets you keep the speed without the second round.' },
    { id:'blind', t:'Blind spots', bg:'#7A4A2E', ink:'#FFFFFF', kind:'spectrum',
      title:['Our',' blind spots.'], lead:'Celebrating wins and repairing after tension don’t happen on their own here.',
      helps:['End every project with a two-minute thank-you round.','Check in one-to-one after a hard meeting.','Ask “what did we miss?” at each milestone.'],
      watch:['Moving to the next thing too fast','Assuming everyone is fine'],
      deep:'This team is very good at the next problem and less practiced at closing the last one. Wins pass without acknowledgment, and tension after a hard meeting is rarely revisited. None of this means people don’t care — it just isn’t built into how you work. Small rituals fix it: a thank-you round, a next-day check-in, and a regular “what did we miss?”' }
  ]
};

function TeamBook({ openAsk, tAura }) {
  const w = useWidth(), m = w < 900;
  const B = window.TEAM_BOOK, T = window.TEAM;
  const [sel, setSel] = React.useState('glance');
  const [more, setMore] = React.useState(false);
  const C = B.chapters.find(c => c.id === sel);
  const ci = B.chapters.indexOf(C);
  const lightInk = C.ink === '#FFFFFF';
  const narrow = m || w < 1180;
  const P = m ? 20 : 40;
  const panel = { background:CX.linen, borderRadius:4, padding:m?18:22, display:'flex', flexDirection:'column', gap:12 };
  const label = (t, c) => <Lbl style={{fontSize:10,color:c||CX.ch}}>{t}</Lbl>;
  const sentences = C.deep ? (C.deep.match(/[^.!?]+[.!?]+/g) || [C.deep]) : [];
  const askThis = () => openAsk(null, { title: 'Team · ' + C.t, auraGrad: tAura, theme:{ bg:C.bg, ink:C.ink },
    prefill: C.id === 'glance' ? 'Looking at my team’s overall pattern, what’s the one thing we should focus on this month?' : `Our team patterns say this about “${C.t.toLowerCase()}”. What should I try with the team this week?` });

  const toc = (
    <div style={{display:'flex',flexDirection:'column',borderTop:`1.5px solid ${CX.ch}`}}>
      {B.chapters.map((c,i)=>{const on=c.id===sel;return(
        <button key={c.id} onClick={()=>{setSel(c.id);setMore(false);}} style={{background:on?'#fff':'none',border:'none',borderBottom:`1px solid ${CX.g}`,display:'grid',gridTemplateColumns:'64px 1fr auto',alignItems:'center',padding:m?'16px 12px':'20px 14px',cursor:'pointer',color:CX.ch,textAlign:'left',transition:'background .2s'}}>
          <span style={{display:'flex',alignItems:'center',gap:10}}><span style={{width:10,height:10,borderRadius:'50%',background:c.bg}}></span></span>
          <span style={{fontFamily:FX.serif,fontSize:m?20:24,lineHeight:1.15,fontStyle:i===0?'italic':'normal'}}>{c.t}</span>
          <span style={{fontFamily:FX.mono,fontSize:16,color:on?CX.ch:CX.mg}}>→</span>
        </button>);})}
    </div>
  );

  const glance = (
    <>
      <div style={{display:'grid',gridTemplateColumns:narrow?'1fr':'minmax(0,1fr) minmax(0,1fr)',gap:12}}>
        <div style={panel}>
          {label('Team traits')}
          {B.traits.map(x=>(
            <div key={x.t} style={{display:'grid',gridTemplateColumns:'14px 1fr',gap:12}}>
              <span style={{width:12,height:12,borderRadius:'50%',background:x.c,marginTop:5}}></span>
              <span style={{display:'flex',flexDirection:'column',gap:2}}><span style={{fontFamily:FX.serif,fontSize:18}}>{x.t}</span><span style={{fontSize:14,color:CX.dg,lineHeight:1.4}}>{x.d}</span></span>
            </div>))}
        </div>
        <div style={{...panel,background:CX.ch,color:'#fff'}}>
          <Lbl style={{fontSize:10}}>Team brand</Lbl>
          <p style={{margin:0,fontFamily:FX.serif,fontSize:m?20:22,lineHeight:1.3}}>{B.brand}</p>
          <div style={{display:'flex',marginTop:6}}>{T.members.map((x,i)=><span key={x.id} style={{marginLeft:i?-8:0}}><MemberDot m={x} size={30}></MemberDot></span>)}</div>
        </div>
      </div>
      <div style={{borderTop:`1px solid ${CX.ch}`,paddingTop:20}}>
        <div style={{marginBottom:12}}>{label('Team mix')}</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',border:`1px solid ${CX.ch}`,borderRadius:4,overflow:'hidden'}}>
          {B.mix.map(([a,n],i)=>(
            <div key={a} style={{padding:m?14:18,display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:10,borderRight:i%2===0?`1px solid ${CX.ch}`:'none',borderTop:i>=2?`1px solid ${CX.ch}`:'none'}}>
              <span style={{fontSize:14,color:CX.dg}}>{a}</span><span style={{fontFamily:FX.serif,fontSize:28,lineHeight:1}}>{n}</span>
            </div>))}
        </div>
      </div>
    </>
  );

  const chapter = C.id !== 'glance' && (
    <>
      <div style={{display:'grid',gridTemplateColumns:narrow?'1fr':'minmax(0,1.25fr) minmax(0,1fr)',gap:12}}>
        <div style={panel}>
          {label('What helps')}
          {C.helps.map((h,i)=><div key={i} style={{display:'grid',gridTemplateColumns:'28px 1fr',paddingTop:i?12:0,borderTop:i?`1px solid ${CX.g}`:'none',fontSize:16,lineHeight:1.45}}><span style={{fontFamily:FX.serif,fontSize:18,color:CX.mg}}>{i+1}</span><span>{h}</span></div>)}
        </div>
        <div style={{...panel,background:CX.ch,color:'#fff'}}>
          <Lbl style={{fontSize:10}}>Watch for</Lbl>
          {C.watch.map((x,i)=><div key={x} style={{display:'flex',gap:12,fontSize:15,lineHeight:1.45,paddingTop:i?12:0,borderTop:i?'1px solid rgba(255,255,255,.25)':'none'}}><span style={{width:8,height:8,borderRadius:'50%',background:CX.coral,marginTop:7,flexShrink:0}}></span>{x}</div>)}
        </div>
      </div>
      <div style={{borderTop:`1px solid ${CX.ch}`,paddingTop:20}}>
        <div style={{marginBottom:12}}>{label('Read deeper')}</div>
        <p style={{margin:0,fontSize:m?16:17,lineHeight:1.75}}>{sentences.slice(0,3).join(' ')}{more ? ' ' + sentences.slice(3).join(' ') : ''}</p>
        {sentences.length > 3 && <button onClick={()=>setMore(!more)} style={{marginTop:10,background:'none',border:'none',padding:'6px 0',cursor:'pointer',color:CX.ch}}><Lbl style={{fontSize:10}}>{more?'Show less –':'Keep reading +'}</Lbl></button>}
      </div>
    </>
  );

  const card = (
    <article key={sel} className="cx-fade" style={{background:'#fff',borderRadius:6,border:`1px solid ${CX.ch}`,overflow:'hidden',boxShadow:'0 20px 50px rgba(32,34,33,.10)'}}>
      <div style={{position:'relative',height:m?190:230,background:C.bg,color:C.ink,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
        {C.kind==='team' ? <AuraOrb size={m?160:200} grad={tAura} full breathe ring="#fff"></AuraOrb> : <AuraOrb size={m?160:200} kind={C.kind} full breathe ring={lightInk?'#fff':CX.ch} ringO={lightInk?.75:.45}></AuraOrb>}
        <Grain></Grain>
        <div style={{position:'absolute',left:P,right:P,top:m?16:22,display:'flex',justifyContent:'space-between',gap:12,zIndex:5}}>
          <Lbl>{C.t}</Lbl><Lbl>Team patterns</Lbl>
        </div>
      </div>
      <div style={{padding:`${m?26:36}px ${P}px ${m?26:40}px`,display:'flex',flexDirection:'column',gap:m?22:28}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:12}}>
          <Serif size={m?34:46}>{C.id==='glance' ? <>Your team’s <em style={{color:CX.mg}}>pattern.</em></> : <>{C.title[0]}<em style={{color:CX.mg}}>{C.title[1]}</em></>}</Serif>
          <p style={{fontFamily:FX.serif,fontSize:m?18:20,lineHeight:1.4,margin:0,color:CX.dg,maxWidth:520}}>{C.id==='glance' ? `${T.members.length} people, one shared pattern — synthesized from everyone’s assessments.` : C.lead}</p>
        </div>
        {C.id==='glance' ? glance : chapter}
        <button onClick={askThis} style={{border:'none',borderRadius:4,background:C.bg,color:C.ink,padding:m?'16px 18px':'18px 22px',display:'flex',alignItems:'center',gap:16,cursor:'pointer',textAlign:'left'}}>
          <span style={{width:40,height:40,borderRadius:'50%',flexShrink:0,background:tAura,boxShadow:`0 0 0 2px ${lightInk?'rgba(255,255,255,.5)':'rgba(32,34,33,.25)'}`}}></span>
          <span style={{display:'flex',flexDirection:'column',gap:3,flex:1,minWidth:0}}>
            <span style={{fontFamily:FX.serif,fontSize:m?19:22}}>Ask about our <em>team patterns</em></span>
            <span style={{fontSize:14,opacity:.85}}>We’ll start the question for you.</span>
          </span>
          <span style={{fontFamily:FX.mono,fontSize:18}}>→</span>
        </button>
      </div>
    </article>
  );

  return (
    <div style={{display:'grid',gridTemplateColumns:narrow?'1fr':'minmax(0,.8fr) minmax(0,1.2fr)',gap:narrow?20:48,alignItems:'start'}}>
      <div>{toc}</div><div style={{position:narrow?'static':'sticky',top:24}}>{card}</div>
    </div>
  );
}

Object.assign(window, { TeamBook });
