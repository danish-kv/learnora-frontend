import React, { useEffect, useState } from "react";
import { fetchDiscussion } from "../services/DiscussionServices";

const UseFetchDiscussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const getDiscussion = async () => {
    setLoading(true);
    try {
      const data = await fetchDiscussion();
      setDiscussions(data);
    } catch (error) {
      console.log(error);
      setErrors(errors)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDiscussion()
  }, [])
  return{discussions, loading, errors, getDiscussion}
};

export default UseFetchDiscussion;
