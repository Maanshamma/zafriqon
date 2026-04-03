import React from 'react';

const counterparts = [
  'Institutional investors',
  'Strategic partners',
  'Project sponsors with validated opportunities',
];

export default function WhoWeEngageWith() {
  return (
    <section className="bg-[#0a0f1a] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b8972e] mb-8">
          Who We Engage With
        </h2>
        <p className="text-sm text-[#8a9ab0] mb-6 leading-relaxed">
          ZAFRIQON engages selectively with:
        </p>
        <ul className="space-y-3 mb-8">
          {counterparts?.map((item) => (
            <li key={item} className="flex items-start gap-4">
              <span className="mt-[6px] w-px h-3 bg-[#b8972e] flex-shrink-0" />
              <span className="text-sm text-[#c8d4e0] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-[#6a7a8a] leading-relaxed border-t border-[#1e2a3a] pt-6">
          Engagement is based on alignment, scale, and execution potential.
        </p>
      </div>
    </section>
  );
}
