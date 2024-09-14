import api from "../../../services/api";

export const fetchCourseDetails = async (slug) => {
  const res = await api.get(`courses/${slug}/`);
  console.log("res of course details === ", res);
  return res.data;
};

export const fetchModules = async (id) => {
  const res = await api.get(`modules/${id}/`);
  console.log("res of moduel fetchss =", res);
  return res.data;
};

export const fetchContest = async () => {
  const res = await api.get("contest/");
  console.log("res of contest ==", res);
  return res.data;
};

export const fetchContestDetails = async (id) => {
  const res = await api.get(`contest/${id}`);
  console.log("res of contest details ==", res);
  return res.data;
};

export const fetchCommunity = async () => {
  const res = await api.get("list-community/");
  console.log("ref of community data", res);
  return res.data;
};

export const fetchCommunityDetails = async (slug) => {
  const res = await api.get(`list-community/${slug}/`);
  console.log("ref of community details", res);
  return res.data;
};
