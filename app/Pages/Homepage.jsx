import React from 'react'
import HeroSection from '../components/HeroSection'
import RandomRecipeCard from '../components/RandomRecipe'
import HomeDessert from '../components/HomeDessert'
import AboutUs from '../components/AboutUs'
import Footer from '../components/Footer'

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection/>
        <HomeDessert/>
        <RandomRecipeCard/>
        <AboutUs/>
      </main>
      <Footer/>
    </div>
  )
}
export default Homepage