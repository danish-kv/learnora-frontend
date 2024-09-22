import api from "@/services/api";

export const fetchStudentProfile = async () => {
  const res = await api.get(`student-profile/`);
  return res.data;
};

export const fetchNotes = async () => {
  const res = await api.get(`notes/`);
  return res.data;
};
