import React, { useEffect, useState } from 'react'
import { fetchTutors } from '../services/adminService'


const useFetchTutor = () => {
    const [tutors, setTutors] = useState([]);
    const [error, setError] = useState(null);
  
    const getTutors = async () => {
      try {
        const data = await fetchTutors();
        setTutors(data);
      } catch (error) {
        console.error('Error fetching Tutor:', error);
        setError(error);
      }
    };


    useEffect(() => {
      getTutors();
    }, []);
  
    return { tutors, refech:  getTutors };
  };
  

export default useFetchTutor