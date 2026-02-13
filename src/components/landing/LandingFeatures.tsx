'use client';

import { Building2, CircleCheckBig, FileText, LineChart } from 'lucide-react';

const FEATURES = [
  {
    title: 'Official Data Intake',
    description: 'Collect core building registry and transaction signals in one workflow.',
    icon: Building2,
  },
  {
    title: 'Automated Comparison',
    description: 'Compare units and scenarios with consistent metrics and assumptions.',
    icon: LineChart,
  },
  {
    title: 'Report-Ready Output',
    description: 'Generate a shareable analysis package for acquisition or lease decisions.',
    icon: FileText,
  },
  {
    title: 'Actionable Checkpoints',
    description: 'Track decision status with clear progress steps and risk highlights.',
    icon: CircleCheckBig,
  },
];

export function LandingFeatures() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">PDCA Workflow</p>
          <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            From Search to Decision in One Screen
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {FEATURES.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="mb-4 inline-flex rounded-xl bg-blue-600 p-2 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">{title}</h4>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

