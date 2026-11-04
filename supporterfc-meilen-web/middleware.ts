import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
    defaultLocale: 'de',
    locales,
    localeDetection: false,
});

export const config = {
    matcher: ['/((?!api|_next|studio|.*\\..*).*)'],
};
