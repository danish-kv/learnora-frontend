import React, { useEffect, useState } from "react";
import { fetchCourseDetails } from "../services/tutorService";

const useFetchCourseDetails = (slug) => {
  const [courseDetails, setCourseDetails] = useState();
  const [error, setError] = useState(null);

  const getCourseDetails = async () => {
    try {
      const data = await fetchCourseDetails(slug);
      setCourseDetails(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  useEffect(() => {
    getCourseDetails();
  }, [slug]);

  return { courseDetails, error, refetch : getCourseDetails };
};

export default useFetchCourseDetails;
