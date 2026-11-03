'use client';

import * as React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '../layout/Container';

export function TimelinePreview() {
  const t = useTranslations('Timeline');

  const milestones = [
    {
      year: '1977',
      title: t('m1Title'),
      desc: t('m1Desc'),
      image: '/milestones/gruendung-1977.jpg',
      alt: 'Gründung 1977 – Supportervereinigung FC Meilen',
      tag: 'Gründung 1977',
    },
    {
      year: '2024',
      title: t('m2Title'),
      desc: t('m2Desc'),
      image: '/milestones/historischer-tag-2024.jpg',
      alt: 'Historischer Tag 2024 – Übergabe an Sanji Lingam',
      tag: '18. Januar 2024',
    },
    {
      year: '2027',
      title: t('m3Title'),
      desc: t('m3Desc'),
      image: '/milestones/jubilaeum-2027.jpg',
      alt: '50-jähriges Jubiläum 2027 – Fest in Planung',
      tag: 'Herbst 2027',
    },
  ];

  return (
    <section className="bg-vintage py-20 md:py-28 border-b border-ink/20">
      <Container className="max-w-7xl">
        {/* Header */}
        <div className="mb-14 md:mb-18 border-b border-ink/15 pb-8">
          <span className="font-sans text-xs md:text-sm font-bold uppercase text-orange tracking-widest block mb-3">
            1977 – 2027
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black uppercase text-ink tracking-tight leading-[0.95]">
            {t('title')}
          </h2>
          <p className="font-serif text-ink/70 mt-3 italic text-lg sm:text-xl md:text-2xl max-w-2xl">
            {t('subtitle')}
          </p>
        </div>

        {/* 3 Milestones Grid: Chronological Order (1977, 2024, 2027) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {milestones.map((item, index) => (
            <article
              key={item.year}
              className="group relative flex flex-col justify-between border-2 border-ink bg-cream p-6 sm:p-8 shadow-[8px_8px_0_0_#0B0C10] hover:shadow-[12px_12px_0_0_#F5A900] hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Year and Badge Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-ink/10">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-gold inline-block" />
                    <span className="font-sans font-black text-3xl sm:text-4xl text-ink tracking-tight">
                      {item.year}
                    </span>
                  </div>
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-orange bg-orange/10 px-2.5 py-1 border border-orange/20">
                    {item.tag}
                  </span>
                </div>

                {/* High-Resolution JPEG Image Display */}
                <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden border-2 border-ink bg-ink shadow-inner">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    priority={index === 0}
                  />
                </div>

                {/* Heading (Exact German text as requested) */}
                <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink mb-4 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-serif text-ink/80 text-base sm:text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Milestone Step Indicator */}
              <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-xs font-sans font-bold uppercase tracking-widest text-ink/40">
                <span>Meilenstein 0{index + 1}</span>
                <span className="text-gold font-black">●</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
