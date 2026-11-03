import * as React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { sanityFetch } from '@/lib/sanity/fetch';
import { NEWS_DETAIL_QUERY } from '@/lib/sanity/queries';
import { Container } from '@/components/layout/Container';
import { RichText } from '@/components/ui/RichText';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { getLocalized } from '@/lib/utils/locale';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const post: any = await sanityFetch({
    query: NEWS_DETAIL_QUERY,
    params: { slug: resolvedParams.slug },
  }).catch(() => null);

  if (!post) {
    if (resolvedParams.slug === 'gv-2026') {
      return {
        title: resolvedParams.locale === 'de'
          ? 'Nächste Generalversammlung (GV) 2026 - Supporter FC Meilen News'
          : 'Next General Assembly (GV) 2026 - Supporter FC Meilen News',
      };
    }
    return { title: 'News Not Found' };
  }
  return { title: `${getLocalized(post.title, resolvedParams.locale)} - Supporter FC Meilen News` };
}

export default async function NewsDetail({ params }: Props) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'NewsPage' });
  let post: any = await sanityFetch({
    query: NEWS_DETAIL_QUERY,
    params: { slug: resolvedParams.slug },
  }).catch(() => null);

  if (!post && resolvedParams.slug === 'gv-2026') {
    post = {
      _id: 'gv-2026',
      title: {
        de: 'Nächste Generalversammlung (GV) 2026',
        en: 'Next General Assembly (GV) 2026',
      },
      slug: { current: 'gv-2026' },
      publishedAt: '2026-11-13T18:00:00Z',
      coverImage: '/news-gv-2026.jpg',
      content: [
        {
          _type: 'block',
          _key: 'b1',
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: resolvedParams.locale === 'de'
                ? 'Die nächste Generalversammlung der Supporter-Vereinigung FC Meilen findet am 13. November 2026 statt.'
                : 'The next General Assembly of the Supporter Association FC Meilen will take place on November 13, 2026.',
            },
          ],
        },
        {
          _type: 'block',
          _key: 'b2',
          children: [
            {
              _type: 'span',
              _key: 's2',
              text: resolvedParams.locale === 'de'
                ? 'Ort: Beim Felix auf der Allmend, Meilen\nBeginn: Ab 18.00 Uhr\nAnmeldung: Eine Voranmeldung ist erforderlich!'
                : 'Location: Beim Felix auf der Allmend, Meilen\nStart: From 18:00\nRegistration: Advance registration is required!',
            },
          ],
        },
        {
          _type: 'block',
          _key: 'b3',
          children: [
            {
              _type: 'span',
              _key: 's3',
              text: resolvedParams.locale === 'de'
                ? 'Das 50-Jahre-Jubiläumsfest der Supporter-Vereinigung FC Meilen ist für Mitte Herbst 2027 geplant. Weitere Informationen folgen.'
                : 'The 50th anniversary celebration of the Supporter Association FC Meilen is planned for mid-autumn 2027. More information will follow.',
            },
          ],
        },
      ],
    };
  }

  if (!post) {
    return (
      <div className="pt-32 pb-24 bg-cream min-h-screen">
        <Container className="max-w-7xl">
          <Link href="/news" className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase text-ink/60 hover:text-orange mb-12 transition-colors">
            <ArrowLeft size={16} /> {t('backToNews')}
          </Link>
          <div className="p-8 border border-ink/20 text-center font-serif text-xl italic text-ink/60 bg-vintage">
            {t('notFound')}
          </div>
        </Container>
      </div>
    );
  }

  const formatLocalizedDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (resolvedParams.locale === 'de') {
        const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()} - 18.00 Uhr`;
      }
      return format(d, 'MMMM dd, yyyy - HH:mm');
    } catch {
      return dateStr;
    }
  };

  // Simplified UI compared to blog, no massive images. Strictly information delivery.
  return (
    <article className="pt-32 pb-24 bg-cream min-h-screen">
      <Container className="max-w-7xl">
        <Link href="/news" className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase text-ink/60 hover:text-orange mb-12 transition-colors">
          <ArrowLeft size={16} /> {t('backToNews')}
        </Link>

        <header className="mb-12 border-b border-ink/20 pb-8">
          <time className="font-sans text-sm font-bold uppercase text-orange tracking-widest block mb-4">
            {formatLocalizedDate(post.publishedAt)}
          </time>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight leading-[0.95]">
            {getLocalized(post.title, resolvedParams.locale)}
          </h1>
        </header>

        {post.coverImage && (
          <div className="w-full relative mb-12 border border-ink/20 bg-cream mix-blend-multiply flex items-center justify-center overflow-hidden">
            <Image
              src={typeof post.coverImage === 'string' ? post.coverImage : urlFor(post.coverImage).url()}
              alt={getLocalized(post.title, resolvedParams.locale)}
              width={1600}
              height={900}
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg md:prose-xl max-w-none text-ink/90 bg-vintage border border-ink/10 p-6 md:p-12 shadow-[4px_4px_0_0_rgba(11,12,16,0.1)] whitespace-pre-line">
          {post.content ? <RichText content={post.content} /> : (
            <p className="font-serif italic text-ink/60">{t('noDetails')}</p>
          )}
        </div>
      </Container>
    </article>
  );
}
