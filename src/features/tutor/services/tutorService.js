import api from "../../../services/api";

export const fetchCourseDetails = async (slug) => {
  const res = await api.get(`courses/${slug}/`);
  console.log("res of course details === ", res);
  return res.data;
};
