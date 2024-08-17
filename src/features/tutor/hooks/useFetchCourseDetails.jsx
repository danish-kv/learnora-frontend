import React, { useEffect, useState } from "react";
import { fetchCourseDetails } from "../services/tutorService";

const useFetchCourseDetails = (id) => {
  const [courseDetails, setCourseDetails] = useState();
  const [error, setError] = useState(null);

  const getCourseDetails = async () => {
    try {
      const data = await fetchCourseDetails(id);
      setCourseDetails(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  useEffect(() => {
    getCourseDetails();
  }, []);

  return { courseDetails, error };
};

export default useFetchCourseDetails;
