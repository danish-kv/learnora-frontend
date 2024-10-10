import React, { useEffect, useState } from "react";
import { fetchRequestedCategory } from "../services/adminService";

const UseFetchRequestedCategory = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRequestedCategory = async () => {
    setLoading(true);
    try {
      const data = await fetchRequestedCategory();
      setCategory(data);
      console.log("requested :", data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequestedCategory();
  }, []);
  return { category, error, loading, getRequestedCategory };
};

export default UseFetchRequestedCategory;
