import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
// import HomeDessert from './HomeDessert';

const HeroSection = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleRoute = (tab) => {
    if (!user) {
      router.push('/auth/signup');
    } else {
      router.push(`/recipes?tab=${tab}`);
    }
  };

  return (
    <div>
      <section className="text-center px-6 py-12 max-w-screen-xl mx-auto">
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-light mb-6">
          Simple recipes made for
          <span className="block sm:inline text-[#734060] font-serif text-2xl sm:text-3xl md:text-4xl ml-1">
            real, actual, everyday life.
          </span>
        </p>

        <a
          onClick={() => {
            if (!user) {
              router.push('/auth/signin');
            } else {
              router.push('/recipes?tab=breakfast');
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D8456B] hover:bg-[#c53c5f] text-white text-lg rounded-full transition duration-300 shadow-md cursor-pointer"
        >
          Explore Recipes
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.293 15.293a1 1 0 001.414 0l4.293-4.293a1 1 0 00-.707-1.707H6a1 1 0 000 2h9.586l-3.293 3.293a1 1 0 00-.293.707z" />
          </svg>
        </a>
      </section>

      <div className="px-6 pb-12">
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-[80vw] mx-auto">
    {[
      {
        title: 'Breakfast Recipes',
        img: 'https://pinchofyum.com/cdn-cgi/image/width=360,height=514,fit=crop/wp-content/uploads/Pepperoncini-Chicken-6.jpg',
        tab: 'breakfast',
      },
      {
        title: 'Lunch Recipes',
        img: 'https://pinchofyum.com/cdn-cgi/image/width=360,height=514,fit=crop/wp-content/uploads/Carrot-Cake-Coffee-Cake-1.jpg',
        tab: 'lunch',
      },
      {
        title: 'Snacks Recipes',
        img: 'https://pinchofyum.com/cdn-cgi/image/width=360,height=514,fit=crop/wp-content/uploads/Mojo-Bowls-1.jpg',
        tab: 'snacks',
      },
      {
        title: 'Dinner Recipes',
        img: 'https://pinchofyum.com/cdn-cgi/image/width=360,height=514,fit=crop/wp-content/uploads/Crispy-Chicken-Cutlets-on-Plate.jpg',
        tab: 'dinner',
      },
    ].map(({ title, img, tab }) => (
      <div
        key={tab}
        onClick={() => handleRoute(tab)}
        className="relative cursor-pointer group overflow-hidden rounded-xl shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
      >
        <img
          src={img}
          alt={title}
          className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Sliding Text */}
        <div className="absolute bottom-0 w-full text-center p-4 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <h3 className="text-white text-xl font-semibold drop-shadow">{title}</h3>
          <p className="text-white text-sm mt-1">Click to explore delicious {tab} ideas</p>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* AI Feature Section */}
      <div className="px-6 py-12 bg-gradient-to-br from-orange-50 to-yellow-100 w-[90vw] m-auto rounded-3xl border border-[#cbe44d]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-[#734060] mb-6">Discover AI-Powered Recipe Magic</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">Transform your available ingredients into delicious meals with our AI chef. Get personalized recipe suggestions tailored to your preferences and pantry.</p>
          
          <div className="max-w-md mx-auto cursor-pointer" onClick={() => router.push('/ask-ai')}>
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#D8456B] to-[#734060] rounded-full">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Recipe Generator</h3>
              <p className="text-gray-600">Let our AI chef create the perfect recipe based on your ingredients and preferences.</p>
              <div className="mt-6">
                <span className="inline-flex items-center text-[#D8456B] font-medium hover:text-[#c53c5f] transition-colors duration-300">
                  Try it now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HeroSection;
