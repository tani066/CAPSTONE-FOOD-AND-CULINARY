'use client';
import "./globals.css";
import { ThemeModeScript } from 'flowbite-react';
import Navbar from "./components/Navbar";
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
    return (
        <html suppressHydrationWarning>
            <head>
                <ThemeModeScript />
            </head>
            <body>
              <AuthProvider>
                <Navbar/>
                {children}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: '#fff',
                      color: '#333',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      borderRadius: '10px',
                      padding: '16px',
                    },
                    success: {
                      iconTheme: {
                        primary: '#22c55e',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
              <Footer/>
              </AuthProvider>
            </body>
        </html>
    );
}