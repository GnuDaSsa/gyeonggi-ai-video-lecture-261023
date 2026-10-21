(() => {
  'use strict';
  const trigger = document.querySelector('[data-seedance-prompt-open]');
  const template = document.querySelector('#seedance-prompt-content');
  if (!trigger || !template) return;
  const modal = document.createElement('dialog');
  modal.id = 'seedance-prompt-dialog';
  modal.className = 'case-prompt-dialog seedance-prompt-dialog';
  modal.setAttribute('aria-labelledby', 'seedance-prompt-title');
  modal.innerHTML = '<header><h2 id="seedance-prompt-title">피지 완공식 · 실제 프롬프트</h2><button type="button" autofocus>닫기 · Esc</button></header>';
  modal.append(template.content.cloneNode(true));
  document.body.append(modal);
  const owner = trigger.closest('.slide');
  const pause = () => modal.querySelectorAll('video').forEach(video => video.pause());
  const close = () => { pause(); modal.close(); };
  modal.addEventListener('cancel', pause);
  trigger.addEventListener('click', () => { modal.showModal(); modal.scrollTop = 0; });
  modal.querySelector('button').addEventListener('click', close);
  modal.addEventListener('keydown', event => event.stopPropagation());
  modal.addEventListener('close', () => {
    pause();
    if (owner.classList.contains('active')) trigger.focus({preventScroll: true});
  });
  modal.addEventListener('click', event => {
    const box = modal.getBoundingClientRect();
    if (event.target === modal && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) close();
  });
  new MutationObserver(() => {
    if (modal.open && !owner.classList.contains('active')) close();
  }).observe(owner, {attributes: true, attributeFilter: ['class']});
})();
