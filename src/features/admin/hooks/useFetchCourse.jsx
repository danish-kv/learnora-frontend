import React, { useState } from "react";
import { fetchCourses } from "../services/adminService";
import api from "@/services/api";

const useFetchCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getCourses = async (page, category) => {
    setLoading(true);
    try {
      const data = await fetchCourses(page, category);
      setCourses(data.results);
      setTotalPages(Math.ceil(data.count / 9));
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getSearchedCourses = async (query) => {
    setLoading(true);

    try {
      const res = await api.get(`/courses/?search=${query}`);
      console.log("res of search ===", res.data);
      setCourses(res.data.results);
      setTotalPages(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    error,
    getCourses,
    loading,
    page,
    setPage,
    totalPages,
    getSearchedCourses,
  };
};

export default useFetchCourse;
