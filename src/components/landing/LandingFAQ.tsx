'use client';

const FAQ_ITEMS = [
  {
    q: 'What data is used for the report?',
    a: 'The workflow combines public building data, unit-level data, and transaction context where available.',
  },
  {
    q: 'Can this be used for both lease and purchase decisions?',
    a: 'Yes. The dashboard supports multiple scenarios and compares expected outcomes side by side.',
  },
  {
    q: 'Do I need a separate tool for a quotation?',
    a: 'No. After selecting units, you can open the quotation flow directly in the same product.',
  },
];

export function LandingFAQ() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h3 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-slate-900">FAQ</h3>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer list-none font-semibold text-slate-900">{item.q}</summary>
              <p className="mt-2 text-sm text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

