'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../layout/Container';

export function MilestoneCards() {
    const t = useTranslations('HistoryPage');

    const milestones = [
        { year: '1976', title: t('foundationTitle'), desc: t('foundationDesc'), color: 'bg-ink text-cream' },
        { year: '1980s', title: t('milestone1Title'), desc: t('milestone1Desc'), color: 'bg-cream text-ink border border-ink/20' },
        { year: '2000s', title: t('milestone2Title'), desc: t('milestone2Desc'), color: 'bg-gold text-ink shadow-[8px_8px_0_0_#1A1A1A]' },
        { year: '2026', title: t('milestone3Title'), desc: t('milestone3Desc'), color: 'bg-orange text-cream' },
    ];

    return (
        <section className="py-24 bg-cream">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {milestones.map((m, i) => (
                        <div
                            key={i}
                            className={`p-6 sm:p-8 md:p-16 flex flex-col justify-between md:aspect-auto min-h-[300px] md:min-h-[400px] transition-transform hover:-translate-y-2 duration-300 ${m.color}`}
                        >
                            <div>
                                <span className="font-sans font-black text-5xl md:text-8xl opacity-20 block mb-4 md:mb-6">
                                    {m.year}
                                </span>
                                <h3 className="text-2xl sm:text-3xl md:text-5xl font-sans font-black uppercase leading-none mb-4 md:mb-6">
                                    {m.title}
                                </h3>
                            </div>
                            <p className="font-serif text-base sm:text-lg md:text-xl leading-relaxed">
                                {m.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
