import api from "@/services/api";
import React, { useEffect, useState } from "react";

const useFetchGlobalLeaderboard = () => {
  const [participants, setParticipants] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await api.get("global-leaderboard");
      console.log(res.data);
      setParticipants(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, []);
  return { participants, errors, loading };
};

export default useFetchGlobalLeaderboard;
