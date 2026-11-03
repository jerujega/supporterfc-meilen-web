'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../layout/Container';
import gsap from 'gsap';

export function HistoryHero() {
    const t = useTranslations('HistoryPage');
    const containerRef = React.useRef<HTMLDivElement>(null);
    const titleRef = React.useRef<HTMLHeadingElement>(null);

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
                delay: 0.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="pt-24 md:pt-32 pb-16 bg-vintage border-b border-ink/20">
            <Container>
                <div className="max-w-4xl">
                    <span className="font-sans text-sm font-bold uppercase text-orange tracking-[0.3em] block mb-8">
                        Est. 1976
                    </span>
                    <h1
                        ref={titleRef}
                        className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-sans font-black uppercase text-ink leading-[0.85] md:leading-[0.8] tracking-tighter mb-8 md:mb-12"
                    >
                        {t('title').split(' ').map((word, i) => (
                            <span key={i} className={i === 1 ? 'text-gold block' : ''}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>
                    <p className="font-serif text-xl sm:text-2xl md:text-3xl text-ink/70 max-w-2xl leading-tight italic">
                        {t('subtitle')}
                    </p>
                </div>
            </Container>
        </section>
    );
}
