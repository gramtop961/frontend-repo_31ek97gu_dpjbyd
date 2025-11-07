import React, { useMemo } from 'react';

// Simple pressure heatmap grid with legend
export default function PressureMap({ data = [] }) {
  // data is an array of numbers 0..1 representing relative pressure
  const normalized = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      // default foot-shaped gradient-ish map (left-heavy forefoot, heel)
      const template = [
        0.05, 0.08, 0.10, 0.12, 0.10, 0.08,
        0.06, 0.10, 0.18, 0.22, 0.16, 0.10,
        0.04, 0.12, 0.26, 0.32, 0.22, 0.12,
        0.03, 0.10, 0.24, 0.30, 0.24, 0.14,
        0.02, 0.08, 0.18, 0.22, 0.20, 0.12,
        0.01, 0.06, 0.10, 0.14, 0.16, 0.10,
        0.02, 0.08, 0.12, 0.18, 0.22, 0.16,
        0.06, 0.12, 0.16, 0.24, 0.32, 0.28,
      ];
      return template;
    }
    return data.map((v) => Math.max(0, Math.min(1, v)));
  }, [data]);

  const max = Math.max(...normalized);

  const cellColor = (v) => {
    const t = max === 0 ? 0 : v / max; // normalize 0..1
    // blue -> cyan -> lime -> yellow -> red
    const r = Math.round(255 * Math.max(0, (t - 0.6) / 0.4));
    const g = Math.round(255 * (t < 0.5 ? t / 0.5 : 1 - (t - 0.5) / 0.5));
    const b = Math.round(255 * (1 - t));
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <section className="w-full grid md:grid-cols-5 gap-6">
      <div className="md:col-span-3 rounded-2xl bg-slate-900/80 ring-1 ring-white/10 p-6">
        <h3 className="text-white text-xl font-semibold mb-3">Pressure Map</h3>
        <p className="text-slate-300/80 mb-4">Heatmap of plantar pressure across the insole surface.</p>
        <div className="aspect-[3/4] w-full max-w-md mx-auto grid grid-cols-6 gap-0.5 bg-slate-800 p-1 rounded-lg">
          {normalized.map((v, i) => (
            <div
              key={i}
              className="rounded-[2px]"
              style={{ backgroundColor: cellColor(v) }}
            />
          ))}
        </div>
      </div>

      <div className="md:col-span-2 rounded-2xl bg-slate-900/80 ring-1 ring-white/10 p-6 flex flex-col">
        <h3 className="text-white text-xl font-semibold mb-3">Legend</h3>
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: 'rgb(0, 255, 255)' }} />
          <span className="text-slate-300 text-sm">Low</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: 'rgb(255, 255, 0)' }} />
          <span className="text-slate-300 text-sm">Medium</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: 'rgb(255, 0, 0)' }} />
          <span className="text-slate-300 text-sm">High</span>
        </div>
        <div className="mt-6 text-slate-400 text-sm">
          Tip: Use this to analyze stance, weight transfer, and peak loads during swing phases.
        </div>
      </div>
    </section>
  );
}
