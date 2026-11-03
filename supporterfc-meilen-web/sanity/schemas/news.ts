import { defineType, defineField } from 'sanity';

export const news = defineType({
    name: 'news',
    title: 'News Update',
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
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'localeText',
            description: 'A short summary of the news update',
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
