import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchTutorDetails from "../hooks/useFetchTutorDetails";
import { text } from "@fortawesome/fontawesome-svg-core";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

const AdminTutorDetails = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const { TutorDetails, error } = useFetchTutorDetails(id);
  console.log("==========", TutorDetails);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!TutorDetails) return <div>Tutor not found</div>;

  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-6">
                <img
                  src={TutorDetails.user.profile}
                  alt={`${TutorDetails.user.username}'s profile`}
                  className="w-32 h-32 rounded-full mr-6 object-cover"
                />

                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {`${TutorDetails.user.first_name} ${TutorDetails.user.last_name}`}
                  </h2>

                  <p className="text-gray-600 mt-1">{TutorDetails.headline}</p>

                  <div className="mt-2">
                    <span className="text-sm text-gray-500 mr-4">
                      <i className="far fa-envelope mr-1"></i>
                      {TutorDetails.user.email}
                    </span>

                    <span className="text-sm text-gray-500 mr-4">
                      <i className="fas fa-phone mr-1"></i>
                      {TutorDetails.user.phone}
                    </span>
                    <span
                      className={`text-sm ${
                        TutorDetails.is_verified
                          ? "text-green-500"
                          : "text-red-500"
                      } mr-4`}
                    >
                      <i className="fas fa-check-circle mr-1"></i>
                      {TutorDetails.is_verified
                        ? "Email Verified"
                        : "Email Not Verified"}
                    </span>

                    <span
                      className={`text-sm px-3 ${
                        TutorDetails.status === "verified"
                          ? "text-green-500"
                          : TutorDetails.status === "requested"
                          ? "text-gray-500"
                          : TutorDetails.status === "pending"
                          ? "text-yellow-500"
                          : TutorDetails.status === "rejected"
                          ? "text-red-500"
                          : ""
                      } mr-4`}
                    >
                      <i className="fas fa-info-circle mr-1"></i> Application
                      Status:{" "}
                      {TutorDetails.status.charAt(0).toUpperCase() +
                        TutorDetails.status.slice(1)}
                    </span>

                    <span
                      className={`text-sm ${
                        TutorDetails.user.is_active
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <i className="fas fa-user-check mr-1"></i>
                      {TutorDetails.user.is_active
                        ? "Active Account"
                        : "Blocked Account"}
                    </span>
                  </div>

                  <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Download CV
                  </button>
                </div>

                <div className="ml-auto text-right">
                  <span className="text-sm text-gray-500">
                    <i className="far fa-calendar mr-1"></i> Joined on{" "}
                    {new Date(
                      TutorDetails.user.date_joined
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">About Me</h3>
                <p className="text-gray-700">{TutorDetails.user.bio}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-5 text-gray-800">
                  Education
                </h3>
                {TutorDetails.education.map((edu, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="text-xl font-medium text-gray-700">
                      {edu.highest_qualification}
                    </h4>
                    <p className="text-lg text-gray-600">
                      {edu.name_of_institution}
                    </p>
                    <p className="text-sm text-gray-500">
                      Year of Qualification: {edu.year_of_qualification}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-5 text-gray-800">
                  Experience
                </h3>
                {TutorDetails.experiences.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="text-xl font-medium text-gray-700">
                      {exp.position}
                    </h4>
                    <p className="text-lg text-gray-600">{exp.company_name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(exp.start_date).toLocaleDateString()} -{" "}
                      {exp.end_date
                        ? new Date(exp.end_date).toLocaleDateString()
                        : "Present"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-5 text-gray-800">
                  Skills
                </h3>
                <div className="flex flex-wrap">
                  {TutorDetails.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-3 mb-3"
                    >
                      {skill.skill_name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminTutorDetails;
