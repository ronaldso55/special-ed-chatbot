// src/app/page.tsx
'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useTranslations, useLocale, NextIntlClientProvider } from 'next-intl';
import { locales, Messages } from './i18n';

export default function Home() {
  const initialLocale = useLocale();
  const [selectedLocale, setSelectedLocale] = useState<string>(initialLocale);
  const [messages, setMessages] = useState<Messages | null>(null);
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  // Load messages dynamically when locale changes
  useEffect(() => {
    import(`./messages/${selectedLocale}.json`)
      .then((module) => setMessages(module.default as Messages))
      .catch(() => import('./messages/en.json').then((module) => setMessages(module.default as Messages)));
  }, [selectedLocale]);

  const handleLocaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocale(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!message.trim()) return;

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': selectedLocale, // Override for API
      },
      body: JSON.stringify({ message }),
    });
    const data: { reply: string } = await res.json();
    setResponse(data.reply);
    setMessage('');
  };

  if (!messages) {
    return <div>Loading...</div>; // Fallback while messages load
  }

  return (
    <NextIntlClientProvider locale={selectedLocale} messages={messages}>
      <div className="max-w-2xl mx-auto p-6 text-center">
        <LocaleToggle selectedLocale={selectedLocale} onChange={handleLocaleChange} />
        <ChatInterface
          message={message}
          setMessage={setMessage}
          response={response}
          onSubmit={handleSubmit}
        />
      </div>
    </NextIntlClientProvider>
  );
}

// Separate component for the toggle
function LocaleToggle({
  selectedLocale,
  onChange,
}: {
  selectedLocale: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="locale-select" className="mr-2">Language:</label>
      <select
        id="locale-select"
        value={selectedLocale}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-lg"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {loc === 'en' ? 'English' : 'Español'}
          </option>
        ))}
      </select>
    </div>
  );
}

// Separate component for the chat UI
function ChatInterface({
  message,
  setMessage,
  response,
  onSubmit,
}: {
  message: string;
  setMessage: (value: string) => void;
  response: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  const t = useTranslations('Home');

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
      <p className="text-gray-600 mb-6">{t('subtitle')}</p>
      <form onSubmit={onSubmit} className="flex gap-4 mb-6">
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
    </>
  );
}