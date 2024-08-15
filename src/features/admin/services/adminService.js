import api from "../../../services/api";

export const fetchStudents = async () => {
  const res = await api.get("students/");
  return res.data;
};
export const fetchTutors = async () => {
  try {
    const res = await api.get("tutor/");
    console.log("res of fetchTutors", res);

    return res.data;
  } catch (error) {
    console.log("error in fetching", error);
    return [];
  }
};

export const fetchTutorDetails = async (id) => {
  const res = await api.get(`tutor/${id}/`);
  console.log("res of tutor details ====", res);

  return res.data;
};

export const fetchCourses = async () => {
  const res = await api.get("courses/");
  return res.data;
};
