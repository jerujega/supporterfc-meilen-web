import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { sanityFetch } from '@/lib/sanity/fetch';
import { PRODUCTS_QUERY } from '@/lib/sanity/queries';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { ProductCard } from '../ui/ProductCard';

export async function MerchPreview({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Merch' });
  const rawProducts = await sanityFetch<any[]>({ query: PRODUCTS_QUERY }).catch(() => []);
  const products = rawProducts.length > 0 ? rawProducts.slice(0, 4) : [];

  return (
    <section className="py-24 border-b border-ink/20 bg-vintage">
      <Container>
        <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
          <span className="font-sans text-xs font-bold uppercase text-orange tracking-widest block mb-4">
            {t('overline')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight mb-6">
            {t('title')}
          </h2>
          <p className="font-serif text-ink/70 italic text-lg md:text-xl">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} locale={locale} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="brutalist" size="lg">
            <Link href="/merchandise">{t('shopAll')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
