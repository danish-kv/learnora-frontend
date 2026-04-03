import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../../redux/thunk/authThunks";
import { capitalizeFirstLetter } from "../../utils/format";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.role);
  const { user, profile } = useSelector((state) => state.auth);

  const username = capitalizeFirstLetter(user || "");

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    try {
      await dispatch(Logout()).unwrap();
      navigate("/");
    } catch (error) {
      console.log("logout error", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/contest", label: "Contest" },
    { to: "/discussion", label: "Discussion" },
    { to: "/community", label: "Community" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-1">
            <Link to="/" className="flex-shrink-0">
              <img
                src="/logo.png"
                alt="Learnora Logo"
                className="h-10 w-auto"
              />
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8 flex-1 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={toggleDropdown}
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    {profile ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={profile}
                        alt={`${username}'s profile`}
                      />
                    ) : (
                      <Avatar className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 shadow-sm">
                        <AvatarImage
                          className="h-8 w-8 rounded-full"
                          src="https://github.com/shadcn.png"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )}
                    <span className="ml-3 text-gray-700 font-medium">
                      {username}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                  </button>
                </div>
                {dropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <User className="inline-block w-4 h-4 mr-2" />
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center md:ml-6">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Register
                </Link>
                <Link
                  to="/register"
                  state={{ TutorRegister: true }}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Become a Tutor
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleSidebar}
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {sidebarOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white z-50 shadow-xl transform ease-in-out transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 pt-5 pb-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>
              <button
                onClick={toggleSidebar}
                className="ml-3 p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="flex-1 px-4 py-6 overflow-y-auto">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleSidebar}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="px-4 py-6 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {profile ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={profile}
                        alt=""
                      />
                    ) : (
                      <Avatar className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <AvatarImage
                          className="h-8 w-8 rounded-full"
                          src="https://github.com/shadcn.png"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {username}
                    </div>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block w-full px-4 py-2 text-center text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
                  onClick={toggleSidebar}
                >
                  <User className="inline-block w-4 h-4 mr-2" />
                  Your Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleSidebar();
                  }}
                  className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-center text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
                  onClick={toggleSidebar}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                  onClick={toggleSidebar}
                >
                  Register
                </Link>
                <Link
                  to="/register"
                  state={{ TutorRegister: true }}
                  className="block w-full px-4 py-2 text-center text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
                  onClick={toggleSidebar}
                >
                  Become a Tutor
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
