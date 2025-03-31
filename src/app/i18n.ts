// src/app/i18n.ts
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export interface Messages {
    Home: {
        title: string;
        subtitle: string;
        inputPlaceholder: string;
        sendButton: string;
        noResponse: string;
    };
    Chat: {
        emptyInput: string;
        responses: Record<
            string,
            {
                reply: string;
                resource: string | null;
            }
        >;
    };
}

export default getRequestConfig(async ({ locale = 'en' }: { locale?: string }) => {
    if (!locale || !locales.includes(locale as Locale)) {
        throw new Error(`Unsupported locale: ${locale}`);
    }

    return {
        messages: (await import(`./messages/${locale}.json`)).default as Messages,
        locale,
    };
});