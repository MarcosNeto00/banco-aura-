  // LOADER
  var _lh=false;function _hl(){if(_lh)return;_lh=true;document.getElementById('loader').classList.add('hidden');}setTimeout(_hl,1800);window.addEventListener('load',function(){setTimeout(_hl,1800);});

  // CURSOR
  const cursor = document.querySelector('.cursor');
  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('button, a, .service-card, .plan-card').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width = '54px'; ring.style.height = '54px'; ring.style.opacity = '1'; });
    el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '0.6'; });
  });

  // NAV SCROLL
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // SCROLL REVEAL
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

  // COUNTER ANIMATION
  function animCounter(el, target, isDecimal, suffix) {
    let start = 0; const dur = 2000; const step = 16;
    const inc = target / (dur / step);
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = (isDecimal ? start.toFixed(1) : Math.floor(start)) + (suffix || '');
    }, step);
  }
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        animCounter(el, parseFloat(el.dataset.target), el.hasAttribute('data-decimal'), el.dataset.suffix || '');
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => statsObserver.observe(el));

  // CHART TABS
  document.querySelectorAll('.chart-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // CARD 3D EFFECT
  const card = document.getElementById('heroCard');
  if (card) {
    document.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / 20;
      const dy = -(e.clientY - cy) / 20;
      card.style.transform = `rotateY(${dx}deg) rotateX(${dy}deg)`;
    });
  }

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });