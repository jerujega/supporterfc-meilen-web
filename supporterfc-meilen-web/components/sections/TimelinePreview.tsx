'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../layout/Container';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function TimelinePreview() {
  const t = useTranslations('Timeline');
  const years = [1976, 1982, 1999, 2010, 2026]; // Mock data

  const sectionRef = React.useRef<HTMLElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const scrollContent = scrollRef.current;

    if (!section || !scrollContent) return;

    // Use a context for easy cleanup
    const ctx = gsap.context(() => {
      const scrollWidth = scrollContent.scrollWidth;
      const viewportWidth = window.innerWidth;
      const amountToScroll = scrollWidth - viewportWidth;

      if (amountToScroll <= 0) return;

      gsap.to(scrollContent, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          scrub: 1,
          invalidateOnRefresh: true,
          // Ensure we don't have issues with removeChild by providing a dedicated pin Spacer
          anticipatePin: 1,
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-vintage min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Header fixed above the scrollable content */}
      <div className="w-full py-12">
        <Container>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight">
            {t('title')}
          </h2>
          <p className="font-serif text-ink/70 mt-4 italic text-lg md:text-xl">{t('subtitle')}</p>
        </Container>
      </div>

      {/* Horizontal Scroll Content */}
      <div ref={scrollRef} className="flex px-[4vw] md:px-[8vw] lg:px-[10vw] pb-24 gap-8 md:gap-12 w-max">
        {years.map((year, i) => (
          <div
            key={year}
            className="flex-none w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] group relative border border-ink/20 bg-cream p-6 md:p-10 hover:border-ink transition-colors duration-300 shadow-[8px_8px_0_0_rgba(26,26,26,0.05)] hover:shadow-[12px_12px_0_0_rgba(26,26,26,0.1)]"
          >
            <div className="absolute top-0 right-0 p-4 font-sans font-black text-6xl md:text-8xl text-ink/5 group-hover:text-gold transition-colors block leading-none">
              '{year.toString().slice(-2)}
            </div>

            <div className="aspect-[4/3] relative mb-8 grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden border-2 border-ink/10">
              <div className="w-full h-full bg-ink/10 flex items-center justify-center font-sans font-bold text-ink/20 uppercase tracking-widest text-sm">
                {t('archivePhoto')}
              </div>
            </div>

            <h3 className="font-sans font-black text-3xl md:text-4xl uppercase mb-4 tracking-tighter">
              {i === 0 ? t('foundation') : i === 4 ? t('anniversary') : t('victory')}
            </h3>
            <p className="font-serif text-ink/80 text-base md:text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
