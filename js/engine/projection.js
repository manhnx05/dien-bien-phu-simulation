/**
 * ═══════════════════════════════════════════════════════════════
 * 3D PROJECTION ENGINE
 * ═══════════════════════════════════════════════════════════════
 */

const ProjectionEngine = {
  rotX: CONFIG.INITIAL_ROT_X,
  rotY: CONFIG.INITIAL_ROT_Y,
  scale: CONFIG.INITIAL_SCALE,
  
  /**
   * Project 3D point to 2D screen coordinates
   * @param {number} x - X coordinate in 3D space
   * @param {number} y - Y coordinate in 3D space (height)
   * @param {number} z - Z coordinate in 3D space
   * @returns {Object} Screen coordinates and depth info
   */
  project(x, y, z) {
    const cY = Math.cos(this.rotY);
    const sY = Math.sin(this.rotY);
    const cX = Math.cos(this.rotX);
    const sX = Math.sin(this.rotX);
    
    // Rotate around Y axis
    let rx = x * cY - z * sY;
    let rz = x * sY + z * cY;
    
    // Rotate around X axis
    let ry = y * cX - rz * sX;
    let rz2 = y * sX + rz * cX;
    
    // Perspective projection
    const fov = CONFIG.FOV_BASE * this.scale;
    const d = fov / (fov + rz2 + CONFIG.PROJECTION_OFFSET);
    
    const dims = CanvasManager.getDimensions();
    const sx = dims.width / 2 + rx * d * CONFIG.PROJECTION_SCALE;
    const sy = dims.height / 2 + ry * d * CONFIG.PROJECTION_SCALE;
    
    return { sx, sy, d, rz2 };
  },
  
  /**
   * Rotate camera
   */
  rotate(deltaX, deltaY) {
    this.rotY += deltaX;
    this.rotX += deltaY;
    this.rotX = Math.max(CONFIG.MIN_ROT_X, Math.min(CONFIG.MAX_ROT_X, this.rotX));
  },
  
  /**
   * Zoom camera
   */
  zoom(delta) {
    this.scale *= delta > 0 ? 0.92 : 1.08;
    this.scale = Math.max(CONFIG.MIN_SCALE, Math.min(CONFIG.MAX_SCALE, this.scale));
  },
  
  /**
   * Reset camera to initial position
   */
  reset() {
    this.rotX = CONFIG.INITIAL_ROT_X;
    this.rotY = CONFIG.INITIAL_ROT_Y;
    this.scale = CONFIG.INITIAL_SCALE;
  }
};
