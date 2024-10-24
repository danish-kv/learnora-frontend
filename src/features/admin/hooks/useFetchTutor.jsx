import React, { useEffect, useState } from "react";
import { fetchTutors } from "../services/adminService";

const useFetchTutor = () => {
  const [tutors, setTutors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTutors = async () => {
    setLoading(true);
    try {
      const data = await fetchTutors();
      setTutors(data);
    } catch (error) {
      console.error("Error fetching Tutor:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTutors();
  }, []);

  return { tutors, getTutors, loading };
};

export default useFetchTutor;
