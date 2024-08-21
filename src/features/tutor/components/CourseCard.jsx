import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course, onBlockToggle }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold">{course.title}</h3>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              course.status === "Published"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {course.status}
          </span>
        </div>
        <p className="text-gray-600 mb-4  text-ellipsis overflow-clip ">
          {course.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">
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
          <div className="text-ellipsis overflow-clip">
            <Link to={`/tutor/course/${course.slug}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm mr-2">
                View
              </button>
            </Link>
            <Link>
              <button
                onClick={() => onBlockToggle(course.slug, course.is_active)}
                className={`${
                  course.is_active
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white px-4 py-2 rounded-lg text-sm`}
              >
                {course.is_active ? "Block" : "Unblock"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
