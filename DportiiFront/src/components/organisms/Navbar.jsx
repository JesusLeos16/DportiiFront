import React, { useState } from 'react';
import { IconMenu, IconUser } from '../atoms/Icon';
import { NavGroup } from '../molecules/NavGroup';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="flex justify-between items-center px-10 py-4 bg-white relative z-10">
          <IconMenu onClick={toggleMenu} /> 
          
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">Dportii</h1>
          <IconUser onClick={toggleMenu} />
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <NavGroup />
      </div>
      
    </nav>
  );
};