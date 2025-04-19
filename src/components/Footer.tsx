
import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-lg font-medium mb-2">Move in within 2 months</p>
            <p className="text-gray-400">
              &copy; {currentYear} Udayan Das Chowdhury. All rights reserved.
            </p>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
