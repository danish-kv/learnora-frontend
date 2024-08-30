import React, { useEffect, useState } from "react";
import { fetchCategory } from "../services/adminService";

const UseFetchCategory = () => {
  const [categories, setCategories] = useState();
  const [error, setError] = useState(null);

  const getCategory = async () => {
    try {
      const data = await fetchCategory();
      console.log(data);

      setCategories(data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return { categories, error, getCategory };
};

export default UseFetchCategory;
