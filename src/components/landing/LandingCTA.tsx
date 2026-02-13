'use client';

interface LandingCTAProps {
  onStartClick: () => void;
}

export function LandingCTA({ onStartClick }: LandingCTAProps) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Start Now</p>
        <h3 className="mt-3 text-3xl font-extrabold tracking-tight">Ready to Run Your Building Analysis?</h3>
        <p className="mt-3 max-w-2xl text-sm text-blue-100">
          Search an address, review the dashboard, and move directly to quotation.
        </p>
        <button
          type="button"
          onClick={onStartClick}
          className="mt-8 rounded-full bg-white px-8 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-50"
        >
          Analyze a Building
        </button>
      </div>
    </section>
  );
}

