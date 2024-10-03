import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../../redux/thunk/authThunks";
import {
  Home,
  BookOpen,
  Trophy,
  Folder,
  Users,
  User,
  LogOut,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import {
  closeSidebar,
  openSidebar,
  toggleSidebar,
} from "@/redux/slices/sidebarSlice";

const TutorSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        dispatch(openSidebar());
      } else {
        dispatch(closeSidebar());
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [dispatch]);

  const navItems = [
    { to: "/tutor", label: "Dashboard", icon: Home },
    { to: "/tutor/courses", label: "Courses", icon: BookOpen },
    { to: "/tutor/contest", label: "Contest", icon: Trophy },
    { to: "/tutor/categories", label: "Categories", icon: Folder },
    { to: "/tutor/community", label: "Community", icon: Users },
    { to: "/tutor/profile", label: "Profile", icon: User },
    { to: "/tutor/sales-report", label: "Sale Report", icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        className={`fixed top-4 left-4 z-30 lg:hidden p-2 rounded-md bg-indigo-700 text-white transition-all duration-300 ${
          isSidebarOpen ? "left-64" : "left-4"
        }`}
        onClick={() => dispatch(toggleSidebar())}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-indigo-700 text-white flex flex-col transition-all duration-300 ease-in-out z-20 shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 border-b border-indigo-600">
          <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
        </div>
        <nav className="flex-1 py-6 px-4 overflow-y-auto">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center py-3 px-4 rounded-lg transition duration-200 ${
                    isActive(item.to)
                      ? "bg-indigo-800 text-white"
                      : "text-indigo-100 hover:bg-indigo-600"
                  }`}
                  onClick={() => isMobile && dispatch(closeSidebar())}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span
                    className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}
                  >
                    {item.label}
                  </span>
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
            <span className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TutorSidebar;
