function BookOpen({ name, onOpen }) {
  const w = useWidth(), m = w < 760;
  const vh = useVH(), short = vh < 720;
  const Dd = window.DAILY;
  const [ph, setPh] = React.useState(0);
  React.useEffect(()=>{ const ts=[setTimeout(()=>setPh(1),80), setTimeout(()=>setPh(2),800), setTimeout(()=>setPh(3),1150), setTimeout(()=>setPh(4),1400), setTimeout(()=>setPh(5),1650)]; return ()=>ts.forEach(clearTimeout); },[]);
  const open = () => { if (ph>=6) return; setPh(6); setTimeout(()=>setPh(7), 700); setTimeout(onOpen, 1300); };
  const orb = m ? (short ? 96 : 128) : (short ? 140 : 200);
  const grad = personalAura(Dd.traits);
  const cards = [
    { t:'How you work', d:'22 patterns on how you work best, from how you decide to how you handle conflict.', c:'#8FA590' },
    { t:'Your signal', d:'A mirror for any moment at work. Tell it what’s happening and get your next move.', c:'#FF6B5A' },
    { t:'Your team', d:'Invite the people you work with. See how your patterns fit together, and where they clash.', c:'#6B9BD4' }
  ];
  const ease = 'cubic-bezier(.2,.7,.2,1)';
  const show = (n) => ({ opacity: ph>=n && ph<6 ? 1 : 0, transform: ph>=n ? 'none' : 'translateY(10px)', transition: `opacity .8s ${ease}, transform .8s ${ease}` });
  return (
    <div style={{position:'fixed',inset:0,zIndex:400,background:CX.linen,color:CX.ch,display:'flex',flexDirection:'column',padding:m?'56px 20px 20px':short?'64px 40px 24px':'80px 40px 40px',opacity:ph>=7?0:1,transition:'opacity .6s ease',pointerEvents:ph>=7?'none':'auto',overflow:'hidden'}}>
      <Grain o={.25}></Grain>
      <div style={{position:'absolute',left:m?20:40,top:m?20:28}}><Logo h={m?14:18}></Logo></div>
      <FitBox><div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:m?20:short?24:36,width:'100%',maxWidth:1000,margin:'0 auto'}}>
        <div style={{position:'relative',width:orb,height:orb,flexShrink:0,transform:`scale(${ph>=6?3:ph>=1?1:.5})`,opacity:ph>=1?1:0,transition:ph>=6?'all 1.1s cubic-bezier(.6,0,.2,1)':`all 1.4s ${ease}`}}>
          <div className="cx-breathe" style={{position:'absolute',inset:-orb*.22,borderRadius:'50%',background:grad,filter:'blur(26px)',opacity:.8}}></div>
          <img src="assets/session/conduxt-mark.png" alt="" style={{position:'absolute',left:'50%',top:'50%',height:orb*.22,transform:'translate(-50%,-50%)',opacity:ph>=6?0:1,transition:'opacity .4s'}}></img>
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:m?12:16,textAlign:'center',...show(2)}}>
          <Lbl wide style={{fontSize:10,color:CX.mg}}>Your pattern</Lbl>
          <Serif size={m?34:short?44:60} style={{lineHeight:1.04,letterSpacing:'-.02em',textWrap:'balance'}}>You, <em style={{color:CX.mg}}>without the noise.</em></Serif>
          <span style={{fontSize:m?15:18,color:CX.dg,maxWidth:520,lineHeight:1.5,textWrap:'pretty'}}>This is how you work best, clearly. Use it when things turn chaotic.</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(3,minmax(0,1fr))',gap:m?8:16,width:'100%',maxWidth:m?420:1000}}>
          {cards.map((p,i)=><div key={p.t} style={{position:'relative',display:'flex',flexDirection:m?'row':'column',alignItems:'flex-start',gap:m?14:short?14:22,background:'#fff',borderRadius:6,padding:m?'14px 16px':short?'20px 22px':'26px 26px 28px',boxShadow:'0 8px 24px rgba(32,34,33,.06)',overflow:'hidden',...show(3+i)}}>
            <span style={{position:'absolute',left:0,right:0,top:0,height:3,background:p.c}}></span>
            {!m && <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}><span style={{width:28,height:28,borderRadius:'50%',background:`radial-gradient(circle, ${p.c} 0%, ${p.c}99 45%, ${p.c}00 72%)`}}></span><span style={{fontFamily:FX.mono,fontSize:11,letterSpacing:'.18em',color:CX.mg}}>0{i+1}</span></div>}
            {m && <span style={{width:22,height:22,marginTop:2,borderRadius:'50%',flexShrink:0,background:`radial-gradient(circle, ${p.c} 0%, ${p.c}99 45%, ${p.c}00 72%)`}}></span>}
            <span style={{display:'flex',flexDirection:'column',gap:m?4:8,minWidth:0}}>
              <span style={{fontFamily:FX.serif,fontSize:m?19:24,lineHeight:1.1}}>{p.t}</span>
              <span style={{fontSize:m?13:14,color:CX.dg,lineHeight:1.5,textWrap:'pretty'}}>{p.d}</span>
            </span>
          </div>)}
        </div>
        <div style={{opacity:ph>=5&&ph<6?1:0,transition:'opacity .6s ease',width:m?'100%':'auto',maxWidth:420,display:'flex',justifyContent:'center'}}>
          <Btn onClick={open} style={{height:short?48:56,width:m?'100%':'auto',justifyContent:'center',padding:'0 32px'}}>Get clear &amp; act <Arrow></Arrow></Btn>
        </div>
      </div></FitBox>
    </div>
  );
}
Object.assign(window, { BookOpen });
