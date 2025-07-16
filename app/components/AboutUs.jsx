"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactUs from './ContactUs';

export default function AboutUs() {
  const features = [
    { icon: "🎯", title: "Personalized AI Recipes", description: "Get custom recipes based on your ingredients" },
    { icon: "✨", title: "Daily Inspiration", description: "Discover new dishes every day" },
    { icon: "💪", title: "Nutrition Focused", description: "Meals tailored to your health goals" },
    { icon: "📱", title: "User Friendly", description: "Smooth experience across all devices" }
  ];

  return (
    <section id="about" className="relative bg-gradient-to-br from-orange-50 via-rose-50 to-yellow-100 w-full px-6 py-24 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-[#734060] via-[#D8456B] to-orange-600 text-transparent bg-clip-text mb-6">
            Crafting Culinary Magic
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Welcome to <span className='text-pink-500'>Cook & Crafted</span>! We combine the art of cooking with the power of AI to bring joy and creativity to your culinary journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src="https://www.dorsey.edu/wp-content/uploads/2023/05/what-is-culinary-arts.jpg"
                alt="Cooking inspiration"
                width={600}
                height={400}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            </div>
            {/* Decorative blur effects */}
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-yellow-200 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-200 rounded-full opacity-50 blur-2xl"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#734060] font-semibold">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-[#D8456B] mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <blockquote className="relative max-w-2xl mx-auto px-8 py-6">
            <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 text-6xl text-[#D8456B] opacity-50">❝</div>
            <p className="relative z-10 text-xl md:text-2xl text-gray-700 italic">
              "Cooking is where creativity meets tradition, and innovation transforms the ordinary into extraordinary."
            </p>
            <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 text-6xl text-[#D8456B] opacity-50">❞</div>
          </blockquote>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      <div id="contact">
        <ContactUs/>
      </div>
    </section>
  );
}

