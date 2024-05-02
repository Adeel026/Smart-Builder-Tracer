import React from 'react';

const CustomButton = ({ text }) => {
  return (
    <button className="m-2 md:m-0.5 px-4 py-1 text-sm text-white bg-red-900 border font-serif border-gray-300 rounded-lg md:rounded-md focus:outline-none focus:ring focus:border-blue-300 ml-0 mr-0">
      {text}
    </button>
  );
}

export default CustomButton;
