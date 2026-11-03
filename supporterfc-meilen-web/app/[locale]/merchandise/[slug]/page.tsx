import * as React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { sanityFetch } from '@/lib/sanity/fetch';
import { PRODUCT_DETAIL_QUERY } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { Container } from '@/components/layout/Container';
import { OrderForm } from '@/components/ui/OrderForm';
import { RichText } from '@/components/ui/RichText';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getLocalized } from '@/lib/utils/locale';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function ProductDetail({ params }: Props) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'MerchDetail' });
  const product: any = await sanityFetch({
    query: PRODUCT_DETAIL_QUERY,
    params: { slug: resolvedParams.slug },
  }).catch(() => null);

  if (!product) {
    return (
      <div className="pt-32 pb-24 bg-cream min-h-screen">
        <Container>
          <div className="p-8 border-2 border-dashed border-ink/20 text-center font-serif text-xl italic text-ink/60">
            {t('productNotFound')}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen pt-24 lg:pt-32 pb-24 relative">
      <Container>
        <Link href="/merchandise" className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase text-ink/60 hover:text-orange mb-12 transition-colors">
          <ArrowLeft size={16} /> {t('backToShop')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: Sticky Image Gallery Tracker */}
          <div className="lg:col-span-7">
            <div className="sticky top-32 flex flex-col gap-6">
              {product.images && product.images.length > 0 ? (
                product.images.map((img: any, idx: number) => (
                  <div key={idx} className="aspect-square md:aspect-[4/3] w-full bg-white border border-ink/20 mix-blend-multiply relative flex items-center justify-center p-8">
                    <Image
                      src={urlFor(img).url()}
                      alt={`${getLocalized(product.name, resolvedParams.locale)} view ${idx + 1}`}
                      fill
                      className="object-contain p-8"
                    />
                  </div>
                ))
              ) : (
                <div className="aspect-square w-full bg-white border border-ink/20 mix-blend-multiply relative flex items-center justify-center font-sans font-bold text-ink/20 uppercase tracking-widest text-sm">
                  {t('noImage')}
                </div>
              )}
            </div>
          </div>

          {/* Right: Sticky Product Info */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 flex flex-col">
              <span className="font-sans text-xs font-bold uppercase text-orange tracking-widest mb-4 block">
                {t('officialMerch')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight leading-[0.95] mb-6">
                {getLocalized(product.name, resolvedParams.locale)}
              </h1>
              <p className="font-serif text-2xl lg:text-4xl italic text-ink/80 mb-12">
                CHF {product.price.toFixed(2)}
              </p>

              <div className="prose prose-lg text-ink/80 mb-12 border-t border-b border-ink/10 py-8 border-dashed">
                {product.description ? <RichText content={product.description} /> : (
                  <p className="font-serif italic text-ink/60">{t('noDescription')}</p>
                )}
              </div>

              <div className="mt-8">
                <OrderForm
                  productName={getLocalized(product.name, resolvedParams.locale)}
                  productPrice={product.price}
                />
              </div>

              <p className="font-sans text-xs font-bold uppercase text-ink/40 text-center mt-6 tracking-widest">
                {t('securePayment')}
              </p>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
