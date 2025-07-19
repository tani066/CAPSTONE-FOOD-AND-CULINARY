import React from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const HomeDessert = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleRoute = () => {
    if (!user) {
      router.push('/auth/signup');
    } else {
      router.push('/pages/recipes?tab=dessert');
    }         
  };
  return (
    <section className=" w-full px-4 py-20 text-zinc-900 font-sans">
    <div className="px-6 py-16 bg-gradient-to-br from-pink-50 to-rose-100 rounded-3xl w-[90vw] m-auto border border-[#efc5f5]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-serif text-[#734060] mb-6 leading-tight">
                Indulge in Sweet <br className="hidden md:block" />
                <span className="text-[#D8456B]">Delights</span>
              </h2>
              <p className="text-gray-700 text-lg mb-8 max-w-xl">
                Discover our collection of irresistible desserts. From classic favorites to innovative creations, 
                satisfy your sweet cravings with our carefully curated recipes.
              </p>
              <button 
                onClick={() => handleRoute('dessert')}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-[#D8456B] rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#D8456B] to-[#734060] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  Explore Desserts
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4 transform hover:scale-105 transition-transform duration-500">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://pinchofyum.com/cdn-cgi/image/width=360,height=514,fit=crop/wp-content/uploads/Chocolate-Cake-Recipe.jpg" 
                    alt="Chocolate Cake"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <p className="absolute bottom-4 left-4 text-white font-medium text-lg">Chocolate Cake</p>
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc3NlcnR8ZW58MHx8MHx8fDA%3D" 
                    alt="Cookies"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <p className="absolute bottom-4 left-4 text-white font-medium text-lg">Cookies</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-100 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-pink-100 rounded-full opacity-50 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
      </section>
  )
}

export default HomeDessert