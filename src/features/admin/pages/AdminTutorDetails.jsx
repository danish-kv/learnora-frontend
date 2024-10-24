import React from "react";
import { useParams } from "react-router-dom";
import useFetchTutorDetails from "../hooks/useFetchTutorDetails";
import AdminTutorAboutSection from "../components/AdminTutorAboutSection";
import AdminTutorProfileSection from "../components/AdminTutorProfileSection";
import AdminTutorEducationSection from "../components/AdminTutorEducationSection";
import AdminTutorExperienceSection from "../components/AdminTutorExperienceSection";
import AdminTutorSkillsSection from "../components/AdminTutorSkillsSection";

const AdminTutorDetails = () => {
  const { id } = useParams();
  const { TutorDetails, error, loading } = useFetchTutorDetails(id);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  if (!TutorDetails)
    return (
      <div className="flex justify-center items-center h-screen">
        Tutor not found
      </div>
    );

  const renderStatusBadge = (status) => {
    const statusColors = {
      Verified: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Requested: "bg-blue-100 text-blue-800",
      default: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          statusColors[status] || ""
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <AdminTutorProfileSection
              TutorDetails={TutorDetails}
              renderStatusBadge={renderStatusBadge}
            />
            <AdminTutorAboutSection bio={TutorDetails.user.bio} />
            <AdminTutorEducationSection education={TutorDetails.education} />
            <AdminTutorExperienceSection
              experiences={TutorDetails.experiences}
            />
            <AdminTutorSkillsSection skills={TutorDetails.skills} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminTutorDetails;
