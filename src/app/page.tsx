// src/app/page.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data: { reply: string } = await res.json();
    setResponse(data.reply);
    setMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
      <p className="text-gray-600 mb-6">{t('subtitle')}</p>
      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('inputPlaceholder')}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {t('sendButton')}
        </button>
      </form>
      {response && (
        <div className="p-4 bg-gray-100 rounded-lg text-left">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}