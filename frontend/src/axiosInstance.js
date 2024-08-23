import axios from "axios"

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'https://interview-blogs-api.vercel.app'
})

export default axiosInstance