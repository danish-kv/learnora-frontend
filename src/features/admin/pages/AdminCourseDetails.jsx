import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchCourseDetails from "../../tutor/hooks/useFetchCourseDetails";
import { formatDuration } from "../../../utils/formatDuration";

const AdminCourseDetails = () => {
  const [expandedModule, setExpandedModule] = useState(null);
  const { slug } = useParams();

  const { courseDetails, error, refetch } = useFetchCourseDetails(slug);

  if (error) return <div>Error fetching course details.</div>;

  return (
    <div className="container mx-auto px-5 py-8">
      {/* Course Thumbnail */}
      <div className="mb-6">
        <img
          src={courseDetails?.thumbnail}
          alt="Course Thumbnail"
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      </div>

      {/* Course Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">{courseDetails?.title}</h1>
        <p className="text-gray-700 mb-4">{courseDetails?.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-gray-600">Price</h3>
            <p>${courseDetails?.price}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Rental Price</h3>
            <p>${courseDetails?.rental_price}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Rental Duration</h3>
            <p>{courseDetails?.rental_duration} days</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Category</h3>
            <p>{courseDetails?.category || "N/A"}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-600 mb-1">Status</h3>
          <span
            className={`bg-${
              courseDetails?.status === "Approved" ? "green" : "yellow"
            }-100 text-${
              courseDetails?.status === "Approved" ? "green" : "yellow"
            }-800 text-xs font-medium px-2.5 py-0.5 rounded`}
          >
            {courseDetails?.status}
          </span>
        </div>
      </div>

      {/* Tutor Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-start">
        <Link to={`/admin/tutor/${courseDetails?.tutor?.id}`}>
        <img
          src={courseDetails?.tutor?.user.profile || "/path/to/default-profile.png"}
          alt="Tutor"
          className="w-24 h-24 rounded-full border-2 border-gray-300 mr-6"
          />
          </Link>
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            {courseDetails?.tutor?.display_name}
          </h2>
          <p className="text-gray-600 mb-2">{courseDetails?.tutor?.headline}</p>
          <p className="text-gray-700 mb-4">{courseDetails?.tutor?.bio}</p>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-600">Education</h3>
            <ul>
              {courseDetails?.tutor?.education?.map((edu, index) => (
                <li key={index} className="text-gray-700">
                  {edu.highest_qualification} from {edu.name_of_institution} (
                  {edu.year_of_qualification})
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-600">Experience</h3>
            <ul>
              {courseDetails?.tutor?.experiences?.map((exp, index) => (
                <li key={index} className="text-gray-700">
                  {exp.position} at {exp.company_name} ({exp.start_date} -{" "}
                  {exp.end_date})
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-600 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {courseDetails?.tutor?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800  font-medium px-3 py-1 rounded-full"
                >
                  {skill.skill_name}
                </span>
              ))}
            </div>
          </div>

          <div></div>
        </div>
      </div>

      {/* Modules */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Modules</h2>

        {courseDetails?.modules?.map((module, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex justify-between items-center border border-gray-200 rounded-lg p-4 cursor-pointer"
              onClick={() =>
                setExpandedModule(index === expandedModule ? null : index)
              }
            >
              <div className="flex items-center">
                <span className="font-medium text-blue-600">
                  {module.title}
                </span>
              </div>
              <div className="flex items-center">
                <button
                  className={`text-gray-600 hover:text-gray-800 ml-2 transform transition-transform ${
                    index === expandedModule ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {index === expandedModule && (
              <div className="p-4 border border-t-0 rounded-lg rounded-t-none">
                <p className="mb-2">{module.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-semibold text-gray-600 mr-2">
                      Likes:
                    </span>
                    <span>{module.likes_count}</span>
                  </div>
                  <div>
                    <a
                      href={module.notes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      Notes
                    </a>
                    <a
                      href={module.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Video
                    </a>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-gray-600 mr-2">
                      Duration:
                    </span>
                    <span>{formatDuration(module.duration)}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600 mr-2">
                      Views:
                    </span>
                    <span>{module.views || "N/A"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourseDetails;
