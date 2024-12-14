import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800  text-white py-10 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start px-4 md:px-10">
        
        {/* About Section */}
        <div className="mb-8 md:mb-0 md:w-1/3">
          <h2 className="text-2xl font-bold border-b-4 border-orange-600 pb-2 mb-4">About Us</h2>
          <p className="text-sm leading-relaxed">
            Our aim is to bring customers closer to nature and ensure the availability of the best fruits, vegetables, and grocery products for their health. Stay connected with us on our social media for the latest offers and product updates! On our website, you will easily find fresh fruits, vegetables, and quality grocery items to meet your daily needs.
          </p>
        </div>

        {/* Links Section */}
        <div className="mb-8 md:mb-0 md:w-1/3">
          <h2 className="text-2xl font-bold border-b-4 border-orange-600 pb-2 mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
            <li><Link to="/particularOrder" className="hover:text-orange-500 transition-colors">Your Order</Link></li>
            <li><Link to="/Profile" className="hover:text-orange-500 transition-colors">User Profile</Link></li>
            <li><Link to="/signup" className="hover:text-orange-500 transition-colors">Sign Up</Link></li>
            <li><Link to="/login" className="hover:text-orange-500 transition-colors">Login</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold border-b-4 border-orange-600 pb-2 mb-4">Contact Us</h2>
          <p className="mb-2">Email: <a href="mailto:greenMart@gmail.com" className="hover:text-orange-500">greenMart@gmail.com</a></p>
          <p className="mb-6">Mobile Number: +91 9657XXXX26</p>

          <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com//" target="_blank" rel="noopener noreferrer" className="bg-black text-white rounded-full p-3 hover:bg-gray-300 hover:text-blue-800">
              <FaLinkedin size={28} />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="bg-black text-white rounded-full p-3 hover:bg-gray-300 hover:text-blue-800">
              <FaFacebookF size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>&copy; 2024 GreenMart PVT.LTD. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
