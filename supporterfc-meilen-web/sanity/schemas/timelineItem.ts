import { defineType, defineField } from 'sanity';

export const timelineItem = defineType({
  name: 'timelineItem',
  title: 'Timeline Item',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Historical Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
      media: 'image',
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
