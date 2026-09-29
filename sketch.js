// ─── Parameters (easy to modify) ─────────────────────────────────────────────

const params = {
  speed: 1.0,                    // animation cycles per second
  height: 40,                    // max vertical displacement in pixels
  color6: { r: 0, g: 0, b: 0 }, // color for "6" (RGB 0–255)
  color7: { r: 0, g: 0, b: 0 }, // color for "7" (RGB 0–255)
};

// ─── Tweakpane v3 setup ───────────────────────────────────────────────────────

const pane = new Tweakpane.Pane({ title: "6 7 controls" });

pane.addInput(params, "speed", {
  label: "Speed",
  min: 0.1,
  max: 4.0,
  step: 0.05,
});

pane.addInput(params, "height", {
  label: "Movement / Height",
  min: 0,
  max: 120,
  step: 1,
});

pane.addInput(params, "color6", { label: 'Color "6"' });
pane.addInput(params, "color7", { label: 'Color "7"' });

// ─── p5.js sketch ─────────────────────────────────────────────────────────────

const FONT_SIZE = 160;   // base font size for the numbers
const GAP = 60;          // horizontal gap between the two numbers

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(FONT_SIZE);
  textStyle(NORMAL);
  noStroke();
}

function draw() {
  background(255);

  // Shared sine wave — drives the coordinated motion.
  // millis() keeps the animation time-based rather than frame-rate-dependent.
  const t = (millis() / 1000) * params.speed;
  const wave = sin(TWO_PI * t); // oscillates −1 → +1

  // 6 and 7 move in opposite directions
  const offset6 =  wave * params.height;
  const offset7 = -wave * params.height;

  // Center of canvas
  const cx = width / 2;
  const cy = height / 2;

  // Approximate half-width of one character to place them symmetrically
  const halfCharW = FONT_SIZE * 0.32;

  // Draw "6" with its own color
  fill(params.color6.r, params.color6.g, params.color6.b);
  text("6", cx - halfCharW - GAP / 2, cy + offset6);

  // Draw "7" with its own color
  fill(params.color7.r, params.color7.g, params.color7.b);
  text("7", cx + halfCharW + GAP / 2, cy + offset7);
}

// Keep the canvas full-window when the browser is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
