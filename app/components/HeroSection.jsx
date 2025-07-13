import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleRoute = (tab) => {
    if (!user) {
      router.push('/auth/signup');
    } else {
      router.push(`/pages/recipes?tab=${tab}`);
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
              router.push('/pages/recipes');
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-[-8] w-full text-center p-4 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-white text-xl font-semibold drop-shadow">{title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
