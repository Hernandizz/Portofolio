/* ══════════════════════════════════════════════
   PORTFOLIO — Dynamic Client Script (Dark Mineral)
   Fetches content from /api/data, hydrates DOM,
   handles 3D stone physics, Devicon running marquee,
   modal, scroll animations, counters & nav
   ══════════════════════════════════════════════ */

// Global in-memory data store
let portfolioData = null;
let projectsList = [];

// Devicon Class Lookup Map for Tech Stack
const deviconMap = {
  'react': 'devicon-react-original colored',
  'next.js': 'devicon-nextjs-plain',
  'nextjs': 'devicon-nextjs-plain',
  'python': 'devicon-python-plain colored',
  'python ai': 'devicon-python-plain colored',
  'node.js': 'devicon-nodejs-plain colored',
  'nodejs': 'devicon-nodejs-plain colored',
  'fastapi': 'devicon-fastapi-plain colored',
  'postgresql': 'devicon-postgresql-plain colored',
  'postgres': 'devicon-postgresql-plain colored',
  'mysql': 'devicon-mysql-plain colored',
  'mongodb': 'devicon-mongodb-plain colored',
  'tailwind': 'devicon-tailwindcss-original colored',
  'tailwind css': 'devicon-tailwindcss-original colored',
  'docker': 'devicon-docker-plain colored',
  'typescript': 'devicon-typescript-plain colored',
  'javascript': 'devicon-javascript-plain colored',
  'html/css': 'devicon-html5-plain colored',
  'html': 'devicon-html5-plain colored',
  'css': 'devicon-css3-plain colored',
  'git': 'devicon-git-plain colored',
  'github': 'devicon-github-original',
  'figma': 'devicon-figma-plain colored',
  'laravel': 'devicon-laravel-plain colored',
  'vue': 'devicon-vuejs-plain colored',
  'vue.js': 'devicon-vuejs-plain colored',
  'tensorflow': 'devicon-tensorflow-original colored',
  'langchain': 'devicon-python-plain colored',
  'rag': 'devicon-networkx-plain colored',
  'linux': 'devicon-linux-plain colored',
  'firebase': 'devicon-firebase-plain colored',
  'bootstrap': 'devicon-bootstrap-plain colored',
  'c++': 'devicon-cplusplus-plain colored',
  'c#': 'devicon-csharp-plain colored',
  'go': 'devicon-go-original-wordmark colored',
  'rust': 'devicon-rust-plain'
};

function getDeviconClass(techName) {
  if (!techName) return 'devicon-devicon-plain colored';
  const key = techName.toLowerCase().trim();
  return deviconMap[key] || 'devicon-codeigniter-plain colored';
}

// SVG Icon library for category skill cards
const iconLibrary = {
  code: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  server: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  database: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>`,
  default: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
};

document.addEventListener('DOMContentLoaded', async () => {
  await loadPortfolioData();
  initNavbar();
  initMobileMenu();
  initModal();
  initSmoothNav();
  initStone3DPhysics();
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
    
    document.title = `${name} — Portfolio`;
    document.querySelectorAll('#navLogo, #footerLogo').forEach(el => el.textContent = name);

    // Profile photo (updated dark studio version)
    const aboutPhoto = document.getElementById('aboutPhoto');
    if (aboutPhoto) {
      aboutPhoto.src = data.settings.photo || 'assets/profile.jpg';
      aboutPhoto.style.display = 'block';
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

  // Hero Section (Reference Composition)
  if (data.hero) {
    // Brand Title Headline
    const brandTitleEl = document.getElementById('heroBrandTitle');
    if (brandTitleEl) {
      const brand = data.hero.brandTitle || data.settings?.name || 'Hernandes';
      brandTitleEl.textContent = brand;
    }

    // Hero Stone Image
    const stoneImgEl = document.getElementById('heroStoneImg');
    if (stoneImgEl && data.hero.heroImage) {
      stoneImgEl.src = data.hero.heroImage;
    }

    // Hero Subtitle & Captions
    const subEl = document.getElementById('heroSub');
    if (subEl) subEl.textContent = data.hero.subheadline || '';

    // Microtext Left & Right
    const leftEl = document.getElementById('brandSubLeft');
    if (leftEl && data.hero.brandSubtitleLeft) {
      const parts = data.hero.brandSubtitleLeft.split('\n');
      leftEl.innerHTML = `
        <span class="micro-title">${escapeHtml(parts[0] || 'YOUR TRUSTED PARTNER')}</span>
        <span class="micro-desc">${escapeHtml(parts[1] || 'IN FULL-STACK & AI SYSTEMS')}</span>
      `;
    }

    const rightEl = document.getElementById('brandStatRight');
    if (rightEl && data.hero.brandStatRight) {
      const parts = data.hero.brandStatRight.split('\n');
      rightEl.innerHTML = `
        <span class="micro-title">${escapeHtml(parts[0] || 'OVER TIME')}</span>
        <span class="micro-desc text-gold">${escapeHtml(parts[1] || '+ 20+ SHIPPED PROJECTS')}</span>
      `;
    }

    // CTA Button
    const ctaEl = document.getElementById('heroCta');
    if (ctaEl && data.hero.ctaText) {
      ctaEl.querySelector('span').textContent = data.hero.ctaText;
      ctaEl.href = data.hero.ctaLink || '#projects';
    }

    // Render Tech Stack Running Marquee
    renderTechMarquee(data.hero.floatingTech || [
      'React', 'Next.js', 'Python AI', 'Node.js', 'FastAPI', 'PostgreSQL', 'Tailwind', 'Docker', 'TypeScript', 'MongoDB', 'Git', 'Figma'
    ]);
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
            <span class="stat-label">${escapeHtml(s.label)}</span>
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
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.35"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              <span>${escapeHtml(featured.title)}</span>
            </div>
          </div>
          <div class="project-featured-info">
            <div class="project-tags">
              ${(featured.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            <h3>${escapeHtml(featured.title)}</h3>
            <p>${escapeHtml(featured.shortDesc || featured.fullDesc || '')}</p>
            <div>
              <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); openProjectModal(${featuredIndex});">
                Lihat Detail
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
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
          <div class="project-card" onclick="openProjectModal(${idx})">
            <div class="project-card-img">
              <div class="project-placeholder small">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.35"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
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

// ─── Tech Stack Running Marquee Renderer ───
function renderTechMarquee(techList) {
  const container = document.getElementById('techMarqueeTrack');
  if (!container || !Array.isArray(techList)) return;

  // Render items duplicated twice for infinite seamless CSS scroll
  const items = [...techList, ...techList];
  
  container.innerHTML = items.map(tech => `
    <div class="tech-marquee-item">
      <i class="${getDeviconClass(tech)}"></i>
      <span>${escapeHtml(tech)}</span>
    </div>
  `).join('');
}

// ─── Interactive 3D Stone & Parallax Physics ───
function initStone3DPhysics() {
  const hero = document.getElementById('home');
  const card = document.getElementById('stone3dCard');
  const headline = document.getElementById('heroBrandTitle');
  if (!hero || !card) return;

  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;

  function onMouseMove(e) {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates: -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    targetX = normX * 16; // Max 16 deg Y-axis rotation
    targetY = -normY * 14; // Max 14 deg X-axis rotation
  }

  function onMouseLeave() {
    targetX = 0;
    targetY = 0;
  }

  function updatePhysics() {
    // Spring lerp interpolation
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    if (card) {
      card.style.transform = `perspective(1000px) rotateX(${currentY.toFixed(2)}deg) rotateY(${currentX.toFixed(2)}deg) translateZ(15px)`;
    }

    if (headline) {
      headline.style.transform = `translateX(${(-currentX * 0.35).toFixed(2)}px) translateY(${(-currentY * 0.35).toFixed(2)}px)`;
    }

    requestAnimationFrame(updatePhysics);
  }

  hero.addEventListener('mousemove', onMouseMove, { passive: true });
  hero.addEventListener('mouseleave', onMouseLeave, { passive: true });

  // Touch support for mobile devices
  hero.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    const rect = hero.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;
    targetX = normX * 10;
    targetY = -normY * 8;
  }, { passive: true });

  hero.addEventListener('touchend', onMouseLeave, { passive: true });

  updatePhysics();
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

  meta.innerHTML = Object.entries(metaObj).map(([k, v]) => `
    <div class="modal-meta-item">
      <span class="modal-meta-label">${k}</span>
      <span class="modal-meta-value">${escapeHtml(v)}</span>
    </div>
  `).join('');

  liveBtn.href = project.live || '#';
  repoBtn.href = project.repo || '#';

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('projectModal');
  if (overlay) overlay.classList.remove('open');
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
      const top = s.offsetTop - 140;
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
