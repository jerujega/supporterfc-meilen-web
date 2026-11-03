import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { sanityFetch } from '@/lib/sanity/fetch';
import { BLOG_LIST_QUERY } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { format } from 'date-fns';
import { getLocalized } from '@/lib/utils/locale';
import Image from 'next/image';

export async function SupporterStoriesPreview({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Stories' });
  const rawPosts = await sanityFetch<any[]>({ query: BLOG_LIST_QUERY }).catch(() => []);

  const stories = rawPosts.length > 0 ? rawPosts.slice(0, 3) : [
    { _id: '1', title: 'The Derby Atmosphere', slug: { current: 'derby' }, publishedAt: '2026-10-24T12:00:00Z', excerpt: 'Emotions ran high...', category: { title: 'Matchday' } },
  ];

  return (
    <section className="py-24 border-b border-ink/20 bg-cream relative">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight">
              {t('title')}
            </h2>
            <p className="font-serif text-ink/70 mt-2 italic text-lg md:text-xl">{t('subtitle')}</p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex mt-8 md:mt-0">
            <Link href="/blog">{t('readAll')}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block bg-vintage border border-ink/20 hover:border-ink hover:shadow-[8px_8px_0_0_#F5A900] pb-6 transition-all duration-300 flex flex-col h-full">
              <div className="aspect-[4/3] w-full bg-ink/5 mb-6 overflow-hidden border-b border-ink/20 grayscale group-hover:grayscale-0 transition-all duration-500 relative flex items-center justify-center font-sans uppercase font-bold text-ink/20 text-sm tracking-widest">
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
                  return t('coverImage');
                })()}
              </div>
              <div className="px-6 flex flex-col flex-1">
                <span className="font-sans text-xs font-bold uppercase text-orange tracking-widest block mb-2">
                  {post.category?.title || t('matchday')} / {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                </span>
                <h3 className="font-sans text-2xl font-bold uppercase leading-tight mb-4 group-hover:text-gold transition-colors">
                  {getLocalized(post.title, locale)}
                </h3>
                <p className="font-serif text-ink/70 line-clamp-3 leading-relaxed">
                  {getLocalized(post.excerpt, locale) || t('derbyDesc')}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/blog">{t('readAll')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
