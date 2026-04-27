import axios from 'axios'

// create a custom axios instance
const api = axios.create({
    baseURL: 'http://localhost:3001/api',  // base URL so we don't repeat it everywhere
})

// before EVERY request, automatically attach the token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')  // get token from localStorage
    if (token) {
        config.headers.authorization = token      // attach it to the request
    }
    return config
})

export default api