// src/app/i18n/request.tsx
import { getRequestConfig } from 'next-intl/server';
import { locales, Locale, Messages } from '../i18n';

export default getRequestConfig(async ({ locale }) => {
    if (!locales.includes(locale as Locale)) {
        return {
            locale: 'en' as Locale,
            messages: (await import(`../messages/en.json`)).default as Messages,
        };
    }

    return {
        locale: locale as Locale,
        messages: (await import(`../messages/${locale}.json`)).default as Messages,
    };
});