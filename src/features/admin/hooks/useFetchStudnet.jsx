import { useEffect, useState } from "react";
import { fetchStudents } from "../services/adminService";

const useFetchStudent = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getStudents = async () => {
    setLoading(true);
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return { students, refetch: getStudents, loading };
};

export default useFetchStudent;
