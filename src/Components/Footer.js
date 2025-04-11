import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0F0F0F] text-gray-400 py-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
        
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-white">🎬 CineBook</h1>
          <p className="text-sm mt-1">Your Movie Booking Partner</p>
        </div>

        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition duration-300">Privacy</a>
          <a href="#" className="hover:text-white transition duration-300">Terms</a>
          <a href="#" className="hover:text-white transition duration-300">Contact</a>
        </div>

        <p className="text-sm mt-4 md:mt-0">&copy; {new Date().getFullYear()} CineBook. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
