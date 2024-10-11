import React from "react";
import AdminTutorContactInfo from "./AdminTutorContactInfo";
import { formatDate } from "@/utils/format";

const AdminTutorProfileSection = ({ TutorDetails, renderStatusBadge }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
      <img
        src={TutorDetails.user.profile}
        alt={`${TutorDetails.user.username}'s profile`}
        className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
      />
      <div className="text-center md:text-left flex-grow">
        <h2 className="text-3xl font-bold text-gray-800">
          {`${TutorDetails.user.first_name} ${TutorDetails.user.last_name}`}
        </h2>
        <p className="text-gray-600 mt-1">{TutorDetails.headline}</p>
        <AdminTutorContactInfo
          TutorDetails={TutorDetails}
          renderStatusBadge={renderStatusBadge}
        />
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          <a
            href={`${TutorDetails.cv}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            View CV
          </a>
        </button>
      </div>
      <div className="mt-4 md:mt-0 text-sm text-gray-500">
        <i className="far fa-calendar mr-2"></i>
        Joined on{" "}
        {TutorDetails.user.date_joined
          ? formatDate(new Date(TutorDetails.user.date_joined), "dd MMMM, yyyy")
          : "N/A"}
      </div>
    </div>
  );
};
export default AdminTutorProfileSection;
