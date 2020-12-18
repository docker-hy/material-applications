import axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND_URL || '/api'

export const axiosInstance = axios.create({ baseURL })

/**
 * This can be used to check that frontend has access to backend
 */
export const pingpong = () => axiosInstance.get("/ping")

/**
 * ?redis=true will check that redis is connected to backend
 */
export const pingpongRedis = () => axiosInstance.get("/ping?redis=true")

/**
 * ?postgres=true will check that postgres database is connected to backend
 */
export const pingpongPostgres = () => axiosInstance.get("/ping?postgres=true")

/**
 * Nginx exercise wants the backend to live in /api
 */
export const pingpongNginx = () => axios.get('/api/ping')
