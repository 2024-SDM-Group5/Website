import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full flex flex-col min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-5 text-center">
          <h1 className="text-xl font-bold text-gray-700">APP Name</h1>
        </div>
		<Navbar /> 

      <main className="flex-grow">
        {children}
      </main>

      
        <Footer />
      
    </div>
  );
};

export default Layout;
