import api from "@/services/api";
import React, { useEffect, useState } from "react";

const useFetchLandingPage = () => {
  const [homeData, setHomeData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getHome = async () => {
    setLoading(true);
    try {
      const res = await api.get("/landing-page");
      console.log(res.data);
      setHomeData(res.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getHome();
  }, []);

  return { homeData, error, loading };
};

export default useFetchLandingPage;
