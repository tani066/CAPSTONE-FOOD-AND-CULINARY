'use client';
import React, { useEffect } from 'react';
import Homepage from './pages/Homepage';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';


const Page = () => {
  return (
    <div>
      <Homepage />
      
    </div>
  );
};

export default Page;