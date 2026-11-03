import { HeroSection } from '@/components/sections/Hero';
import { AnniversaryIntro } from '@/components/sections/Intro';
import { TimelinePreview } from '@/components/sections/TimelinePreview';
import { NewsPreview } from '@/components/sections/NewsPreview';
import { GalleryPreview } from '@/components/sections/GalleryPreview';
import { SupporterStoriesPreview } from '@/components/sections/Stories';
import { MerchPreview } from '@/components/sections/Merch';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Hero' });
  const isDE = locale === 'de';

  return {
    title: isDE
      ? 'Supporter Vereinigung FC Meilen – 50. Jubiläum | Startseite'
      : 'Supporter FC Meilen – 50th Anniversary | Home',
    description: isDE
      ? '50 Jahre Supporter Vereinigung FC Meilen. Treue, Gemeinschaft und bedingungslose Unterstützung seit 1976.'
      : '50 years of Supporter FC Meilen. Loyalty, community, and unconditional support since 1976.',
    alternates: {
      canonical: `https://www.supporterfcmeilen.ch/${locale}`,
      languages: { en: 'https://www.supporterfcmeilen.ch/en', de: 'https://www.supporterfcmeilen.ch/de' },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <HeroSection />
      <AnniversaryIntro />
      <TimelinePreview />
      <NewsPreview locale={locale} />
      <GalleryPreview locale={locale} />
      <SupporterStoriesPreview locale={locale} />
      <MerchPreview locale={locale} />
    </>
  );
}
