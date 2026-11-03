import JoinClient from './JoinClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    title: isDE ? 'Mitglied werden – Supporter FC Meilen' : 'Join Us – Supporter FC Meilen',
    description: isDE
      ? 'Werden Sie Mitglied der Supporter Vereinigung FC Meilen. Standard- und Lifetime-Mitgliedschaften verfügbar.'
      : 'Become a member of Supporter FC Meilen. Standard and Lifetime memberships available.',
    alternates: {
      canonical: `https://www.supporterfcmeilen.ch/${locale}/join`,
      languages: { en: 'https://www.supporterfcmeilen.ch/en/join', de: 'https://www.supporterfcmeilen.ch/de/join' },
    },
  };
}

export default function JoinPage() {
  return <JoinClient />;
}
