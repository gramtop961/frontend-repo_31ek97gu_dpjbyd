import React from 'react';
import Hero from './components/Hero';
import Insole3D from './components/Insole3D';
import PressureMap from './components/PressureMap';
import SensorAnalytics from './components/SensorAnalytics';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-cyan-400" />
            <span className="font-semibold text-white">Insole AI</span>
          </div>
          <nav className="hidden sm:flex items-center gap-4 text-sm text-slate-300">
            <a href="#insole3d" className="hover:text-white">3D</a>
            <a href="#pressure" className="hover:text-white">Pressure</a>
            <a href="#analytics" className="hover:text-white">Analytics</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
        <Hero />

        <section id="insole3d">
          <Insole3D />
        </section>

        <section id="pressure" className="grid gap-6">
          <PressureMap />
        </section>

        <section id="analytics" className="grid gap-6">
          <SensorAnalytics />
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-400">
          © {new Date().getFullYear()} Insole AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
