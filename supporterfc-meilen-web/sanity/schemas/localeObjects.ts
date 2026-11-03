import { defineType, defineField } from 'sanity';

const supportedLanguages = [
    { id: 'en', title: 'English', isDefault: true },
    { id: 'de', title: 'German' },
];

export const localeString = defineType({
    title: 'Localized String',
    name: 'localeString',
    type: 'object',
    fields: supportedLanguages.map((lang) =>
        defineField({
            title: lang.title,
            name: lang.id,
            type: 'string',
        })
    ),
});

export const localeText = defineType({
    title: 'Localized Text',
    name: 'localeText',
    type: 'object',
    fields: supportedLanguages.map((lang) =>
        defineField({
            title: lang.title,
            name: lang.id,
            type: 'text',
        })
    ),
});
