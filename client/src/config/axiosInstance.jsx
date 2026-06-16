import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://salon-x-production.up.railway.app/api',
    withCredentials: true,   
})

