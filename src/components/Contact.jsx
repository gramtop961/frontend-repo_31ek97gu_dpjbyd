import React, { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Thanks! We\'ll reach out soon.');
  };

  return (
    <section id="contact" className="w-full bg-white py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Request early access</h2>
          <p className="mt-3 text-slate-600">Join the pilot program for players and coaches in India.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input required type="text" placeholder="Full name" className="rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-emerald-500 focus:outline-none" />
            <input required type="email" placeholder="Email" className="rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-emerald-500 focus:outline-none" />
          </div>
          <input type="text" placeholder="Role (Player / Coach / Academy)" className="rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-emerald-500 focus:outline-none" />
          <textarea placeholder="Tell us about your training goals" rows={4} className="rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-emerald-500 focus:outline-none" />
          <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500">
            Request access
          </button>
          {status && <p className="text-center text-emerald-700">{status}</p>}
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">We respect your privacy. No spam — ever.</p>
      </div>
    </section>
  );
};

export default Contact;
