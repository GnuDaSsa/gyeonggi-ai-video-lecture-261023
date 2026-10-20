(() => {
  'use strict';
  const budget=document.querySelector('[data-subscription-budget]');
  if(!budget)return;
  const slide=budget.closest('.slide');
  const checks=[...budget.querySelectorAll('[data-subscription]')];
  const pro=checks.find(input=>input.dataset.subscription==='pro20x');
  const coupon=budget.querySelector('[data-subscription-coupon]');
  const total=budget.querySelector('[data-budget-total]');
  const sum=budget.querySelector('.budget-sum');
  const original=budget.querySelector('[data-coupon-original]');
  const price=budget.querySelector('[data-coupon-price]');
  const label=budget.querySelector('[data-coupon-label]');
  const savings=budget.querySelector('[data-budget-savings]');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let discounted=false,pulse=null;
  const format=value=>value.toLocaleString('ko-KR');
  function update(animate=true){
    let amount=0;
    checks.forEach(input=>{
      input.closest('.subscription-fee').classList.toggle('is-excluded',!input.checked);
      // The communal subscription has an unknown share, not a zero price.
      if(!input.checked||input.dataset.price===undefined)return;
      amount+=Number(input===pro&&discounted?input.dataset.discountPrice:input.dataset.price);
    });
    const value=format(amount),changed=total.textContent!==value;
    total.textContent=value;
    coupon.setAttribute('aria-pressed',String(discounted));
    coupon.setAttribute('aria-label',discounted?'필쫀쿠 해제':'필쫀쿠 적용');
    coupon.disabled=!pro.checked;
    original.hidden=!discounted;
    price.textContent=format(Number(discounted?pro.dataset.discountPrice:pro.dataset.price))+'원';
    label.textContent=discounted?'필쫀쿠 적용 · 눌러서 해제':'눌러서 필쫀쿠 적용 ↗';
    savings.hidden=!(discounted&&pro.checked);
    if(changed){
      pulse?.cancel();
      if(animate&&!reduced.matches)pulse=sum.animate([
        {transform:'translateY(5px)',color:'#bf5333'},
        {transform:'translateY(0)',color:'#111211'}
      ],{duration:300,easing:'ease-out'});
    }
  }
  function reset(){discounted=false;checks.forEach(input=>{input.checked=true;});update();}
  checks.forEach(input=>input.addEventListener('change',()=>update()));
  coupon.addEventListener('click',()=>{discounted=!discounted;update();});
  slide.querySelector('[data-budget-reset]').addEventListener('click',reset);
  // Rehearsal starts with the original price; navigating between slides keeps choices.
  checks.forEach(input=>{input.checked=true;});
  update(false);
})();
