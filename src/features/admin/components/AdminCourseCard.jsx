import React from "react";
import { Link } from "react-router-dom";

const AdminCourseCard = ({ course, onBlockToggle, onStatusToggle }) => {
  const renderButtons = () => {
    if (course.status === "Approved") {
      return (
        <button
          onClick={() => onBlockToggle(course.slug, course.is_active)}
          className={`${
            course.is_active
              ? "bg-purple-500 hover:bg-purple-600"
              : "bg-teal-500 hover:bg-teal-600"
          } text-white px-4 py-2 rounded-lg text-sm`}
        >
          {course.is_active ? "Block" : "Unblock"}
        </button>
      );
    }

    if (course.status === "Requested") {
      return (
        <>
          <button
            onClick={() => onStatusToggle(course.slug, "Approved")}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm mr-2"
          >
            Accept
          </button>

          <button
            onClick={() => onStatusToggle(course.slug, "Declined")}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Reject
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80 relative">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <img
              src={course.tutor.user.profile}
              alt="Tutor"
              className="w-12 h-12 rounded-full border-2 border-gray-300 mr-3"
            />
            <h3 className="text-xl font-bold">{course.title}</h3>
          </div>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              course.status === "Approved"
                ? "bg-green-100 text-green-800"
                : course.status === "Declined"
                ? "bg-red-100 text-red-800"
                : course.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {course.status}
          </span>
        </div>
        <p className="text-gray-600 mb-4 text-ellipsis overflow-hidden">
          {course.description}
        </p>
        <div className="flex justify-between">
          <Link to={`/admin/course/${course.slug}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
              View
            </button>
          </Link>
          {renderButtons()}
        </div>
        <span className="absolute top-0 right-0 mt-2 mr-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          {course.total_enrollment} enrollments
        </span>
      </div>
    </div>
  );
};

export default AdminCourseCard;
