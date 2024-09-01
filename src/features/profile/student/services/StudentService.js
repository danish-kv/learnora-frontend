import api from "@/services/api"



export const fetchStudentProfile = async() => {
    const res = await api.get(`student-profile/`)
    return res.data

}