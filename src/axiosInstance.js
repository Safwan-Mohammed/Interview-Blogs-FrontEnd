import axios from "axios"

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_ENVIRONMENT === 'PROD' ? `` : `http://localhost:8000`
})

export default axiosInstance