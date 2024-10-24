import React, { useEffect, useState } from "react";
import { fetchCategory } from "../services/adminService";

const UseFetchCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const getCategory = async () => {
    setLoading(true)
    try {
      const data = await fetchCategory();
      console.log(data);

      setCategories(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return { categories, error, getCategory, loading };
};

export default UseFetchCategory;
