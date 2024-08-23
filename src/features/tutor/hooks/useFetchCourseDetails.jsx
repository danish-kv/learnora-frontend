import React, { useEffect, useState } from "react";
import { fetchCourseDetails } from "../services/tutorService";

const useFetchCourseDetails = (slug) => {
  const [loading, setLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState();
  const [error, setError] = useState(null);

  const getCourseDetails = async () => {
    setLoading(true);
    try {
      const data = await fetchCourseDetails(slug);
      setCourseDetails(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  useEffect(() => {
    getCourseDetails();
  }, [slug]);

  return { courseDetails, loading, error, refetch: getCourseDetails };
};

export default useFetchCourseDetails;
