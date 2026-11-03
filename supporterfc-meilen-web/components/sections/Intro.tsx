'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import Image from 'next/image';

export function AnniversaryIntro() {
  const t = useTranslations('Intro');

  return (
    <section className="py-24 md:py-32 border-b border-ink/20 bg-cream">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Big Number Column */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-8">
            <h2 className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-sans font-black text-ink leading-none tracking-tighter drop-shadow-[8px_8px_0_rgba(245,169,0,1)]">
              {t('year')}
            </h2>
            <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-ink translate-x-3 translate-y-3" />
              <div className="absolute inset-0 border-4 border-ink bg-white p-4">
                <Image
                  src="/50th_logo.png"
                  alt="50th Anniversary Logo"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <p className="font-sans font-bold uppercase tracking-widest text-orange text-sm md:text-base">
              {t('overline')}
            </p>
            <h3 className="font-serif text-2xl md:text-3xl leading-snug text-ink font-semibold italic">
              {t('headline')}
            </h3>
            <div className="font-serif text-lg md:text-xl text-ink/80 leading-relaxed space-y-6">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
