'use client'

import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { getAuth } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function LikedRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchLikedRecipes = async () => {
      try {
        const snapshot = await getDocs(collection(db, `users/${user.uid}/likedRecipes`));
        const data = snapshot.docs.map((doc) => doc.data());
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading liked recipes:', err);
        toast.error('Failed to load liked recipes');
        setLoading(false);
      }
    };

    fetchLikedRecipes();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, `users/${user.uid}/likedRecipes`, id.toString()));
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      toast.success('Recipe removed from liked list');
    } catch (err) {
      console.error('Failed to delete recipe:', err);
      toast.error('Failed to remove recipe');
    }
  };

  const fetchFullRecipe = async (id) => {
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`);
      const data = await res.json();
      setSelectedRecipe(data);
    } catch (err) {
      console.error('Failed to fetch recipe info:', err);
      toast.error('Error loading full recipe');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-600 mb-8">❤️ Your Liked Recipes</h1>

      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>No liked recipes found.</p>
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

      {/* Modal */}
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
                  <ol className="list-decimal list-inside space-y-2 text-black">
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
    </div>
  );
}
