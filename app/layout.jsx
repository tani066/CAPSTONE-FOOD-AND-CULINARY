import "./globals.css";
import Navbar from "./components/Navbar";





import { ThemeModeScript } from 'flowbite-react';

export default function RootLayout({ children }) {
    return (
        <html suppressHydrationWarning>
            <head>
                <ThemeModeScript />
            </head>
            <body>
              <Navbar/>
              {children}
            </body>
        </html>
    );
}