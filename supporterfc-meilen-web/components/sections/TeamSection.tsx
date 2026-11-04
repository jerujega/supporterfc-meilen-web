'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '../layout/Container';

export function TeamSection() {
    const t = useTranslations('About.team');

    const boardMembers = [
        { id: 'm1', color: 'bg-gold text-ink', image: '/Team/Slavica Jovanovic.jpg' },
        { id: 'm2', color: 'bg-orange text-cream', image: '/Team/Hanspeter Huber.jpg' },
        { id: 'm3', color: 'bg-ink text-cream', image: '/Team/Wolfgang Hafner.jpg' },
        { id: 'm4', color: 'bg-vintage text-ink', image: '/Team/Anja Weisflog.jpg' }
    ];

    const extendedMembers = [
        { id: 'm5', color: 'bg-vintage text-ink', image: '/Team/Fraenzi Pfeil.jpg' }
    ];

    return (
        <section className="py-24 bg-cream border-t border-ink/20">
            <Container>
                {/* Main Header */}
                <div className="mb-20">
                    <span className="font-sans text-xs md:text-sm font-bold uppercase text-orange tracking-widest block mb-4">
                        Führung & Engagement
                    </span>
                    <h2 className="text-5xl md:text-7xl font-sans font-black uppercase text-ink tracking-tight mb-4">
                        {t('title')}
                    </h2>
                    <p className="font-serif italic text-2xl text-ink/70 max-w-2xl">
                        {t('subtitle')}
                    </p>
                </div>

                {/* 1. VORSTAND (BOARD MEMBERS) */}
                <div className="mb-24">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 pb-4 border-b-2 border-ink">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-sans font-black uppercase text-ink tracking-tight">
                                {t('boardTitle')}
                            </h3>
                            <p className="font-serif italic text-lg text-ink/70 mt-1">
                                {t('boardSubtitle')}
                            </p>
                        </div>
                        <span className="font-sans text-xs font-black uppercase tracking-widest bg-ink text-gold px-3 py-1.5 mt-3 sm:mt-0 self-start sm:self-auto border border-ink shadow-[2px_2px_0_0_#F5A900]">
                            4 Vorstandsmitglieder
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {boardMembers.map((m) => (
                            <div
                                key={m.id}
                                className={`group flex flex-col sm:flex-row border-2 border-ink ${m.color} shadow-[8px_8px_0_0_#0B0C10] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0B0C10] transition-all duration-300 overflow-hidden`}
                            >
                                {/* Image Section */}
                                <div className="sm:w-2/5 md:w-1/2 aspect-[3/4] sm:aspect-auto border-b-2 sm:border-b-0 sm:border-r-2 border-ink relative overflow-hidden bg-ink/10 min-h-[260px]">
                                    <Image
                                        src={m.image}
                                        alt={t(`members.${m.id}.name`)}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 30vw"
                                        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 font-sans font-black text-white/90 bg-ink/80 px-2 py-1 text-xs uppercase tracking-widest backdrop-blur-sm shadow-[2px_2px_0_0_rgba(255,255,255,0.2)]">
                                        {t(`members.${m.id}.code`)}
                                    </div>
                                </div>

                                {/* Text Section */}
                                <div className="p-6 sm:p-8 flex flex-col justify-between sm:w-3/5 md:w-1/2 relative bg-opacity-95">
                                    <div className="relative z-10">
                                        <h4 className="text-2xl sm:text-3xl font-sans font-black uppercase mb-2 leading-none tracking-tight">
                                            {t(`members.${m.id}.name`)}
                                        </h4>
                                        <p className="font-sans font-bold text-xs uppercase tracking-widest opacity-80 mb-6 flex items-center gap-2">
                                            <span className="w-4 h-0.5 bg-current opacity-60 inline-block"></span>
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
                </div>

                {/* 2. ERWEITERTES TEAM / SOCIAL MEDIA (EXTENDED TEAM - NOT A BOARD MEMBER) */}
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 pb-4 border-b-2 border-orange/40">
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="text-3xl md:text-4xl font-sans font-black uppercase text-ink tracking-tight">
                                    {t('extendedTitle')}
                                </h3>
                                <span className="font-sans text-xs font-black uppercase tracking-wider bg-orange text-cream px-2.5 py-1">
                                    Social Media
                                </span>
                            </div>
                            <p className="font-serif italic text-lg text-ink/70 mt-1">
                                {t('extendedSubtitle')}
                            </p>
                        </div>
                        <span className="font-sans text-xs font-bold uppercase tracking-wider text-ink/60 border border-ink/20 px-3 py-1 mt-3 sm:mt-0 self-start sm:self-auto bg-vintage">
                            Kein Vorstandsmitglied
                        </span>
                    </div>

                    <div className="max-w-2xl">
                        {extendedMembers.map((m) => (
                            <div
                                key={m.id}
                                className="group flex flex-col sm:flex-row border-2 border-ink bg-vintage shadow-[8px_8px_0_0_#FF4500] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#FF4500] transition-all duration-300 overflow-hidden"
                            >
                                {/* Image Section */}
                                <div className="sm:w-2/5 aspect-[3/4] sm:aspect-auto border-b-2 sm:border-b-0 sm:border-r-2 border-ink relative overflow-hidden bg-cream min-h-[260px] flex items-center justify-center">
                                    <Image
                                        src={m.image}
                                        alt={t(`members.${m.id}.name`)}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 30vw"
                                        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 font-sans font-black text-white bg-orange px-2 py-1 text-xs uppercase tracking-widest shadow-[2px_2px_0_0_#0B0C10]">
                                        {t(`members.${m.id}.code`)}
                                    </div>
                                </div>

                                {/* Text Section */}
                                <div className="p-6 sm:p-8 flex flex-col justify-between sm:w-3/5 relative">
                                    <div className="relative z-10">
                                        <div className="inline-block bg-orange/10 border border-orange/30 text-orange font-sans text-[11px] font-black uppercase tracking-wider px-2 py-0.5 mb-3">
                                            Erweitertes Team
                                        </div>
                                        <h4 className="text-2xl sm:text-3xl font-sans font-black uppercase mb-1 leading-none tracking-tight text-ink">
                                            {t(`members.${m.id}.name`)}
                                        </h4>
                                        <p className="font-sans font-bold text-xs uppercase tracking-widest text-orange mb-4 flex items-center gap-2">
                                            <span className="w-4 h-0.5 bg-orange inline-block"></span>
                                            {t(`members.${m.id}.role`)}
                                        </p>
                                        <p className="font-serif italic text-sm sm:text-base leading-relaxed text-ink/80 mb-4">
                                            "{t(`members.${m.id}.bio`)}"
                                        </p>
                                        <div className="pt-3 border-t border-ink/10 flex flex-wrap gap-2 text-xs font-sans font-bold uppercase tracking-wider text-ink/60">
                                            <span className="bg-cream px-2 py-1 border border-ink/10">Facebook</span>
                                            <span className="bg-cream px-2 py-1 border border-ink/10">Instagram</span>
                                            <span className="bg-cream px-2 py-1 border border-ink/10">TikTok</span>
                                        </div>
                                    </div>

                                    {/* Decorative Code Background */}
                                    <span className="absolute bottom-4 right-4 font-sans font-black text-6xl opacity-5 pointer-events-none select-none tracking-tighter">
                                        {t(`members.${m.id}.code`)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
