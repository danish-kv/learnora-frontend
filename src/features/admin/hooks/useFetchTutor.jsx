import React, { useEffect, useState } from 'react'
import { fetchTutors } from '../services/adminService'


const useFetchTutor = () => {
    const [tutor, setTutors] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getTutors = async () => {
        try {
          const data = await fetchTutors();
          setTutors(data);
        } catch (error) {
          console.error('Error fetching Tutor:', error);
          setError(error);
        }
      };
      getTutors();
    }, []);
  
    return { tutor, error };
  };
  

export default useFetchTutor