const notes={top:{label:'THE FIRST IMPRESSION',title:'Fig leaf & Bergamot',subtitle:'햇살에 반짝이는 무화과 잎',desc:'초록빛 무화과 잎에 베르가모트의 산뜻함을 더했습니다. 창문을 열었을 때의 맑은 공기처럼, 가볍고 기분 좋게 시작됩니다.',tags:['싱그러운','그린','산뜻한'],word:'fig.'},heart:{label:'THE SOFT HEART',title:'White tea & Iris',subtitle:'흰 찻잔에 담긴 부드러운 여유',desc:'화이트 티의 은은함 위로 아이리스의 섬세한 파우더 향이 번집니다. 햇살에 말린 린넨처럼 담백하고 편안한 중심을 만듭니다.',tags:['은은한','티 노트','부드러운'],word:'tea.'},base:{label:'THE LASTING MEMORY',title:'Cedarwood & Musk',subtitle:'오래 머무는 나무의 온기',desc:'차분한 시더우드와 포근한 머스크가 잔잔하게 어우러집니다. 하루 끝 피부 가까이 남는, 따뜻하고 조용한 여운을 표현했습니다.',tags:['포근한','우디','차분한'],word:'wood.'}};
const tabs=[...document.querySelectorAll('[data-note]')];
function activateTab(tab){tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1});const n=notes[tab.dataset.note];const panel=document.querySelector('#note-panel');panel.setAttribute('aria-labelledby',tab.id);panel.querySelector('.note-label').textContent=n.label;panel.querySelector('h3').textContent=n.title;panel.querySelector('h4').textContent=n.subtitle;panel.querySelector('.note-desc').textContent=n.desc;panel.querySelectorAll('.note-tags span').forEach((s,i)=>s.textContent=n.tags[i]);document.querySelector('.art-word').firstChild.textContent=n.word}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activateTab(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();tabs[next].focus();activateTab(tabs[next])}})});
const prices = { '30': 58000, '50': 82000 };
const won = amount => '₩ ' + amount.toLocaleString('ko-KR');
let size = '30';
const sizeButtons = document.querySelectorAll('.size');

sizeButtons.forEach(button => {
  button.addEventListener('click', () => {
    size = button.dataset.size;
    sizeButtons.forEach(option => {
      const selected = option === button;
      option.classList.toggle('active', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    document.querySelector('#price').textContent = won(prices[size]);
    updateProductImage();
  });
});
const menu=document.querySelector('.menu');const nav=document.querySelector('nav');menu.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));menu.setAttribute('aria-label',opened?'메뉴 닫기':'메뉴 열기');menu.textContent=opened?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');menu.textContent='☰'}));
