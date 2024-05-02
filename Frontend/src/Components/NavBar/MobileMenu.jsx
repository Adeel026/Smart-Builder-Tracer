import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button
        id='menu-btn'
        className='block focus:outline-none md:hidden'
        onClick={toggleMenu}
      >
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}

      </button>
      {isMenuOpen && (
        <div className='absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md md:hidden'>
          <NavLink to="/" className="hover:text-gray-400">Home</NavLink>
          <NavLink to="/services" className="hover:text-gray-400">Our Services</NavLink>
          <NavLink to="/about" className="hover:text-gray-400">About us</NavLink>
          <NavLink to="/signup" className="hover:text-gray-400">Sign up</NavLink>
          <NavLink to="/login" className="hover:text-gray-400">Login</NavLink>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
