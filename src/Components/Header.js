import React from 'react';

const Header = () => {
  return (
    <div className="bg-black text-white flex justify-between items-center px-8 py-4">
      {/* Logo Section */}
      <div className="w-32 h-16">
        <img
          src="https://imgs.search.brave.com/dlIRJQ1s8a-Jgwx28JOj5aPCL6SOUQe81ItYQATQQEE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0Lzk5LzM4LzY1/LzM2MF9GXzQ5OTM4/NjU3MV93a0tsSkY1/YmpSUHNkUXhVcDZu/MTFTeW5aOGZ3dXp5/aC5qcGc"
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-x-6 text-lg font-medium">
        <h2 className="cursor-pointer hover:text-gray-400">Home</h2>
        <h2 className="cursor-pointer hover:text-gray-400">Movie</h2>
        <h2 className="cursor-pointer hover:text-gray-400">Theatre</h2>
        <h2 className="cursor-pointer hover:text-gray-400">Orders</h2>
      </div>
    </div>
  );
};

export default Header;
