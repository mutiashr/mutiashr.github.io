/* ============================================================
   MUTIA SAHIRA · PORTFOLIO SCRIPT
   ============================================================ */

/* ── NAV scroll state ── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

/* ── Mobile hamburger ── */
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('nav-mobile-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('nav-mobile-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id], div[id="marquee-strip"]');
const navLinks = document.querySelectorAll('.nav-links a');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-64px 0px 0px 0px' });
  sections.forEach(s => observer.observe(s));
}

/* ── Discipline card expand ── */
function toggleDC(btn) {
  const card = btn.closest('.discipline-card');
  if (!card) return;
  const detail = card.querySelector('.dc-detail');
  const label = btn.querySelector('.dc-btn-text');
  if (!detail || !label) return;
  const open = detail.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
  label.textContent = open ? '− HIDE' : '+ TOOLS';
}

/* ── Jump from Bridge discipline card to filtered Work view ── */
function jumpToWorkCategory(filterName) {
  const workSec = document.getElementById('work');
  if (workSec) {
    const top = workSec.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  }
  const targetBtn = document.querySelector(`.filter-btn[data-filter="${filterName}"]`);
  if (targetBtn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    targetBtn.classList.add('active');
    activeWorkFilter = filterName;
    applyWorkFilters();
  }
}

/* ── Open specific paper in #research and scroll to it ── */
function openResearchPaper(paperId) {
  const item = document.getElementById(paperId);
  if (!item) return;
  document.querySelectorAll('.paper-item').forEach(p => {
    const isTarget = p.id === paperId;
    p.classList.toggle('open', isTarget);
    const hdr = p.querySelector('.paper-header');
    if (hdr) hdr.setAttribute('aria-expanded', String(isTarget));
  });
  const top = item.getBoundingClientRect().top + window.scrollY - 68;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ── Jump to a specific section & open an accordion item ── */
function jumpAndOpenTimeline(tlId) {
  const item = document.getElementById(tlId);
  if (!item) return;
  item.classList.add('open');
  const card = item.querySelector('.tl-card');
  if (card) card.setAttribute('aria-expanded', 'true');
  const top = item.getBoundingClientRect().top + window.scrollY - 68;
  window.scrollTo({ top, behavior: 'smooth' });
}

function jumpAndOpenCredential(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  drawer.classList.add('open');
  const card = drawer.closest('.cred-flagship-card');
  if (card) {
    const btn = card.querySelector('.cf-toggle-btn');
    if (btn) {
      btn.setAttribute('aria-expanded', 'true');
      const btnSpan = btn.querySelector('span');
      if (btnSpan) btnSpan.textContent = '− HIDE MODULES';
    }
    const top = card.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ── Research paper accordion ── */
function togglePaper(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const allItems = document.querySelectorAll('.paper-item');
  allItems.forEach(p => {
    if (p.id !== id) {
      p.classList.remove('open');
      const hdr = p.querySelector('.paper-header');
      if (hdr) hdr.setAttribute('aria-expanded', 'false');
    }
  });
  const isOpen = item.classList.toggle('open');
  const hdr = item.querySelector('.paper-header');
  if (hdr) hdr.setAttribute('aria-expanded', String(isOpen));
}

/* ── Project card expand ── */
function toggleCard(id) {
  const card = document.getElementById(id);
  if (!card) return;
  const isOpen = card.classList.toggle('open');
  const btn = card.querySelector('.pc-expand-btn');
  if (btn) btn.setAttribute('aria-expanded', String(isOpen));
}

/* ── Event accordion (GDGoC events) ── */
function toggleEAI(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const allItems = document.querySelectorAll('.event-accordion-item');
  allItems.forEach(e => {
    if (e.id !== id) {
      e.classList.remove('open');
      const hdr = e.querySelector('.eai-header');
      if (hdr) hdr.setAttribute('aria-expanded', 'false');
    }
  });
  const isOpen = item.classList.toggle('open');
  const hdr = item.querySelector('.eai-header');
  if (hdr) hdr.setAttribute('aria-expanded', String(isOpen));
}

/* ── Timeline expand ── */
function toggleTL(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const isOpen = item.classList.toggle('open');
  const card = item.querySelector('.tl-card');
  if (card) card.setAttribute('aria-expanded', String(isOpen));
}

/* ── Secondary Credentials Collapse Toggle ── */
function toggleExtraCreds() {
  const matrix = document.getElementById('cred-matrix');
  const btn = document.getElementById('cred-more-btn');
  if (!matrix || !btn) return;
  const showAll = matrix.classList.toggle('show-all');
  btn.setAttribute('aria-expanded', String(showAll));
  btn.textContent = showAll
    ? '− COLLAPSE ADDITIONAL CERTIFICATES'
    : '+ SHOW 4 ADDITIONAL CERTIFICATES (EF SET C2, LINEAR ALGEBRA, SQL, GIT)';
}

/* ── Category filter tabs (Search bar & search state removed cleanly) ── */
let activeWorkFilter = 'all';
const filterBtns = document.querySelectorAll('.filter-btn');
const workStatusText = document.getElementById('work-status-text');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeWorkFilter = btn.dataset.filter || 'all';
    applyWorkFilters();
  });
});

function filterProjects(filter) {
  activeWorkFilter = filter;
  applyWorkFilters();
}

function applyWorkFilters() {
  const catMatch = (catAttr, f) => {
    if (f === 'all') return true;
    const cats = (catAttr || '').toLowerCase().split(/\s+/).filter(Boolean);
    if (cats.includes('all')) return true;
    if (f === 'data' && (cats.includes('data') || cats.includes('ml'))) return true;
    return cats.includes(f);
  };

  let visibleCount = 0;
  const allWorkItems = document.querySelectorAll('.project-card, .project-tile');
  allWorkItems.forEach(el => {
    const show = catMatch(el.dataset.cat || '', activeWorkFilter);
    el.classList.toggle('visible', show);
    if (show) visibleCount++;
  });

  const total = allWorkItems.length;
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.textContent = `ALL (${total})`;

  const archiveEyebrow = document.getElementById('archive-eyebrow');
  if (archiveEyebrow) {
    const tiles = document.querySelectorAll('.project-tile').length;
    archiveEyebrow.textContent = `Complete Work & Creative Archive (${tiles} Items)`;
  }

  if (workStatusText) {
    const labelMap = {
      data: 'Data & Machine Learning',
      design: 'UI/UX Design',
      leadership: 'Leadership & Operations',
      dev: 'Web Development & Tools',
      multimedia: 'Multimedia & Visual Production'
    };
    workStatusText.textContent = activeWorkFilter === 'all'
      ? `Showing all ${total} portfolio entries`
      : `Showing ${visibleCount} project${visibleCount === 1 ? '' : 's'} in ${labelMap[activeWorkFilter] || activeWorkFilter}`;
  }
}

// Sinkronkan angka dengan DOM saat load
applyWorkFilters();

/* ── Modal system ── */
let lastFocusedElement = null;
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 60);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

function closeModalOutside(event, id) {
  if (event.target && event.target.id === id) closeModal(id);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.getAttribute('role') === 'button') {
    e.preventDefault();
    e.target.click();
  }
});

/* ── Copy email ── */
function copyEmail() {
  const email = 'mutiashrjh@gmail.com';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      showToast();
    }).catch(() => {
      fallbackCopyEmail(email);
    });
  } else {
    fallbackCopyEmail(email);
  }
}

function fallbackCopyEmail(email) {
  const el = document.createElement('textarea');
  el.value = email;
  el.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(el);
  el.select();
  try { document.execCommand('copy'); } catch (err) {}
  document.body.removeChild(el);
  showToast();
}

function showToast() {
  const toast = document.getElementById('copy-toast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── Smooth scroll offset for fixed floating nav ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 60;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Credentials Drawer & Filter Controller ── */
function toggleCredDetail(drawerId, btn) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  const isOpen = drawer.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', String(isOpen));
  const span = btn ? btn.querySelector('span') : null;
  if (span) {
    span.textContent = isOpen
      ? '− HIDE MODULES'
      : (drawerId === 'cred-bangkit' ? '+ VIEW 6 VERIFIED COURSES' : '+ VIEW 7 MODULES');
  }
}

function filterCreds(category, tabBtn) {
  document.querySelectorAll('.c-tab').forEach(b => b.classList.remove('active'));
  if (tabBtn) tabBtn.classList.add('active');

  document.querySelectorAll('.cred-flagship-card').forEach(card => {
    const cat = card.dataset.cat || '';
    card.style.display = (category === 'all' || cat.includes(category)) ? 'block' : 'none';
  });

  const moreWrap = document.querySelector('.cred-more-wrap');
  if (category === 'all') {
    if (moreWrap) moreWrap.style.display = 'block';
    document.querySelectorAll('.cred-compact-row').forEach(row => {
      row.style.display = '';
    });
  } else {
    if (moreWrap) moreWrap.style.display = 'none';
    document.querySelectorAll('.cred-compact-row').forEach(row => {
      const cat = row.dataset.cat || '';
      row.style.display = cat.includes(category) ? 'flex' : 'none';
    });
  }
}

/* ── Graceful SVG fallback if local asset is not present ── */
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function handleImgErr() {
    if (this.dataset.fallbackApplied) return;
    this.dataset.fallbackApplied = 'true';
    const label = (this.getAttribute('alt') || 'Portfolio Visual').replace(/[<>&"']/g, '');
    const srcPath = (this.getAttribute('src') || '').replace(/[<>&"']/g, '');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480" viewBox="0 0 800 480">
      <rect width="800" height="480" fill="#e6e6e6"/>
      <rect x="16" y="16" width="768" height="448" rx="28" fill="#ffffff" stroke="#e2e2e2" stroke-width="1.5"/>
      <rect x="16" y="16" width="768" height="40" fill="#f5f5f5" stroke="#e2e2e2" stroke-width="1.5"/>
      <circle cx="40" cy="36" r="5" fill="#ff5f57" stroke="#181818" stroke-width="1.2"/>
      <circle cx="58" cy="36" r="5" fill="#ffbd2e" stroke="#181818" stroke-width="1.2"/>
      <circle cx="76" cy="36" r="5" fill="#28c840" stroke="#181818" stroke-width="1.2"/>
      <text x="100" y="41" font-family="monospace" font-size="12" font-weight="bold" fill="#181818">${srcPath}</text>
      <text x="400" y="245" text-anchor="middle" font-family="monospace" font-size="18" font-weight="bold" fill="#181818">${label}</text>
    </svg>`;
    this.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) img.dispatchEvent(new Event('error'));
});
