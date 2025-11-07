import React from 'react';
import Spline from '@splinetool/react-spline';

// 3D visual of the smart insole using a Spline scene
// The overlay provides subtle gradients without blocking interactions.
export default function Insole3D() {
  return (
    <section className="relative w-full min-h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/8d8oP0dZ2eR5wCjA/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Non-blocking visual accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute right-[-10%] top-[-10%] h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute left-[-10%] bottom-[-10%] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 p-6 sm:p-10 flex flex-col gap-3">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-cyan-300/80 bg-cyan-300/10 ring-1 ring-cyan-300/20 px-2.5 py-1 rounded-full w-max">
          Live 3D
        </span>
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
          Smart Insole with Embedded Sensors
        </h2>
        <p className="text-slate-300/90 max-w-2xl">
          Explore the insole model in 3D. Rotate, pan, and zoom to examine sensor placement and form factor.
        </p>
      </div>
    </section>
  );
}
