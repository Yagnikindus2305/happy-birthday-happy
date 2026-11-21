// ==========================================
// TIME LOCK CONTROLLER (COUNTDOWN TO NOV 22, 2026 00:00:00)
// ==========================================
// Target: November 22, 2026 at 00:00:00 (Month 10 in JS = November)
const TARGET_TIME = new Date(2026, 10, 22, 0, 0, 0).getTime();

const cdHours = document.getElementById('cdHours');
const cdMinutes = document.getElementById('cdMinutes');
const cdSeconds = document.getElementById('cdSeconds');
const tryUnlockBtn = document.getElementById('tryUnlockBtn');
const lockShield = document.getElementById('lockShield');
const lockAlert = document.getElementById('lockAlert');

// Soft Web Audio Buzzer
function playBuzzTone() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    // Audio context fallback
  }
}

function updateCountdown() {
  const now = new Date().getTime();
  const diff = TARGET_TIME - now;

  if (diff <= 0) {
    // When time hits 12:00:00 AM, automatically redirect to the unlocked experience!
    if (window.confetti) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    }
    setTimeout(() => {
      window.location.href = 'unlocked.html';
    }, 1000);
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
  if (cdMinutes) cdMinutes.textContent = String(minutes).padStart(2, '0');
  if (cdSeconds) cdSeconds.textContent = String(seconds).padStart(2, '0');
}

// Run immediately & start interval
updateCountdown();
setInterval(updateCountdown, 1000);

// Early unlock funny warnings
const denyMessages = [
  "🚨 Nice try, Cartoon! No peeking before midnight! 🤪",
  "🔒 Security Alarm: Cartoon detected attempting an early breach! 🚔",
  "⏳ Patience, Garba Queen! Good things come at 12:00 sharp! 💃",
  "🙅 Access strictly denied until Nov 22! Go watch cartoons till then! 😂",
  "🛑 Hold your horses! Only few hours left, you got this! ✨"
];
let denyIdx = 0;

if (tryUnlockBtn) {
  tryUnlockBtn.addEventListener('click', () => {
    if (lockShield) lockShield.classList.add('shaking');
    playBuzzTone();

    if (lockAlert) {
      lockAlert.innerHTML = denyMessages[denyIdx % denyMessages.length];
      lockAlert.classList.remove('hidden');
    }
    denyIdx++;

    setTimeout(() => {
      if (lockShield) lockShield.classList.remove('shaking');
    }, 450);
  });
}

// Ambient floating bubbles/balloons
const ambientLayer = document.getElementById('ambientLayer');
const colors = ['#ff007f', '#ffd166', '#00ff88', '#00d2d3', '#a29bfe'];

function spawnBalloon() {
  if (!ambientLayer) return;
  const b = document.createElement('div');
  b.className = 'ambient-balloon';
  b.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  b.style.left = `${Math.random() * 90 + 5}vw`;
  b.style.animationDuration = `${Math.random() * 6 + 9}s`;
  ambientLayer.appendChild(b);
  setTimeout(() => { if (b.parentElement) b.remove(); }, 16000);
}

setInterval(spawnBalloon, 4000);
for (let i = 0; i < 3; i++) {
  setTimeout(spawnBalloon, i * 800);
}
