"use client";

import { useState } from "react";
import Image from "next/image";
import { PiForkKnifeDuotone } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navLinks = ["Home", "About", "Services", "Pricing", "Contact"];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#724060] p-2">
        <p className="flex justify-center items-center font-bold text-lg text-white tracking-wide">
          Our Recipes, Your Kitchen
          <span className="ml-2 text-xl">
            <PiForkKnifeDuotone />
          </span>
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-[#D8456B] px-4 py-4 md:p-8 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Logo"
              className="h-8 w-8"
            />
            <span className="text-white italic text-xl sm:text-2xl font-semibold">
              Cook & Crafted
            </span>
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex gap-4 text-white font-medium text-lg">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onClick={() => setActiveLink(link)}
                    className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                      activeLink === link
                        ? "bg-white text-[#D8456B] font-semibold shadow-md"
                        : "hover:text-yellow-200"
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Avatar */}
          <div className="relative flex items-center ml-4">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none"
            >
              <img
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="User Avatar"
                className="w-9 h-9 rounded-full border-2 border-white"
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-lg z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-800">
                      Bonnie Green
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      name@flowbite.com
                    </p>
                  </div>
                  <ul className="py-2">
                    {["Dashboard", "Settings", "Sign out"].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <ul className="flex flex-col gap-2 text-white font-medium text-lg text-center">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onClick={() => setActiveLink(link)}
                    className={`block px-4 py-2 rounded-md transition ${
                      activeLink === link
                        ? "bg-white text-[#D8456B] font-semibold shadow-md"
                        : "hover:text-yellow-200"
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
