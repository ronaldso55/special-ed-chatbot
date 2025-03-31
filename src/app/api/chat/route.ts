// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getLocale, getTranslations } from 'next-intl/server';
import { Messages } from '../../i18n';

export async function POST(req: NextRequest): Promise<NextResponse> {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: 'Chat' });
    const { message } = (await req.json()) as { message?: string };

    if (!message) {
        return NextResponse.json({ reply: t('emptyInput') }, { status: 400 });
    }

    const lowerMessage = message.toLowerCase();
    const responses = t.raw('responses') as Messages['Chat']['responses'];
    let response: Messages['Chat']['responses'][string];

    if (lowerMessage.includes('meltdown')) {
        response = responses.meltdown;
    } else if (lowerMessage.includes('iep')) {
        response = responses.iep;
    } else {
        response = responses.default;
    }

    const reply = response.resource
        ? `${response.reply} ${response.resource}`
        : response.reply;

    return NextResponse.json({ reply });
}