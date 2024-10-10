import React from "react";
import { User, Edit, Lock, Book, LogOut, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "@/redux/thunk/authThunks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Swal from "sweetalert2";

const ProfileSideBar = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(Logout()).unwrap();
          navigate("/");

          await Swal.fire({
            title: "Logged out!",
            text: "You have been successfully logged out.",
            icon: "success",
          });
        } catch (error) {
          console.log("logout error", error);
          Swal.fire({
            title: "Error!",
            text: "There was an issue logging you out.",
            icon: "error",
          });
        }
      }
    });
  };

  const navItems = [
    { to: "/profile", icon: User, label: "Profile" },
    { to: "/profile/edit", icon: Edit, label: "Edit Profile" },
    { to: "/profile/photo", icon: Image, label: "Photo" },
    { to: "/profile/change-password", icon: Lock, label: "Change Password" },
    { to: "/profile/saved-notes", icon: Book, label: "Saved Notes" },
  ];

  const NavItem = ({ to, icon: Icon, label }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={to}>
          <Button
            variant="ghost"
            className={`w-full justify-center md:justify-start ${
              location.pathname === to ? "bg-gray-100" : ""
            }`}
          >
            <Icon className="h-5 w-5 md:mr-2" />
            <span className="hidden md:inline">{label}</span>
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider>
      <nav
        className={`flex flex-col items-center md:items-stretch space-y-2 ${className}`}
      >
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-center md:justify-start text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </nav>
    </TooltipProvider>
  );
};

export default ProfileSideBar;
