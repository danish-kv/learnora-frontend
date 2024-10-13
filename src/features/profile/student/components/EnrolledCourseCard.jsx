import React from "react";
import { Link } from "react-router-dom";

const EnrolledCourseCard = ({ course }) => {
  if (!course) {
    return null;
  }

  return (
    <Link to={`/course/${course.slug}`}>
      <div className="bg-white rounded-lg border border-2 shadow-sm overflow-hidden">
        <img
          src={`${course.thumbnail}`}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {course.title}
          </h2>
          <p className="text-gray-600 mb-4 text-sm">{course.description}</p>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {course.category?.name}
            </span>
            <span className="text-sm text-gray-500">
              {course.progress}% Completed
            </span>
          </div>

          <div className="mt-4">
            <Link
              to={`/course/${course.slug}/`}
              className="text-purple-600 font-bold text-sm"
            >
              Continue Course
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EnrolledCourseCard;
