import React from "react";
import { Link } from "react-router-dom";

const CourseDetailsMain = ({ course }) => {
  if (!course) {
    return null;
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <p className="text-sm text-gray-500 mb-1 flex items-center">
        <Link to="/" className="hover:text-gray-700 flex items-center">
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
              d="M3 12l7-7 7 7M5 10v10h4v-6h6v6h4V10"
            />
          </svg>
        </Link>

        <span className="mx-2">{">"}</span>
        <Link to="/course" className="hover:text-gray-700">
          Courses
        </Link>
        <span className="mx-2">{">"}</span>
        <Link
          to={`/category/${course.category?.slug}`}
          className="hover:text-gray-700"
        >
          {course.category?.name}
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="text-gray-600">{course.title}</span>
      </p>
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      {/* <p className="text-gray-600 mb-4">
      Free Java Course with Certificate Online [2024]
    </p> */}
      {/* <div className="flex items-center mb-4">
      <span className="text-2xl font-bold mr-2">4.6</span>
      <div className="text-yellow-400 text-xl">★★★★☆</div>
      <span className="text-sm text-gray-600 ml-2">
        (2,939 ratings)
      </span>
    </div> */}
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span className="mr-2">👤</span>
        <span>
          A course by {course.tutor.display_name}, {course.tutor.headline}
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span>Last updated {course.updated_at.slice(0, 7)}</span>
      </div>
    </div>
  );
};

export default CourseDetailsMain;
