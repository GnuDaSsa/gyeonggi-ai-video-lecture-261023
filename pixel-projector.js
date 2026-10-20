// Tiny original pixel films, drawn locally at 12 fps. No downloads or media player.
window.createCoverProjector=cover=>{
  const camera=cover.querySelector('.pixel-camera'),screen=cover.querySelector('.cinema-screen');
  const beam=cover.querySelector('.cinema-beam'),canvas=screen.querySelector('canvas'),ctx=canvas.getContext('2d');
  const workstation=cover.querySelector('.pixel-workstation'),workCanvas=workstation.querySelector('canvas'),workCtx=workCanvas.getContext('2d');
  const connection=cover.querySelector('.cinema-connection');
  const pixels=[...cover.querySelectorAll('.camera-pixels i')];
  let frame=0,startTime=0,lastFrame=-1,flights=[],running=false;
  const rect=(x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h);};
  const sprite=(rows,x,y,palette,scale=1)=>rows.forEach((row,j)=>[...row].forEach((p,i)=>{if(palette[p])rect(x+i*scale,y+j*scale,scale,scale,palette[p]);}));
  const codeFont={
    a:['010','101','111','101','101'],b:['110','101','110','101','110'],c:['011','100','100','100','011'],d:['110','101','101','101','110'],
    e:['111','100','110','100','111'],f:['111','100','110','100','100'],g:['011','100','101','101','011'],h:['101','101','111','101','101'],
    i:['111','010','010','010','111'],j:['001','001','001','101','010'],k:['101','101','110','101','101'],l:['100','100','100','100','111'],
    m:['101','111','111','101','101'],n:['101','111','111','111','101'],o:['010','101','101','101','010'],p:['110','101','110','100','100'],
    q:['010','101','101','111','011'],r:['110','101','110','101','101'],s:['011','100','010','001','110'],t:['111','010','010','010','010'],
    u:['101','101','101','101','111'],v:['101','101','101','101','010'],w:['101','101','111','111','101'],x:['101','101','010','101','101'],
    y:['101','101','010','010','010'],z:['111','001','010','100','111'],'=':['000','111','000','111','000'],'.':['000','000','000','000','010'],
    ':':['000','010','000','010','000'],';':['000','010','000','010','100'],'(' :['001','010','010','010','001'],')':['100','010','010','010','100'],
    '{':['011','010','100','010','011'],'}':['110','010','001','010','110'],'/':['001','001','010','100','100'],'>':['100','010','001','010','100'],
    '-':['000','000','111','000','000'],'0':['111','101','101','101','111'],'1':['010','110','010','010','111']
  };
  const codeRows=['const scene = {','  agent.run();','  await render();','  camera.link();','  frames.push();','  return video;','}','// image -> video','scene.play();'];
  const workRect=(x,y,w,h,color)=>{workCtx.fillStyle=color;workCtx.fillRect(Math.round(x),Math.round(y),w,h);};
  function codeText(text,x,y,color){
    [...text].forEach((letter,i)=>(codeFont[letter]||[]).forEach((row,j)=>[...row].forEach((bit,k)=>{if(bit==='1')workRect(x+i*4+k,y+j,1,1,color);})));
  }
  function drawWorkstation(t){
    workCtx.clearRect(0,0,128,112);workCtx.imageSmoothingEnabled=false;
    // Monitor, seen over the back of the person at the desk.
    workRect(9,4,111,69,'#353f3e');workRect(7,7,115,63,'#858d7e');
    workRect(11,6,107,2,'#d7d7b8');workRect(12,10,105,57,'#111e25');
    workRect(15,12,99,7,'#293e42');workRect(18,14,2,2,'#df6b46');workRect(23,14,2,2,'#e7c58a');workRect(28,14,2,2,'#a8b99a');
    workRect(33,15,36,1,'#81958d');workRect(16,21,6,43,'#192c32');
    workCtx.save();workCtx.beginPath();workCtx.rect(16,21,97,43);workCtx.clip();
    const scroll=Math.floor(t*17),rowShift=Math.floor(scroll/8);
    for(let row=-1;row<6;row++){
      const y=22+row*8+scroll%8,index=((row-rowShift)%codeRows.length+codeRows.length)%codeRows.length;
      workRect(18,y+1,2,3,'#4d696e');
      codeText(codeRows[index],25,y,['#a5c997','#78b2c2','#e4be83','#da8c6a'][index%4]);
    }
    workCtx.restore();
    workRect(12,68,105,3,'#c1c8b2');workRect(113,34,9,5,'#df6b46');
    workRect(59,73,11,8,'#727d75');workRect(47,80,35,3,'#a8b0a0');
    // Desk and keyboard; the hands tap while the head stays still.
    workRect(2,84,124,5,'#bc9267');workRect(5,89,119,5,'#725944');
    workRect(7,94,5,18,'#574839');workRect(115,94,5,18,'#574839');
    workRect(35,79,55,5,'#a3ad9a');for(let i=0;i<11;i++)workRect(37+i*5,80,3,1,'#526264');
    const tap=Math.floor(t*7)%2;
    workRect(27,80+tap,11,5,'#d8ab87');workRect(94,81-tap,10,5,'#d8ab87');
    // Back of the head: hair, ears, nape, hoodie and chair. No face is drawn.
    workRect(53,48,24,3,'#343333');workRect(49,51,32,4,'#343333');workRect(46,55,38,20,'#262a2c');
    workRect(49,75,32,7,'#262a2c');workRect(51,54,27,20,'#404241');
    workRect(54,52,20,3,'#66645a');workRect(50,57,3,13,'#57584f');workRect(56,58,17,2,'#4d5049');
    workRect(45,67,4,10,'#cfa27e');workRect(81,67,4,10,'#b98c6c');workRect(58,80,14,8,'#cfa27e');
    workRect(40,87,49,7,'#929d83');workRect(35,94,60,12,'#77836c');
    workRect(30,86+tap,12,9,'#879379');workRect(90,87-tap,12,8,'#78876f');
    workRect(52,87,28,3,'#bac0a0');workRect(55,90,22,3,'#566551');
    workRect(43,97,46,15,'#34474a');workRect(47,95,38,3,'#5d7370');workRect(48,99,36,2,'#49605e');
  }
  function sky(colors){colors.forEach((color,i)=>rect(0,i*90/colors.length,160,Math.ceil(90/colors.length),color));}
  function stars(t){for(let i=0;i<26;i++)rect((i*37+11)%158,(i*19+7)%65,i%7===0?2:1,1,(Math.floor(t*2)+i)%5===0?'#f4dcab':'#909aae');}
  function city(t,night=false){
    sky(night?['#151d32','#1e2940','#343951']:['#29283b','#573446','#a3534c','#d27b58','#edb77c']);
    if(night)stars(t);else{
      sprite(['..ssssss..','.ssssssss.','ssssssssss','ssssssssss','.ssssssss.','..ssssss..'],119,13,{s:'#f2ce95'},2);
      for(let i=0;i<3;i++){
        const x=((i*67-t*3+190)%220)-35;
        rect(x+5,14+i*8,20,3,'#cda397');rect(x,17+i*8,34,3,'#cda397');
      }
    }
    for(let layer=0;layer<2;layer++)for(let i=0;i<12;i++){
      const x=i*19-10-(Math.floor(t*(layer?4:1))%19),h=12+(i*13+layer*5)%24,y=66-h;
      rect(x,y,15,h,layer?'#243041':'#514456');
      if(layer)for(let j=0;j<3;j++)for(let k=0;k<3;k++)if((i+j+k)%3!==0)rect(x+3+j*4,y+5+k*6,2,2,night?'#e8b777':'#8e8b88');
    }
    rect(0,66,160,24,'#141e2b');rect(0,67,160,2,'#7f7772');
  }
  function train(t){
    city(t);
    const x=178-(t*66)%290;
    for(let i=0;i<3;i++){
      const bx=x+i*31;
      rect(bx,55,29,2,'#efe0b5');rect(bx-2,57,31,15,'#cd5c43');rect(bx-2,70,31,3,'#ecb977');
      for(let j=0;j<4;j++)rect(bx+2+j*6,59,4,6,'#fff0b8');
      rect(bx+3,73,5,3,'#b1ac9b');rect(bx+21,73,5,3,'#b1ac9b');
    }
    rect(0,78,160,2,'#68727b');for(let i=0;i<20;i++)rect(i*9-(Math.floor(t*24)%9),80,5,2,'#4c535f');
  }
  function rocket(t){
    sky(['#151b2f','#1d2540','#242c48']);stars(t);
    const x=36+Math.sin(t*1.7)*9,y=31+Math.sin(t*2.4)*6;
    sprite(['........22.....','....1111222....','..1111111122...','1111311111122..','11113111111122.','..1111111122...','....1111222....','........22.....'],x,y,{1:'#e4e6cf',2:'#df6b46',3:'#617ca1'},2);
    for(let i=0;i<5;i++)rect(x-6-i*4,y+5+i%2*3,5,9-i,'#edb870');
    const sx=160-((t*73)%200);rect(sx,17,11,1,'#afaab5');rect(sx+11,17,2,2,'#f3e8bd');
    sprite(['...ppppp...','.ppppppppp.','ppppppppppp','ppppppppppp','.ppppppppp.','...ppppp...'],119,57,{p:'#a26657'},2);
    rect(113,66,38,2,'#d49a70');rect(109,68,46,2,'#d49a70');
  }
  function cat(t){
    city(t,true);
    rect(24,73,112,17,'#50424b');rect(24,72,112,2,'#b78670');
    const bounce=Math.round(Math.abs(Math.sin(t*5))*6),x=66+Math.sin(t*3)*4,y=44-bounce;
    sprite(['.o....o.','ooo..ooo','oooooooo','oDooooDo','oooWoooo','.oooooo.','..oooo..','.oooooo.','oooooooo','..oooo..','..o..o..'],x,y,{o:'#e4b378',D:'#172130',W:'#f7e0ba'},2);
    const beat=Math.sin(t*5)>0;rect(x-5,y+(beat?13:18),7,3,'#e4b378');rect(x+15,y+(beat?18:13),7,3,'#e4b378');
    rect(x+3,y+21,4,4,'#e4b378');rect(x+12,y+21,4,4,'#e4b378');
    for(let i=0;i<2;i++){const bx=i?117:30;rect(bx,58,13,14,'#151c2a');rect(bx+3,61,7,7,'#677c86');rect(bx+5,63,3,3,beat?'#e4b378':'#23323f');}
    for(let i=0;i<5;i++){const px=42+i*19,py=35+(i*7+Math.floor(t*14))%19;rect(px,py,2,2,i%2?'#df6b46':'#efd7b0');}
  }
  function draw(t){
    drawWorkstation(t);
    const sequence=Math.floor(t/4.2)%3;
    ctx.imageSmoothingEnabled=false;
    [train,rocket,cat][sequence](t%4.2);
    // A brief tiled cut between the three shots.
    const cut=t%4.2;
    if(cut<.12&&t>.2)for(let i=0;i<40;i++)if(i%3===Math.floor(cut*25)%3)rect((i*23)%160,(i*13)%90,8,5,'#f4ddb3');
  }
  function tick(now){
    if(!running)return;
    const elapsed=(now-startTime)/1000,step=Math.floor(elapsed*12);
    if(step!==lastFrame){draw(elapsed);lastFrame=step;}
    frame=requestAnimationFrame(tick);
  }
  function alignBeam(){
    const w=cover.offsetWidth,h=cover.offsetHeight;
    const x=camera.offsetLeft+camera.offsetWidth,y=camera.offsetTop+camera.offsetHeight*.64;
    const left=screen.offsetLeft,top=screen.offsetTop,bottom=top+screen.offsetHeight;
    beam.setAttribute('viewBox',`0 0 ${w} ${h}`);
    beam.querySelector('.cinema-light-cone').setAttribute('d',`M${x} ${y-4} L${left} ${top} L${left} ${bottom} L${x} ${y+4}Z`);
    beam.querySelector('.cinema-light-edge').setAttribute('d',`M${x} ${y-4}L${left} ${top} M${x} ${y+4}L${left} ${bottom}`);
    const sx=workstation.offsetLeft+workstation.offsetWidth*119/128,sy=workstation.offsetTop+workstation.offsetHeight*36/112;
    const endX=camera.offsetLeft+camera.offsetWidth*.08,endY=camera.offsetTop+camera.offsetHeight*.6,midX=(sx+endX)/2;
    connection.setAttribute('viewBox',`0 0 ${w} ${h}`);
    connection.querySelectorAll('path').forEach(path=>path.setAttribute('d',`M${sx} ${sy}H${midX}V${endY}H${endX}`));
  }
  function stop(){
    running=false;cancelAnimationFrame(frame);frame=0;
    flights.forEach(animation=>animation.cancel());flights=[];
    cover.classList.remove('cover-projecting');
  }
  function start(still=false){
    stop();
    const source=cover.querySelector('.cover-title-first .cover-word:last-child').getBoundingClientRect();
    const root=cover.getBoundingClientRect(),scale=root.width/cover.offsetWidth;
    const sx=(source.x+source.width*.65-root.x)/scale,sy=(source.y+source.height*.65-root.y)/scale;
    cover.classList.add('cover-projecting');alignBeam();draw(still?9:0);
    if(still)return;
    const dx=sx-camera.offsetLeft-camera.offsetWidth/2,dy=sy-camera.offsetTop-camera.offsetHeight/2;
    flights.push(camera.animate([
      {opacity:0,transform:`translate(${dx}px,${dy}px) rotate(-18deg) scale(.05)`},
      {opacity:1,transform:`translate(${dx*.3}px,${dy*.3}px) rotate(4deg) scale(1)`,offset:.55},
      {opacity:1,transform:'translate(0,0) rotate(0deg) scale(1)'}
    ],{duration:440,delay:30,easing:'cubic-bezier(.12,.85,.2,1)',fill:'backwards'}));
    pixels.forEach((pixel,i)=>{
      const targetX=camera.offsetLeft+camera.offsetWidth*.6,targetY=camera.offsetTop+camera.offsetHeight*.4;
      flights.push(pixel.animate([
        {opacity:0,transform:`translate(${sx}px,${sy}px) scale(0)`},
        {opacity:1,transform:`translate(${sx-(i+1)*14}px,${sy-20-i%3*11}px) scale(1)`,offset:.35},
        {opacity:0,transform:`translate(${targetX+i*9}px,${targetY+((i%4)-2)*18}px) scale(.3)`}
      ],{duration:360,delay:30+i*13,easing:'cubic-bezier(.12,.85,.2,1)'}));
    });
    running=true;startTime=performance.now();lastFrame=-1;frame=requestAnimationFrame(tick);
  }
  addEventListener('resize',alignBeam);
  draw(9);
  return {start,stop,still:()=>start(true)};
};
