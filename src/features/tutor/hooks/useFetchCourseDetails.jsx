import React, { useEffect, useState } from "react";
import { fetchCourseDetails } from "../services/tutorService";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import { useNavigate } from "react-router-dom";

const useFetchCourseDetails = (slug) => {
  const [loading, setLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const getCourseDetails = async () => {
    setLoading(true);
    try {
      const data = await fetchCourseDetails(slug);
      setCourseDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("errosddddddr", error);
      setError(error);
      displayToastAlert(404, error.response.data.detail);
      navigate(`/courses/`);
    }
  };
  useEffect(() => {
    getCourseDetails();
  }, [slug]);

  return { courseDetails, loading, error, refetch: getCourseDetails };
};

export default useFetchCourseDetails;
