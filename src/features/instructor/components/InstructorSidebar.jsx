import { Link } from "react-router-dom";
import React from "react";

const InstructorSidebar = () => {
  return (
    <div className="w-64 bg-blue-300 text-white flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-blue-500">
        <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li>
            <Link
              to="/instructor"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/instructor/course"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400"
            >
              My Course
            </Link>
          </li>
          <li>
            <Link
              to="/instructor/profile"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <button className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition duration-200">
          Logout
        </button>
      </div>
    </div>
  );
};

export default InstructorSidebar;
