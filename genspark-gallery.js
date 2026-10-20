(() => {
  'use strict';
  const triggers=[...document.querySelectorAll('[data-gs-gallery-open]')];
  document.querySelectorAll('dialog.gs-collection').forEach(dialog=>{
    // Shared galleries must not inherit a hidden slide or the scaled canvas.
    document.body.append(dialog);
    const opens=triggers.filter(button=>(button.dataset.gsGalleryOpen||'gs-collection')===dialog.id);
    if(!opens.length)return;
    const grid=dialog.querySelector('.gs-collection-grid');
    const focus=dialog.querySelector('.gs-collection-focus');
    const image=dialog.querySelector('.gs-collection-image');
    const caption=dialog.querySelector('[data-gs-gallery-caption]');
    const position=dialog.querySelector('[data-gs-gallery-position]');
    const heading=dialog.querySelector('[data-gs-gallery-title]');
    const description=dialog.querySelector('[data-gs-gallery-description]');
    const defaultHeading=heading.textContent,defaultDescription=description.textContent;
    const back=dialog.querySelector('[data-gs-gallery-back]');
    const prev=dialog.querySelector('[data-gs-gallery-prev]');
    const next=dialog.querySelector('[data-gs-gallery-next]');
    const thumbnails=[...dialog.querySelectorAll('[data-gs-image]')];
    let current=0,scroll=0,owner=null,opener=null;
    const observer=new MutationObserver(()=>{
      if(dialog.open&&owner&&!owner.classList.contains('active'))dialog.close();
    });
    function show(index){
      current=Math.max(0,Math.min(thumbnails.length-1,index));
      const thumbnail=thumbnails[current];
      if(focus.hidden)scroll=grid.scrollTop;
      image.src=thumbnail.querySelector('img').src;
      image.alt=thumbnail.querySelector('img').alt;
      caption.textContent=thumbnail.closest('figure').querySelector('figcaption span').textContent+' · '+image.alt;
      position.textContent=(current+1)+' / '+thumbnails.length;
      prev.disabled=current===0;next.disabled=current===thumbnails.length-1;
      grid.hidden=true;focus.hidden=false;
      if(document.activeElement===prev&&prev.disabled||document.activeElement===next&&next.disabled)back.focus({preventScroll:true});
    }
    function showGrid(restoreFocus){
      focus.hidden=true;grid.hidden=false;image.removeAttribute('src');
      grid.scrollTop=scroll;
      if(restoreFocus)thumbnails[current].focus({preventScroll:true});
    }
    opens.forEach(button=>button.addEventListener('click',()=>{
      opener=button;owner=button.closest('.slide');
      observer.disconnect();
      if(owner)observer.observe(owner,{attributes:true,attributeFilter:['class']});
      heading.textContent=button.dataset.gsGalleryHeading||defaultHeading;
      description.textContent=button.dataset.gsGalleryDescription||defaultDescription;
      current=0;scroll=0;showGrid(false);
      dialog.showModal();
      const index=Number(button.dataset.gsGalleryIndex);
      if(button.hasAttribute('data-gs-gallery-index')&&Number.isInteger(index)&&index>=0&&index<thumbnails.length){
        show(index);back.focus({preventScroll:true});
      }
    }));
    thumbnails.forEach((button,index)=>button.addEventListener('click',()=>{show(index);back.focus({preventScroll:true});}));
    prev.addEventListener('click',()=>show(current-1));
    next.addEventListener('click',()=>show(current+1));
    back.addEventListener('click',()=>showGrid(true));
    dialog.querySelector('[data-gs-gallery-close]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('cancel',event=>{
      if(!focus.hidden){event.preventDefault();showGrid(true);}
    });
    dialog.addEventListener('keydown',event=>{
      event.stopPropagation();
      if(focus.hidden)return;
      if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}
      if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}
    });
    dialog.addEventListener('click',event=>{
      if(event.target!==dialog)return;
      const r=dialog.getBoundingClientRect();
      if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
    });
    dialog.addEventListener('close',()=>{
      observer.disconnect();showGrid(false);
      if(opener&&(!owner||owner.classList.contains('active')))opener.focus({preventScroll:true});
    });
  });
})();
