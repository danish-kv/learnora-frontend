import React, { useEffect, useState } from "react";
import { fetchContest } from "../services/tutorService";

const useFetchContest = () => {
  const [contests, setContests] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const getConteset = async () => {
    setLoading(true);
    try {
      const data = await fetchContest();
      setContests(data);
    } catch (error) {
      console.log(error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConteset();
  }, []);

  return { contests, errors, loading, getConteset };
};

export default useFetchContest;
