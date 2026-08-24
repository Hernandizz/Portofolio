/* ══════════════════════════════════════════════
   ADMIN CMS CLIENT LOGIC
   Manages authentication, tabs, forms data binding,
   CRUD for projects, skills, experience & stats,
   and saving changes to /api/data
   ══════════════════════════════════════════════ */

let adminData = {
  settings: {},
  hero: {},
  about: { paragraphs: [], stats: [] },
  skills: [],
  projects: [],
  experience: []
};

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initTabs();
  initForms();
  initProjectModal();
});

// ─── Authentication ───
async function initAuth() {
  const loginForm = document.getElementById('loginForm');
  const loginBtn = document.getElementById('loginBtn');
  const loginError = document.getElementById('loginError');
  const logoutBtn = document.getElementById('logoutBtn');

  // Check existing session
  try {
    const res = await fetch('/api/auth-check');
    const data = await res.json();
    if (data.authenticated) {
      showDashboard();
      await fetchPortfolioData();
    } else {
      showLogin();
    }
  } catch (err) {
    showLogin();
  }

  // Handle login submit
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.style.display = 'none';
    const password = document.getElementById('adminPass').value;

    loginBtn.disabled = true;
    loginBtn.textContent = 'Memeriksa...';

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showDashboard();
        await fetchPortfolioData();
      } else {
        loginError.textContent = data.error || 'Password salah!';
        loginError.style.display = 'block';
      }
    } catch (err) {
      loginError.textContent = 'Gagal menghubungi server.';
      loginError.style.display = 'block';
    } finally {
      loginBtn.disabled = false;
      loginBtn.textContent = 'Masuk ke Dashboard';
    }
  });

  // Handle logout
  logoutBtn.addEventListener('click', async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (e) {}
    showLogin();
    showToast('Berhasil logout.');
  });
}

function showLogin() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('dashboardScreen').style.display = 'none';
  document.getElementById('adminPass').value = '';
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboardScreen').style.display = 'flex';
}

// ─── Tabs Navigation ───
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// ─── Data Fetch & Population ───
async function fetchPortfolioData() {
  try {
    const res = await fetch('/api/data');
    if (!res.ok) throw new Error('Failed to load portfolio data');
    adminData = await res.json();
    populateAllForms();
  } catch (err) {
    showToast('Gagal memuat data dari server.');
  }
}

function populateAllForms() {
  // Settings
  const s = adminData.settings || {};
  document.getElementById('settingName').value = s.name || '';
  document.getElementById('settingEmail').value = s.email || '';
  document.getElementById('settingWhatsapp').value = s.whatsapp || '';
  document.getElementById('settingGithub').value = s.github || '';
  document.getElementById('settingLinkedin').value = s.linkedin || '';
  document.getElementById('settingInstagram').value = s.instagram || '';
  document.getElementById('settingTagline').value = s.tagline || '';

  // Hero
  const h = adminData.hero || {};
  document.getElementById('heroHeadline').value = h.headline || '';
  document.getElementById('heroHeadlineAccent').value = h.headlineAccent || '';
  document.getElementById('heroHeadlineSuffix').value = h.headlineSuffix || '';
  document.getElementById('heroSubheadline').value = h.subheadline || '';
  document.getElementById('heroCtaText').value = h.ctaText || '';
  document.getElementById('badgeLeftLabel').value = (h.badgeLeft && h.badgeLeft.label) || '';
  document.getElementById('badgeLeftValue').value = (h.badgeLeft && h.badgeLeft.value) || '';
  document.getElementById('badgeRightLabel').value = (h.badgeRight && h.badgeRight.label) || '';
  document.getElementById('badgeRightValue').value = (h.badgeRight && h.badgeRight.value) || '';

  // About Paragraphs & Stats
  renderAboutParagraphs();
  renderStatsList();

  // Skills
  renderSkillsAdminList();

  // Projects
  renderProjectsAdminList();

  // Experience
  renderExperienceAdminList();
}

// ─── About Section Form Helpers ───
function renderAboutParagraphs() {
  const container = document.getElementById('aboutParagraphsList');
  const paragraphs = (adminData.about && adminData.about.paragraphs) || [];

  container.innerHTML = paragraphs.map((p, idx) => `
    <div class="dynamic-row">
      <textarea rows="2" data-idx="${idx}" class="about-para-input">${escapeAttr(p)}</textarea>
      <button type="button" class="btn-icon-del" onclick="deleteAboutParagraph(${idx})" title="Hapus">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');
}

function deleteAboutParagraph(idx) {
  adminData.about.paragraphs.splice(idx, 1);
  renderAboutParagraphs();
}

function renderStatsList() {
  const container = document.getElementById('statsList');
  const stats = (adminData.about && adminData.about.stats) || [];

  container.innerHTML = stats.map((s, idx) => `
    <div class="dynamic-row">
      <input type="number" placeholder="Angka" value="${s.value}" style="max-width: 90px;" class="stat-val" data-idx="${idx}">
      <input type="text" placeholder="Suffix (+, %)" value="${escapeAttr(s.suffix || '')}" style="max-width: 90px;" class="stat-suffix" data-idx="${idx}">
      <input type="text" placeholder="Label" value="${escapeAttr(s.label || '')}" class="stat-lbl" data-idx="${idx}">
      <button type="button" class="btn-icon-del" onclick="deleteStat(${idx})" title="Hapus">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');
}

function deleteStat(idx) {
  adminData.about.stats.splice(idx, 1);
  renderStatsList();
}

// ─── Skills Section Helpers ───
function renderSkillsAdminList() {
  const container = document.getElementById('skillsAdminList');
  const skills = adminData.skills || [];

  container.innerHTML = skills.map((s, idx) => `
    <div class="admin-item-card">
      <div class="admin-item-main">
        <div class="admin-item-title">${escapeHtml(s.name)}</div>
        <div class="admin-item-sub">${escapeHtml(s.detail)}</div>
      </div>
      <div class="admin-item-actions">
        <button type="button" class="btn btn-outline btn-sm" onclick="editSkillPrompt(${idx})">Edit</button>
        <button type="button" class="btn-icon-del" onclick="deleteSkill(${idx})" title="Hapus">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function editSkillPrompt(idx) {
  const s = adminData.skills[idx];
  const name = prompt('Nama Kategori Skill:', s.name);
  if (name === null) return;
  const detail = prompt('Daftar Teknologi (pisahkan koma):', s.detail);
  if (detail === null) return;
  const icon = prompt('Icon (code, server, database, layers, settings, pen):', s.icon || 'code');
  if (icon === null) return;

  adminData.skills[idx] = { name, detail, icon };
  renderSkillsAdminList();
}

function deleteSkill(idx) {
  if (confirm(`Hapus skill "${adminData.skills[idx].name}"?`)) {
    adminData.skills.splice(idx, 1);
    renderSkillsAdminList();
  }
}

// ─── Projects Section Helpers ───
function renderProjectsAdminList() {
  const container = document.getElementById('projectsAdminList');
  const projects = adminData.projects || [];

  container.innerHTML = projects.map((p, idx) => `
    <div class="admin-item-card">
      <div class="admin-item-main">
        <div class="admin-item-title">
          ${escapeHtml(p.title)}
          ${p.featured ? '<span class="featured-pill">Featured</span>' : ''}
        </div>
        <div class="admin-item-sub">
          <strong>${p.year || '-'}</strong> &bull; ${(p.tags || []).join(', ')} &bull; ${escapeHtml(p.shortDesc || '')}
        </div>
      </div>
      <div class="admin-item-actions">
        <button type="button" class="btn btn-outline btn-sm" onclick="openProjectEditModal(${idx})">Edit</button>
        <button type="button" class="btn-icon-del" onclick="deleteProject(${idx})" title="Hapus">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function deleteProject(idx) {
  if (confirm(`Hapus proyek "${adminData.projects[idx].title}"?`)) {
    adminData.projects.splice(idx, 1);
    renderProjectsAdminList();
  }
}

// ─── Experience Section Helpers ───
function renderExperienceAdminList() {
  const container = document.getElementById('experienceAdminList');
  const exp = adminData.experience || [];

  container.innerHTML = exp.map((e, idx) => `
    <div class="admin-item-card">
      <div class="admin-item-main">
        <div class="admin-item-title">${escapeHtml(e.title)} <span style="font-size:0.8125rem; font-weight:normal; color:var(--gold);">&bull; ${escapeHtml(e.date)}</span></div>
        <div class="admin-item-sub">${escapeHtml(e.desc)}</div>
      </div>
      <div class="admin-item-actions">
        <button type="button" class="btn btn-outline btn-sm" onclick="editExperiencePrompt(${idx})">Edit</button>
        <button type="button" class="btn-icon-del" onclick="deleteExperience(${idx})" title="Hapus">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

function editExperiencePrompt(idx) {
  const e = adminData.experience[idx];
  const date = prompt('Rentang Waktu (cth: 2024 — Sekarang):', e.date);
  if (date === null) return;
  const title = prompt('Jabatan / Posisi:', e.title);
  if (title === null) return;
  const desc = prompt('Deskripsi:', e.desc);
  if (desc === null) return;

  adminData.experience[idx] = { date, title, desc };
  renderExperienceAdminList();
}

function deleteExperience(idx) {
  if (confirm(`Hapus pengalaman "${adminData.experience[idx].title}"?`)) {
    adminData.experience.splice(idx, 1);
    renderExperienceAdminList();
  }
}

// ─── Project Edit Modal ───
function initProjectModal() {
  const modal = document.getElementById('projectEditModal');
  const closeBtn = document.getElementById('projectModalClose');
  const cancelBtn = document.getElementById('cancelProjModalBtn');
  const form = document.getElementById('projectEditForm');
  const addBtn = document.getElementById('addProjectBtn');

  addBtn.addEventListener('click', () => openProjectEditModal(-1));
  closeBtn.addEventListener('click', closeProjModal);
  cancelBtn.addEventListener('click', closeProjModal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const idx = parseInt(document.getElementById('projIndex').value, 10);
    const tagsArr = document.getElementById('projTags').value
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const isFeatured = document.getElementById('projFeatured').checked;

    // If setting as featured, remove featured from others
    if (isFeatured) {
      adminData.projects.forEach(p => p.featured = false);
    }

    const projObj = {
      title: document.getElementById('projTitle').value.trim(),
      shortDesc: document.getElementById('projShortDesc').value.trim(),
      fullDesc: document.getElementById('projFullDesc').value.trim(),
      tags: tagsArr,
      year: document.getElementById('projYear').value.trim(),
      role: document.getElementById('projRole').value.trim(),
      duration: document.getElementById('projDuration').value.trim(),
      status: document.getElementById('projStatus').value.trim(),
      live: document.getElementById('projLive').value.trim() || '#',
      repo: document.getElementById('projRepo').value.trim() || '#',
      featured: isFeatured
    };

    if (idx === -1) {
      adminData.projects.push(projObj);
    } else {
      adminData.projects[idx] = projObj;
    }

    renderProjectsAdminList();
    closeProjModal();
    showToast('Proyek berhasil diperbarui dalam draft.');
  });
}

function openProjectEditModal(idx) {
  const modal = document.getElementById('projectEditModal');
  const heading = document.getElementById('projectModalHeading');
  document.getElementById('projIndex').value = idx;

  if (idx === -1) {
    heading.textContent = 'Tambah Proyek Baru';
    document.getElementById('projTitle').value = '';
    document.getElementById('projShortDesc').value = '';
    document.getElementById('projFullDesc').value = '';
    document.getElementById('projTags').value = '';
    document.getElementById('projYear').value = new Date().getFullYear();
    document.getElementById('projRole').value = 'Developer';
    document.getElementById('projDuration').value = '';
    document.getElementById('projStatus').value = 'Completed';
    document.getElementById('projLive').value = '#';
    document.getElementById('projRepo').value = 'https://github.com/';
    document.getElementById('projFeatured').checked = false;
  } else {
    const p = adminData.projects[idx];
    heading.textContent = 'Edit Proyek: ' + p.title;
    document.getElementById('projTitle').value = p.title || '';
    document.getElementById('projShortDesc').value = p.shortDesc || '';
    document.getElementById('projFullDesc').value = p.fullDesc || '';
    document.getElementById('projTags').value = (p.tags || []).join(', ');
    document.getElementById('projYear').value = p.year || '';
    document.getElementById('projRole').value = p.role || '';
    document.getElementById('projDuration').value = p.duration || '';
    document.getElementById('projStatus').value = p.status || '';
    document.getElementById('projLive').value = p.live || '#';
    document.getElementById('projRepo').value = p.repo || '#';
    document.getElementById('projFeatured').checked = !!p.featured;
  }

  modal.classList.add('active');
}

function closeProjModal() {
  document.getElementById('projectEditModal').classList.remove('active');
}

// ─── Forms Event Listeners ───
function initForms() {
  // Add about paragraph
  document.getElementById('addAboutParagraphBtn').addEventListener('click', () => {
    adminData.about.paragraphs.push('Paragraf baru...');
    renderAboutParagraphs();
  });

  // Add stat
  document.getElementById('addStatBtn').addEventListener('click', () => {
    adminData.about.stats.push({ value: 10, suffix: '+', label: 'Statistik Baru' });
    renderStatsList();
  });

  // Add Skill
  document.getElementById('addSkillBtn').addEventListener('click', () => {
    const name = prompt('Nama Kategori Skill (mis. Mobile Dev):');
    if (!name) return;
    const detail = prompt('Daftar Teknologi (mis. Flutter, React Native):');
    if (!detail) return;
    adminData.skills.push({ name, detail, icon: 'code' });
    renderSkillsAdminList();
  });

  // Add Experience
  document.getElementById('addExperienceBtn').addEventListener('click', () => {
    const date = prompt('Rentang Waktu (cth: 2024 — Sekarang):', '2024 — Sekarang');
    if (!date) return;
    const title = prompt('Jabatan / Posisi:', 'Software Engineer');
    if (!title) return;
    const desc = prompt('Deskripsi singkat tugas:', 'Mengembangkan aplikasi...');
    if (!desc) return;
    adminData.experience.unshift({ date, title, desc });
    renderExperienceAdminList();
  });

  // Save All Button
  document.getElementById('saveAllBtn').addEventListener('click', saveAllChanges);
}

// ─── Save All Changes (PUT /api/data) ───
async function saveAllChanges() {
  const saveBtn = document.getElementById('saveAllBtn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Menyimpan...';

  // Read current input values
  adminData.settings = {
    name: document.getElementById('settingName').value.trim(),
    email: document.getElementById('settingEmail').value.trim(),
    whatsapp: document.getElementById('settingWhatsapp').value.trim(),
    github: document.getElementById('settingGithub').value.trim(),
    linkedin: document.getElementById('settingLinkedin').value.trim(),
    instagram: document.getElementById('settingInstagram').value.trim(),
    tagline: document.getElementById('settingTagline').value.trim()
  };

  adminData.hero = {
    headline: document.getElementById('heroHeadline').value.trim(),
    headlineAccent: document.getElementById('heroHeadlineAccent').value.trim(),
    headlineSuffix: document.getElementById('heroHeadlineSuffix').value.trim(),
    subheadline: document.getElementById('heroSubheadline').value.trim(),
    ctaText: document.getElementById('heroCtaText').value.trim(),
    ctaLink: '#projects',
    badgeLeft: {
      label: document.getElementById('badgeLeftLabel').value.trim(),
      value: document.getElementById('badgeLeftValue').value.trim()
    },
    badgeRight: {
      label: document.getElementById('badgeRightLabel').value.trim(),
      value: document.getElementById('badgeRightValue').value.trim()
    }
  };

  // Collect updated about paragraphs from textareas
  const paraInputs = document.querySelectorAll('.about-para-input');
  adminData.about.paragraphs = Array.from(paraInputs).map(t => t.value.trim());

  // Collect updated stats
  const statRows = document.querySelectorAll('#statsList .dynamic-row');
  adminData.about.stats = Array.from(statRows).map(row => ({
    value: parseInt(row.querySelector('.stat-val').value, 10) || 0,
    suffix: row.querySelector('.stat-suffix').value.trim(),
    label: row.querySelector('.stat-lbl').value.trim()
  }));

  try {
    const res = await fetch('/api/data', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData)
    });
    const result = await res.json();

    if (res.ok && result.success) {
      showToast('✨ Semua perubahan berhasil disimpan!');
    } else {
      showToast('❌ Gagal menyimpan: ' + (result.error || 'Terjadi kesalahan'));
    }
  } catch (err) {
    showToast('❌ Gagal menghubungi server backend.');
  } finally {
    saveBtn.disabled = false;
    saveBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
      Simpan Perubahan
    `;
  }
}

// ─── Toast Notification Helper ───
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ─── Utilities ───
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/"/g, '&quot;');
}
