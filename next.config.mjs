import withFlowbiteReact from "flowbite-react/plugin/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'img.spoonacular.com',          // ✅ Spoonacular recipe images
      'images.unsplash.com',
      'www.dorsey.edu',               // ✅ Unsplash images (used in About Us)
    ],
  },
};

export default withFlowbiteReact(nextConfig);
