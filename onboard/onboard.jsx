const OB_C = { blue:'#6B9BD4', coral:'#FF6B5A', apple:'#CBC064', pink:'#FFB6E3', mint:'#B8D8C0', terra:'#A86B47' };
const OB_Q = [
  { q:'A new project lands. What do you do first?', o:[
    { l:'See the whole system', t:'Systems thinker', c:'blue' }, { l:'Rally the people', t:'Energizer', c:'coral' },
    { l:'Nail the details', t:'Operator', c:'apple' }, { l:'Explore wild ideas', t:'Creator', c:'pink' } ] },
  { q:'The stakes rise. You…', o:[
    { l:'Go quiet and focus', t:'Steady under pressure', c:'mint', k:'quiet' }, { l:'Push to act', t:'Driver', c:'terra', k:'push' },
    { l:'Talk it through', t:'Connector', c:'pink', k:'talk' }, { l:'Make a plan', t:'Planner', c:'apple', k:'plan' } ] },
  { q:'What gives you energy at work?', o:[
    { l:'Purpose', t:'Leads with purpose', c:'coral' }, { l:'Progress', t:'Builder', c:'apple' },
    { l:'People', t:'Connector', c:'pink' }, { l:'Puzzles', t:'Pattern reader', c:'blue' } ] },
  { q:'In a hard conversation, you…', o:[
    { l:'Lead with logic', t:'Analytical', c:'blue' }, { l:'Lead with care', t:'Empathetic', c:'pink' },
    { l:'Get direct, fast', t:'Candid', c:'terra' }, { l:'Pause and reflect', t:'Reflective', c:'mint' } ] },
  { q:'How do you make a big decision?', o:[
    { l:'Data first', t:'Evidence-led', c:'blue' }, { l:'Gut first', t:'Intuitive', c:'coral' },
    { l:'Together', t:'Collaborative', c:'mint' }, { l:'Fast, then adjust', t:'Decisive', c:'terra' } ] }
];
const OB_P = {
  quiet:{ now:'When stakes rise, you go quiet and focus. That’s a strength — but others can read your silence as distance.', why:'your quiet is you re-mapping the whole problem before you commit', tip:'name your state early — “I’m thinking, give me ten minutes” — and ask for the decision deadline', watch:'holding back context because it feels obvious once you’ve worked it out' },
  push:{ now:'When stakes rise, you speed up. That creates momentum — but people who need a pause can feel run over.', why:'pressure turns your energy outward into action', tip:'agree on what “done” means before you push, and check who needs a beat', watch:'deciding before the quieter people in the room have spoken' },
  talk:{ now:'When stakes rise, you think out loud. That keeps people close — but ideas can sound like final decisions.', why:'you make sense of things by saying them, and people are your sounding board', tip:'label it — “thinking out loud” vs. “this is the call” — so people know which is which', watch:'the loudest version of an idea becoming the plan by default' },
  plan:{ now:'When stakes rise, you reach for structure. That calms the room — but the plan can arrive before others are ready.', why:'structure is how you turn uncertainty into something you can act on', tip:'share the outline early and invite people to poke holes before it’s finished', watch:'a perfect plan that nobody helped build' }
};
const OB_A = [
  { k:'mbti', t:'Myers Briggs', c:'blue', opts:['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'] },
  { k:'enn', t:'Enneagram', c:'coral', opts:['1','2','3','4','5','6','7','8','9'] },
  { k:'disc', t:'DISC', c:'apple', opts:['D','i','S','C'] },
  { k:'hd', t:'Human Design', c:'pink', opts:['Generator','Manifesting Gen.','Projector','Manifestor','Reflector'] },
  { k:'cs', t:'CliftonStrengths / High 5', c:'mint', upload:true }
];
const OB_KEY = 'conduxt-onboard-v1';

function obDepth(s) { return Math.min(100, Math.round(s.ans.filter(x=>x!=null).length * 5 + Object.keys(s.res).length * 15)); }
function obTraits(s) {
  const seen = {}, out = [];
  s.ans.forEach((a,i)=>{ if (a==null) return; const o = OB_Q[i].o[a]; if (!seen[o.t]) { seen[o.t]=1; out.push({ t:o.t, c:OB_C[o.c] }); } });
  OB_A.forEach(a=>{ if (s.res[a.k]) out.push({ t:a.t, c:OB_C[a.c] }); });
  return out;
}
function obGrad(s) {
  const t = obTraits(s);
  if (!t.length) return 'radial-gradient(circle, rgba(255,255,255,.55) 0%, rgba(255,255,255,.15) 55%, rgba(255,255,255,0) 100%)';
  const cs = t.map(x=>x.c); while (cs.length < 3) cs.push(cs[cs.length-1]);
  return personalAura(cs.map(c=>({c})));
}

function OBMeter({ v, dark }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,width:'100%'}}>
      <Lbl style={{fontSize:10,color:dark?'#fff':CX.mg}}>Depth</Lbl>
      <div style={{flex:1,height:4,borderRadius:2,background:dark?'rgba(255,255,255,.3)':CX.smoke,overflow:'hidden'}}><div style={{width:v+'%',height:'100%',background:dark?'#fff':CX.ch,transition:'width .8s cubic-bezier(.2,.7,.2,1)'}}></div></div>
      <Lbl style={{fontSize:10,color:dark?'#fff':CX.ch}}>{v}%</Lbl>
    </div>
  );
}

function OBNote({ show, children }) {
  if (!show) return null;
  return <div style={{border:`1px dashed ${CX.g}`,borderRadius:4,padding:'10px 12px',display:'flex',gap:10,alignItems:'flex-start'}}><Lbl style={{fontSize:10,color:CX.terra,flexShrink:0}}>Backend</Lbl><span style={{fontFamily:FX.mono,fontSize:12,lineHeight:1.5,color:CX.dg}}>{children}</span></div>;
}

function OBInput({ label, value, onChange, type='text', placeholder, locked, badge, autoFocus }) {
  return (
    <label style={{display:'flex',flexDirection:'column',gap:8}}>
      <span style={{display:'flex',justifyContent:'space-between'}}><Lbl style={{fontSize:10,color:CX.dg}}>{label}</Lbl>{badge}</span>
      <input autoFocus={autoFocus} type={type} value={value} readOnly={locked} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{height:52,border:`1px solid ${CX.g}`,borderRadius:4,background:locked?CX.linen:'#fff',padding:'0 16px',fontFamily:FX.sans,fontSize:16,color:CX.ch,outline:'none'}}></input>
    </label>
  );
}

function OBChoice({ on, onClick, children, dot }) {
  return (
    <button onClick={onClick} style={{minHeight:60,display:'flex',alignItems:'center',gap:14,padding:'0 18px',borderRadius:6,border:`1px solid ${on?CX.ch:CX.smoke}`,background:on?CX.ch:'#fff',color:on?'#fff':CX.ch,cursor:'pointer',textAlign:'left',fontFamily:FX.sans,fontSize:17,transition:'all .2s',boxShadow:'0 8px 24px rgba(32,34,33,.05)'}}>
      {dot && <span style={{width:14,height:14,borderRadius:'50%',background:dot,flexShrink:0}}></span>}{children}
    </button>
  );
}

function CodeBoxes({ onDone }) {
  const [v, setV] = React.useState(['','','','','','']);
  const refs = React.useRef([]);
  const set = (i, x) => {
    const d = x.replace(/\D/g,'');
    if (d.length > 1) { const n = d.slice(0,6).split(''); while (n.length<6) n.push(''); setV(n); if (d.length>=6) onDone(); else refs.current[d.length]?.focus(); return; }
    const n = [...v]; n[i] = d; setV(n);
    if (d && i < 5) refs.current[i+1]?.focus();
    if (n.every(c=>c)) onDone();
  };
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(6,minmax(0,1fr))',gap:8,maxWidth:420}}>
      {v.map((c,i)=><input key={i} ref={el=>refs.current[i]=el} autoFocus={i===0} inputMode="numeric" value={c} onChange={e=>set(i,e.target.value)} onKeyDown={e=>{if(e.key==='Backspace'&&!c&&i)refs.current[i-1]?.focus();}} aria-label={'Digit '+(i+1)} style={{height:64,minWidth:0,textAlign:'center',border:`1px solid ${c?CX.ch:CX.g}`,borderRadius:4,background:'#fff',fontFamily:FX.serif,fontSize:30,color:CX.ch,outline:'none'}}></input>)}
    </div>
  );
}

function Compare({ s, unlocked, m }) {
  const k = s.ans[1] != null ? OB_Q[1].o[s.ans[1]].k : 'quiet';
  const P = OB_P[k];
  const mb = s.res.mbti || 'ENFP', en = s.res.enn || '3';
  return (
    <div style={{display:'grid',gridTemplateColumns:m?'1fr':'minmax(0,1fr) minmax(0,1fr)',gap:12}}>
      <div style={{background:'#fff',border:`1px solid ${CX.smoke}`,borderRadius:6,padding:20,display:'flex',flexDirection:'column',gap:12}}>
        <Lbl style={{fontSize:10,color:CX.mg,whiteSpace:'normal',lineHeight:1.5}}>Now · from 5 questions</Lbl>
        <span style={{fontFamily:FX.serif,fontSize:20,lineHeight:1.2}}>Under <em style={{color:CX.mg}}>pressure.</em></span>
        <p style={{margin:0,fontSize:15,lineHeight:1.55,color:CX.dg}}>{P.now}</p>
      </div>
      <div style={{position:'relative',background:CX.ch,color:'#fff',borderRadius:6,padding:20,display:'flex',flexDirection:'column',gap:12,overflow:'hidden'}}>
        <Lbl style={{fontSize:10,whiteSpace:'normal',lineHeight:1.5}}>{unlocked ? 'Now · with your assessments' : 'Next · with your assessments'}</Lbl>
        <span style={{fontFamily:FX.serif,fontSize:20,lineHeight:1.2}}>Under <em style={{color:CX.g}}>pressure.</em></span>
        <div style={{filter:unlocked?'none':'blur(5px)',opacity:unlocked?1:.7,transition:'all .8s',display:'flex',flexDirection:'column',gap:10,fontSize:15,lineHeight:1.55}}>
          <p style={{margin:0}}>With {mb} and Enneagram {en} in the mix, we can see why: {P.why}.</p>
          <p style={{margin:0}}><b>Try this:</b> {P.tip}.</p>
          <p style={{margin:0}}><b>Watch for:</b> {P.watch}.</p>
        </div>
        {!unlocked && <div style={{position:'absolute',left:20,right:20,bottom:20,display:'flex',justifyContent:'center'}}><span style={{background:'#fff',color:CX.ch,borderRadius:999,padding:'8px 14px'}}><Lbl style={{fontSize:10}}>Add 2 assessments to unlock</Lbl></span></div>}
      </div>
    </div>
  );
}

function Onboard({ notes }) {
  const w = useWidth(), m = w < 900, vh = window.innerHeight;
  const init = (()=>{try{return JSON.parse(localStorage.getItem(OB_KEY))}catch(e){return null}})();
  const [s, setS] = React.useState(init || { step:'welcome', q:0, ans:[null,null,null,null,null], name:'', email:'', role:'', google:false, verified:false, res:{}, open:null });
  React.useEffect(()=>{ localStorage.setItem(OB_KEY, JSON.stringify(s)); }, [s]);
  const up = p => setS(x => ({ ...x, ...p }));
  const go = step => { up({ step }); window.scrollTo(0,0); };
  const depth = obDepth(s), traits = obTraits(s), grad = obGrad(s);
  const nRes = Object.keys(s.res).length;
  const first = (s.name || 'there').split(' ')[0];
  const steps = ['about','q','reveal','verify','deepen'];
  const si = steps.indexOf(s.step);
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email);

  const orb = m ? Math.min(200, w*.5) : Math.max(260, Math.min(480, vh*.55, w*.32));
  const stage = (
    <div style={{background:CX.sage,color:'#fff',overflow:'hidden',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:m?14:24,padding:m?'28px 20px':'48px',height:m?'auto':'100vh',alignSelf:'start',position:m?'relative':'sticky',top:0}}>
      <div style={{transform:`scale(${.86 + depth/100*.14})`,transition:'transform 1s cubic-bezier(.2,.7,.2,1)'}}>
        <AuraOrb size={orb} grad={grad} full breathe ring="#fff" ringO={.35 + depth/100*.5}></AuraOrb>
      </div>
      {s.step==='welcome'
        ? <Lbl style={{fontSize:10}}>Your aura forms as you answer</Lbl>
        : <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:14,width:'100%',maxWidth:360}}>
            <div style={{display:'flex',gap:m?8:12,flexWrap:'wrap',justifyContent:'center',minHeight:20}}>
              {traits.slice(0,6).map(x=><span key={x.t} className="cx-fade" style={{display:'flex',alignItems:'center',gap:6}}><span style={{width:8,height:8,borderRadius:'50%',background:x.c}}></span><Lbl style={{fontSize:9}}>{x.t}</Lbl></span>)}
            </div>
            <OBMeter v={depth} dark></OBMeter>
          </div>}
      <Grain></Grain>
    </div>
  );

  const head = (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
      <Logo h={m?14:18}></Logo>
      {si >= 0 && <div style={{display:'flex',gap:6}}>{steps.map((x,i)=><span key={x} style={{width:i===si?28:8,height:8,borderRadius:4,background:i<=si?CX.ch:CX.g,transition:'all .3s'}}></span>)}</div>}
    </div>
  );

  const back = to => <button onClick={()=>go(to)} style={{background:'none',border:'none',padding:'10px 0',cursor:'pointer',color:CX.mg,alignSelf:'flex-start'}}><Lbl style={{fontSize:10}}>← Back</Lbl></button>;

  const unverifiedBar = !s.verified && (s.step==='deepen' || s.step==='done') && (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap',background:'#fff',border:`1px solid ${CX.smoke}`,borderRadius:6,padding:'12px 16px'}}>
      <span style={{display:'flex',alignItems:'center',gap:10,fontSize:14,color:CX.dg}}><span style={{width:8,height:8,borderRadius:'50%',background:CX.coral}}></span>Your aura isn’t saved yet — code sent to {s.email}</span>
      <button onClick={()=>go('verify')} style={{background:'none',border:'none',cursor:'pointer',color:CX.ch,padding:'6px 0'}}><Lbl style={{fontSize:10}}>Enter code →</Lbl></button>
    </div>
  );

  let body;
  if (s.step==='welcome') body = (
    <>
      <div style={{display:'flex',flexDirection:'column',gap:18}}>
        <Lbl style={{color:CX.mg}}>— Two minutes</Lbl>
        <Serif as="h1" size={m?42:68}>See your <em style={{color:CX.mg}}>aura.</em></Serif>
        <p style={{margin:0,fontSize:m?17:19,lineHeight:1.5,color:CX.dg,maxWidth:460}}>Five quick questions and you’ll see how you work at your best. Add your assessments later and it gets deeper.</p>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10,maxWidth:420}}>
        <Btn onClick={()=>{up({google:true,verified:true,name:s.name||'Lora Kantorovich',email:'lora@conduxt.com'});go('about');}} style={{height:56,justifyContent:'space-between'}}>Continue with Google <Arrow></Arrow></Btn>
        <Btn kind="o" onClick={()=>{up({google:false,verified:false});go('about');}} style={{height:56,justifyContent:'space-between',color:CX.ch}}>Continue with email <Arrow></Arrow></Btn>
        <span style={{fontSize:13,color:CX.mg,marginTop:4}}>No password. No waiting for an email.</span>
      </div>
      <OBNote show={notes}>Google path → OAuth returns a verified email instantly; skips the code step entirely.</OBNote>
    </>
  );
  else if (s.step==='about') body = (
    <>
      {back('welcome')}
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <Lbl style={{color:CX.mg}}>— Step 1 · About you</Lbl>
        <Serif size={m?34:52}>Who’s <em style={{color:CX.mg}}>this aura</em> for?</Serif>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:16,maxWidth:460}}>
        <OBInput label="Full name" value={s.name} onChange={v=>up({name:v})} placeholder="Lora Kantorovich" autoFocus={!s.name}></OBInput>
        <OBInput label="Work email" type="email" value={s.email} onChange={v=>up({email:v})} placeholder="you@company.com" locked={s.google} badge={s.google && <Lbl style={{fontSize:10,color:CX.sageD}}>✓ Verified by Google</Lbl>}></OBInput>
        <OBInput label="Role" value={s.role} onChange={v=>up({role:v})} placeholder="e.g. VP Operations"></OBInput>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10,maxWidth:460}}>
        <Btn disabled={!s.name.trim() || !validEmail} onClick={()=>go('q')} style={{height:56,justifyContent:'space-between'}}>Start the questions <Arrow></Arrow></Btn>
        {!s.google && <span style={{fontSize:13,color:CX.mg}}>We’ll send a code to save your aura. You don’t need it to keep going.</span>}
      </div>
      <OBNote show={notes}>On continue → create lead {'{'} name, email, role, source {'}'} with email_verified={s.google?'true':'false'}. Contact is captured even if they never verify.{!s.google && ' Verification code is emailed now, in the background.'}</OBNote>
    </>
  );
  else if (s.step==='q') { const Q = OB_Q[s.q]; body = (
    <>
      {back(s.q ? 'q' : 'about')}
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <Lbl style={{color:CX.mg}}>— Step 2 · Question {s.q+1} of {OB_Q.length}</Lbl>
        <Serif size={m?32:48}>{Q.q}</Serif>
      </div>
      <div key={s.q} className="cx-fade" style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(2,minmax(0,1fr))',gap:10}}>
        {Q.o.map((o,i)=><OBChoice key={o.l} on={s.ans[s.q]===i} dot={OB_C[o.c]} onClick={()=>{const a=[...s.ans];a[s.q]=i;setS(x=>({...x,ans:a}));setTimeout(()=>{ if (s.q < OB_Q.length-1) up({q:s.q+1}); else go('reveal'); }, 380);}}>{o.l}</OBChoice>)}
      </div>
      <OBNote show={notes}>Each answer saved as it’s tapped (answers[{s.q}]). Drop-off here still leaves a contact + partial profile.</OBNote>
    </>
  ); }
  else if (s.step==='reveal') body = (
    <>
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <Lbl style={{color:CX.mg}}>— Your first aura</Lbl>
        <Serif size={m?36:56}>{first}, you’re a <em style={{color:CX.mg}}>{traits[0]?.t.toLowerCase()}.</em></Serif>
        <p style={{margin:0,fontSize:m?16:18,lineHeight:1.5,color:CX.dg,maxWidth:520}}>This is your starting pattern from five questions. Here’s one insight now — and what it becomes when we add your assessments.</p>
      </div>
      <Compare s={s} unlocked={false} m={m}></Compare>
      <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
        <Btn onClick={()=>go(s.verified?'deepen':'verify')} style={{height:56}}>{s.verified ? 'Make it deeper' : 'Save my aura'} <Arrow></Arrow></Btn>
      </div>
      <OBNote show={notes}>Event: aura_revealed. User has seen value before any verification ask.</OBNote>
    </>
  );
  else if (s.step==='verify') body = (
    <>
      {back('reveal')}
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <Lbl style={{color:CX.mg}}>— Step 4 · Save your aura</Lbl>
        <Serif size={m?34:52}>Enter the code we <em style={{color:CX.mg}}>sent you.</em></Serif>
        <p style={{margin:0,fontSize:m?16:18,lineHeight:1.5,color:CX.dg}}>Six digits, sent to <b>{s.email}</b> when you started.</p>
      </div>
      <CodeBoxes onDone={()=>{up({verified:true});setTimeout(()=>go('deepen'),500);}}></CodeBoxes>
      <div style={{display:'flex',gap:20,flexWrap:'wrap',alignItems:'center'}}>
        <button onClick={()=>go('deepen')} style={{background:'none',border:'none',cursor:'pointer',color:CX.ch,padding:'10px 0'}}><Lbl style={{fontSize:10}}>I’ll do this later →</Lbl></button>
        <button style={{background:'none',border:'none',cursor:'pointer',color:CX.mg,padding:'10px 0'}}><Lbl style={{fontSize:10}}>Resend code</Lbl></button>
        <Lbl style={{fontSize:10,color:CX.g}}>Demo: any 6 digits</Lbl>
      </div>
      <OBNote show={notes}>Code was sent at Step 1, so it’s usually waiting in their inbox. Skipping is allowed; a reminder bar stays until verified. Verify → email_verified=true.</OBNote>
    </>
  );
  else if (s.step==='deepen') body = (
    <>
      {unverifiedBar}
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <Lbl style={{color:CX.mg}}>— Step 5 · Go deeper</Lbl>
        <Serif size={m?34:52}>Add what you <em style={{color:CX.mg}}>already know.</em></Serif>
        <p style={{margin:0,fontSize:m?16:18,lineHeight:1.5,color:CX.dg}}>Every assessment adds colour to your aura and depth to every insight. Add as many as you like — or skip for now.</p>
      </div>
      <div style={{display:'flex',flexDirection:'column',borderTop:`1.5px solid ${CX.ch}`}}>
        {OB_A.map(a=>{const done=s.res[a.k], open=s.open===a.k;return(
          <div key={a.k} style={{borderBottom:`1px solid ${CX.g}`}}>
            <button onClick={()=>up({open:open?null:a.k})} style={{width:'100%',minHeight:60,display:'grid',gridTemplateColumns:'20px 1fr auto',gap:14,alignItems:'center',background:'none',border:'none',cursor:'pointer',textAlign:'left',color:CX.ch,padding:'10px 0'}}>
              <span style={{width:14,height:14,borderRadius:'50%',background:done?OB_C[a.c]:'transparent',border:`1.5px solid ${done?OB_C[a.c]:CX.g}`}}></span>
              <span style={{fontFamily:FX.serif,fontSize:m?19:22}}>{a.t}</span>
              {done ? <Lbl style={{fontSize:10,color:CX.ch}}>{done} ✓</Lbl> : <span style={{fontFamily:FX.mono,color:CX.mg}}>{open?'–':'+'}</span>}
            </button>
            {open && (
              <div className="cx-fade" style={{padding:'0 0 18px 34px',display:'flex',gap:8,flexWrap:'wrap'}}>
                {a.upload
                  ? <Btn kind="o" onClick={()=>up({res:{...s.res,[a.k]:'Uploaded'},open:null})} style={{height:44,color:CX.ch}}>Upload PDF or screenshot <Arrow></Arrow></Btn>
                  : a.opts.map(o=><button key={o} onClick={()=>up({res:{...s.res,[a.k]:o},open:null})} style={{minHeight:44,minWidth:44,padding:'0 14px',borderRadius:999,border:`1px solid ${done===o?CX.ch:CX.g}`,background:done===o?CX.ch:'#fff',color:done===o?'#fff':CX.ch,cursor:'pointer',fontFamily:FX.sans,fontSize:15}}>{o}</button>)}
                <button onClick={()=>up({res:{...s.res,[a.k]:'Uploaded'},open:null})} style={{background:'none',border:'none',cursor:'pointer',color:CX.mg,padding:'0 8px',minHeight:44}}><Lbl style={{fontSize:9}}>{a.upload?'':'Or upload results'}</Lbl></button>
              </div>
            )}
          </div>);})}
      </div>
      <div style={{display:'flex',gap:16,flexWrap:'wrap',alignItems:'center'}}>
        <Btn onClick={()=>go('done')} style={{height:56}}>{nRes ? 'See my deeper aura' : 'Skip for now'} <Arrow></Arrow></Btn>
        <span style={{fontSize:13,color:CX.mg}}>{nRes >= 2 ? 'Deeper insights unlocked.' : `${2 - nRes} more to unlock deeper insights.`}</span>
      </div>
      <OBNote show={notes}>Each result saved immediately (profile.assessments). Depth = 25% from questions + 15% per assessment.</OBNote>
    </>
  );
  else body = (
    <>
      {unverifiedBar}
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        <Lbl style={{color:CX.mg}}>— You’re in</Lbl>
        <Serif size={m?36:56}>Here’s the <em style={{color:CX.mg}}>difference.</em></Serif>
        <p style={{margin:0,fontSize:m?16:18,lineHeight:1.5,color:CX.dg,maxWidth:520}}>{nRes >= 2 ? 'Same moment, two levels of depth. Your patterns are ready.' : 'Add two assessments any time to unlock the deeper version of every insight.'}</p>
      </div>
      <Compare s={s} unlocked={nRes >= 2} m={m}></Compare>
      <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
        <a href="Conduxt Daily.html" style={{textDecoration:'none'}}><Btn style={{height:56}}>Open my aura <Arrow></Arrow></Btn></a>
        {nRes < 2 && <Btn kind="o" onClick={()=>go('deepen')} style={{height:56,color:CX.ch}}>Add assessments</Btn>}
      </div>
      <button onClick={()=>{localStorage.removeItem(OB_KEY);setS({ step:'welcome', q:0, ans:[null,null,null,null,null], name:'', email:'', role:'', google:false, verified:false, res:{}, open:null });}} style={{background:'none',border:'none',cursor:'pointer',color:CX.g,padding:'8px 0',alignSelf:'flex-start'}}><Lbl style={{fontSize:9}}>Restart demo</Lbl></button>
    </>
  );

  return (
    <div data-screen-label={'Sign up · ' + s.step} style={{minHeight:'100vh',background:CX.linen,color:CX.ch,display:'grid',gridTemplateColumns:m?'1fr':'minmax(0,1.05fr) minmax(0,1fr)'}}>
      {m && stage}
      <div style={{padding:m?'20px 20px 40px':'36px 64px 56px',display:'flex',flexDirection:'column',gap:m?22:32,minWidth:0}}>
        {head}
        <div key={s.step} className="cx-fade" style={{display:'flex',flexDirection:'column',gap:m?22:32,flex:1,justifyContent:m?'flex-start':'center',maxWidth:640}}>{body}</div>
      </div>
      {!m && stage}
    </div>
  );
}

Object.assign(window, { Onboard, OB_Q, OB_C, OB_A, OB_P, OBInput, OBNote });
