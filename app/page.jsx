'use client'
import React, { useEffect } from 'react'
import Homepage from './Pages/Homepage';

const page = () => {
  useEffect(() => {
      async function fetchIngredients() {
      const apiKey = 'faca1a93e4b74b9ba8ef2fdafe004d18';
      const number = 100; // how many results at a time
      let offset = 0;     // starting point
      let allIngredients = [];
    
      while (true) {
        const res = await fetch(
          `https://api.spoonacular.com/food/ingredients/search?query=a&number=${number}&offset=${offset}&apiKey=${apiKey}`
        );
        const data = await res.json();
    
        if (data.results.length === 0) {
          break; // No more ingredients
        }
    
        allIngredients = allIngredients.concat(data.results);
        offset += number;
      }
    
      console.log(allIngredients); // 🎯 Full list here!
    }
    
    fetchIngredients();
}, [])
  return (
    <div>
      <Homepage/>
    </div>
  )
}

export default page