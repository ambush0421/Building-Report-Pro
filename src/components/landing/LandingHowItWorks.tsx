'use client';

const STEPS = [
  {
    title: 'Address Search',
    description: 'Find the target building and lock the base parcel context.',
  },
  {
    title: 'Automatic Aggregation',
    description: 'Collect unit, price, and location signals into a single dataset.',
  },
  {
    title: 'Decision Output',
    description: 'Review comparative metrics and proceed with a generated quotation.',
  },
];

export function LandingHowItWorks() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h3 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-slate-900">
          How It Works
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {index + 1}
              </p>
              <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

