import React from "react";
import { Bell, ChevronDown, X, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@/redux/slices/sidebarSlice";
import { Logout } from "@/redux/thunk/authThunks";
import { Link } from "react-router-dom";

const TutorHeader = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-indigo-700 shadow-sm">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-4 lg:hidden text-white hover:bg-indigo-600"
              onClick={() => dispatch(toggleSidebar())}
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-indigo-600"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-white hover:bg-indigo-600"
                >
                  <Avatar>
                    <AvatarImage src="/path-to-your-image.jpg" alt="User" />
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                      {user ? user.slice(0, 1).toUpperCase() : "T"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm hidden sm:inline-block capitalize">
                    {user}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-indigo-700 text-white border-indigo-600"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-indigo-600" />
                <Link to={"/tutor/profile"}>
                  <DropdownMenuItem className="focus:bg-indigo-600">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-indigo-600" />
                <DropdownMenuItem
                  onClick={() => dispatch(Logout())}
                  className="focus:bg-indigo-600"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TutorHeader;
