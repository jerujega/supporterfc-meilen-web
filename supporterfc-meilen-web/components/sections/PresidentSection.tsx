'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '../layout/Container';

export function PresidentSection() {
    const t = useTranslations('About.president');

    return (
        <section className="py-24 bg-vintage border-y border-ink/10">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className="order-2 md:order-1">
                        <span className="font-sans text-sm font-black uppercase text-orange tracking-widest block mb-4">
                            {t('overline')}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-sans font-black uppercase text-ink mb-8 leading-tight">
                            {t('title')}
                        </h2>
                        <div className="bg-ink text-cream p-8 shadow-[8px_8px_0_0_#D4AF37] mb-8">
                            <h3 className="text-3xl font-sans font-black uppercase mb-4 text-gold">
                                {t('name')}
                            </h3>
                            <p className="font-serif italic text-xl mb-6 opacity-80">
                                "{t('bio')}"
                            </p>
                            <a
                                href={`mailto:${t('contact')}`}
                                className="font-sans font-bold uppercase text-sm border-b-2 border-gold hover:text-gold transition-colors"
                            >
                                {t('contact')}
                            </a>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="aspect-[4/5] bg-ink/10 border-4 border-ink relative grayscale hover:grayscale-0 transition-all duration-1000 group overflow-hidden">
                            <Image
                                src="/President-1.webp"
                                alt={t('name')}
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gold text-ink p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 font-sans font-black uppercase text-center">
                                {t('name')} - Est. 2024
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
