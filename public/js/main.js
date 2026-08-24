/* ══════════════════════════════════════════════
   PORTFOLIO — Dynamic Client Script
   Fetches content from /api/data, hydrates DOM,
   handles modal, scroll animations, counters & nav
   ══════════════════════════════════════════════ */

// Global in-memory data store
let portfolioData = null;
let projectsList = [];

// SVG Icon library for skill cards
const iconLibrary = {
  code: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  server: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  database: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
  default: `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
};

document.addEventListener('DOMContentLoaded', async () => {
  await loadPortfolioData();
  initNavbar();
  initMobileMenu();
  initModal();
  initSmoothNav();
  initHeroAnimation();
  initScrollReveal();
  initStatCounter();
});

// ─── Fetch & Render ───
async function loadPortfolioData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('API fetch failed');
    portfolioData = await res.json();
    renderContent(portfolioData);
  } catch (err) {
    console.warn('Could not load /api/data, using static fallback if available:', err);
  }
}

function renderContent(data) {
  if (!data) return;
  projectsList = data.projects || [];

  // Settings & Branding
  if (data.settings) {
    const name = data.settings.name || 'HERNANDES.';
    const initials = name.replace(/[^A-Za-z]/g, '').charAt(0) || 'H';
    
    document.title = `${name} — Portfolio`;
    document.querySelectorAll('#navLogo, #footerLogo').forEach(el => el.textContent = name);
    document.querySelectorAll('#heroInitials, #aboutInitials').forEach(el => el.textContent = initials);
    
    if (data.settings.tagline) {
      const taglineEl = document.getElementById('footerTagline');
      if (taglineEl) taglineEl.innerHTML = data.settings.tagline.replace('\n', '<br>');
    }
    
    if (data.settings.email) {
      const emailEl = document.getElementById('ctaEmail');
      if (emailEl) emailEl.href = `mailto:${data.settings.email}`;
    }
    if (data.settings.whatsapp) {
      const waEl = document.getElementById('ctaWa');
      if (waEl) waEl.href = `https://wa.me/${data.settings.whatsapp.replace(/[^0-9]/g, '')}`;
    }
    if (data.settings.github) {
      const ghEl = document.getElementById('socialGithub');
      if (ghEl) ghEl.href = data.settings.github;
    }
    if (data.settings.linkedin) {
      const inEl = document.getElementById('socialLinkedin');
      if (inEl) inEl.href = data.settings.linkedin;
    }
    if (data.settings.instagram) {
      const igEl = document.getElementById('socialInstagram');
      if (igEl) igEl.href = data.settings.instagram;
    }
    
    const year = new Date().getFullYear();
    const copyEl = document.getElementById('footerCopyright');
    if (copyEl) copyEl.innerHTML = `&copy; ${year} ${name.replace(/\.$/, '')}. All rights reserved.`;
  }

  // Hero Section
  if (data.hero) {
    const headlineEl = document.getElementById('heroHeadline');
    if (headlineEl) {
      headlineEl.innerHTML = `
        ${data.hero.headline || 'Membangun Produk Digital'}<br>
        <span class="text-gold">${data.hero.headlineAccent || 'yang Elegan'}</span> ${data.hero.headlineSuffix || '& Fungsional'}
      `;
    }
    const subEl = document.getElementById('heroSub');
    if (subEl) subEl.textContent = data.hero.subheadline || '';

    const ctaEl = document.getElementById('heroCta');
    if (ctaEl && data.hero.ctaText) {
      ctaEl.textContent = data.hero.ctaText;
      ctaEl.href = data.hero.ctaLink || '#projects';
    }

    if (data.hero.badgeLeft) {
      const lbl = document.getElementById('badgeLeftLabel');
      const val = document.getElementById('badgeLeftValue');
      if (lbl) lbl.textContent = data.hero.badgeLeft.label;
      if (val) val.textContent = data.hero.badgeLeft.value;
    }
    if (data.hero.badgeRight) {
      const lbl = document.getElementById('badgeRightLabel');
      const val = document.getElementById('badgeRightValue');
      if (lbl) lbl.textContent = data.hero.badgeRight.label;
      if (val) val.textContent = data.hero.badgeRight.value;
    }
  }

  // About Section
  if (data.about) {
    if (Array.isArray(data.about.paragraphs)) {
      const aboutContainer = document.getElementById('aboutParagraphs');
      if (aboutContainer) {
        aboutContainer.innerHTML = data.about.paragraphs
          .map((p, idx) => `<p class="${idx === 0 ? 'about-lead' : ''}">${p}</p>`)
          .join('');
      }
    }
    if (Array.isArray(data.about.stats)) {
      const statsContainer = document.getElementById('aboutStats');
      if (statsContainer) {
        statsContainer.innerHTML = data.about.stats.map(s => `
          <div class="stat-item">
            <span class="stat-number" data-target="${s.value}">${s.value}</span><span class="stat-suffix">${s.suffix || ''}</span>
            <span class="stat-label">${s.label}</span>
          </div>
        `).join('');
      }
    }
  }

  // Skills Section
  if (Array.isArray(data.skills)) {
    const skillsGrid = document.getElementById('skillsGrid');
    if (skillsGrid) {
      skillsGrid.innerHTML = data.skills.map(s => `
        <div class="skill-card">
          <div class="skill-icon">
            ${iconLibrary[s.icon] || iconLibrary.default}
          </div>
          <h3 class="skill-name">${escapeHtml(s.name)}</h3>
          <p class="skill-detail">${escapeHtml(s.detail)}</p>
        </div>
      `).join('');
    }
  }

  // Projects Section
  if (Array.isArray(data.projects)) {
    const featured = data.projects.find(p => p.featured) || data.projects[0];
    const rest = data.projects.filter(p => p !== featured);

    const featuredContainer = document.getElementById('projectFeaturedContainer');
    if (featuredContainer && featured) {
      const featuredIndex = data.projects.indexOf(featured);
      featuredContainer.innerHTML = `
        <div class="project-featured" onclick="openProjectModal(${featuredIndex})">
          <div class="project-featured-img">
            <div class="project-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              <span>${escapeHtml(featured.title)}</span>
            </div>
          </div>
          <div class="project-featured-info">
            <div class="project-tags">
              ${(featured.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            <h3>${escapeHtml(featured.title)}</h3>
            <p>${escapeHtml(featured.shortDesc || featured.fullDesc || '')}</p>
            <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); openProjectModal(${featuredIndex});">
              Lihat Detail
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `;
    }

    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
      projectsGrid.innerHTML = rest.map(p => {
        const idx = data.projects.indexOf(p);
        return `
          <div class="project-card" onclick="openProjectModal(${idx})">
            <div class="project-card-img">
              <div class="project-placeholder small">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.4"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>${escapeHtml(p.title)}</span>
              </div>
            </div>
            <div class="project-card-body">
              <div class="project-tags">
                ${(p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
              </div>
              <h3>${escapeHtml(p.title)}</h3>
              <p>${escapeHtml(p.shortDesc || p.fullDesc || '')}</p>
            </div>
            <div class="project-card-footer">
              <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); openProjectModal(${idx});">Lihat Detail →</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Experience Section
  if (Array.isArray(data.experience)) {
    const timelineContainer = document.getElementById('timelineContainer');
    if (timelineContainer) {
      timelineContainer.innerHTML = data.experience.map(item => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <span class="timeline-date">${escapeHtml(item.date)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.desc)}</p>
          </div>
        </div>
      `).join('');
    }
  }
}

// ─── Project Modal ───
function initModal() {
  const overlay = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalClose');

  if (!overlay || !closeBtn) return;
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openProjectModal(index) {
  const project = projectsList[index];
  if (!project) return;

  const overlay = document.getElementById('projectModal');
  const preview = document.getElementById('modalPreview');
  const tags = document.getElementById('modalTags');
  const title = document.getElementById('modalTitle');
  const desc = document.getElementById('modalDesc');
  const meta = document.getElementById('modalMeta');
  const liveBtn = document.getElementById('modalLive');
  const repoBtn = document.getElementById('modalRepo');

  tags.innerHTML = (project.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
  title.textContent = project.title || '';
  desc.textContent = project.fullDesc || project.shortDesc || '';

  // Meta metadata
  const metaObj = {
    'Tahun': project.year || '-',
    'Peran': project.role || '-',
    'Durasi': project.duration || '-',
    'Status': project.status || 'Active'
  };

  meta.innerHTML = Object.entries(metaObj).map(([k, v]) =>
    `<div class="meta-item"><strong>${k}</strong><span>${escapeHtml(v)}</span></div>`
  ).join('');

  // Preview with browser mockup frame
  const slug = (project.title || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24);
  preview.innerHTML = `
    <div class="modal-browser-frame">
      <div class="modal-browser-bar">
        <div class="modal-browser-dot"></div>
        <div class="modal-browser-dot"></div>
        <div class="modal-browser-dot"></div>
        <div class="modal-browser-url">hernandes.dev/${slug}</div>
      </div>
      <div class="modal-browser-content">
        <div>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <p style="margin-top:12px;">${escapeHtml(project.title)}</p>
        </div>
      </div>
    </div>
  `;

  liveBtn.href = project.live || '#';
  repoBtn.href = project.repo || '#';

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('projectModal');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

window.openProjectModal = openProjectModal;

// ─── Navbar Scroll Effect ───
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 120;
      if (window.scrollY >= top) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─── Mobile Menu ───
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('active');
    });
  });
}

// ─── Scroll Reveal (IntersectionObserver) ───
function initScrollReveal() {
  const revealSelectors = [
    '.section-header',
    '.about-grid',
    '.skill-card',
    '.project-featured',
    '.project-card',
    '.timeline-item',
    '.cta-inner'
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => observer.observe(el));
  });
}

// ─── Hero Entrance Animation ───
function initHeroAnimation() {
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero .animate-in').forEach(el => {
      el.classList.add('visible');
    });
  });
}

// ─── Stat Counter Animation ───
function initStatCounter() {
  const stats = document.querySelectorAll('.stat-number[data-target]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(s => observer.observe(s));
}

function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ─── Smooth Nav Scroll ───
function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ─── Utility ───
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
