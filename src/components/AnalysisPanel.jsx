import React, { useMemo } from 'react';

export default function AnalysisPanel({ samples = [] }) {
  const stats = useMemo(() => {
    const arr = samples.length ? samples : [0.12, 0.18, 0.22, 0.30, 0.28, 0.24, 0.20, 0.15, 0.10];
    const n = arr.length;
    const sum = arr.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const peak = Math.max(...arr);
    let left = 0, right = 0;
    arr.forEach((v, i) => {
      if (i < n / 2) left += v; else right += v;
    });
    const balance = left + right === 0 ? 0.5 : left / (left + right);
    return { mean, peak, balance };
  }, [samples]);

  const pct = (x) => (x * 100).toFixed(1) + '%';

  return (
    <section className="rounded-2xl bg-slate-900/80 ring-1 ring-white/10 p-6">
      <h3 className="text-white text-xl font-semibold mb-4">Analysis</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-slate-800/60 p-4">
          <div className="text-slate-400 text-sm">Average Load</div>
          <div className="text-white text-2xl font-semibold mt-1">{pct(stats.mean)}</div>
          <div className="h-2 bg-slate-700 rounded mt-3">
            <div className="h-2 bg-cyan-400 rounded" style={{ width: pct(stats.mean) }} />
          </div>
        </div>
        <div className="rounded-xl bg-slate-800/60 p-4">
          <div className="text-slate-400 text-sm">Peak Pressure</div>
          <div className="text-white text-2xl font-semibold mt-1">{pct(stats.peak)}</div>
          <div className="h-2 bg-slate-700 rounded mt-3">
            <div className="h-2 bg-fuchsia-400 rounded" style={{ width: pct(stats.peak) }} />
          </div>
        </div>
        <div className="rounded-xl bg-slate-800/60 p-4">
          <div className="text-slate-400 text-sm">Left/Right Balance</div>
          <div className="text-white text-2xl font-semibold mt-1">{(stats.balance * 100).toFixed(0)}% L</div>
          <div className="h-2 bg-slate-700 rounded mt-3 flex">
            <div className="h-2 bg-emerald-400 rounded-l" style={{ width: pct(stats.balance) }} />
            <div className="h-2 bg-rose-400 rounded-r" style={{ width: pct(1 - stats.balance) }} />
          </div>
        </div>
      </div>
      <p className="text-slate-400 text-sm mt-4">
        These metrics help quantify stance stability, weight transfer, and load peaks across swing phases.
      </p>
    </section>
  );
}
