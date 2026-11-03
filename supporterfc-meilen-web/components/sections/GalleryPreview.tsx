import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Container } from '../layout/Container';
import { sanityFetch } from '@/lib/sanity/fetch';
import { GALLERY_QUERY } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { Button } from '../ui/Button';
import { getLocalized } from '@/lib/utils/locale';

export async function GalleryPreview({ locale }: { locale: string }) {
    const t = await getTranslations('Gallery');
    const collections = await sanityFetch<any[]>({ query: GALLERY_QUERY }).catch(() => []);

    // Flatten images from collections to get a selection for the preview
    const previewImages = collections
        .flatMap(c => (c.images || []).map((img: any) => ({ ...img, collectionTitle: c.title })))
        .slice(0, 4);

    // Fallback mock if empty
    const displayImages = previewImages.length > 0 ? previewImages : [
        { _id: 'm1', caption: 'Classic Terrace Action', collectionTitle: '1970s' },
        { _id: 'm2', caption: 'Choreo Preparation', collectionTitle: '1990s' },
        { _id: 'm3', caption: 'The Old Pitch', collectionTitle: '1980s' },
        { _id: 'm4', caption: 'Away Day Vibes', collectionTitle: '2010s' },
    ];

    return (
        <section className="py-24 border-b border-ink/20 bg-vintage">
            <Container>
                <div className="flex flex-col items-center text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black uppercase text-ink tracking-tight mb-4">
                        {t('title')}
                    </h2>
                    <p className="font-serif text-ink/70 italic text-lg md:text-xl">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {displayImages.map((img, i) => (
                        <div
                            key={img.asset?._id || i}
                            className="group relative aspect-square overflow-hidden border border-ink/10 bg-cream"
                        >
                            {img.asset ? (
                                <Image
                                    src={urlFor(img.asset).url()}
                                    alt={img.caption || 'Gallery image'}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center font-sans font-bold text-ink/10 uppercase tracking-widest text-sm">
                                    Archive Image
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <p className="font-sans text-[10px] font-black uppercase text-orange tracking-[0.2em] mb-1">
                                    {getLocalized(img.collectionTitle, locale)}
                                </p>
                                <p className="font-serif text-white italic text-sm line-clamp-1">
                                    {getLocalized(img.caption, locale)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Button asChild variant="brutalist" size="lg">
                        <Link href="/gallery">{t('viewAll')}</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
}
