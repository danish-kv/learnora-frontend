import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center">
        <img src="/logo.png" alt="Learnora Logo" className="h-16 w-auto" />
      </div>

      <div className="hidden md:flex space-x-8">
        <Link to="/">
          <a className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
            Home
          </a>
        </Link>
        <Link to="/course">
          <a className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
            Courses
          </a>
        </Link>
        <Link to="/contest">
          <a className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
            Contest
          </a>
        </Link>
        <Link to="/discussion">
          <a className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
            Discussion
          </a>
        </Link>
        <Link to="/community">
          <a className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
            Community
          </a>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img
                src="/profile-image.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700 font-medium">Adinan</span>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <Link to="/profile">
                  <a className="block px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white rounded-t-lg">
                    Profile
                  </a>
                </Link>
                <a
                  href="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white"
                >
                  Settings
                </a>
                <Link to="/logout">
                  <a className="block px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white rounded-b-lg">
                    Logout
                  </a>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 px-2 py-1 text-sm font-medium">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 px-2 py-1 text-sm font-medium">
                Register
              </button>
            </Link>
            <Link to="/instructor/register">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-600 transition duration-300">
                Become a Instructor
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
