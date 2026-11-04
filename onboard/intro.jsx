function V2Intro({ onStart }) {
  const w = useWidth(), m = w < 760, vh = useVH(), short = vh < 720;
  const Dd = window.DAILY;
  const names = OB_A.map(a => a.t), dots = OB_A.map(a => OB_C[a.c]);
  const [ph, setPh] = React.useState(0);
  const [askQ, setAskQ] = React.useState(false), [sit, setSit] = React.useState(null);
  const textH = askQ ? (m ? 340 : 260) : (short ? 270 : 310);
  const avail = vh - (short ? 76 : 104) - textH - (short ? 20 : 36);
  const Ry = Math.max(30, Math.min(m ? 150 : 250, avail/2 - 18));
  const Rx = Math.min((w-40)/2 - (m ? 70 : 120), 340);
  const ring = Rx >= 90;
  const R = ring ? Ry : 0;
  const orb = Math.max(80, Math.min(260, Ry*1.4, avail)), box = ring ? Math.max(R*2 + 36, orb) : orb, boxW = ring ? Rx*2 : orb;
  const words = !ring ? [] : names;
  React.useEffect(()=>{ const t = setTimeout(()=>setPh(1), 60); return ()=>clearTimeout(t); },[]);
  const [rot, setRot] = React.useState(0);
  React.useEffect(()=>{ if (grey) return; let raf, t0 = performance.now(), last = 0; const tick = now => { if (now - last > 40) { setRot((now - t0)/1000 * (Math.PI*2/70)); last = now; } raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); return ()=>cancelAnimationFrame(raf); },[ph>=2]);
  const pickSit = k => { setSit(k); try { localStorage.setItem('cx-situation', k); } catch(e){} setTimeout(go, 280); };
  const go = () => { if (ph>=2) return; setPh(2); setTimeout(()=>setPh(3), 1900); setTimeout(onStart, 2500); };
  const cols = ['#FF6B5A','#6B9BD4','#FFB6E3','#CBC064','#8FA590'];
  const grey = ph>=2;
  return (
    <div style={{position:'fixed',inset:0,zIndex:250,background:CX.linen,color:CX.ch,overflow:'hidden',display:'flex',flexDirection:'column',padding:short?'48px 16px 12px':'64px 20px 24px',opacity:ph>=3?0:1,transition:'opacity .6s ease'}}>
      <Grain o={.25}></Grain>
      <div style={{position:'absolute',left:m?20:40,top:m?20:28}}><Logo h={m?14:18}></Logo></div>
      <FitBox><div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:short?16:m?22:32}}>
      <div style={{position:'relative',width:boxW,height:box,flexShrink:0,opacity:ph>=1?1:0,transform:`scale(${ph>=1?1:.7})`,transition:'all 1.4s cubic-bezier(.2,.7,.2,1)'}}>
        <div style={{position:'absolute',left:'50%',top:'50%',width:orb,height:orb,marginLeft:-orb/2,marginTop:-orb/2,filter:`grayscale(${grey?1:0})`,opacity:grey?.55:1,transition:'filter 1.4s ease, opacity 1.4s ease'}}>
          <div style={{position:'absolute',inset:0,animation:'cxOrbit 26s linear infinite'}}>
            {cols.map((c,i)=>{const a=i/cols.length*Math.PI*2, d=orb*.16;return <div key={c} className="cx-breathe" style={{position:'absolute',left:'50%',top:'50%',width:orb*.78,height:orb*.78,marginLeft:-orb*.39+Math.cos(a)*d,marginTop:-orb*.39+Math.sin(a)*d,borderRadius:'50%',background:`radial-gradient(circle, ${c} 0%, ${c}AA 35%, ${c}00 70%)`,filter:'blur(18px)',opacity:.85,animationDelay:(-i*1.2)+'s'}}></div>;})}
          </div>
        </div>
        <img src="assets/session/conduxt-mark.png" alt="" style={{position:'absolute',left:'50%',top:'50%',height:orb*.17,transform:'translate(-50%,-50%)'}}></img>
        <div style={{position:'absolute',left:'50%',top:'50%',width:0,height:0}}>
          {[].map((t,i)=>{const a=i/words.length*Math.PI*2-Math.PI/2+rot, rx=grey?0:Rx, ry=grey?0:R;return (
            <div key={t} style={{position:'absolute',left:Math.cos(a)*rx,top:Math.sin(a)*ry,transition:grey?`left 1.2s cubic-bezier(.6,0,.2,1) ${i*25}ms, top 1.2s cubic-bezier(.6,0,.2,1) ${i*25}ms, opacity .9s ease ${i*25}ms`:'opacity .9s ease',opacity:ph>=1&&!grey?1:0}}>
              <div>
                <span style={{display:'flex',alignItems:'center',gap:8,transform:'translate(-50%,-50%)',whiteSpace:'nowrap',fontFamily:FX.sans,fontSize:m?13:15,color:CX.ch,background:'#fff',border:`1px solid ${CX.smoke}`,borderRadius:999,padding:m?'7px 12px':'9px 16px',boxShadow:'0 8px 24px rgba(32,34,33,.08)'}}><span style={{width:9,height:9,borderRadius:'50%',background:dots[names.indexOf(t)]}}></span>{t}</span>
              </div>
            </div>);})}
        </div>
      </div>
      <div style={{position:'relative',display:'grid',justifyItems:'center',textAlign:'center',minHeight:textH}}>
        <div style={{gridArea:'1 / 1',display:'flex',flexDirection:'column',alignItems:'center',gap:short?12:16,opacity:ph===1&&!askQ?1:0,transform:ph>=1&&!askQ?'none':'translateY(12px)',transition:'all .8s cubic-bezier(.2,.7,.2,1) .3s',pointerEvents:ph===1&&!askQ?'auto':'none'}}>
          <Serif size={m?(short?26:32):Math.max(30,Math.min(short?44:56,(w-80)/23))} style={{lineHeight:1.08,whiteSpace:m?'normal':'nowrap',textWrap:'balance'}}>When chaos hits, <em style={{color:CX.mg}}>see clearly and act accordingly.</em></Serif>
          <span style={{fontSize:m?15:18,lineHeight:1.5,color:CX.dg,maxWidth:540}}>Turn the noise into clarity, and clarity into action. See the patterns behind how you and your co-workers work, in minutes.</span>
          <Btn onClick={()=>setAskQ(true)} style={{height:short?50:56,marginTop:6}}>See your pattern <Arrow></Arrow></Btn>
        </div>
        <div style={{gridArea:'1 / 1',alignSelf:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:12,opacity:ph===2?1:0,transition:'opacity .8s ease .5s',pointerEvents:'none'}}>
          <Serif size={m?30:44} style={{maxWidth:640}}>Noise can feel like fog. <em style={{color:CX.mg}}>Each insight brings color and helps ground you in clarity.</em></Serif>
        </div>
        <div style={{gridArea:'1 / 1',alignSelf:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:short?14:20,opacity:ph===1&&askQ?1:0,transform:ph===1&&askQ?'none':'translateY(12px)',transition:'all .6s cubic-bezier(.2,.7,.2,1) .15s',pointerEvents:ph===1&&askQ?'auto':'none'}}>
          <Lbl style={{fontSize:10,color:CX.mg}}>— First, one question</Lbl>
          <Serif size={short?(m?28:34):(m?34:52)} style={{maxWidth:760,lineHeight:1.08}}>What’s happening <em style={{color:CX.mg}}>right now?</em></Serif>
          <div style={{display:'flex',flexDirection:m?'column':'row',gap:10,width:'100%',maxWidth:m?340:720,marginTop:4}}>
            {[['new','Facing a first','A new role, team or project'],['broke','Facing a fall out','A conflict, a miss, a hard week'],['change','A change is needed','You need a change, you just don’t know what']].map(([k,t,d])=>(
              <button key={k} onClick={()=>pickSit(k)} style={{flex:1,minHeight:m?56:96,display:'flex',flexDirection:'column',alignItems:m?'flex-start':'center',justifyContent:'center',gap:4,padding:m?'12px 18px':'16px 18px',borderRadius:6,border:'1px solid '+(sit===k?CX.ch:CX.smoke),background:sit===k?CX.ch:'#fff',color:sit===k?'#fff':CX.ch,cursor:'pointer',boxShadow:'0 8px 24px rgba(32,34,33,.06)',transition:'all .2s',textAlign:m?'left':'center'}}>
                <span style={{fontFamily:FX.serif,fontSize:m?19:22,lineHeight:1.15}}>{t}</span>
                <span style={{fontSize:13,opacity:.75}}>{d}</span>
              </button>))}
          </div>
        </div>
      </div>
      </div></FitBox>
    </div>
  );
}
Object.assign(window, { V2Intro });
