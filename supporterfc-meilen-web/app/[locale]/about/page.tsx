import AboutClient from './AboutClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    title: isDE ? 'Über uns – Supporter Vereinigung FC Meilen' : 'About Us – Supporter FC Meilen',
    description: isDE
      ? 'Erfahren Sie mehr über die Supporter Vereinigung FC Meilen – unsere Geschichte, Werte und Gemeinschaft seit 1976.'
      : 'Learn about Supporter FC Meilen – our history, values, and community since 1976.',
    alternates: {
      canonical: `https://www.supporterfcmeilen.ch/${locale}/about`,
      languages: { en: 'https://www.supporterfcmeilen.ch/en/about', de: 'https://www.supporterfcmeilen.ch/de/about' },
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
