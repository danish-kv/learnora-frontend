import api from "../../../services/api"



export const fetchCourseDetails = async(id) => {
    const res = await api.get(`course/${id}/`)
    console.log('res of course details === ', res);
    return res.data
    
}