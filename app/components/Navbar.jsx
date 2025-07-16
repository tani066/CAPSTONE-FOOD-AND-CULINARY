'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PiForkKnifeDuotone, PiShoppingCartSimpleBold, PiRobotBold } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [groceryList, setGroceryList] = useState({});
  const { user, logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const cartRef = useRef(null);

  const navLinks = ['Home', 'About', 'Services', 'Pricing', 'Contact'];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch grocery list when user saves recipes
  useEffect(() => {
    if (!user) return;

    const fetchGroceryList = async () => {
      try {
        const snapshot = await getDocs(collection(db, `users/${user.uid}/savedRecipes`));
        const recipes = snapshot.docs.map(doc => doc.data());
        
        let recipeIngredients = {};
        for (const recipe of recipes) {
          const res = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`);
          const data = await res.json();
          if (data && data.extendedIngredients && data.title) {
            recipeIngredients[data.title] = data.extendedIngredients.map(ing => ing.original);
          } else {
            console.warn(`Invalid data structure for recipe ${recipe.id}`);
          }
        }

        setGroceryList(recipeIngredients);
      } catch (err) {
        console.error('Error loading grocery list:', err);
        toast.error('Failed to load grocery list');
      }
    };

    fetchGroceryList();
  }, [user]);
  
  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#724060] p-2">
        <p className="text-center font-bold text-lg text-white tracking-wide flex items-center justify-center gap-2">
          Our Recipes, Your Kitchen <PiForkKnifeDuotone className="text-xl" />
        </p>
      </div>

      {/* Navbar */}
      <nav className="bg-[#D8456B] px-4 py-6 md:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Logo"
              className="h-8 w-8"
            />
            <span onClick={() => router.push('/')} className="text-white italic text-xl sm:text-2xl font-semibold cursor-pointer">
              Cook & Crafted
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-4 text-white font-medium text-lg">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  onClick={() => setActiveLink(link)}
                  className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                    activeLink === link
                      ? 'bg-white text-[#D8456B] font-semibold shadow-md'
                      : 'hover:text-yellow-200'
                  }`}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Cart, AI & User Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/pages/ask-ai')}
              className="text-white hover:text-yellow-200 transition-colors duration-200 flex items-center gap-2 px-3 py-1 rounded-md border border-white/30 hover:border-yellow-200"
            >
              <PiRobotBold className="w-5 h-5" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
            { (
              <div className="relative" ref={cartRef}>
                <button
                  onClick={() => {
                    
                    if (!user) {
                      router.push('/auth/signin');
                    }
                    else{
                      setCartOpen(!isCartOpen);
                    }
                    
                  }}
                  className="text-white hover:text-yellow-200 transition-colors duration-200 relative"
                >
                  <PiShoppingCartSimpleBold className="w-6 h-6" />
                  {Object.keys(groceryList).length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {Object.values(groceryList).flat().length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isCartOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg z-50"
                    >
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">🛒 Grocery List</h3>
                        <p className="text-xs text-gray-500 mb-3 italic">Save your favorite recipes to automatically add their ingredients here!</p>
                        {Object.keys(groceryList).length === 0 ? (
                          <p className="text-gray-500 text-sm">Your grocery list is empty</p>
                        ) : (
                          <div className="space-y-4">
                            {Object.entries(groceryList).map(([recipeName, ingredients]) => (
                              <div key={recipeName} className="border-b border-gray-200 pb-3">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium text-gray-800">{recipeName}</h4>
                                  <button
                                    onClick={() => {
                                      const newList = { ...groceryList };
                                      delete newList[recipeName];
                                      setGroceryList(newList);
                                      toast.success(`Removed ${recipeName} from grocery list`);
                                    }}
                                    className="text-xs text-red-500 hover:text-red-700 transition-colors"
                                  >
                                    Remove Recipe
                                  </button>
                                </div>
                                <ul className="space-y-1">
                                  {ingredients.map((item, index) => (
                                    <li key={`${recipeName}-${index}`} className="flex items-center gap-2 text-sm text-gray-700 group">
                                      <input 
                                        type="checkbox" 
                                        className="rounded text-orange-500" 
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setTimeout(() => {
                                              const newList = { ...groceryList };
                                              newList[recipeName] = ingredients.filter((_, i) => i !== index);
                                              if (newList[recipeName].length === 0) {
                                                delete newList[recipeName];
                                              }
                                              setGroceryList(newList);
                                              toast.success('Item removed from grocery list');
                                            }, 500);
                                          }
                                        }}
                                      />
                                      <span className="group-has-[input:checked]:line-through group-has-[input:checked]:text-gray-400 transition-all duration-200">
                                        {item}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            <div className="relative flex items-center gap-2" ref={dropdownRef}>
              {user ? (
                <>
                  <p className="italic text-white text-sm hidden sm:block">Hey {user.name.split(' ')[0]}</p>
                  <button
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                    className="focus:outline-none"
                  >
                    <img
                      src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                      alt="User Avatar"
                      className="w-9 h-9 rounded-full border-2 border-white"
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-lg z-50 top-full"
                      >
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-800">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <ul className="py-2">
                          {['Dashboard', 'Settings', 'Sign out'].map((item) => (
                            <li key={item}>
                              <button
                                onClick={() => {
                                  if (item === 'Sign out') {
                                    logout();
                                    setDropdownOpen(false);
                                    router.push('/');
                                  }
                                  else if (item === 'Dashboard') {
                                    router.push('/pages/dashboard');
                                  }
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Button size="sm" onClick={() => router.push('/auth/signup')}>
                  Register
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden md:hidden mt-4 w-full"
              >
                <ul className="flex flex-col gap-2 text-white font-medium text-lg text-center">
                  {navLinks.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        onClick={() => {
                          setActiveLink(link);
                          setMenuOpen(false);
                        }}
                        className={`block px-4 py-2 rounded-md transition ${
                          activeLink === link
                            ? 'bg-white text-[#D8456B] font-semibold shadow-md'
                            : 'hover:text-yellow-200'
                        }`}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
