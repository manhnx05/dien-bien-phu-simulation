/**
 * ═══════════════════════════════════════════════════════════════
 * CONSTANTS & CONFIGURATION
 * ═══════════════════════════════════════════════════════════════
 */

const CONFIG = {
  // Terrain settings
  TERRAIN_GRID_SIZE: 28,
  VALLEY_WIDTH: 3.5,
  VALLEY_LENGTH: 11,
  
  // Camera settings
  INITIAL_ROT_X: 0.52,
  INITIAL_ROT_Y: 0.18,
  INITIAL_SCALE: 1.0,
  MIN_ROT_X: -0.2,
  MAX_ROT_X: 1.3,
  MIN_SCALE: 0.35,
  MAX_SCALE: 3.0,
  
  // Projection settings
  FOV_BASE: 700,
  PROJECTION_OFFSET: 350,
  PROJECTION_SCALE: 62,
  
  // Animation settings
  PULSE_SPEED: 0.04,
  ARROW_SPEED: 0.015,
  AUTO_ROTATE_SPEED: 0.012,
  AUTO_ROTATE_DURATION: 200,
  
  // Audio settings
  DEFAULT_VOLUME: 0.6,
  NARRATOR_RATE: 0.88,
  NARRATOR_PITCH: 1.05,
  NARRATOR_PAUSE: 600,
  
  // Particle settings
  PARTICLES_PER_EXPLOSION: 28,
  PARTICLE_DECAY_MIN: 0.02,
  PARTICLE_DECAY_MAX: 0.025,
  EXPLOSION_RING_DECAY: 0.06,
  
  // Colors
  COLORS: {
    SKY_TOP: '#050f1e',
    SKY_BOTTOM: '#0d2040',
    RIVER: 'rgba(60, 105, 145, 0.7)',
    ROAD: 'rgba(60, 60, 60, 0.7)',
    HQ_PULSE: 'rgba(229, 62, 62, 0.4)',
    DEFEATED: '#6b7280'
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
