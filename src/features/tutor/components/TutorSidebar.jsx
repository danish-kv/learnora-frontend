import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../../redux/thunk/authThunks";
import {
  Home,
  BookOpen,
  Trophy,
  Folder,
  Users,
  User,
  LogOut,
} from "lucide-react";

const TutorSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const navItems = [
    { to: "/tutor", label: "Dashboard", icon: Home },
    { to: "/tutor/courses", label: "Courses", icon: BookOpen },
    { to: "/tutor/contest", label: "Contest", icon: Trophy },
    { to: "/tutor/categories", label: "Categories", icon: Folder },
    { to: "/tutor/community", label: "Community", icon: Users },
    { to: "/tutor/profile", label: "Profile", icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-indigo-700 text-white flex flex-col transition-all duration-300 ease-in-out z-20 shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-indigo-600">
        <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
      </div>
      <nav className="flex-1 py-6 px-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center py-3 px-4 rounded-lg transition duration-200 ${
                  isActive(item.to)
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-100 hover:bg-indigo-600"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-indigo-600">
        <button
          onClick={() => dispatch(Logout())}
          className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-red-700 transition duration-200 flex items-center justify-center"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default TutorSidebar;
