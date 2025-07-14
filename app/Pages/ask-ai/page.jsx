'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaUtensils, FaAppleAlt, FaRobot } from 'react-icons/fa';
import { GiMuscleUp } from 'react-icons/gi';

export default function MealSuggester() {
  const [ingredients, setIngredients] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const fetchSuggestion = async () => {
    if (!ingredients.trim()) {
      toast.error('Please enter some ingredients!');
      return;
    }

    setLoading(true);
    setSuggestion(null);
    toast.loading('Asking AI for a recipe... 🍳');

    try {
      const res = await fetch('/api/suggest-meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, goal }),
      });

      const data = await res.json();

      toast.dismiss(); // remove loading toast

      if (res.ok) {
        setSuggestion(data.suggestion);
        toast.success('Here’s your recipe! 🍽️');
      } else {
        toast.error(data.error || 'Failed to get suggestion.');
      }
    } catch (err) {
      toast.dismiss();
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Toaster />
      <h1 className="text-3xl font-bold text-center mb-6 text-amber-700 flex justify-center items-center gap-2">
        <FaUtensils className='text-gray-500' /> AI Meal Suggester <FaRobot className="text-gray-500" />
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200">
        <label className="block text-lg font-semibold text-gray-700 mb-2">🧊 Ingredients in your fridge:</label>
        <textarea
          rows="3"
          placeholder="e.g. chicken, garlic, broccoli..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full text-black p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 mb-4"
        />

        <label className="block text-lg font-semibold text-gray-700 mb-2">🎯 Nutritional Goal (optional):</label>
        <input
          type="text"
          placeholder="e.g. high protein, low carbs"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-3 rounded-xl border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 mb-6"
        />

        <button
          onClick={fetchSuggestion}
          disabled={loading}
          className="bg-amber-600 text-white px-6 py-3 rounded-xl hover:bg-amber-700 transition-all disabled:opacity-50 w-full flex items-center justify-center gap-2 text-lg font-semibold"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <GiMuscleUp />
              Suggest Me a Meal
            </>
          )}
        </button>
      </div>

      {suggestion && (
        <div className="mt-10 bg-yellow-50 p-6 rounded-2xl shadow-md border border-amber-300 whitespace-pre-wrap">
          <h2 className="text-2xl font-bold text-amber-700 mb-4 flex items-center gap-2">
            <FaAppleAlt />
            Your AI Generated Recipe
          </h2>
          <p className="text-gray-800">{suggestion}</p>

          <div className="text-sm text-gray-500 mt-4 flex items-center gap-2">
            <FaRobot />
            Powered by Cook & Crafted AI
          </div>
        </div>
      )}
    </div>
  );
}
