// src/app/i18n.ts
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