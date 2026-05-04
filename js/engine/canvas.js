/**
 * ═══════════════════════════════════════════════════════════════
 * CANVAS SETUP & MANAGEMENT
 * ═══════════════════════════════════════════════════════════════
 */

const CanvasManager = {
  canvas: null,
  ctx: null,
  fxCanvas: null,
  fxCtx: null,
  
  /**
   * Initialize canvas elements
   */
  init() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.fxCanvas = document.getElementById('fx-canvas');
    this.fxCtx = this.fxCanvas.getContext('2d');
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  },
  
  /**
   * Resize canvas to match window size with device pixel ratio
   */
  resize() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Main canvas
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';
    
    // FX canvas
    this.fxCanvas.width = width * dpr;
    this.fxCanvas.height = height * dpr;
    this.fxCanvas.style.width = width + 'px';
    this.fxCanvas.style.height = height + 'px';
  },
  
  /**
   * Clear main canvas
   */
  clear() {
    const width = this.canvas.width / devicePixelRatio;
    const height = this.canvas.height / devicePixelRatio;
    this.ctx.clearRect(0, 0, width, height);
  },
  
  /**
   * Clear FX canvas
   */
  clearFX() {
    const width = this.fxCanvas.width / devicePixelRatio;
    const height = this.fxCanvas.height / devicePixelRatio;
    this.fxCtx.clearRect(0, 0, width, height);
  },
  
  /**
   * Get canvas dimensions
   */
  getDimensions() {
    return {
      width: this.canvas.width / devicePixelRatio,
      height: this.canvas.height / devicePixelRatio
    };
  }
};
