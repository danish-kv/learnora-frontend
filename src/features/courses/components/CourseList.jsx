import React from "react";
import CourseCard from "./CourseCard";

const CourseList = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">No courses available!</p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
