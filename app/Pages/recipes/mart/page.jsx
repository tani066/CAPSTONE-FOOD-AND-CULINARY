"use client"

import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function SavedRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groceryList, setGroceryList] = useState([]);
  const [showGroceryModal, setShowGroceryModal] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchSavedRecipes = async () => {
      try {
        const snapshot = await getDocs(collection(db, `users/${user.uid}/savedRecipes`));
        const data = snapshot.docs.map((doc) => doc.data());
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading saved recipes:', err);
        toast.error('Failed to load saved recipes');
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, `users/${user.uid}/savedRecipes`, id.toString()));
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      toast.success('Recipe removed from saved list');
    } catch (err) {
      console.error('Failed to delete recipe:', err);
      toast.error('Failed to remove recipe');
    }
  };

  const fetchFullRecipe = async (id) => {
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=faca1a93e4b74b9ba8ef2fdafe004d18`);
      const data = await res.json();
      setSelectedRecipe(data);
    } catch (err) {
      console.error('Failed to fetch recipe info:', err);
      toast.error('Error loading full recipe');
    }
  };

  const generateGroceryList = async () => {
    let allIngredients = [];

    for (const recipe of recipes) {
      try {
        const res = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=faca1a93e4b74b9ba8ef2fdafe004d18`);
        const data = await res.json();
        allIngredients = [...allIngredients, ...data.extendedIngredients.map((ing) => ing.original)];
      } catch (err) {
        console.error(`Failed to fetch ingredients for recipe ${recipe.id}`);
      }
    }

    const uniqueIngredients = [...new Set(allIngredients)];
    setGroceryList(uniqueIngredients);
    setShowGroceryModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-orange-600">📌 Your Saved Recipes</h1>
        <button
          onClick={generateGroceryList}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          🛒 Generate Grocery List
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>No saved recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => handleDelete(recipe.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center z-10"
              >
                ✕
              </button>
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{recipe.title}</h3>
                <button
                  onClick={() => fetchFullRecipe(recipe.id)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white/95 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-orange-600 mb-4">{selectedRecipe.title}</h2>
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-64 object-cover rounded mb-6" />

              {selectedRecipe.summary && (
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}
                />
              )}

              {selectedRecipe.extendedIngredients && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-2">Ingredients</h3>
                  <ul className="list-disc list-inside text-black">
                    {selectedRecipe.extendedIngredients.map((ing) => (
                      <li key={`${ing.id}-${ing.original}`}>{ing.original}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedRecipe.analyzedInstructions?.[0]?.steps && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-2">Instructions</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                      <li key={step.number}>{step.step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grocery List Modal */}
      {showGroceryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto relative p-6">
            <button
              onClick={() => setShowGroceryModal(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-green-600 mb-4">🛒 Grocery List</h2>
            <ul className="list-disc list-inside text-black space-y-2">
              {groceryList.map((item, index) => (
                <li key={`${item}-${index}`}>
                  <input type="checkbox" className="mr-2" />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
