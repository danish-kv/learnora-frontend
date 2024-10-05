import React from "react";

const AdminTutorAboutSection = ({ bio }) => (
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-3 text-gray-800">About Me</h3>
    <p className="text-gray-700">{bio}</p>
  </div>
);

export default AdminTutorAboutSection;
