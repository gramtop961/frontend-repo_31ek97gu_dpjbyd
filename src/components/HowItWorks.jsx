import React from 'react';

const Step = ({ number, title, description }) => (
  <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold text-white shadow">
      {number}
    </div>
    <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-slate-600">{description}</p>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      title: 'Wear the smart insole',
      description:
        'Slip into your regular golf shoes. Sensors calibrate in seconds for your stance and comfort.',
    },
    {
      title: 'Swing and get feedback',
      description:
        'Pressure and motion data stream to the app with instant cues for balance, tempo, and transfer.',
    },
    {
      title: 'Review ML insights',
      description:
        'See benchmarks and improvement areas tailored to your skill level and goals.',
    },
    {
      title: 'Share with your coach',
      description:
        'Give coaches side‑by‑side sessions, trends, and drill suggestions to accelerate progress.',
    },
  ];

  return (
    <section className="w-full bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-slate-600">
            A simple workflow from first swing to measurable improvement.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Step key={s.title} number={i + 1} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
