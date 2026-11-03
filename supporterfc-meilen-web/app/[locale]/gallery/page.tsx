import { getTranslations } from 'next-intl/server';
import { sanityFetch } from '@/lib/sanity/fetch';
import { GALLERY_QUERY } from '@/lib/sanity/queries';
import { GalleryClient } from '@/components/sections/GalleryClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Gallery' });
  return {
    title: `${t('title')} - Supporter FC Meilen`,
    description: t('subtitle'),
  };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  const collections = await sanityFetch<any[]>({ query: GALLERY_QUERY }).catch(() => []);

  return <GalleryClient initialData={collections} locale={locale} />;
}
