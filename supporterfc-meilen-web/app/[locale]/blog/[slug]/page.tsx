import * as React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { sanityFetch } from '@/lib/sanity/fetch';
import { BLOG_DETAIL_QUERY } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
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
    query: BLOG_DETAIL_QUERY,
    params: { slug: resolvedParams.slug },
  }).catch(() => null);

  if (!post) return { title: 'Post Not Found' };
  return { title: `${getLocalized(post.title, resolvedParams.locale)} - Supporter FC Meilen` };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'BlogPage' });
  const post: any = await sanityFetch({
    query: BLOG_DETAIL_QUERY,
    params: { slug: resolvedParams.slug },
  }).catch(() => null);

  // If no post exists during dev, render a fallback design template
  if (!post) {
    return (
      <div className="pt-32 pb-24 bg-vintage min-h-screen">
        <Container className="max-w-7xl">
          <Link href="/blog" className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase text-ink/60 hover:text-orange mb-12 transition-colors">
            <ArrowLeft size={16} /> {t('backToStories')}
          </Link>
          <div className="p-8 border-2 border-dashed border-ink/20 text-center font-serif text-xl italic text-ink/60">
            {t('notFound')}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-24 bg-vintage min-h-screen">
      <Container className="max-w-7xl">
        <Link href="/blog" className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase text-ink/60 hover:text-orange mb-12 transition-colors">
          <ArrowLeft size={16} /> {t('backToStories')}
        </Link>

        <header className="mb-16">
          <span className="font-sans text-sm font-bold uppercase text-orange tracking-widest block mb-4">
            {post.category?.title} / {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-black uppercase text-ink tracking-tighter leading-[0.9] mb-8">
            {getLocalized(post.title, resolvedParams.locale)}
          </h1>

          {post.author && (
            <div className="flex items-center gap-4 mt-8 border-t border-ink/20 pt-8">
              {post.author.image ? (
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image src={urlFor(post.author.image).url()} alt={post.author.name} fill className="object-cover grayscale" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-cream border border-ink/20" />
              )}
              <div>
                <p className="font-sans font-bold uppercase tracking-tight text-sm">{post.author.name}</p>
                <p className="font-serif text-ink/60 text-sm italic">{t('author')}</p>
              </div>
            </div>
          )}
        </header>

        {(() => {
          if (post.mediaType === 'youtube' && post.youtubeLink) {
            const videoId = post.youtubeLink.split('v=')[1]?.split('&')[0] || post.youtubeLink.split('/').pop() || '';
            if (videoId) {
              return (
                <div className="aspect-[21/9] w-full relative mb-16 border border-ink/20 bg-ink">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  ></iframe>
                </div>
              );
            }
          }
          if (post.mediaType === 'video' && post.coverVideoUrl) {
            return (
              <div className="aspect-[21/9] w-full relative mb-16 border border-ink/20 bg-ink">
                <video src={post.coverVideoUrl} autoPlay loop muted playsInline controls className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            );
          }
          if (post.coverImage) {
            return (
              <div className="aspect-[21/9] w-full relative mb-16 border border-ink/20 bg-cream mix-blend-multiply flex items-center justify-center">
                <Image
                  src={urlFor(post.coverImage).url()}
                  alt={getLocalized(post.title, resolvedParams.locale)}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
            );
          }
          return null;
        })()}

        <div className="prose prose-lg lg:prose-xl max-w-none text-ink/90">
          {post.content ? <RichText content={post.content} /> : (
            <p className="font-serif italic text-ink/60">{t('noContent')}</p>
          )}
        </div>
      </Container>
    </article>
  );
}
