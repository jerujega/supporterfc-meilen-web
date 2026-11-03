import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity/image';
import Image from 'next/image';
import { Typography } from './Typography';

export const richTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full aspect-[4/3] my-10 border border-ink/20 mix-blend-multiply">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Content image'}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <Typography variant="h2" as="h2" className="mt-16 mb-6">
        {children}
      </Typography>
    ),
    h3: ({ children }: any) => (
      <Typography variant="h3" as="h3" className="mt-12 mb-4">
        {children}
      </Typography>
    ),
    normal: ({ children }: any) => (
      <Typography variant="p" className="mb-6">
        {children}
      </Typography>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gold pl-6 py-2 my-8 font-serif text-2xl italic text-ink">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="relative inline-flex font-sans underline decoration-gold decoration-2 underline-offset-4 font-bold hover:text-orange transition-colors">
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-sans font-black tracking-tight">{children}</strong>,
  },
};

interface RichTextProps {
  content: any;
}

export function RichText({ content }: RichTextProps) {
  return <PortableText value={content} components={richTextComponents} />;
}
