'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales } from '@/i18n/request';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex items-center gap-1 p-1 bg-ink/5 border border-ink/10 rounded-sm">
            {locales.map((l) => (
                <button
                    key={l}
                    onClick={() => toggleLocale(l)}
                    className={`
            px-3 py-1 text-xs font-sans font-black uppercase transition-all duration-200
            ${locale === l
                            ? 'bg-gold text-ink shadow-[2px_2px_0_0_#1A1A1A]'
                            : 'hover:bg-ink/10 text-ink/40'
                        }
          `}
                >
                    {l}
                </button>
            ))}
        </div>
    );
}
