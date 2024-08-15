import { useEffect, useState } from "react";
import { fetchStudents } from "../services/adminService";

const useFetchStudent = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const getStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError(error);
    }
  };
  
  useEffect(() => {
    getStudents();
  }, []);

  return { students, refetch : getStudents };
};

export default useFetchStudent;
