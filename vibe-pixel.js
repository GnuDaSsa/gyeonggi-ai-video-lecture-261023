(() => {
 'use strict';
 const slide=document.querySelector('.vibe-pixel-slide');if(!slide)return;
 const q=s=>slide.querySelector(s),ctx=q('canvas').getContext('2d');if(!ctx)return;
 const scenes=[
  {ms:6500,request:'드론축구대회 영상 만들고 싶어.\n장면 1, 경기장으로 기체들 입장!',tool:'기획 메모',title:'장면부터 이야기',files:['장면 1 · 경기장 입장','장면 2 · 골대를 향해 돌진','장면 3 · 골인, 관객 환호'],status:'원하는 장면과 분위기 전달'},
  {ms:6500,request:'노래는 긴장감 있게.\n후렴에서 확 터지는 느낌!',tool:'Suno 음악 요청',title:'노래의 방향',files:['전반부 · 긴장감 있는 리듬','후렴 · 강한 드럼과 합창','스타일·가사 요청문 작성'],status:'생성한 음악은 내가 듣고 선택'},
  {ms:7500,request:'좋아, 이 노래로 가자.\n음악에 맞춰 장면·요청문 정리해줘.',tool:'Codex · 로컬 작업 폴더',title:'제작자료 정리',files:['장면별 컷 구성.md','이미지·영상 프롬프트.txt','참조 이미지 · 선택한 음악'],status:'파일 작성·정리, 필요한 코드 실행'},
  {ms:7500,request:'참조 이미지랑 요청문을\nRunway에 넣고 생성해줘.',tool:'Runway · 화면 조작 예시',title:'브라우저로 실행',files:['화면 확인 → 참조 첨부','요청문 입력 → 설정 확인','생성 클릭 → 결과 확인'],status:'이 화면 조작이 컴퓨터 유즈'},
  {ms:8500,request:'링을 스치지 말고,\n가운데로 통과하게 수정해줘.',tool:'생성 결과 검수',title:'보고, 다시 수정',files:['기체 모습 · 움직임 확인','통과 장면 · 앞뒤 관계 확인','요청문 수정 → 다시 생성'],status:'쓸 구간 선택 후 CapCut 편집'}
 ];
 const c={ink:'#262c28',rust:'#bf5333',paper:'#fafaf7',pale:'#e7e8e3',skin:'#d2af8e',hair:'#302e29',shirt:'#9b9f8b',green:'#9aaf8c'};
 const duration=scenes.reduce((s,x)=>s+x.ms,0),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let elapsed=reduced?20500:0,last=0,raf=0,paused=reduced,active=false,phase=-1;
 function rect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h)}
 function line(x1,y1,x2,y2,color){ctx.strokeStyle=color;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(Math.round(x1),Math.round(y1));ctx.lineTo(Math.round(x2),Math.round(y2));ctx.stroke()}
 function drone(x,y,color,wing=0){rect(x-7,y-5,14,1,color);rect(x-7,y+5,14,1,color);rect(x-8,y-4,1,9,color);rect(x+7,y-4,1,9,color);rect(x-3,y-2,6,4,color);rect(x-5,y-4,2,2,c.paper);rect(x+3,y+2,2,2,c.paper);rect(x-11,y-3+wing,5,1,c.ink);rect(x+7,y+2-wing,5,1,c.ink)}
 function ring(x,y){rect(x-2,y-16,4,3,c.rust);rect(x-2,y+13,4,3,c.rust);rect(x-8,y-13,3,26,c.rust);rect(x+5,y-13,3,26,c.rust);rect(x-6,y-16,5,3,c.rust);rect(x+1,y+13,5,3,c.rust);rect(x-1,y+16,2,16,c.ink)}
 function arena(t,p,progress){
   rect(283,53,123,73,'#d5dacd');rect(283,108,123,18,'#c0c8b5');
   for(let x=287;x<403;x+=8){rect(x,58,3,3,'#88977c');rect(x+2,63,3,3,'#9da88e')}
   line(283,108,406,108,'#9aa58d');line(283,126,330,108,'#e6e9df');line(406,126,360,108,'#e6e9df');
   if(p===0){ring(386,93);drone(298+progress*48,90+Math.sin(t/600)*2,c.ink,Math.floor(t/100)%2);drone(294+progress*35,107,c.rust)}
   else{ring(365,89);let fly=(t%3000)/3000;drone(298+fly*92,90+Math.sin(t/600)*2,c.ink,Math.floor(t/100)%2);if(fly>.76){rect(388,72,2,7,c.rust);rect(384,75,10,2,c.rust)}}
 }
 function draw(t,p,local){
  ctx.clearRect(0,0,424,155);ctx.imageSmoothingEnabled=false;
  rect(0,141,147,14,'#d8dbd2');rect(14,130,130,4,c.ink);rect(24,134,4,21,c.ink);rect(137,134,4,21,c.ink);
  // Person at the keyboard, facing the screen.
  rect(42,85,33,30,c.skin);rect(38,78,41,27,c.hair);rect(42,73,33,7,c.hair);rect(38,89,5,21,c.hair);rect(74,89,5,21,c.hair);
  rect(51,105,16,9,c.skin);rect(32,112,52,32,c.shirt);rect(27,118,10,17,c.shirt);rect(79,118,12,10,c.shirt);
  rect(38,122,40,27,'#51594d');rect(42,149,7,6,c.ink);rect(67,149,7,6,c.ink);rect(85,123,25,7,c.skin);rect(108,122+Math.floor(t/170)%2,10,5,c.skin);
  rect(96,93,47,29,c.ink);rect(99,96,41,22,'#d2d8cb');rect(115,122,8,7,c.ink);
  for(let i=0;i<4;i++)rect(103,101+i*4,14+i*3,1,i===0?c.rust:'#8b9685');
  rect(103,129,37,2,c.ink);
  // A shared work window: files on the left, pixel illustration on the right.
  rect(151,9,265,131,c.ink);rect(154,12,259,125,c.paper);rect(154,12,259,9,'#d1d6c9');
  for(let i=0;i<3;i++)rect(158+i*5,15,2,2,i===0?c.rust:'#9ca893');
  rect(276,27,1,104,'#dedfd8');
  const progress=local/scenes[p].ms;
  if(p===0||p===4){arena(t,p,progress);if(p===4){rect(284,130,122,2,'#d2d6ca');rect(284,130,Math.floor(progress*122),2,c.rust)}}
  if(p===1){
   rect(284,34,121,91,'#303a31');
   for(let i=0;i<24;i++){const h=5+Math.abs(Math.sin(t/240+i*.8))*36;rect(287+i*5,86-h/2,3,Math.round(h),i%4===0?'#d6b68f':c.green)}
   rect(291,43,18,2,'#d6b68f');rect(291,48,45,2,'#8d9e86');rect(292,113,82,1,'#6c7e65');rect(292,113,Math.floor(progress*82),1,c.green);
   rect(388,108,2,9,c.paper);rect(390,110,2,5,c.paper);rect(392,112,2,1,c.paper);
  }
  if(p===2){
   rect(284,33,121,48,'#303a31');const rows=['mkdir drone-football','write scene-plan.md','save prompts.txt','scan references/','build review.html'];
   ctx.fillStyle='#b9c6b3';ctx.font='4px monospace';rows.forEach((s,i)=>{if(local>i*650)ctx.fillText(s,289,42+i*7)});
   for(let i=0;i<3;i++){const y=89+i*12;rect(289,y,9,9,'#d5b890');rect(291,y-2,5,2,'#d5b890');rect(304,y+2,65,2,'#b5beb0');if(local>2000+i*800)rect(389,y+2,4,4,c.green)}
  }
  if(p===3){
   rect(284,30,121,95,'#e7e8e3');rect(289,35,111,8,c.paper);
   const step=Math.min(2,Math.floor(progress*3));
   rect(290,49,27,25,'#c8d2bd');if(step>=0)drone(303,61,c.ink);
   rect(322,49,74,25,c.paper);for(let i=0;i<4;i++)if(local>600+i*250)rect(326,54+i*4,55-i*6,1,'#8f9e85');
   rect(290,80,105,8,c.paper);rect(294,83,30,2,'#8f9e85');
   rect(343,98,52,15,step===2?c.rust:c.ink);ctx.fillStyle=c.paper;ctx.font='5px monospace';ctx.fillText(step===2?'Creating...':'Generate',349,107);
   const x=step===0?307:step===1?354:374,y=step===0?66:step===1?63:104;
   rect(x,y,2,9,c.rust);rect(x+2,y+2,2,6,c.rust);rect(x+4,y+4,2,4,c.rust);
   if(step===2){rect(289,119,106,2,'#c6cdbf');rect(289,119,Math.floor((progress*3-2)*106),2,c.rust)}
  }
 }
 function position(){let t=elapsed%duration;for(let i=0;i<scenes.length;i++){if(t<scenes[i].ms)return [i,t];t-=scenes[i].ms}return [0,0]}
 function render(){
  const [p,local]=position();
  if(p!==phase){phase=p;const s=scenes[p];q('[data-vp-request]').textContent=s.request;q('[data-vp-tool]').textContent=s.tool;q('[data-vp-heading]').textContent=s.title;
   const ul=q('[data-vp-files]');ul.replaceChildren(...s.files.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));
   q('[data-vp-status]').textContent=s.status;slide.querySelectorAll('[data-vp-step]').forEach(el=>{const on=Number(el.dataset.vpStep)===p;el.classList.toggle('current',on);el.setAttribute('aria-pressed',String(on))});
  }draw(elapsed,p,local);
 }
 function stop(){cancelAnimationFrame(raf);raf=0;last=0}
 function tick(now){raf=0;if(!active||paused||document.hidden){last=0;return}if(last)elapsed+=Math.min(now-last,100);last=now;render();raf=requestAnimationFrame(tick)}
 function start(){if(active&&!paused&&!document.hidden&&!raf){last=0;raf=requestAnimationFrame(tick)}}
 function buttons(){q('[data-vp-toggle]').textContent=paused?'▶ 재생':'Ⅱ 멈춤';q('[data-vp-toggle]').setAttribute('aria-label',paused?'픽셀 애니메이션 재생':'픽셀 애니메이션 일시정지')}
 q('[data-vp-toggle]').addEventListener('click',()=>{paused=!paused;buttons();paused?stop():start()});
 q('[data-vp-replay]').addEventListener('click',()=>{stop();elapsed=0;phase=-1;paused=false;buttons();render();start()});
 slide.querySelectorAll('[data-vp-step]').forEach(el=>el.addEventListener('click',()=>{stop();elapsed=scenes.slice(0,Number(el.dataset.vpStep)).reduce((s,x)=>s+x.ms,0)+Math.min(4500,scenes[Number(el.dataset.vpStep)].ms-100);phase=-1;paused=true;buttons();render()}));
 function sync(){const next=slide.classList.contains('active');if(next&&!active){elapsed=reduced?25000:0;phase=-1;active=true;render();start()}else if(!next){active=false;stop()}}
 new MutationObserver(sync).observe(slide,{attributes:true,attributeFilter:['class']});document.addEventListener('visibilitychange',()=>document.hidden?stop():start());buttons();render();sync();
})();
