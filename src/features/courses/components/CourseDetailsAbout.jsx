import React from "react";

const CourseDetailsAbout = ({course}) => {
    if (!course){
        return null
    }
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold mb-4">About this course</h2>
      <p className="text-sm text-gray-600">
        {course.description}
      </p>
    </div>
  );
};

export default CourseDetailsAbout;
