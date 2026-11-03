'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Container } from './Container';
import Image from 'next/image';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

export function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const navRef = React.useRef<HTMLElement>(null);

  // GSAP Scroll Animation
  React.useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        gsap.to(navRef.current, { yPercent: -100, duration: 0.3, ease: 'power2.inOut' });
      } else {
        gsap.to(navRef.current, { yPercent: 0, duration: 0.3, ease: 'power2.out', backgroundColor: currentScrollY > 50 ? '#FAF8F5' : 'transparent' });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: `/about`, label: t('about') },
    { href: `/history`, label: t('history') },
    { href: `/blog`, label: t('blog') || 'Blog' },
    { href: `/news`, label: t('news') },
    { href: `/gallery`, label: t('gallery') },
    { href: `/merchandise`, label: t('merch') },
    { href: `/contact`, label: t('contact') },
  ];

  return (
    <>
      <header ref={navRef} className="fixed top-0 left-0 right-0 z-40 transition-colors duration-300 border-b border-ink/10">
        <Container className="flex items-center justify-between h-20">

        {/* Left Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 flex-1">
          {links.slice(0, 2).map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-sans font-bold uppercase hover:text-orange transition-colors whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center Logo */}
        <div className="flex-1 lg:flex-none flex justify-center lg:px-8 xl:px-12">
          <Link href="/" className="block">
            <Image
              src="/logo.png"
              alt="Supporter FC Meilen Logo"
              width={180}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right Links & CTA (Desktop) & Language Switcher */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-end">
          {links.slice(2).map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-sans font-bold uppercase hover:text-orange transition-colors whitespace-nowrap">
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Button asChild variant="brutalist" size="sm" className="hidden xl:flex">
            <Link href="/join">{t('join')}</Link>
          </Button>
          <Button asChild variant="brutalist" size="sm" className="xl:hidden">
            <Link href="/join">{t('join')}</Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-ink" onClick={() => setIsOpen(true)} aria-label="Open Menu">
          <Menu size={28} />
        </button>

        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-vintage flex flex-col pt-6 px-6">
          <div className="flex justify-end">
            <button className="p-2 text-ink" onClick={() => setIsOpen(false)} aria-label="Close Menu">
              <X size={32} />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-6 mt-12 flex-1">
            <LanguageSwitcher />
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-3xl font-sans font-bold uppercase hover:text-orange">
                {link.label}
              </Link>
            ))}
            <Link href="/join" onClick={() => setIsOpen(false)} className="text-3xl text-orange font-sans font-black uppercase mt-4 underline decoration-4 underline-offset-8">
              {t('join')}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
