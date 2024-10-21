import React from "react";
import { Link } from "react-router-dom";
import { formatDuration } from "../../../utils/format";

const CourseCard = ({ course }) => {
  if (!course) return null;

  const total_duration =
    course.modules.reduce((total, module) => total + module.duration, 0) || 0;
  const time = formatDuration(total_duration);

  return (
    <Link to={`/course/${course.slug}`} className="block h-full">
      <div className="bg-white  border rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-105">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              {course.category_data?.name}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {time}
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
            {course.title}
          </h2>
          <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow">
            {course.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <img
                src={course.tutor.user.profile}
                alt={course.tutor.user.username}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm text-gray-700">
                {course.tutor.display_name}
              </span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 line-through text-sm">
                {(course.price * 1.08).toFixed(2)}
              </span>
              <span className="text-purple-600 font-bold text-lg ml-2">
                {course.price}
              </span>
              {course.rental_price > 0 && (
                <div className="text-sm text-blue-500 mt-1">
                  Rental option available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
