// ProfileSection.jsx
import React from "react";

const ProfileSection = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default ProfileSection;
