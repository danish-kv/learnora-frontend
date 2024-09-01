import React from "react";
import { User, Edit, Lock, Book, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProfileSideBar = () => {
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
{/* 
          <Link to={"/profile/edit"}>
            <Button variant="ghost" className="w-full justify-start">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
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

          <Link >
            <Button variant="ghost" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </Link> */}
        </nav>
      </aside>
    </div>
  );
};

export default ProfileSideBar;
