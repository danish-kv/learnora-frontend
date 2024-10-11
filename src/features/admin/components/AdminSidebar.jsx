import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Layout,
  Users,
  BookOpen,
  FolderOpen,
  BarChart2,
} from "lucide-react";
import {
  closeSidebar,
  openSidebar,
  toggleSidebar,
} from "@/redux/slices/sidebarSlice";

const AdminSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileSize = window.innerWidth < 1024;
      setIsMobile(isMobileSize);
      if (isMobileSize) {
        dispatch(closeSidebar());
      } else {
        dispatch(openSidebar());
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [dispatch]);

  const handleSidebarToggle = () => {
    console.log("heyy");
    if (isMobile) {
      dispatch(closeSidebar());
    } else {
      dispatch(toggleSidebar());
    }
  };

  const menuItems = [
    { path: "/admin/", label: "Dashboard", icon: Layout },
    { path: "/admin/student", label: "Students", icon: Users },
    { path: "/admin/tutor", label: "Tutors", icon: Users },
    { path: "/admin/courses", label: "Courses", icon: BookOpen },
    { path: "/admin/category", label: "Categories", icon: FolderOpen },
    { path: "/admin/sales-report", label: "Sales Report", icon: BarChart2 },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-indigo-900 text-gray-100 flex flex-col transition-all duration-300 ease-in-out z-20 shadow-lg`}
    >
      <div className="flex items-center justify-between h-16 px-4 bg-indigo-800">
        {isSidebarOpen ? (
          <h1 className="text-white text-xl font-bold truncate">Learnora</h1>
        ) : (
          <h1 className="text-white text-xl font-bold">LN</h1>
        )}
        <button
          onClick={handleSidebarToggle}
          className="p-1 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center py-2 px-4 rounded-lg transition duration-200 ${
                  location.pathname === item.path
                    ? "bg-indigo-600 text-white"
                    : "text-indigo-100 hover:bg-indigo-700"
                }`}
              >
                <item.icon
                  size={20}
                  className={isSidebarOpen ? "mr-3" : "mx-auto"}
                />
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
