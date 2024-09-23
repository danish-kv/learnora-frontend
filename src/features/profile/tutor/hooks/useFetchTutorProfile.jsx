import React, { useEffect, useState } from "react";
import { getTutorProfile } from "../services/profileService";

const useFetchTutorProfile = () => {
  const [profileData, setProfileData] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProfile = async() => {
    setLoading(true);
    try {
      const data = await getTutorProfile();
      setProfileData(data[0]);
    } catch (error) {
      console.log(error);
      setErrors(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() =>{
    getProfile()
  }, [])
  return {profileData, errors, loading, getProfile}
};

export default useFetchTutorProfile;
