'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

export default function SnacksRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, recipes]);

  useEffect(() => {
    const fetchSnacksRecipes = async () => {
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&type=snacks&addRecipeInformation=true`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.results) {
          setRecipes(data.results);
        } else {
          setError('No recipes found.');
        }
      } catch (err) {
        console.error('Failed to fetch snack recipes:', err);
        toast.error('Failed to fetch recipes. Please try again.');
        setError('An error occurred while fetching data.');
      }
    };

    fetchSnacksRecipes();
  }, []);

  const fetchFullRecipe = async (id) => {
    setLoadingDetails(true);
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
      const data = await res.json();
      setSelectedRecipe(data);
    } catch (err) {
      console.error('Error fetching recipe details:', err);
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
      isLiked ? await deleteDoc(docRef) : await setDoc(docRef, {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        timestamp: Date.now()
      });
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
      isSaved ? await deleteDoc(docRef) : await setDoc(docRef, {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        timestamp: Date.now()
      });
    } catch (err) {
      console.error("Error syncing saved recipe:", err);
      toast.error("Failed to sync save with database");
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-orange-600 font-serif">🥪 Quick Bites</h2>
          <p className="text-gray-600 text-lg italic mb-8">Tasty snacks to power your day!</p>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for snack recipes..."
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
                    onClick={(e) => { e.stopPropagation(); handleLike(recipe); }}
                    className={`p-2 rounded-full transition-all hover:scale-110 ${
                      likedRecipes.includes(recipe.id) ? 'bg-red-500 text-white' : 'hover:bg-white'
                    }`}
                  >
                    {likedRecipes.includes(recipe.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSave(recipe); }}
                    className={`p-2 rounded-full transition-all hover:scale-110 ${
                      savedRecipes.includes(recipe.id) ? 'bg-orange-500 text-white' : 'hover:bg-white'
                    }`}
                  >
                    {savedRecipes.includes(recipe.id) ? '📌' : '🔖'}
                  </button>
                </div>
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
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

        {selectedRecipe && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white/95 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                className="absolute top-4 right-4 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                onClick={() => setSelectedRecipe(null)}
              >
                &times;
              </button>

              {loadingDetails ? (
                <div className="flex items-center justify-center p-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500"></div>
                  <p className="ml-4 text-lg">Loading recipe details...</p>
                </div>
              ) : (
                <div className="p-8">
                  <h2 className="text-4xl font-bold mb-4 text-orange-600 font-serif">{selectedRecipe.title}</h2>
                  <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full rounded-lg mb-6" />
                  
                  {selectedRecipe.summary && (
                    <div
                      className="prose text-gray-700 bg-orange-50 p-6 rounded-xl mb-8"
                      dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}
                    />
                  )}

                  {selectedRecipe.extendedIngredients && (
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                      <h3 className="text-xl font-bold mb-4 text-orange-600">Ingredients</h3>
                      <ul className="list-disc pl-6">
                        {selectedRecipe.extendedIngredients.map((ing) => (
                          <li key={ing.id}>{ing.original}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedRecipe.analyzedInstructions?.[0]?.steps && (
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                      <h3 className="text-xl font-bold mb-4 text-orange-600">Instructions</h3>
                      <ol className="list-decimal pl-6 space-y-2">
                        {selectedRecipe.analyzedInstructions[0].steps.map((step) => (
                          <li key={step.number}>{step.step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {selectedRecipe.sourceUrl && (
                    <p className="text-sm text-gray-500 mt-6">
                      Source: <a href={selectedRecipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-orange-500 underline">View original recipe</a>
                    </p>
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
