import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import TutorSidebar from "../components/TutorSidebar";
import { Link, useNavigate } from "react-router-dom";
import useFetchCourse from "../../admin/hooks/useFetchCourse";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import api from "../../../services/api";
import PaginationComponent from "@/features/courses/components/Pagination";

const TutorCourse = () => {
  const { courses, getCourses, page, setPage, totalPages } = useFetchCourse();
  const navigate = useNavigate();
  console.log("fetched ", courses);

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
    console.log(slug, current_status);

    try {
      await api.patch(`courses/${slug}/`, { is_active: !current_status });
      getCourses();
      if (current_status) {
        swal("Blocked", "Course Blocked successfully", "success");
      } else {
        swal("UnBlocked", "Course Unblocked successfully", "success");
      }
    } catch (error) {
      console.log(error);
      displayToastAlert(
        400,
        "Failed to Fetch COurse. We are facing some issue"
      );
    }
  };

  return (
    <div className="h-screen flex">
      <TutorSidebar />
      <div className="ml-64 flex-grow p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">My Courses</h2>
          <Link to="/tutor/new-course">
            <button className="bg-black text-white px-6 py-2 rounded-lg">
              Add New Courses
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              onBlockToggle={handleBlock}
            />
          ))}
        </div>
        {courses.length > 0 && (
          <PaginationComponent
            totalPages={totalPages}
            onPageChange={handlePageChange}
            page={page}
          />
        )}
      </div>
    </div>
  );
};

export default TutorCourse;
