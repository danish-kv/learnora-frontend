import React, { useEffect, useState } from "react";
import { fetchCourses } from "../services/adminService";

const useFetchCourse = () => {
  const [courses, setCourses] = useState();
  const [error, setError] = useState(null);

  const getCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);
  return {courses, error, getCourses};
};

export default useFetchCourse;
