import React, { useEffect, useState } from "react";
import { fetchStudentProfile } from "../services/StudentService";

const UseFetchStudentProfile = () => {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProfileData = async () => {
    try {
      const res = await fetchStudentProfile();
      console.log("studne tdata", res);
      setProfile(res);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    getProfileData()
  }, []);
  return { profile, getProfileData };
};

export default UseFetchStudentProfile;
