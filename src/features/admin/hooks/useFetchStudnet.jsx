import { useEffect, useState } from "react";
import { fetchStudents } from "../services/adminService";

const useFetchStudent = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError(error);
      }
    };
    getStudents();
  }, []);

  return { students, error };
};

export default useFetchStudent;
