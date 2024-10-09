import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileView from "../components/ProfileView";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";
import SavedNotes from "../components/SavedNotes";
import UseFetchStudentProfile from "../hooks/UseFetchStudentProfile";
import { useSelector } from "react-redux";
import ProfilePhoto from "../components/ProfilePhoto";

const StudentProfile = () => {
  const { profile } = UseFetchStudentProfile();
  console.log("profile data ==========", profile);

  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)
  if(!user){
    return navigate('/')
  }
  
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <ProfileSideBar className="w-full md:w-1/4 lg:w-1/5 bg-gray-100 p-4" />
        
        {/* Main content */}
        <div className="flex-grow p-6 bg-white">
          <Routes>
            <Route path="/" element={<ProfileView profile={profile[0]} />} />
            <Route path="/edit" element={<EditProfile profile={profile[0]} />} />
            <Route path="/photo" element={<ProfilePhoto profile={profile[0]} />} />
            <Route path="/change-password" element={<ChangePassword profile={profile[0]} />} />
            <Route path="/saved-notes" element={<SavedNotes profile={profile[0]} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
