/**
 * Atharv Is Cool - Master App Controller & Neal.fun Interactivity
 */

const ATHARV_PROJECTS = [
  {
    id: 'chatbot',
    title: 'ChatBot',
    icon: '🤖',
    url: 'https://athuu301.github.io/ChatBot/',
    category: 'AI',
    tag: 'AI COMPANION',
    stars: '4.9',
    badgeBg: '#c38fff',
    badgeColor: '#0f172a',
    desc: 'A conversational AI chatbot with a sleek modern interface, instant message processing, and smart prompt handling.'
  },
  {
    id: 'pineapple',
    title: 'Pineapple',
    icon: '🍍',
    url: 'https://athuu301.github.io/Pineapple/',
    category: 'Fun',
    tag: 'TROPICAL FUN',
    stars: '4.95',
    badgeBg: '#ffde59',
    badgeColor: '#0f172a',
    desc: 'A fun interactive web experiment featuring tropical aesthetics, playful animations, and retro mini-games.'
  },
  {
    id: 'infinite_roads',
    title: 'Infinite Roads 3D',
    icon: '🏎️',
    url: 'https://athuu301.github.io/Infinite_roads/',
    category: 'Games',
    tag: '3D ARCADE GAME',
    stars: '5.0',
    badgeBg: '#ff66c4',
    badgeColor: '#0f172a',
    desc: 'Endless 3D road driver visualizer inspired by retro arcade aesthetics, smooth vehicle steering, and highway obstacles.'
  },
  {
    id: 'food_app',
    title: 'Food Ordering App',
    icon: '🍕',
    url: 'https://athuu301.github.io/food-ordering-aap/',
    category: 'App',
    tag: 'FOOD & DELIVERY',
    stars: '4.88',
    badgeBg: '#ff914d',
    badgeColor: '#0f172a',
    desc: 'Responsive food delivery platform with dish search, category filters, interactive cart management, and seamless checkout.'
  },
  {
    id: 'stealth_game',
    title: 'Campus Stealth Heist',
    icon: '🎒',
    url: 'https://athuu301.github.io/Campus-maze-heist/',
    category: 'Games',
    tag: '2D STEALTH GAME',
    stars: '5.0',
    badgeBg: '#5ce1e6',
    badgeColor: '#0f172a',
    desc: '2D Undertale-inspired campus stealth game where you infiltrate Metro University, avoid guards, disable lasers, and alter attendance.'
  }
];

class AtharvFunApp {
  constructor() {
    this.coolnessScore = 9999999;
    this.activeCategory = 'All';
    this.searchQuery = '';
    this.currentTheme = 'light';
    
    this.init();
  }

  init() {
    if (window.particleEngine) {
      window.particleEngine.init('sparkleCanvas');
    }

    this.bindEvents();
    this.renderProjectsGrid();
  }

  bindEvents() {
    // Theme Toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    themeBtn?.addEventListener('click', () => {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      themeBtn.textContent = this.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
      if (window.nealAudio) window.nealAudio.playClick();
    });

    // Header Title Click -> Sparkle Explosion
    const heroTitle = document.getElementById('heroTitle');
    heroTitle?.addEventListener('click', (e) => {
      this.coolnessScore += 1000;
      this.updateCoolnessDisplay();
      if (window.nealAudio) window.nealAudio.playFlex();
      if (window.particleEngine) window.particleEngine.spawnBurst(e.clientX, e.clientY, 50);
    });

    // Flex Coolness Button
    const flexBtn = document.getElementById('flexCoolnessBtn');
    flexBtn?.addEventListener('click', (e) => {
      this.coolnessScore += 2500;
      this.updateCoolnessDisplay();
      if (window.nealAudio) window.nealAudio.playFlex();
      if (window.particleEngine) window.particleEngine.spawnBurst(e.clientX, e.clientY, 40);
    });

    // Audio Toggle
    const audioBtn = document.getElementById('audioToggleBtn');
    audioBtn?.addEventListener('click', () => {
      if (window.nealAudio) {
        const isMuted = window.nealAudio.toggleMute();
        audioBtn.textContent = isMuted ? '🔇 Muted' : '🔊 Sound On';
      }
    });

    // Filter Tag Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-category') || 'All';
        if (window.nealAudio) window.nealAudio.playClick();
        this.renderProjectsGrid();
      });
    });

    // Search Input
    const searchInput = document.getElementById('searchInput');
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderProjectsGrid();
    });

    // Preview Modal Close Events
    document.getElementById('closeModalBtn')?.addEventListener('click', () => this.closePreviewModal());
    document.getElementById('previewModalOverlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'previewModalOverlay') this.closePreviewModal();
    });
  }

  updateCoolnessDisplay() {
    const valElem = document.getElementById('coolnessVal');
    if (valElem) {
      valElem.textContent = this.coolnessScore.toLocaleString();
    }
  }

  renderProjectsGrid() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;

    const filtered = ATHARV_PROJECTS.filter(p => {
      const matchesCat = this.activeCategory === 'All' || p.category === this.activeCategory;
      const matchesQuery = !this.searchQuery || 
        p.title.toLowerCase().includes(this.searchQuery) ||
        p.desc.toLowerCase().includes(this.searchQuery) ||
        p.tag.toLowerCase().includes(this.searchQuery);
      return matchesCat && matchesQuery;
    });

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="no-results-box" style="background: var(--card-bg); border: 3px solid var(--border-color); border-radius: 24px; padding: 48px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
          <h3 style="font-family: var(--font-heading); font-size: 22px;">No projects found matching "${this.searchQuery}"</h3>
          <p style="color: var(--text-sub); margin-top: 8px;">Try searching for "game", "AI", "food", or clear filters.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';

      card.innerHTML = `
        <div class="card-top-bar">
          <span class="card-badge" style="background: ${p.badgeBg}; color: ${p.badgeColor};">
            ${p.tag}
          </span>
          <span class="card-rating">⭐ ${p.stars}</span>
        </div>

        <div class="card-hero-icon">${p.icon}</div>

        <h3 class="card-title">${p.title}</h3>
        <p class="card-desc">${p.desc}</p>

        <div class="card-action-row">
          <a href="${p.url}" target="_blank" class="card-btn btn-launch">
            LAUNCH 🚀
          </a>
          <button class="card-btn btn-preview" data-url="${p.url}" data-title="${p.title}">
            PREVIEW 👁️
          </button>
        </div>
      `;

      card.addEventListener('mouseenter', () => {
        if (window.nealAudio) window.nealAudio.playHover();
      });

      // Clicking whole card opens project link directly
      card.addEventListener('click', (e) => {
        // If preview button clicked, don't double open
        if (e.target.closest('.btn-preview')) return;
        if (window.nealAudio) window.nealAudio.playClick();
        window.open(p.url, '_blank');
      });

      const previewBtn = card.querySelector('.btn-preview');
      previewBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.nealAudio) window.nealAudio.playClick();
        this.openPreviewModal(p);
      });

      container.appendChild(card);
    });
  }

  openPreviewModal(project) {
    const modal = document.getElementById('previewModalOverlay');
    const iframe = document.getElementById('previewIframe');
    const modalTitle = document.getElementById('modalTitleText');
    const modalIcon = document.getElementById('modalIcon');
    const modalTag = document.getElementById('modalTagText');
    const modalDesc = document.getElementById('modalDescText');
    const openExternalBtn = document.getElementById('modalExternalBtn');
    const fallbackLaunchBtn = document.getElementById('modalFallbackLaunchBtn');

    if (modal && iframe) {
      if (modalTitle) modalTitle.textContent = project.title;
      if (modalIcon) modalIcon.textContent = project.icon;
      if (modalTag) modalTag.textContent = project.tag;
      if (modalDesc) modalDesc.textContent = project.desc;
      if (openExternalBtn) openExternalBtn.href = project.url;
      if (fallbackLaunchBtn) fallbackLaunchBtn.href = project.url;

      iframe.src = project.url;

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  closePreviewModal() {
    const modal = document.getElementById('previewModalOverlay');
    const iframe = document.getElementById('previewIframe');

    if (modal) {
      modal.classList.add('hidden');
      if (iframe) iframe.src = 'about:blank';
      document.body.style.overflow = 'auto';
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.atharvApp = new AtharvFunApp();
});
