(() => {
  'use strict';
  const cover=document.querySelector('.kinetic-cover');
  if(!cover)return;
  const title=cover.querySelector('.kinetic-title');
  const tracks=[...cover.querySelectorAll('.cover-title-track')];
  const glyphs=[...cover.querySelectorAll('.cover-glyph-motion')];
  const streaks=[...cover.querySelectorAll('.launch-streak')];
  const launchPixels=[...cover.querySelectorAll('.launch-pixel')];
  const agentic=cover.querySelector('.cover-agentic');
  const gate=cover.querySelector('.cover-start-gate');
  const startButton=cover.querySelector('[data-cover-start]');
  const actions=cover.querySelector('.cover-actions');
  const remix=cover.querySelector('[data-cover-remix]');
  const motion=cover.querySelector('[data-cover-motion]');
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const projector=window.createCoverProjector(cover);
  const animations=new Set(),timers=new Set();
  let stopped=preference.matches,wasActive=false,fontReady=false,run=0,started=false;
  const visible=()=>fontReady&&cover.classList.contains('active')&&!document.hidden;
  function animate(node,frames,options){
    const animation=node.animate(frames,options);
    animations.add(animation);
    animation.finished.then(()=>animations.delete(animation),()=>animations.delete(animation));
    return animation;
  }
  function later(callback,delay){
    const token=run;
    const timer=setTimeout(()=>{
      timers.delete(timer);
      if(token===run&&!stopped&&visible())callback();
    },delay);
    timers.add(timer);
  }
  function stop(){
    run++;
    timers.forEach(clearTimeout);timers.clear();
    animations.forEach(animation=>animation.cancel());animations.clear();
    projector.stop();
    cover.classList.remove('cover-ready','cover-settled');
    cover.removeAttribute('data-cover-phase');
  }
  function revealTitle(width){
    // A single launch burst. Once each letter arrives, it remains readable.
    streaks.forEach((streak,i)=>animate(streak,[
      {transform:'translate(-50%,-50%) scaleX(0)',opacity:0},
      {transform:'translate(-50%,-50%) scaleX(.1)',opacity:.8,offset:.12},
      {transform:'translate(-50%,-50%) scaleX(1)',opacity:.45,offset:.6},
      {transform:'translate(-50%,-50%) scaleX(1.12)',opacity:0}
    ],{duration:570,delay:i*45,easing:'cubic-bezier(.12,.85,.2,1)',fill:'backwards'}));
    launchPixels.forEach((pixel,i)=>{
      const direction=i%2?1:-1;
      const distance=width*(.16+(i%5)*.055);
      const x=direction*distance,y=((i%9)-4)*18;
      animate(pixel,[
        {transform:'translate(-50%,-50%) scale(1.6)',opacity:0},
        {transform:`translate(${direction*22}px,${y*.1}px) scale(1.2)`,opacity:.9,offset:.14},
        {transform:`translate(${x*.82}px,${y*.83}px) scale(.8)`,opacity:.6,offset:.7},
        {transform:`translate(${x}px,${y}px) scale(.3)`,opacity:0}
      ],{duration:650+(i%3)*70,delay:(i%4)*25,easing:'cubic-bezier(.1,.7,.2,1)',fill:'backwards'});
    });
    glyphs.forEach((glyph,i)=>{
      const direction=i%2?1:-1;
      const distance=130+Math.abs(i-(glyphs.length-1)/2)*36;
      const y=((i%3)-1)*100;
      animate(glyph,[
        {transform:`perspective(600px) translate(${direction*distance}px,${y}px) rotateY(${direction*65}deg) rotateZ(${direction*-10}deg) scale(.45,1.5)`,clipPath:'inset(48% 0 48% 0)',opacity:0},
        {transform:`perspective(600px) translate(${direction*distance*.7}px,${y*.5}px) rotateY(${direction*40}deg) rotateZ(${direction*-6}deg) scale(.7,1.3)`,clipPath:'inset(30% 0 30% 0)',opacity:1,offset:.2},
        {transform:`perspective(600px) translate(${direction*-7}px,0) rotateY(0deg) rotateZ(0deg) scale(1.06,.98)`,clipPath:'inset(-10% -20% -10% -20%)',opacity:1,offset:.72},
        {transform:'perspective(600px) translate(0,0) rotateY(0deg) rotateZ(0deg) scale(1)',clipPath:'inset(-10% -20% -10% -20%)',opacity:1}
      ],{duration:630,delay:80+i*32,easing:'cubic-bezier(.16,.8,.25,1)',fill:'backwards'});
    });
  }
  function play(){
    stop();
    if(!started){waitForStart();return;}
    if(!visible())return;
    if(stopped){cover.classList.add('cover-ready','cover-settled');cover.dataset.coverPhase='settled';projector.still();return;}
    const box=cover.getBoundingClientRect(),scale=box.width/cover.offsetWidth;
    const w=cover.offsetWidth,h=cover.offsetHeight;
    const revealDuration=1040;
    const metrics=tracks.map(track=>{
      const rect=track.getBoundingClientRect();
      return {cx:(rect.x+rect.width/2-box.x)/scale,cy:(rect.y+rect.height/2-box.y)/scale,width:rect.width/scale,font:parseFloat(getComputedStyle(track.firstElementChild).fontSize)};
    });
    // Both lines begin on the same baseline, as one complete title.
    const fullFont=Math.min(106,(w-70)/(metrics.reduce((sum,m)=>sum+m.width/m.font,0)+.25));
    const gap=fullFont*.25,widths=metrics.map(m=>m.width*fullFont/m.font);
    let left=(w-widths[0]-gap-widths[1])/2;
    tracks.forEach((track,index)=>{
      const {cx,cy,width,font}=metrics[index];
      const joined=`translate(${left+widths[index]/2-cx}px,${h*.49-cy}px) scale(${fullFont/font})`;
      left+=widths[index]+gap;
      const spreadScale=Math.min(index?1.4:1.28,(w-50)/width);
      const spread=`translate(${w/2-cx}px,${h*(index?.68:.32)-cy}px) scale(${spreadScale})`;
      animate(track,[
        {transform:joined},
        {transform:joined,offset:.48,easing:'cubic-bezier(.72,0,.18,1)'},
        {transform:spread,offset:.65},
        {transform:spread,offset:.75,easing:'cubic-bezier(.75,0,.18,1)'},
        {transform:'translate(0,0) scale(1)'}
      ],{duration:2520,delay:revealDuration,easing:'linear',fill:'backwards'});
    });
    revealTitle(w);
    cover.classList.add('cover-ready');
    cover.dataset.coverPhase='assembling';
    later(()=>{cover.dataset.coverPhase='joined';},revealDuration);
    later(()=>{cover.dataset.coverPhase='splitting';},revealDuration+1210);
    later(()=>{cover.dataset.coverPhase='separated';},revealDuration+1640);
    later(()=>{cover.dataset.coverPhase='corners';},revealDuration+1890);
    later(()=>{
      cover.classList.add('cover-settled');
      cover.dataset.coverPhase='settled';
      animate(agentic,[
        {transform:'translateX(-360px)'},
        {transform:'translateX(0)'}
      ],{duration:320,easing:'cubic-bezier(.12,.85,.2,1)',fill:'backwards'});
      projector.start();
    },revealDuration+2540);
  }
  function waitForStart(){
    gate.hidden=false;
    actions.hidden=true;
    cover.dataset.coverPhase='waiting';
  }
  function startIntro(){
    if(!fontReady)return;
    started=true;
    gate.hidden=true;
    actions.hidden=false;
    play();
    if(document.activeElement===startButton)remix.focus({preventScroll:true});
  }
  function sync(){
    const active=visible();
    if(active&&!wasActive)play();
    if(!active&&wasActive){
      stop();
      if(!cover.classList.contains('active')){started=false;waitForStart();}
    }
    wasActive=active;
  }
  function setStopped(value){
    stopped=value;
    cover.classList.toggle('cover-motion-off',stopped);
    motion.setAttribute('aria-pressed',String(stopped));
    motion.setAttribute('aria-label',stopped?'제목 움직임 켜기':'제목 움직임 끄기');
    motion.firstElementChild.textContent=stopped?'▷':'Ⅱ';
    motion.title=stopped?'움직임 켜기':'움직임 끄기';
    remix.disabled=stopped;
    play();
  }
  startButton.addEventListener('click',startIntro);
  remix.addEventListener('click',play);
  title.addEventListener('click',play);
  motion.addEventListener('click',()=>setStopped(!stopped));
  preference.addEventListener('change',()=>setStopped(preference.matches));
  addEventListener('resize',()=>{if(visible())play();});
  document.addEventListener('visibilitychange',sync);
  new MutationObserver(sync).observe(cover,{attributes:true,attributeFilter:['class']});
  setStopped(stopped);
  document.fonts.ready.then(()=>{fontReady=true;startButton.disabled=false;sync();});
})();
