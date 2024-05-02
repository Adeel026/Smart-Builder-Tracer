import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-emerald-800 p-12 justify-center items-center text-center">
      <span className="text-sm text-white sm:text-center dark:text-gray-400">
        © 2023 <Link to="/" className="hover:underline">Smart Builder Tracker™</Link>. All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
