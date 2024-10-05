import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminCourseCard from "../components/AdminCourseCard";
import api from "../../../services/api";
import UseFetchRequestedCourses from "../hooks/UseFetchRequestedCourses";
import AdminHeader from "../components/AdminHeader";
import { useSelector } from "react-redux";

const RequestedCourses = () => {
  const { courses, getRequestedCourses } = UseFetchRequestedCourses();
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  console.log(courses);

  const handleStatus = async (slug, new_status) => {
    console.log(slug, new_status);

    try {
      const res = await api.patch(`requested-courses/${slug}/`, {
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
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <AdminHeader />
        <main className="flex-1 flex flex-col overflow-x-hidden overflow-y-auto bg-gray-100 p-6 mt-16">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-3xl font-semibold">Requested Courses</h2>
          </div>
          <div className="flex flex-grow items-center justify-center">
            {courses?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <AdminCourseCard
                    key={index}
                    course={course}
                    onBlockToggle={handleBlock}
                    onStatusToggle={handleStatus}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <h2 className="text-2xl font-semibold text-gray-600">
                  No Requested Courses Available
                </h2>
                <p className="text-gray-500 mt-2">
                  It seems like there are no new course requests at the moment.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RequestedCourses;
