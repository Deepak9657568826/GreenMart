import React from 'react';
import {FaQrcode , FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { IoMdAppstore } from "react-icons/io";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-black text-white py-10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-6 md:px-10">
      
      {/* Exclusive Section */}
      <div className="col-span-1">
        <h2 className="text-lg font-semibold">GreenMart</h2>
        <p className="text-gray-400 text-sm mt-2">Subscribe</p>
        <p className="text-gray-400 text-xs">Get 10% off your first order</p>
        <div className="mt-3 flex items-center border border-gray-600 rounded-lg overflow-hidden">
          <input type="email" placeholder="Enter your email" className="bg-transparent text-sm text-white px-3 py-2 outline-none w-full" />
          <button className="bg-gray-600 px-4 py-2 hover:bg-gray-400 transition">&gt;</button>
        </div>
      </div>
  
      {/* Support Section */}
      <div>
        <h2 className="text-lg font-semibold">Support</h2>
        <p className="text-gray-400 text-sm mt-2">India</p>
        <p className="text-gray-400 text-sm mt-2">greenmart@gmail.com</p>
        <p className="text-gray-400 text-sm mt-2">+80010-88888-9999</p>
      </div>
  
      {/* Account Section */}
      <div>
        <h2 className="text-lg font-semibold">Account</h2>
        <ul className="text-gray-400 text-sm mt-2 space-y-2">
          <li><a href="#" className="hover:text-white transition">My Account</a></li>
          <li><a href="#" className="hover:text-white transition">Login / Register</a></li>
          <li><a href="#" className="hover:text-white transition">Cart</a></li>
          <li><a href="#" className="hover:text-white transition">Wishlist</a></li>
          <li><a href="#" className="hover:text-white transition">Shop</a></li>
        </ul>
      </div>
  
      {/* Quick Links Section */}
      <div>
        <h2 className="text-lg font-semibold">Quick Link</h2>
        <ul className="text-gray-400 text-sm mt-2 space-y-2">
          <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
          <li><a href="#" className="hover:text-white transition">FAQ</a></li>
          <li><a href="#" className="hover:text-white transition">Contact</a></li>
        </ul>
      </div>
  
      {/* Download App Section */}
      <div>
        <h2 className="text-lg font-semibold">Download App</h2>
        <p className="text-gray-400 text-xs mt-2">Save $3 With App New User Only</p>
        <div className="mt-3 flex items-center space-x-2">
        <a href="#" className="text-gray-400 hover:text-white transition">
        <FaQrcode size={22} />play store
      </a>
          <div className="space-y-2">
          <a href="#" className="text-gray-400 hover:text-white transition">
        <IoMdAppstore size={22} />play store
      </a>
      <a href="#" className="text-gray-400 hover:text-white transition">
        <IoMdAppstore size={22} />play store

      </a>
          </div>
        </div>
      </div>
  
    </div>
  
    {/* Social Media Section */}
    <div className="flex justify-center space-x-6 mt-6">
      <a href="#" className="text-gray-400 hover:text-white transition">
        <FaFacebookF size={22} />
      </a>
      <a href="#" className="text-gray-400 hover:text-white transition">
        <FaTwitter size={22} />
      </a>
      <a href="#" className="text-gray-400 hover:text-white transition">
        <FaInstagram size={22} />
      </a>
      <a href="#" className="text-gray-400 hover:text-white transition">
        <FaLinkedin size={22} />
      </a>
    </div>
  
    {/* Footer Bottom */}
    <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
      <p>&copy; Copyright Rimel 2022. All rights reserved</p>
    </div>
  </footer>

  );
}

export default Footer;
