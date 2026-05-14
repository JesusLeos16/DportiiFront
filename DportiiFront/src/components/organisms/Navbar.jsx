import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLogout } from '../atoms/Icon';
import { NavGroup } from '../molecules/NavGroup';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-40">
      <div className="flex justify-between items-center px-6 md:px-10 py-4 relative z-10">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm">
              <img src="/favi2.png" alt="Dportii Logo" />
            </div>
            <h1 className="text-2xl font-extrabold text-blue-950 tracking-tight">Dportii</h1>
          </div>
          <div className="hidden md:block">
            <NavGroup />
          </div>
        </div>
        <IconLogout onClick={handleLogout} />
      </div>
    </nav>
  );
};