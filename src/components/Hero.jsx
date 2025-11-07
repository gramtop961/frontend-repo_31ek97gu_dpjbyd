import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield, LineChart } from 'lucide-react';

// Lightweight error boundary to prevent a full-app crash if Spline fails
class SafeBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    // no-op: avoid logging noise in sandbox
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
      );
    }
    return this.props.children;
  }
}

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [SplineComp, setSplineComp] = useState(null);

  // Mount flag to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamically import Spline only on the client to avoid SSR/hydration edge cases
  useEffect(() => {
    let active = true;
    if (mounted && !SplineComp) {
      import('@splinetool/react-spline')
        .then((m) => {
          if (active) setSplineComp(() => m.default);
        })
        .catch(() => {
          // Swallow import errors; fallback background will render
        });
    }
    return () => {
      active = false;
    };
  }, [mounted, SplineComp]);

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-slate-950 text-white">
      {/* 3D background layer */}
      <div className="absolute inset-0">
        {mounted && SplineComp ? (
          <SafeBoundary>
            <SplineComp
              scene="https://prod.spline.design/X0jXGc9p9sKQFk2B/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </SafeBoundary>
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
        )}
      </div>

      {/* Soft vignette that doesn't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0)_0%,rgba(2,6,23,0.6)_45%,rgba(2,6,23,0.9)_100%)]" />

      {/* Foreground content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-28 text-center md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur"
        >
          <Rocket size={16} />
          ML‑powered Smart Insole for Golf
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
        >
          Real‑time motion and pressure insights for data‑driven training
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/80"
        >
          Enhance performance, reduce injury risks, and elevate Golf in India with science‑backed analytics built for players and coaches.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 font-medium text-slate-900 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
          >
            Request early access
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            <LineChart size={18} />
            Explore features
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            { icon: Shield, label: 'Injury risk reduction' },
            { icon: LineChart, label: 'Real-time performance metrics' },
            { icon: Rocket, label: 'Co-created with coaches' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80 backdrop-blur">
              <div className="flex items-center gap-3">
                <item.icon className="text-emerald-400" size={18} />
                <span className="text-sm">{item.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
