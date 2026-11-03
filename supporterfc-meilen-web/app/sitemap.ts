import { MetadataRoute } from 'next';
import { sanityFetch } from '@/lib/sanity/fetch';
import { BLOG_LIST_QUERY, PRODUCTS_QUERY } from '@/lib/sanity/queries';

const BASE_URL = 'https://www.supporterfcmeilen.ch';
const LOCALES = ['en', 'de'] as const;

function buildAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
    ),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityFetch<any[]>({ query: BLOG_LIST_QUERY }).catch(() => []);
  const products = await sanityFetch<any[]>({ query: PRODUCTS_QUERY }).catch(() => []);

  // --- Static routes ---
  const staticPaths = [
    '',
    '/blog',
    '/news',
    '/about',
    '/merchandise',
    '/gallery',
    '/join',
    '/contact',
    '/history',
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
      priority: route === '' ? 1.0 : 0.8,
      alternates: buildAlternates(route),
    }))
  );

  // --- Blog posts (both locales) ---
  const blogRoutes: MetadataRoute.Sitemap = posts.flatMap((post: any) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: buildAlternates(`/blog/${post.slug.current}`),
    }))
  );

  // --- News posts (both locales) ---
  const newsRoutes: MetadataRoute.Sitemap = posts.flatMap((post: any) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/news/${post.slug.current}`,
      lastModified: new Date(post.publishedAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: buildAlternates(`/news/${post.slug.current}`),
    }))
  );

  // --- Product pages (both locales) ---
  const productRoutes: MetadataRoute.Sitemap = products.flatMap((product: any) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}/merchandise/${product.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: buildAlternates(`/merchandise/${product.slug.current}`),
    }))
  );

  return [...staticRoutes, ...blogRoutes, ...newsRoutes, ...productRoutes];
}
