"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutUs() {
  const features = [
    { icon: "🎯", title: "Personalized AI Recipes", description: "Get custom recipes based on your ingredients" },
    { icon: "✨", title: "Daily Inspiration", description: "Discover new dishes every day" },
    { icon: "💪", title: "Nutrition Focused", description: "Meals tailored to your health goals" },
    { icon: "📱", title: "User Friendly", description: "Smooth experience across all devices" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-rose-50 to-yellow-100 w-full px-6 py-24 overflow-hidden">
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
      {/* Contact Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-24 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          <div className="p-8 bg-gradient-to-br from-[#734060] to-[#D8456B] text-white">
            <h3 className="text-3xl font-serif font-bold mb-6">Get in Touch</h3>
            <p className="mb-4">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span>contact@cookandcrafted.com</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>123 Culinary Street, Foodie City</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D8456B] focus:border-transparent transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D8456B] focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D8456B] focus:border-transparent transition-all duration-300"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#734060] to-[#D8456B] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                type="submit"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

