(() => {
  'use strict';
  const triggers=[...document.querySelectorAll('[data-city-video]')];
  if(!triggers.length)return;
  const dialog=document.createElement('dialog');
  dialog.id='city-video-dialog';dialog.className='city-video-dialog';
  dialog.setAttribute('aria-labelledby','city-video-title');
  dialog.innerHTML='<header><h2 id="city-video-title"></h2><button type="button" autofocus>닫기 · Esc</button></header><video controls playsinline preload="metadata"></video><p class="city-video-status" role="status" hidden></p>';
  document.body.append(dialog);
  const video=dialog.querySelector('video'),status=dialog.querySelector('.city-video-status');
  let owner=null,opener=null,currentKey=null,request=0;
  const observer=new MutationObserver(()=>{if(dialog.open&&owner&&!owner.classList.contains('active'))dialog.close();});
  triggers.forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.cityVideo,path=(window.LECTURE_MEDIA||{})[key];
    if(!path)return;
    opener=button;owner=button.closest('.slide');
    observer.disconnect();if(owner)observer.observe(owner,{attributes:true,attributeFilter:['class']});
    document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();});
    dialog.querySelector('h2').textContent=button.dataset.cityVideoTitle;
    status.hidden=true;
    if(currentKey!==key){video.src=path;currentKey=key;}
    if(button.hasAttribute('data-city-video-restart'))video.currentTime=0;
    dialog.showModal();
    const pending=++request;
    video.play().catch(()=>{
      if(dialog.open&&request===pending){status.textContent='재생 버튼을 눌러주세요.';status.hidden=false;}
    });
  }));
  video.addEventListener('playing',()=>{status.hidden=true;});
  video.addEventListener('error',()=>{if(dialog.open){status.textContent='영상을 불러오지 못했습니다.';status.hidden=false;}});
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('keydown',event=>event.stopPropagation());
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  dialog.addEventListener('close',()=>{
    ++request;video.pause();observer.disconnect();status.hidden=true;
    if(opener&&(!owner||owner.classList.contains('active')))opener.focus({preventScroll:true});
  });
})();
