import api from "@/services/api";

export const getTutorProfile = async () => {
    const res = await api.get(`tutor-profile/`);
    return res.data;
  };
  