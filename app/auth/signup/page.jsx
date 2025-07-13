'use client';

import { useState } from 'react';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setError('❌ Passwords do not match!');
      return;
    }

    try {
      const result = await signup({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName
      });

      if (result.success) {
        toast.success('Account created successfully! Please sign in.');
        router.push('/auth/signin');
      } else {
        toast.error(result.error || 'Failed to create account');
        setError(result.error || '❌ Failed to create account');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      setError('⚠️ An unexpected error occurred');
      console.error('Signup error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf1f3] to-[#fceef1] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-bold text-[#D8456B] tracking-tight">
          Create Account
        </h1>
        <p className="mt-3 text-center text-sm text-gray-600 font-medium">
          Already have an account?{' '}
          <a
            href="/auth/signin"
            className="text-[#724060] font-semibold hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <Alert color="failure" className="text-sm">
                {error}
              </Alert>
            )}

            <div>
              <label htmlFor="fullName" className="mb-1 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <TextInput
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                Email Address
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
              <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
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

            <div>
              <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-3 bg-[#D8456B] hover:bg-[#724060] transition-colors duration-300 text-white font-semibold py-2.5 px-4 rounded-lg"
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
