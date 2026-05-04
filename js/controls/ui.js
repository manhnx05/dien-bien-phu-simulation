/**
 * ═══════════════════════════════════════════════════════════════
 * UI CONTROLS - Buttons, Phase Selection, Audio Controls
 * ═══════════════════════════════════════════════════════════════
 */

const UIController = {
  /**
   * Initialize UI controls
   */
  init() {
    // No event listeners needed - using inline onclick handlers
  },
  
  /**
   * Set current phase
   */
  setPhase(phase) {
    Renderer.currentPhase = phase;
    
    // Update button states
    document.querySelectorAll('.phase-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === phase);
    });
    
    // Show toast notification
    const toast = document.getElementById('phase-toast');
    const messages = [
      '🗺 Toàn cảnh chiến trường',
      '⚔ Đợt 1 (13/3–17/3): Xóa bỏ Phân khu Bắc',
      '⚔ Đợt 2 (30/3–30/4): Đánh chiếm điểm cao Đông',
      '🚩 Đợt 3 (1/5–7/5): Toàn thắng!'
    ];
    toast.textContent = messages[phase];
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2800);
    
    // Sound effects
    AudioEngine.init();
    if (phase === 1) {
      setTimeout(() => {
        AudioEngine.playCannon(0.7);
        AudioEngine.playGunfire(6, 90);
      }, 300);
    }
    if (phase === 2) {
      setTimeout(() => {
        AudioEngine.playCannon(0.55);
        AudioEngine.playGunfire(4, 110);
      }, 300);
    }
    if (phase === 3) {
      setTimeout(() => {
        AudioEngine.playExplosion(0.9);
        ParticleSystem.triggerExplosions(4);
        setTimeout(() => AudioEngine.playVictory(), 2500);
      }, 400);
    }
    
    // Restart narration if active
    if (Narrator.isActive) {
      Narrator.start(phase);
    }
  }
};

// Export setPhase as global function for onclick handlers
function setPhase(phase) {
  UIController.setPhase(phase);
}
window.setPhase = setPhase;
