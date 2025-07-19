'use client';

import { useState } from 'react';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || 'Failed to sign in');
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during sign in';
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf1f3] to-[#fceef1] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-bold text-[#D8456B] drop-shadow-sm tracking-tight">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-base text-gray-600 font-medium">
          Don’t have an account?{' '}
          <a
            href="/auth/signup"
            className="text-[#724060] font-semibold hover:underline"
          >
            Sign up here
          </a>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {error && (
              <Alert color="failure" className="text-sm">
                {error}
              </Alert>
            )}

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                Email address
              </label>
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <TextInput
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="mt-4 w-full bg-[#D8456B] hover:bg-[#724060] transition-all duration-300 text-white font-semibold py-2.5 px-4 rounded-lg"
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
