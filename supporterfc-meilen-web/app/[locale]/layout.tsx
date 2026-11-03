import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Bricolage_Grotesque, Cormorant_Garamond } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { sanityFetch } from '@/lib/sanity/fetch';
import { SETTINGS_QUERY } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { Metadata } from 'next';
import '../globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage'
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant'
});

const BASE_URL = 'https://www.supporterfcmeilen.ch';

const seoData: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Supporter FC Meilen – 50th Anniversary',
    description: 'The official supporter club of FC Meilen. Celebrating 50 years of loyalty, community, and unconditional support since 1976. Join the movement.',
  },
  de: {
    title: 'Supporter Vereinigung FC Meilen – 50. Jubiläum',
    description: 'Die offizielle Supporter Vereinigung des FC Meilen. 50 Jahre Treue, Gemeinschaft und bedingungslose Unterstützung seit 1976. Werde Teil der Bewegung.',
  },
};

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const altLocale = locale === 'de' ? 'en' : 'de';

  let settings: any = null;
  try {
    settings = await sanityFetch<any>({ query: SETTINGS_QUERY });
  } catch (error) {
    console.error('Failed to fetch site settings for metadata:', error);
  }

  const seo = seoData[locale] || seoData.en;
  const ogImage = settings?.heroImage ? urlFor(settings.heroImage).width(1200).height(630).url() : `${BASE_URL}/og-image.jpg`;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: seo.title,
      template: `%s | Supporter FC Meilen`,
    },
    description: seo.description,
    keywords: locale === 'de'
      ? ['FC Meilen', 'Supporter Vereinigung', 'Fussball', 'Meilen', 'Zürich', '50 Jahre', 'Supporter', 'Fussballverein']
      : ['FC Meilen', 'Supporter Club', 'Football', 'Meilen', 'Zurich', '50th Anniversary', 'Supporter', 'Football Club'],
    authors: [{ name: 'Supporter Vereinigung FC Meilen' }],
    creator: 'Supporter Vereinigung FC Meilen',
    publisher: 'Supporter Vereinigung FC Meilen',
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        de: `${BASE_URL}/de`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'de' ? 'de_CH' : 'en_US',
      alternateLocale: altLocale === 'de' ? 'de_CH' : 'en_US',
      url: `${BASE_URL}/${locale}`,
      siteName: 'Supporter FC Meilen',
      title: seo.title,
      description: seo.description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: seo.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ogImage ? [ogImage] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// JSON-LD structured data
function JsonLd({ locale }: { locale: string }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: 'Supporter Vereinigung FC Meilen',
    alternateName: 'Supporter FC Meilen',
    url: BASE_URL,
    logo: `${BASE_URL}/50th_logo.png`,
    foundingDate: '1976-09-12',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Burgstrasse 160',
      addressLocality: 'Meilen',
      postalCode: '8706',
      addressCountry: 'CH',
    },
    email: 'supporter@fcmeilen.ch',
    sport: 'Football',
    description: locale === 'de'
      ? 'Die offizielle Supporter Vereinigung des FC Meilen seit 1976.'
      : 'The official supporter club of FC Meilen since 1976.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Supporter FC Meilen',
    url: BASE_URL,
    inLanguage: [locale === 'de' ? 'de-CH' : 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/${locale}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${bricolage.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        <JsonLd locale={locale} />
      </head>
      <body className="font-serif bg-vintage text-ink antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col relative z-0">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <NoiseOverlay />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

