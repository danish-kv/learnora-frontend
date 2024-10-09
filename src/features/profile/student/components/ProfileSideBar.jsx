import React from "react";
import { User, Edit, Lock, Book, LogOut, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Logout } from "@/redux/thunk/authThunks";

const ProfileSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

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

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white p-4">
        <nav className="space-y-2">
          <Link to={"/profile/"}>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>

          <Link to={"/profile/edit"}>
            <Button variant="ghost" className="w-full justify-start">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
          <Link to={"/profile/photo"}>
            <Button variant="ghost" className="w-full justify-start">
              <Image className="mr-2 h-4 w-4" />
              Photo
            </Button>
          </Link>

          <Link to={"/profile/change-password"}>
            <Button variant="ghost" className="w-full justify-start">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </Link>

          <Link to={"/profile/saved-notes"}>
            <Button variant="ghost" className="w-full justify-start">
              <Book className="mr-2 h-4 w-4" />
              Saved Notes
            </Button>
          </Link>

          <Link>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default ProfileSideBar;
