import api from "@/services/api"

export const  fetchDiscussion =  async () => {
    const res = await api.get('discussion/')
    return res.data
}