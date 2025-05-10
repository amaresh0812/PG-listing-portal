import React from 'react';
import { PhoneCall, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">StudentHaven</h3>
            <p className="text-gray-300 mb-4">
              Finding comfortable, affordable accommodation near your campus made easy.
              We connect students with the best PGs, hostels, and apartments.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">List Your Property</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">Student Resources</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={20} className="text-indigo-400 mt-1 mr-3" />
                <p className="text-gray-300">
                  Vel Tech University Avenue<br />
                  Avadi,Chennai
                </p>
              </div>
              <div className="flex items-center">
                <PhoneCall size={20} className="text-indigo-400 mr-3" />
                <p className="text-gray-300">+91 **********</p>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-indigo-400 mr-3" />
                <p className="text-gray-300">vtu22751@veltech.edu.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} StudentHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};