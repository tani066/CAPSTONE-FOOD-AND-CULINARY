'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/app/components/ui/Card'; // ✅ This now works
import { Heart, Bookmark } from 'lucide-react'; // Optional: nice icons

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-orange-50 to-yellow-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-orange-600 font-serif mb-12">
          🍽️ Your Recipe Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Liked Recipes Card */}
          <Card onClick={() => router.push('/pages/dashboard/liked')} className="hover:bg-orange-50 border border-orange-200">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 text-red-600 p-4 rounded-full">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-orange-600">Liked Recipes</h2>
                <p className="text-gray-600">View all your favorite dishes you liked ❤️</p>
              </div>
            </div>
          </Card>

          {/* Saved Recipes Card */}
          <Card onClick={() => router.push('/pages/dashboard/saved')} className="hover:bg-orange-50 border border-orange-200">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full">
                <Bookmark className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-orange-600">Saved Recipes</h2>
                <p className="text-gray-600">Access recipes you saved to cook later 🔖</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
