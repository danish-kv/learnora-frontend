import React from 'react'
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="w-64 bg-green-600 text-white flex flex-col">
          <div className="flex items-center justify-center h-20 border-b border-green-500">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <nav className="flex-1 p-4">
            <ul>
              <li>
                <Link to="/admin/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/student" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500">
                  Students
                </Link>
              </li>
              <li>
                <Link to="/admin/instructor" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500">
                  Instructors
                </Link>
              </li>
              <li>
                <Link to="/admin/course" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-500">
                  Courses
                </Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </nav>
          <div className="p-4">
            <button className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition duration-200">
              Logout
            </button>
          </div>
        </div>
      );
    
}

export default AdminSidebar