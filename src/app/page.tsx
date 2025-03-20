// src/app/page.tsx
'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
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
      <h1 className="text-3xl font-bold mb-2">Special Needs Parent Chatbot</h1>
      <p className="text-gray-600 mb-6">
        Ask me anything about supporting your child!
      </p>
      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question here..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send
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