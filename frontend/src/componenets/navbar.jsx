import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img className="h-10 w-15" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtcRE1MPoewvyttLZp0MzrSyNjEKnfpObUVfCr0VFGbyhOamw_CIP1fBhxMqPg8wIO174&usqp=CAU" alt="Logo" />
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-gray-300 focus:outline-none">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 6H20V8H4V6ZM4 12H20V14H4V12ZM4 18H20V20H4V18Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          {/* Desktop menu items */}
          <div className="hidden md:flex md:items-center">
            <ul className="flex space-x-5">
              <li><Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Profile</Link></li>
              <li><Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Blogs</Link></li>
              <li><Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">New Blog</Link></li>
            </ul>
          </div>
          {/* Sign in and Sign up buttons */}
          <div className="hidden md:flex md:items-center">
            {!props.logged && <Link to="/login" className="text-white px-3 py-2 rounded-md text-sm font-medium"><button className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button></Link>}
            {!props.logged && <Link to="/register" className="text-white px-3 py-2 rounded-md text-sm font-medium"><button className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button></Link>}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <ul className="flex flex-col space-y-2">
            <li><Link to="/" className="block text-white hover:bg-gray-600 px-3 py-2 rounded-md text-base font-medium">Profile</Link></li>
            <li><Link to="/" className="block text-white hover:bg-gray-600 px-3 py-2 rounded-md text-base font-medium">Blogs</Link></li>
            <li><Link to="/login" className="block text-white hover:bg-gray-600 px-3 py-2 rounded-md text-base font-medium">New Blog</Link></li>
            {!props.logged && <li><Link to="/login" className="block text-white px-3 py-2 rounded-md text-base font-medium"><button className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button></Link></li>}
            {!props.logged && <li><Link to="/register" className="block text-white px-3 py-2 rounded-md text-base font-medium"><button className="m-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button></Link></li>}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
