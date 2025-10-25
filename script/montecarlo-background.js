// === Gordian Knot Capital Monte Carlo Background ===
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Responsive canvas
function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Simulation parameters
const nPaths = 25;      // fewer paths for cleaner look
const nSteps = 180;
const mu = 0.04;
const sigma = 0.22;
const S0 = 600;

// Gaussian random generator
function randn_bm() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Generate simulated paths
let paths = [];
for (let i = 0; i < nPaths; i++) {
  let path = [S0];
  for (let j = 1; j < nSteps; j++) {
    const Z = randn_bm();
    const dS = path[j - 1] + path[j - 1] * ((mu / nSteps) + sigma * Z / Math.sqrt(nSteps));
    path.push(dS);
  }
  paths.push(path);
}

// Animation setup
let step = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Spread + positioning
  const xScale = canvas.width / nSteps;
  const yScale = canvas.height / 480;
  const yOffset = canvas.height / 2.2; // lift starting point higher

  ctx.globalAlpha = 0.5;

  for (let p = 0; p < paths.length; p++) {
    ctx.beginPath();

    // Soft teal-blue gradient stroke per path
    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grad.addColorStop(0, "rgba(45, 212, 191, 0.6)");  // accent teal-light
    grad.addColorStop(1, "rgba(60, 189, 248, 0.4)");  // soft cyan-blue
    ctx.strokeStyle = grad;

    ctx.lineWidth = 1.6; // thicker lines

    for (let i = 0; i < Math.min(step, nSteps); i++) {
      const x = i * xScale;
      const y = yOffset - (paths[p][i] - S0) * yScale * 0.45; // broader vertical movement
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  if (step < nSteps) step += 1;
  requestAnimationFrame(animate);
}

animate();
