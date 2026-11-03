'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { PresidentSection } from '@/components/sections/PresidentSection';
import { TeamSection } from '@/components/sections/TeamSection';
import Image from 'next/image';
import gsap from 'gsap';

export default function AboutClient() {
  const t = useTranslations('About');
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stagger-fade', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 bg-cream min-h-screen overflow-hidden">
      <Container className="max-w-7xl">
        <header className="mb-24 border-b-2 border-ink/10 pb-16 text-center stagger-fade">
          <span className="font-sans text-sm font-black uppercase text-orange tracking-[0.3em] block mb-6">
            {t('overline')}
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-black uppercase text-ink tracking-tighter leading-[0.85] mb-8">
            {t('title').split(' ').map((word, i) => (
              <span key={i} className={word.toLowerCase() === 'football' || word.toLowerCase() === 'fussball' ? 'text-gold italic block' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="font-serif text-2xl md:text-3xl text-ink/60 max-w-3xl mx-auto italic leading-tight">
            {t('subtitle')}
          </p>
        </header>

        {/* Section 1: History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32 items-center stagger-fade">
          <div className="aspect-[3/4] w-full bg-ink/10 border-2 border-ink relative grayscale hover:grayscale-0 transition-all duration-700 shadow-[12px_12px_0_0_#1A1A1A]">
            <Image
              src="/about/about-1.webp"
              alt="Archive Photo 1976"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight mb-8 leading-[0.9]">
              {t('foundationTitle')}
            </h2>
            <div className="font-serif text-xl text-ink/80 space-y-6 leading-normal">
              <p>{t('foundationDesc1')}</p>
              <p>{t('foundationDesc2')}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Community */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32 items-center stagger-fade">
          <div className="flex flex-col justify-center order-2 md:order-1 text-right items-end">
            <h2 className="text-4xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight mb-8 leading-[0.9]">
              {t('solidarityTitle')}
            </h2>
            <div className="font-serif text-xl text-ink/80 space-y-6 leading-normal">
              <p>{t('solidarityDesc1')}</p>
              <p>{t('solidarityDesc2')}</p>
            </div>
          </div>
          <div className="aspect-[4/3] w-full bg-ink border-2 border-ink relative grayscale hover:grayscale-0 transition-all duration-700 order-1 md:order-2 shadow-[-12px_12px_0_0_#D4AF37]">
            <Image
              src="/about/about-2.webp"
              alt="Community Action"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Core Values Board */}
        <div className="border-4 border-ink p-8 md:p-16 bg-vintage relative mb-32 stagger-fade">
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-gold border-2 border-ink" />
          <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-orange border-2 border-ink" />
          <h2 className="text-4xl md:text-6xl font-sans font-black uppercase text-ink tracking-tight mb-16 text-center underline decoration-orange decoration-8 underline-offset-8">
            {t('pillarsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-col items-center">
                <span className="text-8xl font-sans font-black text-gold/20 mb-4 block leading-none">0{num}</span>
                <h3 className="font-sans font-black text-3xl uppercase mb-4 text-ink italic">
                  {t(`pillar${num}Title`)}
                </h3>
                <p className="font-serif text-lg text-ink/70 leading-relaxed italic">
                  {t(`pillar${num}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* New Sections */}
      <div className="stagger-fade">
        <PresidentSection />
        <TeamSection />
      </div>
    </div>
  );
}
