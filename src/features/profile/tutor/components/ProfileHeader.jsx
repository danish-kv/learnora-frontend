// ProfileHeader.jsx
import React from "react";
import { Edit } from "lucide-react";

const ProfileHeader = ({
  profileData,
  onEditImageClick,
  onEditProfileClick,
}) => (
  <div className="flex items-center mb-8 relative">
    <div className="relative">
      <img
        src={profileData.user?.profile}
        className="w-32 h-32 rounded-full bg-gray-100"
        alt="Tutor Avatar"
      />
      <button
        onClick={onEditImageClick}
        className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100"
      >
        <Edit className="w-4 h-4 text-gray-600" />
      </button>
    </div>
    <div className="ml-8">
      <h1 className="text-3xl font-bold">{`${
        profileData.user?.first_name || ""
      } ${profileData.user?.last_name || ""}`}</h1>
      <p className="text-xl text-gray-600">
        {profileData.headline || "No headline provided"}
      </p>
    </div>
    <button
      onClick={onEditProfileClick}
      className="absolute top-4 right-4 mb-4 text-indigo-600 hover:text-indigo-800"
    >
      Edit Profile
    </button>
  </div>
);

export default ProfileHeader;
