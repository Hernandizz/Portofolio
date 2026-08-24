/* ══════════════════════════════════════════════
   PORTFOLIO — Main Script
   Navbar, Scroll Reveals, Stats Counter,
   Project Modal, Smooth Navigation
   ══════════════════════════════════════════════ */

// ─── Project Data ───
const projectsData = [
  {
    title: 'Chatbot Helpdesk Berbasis RAG & HID',
    desc: 'Sistem chatbot cerdas untuk helpdesk kampus yang memanfaatkan Retrieval-Augmented Generation (RAG) dan Hierarchical Information Decomposition (HID) untuk menjawab pertanyaan mahasiswa dengan akurasi tinggi berdasarkan dokumen internal. Sistem ini mampu memproses dokumen PDF, melakukan chunking hierarkis, dan menghasilkan jawaban kontekstual yang akurat.',
    tags: ['Python', 'LangChain', 'FastAPI', 'RAG'],
    meta: {
      'Tahun': '2024',
      'Peran': 'Lead Developer & Researcher',
      'Durasi': '6 Bulan',
      'Status': 'Completed'
    },
    live: '#',
    repo: 'https://github.com/hernandizz'
  },
  {
    title: 'Platform E-Commerce Modern',
    desc: 'Marketplace full-stack dengan fitur real-time chat antara buyer dan seller, integrasi payment gateway (Midtrans), dashboard analytics untuk merchant, serta sistem review dan rating. Dibangun dengan arsitektur microservice untuk skalabilitas tinggi.',
    tags: ['React', 'Node.js', 'MongoDB'],
    meta: {
      'Tahun': '2024',
      'Peran': 'Full-Stack Developer',
      'Durasi': '4 Bulan',
      'Status': 'Live'
    },
    live: '#',
    repo: 'https://github.com/hernandizz'
  },
  {
    title: 'Sistem Informasi Akademik',
    desc: 'Sistem manajemen data akademik terintegrasi yang mencakup pengelolaan data mahasiswa, penjadwalan kuliah otomatis, input nilai, dan generate transkrip. Dilengkapi role-based access control untuk admin, dosen, dan mahasiswa.',
    tags: ['Laravel', 'MySQL', 'Bootstrap'],
    meta: {
      'Tahun': '2023',
      'Peran': 'Backend Developer',
      'Durasi': '3 Bulan',
      'Status': 'Deployed'
    },
    live: '#',
    repo: 'https://github.com/hernandizz'
  },
  {
    title: 'Dashboard Analitik AI',
    desc: 'Dashboard visualisasi data prediktif yang menggunakan model machine learning untuk memberikan insight bisnis real-time. Fitur utama meliputi forecasting penjualan, analisis sentimen customer, dan automated reporting.',
    tags: ['Next.js', 'Python', 'TensorFlow'],
    meta: {
      'Tahun': '2024',
      'Peran': 'AI/ML Engineer',
      'Durasi': '5 Bulan',
      'Status': 'In Progress'
    },
    live: '#',
    repo: 'https://github.com/hernandizz'
  },
  {
    title: 'Website Company Profile',
    desc: 'Landing page premium untuk perusahaan teknologi dengan animasi GSAP yang smooth, glassmorphism, lazy loading images, dan performa Lighthouse score 95+. Responsive di semua device.',
    tags: ['HTML/CSS', 'JavaScript', 'GSAP'],
    meta: {
      'Tahun': '2023',
      'Peran': 'Frontend Developer',
      'Durasi': '2 Bulan',
      'Status': 'Live'
    },
    live: '#',
    repo: 'https://github.com/hernandizz'
  }
];

// ─── DOM Ready ───
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initStatCounter();
  initModal();
  initSmoothNav();
  initHeroAnimation();
});

// ─── Navbar Scroll Effect ───
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Glassmorphism on scroll
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active link tracking
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

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });

  // Close on link click
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

// ─── Hero entrance animation ───
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
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ─── Project Modal ───
function initModal() {
  const overlay = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalClose');

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openProjectModal(index) {
  const project = projectsData[index];
  if (!project) return;

  const overlay = document.getElementById('projectModal');
  const preview = document.getElementById('modalPreview');
  const tags = document.getElementById('modalTags');
  const title = document.getElementById('modalTitle');
  const desc = document.getElementById('modalDesc');
  const meta = document.getElementById('modalMeta');
  const liveBtn = document.getElementById('modalLive');
  const repoBtn = document.getElementById('modalRepo');

  // Fill tags
  tags.innerHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join('');
  title.textContent = project.title;
  desc.textContent = project.desc;

  // Fill meta
  meta.innerHTML = Object.entries(project.meta).map(([k, v]) =>
    `<div class="meta-item"><strong>${k}</strong><span>${v}</span></div>`
  ).join('');

  // Preview with browser mockup frame
  preview.innerHTML = `
    <div class="modal-browser-frame">
      <div class="modal-browser-bar">
        <div class="modal-browser-dot"></div>
        <div class="modal-browser-dot"></div>
        <div class="modal-browser-dot"></div>
        <div class="modal-browser-url">hernandes.dev/${project.title.toLowerCase().replace(/\s+/g, '-').substring(0, 30)}</div>
      </div>
      <div class="modal-browser-content">
        <div>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          <p style="margin-top:12px;">${project.title}</p>
        </div>
      </div>
    </div>
  `;

  // Links
  liveBtn.href = project.live;
  repoBtn.href = project.repo;

  // Show modal
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('projectModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Make it available globally
window.openProjectModal = openProjectModal;

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
