import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { sanityFetch } from '@/lib/sanity/fetch';
import { NEWS_LIST_QUERY } from '@/lib/sanity/queries';
import { Container } from '@/components/layout/Container';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { getLocalized } from '@/lib/utils/locale';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'NewsPage' });
  return {
    title: `${t('title')} - Supporter FC Meilen`,
    description: t('subtitle'),
  };
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'NewsPage' });
  const rawPosts = await sanityFetch<any[]>({ query: NEWS_LIST_QUERY }).catch(() => []);

  const defaultGvPost = {
    _id: 'gv-2026',
    title: {
      de: 'Generalversammlung (GV) 2026 – Neues Datum',
      en: 'Generalversammlung (GV) 2026 – Neues Datum',
    },
    slug: { current: 'next-general-assembly-ga-2026' },
    publishedAt: '2026-11-13T18:00:00Z',
  };

  const fallbackPosts = [
    defaultGvPost,
    { _id: '1', title: { de: 'Away Bus nach Winterthur Ausgebucht', en: 'Away Bus to Winterthur Fully Booked' }, slug: { current: 'bus-winterthur' }, publishedAt: '2026-03-15T12:00:00Z' },
    { _id: '2', title: { de: 'Choreo-Vorbereitungstreffen diesen Donnerstag', en: 'Choreo Prep Meeting This Thursday' }, slug: { current: 'choreo-prep' }, publishedAt: '2026-03-14T12:00:00Z' },
    { _id: '3', title: { de: 'Neues Schal-Design ab nächster Woche', en: 'New Scarf Design Dropping Next Week' }, slug: { current: 'new-scarf' }, publishedAt: '2026-03-13T12:00:00Z' },
    { _id: '4', title: { de: 'Gemeinsam einstehen: Stellungnahme zu Ticketpreisen', en: 'Stand Together: Statement on Ticket Prices' }, slug: { current: 'statement-tickets' }, publishedAt: '2026-03-12T12:00:00Z' },
  ];

  // Normalize posts: ensure Generalversammlung has the exact date 13. November 2026
  const normalizedPosts = rawPosts.map((p) => {
    const titleStr = typeof p.title === 'string' ? p.title : (p.title?.de || p.title?.en || '');
    const isGV = p.slug?.current === 'gv-2026' || p.slug?.current === 'next-general-assembly-ga-2026' || titleStr.toLowerCase().includes('generalversammlung');
    if (isGV) {
      return {
        ...p,
        title: {
          de: 'Generalversammlung (GV) 2026 – Neues Datum',
          en: 'Generalversammlung (GV) 2026 – Neues Datum',
        },
        publishedAt: '2026-11-13T18:00:00Z',
      };
    }
    return p;
  });

  const hasGv = normalizedPosts.some((p) => {
    const titleStr = typeof p.title === 'string' ? p.title : (p.title?.de || p.title?.en || '');
    return p.slug?.current === 'gv-2026' || p.slug?.current === 'next-general-assembly-ga-2026' || titleStr.toLowerCase().includes('generalversammlung');
  });

  const allPosts = rawPosts.length > 0 ? (hasGv ? normalizedPosts : [defaultGvPost, ...normalizedPosts]) : fallbackPosts;
  const posts = [...allPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const formatLocalizedDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (locale === 'de') {
        const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
      }
      return format(d, 'MMM dd, yyyy');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <Container className="max-w-7xl">
        <header className="mb-16 border-b border-ink/20 pb-8">
          <h1 className="text-6xl md:text-8xl font-sans font-black uppercase text-ink tracking-tighter drop-shadow-sm">
            {t('title')}
          </h1>
          <p className="font-serif text-xl md:text-2xl text-ink/70 mt-4 italic max-w-2xl">
            {t('subtitle')}
          </p>
        </header>

        <div className="flex flex-col border-t border-ink/20">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/news/${post.slug.current}`}
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-ink/20 hover:bg-ink/5 transition-colors px-4 -mx-4"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-8">
                <time className="font-sans text-xs md:text-sm font-bold uppercase text-orange w-36 tracking-widest shrink-0 mb-2 md:mb-0">
                  {formatLocalizedDate(post.publishedAt)}
                </time>
                <h2 className="font-sans text-xl md:text-2xl font-bold uppercase leading-tight group-hover:text-gold transition-colors">
                  {getLocalized(post.title, locale)}
                </h2>
              </div>
              <div className="hidden md:flex items-center text-ink/40 group-hover:text-ink transition-colors group-hover:translate-x-2 transform duration-300">
                <ArrowRight size={24} />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
