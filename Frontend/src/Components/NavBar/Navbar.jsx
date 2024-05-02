import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import navLogo from './navLogo.png';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';
import { useUserContext } from '../../context/UserContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { userType, setUserType } = useUserContext();
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/logout-user', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                localStorage.getItem('user') != null && localStorage.removeItem('user');
                localStorage.removeItem('token');
                setUserType('main');
                navigate('/');

            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <nav className="container relative mx-auto p-6 ">
            <div className="flex items-center justify-between">
                <div className="pt-2">
                    <img src={navLogo} className="w-12" alt="Logo" />
                </div>
                <div>
                    <div className="hidden  md:flex space-x-6 font-serif ">
                        <NavLink to="/" className="hover:text-gray-400">Home</NavLink>
                        <Dropdown>
                            <MenuButton className="hover:text-gray-400"> Our Services</MenuButton>
                            <Menu>
                                <MenuItem><NavLink to="/book" className="hover:text-gray-400">Quality Assurance</NavLink></MenuItem>
                                <MenuItem><NavLink to="/budget" className="hover:text-gray-400">Budget Estimation</NavLink></MenuItem>
                            </Menu>
                        </Dropdown>
                        <NavLink to="/about" className="hover:text-gray-400">About us</NavLink>
                        {userType === 'main' && (
                            <>
                                <NavLink to="/tracktasks" className="hover:text-gray-400">Track Tasks</NavLink>
                                <NavLink to="/login" className="hover:text-gray-400">Login</NavLink>
                                <NavLink to="signup" className="hover:text-gray-400">Sign up</NavLink>
                            </>
                        )}
                        {userType === 'customer' && (
                            <>
                                <NavLink to="/customer" className="hover:text-gray-400">All Projects</NavLink>
                                <NavLink to="/customer/createproject" className="hover:text-gray-400">Create Project</NavLink>
                                <NavLink onClick={handleLogout} className="hover:text-gray-400">Logout</NavLink>
                            </>
                        )}
                        {userType === 'supervisor' && (
                            <>
                                <NavLink to="/supervisor" className="hover:text-gray-400">All Projects</NavLink>
                                <NavLink to="/supervisor/requestedprojects" className="hover:text-gray-400">Requested Projects</NavLink>
                                <NavLink onClick={handleLogout} className="hover:text-gray-400">Logout</NavLink>
                            </>
                        )}
                    </div>
                </div>
                <NavLink to="/" className="hidden md:block p-3 px-6 pt-2 text-white bg-red-950 rounded-full self-baseline hover:bg-red-500">
                    Smart Builder Tracker
                </NavLink>
                <MobileMenu />
            </div>
        </nav>
    );
}

export default Navbar;
