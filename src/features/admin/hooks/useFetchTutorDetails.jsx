import React, { useEffect, useState } from "react";
import { fetchTutorDetails } from "../services/adminService";

const useFetchTutorDetails = (id) => {
  const [TutorDetails, setTutorDetails] = useState(null);
  const [error, setError] = useState(null);

  const getTutorDetails = async () => {
    try {
      const data = await fetchTutorDetails(id);
      console.log('res of tutor',data);
      
      setTutorDetails(data)
    } catch (error) {
      console.log("error in fetching tutor detils ==", error);
      setError(error);
    }
  };
  useEffect(() => {
    if (id) {
      getTutorDetails();
    }
  }, [id]);
  return { TutorDetails, error};
};

export default useFetchTutorDetails;
