/**
 * ═══════════════════════════════════════════════════════════════
 * MAIN APPLICATION
 * Chiến dịch Điện Biên Phủ 1954 - Interactive 3D Map
 * ═══════════════════════════════════════════════════════════════
 */

class App {
  constructor() {
    this.initialized = false;
  }
  
  /**
   * Initialize the application
   */
  init() {
    if (this.initialized) return;
    
    console.log('🚀 Initializing Điện Biên Phủ 1954 Interactive Map...');
    
    // Initialize canvas
    CanvasManager.init();
    console.log('✓ Canvas initialized');
    
    // Initialize terrain
    TerrainEngine.init();
    console.log('✓ Terrain generated');
    
    // Initialize projection engine
    ProjectionEngine.rotX = CONFIG.INITIAL_ROT_X;
    ProjectionEngine.rotY = CONFIG.INITIAL_ROT_Y;
    ProjectionEngine.scale = CONFIG.INITIAL_SCALE;
    console.log('✓ Projection engine ready');
    
    // Initialize controls
    InputController.init();
    UIController.init();
    console.log('✓ Controls initialized');
    
    // Start rendering
    Renderer.animate();
    console.log('✓ Renderer started');
    
    // Start auto-rotation demo
    InputController.startAutoRotation();
    console.log('✓ Auto-rotation demo started');
    
    this.initialized = true;
    console.log('✅ Application ready!');
  }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
  });
} else {
  const app = new App();
  app.init();
}

// Expose for debugging
window.DBP = {
  App,
  CanvasManager,
  ProjectionEngine,
  TerrainEngine,
  AudioEngine,
  Narrator,
  ParticleSystem,
  Renderer,
  InputController,
  UIController,
  CONFIG,
  LOCATIONS,
  ROUTES,
  NARRATIONS
};

console.log('📦 DBP modules loaded. Access via window.DBP');
