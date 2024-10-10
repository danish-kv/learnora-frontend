import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex-grow flex">
        <aside className="w-16 md:w-64 bg-white  border ">
          <ProfileSideBar className="sticky top-0 p-2 md:p-4 h-[calc(100vh-64px)] overflow-y-auto" />
        </aside>
        
        <main className="flex-grow p-4 md:p-6">
          <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg">
            <Routes>
              <Route path="/" element={<ProfileView profile={profile[0]} />} />
              <Route path="/edit" element={<EditProfile profile={profile[0]} />} />
              <Route path="/photo" element={<ProfilePhoto profile={profile[0]} />} />
              <Route path="/change-password" element={<ChangePassword profile={profile[0]} />} />
              <Route path="/saved-notes" element={<SavedNotes profile={profile[0]} />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;