import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
          <a href="#" className="text-lg font-semibold tracking-tight">InStep Golf AI</a>
          <nav className="hidden gap-6 text-sm text-white/80 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <a href="#contact" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-900 shadow-md shadow-emerald-500/20 hover:bg-emerald-400">
            Join pilot
          </a>
        </div>
      </header>

      <main className="pt-16">
        <Hero />
        <Features />
        <div id="how">
          <HowItWorks />
        </div>
        <Contact />
      </main>

      <footer className="border-t border-slate-200 bg-white py-10 text-center text-sm text-slate-600">
        <div className="mx-auto max-w-7xl px-6">
          <p>© {new Date().getFullYear()} InStep Golf AI. Built in India for Indian golf.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
