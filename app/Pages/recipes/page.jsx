'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BreakfastRecipes from '@/app/components/Breakfast';
import LunchRecipes from '@/app/components/LunchRecipes';
import DinnerRecipes from '@/app/components/Dinner';
import SnacksRecipes from '@/app/components/Snacks';
import DessertsRecipes from '@/app/components/Dessert';

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'breakfast';
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = [
    { id: 'breakfast', label: '🍳 Breakfast', emoji: '🍳' },
    { id: 'lunch', label: '🥗 Lunch', emoji: '🥗' },
     { id: 'snacks', label: '🥨 Snacks', emoji: '🥨' },
    { id: 'dinner', label: '🍽️ Dinner', emoji: '🍽️' },
    { id: 'dessert', label: '🍰 Dessert', emoji: '🍰' },
   
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-600 font-serif mb-4">Recipe Collection</h1>
          <p className="text-gray-600 text-lg mb-2">Explore our curated collection of delicious recipes</p>
          <p className="text-sm text-gray-500 italic">💡 Save your favorite recipes to automatically add their ingredients to your grocery list!</p>
        </div>

        {/* Recipe Type Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-3 rounded-full text-lg font-medium transition-all duration-300
                ${activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-lg transform -translate-y-1'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:shadow-md'}
              `}
            >
              <span className="mr-2">{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Recipe Content */}
        <div className="transition-opacity duration-300">
          {activeTab === 'breakfast' && <BreakfastRecipes />}
          {activeTab === 'lunch' && <LunchRecipes />}
          {activeTab === 'snacks' && <SnacksRecipes />}
          {activeTab === 'dinner' && <DinnerRecipes />}
          {activeTab === 'dessert' && <DessertsRecipes />}
          
        </div>
      </div>
    </div>
  );
}