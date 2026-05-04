/**
 * ═══════════════════════════════════════════════════════════════
 * TERRAIN GENERATION
 * ═══════════════════════════════════════════════════════════════
 */

const TerrainEngine = {
  terrain: null,
  gridSize: CONFIG.TERRAIN_GRID_SIZE,
  
  /**
   * Generate terrain heightmap
   */
  generate() {
    const G = this.gridSize;
    const pts = [];
    
    // Define peaks for hills
    const peaks = [
      { x: 4, z: -6.5, r: 2.2, hh: 3.5 },
      { x: -1, z: -8, r: 2, hh: 3 },
      { x: -5, z: -5, r: 1.8, hh: 2.5 },
      { x: 5, z: 0, r: 3, hh: 4 },
      { x: 4.5, z: 2, r: 2.5, hh: 3.5 },
      { x: -5, z: 3, r: 2, hh: 2.8 },
      { x: 2, z: 12, r: 3, hh: 2.5 }
    ];
    
    for (let i = 0; i <= G; i++) {
      pts[i] = [];
      for (let j = 0; j <= G; j++) {
        const nx = (i - G / 2) / (G / 2) * 14;
        const nz = (j - G / 2) / (G / 2) * 16;
        
        const vW = CONFIG.VALLEY_WIDTH;
        const vL = CONFIG.VALLEY_LENGTH;
        const inValley = (nx / vW) ** 2 + (nz / vL) ** 2;
        
        let h;
        if (inValley < 1) {
          // Inside valley - flat with slight variation
          h = -2 + Math.sin(nx * 0.4) * 0.15 + Math.cos(nz * 0.3) * 0.1;
        } else {
          // Outside valley - mountains
          const edge = Math.sqrt((nx / vW) ** 2 + (nz / vL) ** 2) - 1;
          h = -2 + Math.min(8, edge * 4.5);
          
          // Add peaks
          peaks.forEach(pk => {
            const d2 = Math.sqrt((nx - pk.x) ** 2 + (nz - pk.z) ** 2);
            if (d2 < pk.r) {
              h += pk.hh * (1 - d2 / pk.r) ** 1.8;
            }
          });
        }
        
        pts[i][j] = h;
      }
    }
    
    this.terrain = pts;
    return pts;
  },
  
  /**
   * Get terrain color based on height
   */
  getColor(h) {
    if (h < -1.8) return '#8B7355';
    if (h < -1.5) return '#6B8F51';
    if (h < -1) return '#5a8a45';
    if (h < -0.5) return '#4a7a38';
    if (h < 0) return '#3d6b30';
    if (h < 1) return '#4a7040';
    if (h < 2) return '#556040';
    if (h < 3.5) return '#5a5535';
    if (h < 5) return '#6b5a40';
    return '#7a6b58';
  },
  
  /**
   * Initialize terrain
   */
  init() {
    if (!this.terrain) {
      this.generate();
    }
  }
};
