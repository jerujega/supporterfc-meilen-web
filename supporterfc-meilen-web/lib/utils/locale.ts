/**
 * Extracts a localized string from a Sanity localeString/localeText object.
 * Falls back gracefully: requested locale → 'en' → 'de' → first available value → ''.
 * Also handles plain strings for backwards compatibility.
 */
export function getLocalized(obj: any, locale: string): string {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[locale] || obj['en'] || obj['de'] || Object.values(obj).find(v => typeof v === 'string') as string || '';
}
