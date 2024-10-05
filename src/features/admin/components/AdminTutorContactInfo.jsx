import React from "react";

const AdminTutorContactInfo = ({ TutorDetails, renderStatusBadge }) => (
  <div className="mt-2 space-y-1">
    <p className="text-sm text-gray-500">
      <i className="far fa-envelope mr-2"></i>
      {TutorDetails.user.email}
    </p>
    <p className="text-sm text-gray-500">
      <i className="fas fa-phone mr-2"></i>
      {TutorDetails.user.phone}
    </p>
    <p
      className={`text-sm ${
        TutorDetails.is_verified ? "text-green-500" : "text-red-500"
      }`}
    >
      <i className="fas fa-check-circle mr-2"></i>
      {TutorDetails.is_verified ? "Email Verified" : "Email Not Verified"}
    </p>
    <p className="text-sm">
      <i className="fas fa-info-circle mr-2"></i>
      Application Status: {renderStatusBadge(TutorDetails.status)}
    </p>
    <p
      className={`text-sm ${
        TutorDetails.user.is_active ? "text-green-500" : "text-red-500"
      }`}
    >
      <i className="fas fa-user-check mr-2"></i>
      {TutorDetails.user.is_active ? "Active Account" : "Blocked Account"}
    </p>
  </div>
);
export default AdminTutorContactInfo;
