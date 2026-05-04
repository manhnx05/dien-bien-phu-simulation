/**
 * ═══════════════════════════════════════════════════════════════
 * INPUT CONTROLS - Mouse, Touch, Keyboard
 * ═══════════════════════════════════════════════════════════════
 */

const InputController = {
  isDragging: false,
  lastX: 0,
  lastY: 0,
  
  /**
   * Initialize input handlers
   */
  init() {
    this.setupMouseControls();
    this.setupTouchControls();
    this.setupWheelControls();
    this.setupButtonControls();
    this.setupHoverDetection();
  },
  
  /**
   * Setup mouse controls
   */
  setupMouseControls() {
    document.body.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      AudioEngine.init();
    });
    
    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
    
    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = (e.clientX - this.lastX) * 0.008;
        const deltaY = (e.clientY - this.lastY) * 0.006;
        ProjectionEngine.rotate(deltaX, deltaY);
        this.lastX = e.clientX;
        this.lastY = e.clientY;
      }
    });
  },
  
  /**
   * Setup touch controls
   */
  setupTouchControls() {
    document.body.addEventListener('touchstart', (e) => {
      this.isDragging = true;
      this.lastX = e.touches[0].clientX;
      this.lastY = e.touches[0].clientY;
      AudioEngine.init();
    }, { passive: true });
    
    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });
    
    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;
      
      const deltaX = (e.touches[0].clientX - this.lastX) * 0.008;
      const deltaY = (e.touches[0].clientY - this.lastY) * 0.006;
      ProjectionEngine.rotate(deltaX, deltaY);
      this.lastX = e.touches[0].clientX;
      this.lastY = e.touches[0].clientY;
    }, { passive: true });
  },
  
  /**
   * Setup wheel/scroll controls
   */
  setupWheelControls() {
    document.body.addEventListener('wheel', (e) => {
      e.preventDefault();
      ProjectionEngine.zoom(e.deltaY);
    }, { passive: false });
  },
  
  /**
   * Setup rotation button controls
   */
  setupButtonControls() {
    document.getElementById('btn-left').onclick = () => {
      ProjectionEngine.rotate(-0.18, 0);
    };
    
    document.getElementById('btn-right').onclick = () => {
      ProjectionEngine.rotate(0.18, 0);
    };
    
    document.getElementById('btn-up').onclick = () => {
      ProjectionEngine.rotate(0, -0.1);
    };
    
    document.getElementById('btn-down').onclick = () => {
      ProjectionEngine.rotate(0, 0.1);
    };
    
    document.getElementById('btn-reset').onclick = () => {
      ProjectionEngine.reset();
    };
  },
  
  /**
   * Setup hover detection for locations
   */
  setupHoverDetection() {
    window.addEventListener('mousemove', (e) => {
      const rect = CanvasManager.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      
      let hit = null;
      for (const p of Renderer.projectedPositions) {
        const dx = p.sx - mx;
        const dy = p.sy - my;
        if (Math.sqrt(dx * dx + dy * dy) < p.r + 4) {
          hit = p;
          break;
        }
      }
      
      Renderer.hoveredId = hit ? hit.id : null;
      
      document.getElementById('info-title').textContent = hit ? hit.name : 'Di chuột để xem thông tin';
      document.getElementById('info-desc').textContent = hit ? hit.desc : 'Hover vào các điểm để xem chi tiết lịch sử.';
      
      document.body.style.cursor = hit ? 'pointer' : (this.isDragging ? 'grabbing' : 'grab');
    });
  },
  
  /**
   * Start auto-rotation demo
   */
  startAutoRotation() {
    let count = 0;
    const interval = setInterval(() => {
      ProjectionEngine.rotate(0.012, 0);
      if (++count > CONFIG.AUTO_ROTATE_DURATION) {
        clearInterval(interval);
      }
    }, 40);
  }
};

// Export global functions for inline handlers
function toggleAmbient() {
  const isOn = AudioEngine.toggleAmbient();
  const btn = document.getElementById('btn-ambient');
  btn.textContent = isOn ? '🔊 Âm thanh nền' : '🔇 Âm thanh nền';
  btn.classList.toggle('active', isOn);
}

function toggleNarrate() {
  const isOn = Narrator.toggle();
  const btn = document.getElementById('btn-narrate');
  
  if (isOn) {
    btn.textContent = '⏹ Dừng kể';
    btn.classList.add('narr-active');
    Narrator.start(Renderer.currentPhase);
  } else {
    Narrator.stop();
    btn.textContent = '🎙 Giọng kể chuyện';
    btn.classList.remove('narr-active');
  }
}

function fireCannon() {
  AudioEngine.init();
  AudioEngine.playExplosion(0.9);
  AudioEngine.playCannon(1.0);
  setTimeout(() => AudioEngine.playGunfire(12, 70), 400);
  ParticleSystem.triggerExplosions(3 + Math.floor(Math.random() * 3));
}

function setVol(value) {
  AudioEngine.setVolume(value);
}

window.toggleAmbient = toggleAmbient;
window.toggleNarrate = toggleNarrate;
window.fireCannon = fireCannon;
window.setVol = setVol;
