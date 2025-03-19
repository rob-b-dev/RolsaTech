import axiosInstance from "./axios";

const authService = {
    // Way of handling data and reducing code through axios service, returning the response/error from using authService object in the provider
    async verifyToken() {
        try {
            const response = await axiosInstance.get('/auth/verify')
            return response.data
        } catch (error) {
            // Log error to console at this level and show toast message for it in provider
            console.error(error.message)
            throw error
        }
    },

    async login(data) {
        try {
            const response = await axiosInstance.post('/auth/login', data)
            return response.data
        } catch (error) {
            console.error(error.message)
            throw error.response?.data // Throw error.response?.data to reduce code
        }
    },

    async register(data) {
        try {
            const response = await axiosInstance.post('/auth/register', data)
            return response.data
        } catch (error) {
            console.error(error.message)
            throw error.response?.data
        }
    },

    async logout() {
        try {
            const response = await axiosInstance.post('/auth/logout')
            return response.data
        } catch (error) {
            console.error(error.message)
            throw error.response?.data // Throw used to pass the error up so the calling function can handle the error properly
        }
    }
}

export default authService;