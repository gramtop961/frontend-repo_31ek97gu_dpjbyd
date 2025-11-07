import React from 'react';
import { Activity, LineChart, Gauge, Cpu } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
    <div className="mb-3 inline-flex rounded-lg bg-emerald-50 p-2 text-emerald-600">
      <Icon size={20} />
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
  </div>
);

const Features = () => {
  const featureList = [
    {
      icon: LineChart,
      title: 'Pressure Mapping',
      description:
        'High‑resolution plantar pressure sensing tracks weight transfer and balance through every phase of your swing.',
    },
    {
      icon: Activity,
      title: 'Motion Analytics',
      description:
        'On‑device sensors capture stance, tempo, and sway. Get instant feedback to correct form and build consistency.',
    },
    {
      icon: Gauge,
      title: 'Real‑time Coaching',
      description:
        'Personalized cues and thresholds tuned for your level with clear, actionable guidance on‑range or at home.',
    },
    {
      icon: Cpu,
      title: 'ML Insights',
      description:
        'Our model benchmarks your metrics versus skill cohorts, highlighting what matters most to improve performance.',
    },
  ];

  return (
    <section id="features" className="relative w-full bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Built for players and coaches
          </h2>
          <p className="mt-3 text-slate-600">
            Turn every session into measurable progress with precision data and clear coaching signals.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureList.map((f) => (
            <FeatureCard key={f.title} {...f} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
