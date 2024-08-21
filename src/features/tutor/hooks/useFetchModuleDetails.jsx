import React, { useEffect, useState } from "react";
import { fetchModules } from "../services/tutorService";

const useFetchModuleDetails = (id) => {
  const [moduleDetails, setModuleDetails] = useState();
  const [error, setError] = useState();

  const getModuleData = async () => {
    try {
      const data = await fetchModules(id);
      setModuleDetails(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    getModuleData();
  }, [id]);

  return { moduleDetails, error };
};

export default useFetchModuleDetails;
