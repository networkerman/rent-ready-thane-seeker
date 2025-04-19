
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-rental-blue to-blue-700 text-white py-20 md:py-32">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            🏠 Looking to Buy – 1BHK/2BHK Flat near Netcore Cloud Thane Office
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light">
            Move in within 2 months
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
