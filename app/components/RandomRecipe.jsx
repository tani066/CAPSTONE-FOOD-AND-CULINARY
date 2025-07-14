"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const hardcodedRecipes = [
  {
    id: 716429,
    title: "Spicy Chicken Tacos",
    image: "https://img.spoonacular.com/recipes/716429-556x370.jpg",
    summary:
      "Delicious tacos filled with spicy grilled chicken, fresh salsa, creamy avocado, and a hint of lime, all wrapped in warm tortillas. Perfect for a quick dinner or casual gathering, these tacos offer a bold flavor punch and a satisfying crunch with every bite.",
    readyInMinutes: 30,
    servings: 2,
  },
  {
    id: 715594,
    title: "Classic Margherita Pizza",
    image: "https://img.spoonacular.com/recipes/715594-556x370.jpg",
    summary:
      "A simple yet classic Italian pizza topped with fresh tomatoes, aromatic basil leaves, and melted mozzarella cheese on a thin crispy crust. This traditional dish is a timeless favorite, offering a perfect balance of freshness and rich cheesy goodness.",
    readyInMinutes: 25,
    servings: 4,
  },
  {
    id: 640621,
    title: "Vegan Buddha Bowl",
    image: "https://img.spoonacular.com/recipes/640621-556x370.jpg",
    summary:
      "A nourishing bowl packed with protein-rich quinoa, roasted chickpeas, colorful fresh vegetables like carrots, spinach, and avocado, all topped with a creamy tahini dressing. This vegan dish is both satisfying and energizing, making it perfect for a clean and balanced meal.",
    readyInMinutes: 20,
    servings: 1,
  },
  {
    id: 715538,
    title: "Creamy Mushroom Pasta",
    image: "https://img.spoonacular.com/recipes/715538-556x370.jpg",
    summary:
      "Rich and creamy pasta made with sautéed mushrooms, garlic, and a smooth parmesan sauce. This comforting Italian-style dish is perfect for cozy dinners, offering earthy flavors and a luxurious texture that clings to every strand of pasta.",
    readyInMinutes: 35,
    servings: 3,
  },
  {
    id: 644387,
    title: "Berry Yogurt Parfait",
    image: "https://img.spoonacular.com/recipes/644387-556x370.jpg",
    summary:
      "Layered parfait with juicy mixed berries, crunchy granola, and creamy Greek yogurt for a healthy and delicious treat. It's perfect as a quick breakfast, light dessert, or snack packed with antioxidants, fiber, and protein.",
    readyInMinutes: 10,
    servings: 2,
  },
];

export default function RandomRecipeShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % hardcodedRecipes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = hardcodedRecipes[index];

  return (
    <section className="w-full px-4 text-zinc-900 font-sans">
      <div className="w-[90vw] mx-auto">
        <div className="bg-white border border-orange-200 rounded-3xl shadow-xl overflow-hidden md:flex items-center min-h-[540px] transition-all duration-700 ease-in-out">
          {/* Left Side */}
          <div className="md:w-1/2 p-10 space-y-6">
            <h2 className="text-4xl font-bold text-orange-600 tracking-tight leading-tight font-serif">
              🍽️ Try Our Best Recipes
            </h2>
            <p className="text-zinc-600 text-lg font-normal transition-opacity duration-500 ease-in-out">
              {current.summary}
            </p>
            <div className="text-sm text-orange-500">
              ⏱ Ready in {current.readyInMinutes} min • 🍴 Serves {current.servings}
            </div>
            <Link
              href={`https://spoonacular.com/recipes/${current.title.toLowerCase().replace(/ /g, '-')}-${current.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-4 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-5 py-3 rounded-xl font-medium shadow-lg flex items-center gap-2 transition-all">
                View Recipe <ArrowRight size={18} />
              </button>
            </Link>
          </div>

          {/* Right Side Image with framer-motion */}
          <div className="md:w-1/2 relative min-h-[400px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover rounded-bl-3xl md:rounded-bl-none md:rounded-r-3xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
