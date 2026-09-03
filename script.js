/* ============================================================
   MUTIA SAHIRA — PORTFOLIO SCRIPT
   ============================================================ */

/* ── NAV scroll state ── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Mobile hamburger ── */
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('nav-mobile-open', open);
  hamburger.setAttribute('aria-expanded', open);
});
// Close mobile menu when link clicked
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('nav-mobile-open');
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id], div[id="marquee-strip"]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35, rootMargin: '-56px 0px 0px 0px' });
sections.forEach(s => observer.observe(s));

/* ── Hero name SVG wobbly underline ── */
function drawWobblyUnderline() {
  const target = document.getElementById('hero-underline');
  if (!target) return;
  const w = target.offsetWidth;
  if (w === 0) return;
  const existing = target.querySelector('svg');
  if (existing) existing.remove();
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${w} 10`);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.style.cssText = `position:absolute;bottom:-8px;left:0;width:100%;height:10px;overflow:visible;pointer-events:none`;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  // Wobbly path: slightly irregular
  const mid = w / 2;
  const d = `M 2 6 Q ${mid * 0.4} 2 ${mid} 7 Q ${mid * 1.6} 11 ${w - 2} 5`;
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#ffde00');
  path.setAttribute('stroke-width', '3');
  path.setAttribute('stroke-linecap', 'round');
  svg.appendChild(path);
  target.style.position = 'relative';
  target.appendChild(svg);
}
window.addEventListener('load', drawWobblyUnderline);
window.addEventListener('resize', drawWobblyUnderline);

/* ── Discipline card expand ── */
function toggleDC(btn) {
  const card = btn.closest('.discipline-card');
  const detail = card.querySelector('.dc-detail');
  const label = btn.querySelector('.dc-btn-text');
  const open = detail.classList.toggle('open');
  label.textContent = open ? '− HIDE DETAIL' : '+ SEE DETAIL';
}

/* ── Research paper accordion ── */
function togglePaper(id) {
  const item = document.getElementById(id);
  const allItems = document.querySelectorAll('.paper-item');
  allItems.forEach(p => {
    if (p.id !== id) p.classList.remove('open');
  });
  item.classList.toggle('open');
}

/* ── Project card expand ── */
function toggleCard(id) {
  const card = document.getElementById(id);
  card.classList.toggle('open');
}

/* ── Process step timeline (Tier 1 projects) ── */
function switchStep(projectId, idx) {
  const stepsEl = document.getElementById(`${projectId}-steps`);
  const steps = stepsEl.querySelectorAll('.pt-step');
  steps.forEach((s, i) => s.classList.toggle('active', i === idx));

  // Find all panels for this project
  let i = 0;
  while (true) {
    const panel = document.getElementById(`${projectId}-panel-${i}`);
    if (!panel) break;
    panel.classList.toggle('active', i === idx);
    i++;
  }
}

/* ── Event accordion (GDGoC events) ── */
function toggleEAI(id) {
  const item = document.getElementById(id);
  const allItems = document.querySelectorAll('.event-accordion-item');
  allItems.forEach(e => {
    if (e.id !== id) e.classList.remove('open');
  });
  item.classList.toggle('open');
}

/* ── Timeline expand ── */
function toggleTL(id) {
  const item = document.getElementById(id);
  item.classList.toggle('open');
}

/* ── Project filter tabs ── */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    filterProjects(filter);
  });
});

function filterProjects(filter) {
  const catMatch = (cat, f) => {
    if (f === 'all') return true;
    if (cat === 'all') return true; // always-visible items (e.g. Digistar)
    if (f === 'data'       && (cat === 'data' || cat === 'ml')) return true;
    if (f === 'design'     && cat === 'design')     return true;
    if (f === 'dev'        && cat === 'dev')        return true;
    if (f === 'multimedia' && cat === 'multimedia') return true;
    return false;
  };

  document.querySelectorAll('.project-featured').forEach(el => {
    el.classList.toggle('visible', catMatch(el.dataset.cat || '', filter));
  });
  document.querySelectorAll('.project-card').forEach(el => {
    el.classList.toggle('visible', catMatch(el.dataset.cat || '', filter));
  });
  document.querySelectorAll('.project-tile').forEach(el => {
    el.classList.toggle('visible', catMatch(el.dataset.cat || '', filter));
  });
}

/* ── Modal system ── */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  // focus trap: focus close button
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(event, id) {
  if (event.target.id === id) closeModal(id);
}

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

/* ── Copy email ── */
function copyEmail() {
  const email = 'mutiashrjh@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showToast();
  }).catch(() => {
    // Fallback
    const el = document.createElement('textarea');
    el.value = email;
    el.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast();
  });
}

function showToast() {
  const toast = document.getElementById('copy-toast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Metric counter animation ── */
function animateCounter(el, end, duration = 800, suffix = '') {
  const start = 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * end);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = end + suffix;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const raw = el.dataset.count;
    if (!raw) return;
    const num = parseInt(raw.replace(/\D/g, ''), 10);
    const suffix = raw.includes('+') ? '+' : '';
    animateCounter(el, num, 900, suffix);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

// Mark countable metric numbers
document.querySelectorAll('.metric-num, .pm-num, .pem-num, .eaim-n, .lcm-n').forEach(el => {
  const text = el.textContent.trim();
  // Only animate pure numbers (with optional +)
  if (/^\d[\d,.]*\+?$/.test(text)) {
    el.dataset.count = text;
    counterObserver.observe(el);
  }
});

/* ── Smooth scroll offset for fixed nav ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 64; // nav height + buffer
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================================
   CREDENTIALS DRAWER & FILTER CONTROLLER
   ============================================================ */

function toggleCredDetail(drawerId, btn) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  const isOpen = drawer.classList.toggle('open');
  const span = btn.querySelector('span');
  if (span) {
    span.textContent = isOpen 
      ? '− HIDE MODULE LIST' 
      : (drawerId === 'cred-bangkit' ? '+ VIEW 6 VERIFIED COURSES' : '+ VIEW MODULES & DEPLOYMENTS');
  }
}

function filterCreds(category, tabBtn) {
  // Update tab button styles
  document.querySelectorAll('.c-tab').forEach(b => b.classList.remove('active'));
  tabBtn.classList.add('active');

  // Filter flagship cards
  document.querySelectorAll('.cred-flagship-card').forEach(card => {
    const cat = card.dataset.cat || '';
    if (category === 'all' || cat.includes(category)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // Filter compact matrix rows
  document.querySelectorAll('.cred-compact-row').forEach(row => {
    const cat = row.dataset.cat || '';
    if (category === 'all' || cat.includes(category)) {
      row.style.display = 'flex';
    } else {
      row.style.display = 'none';
    }
  });
}
