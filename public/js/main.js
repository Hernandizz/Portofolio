/* HERNANDES PORTFOLIO — client script
   Lenis smooth scroll, project data render, timeline progress, modal */

let portfolioData = null;
let projectsList = [];
let lenis = null;

// Category skill icons
const iconLibrary = {
  code: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  server: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  database: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
  default: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
};

document.addEventListener('DOMContentLoaded', async () => {
  initLenis();
  await loadPortfolioData();
  initNavbar();
  initMobileMenu();
  initModal();
  initSmoothNav();
  initScrollParallax();
  initTimelineProgress();
  initScrollReveal();
  initStatCounter();
});

// ─── Lenis Smooth Scroll ───
function initLenis() {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.4
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

// ─── Fetch & Render Content ───
async function loadPortfolioData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('API fetch failed');
    portfolioData = await res.json();
    renderContent(portfolioData);
  } catch (err) {
    console.warn('Could not load /api/data, using static HTML fallback:', err);
  }
}

function renderContent(data) {
  if (!data) return;
  projectsList = data.projects || [];

  if (data.settings) {
    const name = data.settings.name || 'HERNANDES.';
    document.title = `${name} — Portfolio`;
    document.querySelectorAll('#navLogo, #footerLogo').forEach(el => el.textContent = name);

    const aboutPhoto = document.getElementById('aboutPhoto');
    if (aboutPhoto) {
      aboutPhoto.src = data.settings.photo || 'assets/profile.jpg';
      aboutPhoto.style.display = 'block';
      aboutPhoto.removeAttribute('onerror');
    }

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

  if (data.hero) {
    const brandTitleEl = document.getElementById('heroBrandTitle');
    if (brandTitleEl) {
      brandTitleEl.textContent = data.hero.brandTitle || data.settings?.name || 'Hernandes';
    }

    const subEl = document.getElementById('heroSub');
    if (subEl) subEl.textContent = data.hero.subheadline || '';

    const ctaEl = document.getElementById('heroCta');
    if (ctaEl && data.hero.ctaText) {
      ctaEl.querySelector('span').textContent = data.hero.ctaText;
      ctaEl.href = data.hero.ctaLink || '#projects';
    }
  }

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
            <span class="stat-label">${escapeHtml(s.label)}</span>
          </div>
        `).join('');
      }
      initStatCounter();
    }
  }

  if (Array.isArray(data.skills)) {
    const skillsGrid = document.getElementById('skillsGrid');
    if (skillsGrid) {
      skillsGrid.innerHTML = data.skills.map(s => `
        <div class="skill-card" data-scroll-reveal>
          <div class="skill-icon">
            ${iconLibrary[s.icon] || iconLibrary.default}
          </div>
          <h3 class="skill-name">${escapeHtml(s.name)}</h3>
          <p class="skill-detail">${escapeHtml(s.detail)}</p>
        </div>
      `).join('');
    }
  }

  if (Array.isArray(data.projects)) {
    const featured = data.projects.find(p => p.featured) || data.projects[0];
    const rest = data.projects.filter(p => p !== featured);

    const featuredContainer = document.getElementById('projectFeaturedContainer');
    if (featuredContainer && featured) {
      const featuredIndex = data.projects.indexOf(featured);
      featuredContainer.innerHTML = `
        <div class="project-featured" onclick="openProjectModal(${featuredIndex})">
          <div class="project-featured-img-wrap">
            <img src="${escapeHtml(featured.image || 'assets/projects/project_rag.jpg')}" alt="${escapeHtml(featured.title)}">
          </div>
          <div class="project-featured-info">
            <div class="project-tags">
              ${(featured.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            <h3>${escapeHtml(featured.title)}</h3>
            <p>${escapeHtml(featured.shortDesc || featured.fullDesc || '')}</p>
            <div>
              <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); openProjectModal(${featuredIndex});">Lihat Detail</button>
            </div>
          </div>
        </div>
      `;
    }

    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
      projectsGrid.innerHTML = rest.map(p => {
        const idx = data.projects.indexOf(p);
        return `
          <div class="project-card" data-scroll-reveal onclick="openProjectModal(${idx})">
            <div class="project-card-img-wrap">
              <img src="${escapeHtml(p.image || 'assets/projects/project_ecommerce.jpg')}" alt="${escapeHtml(p.title)}">
            </div>
            <div class="project-card-body">
              <div class="project-tags">
                ${(p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
              </div>
              <h3>${escapeHtml(p.title)}</h3>
              <p>${escapeHtml(p.shortDesc || p.fullDesc || '')}</p>
            </div>
            <div class="project-card-footer">
              <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); openProjectModal(${idx});">Detail &rarr;</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  if (Array.isArray(data.experience)) {
    const timelineContainer = document.getElementById('timelineContainer');
    if (timelineContainer) {
      timelineContainer.innerHTML = `
        <div class="timeline-track">
          <div class="timeline-beam" id="timelineBeam"></div>
        </div>
        ${data.experience.map((item, idx) => `
          <div class="timeline-item ${idx === 0 ? 'active' : ''}" data-scroll-reveal>
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-date">${escapeHtml(item.date)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.desc)}</p>
            </div>
          </div>
        `).join('')}
      `;
    }
  }

  initScrollReveal();
}

// ─── Scroll Parallax & Progress ───
function initScrollParallax() {
  const progressBar = document.getElementById('scrollProgressBar');
  const heroContent = document.getElementById('heroContent');

  function updateScrollState() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

    if (progressBar) progressBar.style.width = `${Math.round(progress * 100)}%`;

    if (scrollY <= 800) {
      heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
      heroContent.style.opacity = `${Math.max(1 - scrollY * 0.0015, 0)}`;
    }
  }

  if (lenis) {
    lenis.on('scroll', updateScrollState);
  } else {
    window.addEventListener('scroll', updateScrollState, { passive: true });
  }
  updateScrollState();
}

// ─── Timeline Progress ───
function initTimelineProgress() {
  const timeline = document.getElementById('timelineContainer');
  const beam = document.getElementById('timelineBeam');

  function updateBeam() {
    if (!timeline || !beam) return;
    const rect = timeline.getBoundingClientRect();
    const windowH = window.innerHeight;
    const progress = Math.min(Math.max((windowH * 0.75 - rect.top) / rect.height, 0), 1);
    beam.style.height = `${(progress * 100).toFixed(1)}%`;

    timeline.querySelectorAll('.timeline-item').forEach(item => {
      item.classList.toggle('active', item.getBoundingClientRect().top < windowH * 0.68);
    });
  }

  if (lenis) {
    lenis.on('scroll', updateBeam);
  } else {
    window.addEventListener('scroll', updateBeam, { passive: true });
  }
  updateBeam();
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

  preview.innerHTML = `<img src="${escapeHtml(project.image || 'assets/projects/project_rag.jpg')}" alt="${escapeHtml(project.title)}">`;

  tags.innerHTML = (project.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
  title.textContent = project.title || '';
  desc.textContent = project.fullDesc || project.shortDesc || '';

  const metaObj = {
    'Tahun': project.year || '-',
    'Peran': project.role || '-',
    'Durasi': project.duration || '-',
    'Status': project.status || 'Active'
  };

  meta.innerHTML = Object.entries(metaObj).map(([k, v]) => `
    <div class="modal-meta-item">
      <span class="modal-meta-label">${k}</span>
      <span class="modal-meta-value">${escapeHtml(v)}</span>
    </div>
  `).join('');

  liveBtn.href = project.live || '#';
  repoBtn.href = project.repo || '#';

  overlay.classList.add('open');
  if (lenis) lenis.stop();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('projectModal');
  if (overlay) overlay.classList.remove('open');
  if (lenis) lenis.start();
  document.body.style.overflow = '';
}

window.openProjectModal = openProjectModal;

// ─── Navbar Scroll Effect ───
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links .nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 140;
      if (window.scrollY >= top) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  if (lenis) {
    lenis.on('scroll', onScroll);
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
  }
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
  const revealElements = document.querySelectorAll('[data-scroll-reveal], .section-header, .skill-card, .project-featured, .project-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
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
  const duration = 1600;
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

// ─── Lenis Smooth Nav Scroll ───
function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -60, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(target, { offset: -60, immediate: true });
        } else {
          target.scrollIntoView({ block: 'start' });
        }
      }, 200);
    }
  }
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
