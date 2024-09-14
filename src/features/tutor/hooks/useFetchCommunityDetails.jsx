import React, { useEffect, useState } from "react";
import { fetchCommunityDetails } from "../services/tutorService";

const useFetchCommunityDetails = (slug) => {
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCommunityData = async(slug) => {
    setLoading(true);
    try {
      const data = await fetchCommunityDetails(slug);
      console.log('data',data);
      
      setCommunity(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCommunityData(slug)
  }, [slug])
  return {community, loading, error, getCommunityData}
};

export default useFetchCommunityDetails;
