import { defineType, defineField } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.mediaType !== 'image' && document?.mediaType !== undefined,
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video (Upload)', value: 'video' },
          { title: 'YouTube Link', value: 'youtube' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'coverVideo',
      title: 'Cover Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ document }) => document?.mediaType !== 'video',
    }),
    defineField({
      name: 'youtubeLink',
      title: 'YouTube Link',
      type: 'url',
      hidden: ({ document }) => document?.mediaType !== 'youtube',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localeText',
      description: 'A short summary of the post',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'content',
      title: 'Body Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, author, media } = selection;
      return {
        title: title?.en || title?.de || 'Untitled',
        subtitle: author && `by ${author}`,
        media,
      };
    },
  },
});
