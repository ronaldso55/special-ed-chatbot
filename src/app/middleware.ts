// src/app/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
    locales,
    defaultLocale: 'en',
    localePrefix: 'as-needed', // Only prefix non-default locales (e.g., /es, but / for en)
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};