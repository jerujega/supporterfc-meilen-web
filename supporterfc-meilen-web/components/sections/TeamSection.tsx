'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '../layout/Container';

export function TeamSection() {
    const t = useTranslations('About.team');

    const members = [
        { id: 'm1', color: 'bg-gold', image: '/Team/Slavica Jovanovic.jpg' },
        { id: 'm2', color: 'bg-orange', image: '/Team/Hanspeter Huber.jpg' },
        { id: 'm3', color: 'bg-ink text-cream', image: '/Team/⁠Wolfgang Hafner.jpg' },
        { id: 'm4', color: 'bg-vintage', image: '/Team/Danijela Frei.jpg' }
    ];

    return (
        <section className="py-24 bg-cream">
            <Container>
                <div className="mb-16">
                    <h2 className="text-5xl md:text-7xl font-sans font-black uppercase text-ink mb-4">
                        {t('title')}
                    </h2>
                    <p className="font-serif italic text-2xl text-ink/60">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {members.map((m) => (
                        <div key={m.id} className={`group flex flex-col sm:flex-row border-2 border-ink ${m.color} shadow-[8px_8px_0_0_#0B0C10] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0B0C10] transition-all duration-300 overflow-hidden`}>
                            {/* Image Section */}
                            <div className="sm:w-2/5 md:w-1/2 aspect-[3/4] sm:aspect-auto border-b-2 sm:border-b-0 sm:border-r-2 border-ink relative overflow-hidden bg-ink/10">
                                <Image
                                    src={m.image}
                                    alt={t(`members.${m.id}.name`)}
                                    fill
                                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 font-sans font-black text-white/50 bg-ink/80 px-2 py-1 text-xs uppercase tracking-widest backdrop-blur-sm shadow-[2px_2px_0_0_rgba(255,255,255,0.2)]">
                                    {t(`members.${m.id}.code`)}
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="p-6 sm:p-8 flex flex-col justify-between sm:w-3/5 md:w-1/2 relative bg-opacity-90">
                                <div className="relative z-10">
                                    <h3 className="text-2xl sm:text-3xl font-sans font-black uppercase mb-2 leading-none tracking-tight">
                                        {t(`members.${m.id}.name`)}
                                    </h3>
                                    <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-70 mb-6 flex items-center gap-2">
                                        <span className="w-4 h-0.5 bg-current opacity-50 inline-block"></span>
                                        {t(`members.${m.id}.role`)}
                                    </p>
                                    <p className="font-serif italic text-sm sm:text-base leading-relaxed opacity-90">
                                        "{t(`members.${m.id}.bio`)}"
                                    </p>
                                </div>

                                {/* Decorative Code Background */}
                                <span className="absolute bottom-4 right-4 font-sans font-black text-6xl opacity-5 pointer-events-none select-none tracking-tighter">
                                    {t(`members.${m.id}.code`)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
