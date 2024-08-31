import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import AdminCourseCard from "../components/AdminCourseCard";
import api from "../../../services/api";
import UseFetchRequestedCourses from "../hooks/UseFetchRequestedCourses";

const RequestedCourses = () => {
  const { courses, error, getRequestedCourses } = UseFetchRequestedCourses();
  console.log(courses);

  const handleStatus = async (slug, new_status) => {
    console.log(slug, new_status);

    try {
      res = await api.patch(`requested-courses/${slug}/`, {
        status: new_status,
      });
      console.log(res);

      getRequestedCourses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = async (slug, current_status) => {
    console.log(slug, current_status);

    try {
      const res = await api.patch(`requested-courses/${slug}/`, {
        is_active: !current_status,
      });
      console.log(res);

      getRequestedCourses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Requested Courses</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses &&
              courses.map((course, index) => (
                <AdminCourseCard
                  key={index}
                  course={course}
                  onBlockToggle={handleBlock}
                  onStatusToggle={handleStatus}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedCourses;
