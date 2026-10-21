(() => {
  'use strict';
  const slides=[...document.querySelectorAll('.slide')], select=document.querySelector('#toc');
  const standalone=Number(document.body.dataset.single||0);
  let index=0, toastTimer;
  const toast=message=>{const el=document.querySelector('#toast');el.textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.textContent='',3500)};
  slides.forEach((slide,i)=>{const o=document.createElement('option');o.value=i;o.textContent=String(i+1).padStart(2,'0')+' · '+slide.dataset.title;select.append(o)});
  function fit(){if(standalone||innerWidth<=680)return;document.querySelector('#canvas').style.transform=`translate(-50%,-50%) scale(${Math.min((innerWidth-32)/960,(innerHeight-88)/540)})`}
  function go(next){index=Math.max(0,Math.min(slides.length-1,next));slides.forEach((s,i)=>{s.classList.toggle('active',i===index);s.setAttribute('aria-hidden',String(i!==index));if(i!==index){s.querySelectorAll('video').forEach(v=>v.pause());s.classList.remove('achievement-still')}});select.value=index;document.querySelector('#count').textContent=`${String(index+1).padStart(2,'0')} / ${slides.length}`;document.querySelector('#prev').disabled=index===0;document.querySelector('#next').disabled=index===slides.length-1;document.querySelector('#progress').style.width=`${(index+1)/slides.length*100}%`;if(!standalone)history.replaceState(null,'',`#slide-${index+1}`);window.scrollTo(0,0);stopInactivePlayers()}
  function stopInactivePlayers(){document.querySelectorAll('.shorts-stage').forEach(stage=>{const frame=stage.querySelector('iframe'),launch=stage.querySelector('.youtube-launch');launch.hidden=true;if(stage.closest('.slide').classList.contains('active')){if(!frame.getAttribute('src'))frame.src='https://www.youtube-nocookie.com/embed/'+stage.querySelector('[data-youtube]').dataset.youtube+'?autoplay=0&playsinline=1&rel=0';frame.hidden=false}else{frame.removeAttribute('src');frame.hidden=true}})}
  document.querySelectorAll('[data-youtube]').forEach(button=>button.onclick=()=>{const stage=button.closest('.shorts-stage'),frame=stage.querySelector('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+button.dataset.youtube+'?autoplay=0&playsinline=1&rel=0';frame.hidden=false;stage.querySelector('.youtube-launch').hidden=true;});
  const hashIndex=()=>{const m=location.hash.match(/^#slide-(\d+)$/);return m?Number(m[1])-1:0};
  document.querySelector('#prev').onclick=()=>go(index-1);document.querySelector('#next').onclick=()=>go(index+1);select.onchange=()=>go(Number(select.value));
  document.querySelectorAll('[data-go],[data-go-id]').forEach(b=>b.onclick=()=>{const target=b.dataset.goId?slides.findIndex(s=>s.id===b.dataset.goId):Number(b.dataset.go)-1;if(target>=0)go(target)});
  document.querySelector('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{toast('전체화면을 사용할 수 없습니다. 브라우저의 F11 키를 사용하세요.')}};
  addEventListener('fullscreenchange',fit);
  const metaTrigger=document.querySelector('[data-meta-prompt-open]');
  if(metaTrigger){
    const modal=document.createElement('dialog');
    modal.id='meta-prompt-dialog';modal.className='meta-prompt-dialog';
    modal.setAttribute('aria-labelledby','meta-prompt-title');
    modal.innerHTML='<header><h2 id="meta-prompt-title">결과 프롬프트 예시</h2><button type="button" autofocus>닫기 · Esc</button></header><div class="meta-prompt-dialog-body"></div>';
    modal.querySelector('.meta-prompt-dialog-body').append(document.querySelector('#meta-prompt-content').content.cloneNode(true));
    document.body.append(modal);
    metaTrigger.addEventListener('click',()=>modal.showModal());
    modal.querySelector('button').addEventListener('click',()=>modal.close());
    modal.addEventListener('keydown',e=>e.stopPropagation());
    modal.addEventListener('close',()=>{if(metaTrigger.closest('.slide').classList.contains('active'))metaTrigger.focus({preventScroll:true})});
    modal.addEventListener('click',e=>{const r=modal.getBoundingClientRect();if(e.target===modal&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))modal.close()});
    new MutationObserver(()=>{if(modal.open&&!metaTrigger.closest('.slide').classList.contains('active'))modal.close()}).observe(metaTrigger.closest('.slide'),{attributes:true,attributeFilter:['class']});
  }
  const achievementTiles=[...document.querySelectorAll('[data-achievement-title]')];
  if(achievementTiles.length){
    const detail=document.createElement('dialog');detail.className='achievement-detail-dialog';detail.setAttribute('aria-labelledby','achievement-detail-title');
    detail.innerHTML='<header><span>SAJINWOO · ACHIEVEMENT</span><button type="button" autofocus>닫기 · Esc</button></header><h2 id="achievement-detail-title"></h2><div class="achievement-detail-body"></div>';
    document.body.append(detail);
    achievementTiles.forEach(tile=>tile.addEventListener('click',()=>{detail.querySelector('h2').textContent=tile.dataset.achievementTitle;detail.querySelector('.achievement-detail-body').replaceChildren(tile.querySelector('template').content.cloneNode(true));detail.showModal()}));
    detail.querySelector('button').addEventListener('click',()=>detail.close());
    detail.addEventListener('keydown',event=>event.stopPropagation());
    detail.addEventListener('click',event=>{if(event.target===detail){const box=detail.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)detail.close()}});
    detail.addEventListener('close',()=>detail.querySelector('.achievement-detail-body').replaceChildren());
    addEventListener('hashchange',()=>{if(detail.open)detail.close()});
    document.querySelector('[data-achievement-skip]').addEventListener('click',event=>event.currentTarget.closest('.slide').classList.add('achievement-still'));
    document.querySelector('[data-achievement-replay]').addEventListener('click',event=>{const slide=event.currentTarget.closest('.slide');slide.classList.add('motion-reset');slide.classList.remove('achievement-still');void slide.offsetWidth;slide.classList.remove('motion-reset')});
  }
  const promptUITrigger=document.querySelector('.prompt-ui-open');
  if(promptUITrigger){
    const modal=document.createElement('dialog');modal.className='prompt-ui-viewer';modal.setAttribute('aria-labelledby','prompt-ui-title');
    modal.innerHTML='<header><h2 id="prompt-ui-title">실제 프롬프팅 · Runway UI</h2><div><button type="button" class="prompt-ui-zoom" aria-pressed="false">원본 크기로 확대</button><button type="button" class="prompt-ui-close" autofocus>닫기 · Esc</button></div></header><div class="prompt-ui-scroll"><img src="assets/closing/runway-prompt-ui.png" alt="사용자 제공 Runway 화면. 배경과 캐릭터 시트 첨부 및 실제 Seedance 프롬프트"></div>';
    document.body.append(modal);const area=modal.querySelector('.prompt-ui-scroll'),zoom=modal.querySelector('.prompt-ui-zoom');
    promptUITrigger.addEventListener('click',()=>modal.showModal());
    zoom.addEventListener('click',()=>{const on=area.classList.toggle('is-zoomed');zoom.setAttribute('aria-pressed',String(on));zoom.textContent=on?'화면에 맞추기':'원본 크기로 확대';area.scrollLeft=on?area.scrollWidth-area.clientWidth:0;area.scrollTop=0});
    modal.querySelector('.prompt-ui-close').addEventListener('click',()=>modal.close());
    modal.addEventListener('keydown',event=>event.stopPropagation());
    modal.addEventListener('close',()=>{area.classList.remove('is-zoomed');zoom.setAttribute('aria-pressed','false');zoom.textContent='원본 크기로 확대';promptUITrigger.focus()});
    addEventListener('hashchange',()=>{if(modal.open)modal.close()});
  }
  const previews=[...document.querySelectorAll('.story-preview')];
  if(previews.length){
    const viewer=document.createElement('dialog');viewer.className='story-viewer';viewer.setAttribute('aria-labelledby','story-viewer-title');
    viewer.innerHTML='<header><h2 id="story-viewer-title"></h2><button type="button" autofocus>닫기 · Esc</button></header><img alt=""><p>작품의 짧은 GIF 미리보기 · 소리 없음</p>';
    document.body.append(viewer);
    const previewImage=viewer.querySelector('img');
    previews.forEach(button=>button.addEventListener('click',()=>{viewer.querySelector('h2').textContent=button.dataset.storyTitle;previewImage.src=button.querySelector('img').src;previewImage.alt=button.dataset.storyTitle;viewer.querySelector('p').textContent=button.dataset.storyCaption||'작품의 짧은 GIF 미리보기 · 소리 없음';viewer.showModal()}));
    viewer.querySelector('button').addEventListener('click',()=>viewer.close());
    viewer.addEventListener('click',event=>{if(event.target===viewer){const box=viewer.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)viewer.close()}});
    viewer.addEventListener('keydown',event=>event.stopPropagation());
    viewer.addEventListener('close',()=>previewImage.removeAttribute('src'));
    addEventListener('hashchange',()=>{if(viewer.open)viewer.close()});
  }
  document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select,video,[contenteditable=true]'))return;if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();go(index+1)}if(e.key==='ArrowLeft'||e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();go(index-1)}if(e.key==='Home'){e.preventDefault();go(0)}if(e.key==='End'){e.preventDefault();go(slides.length-1)}});
  document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=async()=>{const field=document.getElementById(b.dataset.copy);try{if(!navigator.clipboard)throw Error();await navigator.clipboard.writeText(field.value);toast('요청문을 복사했습니다. 외부 서비스에 붙여넣으세요.')}catch{field.focus();field.select();toast('요청문을 선택했습니다. Ctrl+C 또는 길게 눌러 복사하세요.')}});
  const guideData=document.querySelector('#guide-data');
  if(guideData){const guide=JSON.parse(guideData.textContent);document.querySelectorAll('a[download][href="gongnyang_video_image_guide.txt"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const url=URL.createObjectURL(new Blob([guide],{type:'text/plain;charset=utf-8'}));const download=document.createElement('a');download.href=url;download.download='gongnyang_video_image_guide.txt';document.body.append(download);download.click();download.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)}))}
  const character=document.querySelector('#character'), outfit=document.querySelector('#outfit'), colors=document.querySelector('#colors');
  function prompt(){if(!character)return;document.querySelector('#sheet-prompt').value=`첨부한 가이드의 작성법을 적용해 영상 제작용 캐릭터 시트를 만들어줘. 캐릭터는 [${character.value}], 의상은 [${outfit.value}], 주요 색상은 [${colors.value}]이야. 하나의 가로형 이미지에 정면 전신, 후면 전신, 얼굴 클로즈업을 3분할로 배치해줘. 세 영역에서 같은 캐릭터의 얼굴 특징·의상·체형·색을 유지하고, 깨끗한 밝은 배경과 고른 조명으로 외형이 잘 보이게 해줘. 프롬프트 작성에 그치지 말고 이미지까지 생성해줘.`}
  [character,outfit,colors].filter(Boolean).forEach(el=>el.addEventListener('input',prompt));prompt();
  const media=window.LECTURE_MEDIA||{};
  document.querySelectorAll('[data-media]').forEach(slot=>{const path=media[slot.dataset.media];if(!path)return;if(!/^\.\/assets\//.test(path))return;const video=slot.dataset.kind==='video',el=document.createElement(video?'video':'img');if(video){el.controls=true;el.preload='metadata'}else el.alt=slot.dataset.label||slot.textContent.trim();el.src=path;el.addEventListener('error',()=>{el.remove();slot.querySelector('span').textContent='파일 경로를 확인해 주세요.'});slot.append(el)});
  document.querySelectorAll('[data-backup]').forEach(b=>{const path=media[b.dataset.backup];if(!path||!/^\.\/assets\//.test(path))return;const probe=new Image();probe.onload=()=>{const a=document.createElement('a');a.href=path;a.download=path.split('/').pop();a.className=b.className;a.textContent=b.dataset.ready;b.replaceWith(a)};probe.src=path});
  addEventListener('resize',fit);addEventListener('hashchange',()=>go(hashIndex()));go(standalone?standalone-1:hashIndex());fit();
})();
