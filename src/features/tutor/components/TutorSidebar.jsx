import { Link } from "react-router-dom";
import React from "react";
import { Logout } from "../../../redux/thunk/authThunks";
import { useDispatch } from "react-redux";

const TutorSidebar = () => {
  const dispatch = useDispatch();
  
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-blue-300 text-white flex flex-col transition-transform duration-300 ease-in-out z-20">
        <div className="flex items-center justify-between h-20 border-b border-blue-500 px-4">
          <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li>
              <Link to="/tutor" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/tutor/courses" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400">
                My Course
              </Link>
            </li>
            <li>
              <Link to="/tutor/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button onClick={() => dispatch(Logout())} className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition duration-200">
            Logout
          </button>
        </div>
      </div>
  );
};

export default TutorSidebar;
