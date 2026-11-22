'use strict';
const MENU=[{id:1,name:'Hamlet’s Pancake Stack',category:'Sweet',price:12.99,description:'Buttermilk pancakes, seasonal berries, whipped cream, and maple syrup.'},{id:2,name:'Classic Eggs Benedict',category:'Savory',price:13.99,description:'Poached eggs, ham, English muffins, and hollandaise.'},{id:3,name:'Sunrise Breakfast Plate',category:'Savory',price:14.49,description:'Scrambled eggs, bacon, home fries, and toast.'},{id:4,name:'Cinnamon French Toast',category:'Sweet',price:11.99,description:'Thick-cut brioche, cinnamon sugar, and strawberries.'},{id:5,name:'Garden Veggie Omelet',category:'Savory',price:12.49,description:'Three eggs, peppers, spinach, mushrooms, and cheddar.'},{id:6,name:'Fresh Brewed Coffee',category:'Drinks',price:3.49,description:'Rich, freshly brewed house coffee.'},{id:7,name:'Fresh Orange Juice',category:'Drinks',price:4.49,description:'Chilled orange juice, served fresh.'},{id:8,name:'Breakfast Burrito',category:'Savory',price:13.49,description:'Eggs, potatoes, cheddar, and salsa in a warm tortilla.'},{id:9,name:'Berry Yogurt Parfait',category:'Sweet',price:8.99,description:'Greek yogurt, granola, honey, and fresh berries.'}];
const money=n=>'$'+n.toFixed(2);
function getCart(){try{const data=JSON.parse(localStorage.getItem('hamlets-cart')||'{}');return data&&typeof data==='object'&&!Array.isArray(data)?data:{}}catch{return {}}}
// Local files opened with file:// may have separate storage for each HTML page.
// Pass the cart through internal navigation URLs only in that environment.
function restoreCartFromLink(){
  if(location.protocol!=='file:')return;
  const url=new URL(location.href);
  const incoming=url.searchParams.get('cart');
  if(incoming===null)return;
  try{
    const parsed=JSON.parse(incoming);
    if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))return;
    const clean={};
    for(const item of MENU){
      const qty=Number(parsed[item.id]);
      if(Number.isSafeInteger(qty)&&qty>0&&qty<=99)clean[item.id]=qty;
    }
    localStorage.setItem('hamlets-cart',JSON.stringify(clean));
  }catch(error){console.warn('Ignored invalid cart link',error)}
  // Prevent refreshing an old cart link from restoring a completed order.
  url.searchParams.delete('cart');
  try{history.replaceState(null,'',url.href)}catch(error){/* Some file browsers prohibit history changes. */}
}
function setupCartNavigation(){
  if(location.protocol!=='file:')return;
  document.querySelectorAll('a[href]').forEach(link=>{
    link.addEventListener('click',()=>{
      const dest=new URL(link.getAttribute('href'),location.href);
      if(dest.protocol!=='file:'||!['index.html','menu.html','order.html'].includes(dest.pathname.split('/').pop()))return;
      dest.searchParams.set('cart',JSON.stringify(getCart()));
      link.href=dest.href;
    });
  });
}
function saveCart(cart){localStorage.setItem('hamlets-cart',JSON.stringify(cart));updateCount()}
function updateCount(){const count=document.querySelector('#cart-count');if(count)count.textContent=Object.values(getCart()).reduce((a,b)=>a+(Number(b)||0),0)}
function addItem(id){const cart=getCart();cart[id]=(Number(cart[id])||0)+1;saveCart(cart);renderCart();const msg=document.querySelector('#menu-status');if(msg){msg.textContent='Added to your order!';} }
function changeQuantity(id,delta){const cart=getCart();cart[id]=Math.max(0,(Number(cart[id])||0)+delta);if(!cart[id])delete cart[id];saveCart(cart);renderCart()}
function renderMenu(category='All'){const target=document.querySelector('#menu-grid');if(!target)return;target.replaceChildren();MENU.filter(item=>category==='All'||item.category===category).forEach(item=>{const card=document.createElement('article');card.className='card menu-card';const title=document.createElement('h3');title.textContent=item.name;const desc=document.createElement('p');desc.textContent=item.description;const price=document.createElement('span');price.className='price';price.textContent=money(item.price);const btn=document.createElement('button');btn.className='button';btn.textContent='Add to Order';btn.addEventListener('click',()=>addItem(item.id));card.append(title,desc,price,btn);target.append(card)})}
function renderOrderOptions(){const target=document.querySelector('#order-list');if(!target)return;target.replaceChildren();MENU.forEach(item=>{const card=document.createElement('div');card.className='card order-row';const info=document.createElement('div');const title=document.createElement('h3');title.textContent=item.name;const desc=document.createElement('p');desc.textContent=item.description;const price=document.createElement('strong');price.textContent=money(item.price);info.append(title,desc,price);const btn=document.createElement('button');btn.className='button';btn.textContent='Add +';btn.addEventListener('click',()=>addItem(item.id));card.append(info,btn);target.append(card)})}
function renderCart(){const target=document.querySelector('#cart-items');if(!target)return;target.replaceChildren();const cart=getCart();let total=0;let count=0;MENU.forEach(item=>{const qty=Math.max(0,Number(cart[item.id])||0);if(!qty)return;count+=qty;total+=item.price*qty;const row=document.createElement('div');row.className='cart-item';const name=document.createElement('span');name.textContent=`${item.name} — ${money(item.price*qty)}`;const controls=document.createElement('div');controls.className='cart-controls';const minus=document.createElement('button');minus.textContent='−';minus.setAttribute('aria-label',`Remove one ${item.name}`);minus.addEventListener('click',()=>changeQuantity(item.id,-1));const amount=document.createElement('span');amount.textContent=qty;const plus=document.createElement('button');plus.textContent='+';plus.setAttribute('aria-label',`Add one ${item.name}`);plus.addEventListener('click',()=>changeQuantity(item.id,1));controls.append(minus,amount,plus);row.append(name,controls);target.append(row)});if(!count){const p=document.createElement('p');p.textContent='Your cart is empty. Add something delicious!';target.append(p)}document.querySelector('#cart-total').textContent=money(total)}
document.addEventListener('DOMContentLoaded',()=>{restoreCartFromLink();setupCartNavigation();const toggle=document.querySelector('#theme-toggle');const dark=localStorage.getItem('hamlets-theme')==='dark';document.body.classList.toggle('dark',dark);if(toggle){toggle.setAttribute('aria-pressed',String(dark));toggle.addEventListener('click',()=>{const enabled=document.body.classList.toggle('dark');localStorage.setItem('hamlets-theme',enabled?'dark':'light');toggle.setAttribute('aria-pressed',String(enabled))})}updateCount();renderMenu();renderOrderOptions();renderCart();document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');renderMenu(btn.dataset.filter)}));const form=document.querySelector('#checkout-form');if(form)form.addEventListener('submit',event=>{event.preventDefault();const status=document.querySelector('#checkout-status');const cart=getCart();if(!Object.values(cart).some(n=>Number(n)>0)){status.textContent='Please add at least one item before checking out.';return}if(!form.reportValidity())return;const name=form.elements.customerName.value.trim();if(name.length<2){status.textContent='Please enter a name with at least two characters.';return}status.textContent=`Thanks, ${name}! Your demo pickup order has been placed. No payment was charged.`;saveCart({});renderCart();form.reset()})});
