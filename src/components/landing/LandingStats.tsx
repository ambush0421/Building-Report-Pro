'use client';

const STATS = [
  { label: 'Scenario Checks', value: '1,200+' },
  { label: 'Average Analysis Time', value: '3 min' },
  { label: 'Saved Manual Steps', value: '70%' },
  { label: 'Repeat-Use Teams', value: '100+' },
];

export function LandingStats() {
  return (
    <section className="bg-slate-900 py-14 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 md:grid-cols-4">
          {STATS.map((item) => (
            <div key={item.label} className="rounded-xl border border-white/15 bg-white/5 p-5">
              <p className="text-3xl font-black tracking-tight">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

