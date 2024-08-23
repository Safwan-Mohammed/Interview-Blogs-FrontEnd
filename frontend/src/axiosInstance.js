import axios from "axios"

const axiosInstance = axios.create({
    // withCredentials: true,
    // withCredentials: false,
    baseURL: 'https://interview-blogs-api.vercel.app'
})

export default axiosInstance