import React, { useEffect, useState } from 'react'
import { fetchCourses } from '../services/adminService'

const useFetchCourse = () => {
    const [courses, setCourses] = useState()
    const [error, setError] = useState(null)

    useEffect(() => {
        const getCourses = async () => {
            try {
                const data = await fetchCourses()
                setCourses(data)
            } catch (error) {
                console.log(error);
                setError(error)
                
                
            }
        }
        getCourses()
    },[])
  return ( courses, error)
}

export default useFetchCourse