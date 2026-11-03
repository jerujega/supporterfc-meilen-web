import ContactClient from './ContactClient';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const isDE = locale === 'de';

  return {
    title: isDE ? 'Kontakt – Supporter FC Meilen' : 'Contact – Supporter FC Meilen',
    description: isDE
      ? 'Kontaktieren Sie die Supporter Vereinigung FC Meilen. Sportzentrum Allmend, Burgstrasse 160, 8706 Meilen.'
      : 'Get in touch with Supporter FC Meilen. Sportzentrum Allmend, Burgstrasse 160, 8706 Meilen, Switzerland.',
    alternates: {
      canonical: `https://www.supporterfcmeilen.ch/${locale}/contact`,
      languages: { en: 'https://www.supporterfcmeilen.ch/en/contact', de: 'https://www.supporterfcmeilen.ch/de/contact' },
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
