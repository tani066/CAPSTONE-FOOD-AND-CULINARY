'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    const response = await fetch('https://formspree.io/f/xeozqnbb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success('Message sent successfully!');
      form.reset();
    } else {
      toast.error('Failed to send message. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-24 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          {/* Left Column */}
          <div className="p-8 bg-gradient-to-br from-[#734060] to-[#D8456B] text-white">
            <h3 className="text-3xl font-serif font-bold mb-6">Get in Touch</h3>
            <p className="mb-4">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>

            <div className="space-y-4 mt-6">
              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span>tanishk.agrawal2024@nst.rishihood.edu.in</span>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>123 Culinary Street, Foodie City</span>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span>+91 79-7499-7180</span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 text-gray-700 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D8456B] focus:border-transparent transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full text-gray-700 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D8456B] focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full text-gray-700 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#D8456B] focus:border-transparent transition-all duration-300"
                  placeholder="Your message..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#734060] to-[#D8456B] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
