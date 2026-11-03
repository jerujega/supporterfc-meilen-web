import * as React from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { sanityFetch } from '@/lib/sanity/fetch';
import { BLOG_LIST_QUERY } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { Container } from '@/components/layout/Container';
import { format } from 'date-fns';
import { getLocalized } from '@/lib/utils/locale';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
  return {
    title: `${t('title')} - Supporter FC Meilen`,
    description: t('subtitle'),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
  // In a real scenario, this fetches actual data. We'll simulate the array mapped to the schema.
  const rawPosts = await sanityFetch<any[]>({ query: BLOG_LIST_QUERY }).catch(() => []);

  // Update mock data to use fixed dates to prevent hydration mismatch
  const posts = rawPosts.length > 0 ? rawPosts : [
    { _id: '1', title: 'The Derby Atmosphere', slug: { current: 'derby' }, publishedAt: '2026-03-15T12:00:00Z', excerpt: 'An unforgettable night under the floodlights.', category: { title: 'Matchday' } },
    { _id: '2', title: '50 Years of History', slug: { current: '50-years' }, publishedAt: '2026-03-14T12:00:00Z', excerpt: 'Looking back at our humble beginnings in 1976.', category: { title: 'Heritage' } },
  ];

  return (
    <div className="pt-32 pb-24 bg-cream min-h-screen">
      <Container>
        <div className="mb-16 border-b border-ink/20 pb-8">
          <h1 className="text-6xl md:text-8xl font-sans font-black uppercase text-ink tracking-tighter drop-shadow-sm">
            {t('title')}
          </h1>
          <p className="font-serif text-xl md:text-2xl text-ink/70 mt-6 italic max-w-2xl">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block bg-vintage border border-ink/20 hover:border-ink hover:shadow-[8px_8px_0_0_#F5A900] transition-all duration-300 pb-6 flex flex-col h-full">
              <div className="aspect-[4/3] w-full bg-ink/5 mb-6 overflow-hidden border-b border-ink/20 grayscale group-hover:grayscale-0 transition-all duration-500 relative">
                {(() => {
                  if (post.mediaType === 'youtube' && post.youtubeLink) {
                    const videoId = post.youtubeLink.split('v=')[1]?.split('&')[0] || post.youtubeLink.split('/').pop() || '';
                    if (videoId) {
                      return (
                        <div className="w-full h-full relative">
                          <Image src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt={getLocalized(post.title, locale)} fill className="object-cover" unoptimized />
                          <div className="absolute inset-0 flex items-center justify-center bg-ink/30 mt-[2px]">
                            <div className="w-16 h-12 bg-orange rounded-xl flex items-center justify-center text-cream">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                  if (post.mediaType === 'video' && post.coverVideoUrl) {
                    return <video src={post.coverVideoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />;
                  }
                  if (post.coverImage) {
                    return <Image src={urlFor(post.coverImage).url()} alt={getLocalized(post.title, locale)} fill className="object-cover" />;
                  }
                  return (
                    <div className="w-full h-full flex items-center justify-center font-sans uppercase font-bold text-ink/20 text-sm tracking-widest">
                      {t('noImage')}
                    </div>
                  );
                })()}
              </div>
              <div className="px-6 flex flex-col flex-1">
                <span className="font-sans text-xs font-bold uppercase text-orange tracking-widest block mb-2">
                  {post.category?.title || t('uncategorized')} / {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                </span>
                <h2 className="font-sans text-2xl font-bold uppercase leading-tight mb-4 group-hover:text-gold transition-colors">
                  {getLocalized(post.title, locale)}
                </h2>
                <p className="font-serif text-ink/70 line-clamp-3 leading-relaxed mb-4 flex-1">
                  {getLocalized(post.excerpt, locale) || 'Read the full story to learn more about this post...'}
                </p>
                <div className="font-sans text-xs font-black uppercase tracking-widest text-ink mt-auto group-hover:underline underline-offset-4 decoration-2">
                  {t('readArticle')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
