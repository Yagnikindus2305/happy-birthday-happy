// ==========================================
// 1. STAGES & NAVIGATION
// ==========================================
const boxStage = document.getElementById('boxStage');
const celebrationStage = document.getElementById('celebrationStage');
const garbaModeBtn = document.getElementById('garbaModeBtn');
const resetBtn = document.getElementById('resetBtn');

// ==========================================
// 2. WEB AUDIO API SYNTHESIZER
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.3, volume = 0.15) {
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio note error", e);
    }
  }

  playPop() {
    this.playTone(520, 'sine', 0.08, 0.18);
    setTimeout(() => this.playTone(920, 'triangle', 0.1, 0.14), 25);
  }

  playFanfare() {
    const notes = [261, 329, 392, 523, 659, 784];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.4, 0.2), idx * 90);
    });
  }

  playWishChime() {
    const notes = [523, 659, 784, 1046, 1318];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.6, 0.22), idx * 110);
    });
  }

  toggleMelody(btn) {
    this.init();
    if (this.isPlayingMusic) {
      this.stopMelody(btn);
    } else {
      this.startMelody(btn);
    }
  }

  startMelody(btn) {
    this.isPlayingMusic = true;
    btn.classList.add('playing');
    btn.querySelector('.label').textContent = 'Pause Music';

    // Cheerful Happy Birthday Chime Melody
    const melody = [
      [264, 0.75], [264, 0.25], [297, 1], [264, 1], [352, 1], [330, 2],
      [264, 0.75], [264, 0.25], [297, 1], [264, 1], [396, 1], [352, 2],
      [264, 0.75], [264, 0.25], [528, 1], [440, 1], [352, 1], [330, 1], [297, 1],
      [466, 0.75], [466, 0.25], [440, 1], [352, 1], [396, 1], [352, 2.5]
    ];

    let idx = 0;
    const tempo = 440;

    const tick = () => {
      if (!this.isPlayingMusic) return;
      const [freq, beats] = melody[idx];
      this.playTone(freq, 'sine', (beats * tempo) / 1000 * 0.9, 0.12);

      this.musicTimer = setTimeout(() => {
        idx = (idx + 1) % melody.length;
        tick();
      }, beats * tempo);
    };

    tick();
  }

  stopMelody(btn) {
    this.isPlayingMusic = false;
    clearTimeout(this.musicTimer);
    btn.classList.remove('playing');
    btn.querySelector('.label').textContent = 'Play Birthday Beat';
  }
}

const sound = new SoundFX();


// ==========================================
// 3. UNBOXING REVEAL
// ==========================================
const giftBoxContainer = document.getElementById('giftBoxContainer');

function openMysteryBox() {
  if (giftBoxContainer.classList.contains('unwrapping')) return;

  giftBoxContainer.classList.add('unwrapping');
  sound.playFanfare();

  if (window.confetti) {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      confetti({ particleCount: 90, angle: 60, spread: 60, origin: { x: 0 } });
      confetti({ particleCount: 90, angle: 120, spread: 60, origin: { x: 1 } });
    }, 280);
  }

  setTimeout(() => {
    boxStage.classList.add('hidden');
    celebrationStage.classList.remove('hidden');
    resetBtn.classList.remove('hidden');
    garbaModeBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initScratchCard();
  }, 850);
}

giftBoxContainer.addEventListener('click', openMysteryBox);
giftBoxContainer.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openMysteryBox();
  }
});

resetBtn.addEventListener('click', () => {
  celebrationStage.classList.add('hidden');
  resetBtn.classList.add('hidden');
  giftBoxContainer.classList.remove('unwrapping');
  boxStage.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ==========================================
// 4. CAKE CANDLES BLOW-OUT
// ==========================================
const cakeInteractive = document.getElementById('cakeInteractive');
const blowBtn = document.getElementById('blowBtn');
const flames = [document.getElementById('flame1'), document.getElementById('flame2'), document.getElementById('flame3')];
const smokes = [document.getElementById('smoke1'), document.getElementById('smoke2'), document.getElementById('smoke3')];
let blown = false;

function extinguishCandles() {
  if (blown) return;
  blown = true;

  flames.forEach(f => f.classList.add('extinguished'));
  smokes.forEach(s => s.classList.add('active'));

  sound.playWishChime();
  blowBtn.textContent = '✨ WISH MADE! HAPPY BIRTHDAY CARTOON! ✨';
  blowBtn.classList.add('done');

  if (window.confetti) {
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }
}

cakeInteractive.addEventListener('click', extinguishCandles);
blowBtn.addEventListener('click', extinguishCandles);


// ==========================================
// 5. CARTOON ROAST & COMPLIMENT MACHINE
// ==========================================
const roastDisplay = document.getElementById('roastDisplay');
const nextRoastBtn = document.getElementById('nextRoastBtn');

const cartoonFacts = [
  "Scientifically proven to have the most expressive face and loudest laugh in any room! 😂✨",
  "Warning: Engaging in bak-bak with Cartoon may cause severe loss of track of time! 🗣️⏳",
  "Certified Garba Queen: When the dhol drops, normal human physics no longer applies to her! 💃🔥",
  "They say negative & positive attract... thank God, because who else could handle all this drama?! 🧲❤️",
  "Ability to turn a 2-minute normal story into a 45-minute Bollywood thriller! 🎭🍿",
  "Never pretend you understand her mood swings, just nod, smile, and order snacks! 🍕🥤",
  "The rarest post-school blessing: someone genuinely understanding, loyal, and 100% real. ✨",
  "Diagnosis: Terminal Cartoon Syndrome (Curable only by unlimited compliments & food). 🩺🤪"
];
let lastRoastIdx = 0;

nextRoastBtn.addEventListener('click', () => {
  let newIdx;
  do {
    newIdx = Math.floor(Math.random() * cartoonFacts.length);
  } while (newIdx === lastRoastIdx);
  lastRoastIdx = newIdx;

  roastDisplay.style.transform = 'scale(0.95)';
  setTimeout(() => {
    roastDisplay.textContent = `"${cartoonFacts[newIdx]}"`;
    roastDisplay.style.transform = 'scale(1)';
    sound.playTone(580, 'sine', 0.15, 0.12);
  }, 150);
});


// ==========================================
// 6. PHOTO MODAL ZOOMING
// ==========================================
const photoFrames = document.querySelectorAll('.polaroid-frame');
const photoModal = document.getElementById('photoModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');

photoFrames.forEach(frame => {
  frame.addEventListener('click', () => {
    const src = frame.getAttribute('data-src');
    const cap = frame.getAttribute('data-caption');
    modalImg.src = src;
    modalCaption.textContent = cap;
    photoModal.classList.add('active');
    sound.playTone(550, 'sine', 0.15, 0.1);
  });
});

function closeModal() {
  photoModal.classList.remove('active');
}
modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);


// ==========================================
// 7. WAX SEALED ENVELOPE
// ==========================================
const envelopeBox = document.getElementById('envelopeBox');
const envelopeTip = document.getElementById('envelopeTip');

envelopeBox.addEventListener('click', () => {
  envelopeBox.classList.toggle('open');
  sound.playTone(400, 'triangle', 0.2, 0.15);

  if (envelopeBox.classList.contains('open')) {
    envelopeTip.textContent = '✨ Tap again to close the letter';
    if (window.confetti) {
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
    }
  } else {
    envelopeTip.textContent = '✉️ Tap the envelope to unseal and read';
  }
});


// ==========================================
// 8. SCRATCH CARD
// ==========================================
let scratchDone = false;

function initScratchCard() {
  if (scratchDone) return;
  scratchDone = true;

  const canvas = document.getElementById('scratchCanvas');
  const ctx = canvas.getContext('2d');
  const status = document.getElementById('scratchStatus');
  let isDown = false;
  let revealed = false;

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#bdc3c7');
  gradient.addColorStop(0.3, '#ecf0f1');
  gradient.addColorStop(0.6, '#95a5a6');
  gradient.addColorStop(1, '#7f8c8d');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#2c3e50';
  ctx.font = 'bold 15px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✨ SCRATCH WITH MOUSE / FINGER ✨', canvas.width / 2, canvas.height / 2 - 5);
  ctx.font = '12px Outfit, sans-serif';
  ctx.fillStyle = '#555';
  ctx.fillText('Uncover Cartoon\'s Special Reward!', canvas.width / 2, canvas.height / 2 + 18);

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function doScratch(e) {
    if (!isDown || revealed) return;
    const pos = getPos(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkFoil();
  }

  function checkFoil() {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) clear++;
    }
    const pct = Math.round((clear / (data.length / 16)) * 100);
    status.textContent = `Scratch to reveal: ${pct}% uncovered`;

    if (pct > 45 && !revealed) {
      revealed = true;
      status.innerHTML = '🎉 <strong>100% UNLOCKED! REWARD GRANTED!</strong>';
      canvas.style.transition = 'opacity 0.6s ease';
      canvas.style.opacity = '0';
      setTimeout(() => (canvas.style.pointerEvents = 'none'), 600);

      sound.playTone(660, 'sine', 0.4, 0.2);
      if (window.confetti) {
        confetti({ particleCount: 60, spread: 65, origin: { y: 0.8 } });
      }
    }
  }

  canvas.addEventListener('mousedown', (e) => { isDown = true; doScratch(e); });
  canvas.addEventListener('mousemove', doScratch);
  window.addEventListener('mouseup', () => (isDown = false));

  canvas.addEventListener('touchstart', (e) => { isDown = true; doScratch(e); }, { passive: true });
  canvas.addEventListener('touchmove', doScratch, { passive: true });
  window.addEventListener('touchend', () => (isDown = false));
}


// ==========================================
// 9. GARBA DISCO MODE TOGGLE
// ==========================================
let garbaDisco = false;

garbaModeBtn.addEventListener('click', () => {
  garbaDisco = !garbaDisco;
  document.body.classList.toggle('garba-disco-active', garbaDisco);

  if (garbaDisco) {
    garbaModeBtn.classList.add('playing');
    garbaModeBtn.querySelector('.label').textContent = 'Exit Garba Mode';
    sound.playTone(784, 'triangle', 0.3, 0.25);
    if (window.confetti) {
      confetti({ particleCount: 50, spread: 80, origin: { y: 0.3 } });
    }
  } else {
    garbaModeBtn.classList.remove('playing');
    garbaModeBtn.querySelector('.label').textContent = 'Garba Disco Mode';
  }
});


// ==========================================
// 10. TAP TO SEND BIRTHDAY LOVE
// ==========================================
const loveTapBtn = document.getElementById('loveTapBtn');
const loveBadge = document.getElementById('loveBadge');
let loveCount = 0;
const heartSymbols = ['💖', '❤️', '💃', '✨', '⭐', '🎈'];

loveTapBtn.addEventListener('click', (e) => {
  loveCount++;
  loveBadge.textContent = loveCount;
  sound.playPop();

  const heart = document.createElement('div');
  heart.className = 'floating-love-heart';
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = `${e.clientX - 15}px`;
  heart.style.top = `${e.clientY - 15}px`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1400);
});


// ==========================================
// 11. AMBIENT POP-ABLE BALLOONS
// ==========================================
const ambientLayer = document.getElementById('ambientLayer');
const colors = ['#ff007f', '#ffd166', '#00ff88', '#00d2d3', '#a29bfe', '#ff4757'];

function spawnBalloon() {
  const b = document.createElement('div');
  b.className = 'ambient-balloon';
  b.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  b.style.left = `${Math.random() * 90 + 5}vw`;
  b.style.animationDuration = `${Math.random() * 6 + 9}s`;

  b.addEventListener('click', (e) => {
    sound.playPop();
    if (window.confetti) {
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      });
    }
    b.remove();
  });

  ambientLayer.appendChild(b);
  setTimeout(() => { if (b.parentElement) b.remove(); }, 16000);
}

setInterval(spawnBalloon, 3500);
for (let i = 0; i < 4; i++) {
  setTimeout(spawnBalloon, i * 700);
}

// Audio Button
const musicToggleBtn = document.getElementById('musicToggleBtn');
musicToggleBtn.addEventListener('click', () => {
  sound.toggleMelody(musicToggleBtn);
});
