'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function NewEntryPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !user) return;

    try {
      await addDoc(collection(db, 'users', user.uid, 'entries'), {
        title,
        content,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        createdAt: serverTimestamp(),
      });
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('An unknown error occurred.');
      }
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 text-black">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">New Journal-Entry</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bg-gray-600"
          />

          <textarea
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bg-gray-600"
          />

          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            Save Entry
          </button>
        </form>

        <button
          onClick={() => router.push('/dashboard')}
          className="text-bg-gray-600 hover:underline text-sm block text-center cursor-pointer"
        >
          Cancel and go back
        </button>
      </div>
    </div>
  );
}
