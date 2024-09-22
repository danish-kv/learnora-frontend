import React, { useEffect, useState } from "react";
import { fetchNotes } from "../services/StudentService";

const useFetchNotes = () => {
  const [notes, setNotes] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const getNotes = async () => {
    setLoading(true);
    try {
      const data = await fetchNotes();
      setNotes(data);
      console.log(data);
    } catch (error) {
      console.log(error);

      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return { notes, errors, loading, getNotes };
};

export default useFetchNotes;
