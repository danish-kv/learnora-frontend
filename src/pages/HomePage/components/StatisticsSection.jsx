import React from "react";

const StatItem = ({ number, text }) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-white mb-2">{number}</div>
    <div className="text-sm text-indigo-100">{text}</div>
  </div>
);

const StatisticsSection = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem
            number={data.total_course_completion}
            text="Courses Completed"
          />
          <StatItem number={data.total_tutor} text="Expert Tutors" />
          <StatItem number={data.total_student} text="Students Enrolled" />
          <StatItem number={data.total_course} text="Available Courses" />
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;

