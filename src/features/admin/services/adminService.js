import api from "../../../services/api";

export const fetchStudents = async () => {
    const res = await api.get('students/')
    return res.data
}
export const fetchTutors = async () => {
    const res = await api.get('tutors/')
    return res.data
}

export const fetchCourses = async () => {
    const res = await api.get('courses/')
    return res.data
}