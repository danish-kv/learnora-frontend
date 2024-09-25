import api from "@/services/api";
import React, { useEffect, useState } from "react";
import { fetchDashboard } from "../services/dashboardServices";

const useFetchTutorDashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDashboard = async () => {
    setLoading(false);
    try {
      const data = await fetchDashboard();
      setDashboardData(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);
  return { dashboardData, error, loading };
};

export default useFetchTutorDashboard;
