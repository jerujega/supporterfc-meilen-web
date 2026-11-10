import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { sanityFetch } from '@/lib/sanity/fetch';
import { NEWS_LIST_QUERY } from '@/lib/sanity/queries';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { getLocalized } from '@/lib/utils/locale';

export async function NewsPreview({ locale }: { locale: string }) {
    const t = await getTranslations('News');
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

    const allPosts = hasGv ? normalizedPosts : [defaultGvPost, ...normalizedPosts];

    // Take the latest 3 posts, ensuring GV is at the top
    const sortedPosts = [...allPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    const posts = sortedPosts.slice(0, 3);

    const formatLocalizedDate = (dateStr: string) => {
        try {
            const d = new Date(dateStr);
            if (locale === 'de') {
                const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
                return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
            }
            return format(d, 'dd. MMMM yyyy');
        } catch {
            return dateStr;
        }
    };

    return (
        <section className="py-24 border-b border-ink/20 bg-cream">
            <Container className="max-w-7xl">
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-ink pb-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-black uppercase text-ink tracking-tighter">
                            {t('title')}
                        </h2>
                        <p className="font-serif text-xl text-ink/70 mt-2 italic">{t('subtitle')}</p>
                    </div>
                    <Link
                        href="/news"
                        className="hidden md:flex items-center gap-2 font-sans font-black uppercase text-sm hover:text-orange transition-colors group mt-4 md:mt-0"
                    >
                        {t('allNews')}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="flex flex-col">
                    {posts.map((post) => (
                        <Link
                            key={post._id}
                            href={`/news/${post.slug.current}`}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-ink/10 hover:bg-white/50 transition-colors px-6 -mx-6"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline md:gap-12">
                                <time className="font-sans text-xs md:text-sm font-bold uppercase text-orange w-32 tracking-widest shrink-0 mb-2 md:mb-0">
                                    {formatLocalizedDate(post.publishedAt)}
                                </time>
                                <h3 className="font-sans text-2xl md:text-3xl font-bold uppercase leading-tight group-hover:text-gold transition-colors">
                                    {getLocalized(post.title, locale)}
                                </h3>
                            </div>
                            <div className="text-ink/30 group-hover:text-ink transition-colors mt-4 md:mt-0">
                                <span className="font-sans text-xs font-black uppercase tracking-widest border-b-2 border-transparent group-hover:border-gold pb-1">
                                    {t('readMore')}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 md:hidden">
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/news">{t('allNews')}</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
