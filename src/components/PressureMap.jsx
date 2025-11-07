import React, { useMemo } from 'react';

// Aesthetic dual-foot pressure heatmap styled as 3D insoles
// Uses CSS clip-path with smooth gradients and subtle depth.
export default function PressureMap({ leftData, rightData }) {
  // Default hotspots (x, y in 0..100, intensity 0..1)
  const defaultPoints = [
    // heel
    { x: 50, y: 85, v: 0.9 },
    { x: 42, y: 82, v: 0.6 },
    { x: 58, y: 82, v: 0.6 },
    // midfoot
    { x: 50, y: 65, v: 0.45 },
    { x: 44, y: 62, v: 0.35 },
    // forefoot
    { x: 53, y: 38, v: 0.85 },
    { x: 47, y: 40, v: 0.7 },
    { x: 58, y: 35, v: 0.55 },
    // toes/metatarsals
    { x: 50, y: 18, v: 0.5 },
    { x: 57, y: 22, v: 0.35 },
    { x: 43, y: 22, v: 0.35 },
  ];

  const lPoints = useMemo(() => normalizePoints(leftData) ?? defaultPoints, [leftData]);
  const rPoints = useMemo(() => normalizePoints(rightData) ?? mirrorPoints(defaultPoints), [rightData]);

  const leftBg = useMemo(() => buildGradientBackground(lPoints), [lPoints]);
  const rightBg = useMemo(() => buildGradientBackground(rPoints), [rPoints]);

  return (
    <section className="w-full grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-2xl bg-slate-900/80 ring-1 ring-white/10 p-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h3 className="text-white text-xl font-semibold">Pressure Map</h3>
            <p className="text-slate-300/80 text-sm">3D-styled, insole-shaped heatmap for both feet.</p>
          </div>
          <span className="text-xs text-slate-400">Live preview</span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <InsoleCard title="Left Foot" background={leftBg} />
          <InsoleCard title="Right Foot" background={rightBg} />
        </div>
      </div>

      <div className="lg:col-span-1 rounded-2xl bg-slate-900/80 ring-1 ring-white/10 p-6 flex flex-col">
        <h4 className="text-white text-lg font-semibold mb-3">Legend</h4>
        <GradientLegend />
        <ul className="mt-6 space-y-2 text-sm text-slate-300">
          <li>Red: peak load / high pressure</li>
          <li>Yellow: elevated pressure</li>
          <li>Green → Cyan: moderate to low</li>
          <li>Blue: minimal contact</li>
        </ul>
        <div className="mt-6 text-slate-400 text-sm">
          Tip: Compare heel strike vs. forefoot load to assess gait and balance.
        </div>
      </div>
    </section>
  );
}

function InsoleCard({ title, background }) {
  return (
    <div className="rounded-xl bg-slate-950/40 ring-1 ring-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-200 font-medium">{title}</span>
        <span className="text-[10px] text-slate-400">Normalized</span>
      </div>

      <div className="relative mx-auto w-full max-w-sm aspect-[2.6/7]">
        <div
          className="absolute inset-0 rounded-[28px] shadow-2xl"
          style={{
            // Insole silhouette via CSS path; tweak for nice curvature
            clipPath: `path('M50 5 C35 10, 28 18, 26 27 C24 36, 26 45, 28 54 C30 63, 30 72, 28 80 C26 88, 30 93, 36 95 C42 97, 58 97, 64 95 C70 93, 74 88, 72 80 C70 72, 70 63, 72 54 C74 45, 76 36, 74 27 C72 18, 65 10, 50 5 Z')`,
            background,
          }}
        />
        {/* depth & highlight overlays */}
        <div className="pointer-events-none absolute inset-0 rounded-[28px]" style={{
          clipPath: `path('M50 5 C35 10, 28 18, 26 27 C24 36, 26 45, 28 54 C30 63, 30 72, 28 80 C26 88, 30 93, 36 95 C42 97, 58 97, 64 95 C70 93, 74 88, 72 80 C70 72, 70 63, 72 54 C74 45, 76 36, 74 27 C72 18, 65 10, 50 5 Z')`,
          background:
            'radial-gradient(120% 80% at 50% 30%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%)',
          boxShadow:
            'inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -8px 24px rgba(0,0,0,0.45)',
          }} />
      </div>

      <div className="mt-3 flex justify-center gap-6 text-xs text-slate-400">
        <span className="inline-flex items-center gap-2"><Dot color={heatColor(0)} /> Low</span>
        <span className="inline-flex items-center gap-2"><Dot color={heatColor(0.5)} /> Mid</span>
        <span className="inline-flex items-center gap-2"><Dot color={heatColor(1)} /> High</span>
      </div>
    </div>
  );
}

function Dot({ color }) {
  return <span className="h-3 w-3 rounded-full inline-block" style={{ background: color }} />;
}

function GradientLegend() {
  return (
    <div className="w-full h-3 rounded-full overflow-hidden ring-1 ring-white/10 bg-slate-800">
      <div
        className="h-full w-full"
        style={{
          background:
            'linear-gradient(90deg, ' +
            `${heatColor(0)} 0%, ${heatColor(0.25)} 25%, ${heatColor(0.5)} 50%, ${heatColor(0.75)} 75%, ${heatColor(1)} 100%)`,
        }}
      />
      <div className="mt-2 flex justify-between text-[10px] text-slate-400">
        <span>Low</span><span>Medium</span><span>High</span>
      </div>
    </div>
  );
}

// Build a composite background using multiple radial gradients
function buildGradientBackground(points) {
  if (!points || points.length === 0) return 'linear-gradient(180deg, #0ea5e9, #1e293b)';

  // soft base cloth color to fill empty areas
  const layers = [
    'radial-gradient(100% 80% at 50% 20%, rgba(14,165,233,0.15), rgba(2,6,23,0.25))',
  ];

  // Add a blurred halo for each point, with intensity shaping
  for (const p of points) {
    const c = heatColor(p.v);
    const r1 = 6 + p.v * 10; // inner radius
    const r2 = 16 + p.v * 22; // outer radius
    layers.push(
      `radial-gradient(${r2}% ${r2}% at ${p.x}% ${p.y}%, ${withAlpha(c, 0.85)} 0%, ${withAlpha(
        c,
        0.35
      )} ${r1}%, ${withAlpha(c, 0.08)} 70%, transparent 100%)`
    );
  }

  // Gentle toe-to-heel fade and vignetting for depth
  layers.push(
    'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.25))',
    'radial-gradient(160% 120% at 50% 80%, rgba(0,0,0,0.35), rgba(0,0,0,0))'
  );

  return layers.reverse().join(', ');
}

// Map intensity 0..1 to perceptual heat colors (blue -> cyan -> lime -> yellow -> red)
function heatColor(t) {
  const clamped = Math.max(0, Math.min(1, t));
  const r = Math.round(255 * smoothStep(clamped - 0.55, 0.45));
  const g = Math.round(255 * (clamped < 0.5 ? clamped / 0.5 : 1 - (clamped - 0.5) / 0.45));
  const b = Math.round(255 * (1 - clamped));
  return `rgb(${r}, ${g}, ${b})`;
}

function withAlpha(rgb, a) {
  return rgb.replace('rgb(', 'rgba(').replace(')', `, ${a})`);
}

function smoothStep(x, k) {
  // simple smooth step for nicer ramp to red
  const v = Math.max(0, Math.min(1, x / k));
  return v * v * (3 - 2 * v);
}

function normalizePoints(raw) {
  if (!raw) return null;
  // Accept either array of numbers (grid) or array of {x,y,v}
  if (Array.isArray(raw) && raw.length > 0) {
    if (typeof raw[0] === 'number') {
      // interpret as 6x8 grid similar to previous version, map to insole domain
      const grid = raw;
      const cols = 6;
      const rows = Math.ceil(grid.length / cols);
      const pts = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const v = grid[idx] ?? 0;
          const x = 20 + (c / (cols - 1)) * 60; // margin in clip shape
          const y = 15 + (r / (rows - 1)) * 75;
          pts.push({ x, y, v: clamp01(v) });
        }
      }
      return pts;
    }
    if (typeof raw[0] === 'object') {
      return raw.map((p) => ({ x: clamp01(p.x) * 100, y: clamp01(p.y) * 100, v: clamp01(p.v) }));
    }
  }
  return null;
}

function mirrorPoints(points) {
  // Mirror horizontally around midline 50%
  return points.map((p) => ({ ...p, x: 100 - p.x }));
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
