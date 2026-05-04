/**
 * ═══════════════════════════════════════════════════════════════
 * WEB AUDIO ENGINE
 * ═══════════════════════════════════════════════════════════════
 */

const AudioEngine = {
  context: null,
  masterGain: null,
  ambientOn: false,
  ambientNodes: [],
  globalVolume: CONFIG.DEFAULT_VOLUME,
  
  /**
   * Initialize Web Audio API
   */
  init() {
    if (this.context) return;
    
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.context.createGain();
    this.masterGain.gain.value = this.globalVolume;
    this.masterGain.connect(this.context.destination);
  },
  
  /**
   * Set master volume
   */
  setVolume(value) {
    this.globalVolume = parseFloat(value);
    if (this.masterGain) {
      this.masterGain.gain.value = this.globalVolume;
    }
  },
  
  /**
   * Create noise buffer
   */
  makeNoise(duration, type = 'white') {
    const buffer = this.context.createBuffer(
      1,
      this.context.sampleRate * duration,
      this.context.sampleRate
    );
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    return buffer;
  },
  
  /**
   * Play cannon sound
   */
  playCannon(volume = 0.9) {
    this.init();
    const t = this.context.currentTime;
    
    // Low rumble body
    const buf = this.makeNoise(1.5);
    const src = this.context.createBufferSource();
    src.buffer = buf;
    
    const lp = this.context.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 180;
    lp.Q.value = 1.5;
    
    const g = this.context.createGain();
    g.gain.setValueAtTime(volume, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
    
    src.connect(lp);
    lp.connect(g);
    g.connect(this.masterGain);
    src.start(t);
    src.stop(t + 1.8);
    
    // Sharp crack transient
    const buf2 = this.makeNoise(0.08);
    const src2 = this.context.createBufferSource();
    src2.buffer = buf2;
    
    const hp = this.context.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 800;
    
    const g2 = this.context.createGain();
    g2.gain.setValueAtTime(volume * 0.7, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    
    src2.connect(hp);
    hp.connect(g2);
    g2.connect(this.masterGain);
    src2.start(t);
    src2.stop(t + 0.15);
    
    // Distant echo
    const osc = this.context.createOscillator();
    osc.frequency.value = 55;
    
    const g3 = this.context.createGain();
    g3.gain.setValueAtTime(volume * 0.4, t + 0.05);
    g3.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    
    osc.connect(g3);
    g3.connect(this.masterGain);
    osc.start(t + 0.05);
    osc.stop(t + 0.8);
  },
  
  /**
   * Play gunfire burst
   */
  playGunfire(count = 8, interval = 90) {
    this.init();
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const t = this.context.currentTime;
        const buf = this.makeNoise(0.12);
        const src = this.context.createBufferSource();
        src.buffer = buf;
        
        const hp = this.context.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 2200;
        
        const g = this.context.createGain();
        g.gain.setValueAtTime(0.3 + Math.random() * 0.2, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        
        src.connect(hp);
        hp.connect(g);
        g.connect(this.masterGain);
        src.start(t);
        src.stop(t + 0.15);
      }, i * (interval + Math.random() * 40));
    }
  },
  
  /**
   * Play explosion sound
   */
  playExplosion(volume = 1.0) {
    this.init();
    const t = this.context.currentTime;
    
    // Deep thud
    [60, 80, 110].forEach((freq, idx) => {
      const osc = this.context.createOscillator();
      osc.frequency.value = freq;
      
      const g = this.context.createGain();
      g.gain.setValueAtTime(volume * (0.6 - idx * 0.15), t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.2 - idx * 0.2);
      
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 1.2);
    });
    
    // Noise burst
    const buf = this.makeNoise(1.2);
    const src = this.context.createBufferSource();
    src.buffer = buf;
    
    const bp = this.context.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 350;
    bp.Q.value = 0.5;
    
    const g = this.context.createGain();
    g.gain.setValueAtTime(volume * 0.8, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
    
    src.connect(bp);
    bp.connect(g);
    g.connect(this.masterGain);
    src.start(t);
    src.stop(t + 1.4);
  },
  
  /**
   * Play victory fanfare
   */
  playVictory() {
    this.init();
    const t = this.context.currentTime;
    const melody = [523, 659, 784, 1047, 784, 1047, 1175, 1047];
    
    melody.forEach((freq, i) => {
      const osc = this.context.createOscillator();
      osc.type = 'square';
      osc.frequency.value = freq;
      
      const g = this.context.createGain();
      g.gain.setValueAtTime(0, t + i * 0.18);
      g.gain.linearRampToValueAtTime(0.15, t + i * 0.18 + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.18 + 0.38);
      
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t + i * 0.18);
      osc.stop(t + i * 0.18 + 0.4);
    });
    
    // Bass
    [131, 131, 165, 196].forEach((freq, i) => {
      const osc = this.context.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      
      const g = this.context.createGain();
      g.gain.setValueAtTime(0.08, t + i * 0.36);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.36 + 0.35);
      
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t + i * 0.36);
      osc.stop(t + i * 0.36 + 0.35);
    });
  },
  
  /**
   * Start ambient battlefield sounds
   */
  startAmbient() {
    this.init();
    if (this.ambientNodes.length) return;
    
    // Wind/forest drone
    const windBuf = this.makeNoise(4, 'pink');
    const src = this.context.createBufferSource();
    src.buffer = windBuf;
    src.loop = true;
    
    const lp = this.context.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 600;
    
    const g = this.context.createGain();
    g.gain.value = 0.06;
    
    src.connect(lp);
    lp.connect(g);
    g.connect(this.masterGain);
    src.start();
    
    this.ambientNodes.push({ src, g });
    
    // Schedule distant rumble
    const scheduleRumble = () => {
      const delay = 4000 + Math.random() * 8000;
      const id = setTimeout(() => {
        this.playCannon(0.25 + Math.random() * 0.3);
        scheduleRumble();
      }, delay);
      this.ambientNodes.push({ timer: id });
    };
    scheduleRumble();
    
    // Schedule gunfire
    const scheduleGuns = () => {
      const delay = 7000 + Math.random() * 12000;
      const id = setTimeout(() => {
        this.playGunfire(3 + Math.floor(Math.random() * 6), 80 + Math.random() * 60);
        scheduleGuns();
      }, delay);
      this.ambientNodes.push({ timer: id });
    };
    scheduleGuns();
  },
  
  /**
   * Stop ambient sounds
   */
  stopAmbient() {
    this.ambientNodes.forEach(n => {
      if (n.src) {
        try {
          n.src.stop();
        } catch (e) {}
      }
      if (n.timer) {
        clearTimeout(n.timer);
      }
    });
    this.ambientNodes = [];
  },
  
  /**
   * Toggle ambient sounds
   */
  toggleAmbient() {
    this.init();
    this.ambientOn = !this.ambientOn;
    
    if (this.ambientOn) {
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
    
    return this.ambientOn;
  }
};
