const V2_QM = ['create','confront','claim','communicate','collaborate'];
const V2_MK = ['claim','create','communicate','confront','collaborate'];
// order: claim, create, communicate, confront, collaborate — weighted by what each assessment actually measures
const V2_W = { mbti:[.12,.24,.28,.1,.16], enn:[.28,.08,.12,.26,.12], disc:[.12,.06,.22,.22,.28], hd:[.22,.26,.08,.06,.12], cs:[.3,.22,.14,.08,.18] };
const V2_VAL = { claim:'how you show up with confidence', create:'when you do your best thinking', communicate:'how your message lands', confront:'how you handle tension', collaborate:'how you work best with others' };
function v2Levels(ans, res) {
  const lv = { claim:0, create:0, communicate:0, confront:0, collaborate:0 };
  ans.forEach((a,i)=>{ if (a==null) return; V2_MK.forEach(k=>{ lv[k] += k===V2_QM[i] ? .2 : .05; }); });
  Object.keys(res).forEach(r=>V2_W[r].forEach((w,i)=>{ lv[V2_MK[i]] += w; }));
  V2_MK.forEach(k=>lv[k]=Math.min(1, lv[k]));
  return lv;
}
const v2Word = l => l===0 ? 'Grey' : l<.25 ? 'Faint' : l<.5 ? 'Forming' : l<.8 ? 'Clear' : 'Vivid';
const V2_A = {
  mbti:{ tells:'How you take in information and make decisions.', unl:['communicate','create'] },
  enn:{ tells:'What drives you — and what you protect under stress.', unl:['claim','confront'] },
  disc:{ tells:'Your natural pace and style with other people.', unl:['collaborate','communicate'] },
  hd:{ tells:'How your energy works best day to day.', unl:['claim','create'] },
  cs:{ tells:'Your top talents, in your own words.', unl:['claim','create','communicate','confront','collaborate'] }
};
const V2_INT = {
  collaborate:{ n:'Google Calendar', d:'Know who you’re meeting — and how they work.' },
  communicate:{ n:'Slack', d:'Tune each message to the person reading it.' },
  create:{ n:'Notion + focus blocks', d:'Protect the hours you do your best thinking.' },
  confront:{ n:'Zoom & Meet', d:'Spot the moments tension rose — and repair.' },
  claim:{ n:'LinkedIn', d:'Turn your patterns into your professional brand.' }
};
const V2_ICONS = {
  collaborate:[{ slug:'googlecalendar', mono:'31', c:'#4285F4' }],
  communicate:[{ src:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg', mono:'#', c:'#4A154B' }],
  create:[{ slug:'notion', mono:'N', c:'#000000' }, { slug:'googlecalendar', mono:'31', c:'#4285F4' }],
  confront:[{ slug:'zoom', mono:'Z', c:'#0B5CFF' }, { slug:'googlemeet', mono:'M', c:'#00897B' }],
  claim:[{ src:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg', mono:'in', c:'#0A66C2' }]
};
const V2_OUT = [
  { k:'claim', n:5, t:'figure out your ideal job', s:'Ideal job', c:'#FF6B5A' },
  { k:'collaborate', n:6, t:'name your biggest strengths', s:'Biggest strengths', c:'#A9CBEA' },
  { k:'communicate', n:4, t:'understand your communication preferences', s:'Communication', c:'#C9B6E4' },
  { k:'confront', n:5, t:'find the motivation tricks that work for you', s:'Motivation tricks', c:'#F5B78E' },
  { k:'create', n:4, t:'build productivity hacks that fit how you work', s:'Productivity hacks', c:'#B8D8C0' }
];
const v2Got = (lv, o) => lv[o.k] > 0 ? Math.max(1, Math.round(lv[o.k]*o.n)) : 0;
function V2Outcomes({ lv, only }) {
  const rows = V2_OUT.filter(o => !only || v2Got(lv,o) > 0);
  return (
    <div style={{display:'flex',flexDirection:'column',borderTop:`1px solid ${CX.g}`}}>
      {rows.map(o=>{const g=v2Got(lv,o);return (
        <div key={o.k} style={{display:'grid',gridTemplateColumns:'auto minmax(0,1fr)',gap:14,alignItems:'center',padding:'12px 0',borderBottom:`1px solid ${CX.g}`}}>
          <span style={{display:'flex',gap:4,width:6*14}}>{Array.from({length:o.n}).map((_,i)=><span key={i} style={{width:10,height:10,borderRadius:'50%',background:i<g?o.c:'transparent',border:`1.5px solid ${i<g?o.c:CX.g}`,transition:'all .6s'}}></span>)}</span>
          <span style={{fontSize:14,lineHeight:1.4,color:g?CX.ch:CX.mg}}>{g ? <><b>{g} of {o.n} traits</b> identified to help you {o.t}</> : <>{o.n} traits to help you {o.t}</>}</span>
        </div>);})}
    </div>
  );
}
const V2_AMONO = { mbti:'MB', enn:'9', disc:'DI', hd:'HD', cs:'CS' };
function V2Logo({ slug, src, mono, c, size = 36 }) {
  const url = src || (slug ? `https://cdn.simpleicons.org/${slug}` : null);
  const [bad, setBad] = React.useState(!url);
  return (
    <span style={{width:size,height:size,borderRadius:8,flexShrink:0,background:bad?c:'#fff',border:bad?'none':`1px solid ${CX.smoke}`,display:'inline-flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 6px rgba(32,34,33,.08)'}}>
      {bad ? <span style={{fontFamily:FX.sans,fontWeight:700,fontSize:size*.4,color:'#fff',letterSpacing:'-.02em'}}>{mono}</span>
        : <img src={url} alt="" onError={()=>setBad(true)} style={{width:size*.56,height:size*.56,display:'block'}}></img>}
    </span>
  );
}
function V2Logos({ k, size }) { return <span style={{display:'flex',gap:6}}>{V2_ICONS[k].map(x=><V2Logo key={x.mono} {...x} size={size}></V2Logo>)}</span>; }
function V2AIcon({ a, done, size = 36 }) {
  return <span style={{width:size,height:size,borderRadius:'50%',flexShrink:0,display:'inline-flex',alignItems:'center',justifyContent:'center',background:done?CX.ch:'#fff',border:`1.5px solid ${CX.ch}`,fontFamily:FX.mono,fontWeight:700,fontSize:size*.3,color:done?'#fff':CX.ch,transition:'all .5s'}}>{done?'✓':V2_AMONO[a.k]}</span>;
}
const V2_FREE_URL = '#free-assessments'; // TODO: free assessment site URL
const V2_FREE = { mbti:'12 min', enn:'10 min', disc:'8 min', hd:'2 min', cs:'15 min · High 5' };
const V2_PEEK = {
  claim:'You step up best when the purpose is clear. Say the why first.',
  create:'Your best ideas come in quiet, early blocks. Protect one tomorrow.',
  communicate:'Lead with the conclusion, then offer the reasoning on request.',
  confront:'When tension rises, name your state before you go quiet.',
  collaborate:'Share the plan early — let people help build it.'
};
const V2_ENN = {1:'You hold a high bar and quietly fix what others miss.',2:'You notice what people need before they say it.',3:'Progress fuels you — and you make big goals look easy.',4:'You bring a depth and originality no one else can copy.',5:'You see the system clearly by stepping back first.',6:'You spot the risk early and keep your people safe.',7:'You find the possibility in every situation.',8:'You take charge when it matters and protect your people.',9:'You calm the room and bring people back together.'};
const V2_DISC = {D:'You move fast, decide fast and want a clear target.',i:'Your energy lifts the room and gets people on board.',S:'You’re the steady one people rely on when things shift.',C:'You get it right — detail, quality and logic first.'};
const V2_HD = {'Generator':'You have deep, lasting energy for work you love.','Manifesting Gen.':'You move fast across many things and find the shortcuts.','Projector':'You see people and systems clearly — you’re here to guide.','Manifestor':'You start things. Your best moves come from inner urges.','Reflector':'You read the room like no one else.'};
const V2_DEF = { mbti:'ENFP', enn:'3', disc:'i', hd:'Projector' };
const V2_TR = { enn:{1:'High standards',2:'Reads people',3:'Progress-driven',4:'Original thinker',5:'Systems clarity',6:'Risk radar',7:'Sees possibility',8:'Takes charge',9:'Brings calm'}, disc:{D:'Decisive',i:'Energizer',S:'Steady presence',C:'Precise'}, hd:{'Generator':'Deep energy','Manifesting Gen.':'Fast mover','Projector':'Natural guide','Manifestor':'Initiator','Reflector':'Reads the room'} };
const V2_DIMQ = ['How you think','Under pressure','What drives you','How you communicate','How you decide'];
const V2_DIMA = { mbti:'How you think', enn:'What drives you', disc:'How you collaborate', hd:'How your energy works', cs:'Where you shine' };
const V2_DIMS = [['Critical','#C9B6E4'],['Curious','#A9CBEA'],['Intentional','#B8D8C0'],['Empathetic','#FFB6E3'],['Bold','#F5B78E'],['Driven','#FF6B5A'],['Strategic','#CBC064'],['Grounded','#DDD1C1'],['Calm','#8FA590']];
function v2Trait(k, v) {
  if (k==='cs') return 'Strategic';
  if (!v || v==='Uploaded' || v==='Taken free') v = V2_DEF[k];
  if (k==='mbti') return v[1]==='N' ? 'Big-picture thinker' : 'Grounded realist';
  return V2_TR[k][v];
}
function v2Insight(k, v) {
  if (k==='cs') return 'Your top talents point to strategy and possibility.';
  if (!v || v==='Uploaded' || v==='Taken free') v = V2_DEF[k];
  if (k==='enn') return V2_ENN[v];
  if (k==='disc') return V2_DISC[v];
  if (k==='hd') return V2_HD[v];
  const ei = v[0]==='E' ? 'You think out loud and draw energy from people.' : 'You think first, then speak — and it shows in your clarity.';
  return ei + ' You ' + (v[1]==='N' ? 'connect ideas into big pictures' : 'ground ideas in what’s real') + ' and decide with ' + (v[2]==='T' ? 'logic.' : 'your values.');
}
function V2Reveal({ found, grad, sig, name, saved, onDone, lv, saveForm }) {
  const [sheet, setSheet] = React.useState(false);
  const w = useWidth(), m = w < 760, vh = useVH();
  const items = (()=>{ const out=[], dims=V2_DIMS.map(([l,c])=>({id:'d-'+l,trait:l,c,dim:true})); const cap = window.innerWidth<760 ? 6 : window.innerHeight<700 ? 8 : 12; const max=Math.min(cap, Math.max(6, found.length*2+4)); let fi=0, di=0; while(out.length<max && (fi<found.length||di<dims.length)){ if(fi<found.length) out.push(found[fi++]); if(out.length<max && di<dims.length) out.push(dims[di++]); } return out; })();
  const n = items.length;
  const [ph, setPh] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(()=>{
    const ts = [setTimeout(()=>setPh(1),60)];
    for (let i=1;i<=n;i++) ts.push(setTimeout(()=>setCount(i), 300 + i*220));
    const tConv = 300 + n*220 + 900;
    ts.push(setTimeout(()=>setPh(2), tConv), setTimeout(()=>setPh(3), tConv + 1600));
    return ()=>ts.forEach(clearTimeout);
  },[]);
  const pad = x => String(x).padStart(2,'0');
  const short = vh < 700, textH = m ? (short ? 300 : 360) : (short ? 300 : 400);
  const totalT = lv ? V2_OUT.reduce((a,o)=>a+v2Got(lv,o),0) : 0, areas = lv ? V2_OUT.filter(o=>v2Got(lv,o)).length : 0;
  const orb = Math.max(90, Math.min(m ? 260 : 420, w*.7, vh - textH - 110));
  const cy = ph>=3 ? Math.max(short?56:72, (vh - textH - orb - 24)/2) + orb/2 : vh/2;
  const Rx = Math.min(w*.36, 480), Ry = Math.min(vh*.36, 300);
  const ringPos = i => { const a=i/n*Math.PI*2-Math.PI/2, k=(n>8 && i%2) ? .72 : 1; return [Math.cos(a)*Rx*k, Math.sin(a)*Ry*k]; };
  const G = m ? 170 : 240;
  return (
    <div style={{position:'fixed',inset:0,zIndex:200,background:CX.linen,color:CX.ch,overflow:'hidden'}}>
      <div style={{position:'absolute',left:m?20:40,top:m?20:28,right:m?20:40,display:'flex',justifyContent:'space-between',alignItems:'center',zIndex:5}}><Logo h={m?14:18}></Logo><Lbl style={{fontSize:10,color:CX.mg}}>{ph<2 ? 'New pattern found · '+pad(count) : pad(n)+' traits'}</Lbl></div>
      {items.map((f,i)=>{const a=i/n*Math.PI*2-Math.PI/2, conv=ph>=2, r=conv?orb*.2:1, x=conv?Math.cos(a)*r:ringPos(i)[0], y=conv?Math.sin(a)*r:ringPos(i)[1], shown=ph>=1 && count>i, gs=conv?orb*.72:G;return (
        <React.Fragment key={f.id}>
          <div className={ph>=3?'cx-breathe':''} style={{position:'absolute',left:w/2+x-gs/2,top:cy+y-gs/2,width:gs,height:gs,borderRadius:'50%',background:`radial-gradient(circle, ${f.c} 0%, ${f.c}99 28%, ${f.c}00 70%)`,filter:'blur(14px)',opacity:!shown?0:conv?.6:.8,transform:shown?'scale(1)':'scale(.5)',transition:'all 1.4s cubic-bezier(.5,0,.2,1)',pointerEvents:'none'}}></div>
          <div style={{position:'absolute',left:w/2+ringPos(i)[0],top:vh/2+ringPos(i)[1],transform:`translate(-50%,-50%) scale(${shown&&!conv?1:.85})`,opacity:shown&&!conv?1:0,transition:'all .6s cubic-bezier(.2,.7,.2,1)',background:'rgba(255,255,255,.72)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,.9)',borderRadius:999,padding:m||vh<700?'7px 12px':'10px 18px',display:'flex',alignItems:'center',gap:8,boxShadow:'0 6px 20px rgba(32,34,33,.06)',whiteSpace:'nowrap',zIndex:3}}>
            <span style={{width:9,height:9,borderRadius:'50%',background:f.c}}></span>
            <Lbl style={{fontSize:m?10:12,color:CX.dg}}>{f.trait || f.src}</Lbl>
          </div>
        </React.Fragment>);})}
      <div style={{position:'absolute',left:'50%',top:cy,transform:`translate(-50%,-50%) scale(${ph>=3?1:.7})`,opacity:ph>=3?1:0,transition:'all 1.6s cubic-bezier(.2,.7,.2,1)',zIndex:3}}>
        <div style={{width:orb,height:orb,borderRadius:'50%',background:grad,filter:'blur(36px)',opacity:.55}}></div>
      </div>
      <img src="assets/session/conduxt-mark.png" alt="" style={{position:'absolute',left:'50%',top:cy,height:m?52:72,width:'auto',transform:`translate(-50%,-50%) scale(${ph>=3?1:.6})`,opacity:ph>=3?1:0,transition:'all 1s cubic-bezier(.2,.7,.2,1)',zIndex:4}}></img>
      <Grain o={.3}></Grain>
      <div style={{position:'absolute',left:16,right:16,top:cy+orb/2+20,bottom:12,display:'flex',flexDirection:'column',opacity:ph>=3?1:0,transform:ph>=3?'none':'translateY(20px)',transition:'all 1s cubic-bezier(.2,.7,.2,1) .3s',zIndex:6}}><FitBox center={false}><div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:short?10:m?12:18,textAlign:'center'}}>
        <Lbl wide style={{fontSize:10,color:CX.mg}}>— Your snapshot · 22 insights unlocked</Lbl>
        <Serif size={short?32:m?32:52} style={{lineHeight:1.08,maxWidth:760}}>This is you, <em style={{color:CX.mg}}>clearly.</em></Serif>
        <span style={{fontSize:m?15:17,maxWidth:540,lineHeight:1.5,color:CX.dg}}>22 insights on how you work best — from ideal roles to how you handle conflict.</span>
        <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(3,minmax(0,1fr))',gap:m?6:10,width:'100%',maxWidth:m?380:780,marginTop:4}}>
          {V2_PILLARS.map(p=><div key={p.t} style={{display:'flex',flexDirection:'column',gap:4,background:'rgba(255,255,255,.65)',border:`1px solid ${CX.smoke}`,borderRadius:6,padding:m?'10px 14px':'14px 16px',textAlign:'left'}}>
            <span style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:8,height:8,borderRadius:'50%',background:p.c}}></span><span style={{fontFamily:FX.serif,fontSize:m?17:19}}>{p.t}</span></span>
            {!short && !m && <span style={{fontSize:13,color:CX.dg,lineHeight:1.4}}>{p.d}</span>}
          </div>)}
        </div>
        <Btn onClick={saved ? onDone : ()=>setSheet(true)} style={{height:short?48:56,marginTop:6}}>Now, act on it <Arrow></Arrow></Btn>
      </div></FitBox></div>
      {ph===2 && <Lbl wide style={{position:'absolute',left:0,right:0,bottom:m?32:'8vh',textAlign:'center',fontSize:10,color:CX.mg,zIndex:6}}>Bringing your patterns together…</Lbl>}
      {sheet && <div className="cx-fade" onClick={e=>e.target===e.currentTarget&&setSheet(false)} style={{position:'absolute',inset:0,zIndex:20,background:'rgba(235,234,229,.72)',backdropFilter:'blur(6px)',WebkitBackdropFilter:'blur(6px)',display:'flex',alignItems:m?'flex-end':'center',justifyContent:'center',padding:m?0:20}}>
        <div style={{position:'relative',width:'100%',maxWidth:460,maxHeight:'100%',display:'flex',flexDirection:'column',background:CX.cream,border:`1px solid ${CX.g}`,borderRadius:m?'12px 12px 0 0':8,padding:m?'24px 20px 28px':'32px',boxShadow:'0 30px 80px rgba(32,34,33,.18)'}}>
          <button onClick={()=>setSheet(false)} aria-label="Close" style={{position:'absolute',right:12,top:12,width:44,height:44,border:'none',background:'none',cursor:'pointer',fontFamily:FX.mono,fontSize:18,color:CX.mg}}>×</button>
          <div style={{display:'flex',flexDirection:'column',height:Math.min(vh-(m?24:40), 600)}}><FitBox>{saveForm}</FitBox></div>
        </div>
      </div>}
    </div>
  );
}
const V2_PILLARS = [
  { t:'22 insights', c:'#8FA590', d:'How you’re built to work — from ideal roles to how you handle conflict.' },
  { t:'Your signal', c:'#FF6B5A', d:'A mirror for any moment at work.' },
  { t:'Your day', c:'#6B9BD4', d:'Connect your calendar and Slack to see your patterns at work.' }
];
const V2_KEY = 'conduxt-onboard-v2';
const V2_INIT = { ans:[], res:{}, panel:null, qi:0, open:null, name:'', email:'', saved:false, google:false, askedSave:false, peek:null, toast:null, int:{}, gen:false };

function OnboardV2({ notes }) {
  const w = useWidth(), m = w < 980, vh = useVH();
  const Dm = window.DAILY.moments;
  const init = (()=>{try{return JSON.parse(localStorage.getItem(V2_KEY))}catch(e){return null}})();
  const [s, setS] = React.useState(init ? { ...V2_INIT, ...init, gen:false, reveal:false, leaving:false, toast:null, flash:null, open:null, panel: init.saved ? 'done' : init.panel==='save' ? 'save' : 'a' } : V2_INIT);
  React.useEffect(()=>{ const { toast, reveal, flash, leaving, gen, fromReveal, ...rest } = s; localStorage.setItem(V2_KEY, JSON.stringify(rest)); }, [s]);
  const up = p => setS(x => ({ ...x, ...p }));

  const lv = v2Levels(s.ans, s.res);
  const unl = { has: k => lv[k] > 0 };
  const n = V2_MK.filter(k=>lv[k]>0).length;
  const prog = V2_MK.reduce((a,k)=>a+lv[k],0)/5;
  const deep = Object.keys(s.res).length;
  const cols = [];
  s.ans.forEach((a,i)=>{ if (a!=null) cols.push(OB_C[OB_Q[i].o[a].c]); });
  OB_A.forEach(a=>{ if (s.res[a.k]) cols.push(OB_C[a.c]); });
  const base = ['#6B9BD4','#FFB6E3','#FF6B5A','#CBC064','#B8D8C0'];
  const grad = personalAura([...cols, ...base].slice(0,5).map(c=>({c})));
  const nInt = Object.keys(s.int||{}).length;
  const clarity = Math.round(prog*100);
  const lvSorted = V2_MK.filter(k=>lv[k]>0).sort((p,q)=>lv[q]-lv[p]);
  const V2_AC = { claim:'#FF6B5A', create:'#B8D8C0', communicate:'#C9B6E4', confront:'#F5B78E', collaborate:'#A9CBEA' };
  const mcol = k => V2_AC[k];
  const hexA = a => Math.round(Math.max(0,Math.min(1,a))*255).toString(16).padStart(2,'0');
  const auraGrad = lvSorted.length
    ? 'radial-gradient(circle, ' + lvSorted.map((k,i)=>mcol(k)+hexA(.35+lv[k]*.65)+' '+Math.round(i/lvSorted.length*78)+'%').join(', ') + ', rgba(221,209,193,0) 100%)'
    : 'radial-gradient(circle, rgba(167,166,164,.6) 0%, rgba(167,166,164,.25) 50%, rgba(167,166,164,0) 100%)';
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email);

  const reveal = (fresh, after) => {
    setS(x => ({ ...x, gen:true, peek:null }));
    setTimeout(()=>setS(x => ({ ...x, gen:false, toast: x.flash || (fresh.length ? fresh : null),  ...(after ? after(x) : {}) })), 1400);
  };
  const answer = i => {
    const a = [...s.ans]; a[s.qi] = i;
    const after = v2Levels(a, s.res), fresh = V2_MK.filter(k=>after[k]>lv[k]).sort((p,q)=>(after[q]-lv[q])-(after[p]-lv[p]));
    const nextQ = s.qi + 1, needSave = !s.saved && !s.askedSave;
    setS(x => ({ ...x, ans:a, flash:['q'+s.qi] }));
    reveal(fresh, () => ({ qi: Math.min(nextQ, OB_Q.length), panel: nextQ >= OB_Q.length ? 'choose' : 'q' }));
  };
  const addRes = (k, v) => {
    const after = v2Levels(s.ans, { ...s.res, [k]:v }), fresh = V2_MK.filter(x=>after[x]>lv[x]).sort((p,q)=>(after[q]-lv[q])-(after[p]-lv[p])), needSave = !s.saved && !s.askedSave;
    setS(x => ({ ...x, res:{ ...x.res, [k]:v }, open:null, flash:[k] }));
    reveal(fresh, () => ({}));
  };
  const connect = k => { setS(x => ({ ...x, int:{ ...(x.int||{}), [k]:true } })); reveal([], ()=>({ peek:k })); };
  React.useEffect(()=>{ if (!s.toast) return; const t = setTimeout(()=>up({ toast:null, flash:null }), 3600); return ()=>clearTimeout(t); }, [s.toast]);

  const orb = m ? 64 : Math.max(160, Math.min(400, vh*.42));
  const M = Dm.find(x=>x.k===s.peek);

  // ---------- patterns preview (left) ----------
  const QT = ['When something new lands, you %.','When the stakes rise, you %.','You’re fuelled by %.','In a hard conversation, you %.','Big decision? %.'];
  const found = [];
  OB_A.forEach(a=>{ if (s.res[a.k]) found.push({ id:a.k, txt:v2Insight(a.k, s.res[a.k]), src:a.t, trait:v2Trait(a.k, s.res[a.k]), dim:V2_DIMA[a.k], c:OB_C[a.c] }); });
  s.ans.forEach((a,i)=>{ if (a==null) return; const o = OB_Q[i].o[a]; const l = i===4 ? o.l : o.l.charAt(0).toLowerCase()+o.l.slice(1); found.push({ id:'q'+i, txt:QT[i].replace('%', i===2 ? l.toLowerCase() : l), src:o.t, trait:o.t, dim:V2_DIMQ[i], c:OB_C[o.c] }); });
  const slots = m ? 4 : 6;
  const ADJ = { quiet:'Quiet', push:'Driving', talk:'Open', plan:'Steady' };
  const NOUN = ['Architect','Catalyst','Operator','Inventor'];
  const q2 = s.ans[1]!=null ? OB_Q[1].o[s.ans[1]].k : null, q1 = s.ans[0];
  const ENA = {1:'Principled',2:'Generous',3:'Driven',4:'Original',5:'Clear-eyed',6:'Steadfast',7:'Curious',8:'Bold',9:'Calm'}, DA = {D:'Decisive',i:'Radiant',S:'Steady',C:'Precise'};
  const rv = k => { const v = s.res[k]; return !v || v==='Uploaded' || v==='Taken free' ? V2_DEF[k] : v; };
  const adj = q2 ? ADJ[q2] : s.res.enn ? ENA[rv('enn')] : s.res.disc ? DA[rv('disc')] : s.res.hd ? 'Intuitive' : s.res.cs ? 'Strategic' : 'Curious';
  const noun = q1!=null ? NOUN[q1] : s.res.mbti ? (rv('mbti')[1]==='N'?'Visionary':'Builder') : s.res.hd ? ({'Projector':'Guide','Generator':'Builder','Manifesting Gen.':'Catalyst','Manifestor':'Initiator','Reflector':'Mirror'}[rv('hd')]) : s.res.cs ? 'Strategist' : 'Architect';
  const sig = adj + ' ' + noun;
  const toastEl = s.toast && s.flash && !s.gen && found.filter(f=>s.flash.includes(f.id)).map(f=>{const idx=found.findIndex(x=>x.id===f.id);return (
          <div key={f.id+'-'+found.length} className="cx-dissolve" style={{background:'rgba(255,255,255,.92)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',border:'1px solid rgba(255,255,255,.9)',borderRadius:6,padding:m?'12px 16px':'16px 20px',display:'flex',flexDirection:'column',gap:m?4:8,boxShadow:'0 16px 40px rgba(32,34,33,.12)',maxWidth:420}}>
            <span style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:10,height:10,borderRadius:'50%',background:f.c}}></span><Lbl style={{fontSize:10,color:CX.mg}}>New pattern found · {String(idx+1).padStart(2,'0')} · {f.dim}</Lbl></span>
            <span style={{fontFamily:FX.serif,fontSize:m?18:22,lineHeight:1.15}}>{f.trait}</span>
            <span style={{fontSize:m?14:15,color:CX.dg,lineHeight:1.45}}>{f.txt}</span>
          </div>);});
  const productM = (
    <div style={{position:'relative',background:CX.linen,flexShrink:0,borderBottom:`1px solid ${CX.smoke}`}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 16px',height:48}}><Logo h={14}></Logo><Lbl style={{fontSize:10,color:CX.mg}}>Your patterns</Lbl></div>
      <div style={{display:'flex',alignItems:'center',gap:14,padding:'0 16px 12px'}}>
        <div className={s.gen?'cx-pulse':''} style={{flexShrink:0,filter:`grayscale(${1-Math.min(1,prog*1.6)})`,opacity:.6+prog*.4,transition:'filter 1.2s ease, opacity 1.2s ease'}}><AuraOrb size={orb} grad={grad} full breathe ring={CX.ch} ringO={.25+prog*.3}></AuraOrb></div>
        <div style={{display:'flex',flexDirection:'column',gap:6,minWidth:0,flex:1}}>
          <Lbl style={{fontSize:10,color:CX.mg}}>{s.gen ? 'Generating your patterns…' : 'Your pattern signature'}</Lbl>
          <Serif size={22} style={{lineHeight:1.1,filter:`blur(${Math.max(0,(1-prog*1.4)*5)}px)`,transition:'filter 1.2s ease'}}>The <em style={{color:CX.mg}}>{sig}.</em></Serif>
          <div style={{display:'flex',alignItems:'center',gap:8}}><Lbl style={{fontSize:10,color:CX.mg}}>Clarity</Lbl><div style={{flex:1,maxWidth:160,height:3,borderRadius:2,background:CX.smoke,overflow:'hidden'}}><div style={{width:clarity+'%',height:'100%',background:CX.ch,transition:'width .8s'}}></div></div></div>
        </div>
      </div>
      {toastEl && <div style={{position:'fixed',left:12,right:12,top:8,zIndex:60,display:'flex',justifyContent:'center',pointerEvents:'none'}}>{toastEl}</div>}
    </div>
  );
  const product = m ? productM : (
    <div style={{position:'relative',background:CX.linen,display:'flex',flexDirection:'column',height:'100dvh',overflow:'hidden'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:m?'0 16px':'0 40px',height:m?60:76,borderBottom:`1px solid ${CX.smoke}`}}>
        <Logo h={m?14:18}></Logo>
        <Lbl style={{fontSize:10,color:CX.mg}}>Your patterns</Lbl>
      </div>
      <div style={{flex:1,minHeight:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:m?18:24,padding:m?'28px 20px':'24px 48px'}}>
        <div className={s.gen?'cx-pulse':''} style={{filter:`grayscale(${1-Math.min(1,prog*1.6)})`,opacity:.6+prog*.4,transform:s.gen?'scale(1.06)':'none',transition:'filter 1.2s ease, opacity 1.2s ease, transform 1s'}}>
          <AuraOrb size={orb} grad={grad} full breathe ring={CX.ch} ringO={.25+prog*.3}></AuraOrb>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10,textAlign:'center'}}>
          <Lbl style={{fontSize:10,color:CX.mg}}>{s.gen ? 'Generating your patterns…' : 'Your pattern signature'}</Lbl>
          <Serif size={m?34:52} style={{filter:`blur(${Math.max(0,(1-prog*1.4)*7)}px)`,transition:'filter 1.2s ease'}}>The <em style={{color:CX.mg}}>{sig}.</em></Serif>
          <div style={{width:220,display:'flex',alignItems:'center',gap:10}}><Lbl style={{fontSize:10,color:CX.mg}}>Pattern clarity</Lbl><div style={{flex:1,height:4,borderRadius:2,background:CX.smoke,overflow:'hidden'}}><div style={{width:clarity+'%',height:'100%',background:CX.ch,transition:'width .8s'}}></div></div></div>
        </div>
      </div>
      <div style={{position:'absolute',left:0,right:0,bottom:m?16:40,display:'flex',justifyContent:'center',padding:'0 20px',pointerEvents:'none',minHeight:120}}>
        {toastEl}
      </div>
    </div>
  );

  // ---------- side panel (right) ----------
  const card = (on, onClick, title, sub, meta, icons) => (
    <button onClick={onClick} style={{background:'#fff',border:`1px solid ${CX.smoke}`,borderRadius:6,padding:'20px 22px',display:'flex',flexDirection:'column',gap:8,cursor:'pointer',textAlign:'left',color:CX.ch,boxShadow:'0 8px 24px rgba(32,34,33,.05)'}}>
      <span style={{display:'flex',justifyContent:'space-between',gap:10}}><Lbl style={{fontSize:10,color:CX.mg}}>{meta}</Lbl><span style={{fontFamily:FX.mono}}>→</span></span>
      <span style={{fontFamily:FX.serif,fontSize:24,lineHeight:1.15}}>{title}</span>
      <span style={{fontSize:15,color:CX.dg,lineHeight:1.45}}>{sub}</span>
      {icons && <span style={{display:'flex',gap:6,marginTop:4,flexWrap:'wrap'}}>{icons}</span>}
    </button>
  );
  const cta = (onClick, href) => {
    const inner = (
      <span style={{position:'relative',display:'flex',alignItems:'center',gap:m?16:20,background:CX.ch,color:'#fff',borderRadius:6,padding:m?'18px':'22px 24px',overflow:'hidden',textAlign:'left',boxShadow:'0 20px 50px rgba(32,34,33,.18)'}}>
        <span style={{position:'absolute',right:-60,top:'50%',transform:'translateY(-50%)',opacity:.55,pointerEvents:'none'}}><AuraOrb size={220} grad={auraGrad} full breathe ring="#fff" ringO={.3}></AuraOrb></span>
        <span style={{position:'relative',width:56,height:56,borderRadius:'50%',flexShrink:0,background:auraGrad,boxShadow:'0 0 0 2px rgba(255,255,255,.5)'}}></span>
        <span style={{position:'relative',display:'flex',flexDirection:'column',gap:6,flex:1,minWidth:0}}>
          <Lbl style={{fontSize:10,opacity:.75}}>Your work patterns</Lbl>
          <span style={{fontFamily:FX.serif,fontSize:m?21:25,lineHeight:1.15}}>Show me <em>my patterns</em></span>
        </span>
        <span style={{position:'relative',fontFamily:FX.mono,fontSize:20}}>→</span>
      </span>);
    return href ? <a href={href} style={{textDecoration:'none',display:'block'}}>{inner}</a> : <button onClick={onClick} style={{background:'none',border:'none',padding:0,cursor:'pointer',display:'block',width:'100%'}}>{inner}</button>;
  };
  const goProfile = () => { if (s.leaving) return; up({leaving:true}); setTimeout(()=>{ location.href = 'Conduxt Daily.html'; }, 1300); };
  const saveGoogle = () => { localStorage.setItem('conduxt-visited','1'); localStorage.setItem('conduxt-landing','overview'); up({google:true,saved:true,name:'Lora Kantorovich',email:'lora@conduxt.com',panel:'done'}); goProfile(); };
  const saveEmail = () => { localStorage.setItem('conduxt-visited','1'); localStorage.setItem('conduxt-landing','overview'); up({saved:true,name:s.name.trim(),email:s.email.trim(),panel:'done'}); goProfile(); };
  const saveForm = (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <Lbl style={{fontSize:10,color:CX.mg}}>— One last step</Lbl>
      <Serif size={m?26:30}>Keep your pattern. <em style={{color:CX.mg}}>Use it when things turn chaotic.</em></Serif>
      <p style={{margin:'0 0 6px',fontSize:15,lineHeight:1.5,color:CX.dg}}>All 22 of your patterns — ready for any moment at work.</p>
      <Btn onClick={saveGoogle} style={{height:56,justifyContent:'space-between'}}>Continue with Google <Arrow></Arrow></Btn>
      <div style={{display:'flex',alignItems:'center',gap:12}}><span style={{flex:1,height:1,background:CX.g}}></span><Lbl style={{fontSize:10,color:CX.mg}}>or</Lbl><span style={{flex:1,height:1,background:CX.g}}></span></div>
      <OBInput label="First name" value={s.name} onChange={v=>up({name:v})} placeholder="Lora"></OBInput>
      <OBInput label="Work email" type="email" value={s.email} onChange={v=>up({email:v.trim()})} placeholder="you@company.com"></OBInput>
      <Btn kind="o" disabled={!s.name.trim()||!validEmail} onClick={saveEmail} style={{height:52,justifyContent:'space-between',color:CX.ch}}>Email me a sign-in link <Arrow></Arrow></Btn>
    </div>
  );
  const back = <button onClick={()=>up({panel:'a'})} style={{background:'none',border:'none',padding:'8px 0',cursor:'pointer',color:CX.mg,alignSelf:'flex-start'}}><Lbl style={{fontSize:10}}>← Back</Lbl></button>;
  const qDone = s.ans.filter(x=>x!=null).length;
  const panelKey = (!s.panel || s.panel==='choose') ? 'a' : s.panel;
  let panel;
  if (panelKey==='choose') panel = (
    <>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <Lbl style={{color:CX.mg}}>— Your patterns</Lbl>
        <Serif size={m?30:40}>Bring what you already have. <em style={{color:CX.mg}}>We’ll find the pattern.</em></Serif>
        <p style={{margin:0,fontSize:16,lineHeight:1.55,color:CX.dg}}>Already taken Myers-Briggs, Enneagram or DISC? Add your results — or take one free. One is enough to start.</p>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {card(false, ()=>up({panel:'a'}), deep ? `${deep} added — add another` : 'Add your assessments', 'Myers-Briggs, Enneagram, DISC, Human Design or CliftonStrengths.', deep ? 'Your assessments' : 'Start here', OB_A.map(a=><V2AIcon key={a.k} a={a} done={s.res[a.k]} size={30}></V2AIcon>))}
      </div>
      {n>0 && cta(()=>up({reveal:true}))}
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        <Lbl style={{fontSize:10,color:CX.mg}}>What you unlock</Lbl>
        <div style={{display:'flex',flexDirection:'column',borderTop:`1px solid ${CX.g}`}}>
          <div style={{display:'grid',gridTemplateColumns:'48px minmax(0,1fr)',gap:14,alignItems:'center',padding:'14px 0',borderBottom:`1px solid ${CX.g}`}}>
            <span style={{fontFamily:FX.serif,fontSize:36,lineHeight:1,textAlign:'center'}}>22</span>
            <span style={{display:'flex',flexDirection:'column',gap:3}}><span style={{fontFamily:FX.serif,fontSize:19}}>Insights on how you’re built to work</span><span style={{fontSize:13,color:CX.dg,lineHeight:1.4}}>Ideal roles, strengths, motivation, conflict, communication and more.</span></span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'48px minmax(0,1fr)',gap:14,alignItems:'center',padding:'14px 0',borderBottom:`1px solid ${CX.g}`}}>
            <span style={{width:40,height:40,borderRadius:'50%',justifySelf:'center',background:grad,boxShadow:`0 0 0 1px ${CX.smoke}`}}></span>
            <span style={{display:'flex',flexDirection:'column',gap:3}}><span style={{fontFamily:FX.serif,fontSize:19}}>A coach that knows you</span><span style={{fontSize:13,color:CX.dg,lineHeight:1.4}}>Ask about any moment — answers built on your patterns and your real context.</span></span>
          </div>
        </div>
      </div>
      <OBNote show={notes}>No account yet. Answers live in local state until the save step; then they're attached to the new contact.</OBNote>
    </>
  );
  else if (panelKey==='q') { const Q = OB_Q[Math.min(s.qi, OB_Q.length-1)], mk = Dm.find(d=>d.k===V2_QM[Math.min(s.qi,4)]); panel = (
    <>
      {back}
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <span style={{display:'flex',alignItems:'center',gap:10}}><Lbl style={{color:CX.mg}}>— {Math.min(s.qi+1,5)} of 5</Lbl></span>
        <Serif size={m?28:36}>{Q.q}</Serif>
      </div>
      <div key={s.qi} className="cx-fade" style={{display:'flex',flexDirection:'column',gap:8}}>
        {Q.o.map((o,i)=>{const on=s.ans[s.qi]===i;return(
          <button key={o.l} onClick={()=>answer(i)} style={{minHeight:56,display:'flex',alignItems:'center',gap:14,padding:'0 18px',borderRadius:6,border:`1px solid ${on?CX.ch:CX.smoke}`,background:on?CX.ch:'#fff',color:on?'#fff':CX.ch,cursor:'pointer',textAlign:'left',fontFamily:FX.sans,fontSize:16,transition:'all .2s'}}>
            <span style={{width:12,height:12,borderRadius:'50%',background:OB_C[o.c],flexShrink:0}}></span>{o.l}
          </button>);})}
      </div>
    </>
  ); }
  else if (panelKey==='a') panel = (
    <>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <Lbl style={{color:CX.mg}}>— Your assessments</Lbl>
        <Serif size={m?28:36}>Bring what you already have. <em style={{color:CX.mg}}>We’ll find the pattern.</em></Serif>
        <p style={{margin:0,fontSize:15,lineHeight:1.5,color:CX.dg}}>Add any you’ve taken, or take one free. One is enough for a clear picture, and each one you add sharpens it.</p>
      </div>
      <div style={{display:'flex',flexDirection:'column',borderTop:`1.5px solid ${CX.ch}`}}>
        {OB_A.map(a=>{const done=s.res[a.k], open=s.open===a.k, A=V2_A[a.k];return(
          <div key={a.k} style={{borderBottom:`1px solid ${CX.g}`}}>
            <button onClick={()=>up({open:open?null:a.k})} style={{width:'100%',display:'grid',gridTemplateColumns:'36px 1fr auto',gap:14,alignItems:'start',background:'none',border:'none',cursor:'pointer',textAlign:'left',color:CX.ch,padding:m?'12px 0':'14px 0'}}>
              <V2AIcon a={a} done={done}></V2AIcon>
              <span style={{display:'flex',flexDirection:'column',gap:6,minWidth:0}}>
                <span style={{fontFamily:FX.serif,fontSize:20}}>{a.t}</span>
                {done ? <span style={{fontFamily:FX.serif,fontStyle:'italic',fontSize:16,color:CX.ch,lineHeight:1.4}}>{v2Insight(a.k, done)}</span> : <span style={{fontSize:14,color:CX.dg,lineHeight:1.4}}>{A.tells}</span>}
                
              </span>
              {done ? <Lbl style={{fontSize:10,marginTop:6,color:CX.mg}}>{open?'–':'Edit'}</Lbl> : <span style={{fontFamily:FX.mono,color:CX.mg,marginTop:4}}>{open?'–':'+'}</span>}
            </button>
            {open && <div className="cx-fade" style={{padding:'0 0 16px 50px',display:'flex',flexDirection:'column',gap:10}}>
              <Lbl style={{fontSize:10,color:CX.mg}}>{a.upload?'Have your results?':'I’ve taken it — my result is'}</Lbl>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {a.upload
                ? <Btn kind="o" onClick={()=>addRes(a.k,'Uploaded')} style={{height:44,color:CX.ch}}>Upload PDF or screenshot <Arrow></Arrow></Btn>
                : a.opts.map(o=><button key={o} onClick={()=>addRes(a.k,o)} style={{minHeight:44,minWidth:44,padding:'0 12px',borderRadius:999,border:`1px solid ${CX.g}`,background:'#fff',color:CX.ch,cursor:'pointer',fontFamily:FX.sans,fontSize:14}}>{o}</button>)}
              </div>
              <a href={V2_FREE_URL} target="_blank" rel="noopener" style={{alignSelf:'flex-start',minHeight:44,display:'flex',alignItems:'center',gap:10,padding:'0 16px',borderRadius:4,background:CX.ch,color:'#fff',textDecoration:'none',fontFamily:FX.sans,fontSize:14,fontWeight:700}}>Take it free · {V2_FREE[a.k]} <span style={{fontFamily:FX.mono}}>↗</span></a>
            </div>}
          </div>);})}
      </div>
      {deep > 0
        ? cta(()=>up({reveal:true}))
        : <button onClick={()=>s.saved ? goProfile() : up({panel:'save'})} style={{alignSelf:'flex-start',background:'none',border:'none',cursor:'pointer',color:CX.mg,padding:'0',minHeight:44,display:'flex',alignItems:'center'}}><Lbl style={{fontSize:11}}>Skip for now →</Lbl></button>}
    </>
  );
  else if (panelKey==='i') panel = (
    <>
      {back}
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <Lbl style={{color:CX.mg}}>— Your context</Lbl>
        <Serif size={m?28:36}>Bring your patterns <em style={{color:CX.mg}}>into your day.</em></Serif>
        <p style={{margin:0,fontSize:15,lineHeight:1.5,color:CX.dg}}>Each tool adds context to one moment, so insights show up when you need them.</p>
      </div>
      <div style={{display:'flex',flexDirection:'column',borderTop:`1.5px solid ${CX.ch}`}}>
        {Dm.map(x=>{const I=V2_INT[x.k], con=(s.int||{})[x.k];return(
          <div key={x.k} style={{display:'grid',gridTemplateColumns:'auto 1fr auto',gap:14,alignItems:'center',padding:'14px 0',borderBottom:`1px solid ${CX.g}`}}>
            <V2Logos k={x.k} size={36}></V2Logos>
            <span style={{display:'flex',flexDirection:'column',gap:4,minWidth:0}}>
              <span style={{display:'flex',alignItems:'center',gap:8}}><span style={{width:8,height:8,borderRadius:'50%',background:x.bg}}></span><Lbl style={{fontSize:10,color:CX.mg}}>{x.t}</Lbl></span>
              <span style={{fontFamily:FX.serif,fontSize:19}}>{I.n}</span>
              <span style={{fontSize:13,color:CX.dg,lineHeight:1.4}}>{I.d}</span>
            </span>
            <button onClick={()=>!con&&connect(x.k)} style={{minHeight:44,padding:'0 14px',borderRadius:999,border:`1px solid ${CX.ch}`,background:con?CX.ch:'transparent',color:con?'#fff':CX.ch,cursor:con?'default':'pointer',fontFamily:FX.sans,fontSize:14,whiteSpace:'nowrap'}}>{con?'Connected ✓':'Connect'}</button>
          </div>);})}
      </div>
    </>
  );
  else if (panelKey==='save') panel = (
    <>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        <Lbl style={{color:CX.mg}}>— Save your patterns</Lbl>
        <Serif size={m?28:36}>{found.length ? <>Save your patterns to see your <em style={{color:CX.mg}}>full profile.</em></> : <>Save now, <em style={{color:CX.mg}}>add patterns anytime.</em></>}</Serif>
        <p style={{margin:0,fontSize:15,lineHeight:1.5,color:CX.dg}}>{found.length ? 'Your signature and every pattern — ready for any moment at work.' : 'Your profile starts grey and fills with colour as you add insight.'}</p>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:12}}><span style={{flex:1,height:1,background:CX.g}}></span><Lbl style={{fontSize:10,color:CX.mg}}>Save in one tap</Lbl><span style={{flex:1,height:1,background:CX.g}}></span></div>
      <Btn onClick={saveGoogle} style={{height:56,justifyContent:'space-between'}}>Continue with Google <Arrow></Arrow></Btn>
      <div style={{display:'flex',alignItems:'center',gap:12}}><span style={{flex:1,height:1,background:CX.g}}></span><Lbl style={{fontSize:10,color:CX.mg}}>or</Lbl><span style={{flex:1,height:1,background:CX.g}}></span></div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <OBInput label="First name" value={s.name} onChange={v=>up({name:v})} placeholder="Lora"></OBInput>
        <OBInput label="Work email" type="email" value={s.email} onChange={v=>up({email:v.trim()})} placeholder="you@company.com"></OBInput>
        <Btn kind="o" disabled={!s.name.trim()||!validEmail} onClick={saveEmail} style={{height:52,justifyContent:'space-between',color:CX.ch}}>Email me a sign-in link <Arrow></Arrow></Btn>
      </div>
      <button onClick={()=>up({panel:'a'})} style={{background:'none',border:'none',cursor:'pointer',color:CX.mg,padding:'8px 0',alignSelf:'flex-start'}}><Lbl style={{fontSize:10}}>← Add more first</Lbl></button>
      <OBNote show={notes}>Asked once, at the end — after the reveal or a skip. Google → verified contact. Email → contact created unverified; a magic link is sent and confirmed later (never blocks).</OBNote>
    </>
  );
  else panel = (
    <>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <Lbl style={{color:CX.mg}}>— Saved{s.google?' · verified':''}</Lbl>
        <Serif size={m?30:40}>{s.name ? s.name.split(' ')[0]+', welcome back.' : 'Welcome back.'} <em style={{color:CX.mg}}>Your patterns are saved.</em></Serif>
        <p style={{margin:0,fontSize:16,lineHeight:1.5,color:CX.dg}}>Your patterns get clearer every time you add more insight.</p>
      </div>
      {!s.google && s.email && <div style={{display:'flex',gap:10,alignItems:'center',background:'#fff',border:`1px solid ${CX.smoke}`,borderRadius:6,padding:'12px 14px',fontSize:14,color:CX.dg}}><span style={{width:8,height:8,borderRadius:'50%',background:CX.apple,flexShrink:0}}></span>We sent a link to {s.email} — tap it whenever. You can keep going.</div>}
      <Btn onClick={goProfile} style={{height:56,justifyContent:'space-between'}}>Open my full profile <Arrow></Arrow></Btn>
      {OB_A.some(a=>!s.res[a.k]) && <Btn kind="o" onClick={()=>up({panel:'a'})} style={{height:52,justifyContent:'space-between',color:CX.ch}}>Add an assessment <Arrow></Arrow></Btn>}
      <button onClick={()=>{localStorage.removeItem(V2_KEY);setS(V2_INIT);}} style={{background:'none',border:'none',cursor:'pointer',color:CX.g,padding:'8px 0',alignSelf:'flex-start'}}><Lbl style={{fontSize:9}}>Restart demo</Lbl></button>
    </>
  );

  return (
    <div data-screen-label={'Sign up v2 · ' + panelKey} style={{height:'100dvh',overflow:'hidden',background:CX.linen,color:CX.ch,display:m?'flex':'grid',flexDirection:'column',gridTemplateColumns:m?undefined:'minmax(0,1.6fr) minmax(360px,1fr)'}}>
      {product}
      {!s.introDone && !s.saved && !s.ans.length && !Object.keys(s.res).length && <V2Intro onStart={()=>up({introDone:true})}></V2Intro>}
      {s.leaving && <div className="cx-fade" style={{position:'fixed',inset:0,zIndex:300,background:CX.linen,display:'flex',alignItems:'center',justifyContent:'center',animationDuration:'1.1s'}}><div style={{position:'relative',width:320,height:320}}><div style={{position:'absolute',inset:0,borderRadius:'50%',background:grad,filter:'blur(40px)',opacity:.6}}></div><img src="assets/session/conduxt-mark.png" alt="" style={{position:'absolute',left:'50%',top:'50%',height:64,transform:'translate(-50%,-50%)'}}></img></div></div>}
      {s.reveal && <V2Reveal lv={lv} saveForm={saveForm} found={found} grad={grad} sig={sig} name={s.name} saved={s.saved} onDone={()=>s.saved ? goProfile() : up({reveal:false,panel:'save',fromReveal:true})}></V2Reveal>}
      <div style={{background:CX.cream,borderLeft:m?'none':`1px solid ${CX.g}`,padding:m?'16px 20px 16px':'32px 40px',display:'flex',flexDirection:'column',minWidth:0,minHeight:0,flex:m?1:undefined,height:m?undefined:'100dvh'}}>
        <FitBox center={!m}><div key={panelKey} className="cx-fade" style={{display:'flex',flexDirection:'column',gap:m?16:20}}>{panel}</div></FitBox>
      </div>
    </div>
  );
}

Object.assign(window, { OnboardV2 });
