import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminCourseCard from "../components/AdminCourseCard";
import useFetchCourse from "../hooks/useFetchCourse";
import api from "../../../services/api";
import PaginationComponent from "@/features/courses/components/Pagination";
import { displayToastAlert } from "@/utils/displayToastAlert";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import CardSkeleton from "@/skeleton/CardSkeleton";

const AdminCourse = () => {
  const { courses, getCourses, setPage, page, totalPages, loading } =
    useFetchCourse();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCourses(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      navigate(`/admin/courses/?page=${newPage}`);
    }
  };

  const handleStatus = async (slug, newStatus) => {
    setIsLoading(true);
    try {
      await api.patch(`courses/${slug}/`, { status: newStatus });
      await getCourses(page);
      displayToastAlert(200, "Course status updated successfully");
    } catch (error) {
      console.error("Error updating course status:", error);
      displayToastAlert(400, "Failed to update course status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlock = async (slug, currentStatus) => {
    setIsLoading(true);
    try {
      await api.patch(`courses/${slug}/`, { is_active: !currentStatus });
      await getCourses(page);
      displayToastAlert(
        200,
        `Course ${currentStatus ? "blocked" : "unblocked"} successfully`
      );
    } catch (error) {
      console.error("Error toggling course block status:", error);
      displayToastAlert(400, "Failed to update course block status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-2 sm:mb-0">
            Courses
          </h1>
          <Link to="/admin/course/requested" className="relative inline-block">
            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition duration-200">
              Requested
            </button>
            {courses[0]?.requested_course_count > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-xs px-2 py-1 font-semibold shadow-lg">
                {courses[0].requested_course_count}
              </span>
            )}
          </Link>
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

            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  Courses
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-28 w-28 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? [...Array(6)].map((_, index) => <CardSkeleton key={index} />)
                : courses.map((course, index) => (
                    <AdminCourseCard
                      key={index}
                      course={course}
                      onBlockToggle={handleBlock}
                      onStatusToggle={handleStatus}
                    />
                  ))}
            </div>
            {courses.length > 0 && (
              <div className="mt-6">
                <PaginationComponent
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  page={page}
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default AdminCourse;
