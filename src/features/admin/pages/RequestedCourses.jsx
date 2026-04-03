import React from "react";
import AdminCourseCard from "../components/AdminCourseCard";
import api from "../../../services/api";
import UseFetchRequestedCourses from "../hooks/UseFetchRequestedCourses";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { displayToastAlert } from "@/utils/displayToastAlert";

const RequestedCourses = () => {
  const { courses, getRequestedCourses } = UseFetchRequestedCourses();

  const handleStatus = async (slug, new_status) => {
    console.log(slug, new_status);

    try {
      const res = await api.patch(`courses/${slug}/`, {
        status: new_status,
      });
      displayToastAlert(200, "Course Approved!");

      getRequestedCourses();
    } catch (error) {
      displayToastAlert(200, "Failed to Approve Course, Please try later!");

      console.log(error);
    }
  };

  const handleBlock = async (slug, current_status) => {
    console.log(slug, current_status);

    try {
      const res = await api.patch(`requested-courses/${slug}/`, {
        is_active: !current_status,
      });

      getRequestedCourses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-2 sm:mb-0">
            Requested Courses
          </h1>
        </div>

        {/* Breadcrumbs */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/admin"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                <HomeIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                <Link
                  to="/admin/courses"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2"
                >
                  Courses
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  Requested Courses
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.length > 0 ? (
            <>
              {courses.map((course, index) => (
                <AdminCourseCard
                  key={index}
                  course={course}
                  onBlockToggle={handleBlock}
                  onStatusToggle={handleStatus}
                />
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 col-span-1 sm:col-span-2 lg:col-span-3">
              <h2 className="text-2xl font-semibold text-gray-600">
                No Requested Courses Available
              </h2>
              <p className="text-gray-500 mt-2">
                It seems like there are no new course requests at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default RequestedCourses;
