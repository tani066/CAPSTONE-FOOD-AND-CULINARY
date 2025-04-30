import React from 'react'

const HeroSection = () => {
  return (
  <div>
  <section className="text-center px-6 py-12 max-w-screen-xl mx-auto">
    {/* Heading */}
    <p className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-light mb-6">
      Simple recipes made for
      <span className="block sm:inline text-[#734060] font-serif text-2xl sm:text-3xl md:text-4xl ml-1">
        real, actual, everyday life.
      </span>
    </p>

    {/* CTA Button */}
    <a
      href="/recipes"
      className="inline-flex items-center gap-2 px-6 py-3 bg-[#D8456B] hover:bg-[#c53c5f] text-white text-lg rounded-full transition duration-300 shadow-md"
    >
      Explore Recipes
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10.293 15.293a1 1 0 001.414 0l4.293-4.293a1 1 0 00-.707-1.707H6a1 1 0 000 2h9.586l-3.293 3.293a1 1 0 00-.293.707z" />
      </svg>
    </a>
  </section>

  {/* Image Grid */}
  <div className="px-6 pb-12">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[80vw] mx-auto">

        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 hover:scale-105">
          <img
            src="https://pinchofyum.com/cdn-cgi/image/width=360,height=514,fit=crop/wp-content/uploads/Pepperoncini-Chicken-6.jpg"
            
            className="w-full h-auto object-cover"
          />
        </div>
        <div  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 hover:scale-105">
          <img
            src="https://pinchofyum.com/cdn-cgi/image/width=360,height=514,fit=crop/wp-content/uploads/Carrot-Cake-Coffee-Cake-1.jpg"
            
            className="w-full h-auto object-cover"
          />
        </div>
        <div  className="rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition duration-300 hover:scale-105 ">
          <img
            src="https://pinchofyum.com/cdn-cgi/image/width=360,height=514,fit=crop/wp-content/uploads/Mojo-Bowls-1.jpg"
            
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 hover:scale-105">
          <img
            src="https://pinchofyum.com/cdn-cgi/image/width=360,height=514,fit=crop/wp-content/uploads/Crispy-Chicken-Cutlets-on-Plate.jpg"
            
            className="w-full h-auto object-cover"
          />
        </div>
      
    </div>
  </div>
</div>

  )
}

export default HeroSection