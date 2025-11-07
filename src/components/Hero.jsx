import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12">
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
          ML-powered Smart Insoles for Data-Driven Golf Training
        </h1>
        <p className="mt-4 text-slate-300 md:text-lg">
          Visualize pressure, balance, and motion in real-time with sensor-dense insoles and AI insights.
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

      <div className="absolute inset-0">
        {mounted && (
          <Spline
            scene="https://prod.spline.design/8d8oP0dZ2eR5wCjA/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-900 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
      </div>
    </section>
  );
}
