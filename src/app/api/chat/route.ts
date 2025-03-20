// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
    reply: string;
    resource: string | null;
};

const responses: Record<string, ResponseData> = {
    meltdown: {
        reply: "I’m so sorry you’re dealing with a meltdown—it’s tough on everyone. Try creating a calm space with dim lights or a favorite comfort item. Deep breaths can help too, for both of you!",
        resource: "Here’s a great article on managing meltdowns: https://www.understood.org/articles/understanding-meltdowns",
    },
    iep: {
        reply: "An IEP (Individualized Education Program) is a plan to support your child’s unique needs in school. You’ll meet with teachers and specialists to set goals and accommodations. It can feel overwhelming, but you’ve got this!",
        resource: "Learn more about IEPs here: https://www.pacer.org/parent/php/PHP-c2.pdf",
    },
    default: {
        reply: "I’m here to help! Could you tell me more about what’s on your mind? I can offer tips or point you to resources.",
        resource: null,
    },
};

export async function POST(req: NextRequest) {
    const { message } = (await req.json()) as { message?: string };

    if (!message) {
        return NextResponse.json({ reply: "Please ask me something!" }, { status: 400 });
    }

    const lowerMessage = message.toLowerCase();
    let response: ResponseData;

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