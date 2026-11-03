'use client';

import * as React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import { Container } from '@/components/layout/Container';
import { X, ChevronLeft, ChevronRight, X as XIcon } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';

interface GalleryItem {
  _id: string;
  year: number;
  title: any; // Localized object { en: string, de: string }
  images: Array<{
    asset: any;
    caption?: any; // Localized object { en: string, de: string }
  }>;
}

export function GalleryClient({ initialData, locale }: { initialData: GalleryItem[], locale: string }) {
  const t = useTranslations('Gallery');
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Helper to pick the right locale from a localized object
  const getLocalized = (obj: any) => {
    if (!obj) return '';
    return obj[locale] || obj['en'] || Object.values(obj)[0] || '';
  };

  // Flatten all images across all years into a single array for the masonry/lightbox
  const allImages = React.useMemo(() => {
    const list: Array<{ url: string; caption?: string; year: number; collectionTitle: string }> = [];
    initialData.forEach((collection) => {
      if (!collection.images) return;
      collection.images.forEach((img) => {
        if (img.asset) {
          list.push({
            url: urlFor(img.asset).url(),
            caption: getLocalized(img.caption),
            year: collection.year,
            collectionTitle: getLocalized(collection.title),
          });
        }
      });
    });
    return list;
  }, [initialData, locale]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  // Fallback mock items if sanity misses
  const mockItems = Array.from({ length: 12 }).map((_, i) => i);

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <Container>
        <header className="mb-20 text-center max-w-4xl mx-auto">
          <span className="font-sans text-sm font-bold uppercase text-orange tracking-widest block mb-6">
            {t('overline')}
          </span>
          <h1 className="text-6xl md:text-8xl font-sans font-black uppercase text-ink tracking-tighter drop-shadow-sm mb-6">
            {t('title')}
          </h1>
          <p className="font-serif text-xl md:text-2xl text-ink/70 italic leading-relaxed">
            {t('subtitle')}
          </p>
        </header>

        {allImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {allImages.map((img, idx) => (
              <div
                key={idx}
                className="break-inside-avoid shadow-[4px_4px_0_0_#0B0C10] border border-ink/20 cursor-pointer group relative bg-vintage"
                onClick={() => openLightbox(idx)}
              >
                {/* Simulated varied aspect ratio box, next/image handles fill nicely with object-cover on this relative box */}
                <div className="relative w-full overflow-hidden" style={{ paddingTop: mounted ? `${50 + Math.random() * 80}%` : '100%' }}>
                  <Image
                    src={img.url}
                    alt={img.caption || t('archivalDocument')}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105 mix-blend-multiply"
                  />
                </div>
                <div className="p-3 border-t border-ink/20 flex justify-between items-center bg-cream">
                  <span className="font-sans text-xs font-bold uppercase text-ink tracking-widest line-clamp-1">{img.caption || img.collectionTitle}</span>
                  <span className="font-serif italic text-ink/60 text-sm ml-2 shrink-0">{img.year}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {mockItems.map((_, idx) => (
              <div key={idx} className="break-inside-avoid shadow-[4px_4px_0_0_#0B0C10] border border-ink/20 bg-vintage p-4">
                <div className="relative w-full bg-ink/5 border border-ink/10 flex items-center justify-center font-sans font-bold text-ink/20 uppercase tracking-widest text-xs" style={{ paddingTop: mounted ? `${50 + Math.random() * 80}%` : '100%' }}>
                  <span className="absolute inset-0 flex items-center justify-center">{t('mockPhoto')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>

      {/* Lightbox Portal */}
      {mounted && lightboxOpen && allImages.length > 0 && createPortal(
        <div className="fixed inset-0 z-[100] bg-vintage/95 backdrop-blur-sm flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[110] p-4 text-ink hover:text-orange transition-colors"
          >
            <XIcon size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-12 z-[110] p-4 text-ink hover:text-orange transition-colors"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-12 z-[110] p-4 text-ink hover:text-orange transition-colors"
          >
            <ChevronRight size={48} />
          </button>

          <div className="relative w-full max-w-6xl max-h-[85vh] h-full mx-auto p-4 flex flex-col items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center mb-6">
              <Image
                src={allImages[currentIndex].url}
                alt={allImages[currentIndex].caption || t('expandedView')}
                fill
                className="object-contain drop-shadow-2xl mix-blend-multiply"
                sizes="100vw"
                priority
              />
            </div>

            <div className="absolute bottom-6 left-0 right-0 text-center flex flex-col items-center justify-center bg-vintage/90 py-4 max-w-xl mx-auto border border-ink shadow-[4px_4px_0_0_#0B0C10]">
              <p className="font-sans font-bold uppercase tracking-widest text-orange mb-1">
                {allImages[currentIndex].collectionTitle} — {allImages[currentIndex].year}
              </p>
              <p className="font-serif italic text-ink text-lg">
                {allImages[currentIndex].caption || t('archivalDocument')}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
