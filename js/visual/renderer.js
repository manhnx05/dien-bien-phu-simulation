/**
 * ═══════════════════════════════════════════════════════════════
 * MAIN RENDERER
 * ═══════════════════════════════════════════════════════════════
 */

const Renderer = {
  pulseTime: 0,
  arrowTime: 0,
  projectedPositions: [],
  hoveredId: null,
  currentPhase: 0,
  
  /**
   * Draw terrain mesh
   */
  drawTerrain() {
    const ctx = CanvasManager.ctx;
    const G = TerrainEngine.gridSize;
    const terrain = TerrainEngine.terrain;
    
    for (let i = 0; i < G; i++) {
      for (let j = 0; j < G; j++) {
        const corners = [
          { x: (i - G / 2), y: -terrain[i][j], z: (j - G / 2) * 1.1 },
          { x: (i + 1 - G / 2), y: -terrain[i + 1][j], z: (j - G / 2) * 1.1 },
          { x: (i + 1 - G / 2), y: -terrain[i + 1][j + 1], z: (j + 1 - G / 2) * 1.1 },
          { x: (i - G / 2), y: -terrain[i][j + 1], z: (j + 1 - G / 2) * 1.1 }
        ];
        
        const avgH = (terrain[i][j] + terrain[i + 1][j] + terrain[i + 1][j + 1] + terrain[i][j + 1]) / 4;
        const ps = corners.map(c => ProjectionEngine.project(c.x, c.y, c.z));
        
        // Backface culling
        const v1x = ps[1].sx - ps[0].sx;
        const v1y = ps[1].sy - ps[0].sy;
        const v2x = ps[3].sx - ps[0].sx;
        const v2y = ps[3].sy - ps[0].sy;
        if (v1x * v2y - v1y * v2x > 0) continue;
        
        ctx.beginPath();
        ctx.moveTo(ps[0].sx, ps[0].sy);
        for (let k = 1; k < 4; k++) {
          ctx.lineTo(ps[k].sx, ps[k].sy);
        }
        ctx.closePath();
        ctx.fillStyle = TerrainEngine.getColor(avgH);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 0.2;
        ctx.stroke();
      }
    }
  },
  
  /**
   * Draw river
   */
  drawRiver() {
    const ctx = CanvasManager.ctx;
    const riverPoints = [
      { x: 1.5, z: -12 }, { x: 1.8, z: -10 }, { x: 1.2, z: -8 },
      { x: 0.8, z: -6 }, { x: 0.6, z: -4 }, { x: 0.8, z: -2 },
      { x: 0.7, z: 0 }, { x: 0.5, z: 2 }, { x: 0.3, z: 4 },
      { x: 0.6, z: 6 }, { x: 0.8, z: 8 }, { x: 0.5, z: 10 },
      { x: 0.6, z: 12 }, { x: 0.8, z: 14 }
    ];
    
    const ps = riverPoints.map(r => ProjectionEngine.project(r.x, -1.88, r.z));
    
    ctx.beginPath();
    ctx.moveTo(ps[0].sx, ps[0].sy);
    for (let i = 1; i < ps.length; i++) {
      const pc = ps[i - 1];
      const pn = ps[i];
      ctx.bezierCurveTo((pc.sx + pn.sx) / 2, pc.sy, (pc.sx + pn.sx) / 2, pn.sy, pn.sx, pn.sy);
    }
    
    ctx.strokeStyle = 'rgba(100, 180, 255, 0.88)';
    ctx.lineWidth = 3.5 * (ps[0].d * 0.5 + 0.5);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(150, 210, 255, 0.2)';
    ctx.lineWidth = 7 * (ps[0].d * 0.5 + 0.5);
    ctx.stroke();
    
    const mp = ProjectionEngine.project(1.2, -1.88, -4);
    ctx.save();
    ctx.font = `italic bold ${Math.max(9, 11 * mp.d * 0.5 + 5)}px Arial`;
    ctx.fillStyle = 'rgba(120, 200, 255, 0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('Sông Nậm Rốm', mp.sx, mp.sy);
    ctx.restore();
  },
  
  /**
   * Draw road (Đường 41)
   */
  drawRoad() {
    const ctx = CanvasManager.ctx;
    const roadPoints = [
      { x: -2.5, z: -13 }, { x: -2.2, z: -10 }, { x: -2, z: -8 },
      { x: -1.8, z: -5 }, { x: -1.6, z: -2 }, { x: -1.5, z: 0 },
      { x: -1.4, z: 3 }, { x: -1.2, z: 6 }, { x: -1, z: 9 },
      { x: -0.8, z: 12 }, { x: -0.5, z: 14 }
    ];
    
    const ps = roadPoints.map(r => ProjectionEngine.project(r.x, -1.88, r.z));
    
    ctx.beginPath();
    ctx.moveTo(ps[0].sx, ps[0].sy);
    for (let i = 1; i < ps.length; i++) {
      ctx.lineTo(ps[i].sx, ps[i].sy);
    }
    
    ctx.strokeStyle = 'rgba(60, 60, 60, 0.7)';
    ctx.lineWidth = 2.5 * (ps[0].d * 0.4 + 0.6);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)';
    ctx.lineWidth = 4.5 * (ps[0].d * 0.4 + 0.6);
    ctx.stroke();
    
    const mp = ProjectionEngine.project(-2, -1.88, -8);
    ctx.font = `bold ${Math.max(8, 9 * mp.d * 0.5 + 5)}px Arial`;
    ctx.fillStyle = 'rgba(150, 150, 150, 0.8)';
    ctx.textAlign = 'center';
    ctx.fillText('Đường 41', mp.sx, mp.sy);
  },
  
  /**
   * Draw airports
   */
  drawAirports() {
    const ctx = CanvasManager.ctx;
    const airports = [
      { pts: [{ x: -1.8, z: -4 }, { x: -0.5, z: -4 }, { x: -0.5, z: -0.5 }, { x: -1.8, z: -0.5 }], label: 'Sân bay Mường Thanh' },
      { pts: [{ x: 0.5, z: 9 }, { x: 2, z: 9 }, { x: 2, z: 11.5 }, { x: 0.5, z: 11.5 }], label: 'Sân bay Hồng Cúm' }
    ];
    
    airports.forEach(s => {
      const ps = s.pts.map(p => ProjectionEngine.project(p.x, -1.85, p.z));
      ctx.beginPath();
      ctx.moveTo(ps[0].sx, ps[0].sy);
      ps.forEach(p => ctx.lineTo(p.sx, p.sy));
      ctx.closePath();
      ctx.fillStyle = 'rgba(80, 80, 80, 0.5)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      const mp = ProjectionEngine.project((s.pts[0].x + s.pts[2].x) / 2, -1.84, (s.pts[0].z + s.pts[2].z) / 2);
      ctx.font = `bold ${Math.max(8, 9 * mp.d * 0.5 + 4)}px Arial`;
      ctx.fillStyle = 'rgba(200, 200, 180, 0.9)';
      ctx.textAlign = 'center';
      ctx.fillText('✈ ' + s.label, mp.sx, mp.sy - 5);
    });
  },
  
  /**
   * Helper: Draw dashed polygon
   */
  drawDashedPoly(pts, color, lw, fill) {
    const ctx = CanvasManager.ctx;
    const ps = pts.map(p => ProjectionEngine.project(p.x, -1.7, p.z));
    ctx.beginPath();
    ctx.moveTo(ps[0].sx, ps[0].sy);
    ps.forEach(p => ctx.lineTo(p.sx, p.sy));
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.stroke();
    ctx.setLineDash([]);
  },
  
  /**
   * Draw sector rings
   */
  drawRings() {
    const ctx = CanvasManager.ctx;
    
    if (this.currentPhase === 0 || this.currentPhase === 1) {
      this.drawDashedPoly([{ x: 5, z: -9 }, { x: 3, z: -9.5 }, { x: -0.5, z: -10 }, { x: -3, z: -8 }, { x: -6.5, z: -6 }, { x: -5.5, z: -4 }, { x: 0, z: -4.5 }, { x: 4, z: -5 }, { x: 5, z: -9 }], '#f9a8d4', 2, 'rgba(249, 168, 212, 0.08)');
      const rp = ProjectionEngine.project(0, -1.5, -7.5);
      ctx.font = `bold ${Math.max(8, 9 * rp.d * 0.4 + 4)}px Arial`;
      ctx.fillStyle = 'rgba(249, 168, 212, 0.85)';
      ctx.textAlign = 'center';
      ctx.fillText('PHÂN KHU BẮC', rp.sx, rp.sy);
    }
    
    if (this.currentPhase === 0 || this.currentPhase === 2 || this.currentPhase === 3) {
      this.drawDashedPoly([{ x: 5.5, z: -3 }, { x: 5.5, z: 0 }, { x: 5, z: 3 }, { x: 3, z: 4 }, { x: 0, z: 4.5 }, { x: -2.5, z: 3 }, { x: -3, z: 0 }, { x: -3, z: -3 }, { x: -1, z: -4 }, { x: 2, z: -3.5 }, { x: 5.5, z: -3 }], this.currentPhase === 3 ? '#fca5a5' : '#fdba74', 1.5, 'rgba(253, 186, 116, 0.07)');
      const cp = ProjectionEngine.project(4.5, -1.5, 2.5);
      ctx.font = `bold ${Math.max(8, 9 * cp.d * 0.4 + 4)}px Arial`;
      ctx.fillStyle = 'rgba(253, 186, 116, 0.85)';
      ctx.textAlign = 'center';
      ctx.fillText('PHÂN KHU TRUNG TÂM', cp.sx, cp.sy);
    }
    
    if (this.currentPhase === 0 || this.currentPhase === 3) {
      if (this.currentPhase === 3) {
        this.drawDashedPoly([{ x: 1, z: -2 }, { x: 2, z: 0 }, { x: 1.5, z: 2 }, { x: -0.5, z: 2.5 }, { x: -3, z: 1.5 }, { x: -3, z: -1 }, { x: -1, z: -2 }, { x: 1, z: -2 }], '#ef4444', 1.5, 'rgba(239, 68, 68, 0.1)');
      }
      this.drawDashedPoly([{ x: -1, z: 10.5 }, { x: 1, z: 9.5 }, { x: 3.5, z: 10 }, { x: 4, z: 12 }, { x: 3, z: 14 }, { x: 0, z: 14.5 }, { x: -2, z: 13 }, { x: -1, z: 10.5 }], this.currentPhase === 3 ? '#ef4444' : '#fdba74', 1.5, 'rgba(239, 68, 68, 0.07)');
      const hp = ProjectionEngine.project(1, -1.5, 12);
      ctx.font = `bold ${Math.max(8, 9 * hp.d * 0.4 + 4)}px Arial`;
      ctx.fillStyle = 'rgba(249, 168, 212, 0.85)';
      ctx.textAlign = 'center';
      ctx.fillText('PHÂN KHU NAM', hp.sx, hp.sy);
    }
  },
  
  /**
   * Draw trenches
   */
  drawTrenches() {
    if (this.currentPhase < 2) return;
    
    const ctx = CanvasManager.ctx;
    const trenches = [
      [{ x: 9, z: -0.5 }, { x: 8, z: -0.5 }, { x: 8, z: 0.5 }, { x: 7, z: 0.5 }, { x: 7, z: 1 }, { x: 6.5, z: 1 }, { x: 6.5, z: 1.5 }, { x: 6, z: 1.5 }, { x: 5.5, z: 1.5 }, { x: 5, z: 1.5 }],
      [{ x: 8, z: -2 }, { x: 7, z: -2 }, { x: 7, z: -1 }, { x: 6.5, z: -1 }, { x: 6.5, z: -0.5 }, { x: 6, z: -0.5 }, { x: 5.5, z: -0.5 }, { x: 5, z: -0.5 }],
      [{ x: 7, z: -3.5 }, { x: 6, z: -3 }, { x: 5.5, z: -2.5 }, { x: 5.2, z: -2 }, { x: 4.8, z: -1.5 }]
    ];
    
    trenches.forEach(seg => {
      const ps = seg.map(p => ProjectionEngine.project(p.x, -1.7, p.z));
      ctx.beginPath();
      ctx.moveTo(ps[0].sx, ps[0].sy);
      ps.forEach(p => ctx.lineTo(p.sx, p.sy));
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = 'rgba(200, 50, 50, 0.75)';
      ctx.lineWidth = 1.5 * (ps[0].d * 0.4 + 0.6);
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.setLineDash([]);
    });
  },
  
  /**
   * Draw routes with arrows
   */
  drawRoutes() {
    const ctx = CanvasManager.ctx;
    
    ROUTES.forEach(route => {
      if (this.currentPhase !== 0 && route.phase !== this.currentPhase) return;
      
      const ps = route.pts.map(p => ProjectionEngine.project(p.x, -1.7, p.z));
      const offset = route.dash ? 0 : -(this.arrowTime * 25) % 30;
      
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(ps[0].sx, ps[0].sy);
      
      for (let i = 1; i < ps.length; i++) {
        const pc = ps[i - 1];
        const pn = ps[i];
        ctx.bezierCurveTo(
          (pc.sx * 2 + pn.sx) / 3, pc.sy,
          (pc.sx + pn.sx * 2) / 3, pn.sy,
          pn.sx, pn.sy
        );
      }
      
      ctx.strokeStyle = route.color;
      ctx.lineWidth = route.w * (ps[0].d * 0.5 + 0.5);
      ctx.globalAlpha = 0.85;
      ctx.setLineDash(route.dash ? [5, 4] : [12, 6]);
      ctx.lineDashOffset = offset;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
      
      // Draw arrow
      if (ps.length >= 2) {
        const p1 = ps[ps.length - 2];
        const p2 = ps[ps.length - 1];
        const angle = Math.atan2(p2.sy - p1.sy, p2.sx - p1.sx);
        const arrowSize = 10 * (p2.d * 0.4 + 0.6);
        
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.moveTo(p2.sx, p2.sy);
        ctx.lineTo(
          p2.sx - arrowSize * Math.cos(angle - 0.45),
          p2.sy - arrowSize * Math.sin(angle - 0.45)
        );
        ctx.lineTo(
          p2.sx - arrowSize * 0.6 * Math.cos(angle),
          p2.sy - arrowSize * 0.6 * Math.sin(angle)
        );
        ctx.lineTo(
          p2.sx - arrowSize * Math.cos(angle + 0.45),
          p2.sy - arrowSize * Math.sin(angle + 0.45)
        );
        ctx.closePath();
        ctx.fillStyle = route.color;
        ctx.fill();
        ctx.restore();
      }
      
      // Draw label
      if (route.label && ps.length >= 2) {
        const mp = ps[Math.floor(ps.length / 2)];
        ctx.font = `bold ${Math.max(7, 8 * mp.d * 0.4 + 4)}px Arial`;
        ctx.fillStyle = route.color;
        ctx.textAlign = 'center';
        ctx.globalAlpha = 0.9;
        ctx.fillText(route.label, mp.sx, mp.sy - 5);
        ctx.globalAlpha = 1;
      }
    });
  },
  
  /**
   * Draw positions (locations)
   */
  drawPositions() {
    const ctx = CanvasManager.ctx;
    this.projectedPositions = [];
    
    // Sort by depth
    const sorted = LOCATIONS.slice().sort((a, b) => {
      const pa = ProjectionEngine.project(a.x, -(a.h + 0.5), a.z);
      const pb = ProjectionEngine.project(b.x, -(b.h + 0.5), b.z);
      return pb.rz2 - pa.rz2;
    });
    
    sorted.forEach(loc => {
      // Filter by phase
      if ((loc.id === 'VN1' || loc.id === 'VN2') && this.currentPhase !== 0 && this.currentPhase !== 1) return;
      if (loc.id === 'VN3' && this.currentPhase !== 0 && this.currentPhase !== 2 && this.currentPhase !== 3) return;
      
      const isDefeated = this.currentPhase === 3 && (loc.type === 'fp' || loc.type === 'hq');
      const p = ProjectionEngine.project(loc.x, -(loc.h + 0.5), loc.z);
      const r = loc.size * p.d * 0.55 + loc.size * 0.45;
      const pulse = (loc.id === 'HQ') ? Math.sin(this.pulseTime * 3) * 1.5 : 0;
      
      // Shadow
      ctx.beginPath();
      ctx.ellipse(p.sx + 1.5, p.sy + 2.5, r * 1.1, r * 0.45, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fill();
      
      // Draw shape based on type
      ctx.beginPath();
      if (loc.type === 'hq') {
        const pr = r + pulse;
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          const rad = i % 2 === 0 ? pr : pr * 0.45;
          if (i === 0) {
            ctx.moveTo(p.sx + Math.cos(a) * rad, p.sy + Math.sin(a) * rad);
          } else {
            ctx.lineTo(p.sx + Math.cos(a) * rad, p.sy + Math.sin(a) * rad);
          }
        }
        ctx.closePath();
      } else if (loc.type === 'viet') {
        ctx.moveTo(p.sx, p.sy - r * 1.3);
        ctx.lineTo(p.sx + r * 1.1, p.sy + r * 0.9);
        ctx.lineTo(p.sx - r * 1.1, p.sy + r * 0.9);
        ctx.closePath();
      } else if (loc.type === 'airport') {
        ctx.rect(p.sx - r * 2, p.sy - r * 0.6, r * 4, r * 1.2);
      } else if (loc.type === 'village') {
        ctx.arc(p.sx, p.sy, r * 0.7, 0, Math.PI * 2);
      } else {
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
      }
      
      ctx.fillStyle = isDefeated && loc.id !== 'HQ' ? CONFIG.COLORS.DEFEATED : 
                      (loc.id === this.hoveredId ? '#fbbf24' : loc.color);
      ctx.fill();
      ctx.strokeStyle = isDefeated ? 'rgba(150, 150, 150, 0.5)' : 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      
      // HQ pulse ring
      if (loc.id === 'HQ' && !isDefeated) {
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r + 4 + pulse * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = CONFIG.COLORS.HQ_PULSE;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      
      // Victory flag on HQ
      if (this.currentPhase === 3 && loc.id === 'HQ') {
        const fh = Math.max(12, 18 * p.d * 0.5 + 8);
        ctx.fillStyle = 'rgba(220, 38, 38, 0.95)';
        ctx.fillRect(p.sx, p.sy - r - fh, fh * 0.65, fh * 0.45);
        ctx.fillStyle = '#fde047';
        ctx.font = `${Math.max(5, 7 * p.d * 0.3 + 3)}px Arial`;
        ctx.fillText('★', p.sx + fh * 0.12, p.sy - r - fh + fh * 0.32);
        ctx.strokeStyle = 'rgba(255, 255, 100, 0.8)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.sx, p.sy - r);
        ctx.lineTo(p.sx, p.sy - r - fh);
        ctx.stroke();
      }
      
      // Label
      const ls = Math.max(8, 10 * p.d * 0.35 + 6);
      ctx.font = `bold ${ls}px Arial`;
      ctx.textAlign = 'center';
      const tw = ctx.measureText(loc.id).width;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(p.sx - tw / 2 - 3, p.sy + r + 2, tw + 6, ls + 4, 3);
        ctx.fill();
      }
      ctx.fillStyle = isDefeated ? '#9ca3af' : '#fff';
      ctx.fillText(loc.id, p.sx, p.sy + r + ls + 2);
      
      this.projectedPositions.push({ ...loc, sx: p.sx, sy: p.sy, r: r + 8 });
    });
  },
  
  /**
   * Draw sector labels
   */
  drawSectorLabels() {
    const ctx = CanvasManager.ctx;
    const labels = [
      { text: 'CAO ĐIỂM PHÍA ĐÔNG', x: 7.5, z: 0, s: 10 },
      { text: 'CHỈ HUY PHÁP', x: -2, z: 0.5, s: 9 },
      { text: 'THUNG LŨNG MƯỜNG THANH', x: -0.5, z: -1, s: 11 }
    ];
    
    labels.forEach(l => {
      const p = ProjectionEngine.project(l.x, -1.6, l.z);
      ctx.font = `bold ${Math.max(7, l.s * p.d * 0.5 + 4)}px Arial`;
      ctx.fillStyle = 'rgba(255, 255, 200, 0.5)';
      ctx.textAlign = 'center';
      ctx.fillText(l.text, p.sx, p.sy);
    });
  },
  
  /**
   * Main render function
   */
  render() {
    const dims = CanvasManager.getDimensions();
    const ctx = CanvasManager.ctx;
    
    ctx.save();
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.clearRect(0, 0, dims.width, dims.height);
    
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, dims.height);
    sky.addColorStop(0, CONFIG.COLORS.SKY_TOP);
    sky.addColorStop(1, CONFIG.COLORS.SKY_BOTTOM);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, dims.width, dims.height);
    
    // Stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    for (let i = 0; i < 40; i++) {
      ctx.fillRect((i * 173 + 50) % dims.width, (i * 113 + 30) % (dims.height * 0.38), 1, 1);
    }
    
    this.drawTerrain();
    this.drawRiver();
    this.drawRoad();
    this.drawAirports();
    this.drawRings();
    this.drawTrenches();
    this.drawRoutes();
    this.drawPositions();
    this.drawSectorLabels();
    
    ctx.restore();
  },
  
  /**
   * Animation loop
   */
  animate() {
    this.pulseTime += CONFIG.PULSE_SPEED;
    this.arrowTime += CONFIG.ARROW_SPEED;
    
    this.render();
    ParticleSystem.draw();
    
    requestAnimationFrame(() => this.animate());
  }
};
