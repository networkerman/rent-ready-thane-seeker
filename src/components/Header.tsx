
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-rental-blue to-blue-700 text-white py-20 md:py-32">
      <div className="container-custom">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            🏠 Looking for Rental – 1BHK/2BHK Flat near Netcore Cloud Thane Office
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light mb-4">
            Move in within 2 months
          </p>
          <p className="text-lg bg-white/10 p-4 rounded-lg inline-block">
            ☕ Share this listing with your network and get a free coffee from me!
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
