'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';

export function Countdown() {
    const t = useTranslations('Hero');

    return (
        <div className="mt-12 flex flex-col items-center">
            <span className="font-sans font-bold uppercase tracking-[0.2em] text-orange text-sm md:text-base mb-6 drop-shadow-md">
                {t('countdownPretext')}
            </span>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-8">
                <div className="flex flex-col items-center group">
                    <div className="relative">
                        {/* Brutalist offset shadow */}
                        <div className="absolute inset-0 bg-orange translate-x-1.5 translate-y-1.5 md:translate-x-2.5 md:translate-y-2.5 z-0 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 duration-300" />

                        {/* Main announcement block */}
                        <div className="relative z-10 bg-cream border-2 md:border-[3px] border-ink px-6 py-4 sm:px-10 sm:py-6 md:px-14 md:py-8 flex items-center justify-center transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 duration-300">
                            <span className="font-sans font-black text-2xl sm:text-3xl md:text-5xl text-ink tracking-tighter uppercase">
                                {t('announcementDate')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <p className="mt-6 md:mt-8 font-serif text-base md:text-lg text-cream/80 italic max-w-xl mx-auto text-center drop-shadow-md">
                {t('announcementNote')}
            </p>
        </div>
    );
}
