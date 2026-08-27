/* ══════════════════════════════════════════════
   HERNANDES PORTFOLIO — DESIGN 3 CLIENT SCRIPT
   - Lenis Smooth Inertia Momentum Scroll Engine
   - Storytelling Chapter HUD & Read Progress
   - Ambient Cosmic Particle Canvas & Spotlight
   - Hero Parallax & 3D Stone Inertia Physics
   - Luminous Timeline Laser Beam Tracking
   - Velocity-Reactive Running Tech Marquee
   - High-Fidelity Project Artwork Mockups & Modal
   ══════════════════════════════════════════════ */

// Global State
let portfolioData = null;
let projectsList = [];
let lenis = null;

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

// Category skill icons
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
  initLenis();
  initAmbientCanvas();
  initCursorSpotlight();
  await loadPortfolioData();
  initNavbar();
  initMobileMenu();
  initModal();
  initSmoothNav();
  initStone3DPhysics();
  initScrollParallax();
  initTimelineLaser();
  initScrollReveal();
  initStatCounter();
});

// ─── 1. Lenis Smooth Momentum Scroll Engine ───
function initLenis() {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } else {
    console.log('Lenis CDN fallback: using native smooth scrolling');
  }
}

// ─── 2. Ambient Particle Canvas Engine ───
function initAmbientCanvas() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 28), 50);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.45 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      isGold: Math.random() > 0.6
    });
  }

  function renderParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isGold
        ? `rgba(212, 175, 55, ${p.alpha})`
        : `rgba(255, 255, 255, ${p.alpha * 0.7})`;
      ctx.fill();
    });

    requestAnimationFrame(renderParticles);
  }

  renderParticles();
}

// ─── 3. Interactive Cursor Spotlight / Flashlight ───
function initCursorSpotlight() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.body.classList.add('cursor-active');
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-active');
  });

  function animateSpotlight() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.transform = `translate(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px)`;
    requestAnimationFrame(animateSpotlight);
  }
  animateSpotlight();
}

// ─── 4. Fetch & Render Content ───
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

  // Hero Section
  if (data.hero) {
    const brandTitleEl = document.getElementById('heroBrandTitle');
    if (brandTitleEl) {
      brandTitleEl.textContent = data.hero.brandTitle || data.settings?.name || 'Hernandes';
    }

    const stoneImgEl = document.getElementById('heroStoneImg');
    if (stoneImgEl && data.hero.heroImage) {
      stoneImgEl.src = data.hero.heroImage;
    }

    const subEl = document.getElementById('heroSub');
    if (subEl) subEl.textContent = data.hero.subheadline || '';

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

    const ctaEl = document.getElementById('heroCta');
    if (ctaEl && data.hero.ctaText) {
      ctaEl.querySelector('span').textContent = data.hero.ctaText;
      ctaEl.href = data.hero.ctaLink || '#projects';
    }

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

  // Projects Section (Rendered with real Artwork)
  if (Array.isArray(data.projects)) {
    const featured = data.projects.find(p => p.featured) || data.projects[0];
    const rest = data.projects.filter(p => p !== featured);

    const featuredContainer = document.getElementById('projectFeaturedContainer');
    if (featuredContainer && featured) {
      const featuredIndex = data.projects.indexOf(featured);
      const featuredImg = featured.image || 'assets/projects/project_rag.jpg';
      featuredContainer.innerHTML = `
        <div class="project-featured" onclick="openProjectModal(${featuredIndex})">
          <div class="project-featured-img-wrap">
            <img src="${featuredImg}" alt="${escapeHtml(featured.title)}" class="project-thumb-img" onerror="this.src='assets/projects/project_rag.jpg'">
            <div class="project-img-overlay"></div>
            <div class="project-badge-pill">FEATURED ARCHITECTURE</div>
          </div>
          <div class="project-featured-info">
            <div class="project-tags">
              ${(featured.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            <h3>${escapeHtml(featured.title)}</h3>
            <p>${escapeHtml(featured.shortDesc || featured.fullDesc || '')}</p>
            <div>
              <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); openProjectModal(${featuredIndex});">
                Lihat Case Study
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
        const pImg = p.image || 'assets/projects/project_ecommerce.jpg';
        return `
          <div class="project-card" data-scroll-reveal onclick="openProjectModal(${idx})">
            <div class="project-card-img-wrap">
              <img src="${pImg}" alt="${escapeHtml(p.title)}" class="project-thumb-img" onerror="this.src='assets/projects/project_dashboard.jpg'">
              <div class="project-img-overlay"></div>
            </div>
            <div class="project-card-body">
              <div class="project-tags">
                ${(p.tags || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
              </div>
              <h3>${escapeHtml(p.title)}</h3>
              <p>${escapeHtml(p.shortDesc || p.fullDesc || '')}</p>
            </div>
            <div class="project-card-footer">
              <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); openProjectModal(${idx});">Explore Details →</button>
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
      const itemsHtml = data.experience.map((item, idx) => `
        <div class="timeline-item ${idx === 0 ? 'active' : ''}" data-scroll-reveal>
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <span class="timeline-date">${escapeHtml(item.date)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.desc)}</p>
          </div>
        </div>
      `).join('');

      timelineContainer.innerHTML = `
        <div class="timeline-laser-track" id="timelineLaserTrack">
          <div class="timeline-laser-beam" id="timelineLaserBeam"></div>
        </div>
        ${itemsHtml}
      `;
    }
  }

  // Trigger reveal check after hydration
  initScrollReveal();
}

// ─── 5. Tech Stack Running Marquee Renderer ───
function renderTechMarquee(techList) {
  const container = document.getElementById('techMarqueeTrack');
  if (!container || !Array.isArray(techList)) return;

  const items = [...techList, ...techList];
  container.innerHTML = items.map(tech => `
    <div class="tech-marquee-item">
      <i class="${getDeviconClass(tech)}"></i>
      <span>${escapeHtml(tech)}</span>
    </div>
  `).join('');
}

// ─── 6. 3D Stone Monolith Inertia Physics ───
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
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;
    targetX = normX * 16;
    targetY = -normY * 14;
  }

  function onMouseLeave() {
    targetX = 0;
    targetY = 0;
  }

  function updatePhysics() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    if (card) {
      card.style.transform = `perspective(1000px) rotateX(${currentY.toFixed(2)}deg) rotateY(${currentX.toFixed(2)}deg) translateZ(15px)`;
    }

    if (headline) {
      headline.style.transform = `translateX(${(-currentX * 0.3).toFixed(2)}px) translateY(${(-currentY * 0.3).toFixed(2)}px)`;
    }

    requestAnimationFrame(updatePhysics);
  }

  hero.addEventListener('mousemove', onMouseMove, { passive: true });
  hero.addEventListener('mouseleave', onMouseLeave, { passive: true });

  hero.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    const rect = hero.getBoundingClientRect();
    const touch = e.touches[0];
    const normX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = ((touch.clientY - rect.top) / rect.height) * 2 - 1;
    targetX = normX * 10;
    targetY = -normY * 8;
  }, { passive: true });

  hero.addEventListener('touchend', onMouseLeave, { passive: true });
  updatePhysics();
}

// ─── 7. Scroll Parallax & Progress Bar ───
function initScrollParallax() {
  const progressBar = document.getElementById('scrollProgressBar');
  const stoneAnchor = document.getElementById('heroStoneAnchor');
  const headlineLayer = document.querySelector('.hero-title-layer');
  const heroBottomBar = document.getElementById('heroBottomBar');

  function updateScrollState() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
    const pct = Math.round(progress * 100);

    if (progressBar) progressBar.style.width = `${pct}%`;

    // Cinematic Hero Parallax Exit (First 900px)
    if (scrollY <= 900) {
      if (stoneAnchor) {
        stoneAnchor.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.28}px)) scale(${Math.max(1 - scrollY * 0.0003, 0.75)})`;
        stoneAnchor.style.opacity = `${Math.max(1 - scrollY * 0.0016, 0)}`;
      }
      if (headlineLayer) {
        headlineLayer.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.42}px))`;
        headlineLayer.style.opacity = `${Math.max(1 - scrollY * 0.0018, 0)}`;
      }
      if (heroBottomBar) {
        heroBottomBar.style.transform = `translateY(${scrollY * 0.2}px)`;
        heroBottomBar.style.opacity = `${Math.max(1 - scrollY * 0.002, 0)}`;
      }
    }
  }

  if (lenis) {
    lenis.on('scroll', updateScrollState);
  } else {
    window.addEventListener('scroll', updateScrollState, { passive: true });
  }
  updateScrollState();
}

// ─── 8. Luminous Timeline Laser Beam Tracker ───
function initTimelineLaser() {
  const timeline = document.getElementById('timelineContainer');
  const beam = document.getElementById('timelineLaserBeam');
  if (!timeline || !beam) return;

  function updateLaser() {
    const rect = timeline.getBoundingClientRect();
    const windowH = window.innerHeight;
    const startOffset = windowH * 0.75;
    const totalH = rect.height;

    const visibleTop = startOffset - rect.top;
    const progress = Math.min(Math.max(visibleTop / totalH, 0), 1);

    beam.style.height = `${(progress * 100).toFixed(1)}%`;

    const items = timeline.querySelectorAll('.timeline-item');
    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < windowH * 0.68) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  if (lenis) {
    lenis.on('scroll', updateLaser);
  } else {
    window.addEventListener('scroll', updateLaser, { passive: true });
  }
  updateLaser();
}

// ─── 9. Project Modal ───
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

  const pImg = project.image || 'assets/projects/project_rag.jpg';
  preview.innerHTML = `<img src="${pImg}" alt="${escapeHtml(project.title)}" onerror="this.src='assets/projects/project_dashboard.jpg'">`;

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

// ─── 10. Navbar Scroll Effect ───
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

// ─── 11. Mobile Menu ───
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

// ─── 12. Scroll Reveal (IntersectionObserver) ───
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-scroll-reveal], .section-header, .about-grid, .skill-card, .project-featured, .project-card, .manifesto-card, .cta-inner');

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

// ─── 13. Stat Counter Animation ───
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

// ─── 14. Lenis Smooth Nav Scroll ───
function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -60, duration: 1.35 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
