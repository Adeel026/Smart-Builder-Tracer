import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsappIcon = ({ whatsappLink }) => {
  const handleClick = () => {
    window.open(whatsappLink, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25d366', // WhatsApp color
        borderRadius: '50%',
        padding: '10px',
        cursor: 'pointer',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
      }}
      onClick={handleClick}
    >
      <FaWhatsapp size={24} color="#fff" />
    </div>
  );
};

export default FloatingWhatsappIcon;
