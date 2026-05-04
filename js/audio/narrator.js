/**
 * ═══════════════════════════════════════════════════════════════
 * NARRATOR - Web Speech API
 * ═══════════════════════════════════════════════════════════════
 */

const Narrator = {
  isActive: false,
  currentPhase: -1,
  sentenceIndex: 0,
  timer: null,
  
  /**
   * Start narration for a phase
   */
  start(phase) {
    this.stop();
    
    if (!this.isActive) return;
    
    this.currentPhase = phase;
    const data = NARRATIONS[phase];
    
    if (!data) return;
    
    this.sentenceIndex = 0;
    document.getElementById('narrator').style.display = 'block';
    document.getElementById('narrator-phase').textContent = data.phase;
    
    this.speakSentence(phase, 0);
  },
  
  /**
   * Stop narration
   */
  stop() {
    if (window.speechSynthesis) {
      speechSynthesis.cancel();
    }
    
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    document.getElementById('narrator').style.display = 'none';
    this.sentenceIndex = 0;
    this.currentPhase = -1;
    document.getElementById('narrator-bar').style.width = '0%';
  },
  
  /**
   * Speak a single sentence
   */
  speakSentence(phase, index) {
    if (!this.isActive || this.currentPhase !== phase) return;
    
    const data = NARRATIONS[phase];
    if (!data || index >= data.sentences.length) {
      this.stop();
      return;
    }
    
    const total = data.sentences.length;
    const percent = Math.round((index / total) * 100);
    document.getElementById('narrator-bar').style.width = percent + '%';
    
    // Highlight keywords
    let text = data.sentences[index];
    let html = text;
    
    NARRATOR_KEYWORDS.forEach(keyword => {
      html = html.replaceAll(keyword, `<span class="highlight">${keyword}</span>`);
    });
    
    document.getElementById('narrator-text').innerHTML = html;
    
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = CONFIG.NARRATOR_RATE;
      utterance.pitch = CONFIG.NARRATOR_PITCH;
      utterance.volume = 1;
      
      // Try to find Vietnamese voice
      const voices = speechSynthesis.getVoices();
      const viVoice = voices.find(v => v.lang.startsWith('vi')) || null;
      if (viVoice) {
        utterance.voice = viVoice;
      }
      
      utterance.onend = () => {
        this.timer = setTimeout(() => {
          this.speakSentence(phase, index + 1);
        }, CONFIG.NARRATOR_PAUSE);
      };
      
      utterance.onerror = () => {
        this.timer = setTimeout(() => {
          this.speakSentence(phase, index + 1);
        }, 2000);
      };
      
      speechSynthesis.speak(utterance);
      
      // Trigger audio effects on key lines
      AudioEngine.init();
      if (index === 0 && (phase === 1 || phase === 2 || phase === 3)) {
        setTimeout(() => {
          AudioEngine.playCannon(0.6);
          AudioEngine.playGunfire(5, 100);
        }, 500);
      }
      
      if (phase === 3 && index === 1) {
        setTimeout(() => {
          AudioEngine.playExplosion(0.8);
          ParticleSystem.triggerExplosions(5);
        }, 800);
      }
      
      if (phase === 3 && index === 3) {
        setTimeout(() => {
          AudioEngine.playVictory();
        }, 1200);
      }
    } else {
      // Fallback without speech
      this.timer = setTimeout(() => {
        this.speakSentence(phase, index + 1);
      }, 4000);
    }
  },
  
  /**
   * Toggle narration on/off
   */
  toggle() {
    this.isActive = !this.isActive;
    return this.isActive;
  }
};
