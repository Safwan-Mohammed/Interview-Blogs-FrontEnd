import axios from "axios"

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_ENVIRONMENT === 'PROD' ? `https://backend.safwanspehere.online` : `http://localhost:8000`
})

export default axiosInstance