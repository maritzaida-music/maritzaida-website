/* ================================================
   Maritzaida Radio — JavaScript
   ================================================ */

/* ------------------------------------------------
   Station config
   playlistId: channel uploads playlist — streams
   all videos from the Maritzaida YouTube channel
   in shuffled order.
   ------------------------------------------------ */
const STATIONS = [
  {
    id:       'radio-bohemia',
    name:     'MARITZAIDA RADIO',
    subtitle: { en: 'Música Bohemia & Bolero', es: 'Música Bohemia & Bolero' },
    freq:     '96.7',
    band:     'FM',
    playlistId: 'PLNvW9cMNydmw',
  }
];

const STATION = STATIONS[0];

/* ------------------------------------------------
   Frequency scale config
   ------------------------------------------------ */
const FREQ_MIN   = 86.5;
const FREQ_MAX   = 109.5;
const FREQ_RANGE = FREQ_MAX - FREQ_MIN;
const STATION_FREQ = parseFloat(STATION.freq); // 96.7
const STATION_POS  = (STATION_FREQ - FREQ_MIN) / FREQ_RANGE; // ~0.435

/* ------------------------------------------------
   State
   ------------------------------------------------ */
const TRANSLATIONS = {
  en: {
    tuning:  'TUNING',
    volume:  'VOLUME',
    power:   'POWER',
    onAir:   'ON AIR',
    chL:     'L',
    chR:     'R',
    annDate: 'Coming October 20, 2026',
    preSave: 'Pre-Save',
    preOrder:'Pre-Order CD',
    donate:  'Donate',
    thanks:  'Thank you for your support.',
  },
  es: {
    tuning:  'SINTONÍA',
    volume:  'VOLUMEN',
    power:   'ENCENDER',
    onAir:   'AL AIRE',
    chL:     'L',
    chR:     'R',
    annDate: 'Disponible 20 de octubre, 2026',
    preSave: 'Pre-guardar',
    preOrder:'Pre-ordenar CD',
    donate:  'Donar',
    thanks:  'Gracias por tu apoyo.',
  },
};

const state = {
  powered:     false,
  tuning:      false,
  tuneOffset:  0,      // -1 to 1; 0 = on station
  volume:      75,     // 0–100
  lang:        'en',
  vuAnimId:    null,
  staticNode:  null,
  staticGain:  null,
  audioCtx:    null,
};

/* ------------------------------------------------
   DOM refs
   ------------------------------------------------ */
const radio       = document.getElementById('radio');
const powerBtn    = document.getElementById('power-btn');
const onAir       = document.getElementById('on-air');
const freqNeedle  = document.getElementById('freq-needle');
const freqStation = document.getElementById('freq-station');
const freqSubtitle= document.getElementById('freq-subtitle');
const freqNumber  = document.getElementById('freq-number');
const freqDisplay = document.getElementById('freq-display');
const tube1       = document.getElementById('tube-1');
const tube2       = document.getElementById('tube-2');
const tuningKnob  = document.getElementById('tuning-knob');
const volumeKnob  = document.getElementById('volume-knob');
const tuningArc   = document.getElementById('tuning-arc');
const volumeArc   = document.getElementById('volume-arc');
const vuL         = document.getElementById('vu-l');
const vuR         = document.getElementById('vu-r');

/* ------------------------------------------------
   YouTube Player
   ------------------------------------------------ */
let ytPlayer = null;
let ytReady  = false;

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-player', {
    height: '1',
    width:  '1',
    playerVars: {
      listType:       'playlist',
      list:           STATION.playlistId,
      autoplay:       0,
      controls:       0,
      disablekb:      1,
      fs:             0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline:    1,
      rel:            0,
      shuffle:        1,
    },
    events: {
      onReady: (e) => { ytReady = true; e.target.setShuffle(true); },
      onStateChange: (e) => {
        // Loop playlist
        if (e.data === YT.PlayerState.ENDED) ytPlayer.playVideo();
      }
    }
  });
};

/* ------------------------------------------------
   Web Audio — click + static
   ------------------------------------------------ */
function getAudioCtx() {
  if (!state.audioCtx) {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return state.audioCtx;
}

function playClick() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 1400;
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.06);
  } catch (e) { /* ignore */ }
}

function startStatic() {
  try {
    const ctx = getAudioCtx();
    const bufLen = ctx.sampleRate * 3;
    const buf    = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data   = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1);

    const src  = ctx.createBufferSource();
    src.buffer = buf;
    src.loop   = true;

    const filter = ctx.createBiquadFilter();
    filter.type            = 'bandpass';
    filter.frequency.value = 2400;
    filter.Q.value         = 0.8;

    const gain = ctx.createGain();
    gain.gain.value = 0;

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();

    state.staticNode = src;
    state.staticGain = gain;
  } catch (e) { /* ignore */ }
}

function setStaticVolume(v) {
  if (!state.staticGain) return;
  try {
    state.staticGain.gain.setTargetAtTime(v, getAudioCtx().currentTime, 0.05);
  } catch (e) { /* ignore */ }
}

function stopStatic() {
  try {
    if (state.staticNode) { state.staticNode.stop(); state.staticNode = null; }
    state.staticGain = null;
  } catch (e) { /* ignore */ }
}

/* ------------------------------------------------
   Frequency scale — drawn on canvas
   ------------------------------------------------ */
function drawFreqScale() {
  const canvas = document.getElementById('freq-scale');
  const dpr    = window.devicePixelRatio || 1;
  const rect   = canvas.parentElement.getBoundingClientRect();
  const w      = rect.width;
  const h      = rect.height;

  canvas.width  = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width  = w + 'px';
  canvas.style.height = h + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const numFont  = `${Math.round(8 * dpr) / dpr}px 'Space Mono', monospace`;
  const tickBase = h - 2;

  for (let f = 88; f <= 108; f += 0.2) {
    const x    = ((f - FREQ_MIN) / FREQ_RANGE) * w;
    const fRnd = Math.round(f * 10) / 10;

    const isMajor  = Number.isInteger(f) && f % 2 === 0;
    const isMinor  = Number.isInteger(f);
    const isMid    = Math.abs(fRnd % 1 - 0.5) < 0.01;

    if (isMajor) {
      ctx.strokeStyle = '#3a2e18';
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(x, tickBase);
      ctx.lineTo(x, tickBase - h * 0.72);
      ctx.stroke();

      ctx.fillStyle  = '#3a2e18';
      ctx.font       = numFont;
      ctx.textAlign  = 'center';
      ctx.fillText(String(Math.round(f)), x, tickBase - h * 0.78);

    } else if (isMinor) {
      ctx.strokeStyle = '#8a7a55';
      ctx.lineWidth   = 0.8;
      ctx.beginPath();
      ctx.moveTo(x, tickBase);
      ctx.lineTo(x, tickBase - h * 0.45);
      ctx.stroke();

    } else if (isMid) {
      ctx.strokeStyle = '#b8a880';
      ctx.lineWidth   = 0.6;
      ctx.beginPath();
      ctx.moveTo(x, tickBase);
      ctx.lineTo(x, tickBase - h * 0.28);
      ctx.stroke();

    } else {
      ctx.strokeStyle = '#d0c0a0';
      ctx.lineWidth   = 0.4;
      ctx.beginPath();
      ctx.moveTo(x, tickBase);
      ctx.lineTo(x, tickBase - h * 0.18);
      ctx.stroke();
    }
  }
}

/* ------------------------------------------------
   Needle position
   ------------------------------------------------ */
function setNeedle(freq, animate = true) {
  const pct = ((freq - FREQ_MIN) / FREQ_RANGE) * 100;
  if (!animate) {
    freqNeedle.style.transition = 'none';
    freqNeedle.style.left = `${pct}%`;
    requestAnimationFrame(() => {
      freqNeedle.style.transition = '';
    });
  } else {
    freqNeedle.style.left = `${pct}%`;
  }
}

/* ------------------------------------------------
   Analog VU Meter (needle)
   Angle range: -50° (min) → +55° (max)
   Level 0–10 → angle = -50 + (level/10) * 105
   ------------------------------------------------ */
let vuAngleL  = -50;
let vuAngleR  = -50;
let vuTargetL = -50;
let vuTargetR = -50;
let vuLastChange = 0;

function setNeedleAngle(el, angle) {
  el.setAttribute('transform', `rotate(${angle.toFixed(1)}, 36, 40)`);
}

function tickVU(now) {
  // Change target periodically
  if (now - vuLastChange > 70 + Math.random() * 110) {
    const base = state.powered && state.tuneOffset === 0 ? 6.5 : 0.5;
    const lv = Math.max(0, Math.min(10, base + (Math.random() - 0.38) * 5));
    const rv = Math.max(0, Math.min(10, base + (Math.random() - 0.42) * 5));
    vuTargetL = -50 + (lv / 10) * 105;
    vuTargetR = -50 + (rv / 10) * 105;
    vuLastChange = now;
  }

  // Asymmetric: fast attack, slow decay (analog ballistics)
  const up   = 0.38;
  const down = 0.10;
  vuAngleL += (vuTargetL > vuAngleL ? up : down) * (vuTargetL - vuAngleL);
  vuAngleR += (vuTargetR > vuAngleR ? up : down) * (vuTargetR - vuAngleR);

  setNeedleAngle(vuL, vuAngleL);
  setNeedleAngle(vuR, vuAngleR);

  state.vuAnimId = requestAnimationFrame(tickVU);
}

function startVU() {
  if (state.vuAnimId) return;
  state.vuAnimId = requestAnimationFrame(tickVU);
}

function stopVU() {
  if (state.vuAnimId) { cancelAnimationFrame(state.vuAnimId); state.vuAnimId = null; }
  // Decay needles to minimum
  vuTargetL = -50;
  vuTargetR = -50;
  function decay() {
    vuAngleL += (-50 - vuAngleL) * 0.12;
    vuAngleR += (-50 - vuAngleR) * 0.12;
    setNeedleAngle(vuL, vuAngleL);
    setNeedleAngle(vuR, vuAngleR);
    if (Math.abs(vuAngleL + 50) > 0.3 || Math.abs(vuAngleR + 50) > 0.3) {
      requestAnimationFrame(decay);
    }
  }
  requestAnimationFrame(decay);
}

/* ------------------------------------------------
   Language / i18n
   ------------------------------------------------ */
function applyLang(lang) {
  state.lang = lang;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  if (state.powered) {
    freqSubtitle.textContent = STATION.subtitle[state.lang];
  }
}

window.setRadioLang = applyLang;

/* ------------------------------------------------
   Power on/off sequence
   ------------------------------------------------ */
function powerOn() {
  state.powered = true;
  radio.classList.remove('off');
  radio.classList.add('on');
  powerBtn.classList.add('on');
  playClick();

  // Tubes warm up — staggered
  setTimeout(() => tube1.classList.add('lit'), 300);
  setTimeout(() => tube2.classList.add('lit'), 600);

  // ON AIR light
  setTimeout(() => onAir.classList.add('visible'), 900);

  // Frequency display: needle sweeps in from right
  setTimeout(() => {
    freqNeedle.style.transition = 'left 1.4s cubic-bezier(0.25, 0.1, 0.08, 1.0)';
    freqNeedle.style.left = (STATION_POS * 100) + '%';
  }, 700);

  // Static fades in while tuning
  startStatic();
  setTimeout(() => setStaticVolume(0.04), 800);

  // Station info appears after needle arrives
  setTimeout(() => {
    freqNumber.textContent   = STATION.freq;
    freqStation.textContent  = STATION.name;
    freqSubtitle.textContent = STATION.subtitle[state.lang];
  }, 1900);

  // Start YouTube, fade out static
  setTimeout(() => {
    if (ytReady && ytPlayer) {
      ytPlayer.setVolume(0);
      const pl = ytPlayer.getPlaylist();
      if (pl && pl.length > 1) {
        ytPlayer.playVideoAt(Math.floor(Math.random() * pl.length));
      } else {
        ytPlayer.playVideo();
      }
      // Ramp volume up
      let vol = 0;
      const ramp = setInterval(() => {
        vol = Math.min(state.volume, vol + 3);
        ytPlayer.setVolume(vol);
        if (vol >= state.volume) clearInterval(ramp);
      }, 80);
    }
    setStaticVolume(0);
  }, 2200);

  // VU meters start
  setTimeout(startVU, 2000);
}

function powerOff() {
  state.powered = false;
  radio.classList.remove('on');
  radio.classList.add('off');
  powerBtn.classList.remove('on');
  playClick();

  // Fade out YouTube
  if (ytReady && ytPlayer) {
    let vol = state.volume;
    const fade = setInterval(() => {
      vol = Math.max(0, vol - 8);
      ytPlayer.setVolume(vol);
      if (vol <= 0) { ytPlayer.pauseVideo(); clearInterval(fade); }
    }, 60);
  }

  // VU off immediately
  stopVU();

  // Static blip as things shut down
  setStaticVolume(0.05);
  setTimeout(() => setStaticVolume(0), 300);

  // Tubes cool
  setTimeout(() => tube1.classList.remove('lit'), 200);
  setTimeout(() => tube2.classList.remove('lit'), 500);

  // ON AIR off
  setTimeout(() => onAir.classList.remove('visible'), 100);

  // Clear station display
  setTimeout(() => {
    freqStation.textContent  = '— — —';
    freqSubtitle.textContent = ' ';
    freqNumber.textContent   = '—.—';
  }, 300);

  // Needle sweeps back to far right (signal lost)
  setTimeout(() => {
    freqNeedle.style.transition = 'left 0.6s ease-in';
    freqNeedle.style.left = '90%';
  }, 100);
}

powerBtn.addEventListener('click', () => {
  if (state.powered) powerOff(); else powerOn();
});

/* ------------------------------------------------
   Knob interaction
   ------------------------------------------------ */
class KnobControl {
  constructor(el, { defaultVal = 50, onChange, onDragEnd } = {}) {
    this.el       = el;
    this.dot      = el.querySelector('.knob-dot');
    this.value    = defaultVal; // 0–100
    this.onChange = onChange;
    this.onDragEnd = onDragEnd;

    this._dragging  = false;
    this._startY    = 0;
    this._startVal  = 0;
    this._sensitivity = 0.55;

    this._onDown  = this._onDown.bind(this);
    this._onMove  = this._onMove.bind(this);
    this._onUp    = this._onUp.bind(this);

    el.addEventListener('pointerdown', this._onDown);
    el.addEventListener('pointermove', this._onMove);
    el.addEventListener('pointerup',   this._onUp);
    el.addEventListener('pointercancel', this._onUp);

    // Scroll wheel support
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -2 : 2;
      this.setValue(this.value + delta);
      this.onChange?.(this.value);
    }, { passive: false });

    this.render();
  }

  _onDown(e) {
    e.preventDefault();
    this._dragging = true;
    this._startY   = e.clientY;
    this._startVal = this.value;
    this.el.setPointerCapture(e.pointerId);
  }

  _onMove(e) {
    if (!this._dragging) return;
    const dy    = this._startY - e.clientY;
    const delta = dy * this._sensitivity;
    this.setValue(this._startVal + delta);
    this.onChange?.(this.value);
  }

  _onUp() {
    if (!this._dragging) return;
    this._dragging = false;
    this.onDragEnd?.(this.value);
  }

  setValue(v) {
    this.value = Math.max(0, Math.min(100, v));
    this.render();
  }

  render() {
    if (!this.dot) return;
    // Map 0–100 → -135° to +135°
    const angle = -135 + (this.value / 100) * 270;
    this.dot.setAttribute('transform', `rotate(${angle}, 50, 50)`);
  }
}

/* Tuning arc update */
function updateTuningArc(val) {
  // Show arc only when not at 0 (off-station)
  // This is decorative — just show position
  tuningArc.setAttribute('opacity', '0.3');
}

/* Volume arc update — arc grows with volume */
function updateVolumeArc(val) {
  // Animate arc path based on volume 0–100
  // Full arc goes from ~225° to ~315° (270° sweep, starting bottom-left)
  // We'll just pulse opacity to reflect level
  const opacity = 0.15 + (val / 100) * 0.7;
  volumeArc.setAttribute('opacity', opacity.toFixed(2));
}

/* Knob for small SVG — dot origin is different */
class KnobControlSm extends KnobControl {
  render() {
    if (!this.dot) return;
    const angle = -135 + (this.value / 100) * 270;
    this.dot.setAttribute('transform', `rotate(${angle}, 36, 36)`);
  }
}

const tuning = new KnobControl(tuningKnob, {
  defaultVal: 50,
  onChange: (val) => {
    if (!state.powered) return;
    const offset = (val - 50) / 50; // -1 to 1
    state.tuneOffset = offset;
    updateTuningArc(val);

    const freq  = STATION_FREQ + offset * 10;
    const disp  = freq.toFixed(1);
    freqNumber.textContent = disp;

    const absOff = Math.abs(offset);

    // Move needle
    setNeedle(freq, false);

    // Static volume increases with offset
    const staticVol = absOff * 0.12;
    setStaticVolume(staticVol);

    // YouTube volume fades
    if (ytReady && ytPlayer) {
      const ytVol = Math.round(state.volume * Math.max(0, 1 - absOff * 2.5));
      ytPlayer.setVolume(ytVol);
    }

    // Station display dims when off-station
    if (absOff > 0.15) {
      freqStation.classList.add('dim');
      freqSubtitle.classList.add('dim');
    } else {
      freqStation.classList.remove('dim');
      freqSubtitle.classList.remove('dim');
    }
  },
  onDragEnd: () => {
    // Spring back to station
    if (!state.powered) return;
    const startVal = tuning.value;
    const targetVal = 50;
    const startTime = performance.now();
    const duration  = 700;

    function spring(now) {
      const t  = Math.min((now - startTime) / duration, 1);
      const et = 1 - Math.pow(1 - t, 3);
      const v  = startVal + (targetVal - startVal) * et;
      tuning.setValue(v);
      state.tuneOffset = (v - 50) / 50;

      const freq = STATION_FREQ + state.tuneOffset * 10;
      freqNumber.textContent = freq.toFixed(1);
      setNeedle(freq, false);

      const absOff = Math.abs(state.tuneOffset);
      setStaticVolume(absOff * 0.12);
      if (ytReady && ytPlayer) {
        const ytVol = Math.round(state.volume * Math.max(0, 1 - absOff * 2.5));
        ytPlayer.setVolume(ytVol);
      }

      if (absOff < 0.05) {
        freqStation.classList.remove('dim');
        freqSubtitle.classList.remove('dim');
      }

      if (t < 1) requestAnimationFrame(spring);
      else {
        // Locked on
        tuning.setValue(50);
        setNeedle(STATION_FREQ, true);
        freqNumber.textContent = STATION.freq;
        setStaticVolume(0);
        if (ytReady && ytPlayer) ytPlayer.setVolume(state.volume);
        freqStation.classList.remove('dim');
        freqSubtitle.classList.remove('dim');
      }
    }
    requestAnimationFrame(spring);
  }
});

const volume = new KnobControlSm(volumeKnob, {
  defaultVal: 75,
  onChange: (val) => {
    state.volume = val;
    updateVolumeArc(val);
    if (ytReady && ytPlayer && state.powered && state.tuneOffset === 0) {
      ytPlayer.setVolume(Math.round(val));
    }
  }
});

// Init volume arc
updateVolumeArc(75);

/* ------------------------------------------------
   Init
   ------------------------------------------------ */
function init() {
  // Init needle positions at minimum
  setNeedleAngle(vuL, -50);
  setNeedleAngle(vuR, -50);

  // Draw frequency scale (after layout)
  requestAnimationFrame(() => {
    drawFreqScale();
    // Position needle off-screen right initially
    setNeedle(FREQ_MAX - 1, false);
  });

  // Start in off state
  radio.classList.add('off');

  // Redraw scale on resize
  const ro = new ResizeObserver(() => drawFreqScale());
  ro.observe(document.getElementById('freq-scale').parentElement);
}

init();

/* ------------------------------------------------
   Install / Add to Home Screen
   ------------------------------------------------ */
(function () {
  const btn   = document.getElementById('install-btn');
  const modal = document.getElementById('install-modal');
  const close = document.getElementById('install-modal-close');
  const steps = document.getElementById('install-steps');

  function platform() {
    const ua = navigator.userAgent;
    if (/android/i.test(ua))                    return 'android';
    if (/iphone|ipad|ipod/i.test(ua))           return 'ios';
    if (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return 'ios'; // iPad desktop mode
    return 'desktop';
  }

  const INSTRUCTIONS = {
    ios: [
      { n: '1', text: 'Open this page in <em>Safari</em> (not Chrome).' },
      { n: '2', text: 'Tap the <em>Share</em> button — the box with an arrow pointing up at the bottom of your screen.' },
      { n: '3', text: 'Scroll down and tap <em>Add to Home Screen</em>.' },
      { n: '4', text: 'Tap <em>Add</em> — the radio will appear as an app on your home screen.' },
    ],
    android: [
      { n: '1', text: 'Open this page in <em>Chrome</em>.' },
      { n: '2', text: 'Tap the <em>⋮</em> menu in the top-right corner.' },
      { n: '3', text: 'Tap <em>Add to Home Screen</em> or <em>Install App</em>.' },
      { n: '4', text: 'Tap <em>Add</em> — the radio will appear on your home screen.' },
    ],
    desktop: [
      { n: '1', text: 'On your phone, open <em>maritzaida.com/radio</em> in Safari (iPhone) or Chrome (Android).' },
      { n: '2', text: '<em>iPhone:</em> tap Share → Add to Home Screen.' },
      { n: '3', text: '<em>Android:</em> tap ⋮ → Add to Home Screen.' },
      { n: '4', text: 'The radio will appear as an app icon on your home screen.' },
    ],
  };

  function buildSteps(p) {
    steps.innerHTML = '';
    INSTRUCTIONS[p].forEach(({ n, text }) => {
      const step = document.createElement('div');
      step.className = 'install-step';
      step.innerHTML = `<div class="install-step-num">${n}</div><div class="install-step-text">${text}</div>`;
      steps.appendChild(step);
    });
  }

  btn.addEventListener('click', () => {
    buildSteps(platform());
    modal.classList.add('open');
  });

  close.addEventListener('click', () => modal.classList.remove('open'));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('open');
  });
})();
