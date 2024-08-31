import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../../../redux/thunk/authThunks";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col transition-transform duration-300 ease-in-out z-20 shadow-lg">
      <div className="flex items-center justify-between h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 active:bg-gray-600"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/student"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Students
            </Link>
          </li>
          <li>
            <Link
              to="/admin/tutor"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Tutor
            </Link>
          </li>
          <li>
            <Link
              to="/admin/courses"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              to="/admin/category"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Category
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={() => {
            dispatch(Logout());
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
