import { groq } from 'next-sanity';

export const BLOG_LIST_QUERY = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mediaType,
  coverImage,
  "coverVideoUrl": coverVideo.asset->url,
  youtubeLink,
  publishedAt,
  category->{title}
}`;

export const BLOG_DETAIL_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mediaType,
  coverImage,
  "coverVideoUrl": coverVideo.asset->url,
  youtubeLink,
  publishedAt,
  content,
  author->{name, image, bio},
  category->{title}
}`;

export const NEWS_LIST_QUERY = groq`*[_type == "news"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  category->{title}
}`;

export const NEWS_DETAIL_QUERY = groq`*[_type == "news" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  content,
  author->{name, image, bio},
  category->{title}
}`;

export const PRODUCTS_QUERY = groq`*[_type == "product"] | order(price desc) {
  _id,
  name,
  slug,
  price,
  images,
  categories->{title}
}`;

export const PRODUCT_DETAIL_QUERY = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  price,
  description,
  images,
  affiliateLink,
  categories->{title}
}`;

export const TIMELINE_QUERY = groq`*[_type == "timelineItem"] | order(year asc) {
  _id,
  year,
  title,
  description,
  image
}`;

export const GALLERY_QUERY = groq`*[_type == "galleryItem"] | order(year desc) {
  _id,
  title,
  year,
  images[]{
    asset->{
      _id,
      url,
      metadata
    },
    caption
  }
}`;

export const SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  heroTitle,
  contactEmail,
  address,
  socialLinks
}`;
