import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

const intlMiddleware = createMiddleware({
    defaultLocale: 'de',
    locales,
});

// Next.js 16 proxy convention
export const proxy = intlMiddleware;

// Also keep default export for compatibility
export default intlMiddleware;

export const config = {
    matcher: ['/((?!api|_next|studio|.*\\..*).*)'],
};
