import React from "react";
import CourseSidebar from "../components/CourseSidebar";
import Header from "../../../components/layout/Header";
import CourseList from "../components/CourseList";
import UseFetchCategory from "../../admin/hooks/UseFetchCategory";
import useFetchCourse from "../../admin/hooks/useFetchCourse";

const Courses = () => {
  const { categories, error, getCategory } = UseFetchCategory();

  const { courses, getCourses } = useFetchCourse();
  console.log(courses);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          <aside className="w-64 flex-shrink-0">
            <CourseSidebar categories={categories} />
          </aside>
          <main className="flex-1">
            <CourseList courses={courses} />
            <div className="mt-8 text-center">
              <a
                href="#"
                className="text-purple-600 hover:text-purple-800 font-semibold"
              >
                See all
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Courses;
