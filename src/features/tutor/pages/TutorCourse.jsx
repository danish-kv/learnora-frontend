import React, { useEffect } from "react";
import CourseCard from "../components/CourseCard";
import { Link, useNavigate } from "react-router-dom";
import useFetchCourse from "../../admin/hooks/useFetchCourse";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import api from "../../../services/api";
import PaginationComponent from "@/features/courses/components/Pagination";

const TutorCourse = () => {
  const { courses, getCourses, page, setPage, totalPages } = useFetchCourse();
  const navigate = useNavigate();

  useEffect(() => {
    getCourses(page);
  }, [page]);

  const handlePageChange = (newpage) => {
    if (newpage >= 1 && newpage <= totalPages) {
      setPage(newpage);
      getCourses(newpage);
      navigate(`/tutor/courses/?page=${newpage}`);
    }
  };

  const handleBlock = async (slug, current_status) => {
    try {
      await api.patch(`courses/${slug}/`, { is_active: !current_status });
      getCourses();
      if (current_status) {
        displayToastAlert(200, "Course Blocked successfully");
      } else {
        displayToastAlert(200, "Course Unblocked successfully");
      }
    } catch (error) {
      console.error(error);
      displayToastAlert(
        400,
        "Failed to Fetch Course. We are facing some issue"
      );
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold mb-4 sm:mb-0">My Courses</h2>
        <Link to="/tutor/new-course">
          <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
            Add New Course
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} onBlockToggle={handleBlock} />
        ))}
      </div>

      {courses.length > 0 && (
        <div className="mt-8 flex justify-center">
          <PaginationComponent
            totalPages={totalPages}
            onPageChange={handlePageChange}
            page={page}
          />
        </div>
      )}
    </div>
  );
};

export default TutorCourse;
