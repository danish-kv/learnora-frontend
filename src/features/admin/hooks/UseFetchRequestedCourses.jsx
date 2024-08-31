import React, { useEffect, useState } from "react";
import { fetchRequestedCourses } from "../services/adminService";

const UseFetchRequestedCourses = () => {
  const [courses, setCourses] = useState();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRequestedCourses = async () => {
    setLoading(true);
    try {
      const res = await fetchRequestedCourses();
      setCourses(res);
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };

  useEffect(() => {
    getRequestedCourses();
  }, []);
  return {courses, getRequestedCourses };
};

export default UseFetchRequestedCourses;
