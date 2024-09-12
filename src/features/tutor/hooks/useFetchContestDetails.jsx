import React, { useEffect, useState } from "react";
import { fetchContestDetails } from "../services/tutorService";

const useFetchContestDetails = (id) => {
  const [contestDetails, setContestDetails] = useState([]);
  const [error, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const getContesetDetails = async (id) => {
    setLoading(true);
    try {
      const data = await fetchContestDetails(id);
      setContestDetails(data);
    } catch (error) {
      console.log(error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContesetDetails(id);
  }, []);

  return { contestDetails, error, loading, getContesetDetails };
};

export default useFetchContestDetails;
