document.addEventListener("DOMContentLoaded", function(){ setTimeout(function(){ var l=document.getElementById("loader"); if(l) l.classList.add("hidden"); }, 1800); });

const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
(function animC(){ dot.style.left=mx+'px'; dot.style.top=my+'px'; rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animC); })();
document.querySelectorAll('button,a,label,.radio-opt,.term-row').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.style.width='52px';ring.style.height='52px';ring.style.opacity='1';});
  el.addEventListener('mouseleave',()=>{ring.style.width='36px';ring.style.height='36px';ring.style.opacity='0.6';});
});

window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('scrolled', scrollY > 40));

function fmtCPF(v){ v=v.replace(/\D/g,'').slice(0,11); if(v.length<=3)return v; if(v.length<=6)return v.slice(0,3)+'.'+v.slice(3); if(v.length<=9)return v.slice(0,3)+'.'+v.slice(3,6)+'.'+v.slice(6); return v.slice(0,3)+'.'+v.slice(3,6)+'.'+v.slice(6,9)+'-'+v.slice(9); }
function fmtTel(v){ v=v.replace(/\D/g,'').slice(0,11); if(v.length<=2)return v.length?'('+v:''; if(v.length<=7)return '('+v.slice(0,2)+') '+v.slice(2); if(v.length<=10)return '('+v.slice(0,2)+') '+v.slice(2,6)+'-'+v.slice(6); return '('+v.slice(0,2)+') '+v.slice(2,7)+'-'+v.slice(7); }
function validCPF(c){ c=c.replace(/\D/g,''); if(c.length!==11||/^(\d)\1+$/.test(c))return false; let s=0,r; for(let i=0;i<9;i++)s+=+c[i]*(10-i); r=11-(s%11);if(r>=10)r=0;if(r!==+c[9])return false; s=0;for(let i=0;i<10;i++)s+=+c[i]*(11-i); r=11-(s%11);if(r>=10)r=0;return r===+c[10]; }

document.getElementById('cpf').addEventListener('input',function(){
  this.value=fmtCPF(this.value);
  const ok=validCPF(this.value); const b=document.getElementById('cpfBadge'); const f=document.getElementById('f-cpf');
  if(this.value.replace(/\D/g,'').length===11){
    b.style.display='flex';
    if(ok){b.style.background='#5CB85C';b.style.color='#fff';b.textContent='✓';f.classList.remove('has-error');}
    else{b.style.background='#E05252';b.style.color='#fff';b.textContent='✕';}
  } else b.style.display='none';
});
document.getElementById('tel').addEventListener('input',function(){this.value=fmtTel(this.value);});

document.querySelectorAll('.radio-opt').forEach(opt=>{
  opt.addEventListener('click',function(){
    const n=this.querySelector('input').name;
    document.querySelectorAll(`.radio-opt input[name="${n}"]`).forEach(r=>r.closest('.radio-opt').classList.remove('selected'));
    this.classList.add('selected'); this.querySelector('input').checked=true;
  });
});

document.querySelectorAll('.term-row').forEach(row=>{
  row.addEventListener('click',function(){
    this.classList.toggle('checked');
    this.querySelector('input').checked=this.classList.contains('checked');
  });
});

function setErr(id,on){ const f=document.getElementById(id); if(f) on?f.classList.add('has-error'):f.classList.remove('has-error'); }

function validate(){
  let ok=true;
  const nome=document.getElementById('nome').value.trim();
  if(nome.split(' ').filter(w=>w).length<2){setErr('f-nome',true);ok=false;}else setErr('f-nome',false);
  if(!validCPF(document.getElementById('cpf').value)){setErr('f-cpf',true);ok=false;}else setErr('f-cpf',false);
  if(!document.getElementById('nasc').value){setErr('f-nasc',true);ok=false;}else setErr('f-nasc',false);
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value.trim())){setErr('f-email',true);ok=false;}else setErr('f-email',false);
  if(document.getElementById('tel').value.replace(/\D/g,'').length<10){setErr('f-tel',true);ok=false;}else setErr('f-tel',false);
  if(!document.getElementById('prof').value.trim()){setErr('f-prof',true);ok=false;}else setErr('f-prof',false);
  if(!document.getElementById('renda').value){setErr('f-renda',true);ok=false;}else setErr('f-renda',false);
  const te=document.getElementById('termsErr');
  if(!document.getElementById('trTermos').classList.contains('checked')){te.style.display='block';ok=false;}else te.style.display='none';
  return ok;
}

function updateSteps(n){
  document.querySelectorAll('.step-item').forEach(s=>{
    const sn=+s.dataset.step; s.classList.remove('active','done');
    if(sn===n) s.classList.add('active');
    else if(sn<n){ s.classList.add('done'); s.querySelector('.step-num').textContent='✓'; }
    else s.querySelector('.step-num').textContent=sn;
  });
  document.getElementById('pBar').style.width=(n===1?'50':'100')+'%';
}

function rRow(k,v){ return `<div class="review-row"><span class="rk">${k}</span><span class="rv">${v||'—'}</span></div>`; }

function goReview(){
  if(!validate()) return;
  const nome=document.getElementById('nome').value.trim();
  const init=nome.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  document.getElementById('revAvatar').textContent=init||'?';
  document.getElementById('revNome').textContent=nome;

  const b=document.getElementById('revBadges'); b.innerHTML='';
  const nac=document.querySelector('input[name=nac]:checked');
  const sx=document.getElementById('sexo').value;
  if(nac){const el=document.createElement('span');el.className='badge';el.textContent=nac.value;b.appendChild(el);}
  if(sx){const el=document.createElement('span');el.className='badge badge-gold';el.textContent=sx;b.appendChild(el);}

  const nasc=document.getElementById('nasc').value;
  document.getElementById('sumBasico').innerHTML=
    rRow('CPF', document.getElementById('cpf').value)+
    rRow('Data de nascimento', nasc?nasc.split('-').reverse().join('/'):'—')+
    rRow('Gênero', sx||'—')+
    rRow('Nacionalidade', nac?nac.value:'—');

  document.getElementById('sumAdicional').innerHTML=
    rRow('E-mail', document.getElementById('email').value)+
    rRow('Celular', document.getElementById('tel').value)+
    rRow('Profissão', document.getElementById('prof').value)+
    rRow('Renda mensal', document.getElementById('renda').value)+
    rRow('Comunicações', document.getElementById('trMkt').classList.contains('checked')?'Autorizado':'Não autorizado');

  document.getElementById('panel1').classList.remove('active');
  document.getElementById('panel2').classList.add('active');
  updateSteps(2);
  window.scrollTo({top:0,behavior:'smooth'});
}

function goBack(){
  document.getElementById('panel2').classList.remove('active');
  document.getElementById('panel1').classList.add('active');
  updateSteps(1);
  window.scrollTo({top:0,behavior:'smooth'});
}

function submitForm(){
  document.getElementById('protNum').textContent='AURUM-2025-'+String(Math.floor(Math.random()*900000+100000));
  document.getElementById('panel2').classList.remove('active');
  document.getElementById('panelOk').classList.add('active');
  document.querySelectorAll('.step-item').forEach(s=>{ s.classList.remove('active','done'); s.classList.add('done'); s.querySelector('.step-num').textContent='✓'; });
  document.getElementById('pBar').style.width='100%';
  window.scrollTo({top:0,behavior:'smooth'});
}   