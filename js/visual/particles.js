/**
 * ═══════════════════════════════════════════════════════════════
 * PARTICLE SYSTEM - Explosions & Effects
 * ═══════════════════════════════════════════════════════════════
 */

const ParticleSystem = {
  particles: [],
  explosions: [],
  
  /**
   * Trigger multiple explosions
   */
  triggerExplosions(count = 3) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const dims = CanvasManager.getDimensions();
        const cx = dims.width * 0.35 + Math.random() * dims.width * 0.3;
        const cy = dims.height * 0.3 + Math.random() * dims.height * 0.35;
        
        // Spawn particles
        for (let p = 0; p < CONFIG.PARTICLES_PER_EXPLOSION; p++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 1.5 + Math.random() * 4;
          
          this.particles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 2,
            life: 1,
            decay: CONFIG.PARTICLE_DECAY_MIN + Math.random() * (CONFIG.PARTICLE_DECAY_MAX - CONFIG.PARTICLE_DECAY_MIN),
            r: 2 + Math.random() * 5,
            color: `hsl(${25 + Math.random() * 30}, 90%, ${50 + Math.random() * 30}%)`
          });
        }
        
        // Flash ring
        this.explosions.push({
          x: cx,
          y: cy,
          r: 0,
          maxR: 60 + Math.random() * 40,
          life: 1,
          decay: CONFIG.EXPLOSION_RING_DECAY
        });
      }, i * 180);
    }
  },
  
  /**
   * Update and draw particles
   */
  draw() {
    const dims = CanvasManager.getDimensions();
    const ctx = CanvasManager.fxCtx;
    
    ctx.save();
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.clearRect(0, 0, dims.width, dims.height);
    
    // Draw explosion rings
    this.explosions = this.explosions.filter(e => e.life > 0);
    this.explosions.forEach(e => {
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 180, 50, ${e.life * 0.8})`;
      ctx.lineWidth = 4 * e.life;
      ctx.stroke();
      
      e.r += e.maxR * e.decay * 2;
      e.life -= e.decay;
    });
    
    // Draw particles
    this.particles = this.particles.filter(p => p.life > 0);
    this.particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace(')', `, ${p.life})`).replace('hsl', 'hsla');
      ctx.fill();
      
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // Gravity
      p.life -= p.decay;
    });
    
    ctx.restore();
  }
};
