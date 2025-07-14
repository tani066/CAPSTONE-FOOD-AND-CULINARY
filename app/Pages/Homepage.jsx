import React from 'react'
import HeroSection from '../components/HeroSection'
import RandomRecipeCard from '../components/RandomRecipe'
import HomeDessert from '../components/HomeDessert'
import AboutUs from '../components/AboutUs'


const Homepage = () => {
  return (
    <div>
        <HeroSection/>
         <HomeDessert/>
        <RandomRecipeCard/>
        <AboutUs/>
       
    </div>
  )
}

export default Homepage