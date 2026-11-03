import { NextResponse } from 'next/server';
import { sanityFetch } from '@/lib/sanity/fetch';
import { groq } from 'next-sanity';

const RSS_QUERY = groq`*[_type in ["post", "news"]] | order(publishedAt desc)[0...20] { 
  _type,
  title, 
  slug, 
  excerpt, 
  publishedAt,
  content
}`;

export async function GET() {
  try {
    const posts = await sanityFetch<any[]>({ query: RSS_QUERY }).catch(() => []);
    const baseUrl = 'https://supporterfc-meilen.ch';

    const getStr = (obj: any) => {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      return obj.en || obj.de || '';
    };

    const rssItems = posts
      .map((post: any) => {
        const path = post._type === 'news' ? '/en/news/' : '/en/blog/';
        const link = `${baseUrl}${path}${post.slug?.current}`;
        const title = getStr(post.title);
        const excerpt = getStr(post.excerpt);
        return `
        <item>
          <title><![CDATA[${title}]]></title>
          <link>${link}</link>
          <guid isPermaLink="true">${link}</guid>
          <pubDate>${new Date(post.publishedAt || Date.now()).toUTCString()}</pubDate>
          <description><![CDATA[${excerpt}]]></description>
        </item>`;
      })
      .join('');

    const rssData = `<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
          <title>Supporter FC Meilen News</title>
          <link>${baseUrl}</link>
          <description>Latest match reports, stories, and club updates.</description>
          <language>en</language>
          <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
          ${rssItems}
        </channel>
      </rss>`;

    return new NextResponse(rssData, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
