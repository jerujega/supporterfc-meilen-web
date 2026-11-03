import * as React from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import { getLocalized } from '@/lib/utils/locale';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
    images?: any[];
  };
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <Link
      href={`/merchandise/${product.slug.current}`}
      className="group flex flex-col border border-ink/20 bg-cream p-4 sm:p-6 hover:border-ink hover:shadow-[6px_6px_0_0_#0B0C10] transition-all duration-300"
    >
      <div className="aspect-square w-full bg-white mb-6 relative mix-blend-multiply border border-ink/10 flex items-center justify-center overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image
            src={urlFor(product.images[0]).url()}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="font-sans font-bold text-ink/20 uppercase tracking-widest text-xs">No Image</span>
        )}
      </div>
      <div className="flex flex-col mt-auto">
        <h3 className="font-sans text-xl lg:text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-orange transition-colors line-clamp-2 mb-2">
          {getLocalized(product.name, locale)}
        </h3>
        <p className="font-serif text-lg text-ink/80 italic mt-auto">
          CHF {product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
