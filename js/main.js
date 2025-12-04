/**
 * Jordan Hafernik - COMM 205 Portfolio
 * Minimal JavaScript - Clean Interactions
 */

// ============================================
// Subtle Particle System
// ============================================

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 30;
    
    this.init();
    this.animate();
  }
  
  init() {
    this.resize();
    this.createParticles();
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.2 + 0.1,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.y -= particle.speedY;
      
      if (particle.y < 0) {
        particle.y = this.canvas.height;
        particle.x = Math.random() * this.canvas.width;
      }
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(80, 0, 0, ${particle.opacity})`;
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// Navigation
// ============================================

class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navLinks = document.querySelector('.nav-links');
    
    this.init();
  }
  
  init() {
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => {
        this.navToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
      });
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        this.navToggle?.classList.remove('active');
        this.navLinks?.classList.remove('active');
      });
    });
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    });
  }
}

// ============================================
// Scroll Animations
// ============================================

class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.fade-in');
    this.init();
  }
  
  init() {
    this.checkElements();
    
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.checkElements();
          ticking = false;
        });
        ticking = true;
      }
    });
  }
  
  checkElements() {
    const triggerBottom = window.innerHeight * 0.9;
    
    this.elements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < triggerBottom) {
        setTimeout(() => {
          element.classList.add('visible');
        }, index * 100);
      }
    });
  }
}

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    new ParticleSystem(canvas);
  }
  
  new Navigation();
  new ScrollAnimations();
  
  document.body.classList.add('loaded');
});
