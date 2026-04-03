'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-parchment-dark py-28 md:py-40 px-6 md:px-10">
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Image */}
          <div className="reveal relative overflow-hidden">
            <div className="aspect-[4/5] relative overflow-hidden bg-sapphire/5">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1d2f5f40f-1774023738674.png"
                alt="Global financial architecture representing ZAFRIQON's institutional positioning"
                fill
                className="object-cover cinematic-img"
                sizes="(max-width: 768px) 100vw, 50vw" />
              
            </div>
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-sapphire/80 to-transparent">
              <span className="text-[10px] uppercase tracking-widest text-white/50">
                Strategic Thinking. Institutional Execution.
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="reveal reveal-delay-2 space-y-12">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-steel font-medium mb-4 block">
                Our Philosophy
              </span>
              <h2
                className="font-display font-light italic text-sapphire leading-[0.9] mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}>
                
                Quiet Credibility.<br />
                <span className="not-italic font-semibold">Lasting Impact.</span>
              </h2>
            </div>

            <div className="space-y-8">
              <p className="text-sm font-light text-charcoal leading-[1.85]">
<<<<<<< HEAD
                ZAFRIQON does not seek recognition — only results. The operating philosophy is rooted in the principle that credible institutions operate with restraint — expressed through the quality of their work, not the volume of their messaging.
              </p>
              <p className="text-sm font-light text-charcoal leading-[1.85]">
                A long-term view is taken on every relationship. Deals are not transactions — they are the beginning of enduring institutional partnerships. The strategic objectives of every counterparty are assessed before any structure is proposed. Commitment follows only when the pathway to execution is clear.
=======
                ZAFRIQON does not seek recognition — only results. The operating philosophy is rooted in the belief that the most credible institutions operate with restraint — expressed through the quality of their work rather than the volume of their messaging.
              </p>
              <p className="text-sm font-light text-charcoal leading-[1.85]">
                A long-term view is taken on every relationship. Deals are not transactions — they are the beginning of enduring institutional partnerships. Understanding the strategic objectives of every counterparty precedes any proposed structure, and commitment follows only when the pathway to execution is clear.
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
              </p>
              <p className="text-sm font-light text-charcoal leading-[1.85]">
                The asset-light model is a deliberate choice. By not holding assets or operating businesses, objectivity is preserved — enabling genuine strategic positioning without conflict of interest or institutional inertia.
              </p>
              <p className="text-[11px] font-light text-steel/40 leading-relaxed">
<<<<<<< HEAD
                The role is to structure — not to participate.
=======
                Our role is to structure — not to participate.
>>>>>>> ecb93fef058ae5175128b2ac0bd7af0f81c260a0
              </p>
            </div>

            {/* Divider stat */}
            <div className="pt-8 border-t border-sapphire/8">
              <blockquote className="border-l-2 border-gold pl-5">
                <p className="text-sm font-light italic text-charcoal leading-relaxed">
                  "Complexity is not an obstacle. For those with the right architecture, it is the opportunity."
                </p>
                <cite className="text-[10px] uppercase tracking-widest text-steel not-italic mt-3 block">
                  — ZAFRIQON Operating Principle
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>);

}