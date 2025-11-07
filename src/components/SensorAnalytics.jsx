import React from 'react';
import { Activity, Gauge, LineChart, Shield } from 'lucide-react';

export default function SensorAnalytics() {
  const metrics = [
    {
      icon: <Activity className="h-5 w-5 text-cyan-300" />,
      label: 'Sampling Rate',
      value: '200 Hz',
      desc: 'High-frequency capture for precise gait and swing segmentation.'
    },
    {
      icon: <Gauge className="h-5 w-5 text-lime-300" />,
      label: 'Sensors',
      value: '16 Pressure + IMU',
      desc: 'Distributed plantar array with 9-axis motion tracking.'
    },
    {
      icon: <LineChart className="h-5 w-5 text-fuchsia-300" />,
      label: 'Latency',
      value: '< 30 ms',
      desc: 'BLE streaming with on-device smoothing for instant feedback.'
    },
    {
      icon: <Shield className="h-5 w-5 text-amber-300" />,
      label: 'Durability',
      value: 'IP54',
      desc: 'Moisture-resistant membrane and flexible copper traces.'
    },
  ];

  return (
    <section className="w-full rounded-2xl bg-slate-900/80 ring-1 ring-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-xl font-semibold">Sensor & System Analytics</h3>
        <span className="text-xs text-slate-400">Live demo</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="rounded-xl bg-slate-800/60 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-2 mb-2">
              {m.icon}
              <span className="text-slate-300 text-sm">{m.label}</span>
            </div>
            <div className="text-white text-2xl font-semibold">{m.value}</div>
            <p className="text-slate-400 text-sm mt-1">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
