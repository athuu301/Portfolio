/**
 * Atharv Is Cool - Master App Controller & 3D Tilt Physics
 */

const ATHARV_PROJECTS = [
  {
    id: 'chatbot',
    title: 'AI ChatBot',
    icon: '🤖',
    url: 'https://athuu301.github.io/ChatBot/',
    category: 'AI',
    tag: 'AI COMPANION',
    stars: '4.9',
    badgeColor: '#8b5cf6',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(6, 182, 212, 0.15))',
    borderColor: '#8b5cf6',
    desc: 'An intelligent conversational AI assistant built with sleek chat UI, instant message processing, and smart prompt handling.'
  },
  {
    id: 'pineapple',
    title: 'Pineapple',
    icon: '🍍',
    url: 'https://athuu301.github.io/Pineapple/',
    category: 'Fun',
    tag: 'TROPICAL FUN',
    stars: '4.95',
    badgeColor: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(16, 185, 129, 0.15))',
    borderColor: '#f59e0b',
    desc: 'A vibrant tropical interactive web application featuring playful animations, retro aesthetics, and fun mini-games.'
  },
  {
    id: 'infinite_roads',
    title: 'Infinite Roads 3D',
    icon: '🏎️',
    url: 'https://athuu301.github.io/Infinite_roads/',
    category: 'Games',
    tag: '3D ARCADE GAME',
    stars: '5.0',
    badgeColor: '#f43f5e',
    gradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.25), rgba(168, 85, 247, 0.15))',
    borderColor: '#f43f5e',
    desc: 'An immersive 3D highway driving arcade game built with Three.js canvas, smooth vehicle steering, score tracking, and endless road obstacles.'
  },
  {
    id: 'food_app',
    title: 'Food Ordering App',
    icon: '🍕',
    url: 'https://athuu301.github.io/food-ordering-aap/',
    category: 'App',
    tag: 'FOOD & DELIVERY',
    stars: '4.88',
    badgeColor: '#fb923c',
    gradient: 'linear-gradient(135deg, rgba(251, 146, 60, 0.25), rgba(236, 72, 153, 0.15))',
    borderColor: '#fb923c',
    desc: 'A full-featured food ordering platform with dish search, category filters, interactive cart management, and seamless order checkout.'
  },
  {
    id: 'stealth_game',
    title: 'Campus Stealth Heist',
    icon: '🎒',
    url: 'https://athuu301.github.io/Campus-maze-heist/',
    category: 'Games',
    tag: '2D STEALTH GAME',
    stars: '5.0',
    badgeColor: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(99, 102, 241, 0.15))',
    borderColor: '#06b6d4',
    desc: 'An action-packed 2D Undertale-style pixel art stealth game where you infiltrate Metro University, avoid security guards, disable lasers, and hack the attendance terminal.'
  }
];

class AtharvFunApp {
  constructor() {
    this.coolnessScore = 999999;
    this.activeCategory = 'All';
    this.searchQuery = '';
    
    this.init();
  }

  init() {
    window.particleEngine.init('sparkleCanvas');

    this.bindEvents();
    this.renderProjectsGrid();
  }

  bindEvents() {
    // Header Title Click -> Sparkle Explosion
    const heroTitle = document.getElementById('heroTitle');
    heroTitle?.addEventListener('click', (e) => {
      this.coolnessScore += 1000;
      this.updateCoolnessDisplay();
      window.nealAudio.playFlex();
      window.particleEngine.spawnBurst(e.clientX, e.clientY, 50);
    });

    // Flex Coolness Button
    const flexBtn = document.getElementById('flexCoolnessBtn');
    flexBtn?.addEventListener('click', (e) => {
      this.coolnessScore += 2500;
      this.updateCoolnessDisplay();
      window.nealAudio.playFlex();
      window.particleEngine.spawnBurst(e.clientX, e.clientY, 40);
    });

    // Audio Toggle
    const audioBtn = document.getElementById('audioToggleBtn');
    audioBtn?.addEventListener('click', () => {
      const isMuted = window.nealAudio.toggleMute();
      audioBtn.textContent = isMuted ? '🔇 Muted' : '🔊 Sound On';
    });

    // Filter Tag Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-category') || 'All';
        window.nealAudio.playClick();
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
        <div class="no-results-box">
          <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
          <h3>No projects found matching "${this.searchQuery}"</h3>
          <p>Try searching for "game", "AI", "food", or clear the filter.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.style.background = p.gradient;
      card.style.borderColor = p.borderColor;

      card.innerHTML = `
        <div class="card-header-badge-row">
          <span class="card-tag" style="background: ${p.badgeColor}33; color: ${p.badgeColor}; border: 1px solid ${p.badgeColor}66;">
            ${p.tag}
          </span>
          <span class="card-stars">⭐ ${p.stars}</span>
        </div>

        <div class="card-hero-icon">${p.icon}</div>

        <h3 class="card-title">${p.title}</h3>
        <p class="card-desc">${p.desc}</p>

        <div class="card-action-row">
          <a href="${p.url}" target="_blank" class="retro-card-btn btn-launch">
            LAUNCH APP 🚀
          </a>
          <button class="retro-card-btn btn-preview" data-url="${p.url}" data-title="${p.title}">
            PREVIEW 👁️
          </button>
        </div>
      `;

      // 3D Tilt Effect on MouseMove
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rx = (-y / rect.height) * 16;
        const ry = (x / rect.width) * 16;

        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
      });

      card.addEventListener('mouseenter', () => {
        window.nealAudio.playHover();
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      });

      // Handle Launch Sound & Preview Click
      const launchBtn = card.querySelector('.btn-launch');
      launchBtn?.addEventListener('click', () => {
        window.nealAudio.playClick();
      });

      const previewBtn = card.querySelector('.btn-preview');
      previewBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        window.nealAudio.playClick();
        this.openPreviewModal(p.url, p.title);
      });

      container.appendChild(card);
    });
  }

  openPreviewModal(url, title) {
    const modal = document.getElementById('previewModalOverlay');
    const iframe = document.getElementById('previewIframe');
    const modalTitle = document.getElementById('modalTitleText');
    const openExternalBtn = document.getElementById('modalExternalBtn');

    if (modal && iframe) {
      if (modalTitle) modalTitle.textContent = title;
      if (openExternalBtn) openExternalBtn.href = url;
      iframe.src = url;

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
