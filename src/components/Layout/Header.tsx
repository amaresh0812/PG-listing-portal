import React, { useState, useEffect } from 'react';
import { Home, LogIn, LogOut, Menu, X } from 'lucide-react';

interface HeaderProps {
  navigateToHome: () => void;
  navigateToLogin: () => void;
  isLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  navigateToHome, 
  navigateToLogin, 
  isLoggedIn 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-gradient-to-r from-indigo-600 to-indigo-800 py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={navigateToHome}
        >
          <Home 
            size={28} 
            className={`mr-2 ${isScrolled ? 'text-indigo-600' : 'text-white'}`} 
          />
          <h1 
            className={`text-xl font-bold ${
              isScrolled ? 'text-indigo-600' : 'text-white'
            } transition-colors duration-300`}
          >
            StudentHaven
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#" 
            className={`text-sm font-medium ${
              isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
            } transition-colors duration-300`}
            onClick={() => navigateToHome()}
          >
            Home
          </a>
          <a 
            href="#" 
            className={`text-sm font-medium ${
              isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
            } transition-colors duration-300`}
            onClick={()=>{navigateToHome}}
          >
            About
          </a>
          <a 
            href="#" 
            className={`text-sm font-medium ${
              isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
            } transition-colors duration-300`}
            onClick={()=>{navigateToHome}}
          >
            Contact
          </a>
          
          {isLoggedIn ? (
            <button 
              className={`flex items-center text-sm font-medium ${
                isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-200'
              } transition-colors duration-300`}
              onClick={() => navigateToLogin()}
            >
              <LogOut size={16} className="mr-1" /> Logout
            </button>
          ) : (
            <button 
              className="flex items-center px-4 py-2 bg-white text-indigo-600 rounded-md shadow-sm hover:bg-indigo-50 transition-colors duration-300"
              onClick={() => navigateToLogin()}
            >
              <LogIn size={16} className="mr-1" /> Login
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X 
              size={24} 
              className={isScrolled ? 'text-gray-800' : 'text-white'} 
            />
          ) : (
            <Menu 
              size={24} 
              className={isScrolled ? 'text-gray-800' : 'text-white'} 
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="py-3 px-4 space-y-3">
            <a 
              href="#" 
              className="block py-2 text-gray-700 font-medium hover:text-indigo-600"
              onClick={() => {
                navigateToHome();
                setIsMobileMenuOpen(false);
              }}
            >
              Home
            </a>
            <a 
              href="#" 
              className="block py-2 text-gray-700 font-medium hover:text-indigo-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#" 
              className="block py-2 text-gray-700 font-medium hover:text-indigo-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            
            {isLoggedIn ? (
              <button 
                className="block w-full text-left py-2 text-gray-700 font-medium hover:text-indigo-600"
                onClick={() => {
                  navigateToLogin();
                  setIsMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            ) : (
              <button 
                className="block w-full text-left py-2 px-4 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
                onClick={() => {
                  navigateToLogin();
                  setIsMobileMenuOpen(false);
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};