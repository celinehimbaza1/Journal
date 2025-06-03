"use client";
import { useState } from 'react';
import { auth, provider } from "../lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-300 via-pink-200 to-yellow-200 px-4 text-black">
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-xl p-10 space-y-8 transform transition-transform duration-300 hover:scale-[1.03]">
        <h2 className="text-3xl font-extrabold text-center text-purple-700">
          {isSignUp ? 'Create an Account' : 'Welcome Back!'}
        </h2>
        <p className="text-center text-gray-600 font-light mb-6">
          {isSignUp
            ? 'Sign up to start journaling your thoughts.'
            : 'Login to access your journal.'}
        </p>

        <form onSubmit={handleEmailAuth} className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-5 py-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="text-center text-sm text-purple-700 font-medium">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="underline hover:text-purple-900 cursor-pointer"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </div>

        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-purple-300"></div>
          <span className="mx-4 text-purple-600 font-semibold">OR</span>
          <div className="flex-grow border-t border-purple-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition cursor-pointer cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285f4"
              d="M533.5 278.4c0-18.6-1.5-36.5-4.4-53.9H272v101.9h146.9c-6.3 33.7-25 62.3-53.4 81.5v67h86.2c50.4-46.4 79.8-114.7 79.8-196.5z"
            />
            <path
              fill="#34a853"
              d="M272 544.3c72.6 0 133.7-24 178.3-65.2l-86.2-67c-23.8 16-54.3 25.5-92.1 25.5-70.7 0-130.7-47.7-152.3-111.8h-90.7v70.1c44.2 87.8 134.9 148.4 243 148.4z"
            />
            <path
              fill="#fbbc04"
              d="M119.7 323.1c-10.3-30.8-10.3-64.7 0-95.5v-70.1h-90.7c-37.5 73.4-37.5 160.6 0 234l90.7-68.4z"
            />
            <path
              fill="#ea4335"
              d="M272 107.4c39.6 0 75.3 13.6 103.3 40.4l77.5-77.5c-49-45.5-112.1-73.6-180.8-73.6-108.1 0-198.8 60.6-243 148.4l90.7 70.1c21.6-64.1 81.6-111.8 152.3-111.8z"
            />
          </svg>
          Sign in with Google
        </button>

        {error && (
          <p className="text-center text-red-600 font-semibold mt-4">{error}</p>
        )}
      </div>
    </div>
  );
}
