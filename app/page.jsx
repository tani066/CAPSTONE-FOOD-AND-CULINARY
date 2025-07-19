'use client';
import React, { useEffect } from 'react';
import HeroSection from './components/HeroSection'
import RandomRecipeCard from './components/RandomRecipe'
import HomeDessert from './components/HomeDessert'
import AboutUs from './components/AboutUs'


const Page = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection/>
        <HomeDessert/>
        <RandomRecipeCard/>
        <AboutUs/>
      </main>
      
    </div>
      
    </>
  );
};

export default Page;