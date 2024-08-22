import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import CourseCard from "../../tutor/components/CourseCard";
import { Link } from "react-router-dom";
import useFetchCourse from "../hooks/useFetchCourse";
import AdminCourseCard from "../components/AdminCourseCard";
import api from "../../../services/api";

const AdminCourse = () => {
  const { courses, error, getCourses } = useFetchCourse();
  console.log(courses);


  const handleStatus = async(slug, new_status) => {
    console.log(slug, new_status);
    
    try {
      res =  await api.patch(`courses/${slug}/` ,{
        status : new_status
      })
      console.log(res);
      
      getCourses()
    } catch (error) {
      console.log(error);
      
      
    }

  }

  const handleBlock = async(slug, current_status) => {
    console.log(slug, current_status);
    
    try {
      const res = await api.patch(`courses/${slug}/`,{
        is_active : !current_status
      })
      console.log(res);
      
      getCourses()
    } catch (error) {
      console.log(error);
      
      
    }
  }


  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">All Courses</h2>
            <Link to="/admin/new-course" className="relative inline-block">
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition duration-200">
                Requested
              </button>

              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full text-xs px-2 py-1 font-semibold shadow-lg">
                11
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses &&
              courses.map((course, index) => (
                <AdminCourseCard
                  key={index}
                  course={course}
                  onBlockToggle={handleBlock}
                  onStatusToggle= {handleStatus}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourse;
