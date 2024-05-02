import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import navLogo from './navLogo.png'; // Import the image

import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <div>
                <nav className="container relative mx-auto p-6 ">
                    {/* Flex container */}
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="pt-2">
                            <img src={navLogo} className="w-12" alt="Logo" />
                        </div>
                        <div>
                            <div className="hidden  md:flex space-x-6 font-serif ">
                                <NavLink to="/" className="hover:text-gray-400">Home</NavLink>
                                {/*  */}
                                <Dropdown>
                                    <MenuButton><NavLink to="/services" className="hover:text-gray-400">Our Services</NavLink></MenuButton>
                                    <Menu>
                                        <MenuItem><NavLink to="/quality" className="hover:text-gray-400">Quality Assurance</NavLink></MenuItem>
                                        <MenuItem><NavLink to="/budget" className="hover:text-gray-400">Budget Estimation</NavLink></MenuItem>
                                    </Menu>
                                </Dropdown>
                                <NavLink to="/about" className="hover:text-gray-400">About us</NavLink>
                                <NavLink to="/signup" className="hover:text-gray-400">Sign up</NavLink>
                                <NavLink to="/login" className="hover:text-gray-400">Login</NavLink>
                            </div>
                        </div>
                        {/* Smart Builder tracker Button */}
                        <NavLink to="/" className="hidden md:block p-3 px-6 pt-2 text-white bg-red-950 rounded-full self-baseline hover:bg-red-500">
                            Smart Builder Tracker
                        </NavLink>
                        {/* Menu for Mobile */}
                        <MobileMenu />
                    </div>


                </nav>

            </div>
            <div className="bg-black p-12 justify-center items-center text-center mt-10">
                <h1 className="text-white text-4xl font-serif">Welcome to Smart Builder Tracker</h1>
            </div>
        </>
    );
}

export default Navbar;
