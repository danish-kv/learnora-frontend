import api from "../../../services/api";

export const fetchCourseDetails = async (slug) => {
  const res = await api.get(`courses/${slug}/`);
  console.log("res of course details === ", res);
  return res.data;
};


export const fetchModules = async (id) => {
  const res = await api.get(`modules/${id}/`)
  console.log('res of moduel fetchss =', res);
  return res.data
  
}