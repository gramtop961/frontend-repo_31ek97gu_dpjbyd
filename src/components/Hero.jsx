import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 md:p-12 min-h-[620px]">
      <div className="absolute inset-0">
        {mounted && (
          <Spline
            scene="https://prod.spline.design/Z4mFOe-VPbTX4W76/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>

      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-cyan-300/90 bg-cyan-300/10 ring-1 ring-cyan-300/20 px-2.5 py-1 rounded-full w-max">
          3D Interactive
        </span>
        <h1 className="mt-3 text-3xl md:text-5xl font-semibold text-white leading-tight">
          Futuristic Smart Insole Analytics
        </h1>
        <p className="mt-4 text-slate-300 md:text-lg max-w-prose">
          Experience a glossy, minimal 3D world. Explore our ML-powered system that turns plantar pressure into
          actionable insights for balance, stance, and swing.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <a href="#pressure" className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium transition">
            View Pressure Map
          </a>
          <a href="#insole3d" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition">
            Explore 3D Insole
          </a>
        </div>
      </div>

      {/* Non-blocking overlays to enhance contrast without blocking interactions */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-950 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="absolute right-[-10%] top-[10%] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-[-10%] bottom-[10%] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>
    </section>
  );
}
