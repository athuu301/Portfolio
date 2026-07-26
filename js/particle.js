/**
 * Atharv Is Cool - Interactive Particle & Sparkle Canvas Engine
 */

class ParticleEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.isRunning = false;
  }

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  spawnBurst(x, y, count = 35) {
    if (!this.canvas) return;
    const colors = ['#f43f5e', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#38bdf8'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x || this.canvas.width / 2,
        y: y || this.canvas.height / 3,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.7) * 12,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
        gravity: 0.2,
        shape: Math.random() > 0.4 ? 'circle' : 'star'
      });
    }

    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(() => this.animate());
    }
  }

  animate() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let activeCount = 0;
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.opacity <= 0.01) continue;

      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.opacity -= 0.015;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'star') {
        this.ctx.font = `${p.size * 2}px sans-serif`;
        this.ctx.fillText('✨', -p.size, p.size);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
      activeCount++;
    }

    if (activeCount > 0) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.isRunning = false;
    }
  }
}

window.particleEngine = new ParticleEngine();
