'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase' // Adjust the path
import { getAuth } from 'firebase/auth';

export default function LunchRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY; // Replace with your valid Spoonacular API key

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, recipes]);

  useEffect(() => {
    const fetchLunchRecipes = async () => {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&type=lunch`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.results) {
          setRecipes(data.results);
        } else {
          setError('No recipes found.');
        }
      } catch (err) {
        console.error('Failed to fetch lunch recipes:', err);
        toast.error('Failed to fetch recipes. Please try again.');
        setError('An error occurred while fetching data.');
      }
    };

    fetchLunchRecipes();
  }, []);

  const fetchFullRecipe = async (id) => {
    setLoadingDetails(true);
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
      const data = await res.json();
      setSelectedRecipe(data);
    } catch (err) {
      console.error('Error fetching full recipe details:', err);
      toast.error('Failed to load recipe details. Please try again.');
    } finally {
      setLoadingDetails(false);
    }
  };
const handleLike = async (recipe) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    toast.error("Please log in to like recipes.");
    return;
  }

  const isLiked = likedRecipes.includes(recipe.id);
  const newLikedRecipes = isLiked
    ? likedRecipes.filter(id => id !== recipe.id)
    : [...likedRecipes, recipe.id];

  setLikedRecipes(newLikedRecipes);
  toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');

  try {
    const docRef = doc(db, `users/${user.uid}/likedRecipes`, recipe.id.toString());
    if (isLiked) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        timestamp: Date.now()
      });
    }
  } catch (err) {
    console.error("Error syncing liked recipe:", err);
    toast.error("Failed to sync like with database");
  }
};


const handleSave = async (recipe) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    toast.error("Please log in to save recipes.");
    return;
  }

  const isSaved = savedRecipes.includes(recipe.id);
  const newSavedRecipes = isSaved
    ? savedRecipes.filter(id => id !== recipe.id)
    : [...savedRecipes, recipe.id];

  setSavedRecipes(newSavedRecipes);
  toast.success(isSaved ? 'Recipe unsaved' : 'Recipe saved for later');

  try {
    const docRef = doc(db, `users/${user.uid}/savedRecipes`, recipe.id.toString());
    if (isSaved) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        timestamp: Date.now()
      });
    }
  } catch (err) {
    console.error("Error syncing saved recipe:", err);
    toast.error("Failed to sync save with database");
  }
};
  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-orange-600 font-serif">🍽️ Hearty Lunches</h2>
          <p className="text-gray-600 text-lg italic mb-8">Fill your midday cravings with these delicious recipes</p>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for lunch recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-gray-600 px-6 py-4 text-lg rounded-full border-2 border-orange-200 focus:border-orange-500 focus:outline-none shadow-md transition-all duration-300 pl-14"
            />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-orange-400 text-xl">🔍</span>
          </div>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-white group"
            >
              <div className="relative">
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(recipe);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                      likedRecipes.includes(recipe.id)
                        ? 'bg-red-500 text-white'
                        : 'hover:bg-white'
                    }`}
                  >
                    {likedRecipes.includes(recipe.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave(recipe);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                      savedRecipes.includes(recipe.id)
                        ? 'bg-orange-500'
                        : 'hover:bg-white'
                    }`}
                  >
                    {savedRecipes.includes(recipe.id) ? '📌' : '🔖'}
                  </button>
                </div>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <h3 className="font-bold text-white text-xl font-serif">{recipe.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <button
                  onClick={() => fetchFullRecipe(recipe.id)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-orange-100/20">
              <button
                className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                onClick={() => setSelectedRecipe(null)}
              >
                &times;
              </button>

              {loadingDetails ? (
                <div className="flex items-center justify-center p-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
                  <p className="ml-4 text-lg text-gray-600 font-medium">Loading recipe details...</p>
                </div>
              ) : (
                <div className="p-8">
                  <h2 className="text-4xl font-bold mb-4 text-orange-600 font-serif">{selectedRecipe.title}</h2>
                  <div className="relative h-80 w-full rounded-xl overflow-hidden mb-6">
                    <img
                      src={selectedRecipe.image}
                      alt={selectedRecipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {selectedRecipe.summary && (
                    <div
                      className="prose max-w-none text-gray-700 bg-orange-50/50 backdrop-blur-sm p-6 rounded-xl mb-8"
                      dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}
                    />
                  )}

                  {selectedRecipe.extendedIngredients && (
                    <div className="mt-8 bg-white/80 p-8 rounded-xl shadow-md border border-orange-100/30">
                      <h3 className="font-bold text-xl mb-4 text-orange-600">📝 Ingredients</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedRecipe.extendedIngredients.map((ing) => (
                          <li key={ing.id} className="flex gap-2">
                            <span className="text-orange-500">•</span>
                            <span>{ing.original}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedRecipe.analyzedInstructions?.[0]?.steps && (
                    <div className="mt-8 bg-white/80 p-8 rounded-xl shadow-md border border-orange-100/30">
                      <h3 className="font-bold text-xl mb-4 text-orange-600">📋 Instructions</h3>
                      <ol className="space-y-4">
                        {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                          <li key={step.number} className="flex gap-4 items-start">
                            <span className="bg-orange-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">{step.number}</span>
                            <span className="text-gray-700">{step.step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {selectedRecipe.sourceUrl && (
                    <div className="mt-8 pt-6 border-t border-orange-100">
                      <p className="text-sm text-gray-500 italic">
                        Source:{' '}
                        <a href={selectedRecipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                          View original recipe
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
