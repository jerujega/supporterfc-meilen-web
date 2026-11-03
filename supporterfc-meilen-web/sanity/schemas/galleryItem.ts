import { defineType, defineField } from 'sanity';

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Collection Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              type: 'localeString',
              title: 'Caption',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'images.0',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title?.en || title?.de || 'Untitled',
        subtitle: String(subtitle || ''),
        media,
      };
    },
  },
});
