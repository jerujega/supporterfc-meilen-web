import * as React from 'react';
import { getTranslations } from 'next-intl/server';
import { sanityFetch } from '@/lib/sanity/fetch';
import { PRODUCTS_QUERY } from '@/lib/sanity/queries';
import { Container } from '@/components/layout/Container';
import { ProductCard } from '@/components/ui/ProductCard';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MerchPage' });
  return {
    title: `${t('title')} - Supporter FC Meilen`,
    description: t('subtitle'),
  };
}

export default async function MerchandisePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MerchPage' });
  const rawProducts = await sanityFetch<any[]>({ query: PRODUCTS_QUERY }).catch(() => []);

  // Mock data in case DB is empty during setup
  const products = rawProducts.length > 0 ? rawProducts : [
    { _id: '1', name: 'Anniversary Heritage Scarf', slug: { current: 'heritage-scarf' }, price: 25.00 },
    { _id: '2', name: 'Original 1976 Tee (Black)', slug: { current: '1976-tee-black' }, price: 35.00 },
    { _id: '3', name: 'Matchday Flag 1.5x1m', slug: { current: 'match-flag' }, price: 40.00 },
    { _id: '4', name: 'Sticker Pack "Against Modern Football"', slug: { current: 'sticker-pack' }, price: 5.00 },
    { _id: '5', name: 'Retro Windbreaker', slug: { current: 'retro-windbreaker' }, price: 85.00 },
  ];

  return (
    <div className="pt-32 pb-24 bg-vintage min-h-screen">
      <Container>
        <header className="mb-20 text-center max-w-3xl mx-auto">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} locale={locale} />
          ))}
        </div>
      </Container>
    </div>
  );
}
