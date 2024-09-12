import React, { useEffect, useState } from "react";
import { fetchCommunity } from "../services/tutorService";

const useFetchCommunity = () => {
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCommunity = async () => {
    setLoading(true);
    try {
      const data = await fetchCommunity();
      console.log(data);
      setCommunities(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }

};
useEffect(() => {
  getCommunity();
}, []);

  return { communities, error, loading };
};

export default useFetchCommunity;
