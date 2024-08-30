import React, { useEffect, useState } from "react";
import { fetchCourses } from "../services/adminService";

const useFetchCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const getCourses = async (page, category ) => {
    setLoading(true)
    try {
      const data = await fetchCourses(page, category);
      setCourses(data.results);
      setTotalPages(Math.ceil(data.count / 4))
    } catch (error) {
      console.log(error);
      setError(error);
    }finally{
      setLoading(false)
    }
  };
  
  return {courses, error, getCourses, loading, page, setPage, totalPages};
};

export default useFetchCourse;
