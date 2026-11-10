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

  const isGV = resolvedParams.slug === 'gv-2026' ||
    resolvedParams.slug === 'next-general-assembly-ga-2026' ||
    (post && (
      post.slug?.current === 'gv-2026' ||
      post.slug?.current === 'next-general-assembly-ga-2026' ||
      (typeof post.title === 'string' && post.title.toLowerCase().includes('generalversammlung')) ||
      (post.title?.de && post.title.de.toLowerCase().includes('generalversammlung')) ||
      (post.title?.en && post.title.en.toLowerCase().includes('generalversammlung'))
    ));

  if (isGV) {
    return {
      title: 'Generalversammlung (GV) 2026 – Neues Datum - Supporter FC Meilen News',
    };
  }

  if (!post) {
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

  const isGV = resolvedParams.slug === 'gv-2026' ||
    resolvedParams.slug === 'next-general-assembly-ga-2026' ||
    (post && (
      post.slug?.current === 'gv-2026' ||
      post.slug?.current === 'next-general-assembly-ga-2026' ||
      (typeof post.title === 'string' && post.title.toLowerCase().includes('generalversammlung')) ||
      (post.title?.de && post.title.de.toLowerCase().includes('generalversammlung')) ||
      (post.title?.en && post.title.en.toLowerCase().includes('generalversammlung'))
    ));

  if (isGV) {
    post = {
      ...(post || {}),
      _id: post?._id || 'gv-2026',
      title: {
        de: 'Generalversammlung (GV) 2026 – Neues Datum',
        en: 'Generalversammlung (GV) 2026 – Neues Datum',
      },
      slug: { current: resolvedParams.slug || 'next-general-assembly-ga-2026' },
      publishedAt: '2026-11-13T18:00:00Z',
      coverImage: post?.coverImage || '/news-gv-2026.jpg',
      content: [
        {
          _type: 'block',
          _key: 'b1',
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'Unsere Generalversammlung wurde verschoben!\n\nDie diesjährige Generalversammlung der Supporter-Vereinigung des FC Meilen findet neu am Freitag, 13. November 2026, um 18.00 Uhr statt.',
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
              text: 'Veranstaltungsort: Felix auf der Allmend, Meilen',
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
              text: 'Wir freuen uns, gemeinsam mit unseren Mitgliedern auf das vergangene Vereinsjahr zurückzublicken, aktuelle Entwicklungen zu besprechen und die Zukunft unserer Supporter-Vereinigung aktiv mitzugestalten.\n\nIm Anschluss an die Generalversammlung lassen wir den Abend in gemütlicher Runde ausklingen.',
            },
          ],
        },
        {
          _type: 'block',
          _key: 'b4',
          children: [
            {
              _type: 'span',
              _key: 's4',
              text: 'Wir freuen uns auf eure zahlreiche Teilnahme!',
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
      if (isGV) {
        return 'Freitag, 13. November 2026 – 18.00 Uhr';
      }
      const d = new Date(dateStr);
      const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
      return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
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
