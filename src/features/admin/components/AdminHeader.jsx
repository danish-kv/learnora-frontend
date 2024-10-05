import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "@/redux/thunk/authThunks";
import { Bell, ChevronDown, LogOut } from "lucide-react";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  const admin = useSelector((state) => state.auth.user);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav
      className={`bg-indigo-800 shadow-md fixed top-0 right-0 left-0 z-10 transition-all duration-300 ${
        isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
      }`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          <div className="flex items-center">
            {/* <button className="p-1 rounded-full text-white hover:text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button> */}

            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    {admin?.name ? admin.name[0] : "A"}
                  </div>
                  <span className="text-white ml-2 font-medium capitalize">
                    {admin || "Admin"}
                  </span>
                  <ChevronDown className="h-5 w-5 text-white ml-1" />
                </button>
              </div>

              {isProfileOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-indigo-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <button
                    className="flex w-full px-4 py-2 text-sm text-white hover:bg-indigo-50 transition duration-150 ease-in-out"
                    role="menuitem"
                    onClick={() => dispatch(Logout())}
                  >
                    <LogOut className="mr-3 h-5 w-5 text-white " />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
