import axiosInstance from "./axios";

const userService = {
    async gatherProfile() {
        try {
            const response = await axiosInstance.get('/profile/gather')
            return response.data
        } catch (error) {
            console.error(error.message)
            throw error
        }
    },

    async updateProfile(data) {
        try {
            const response = await axiosInstance.post('/profile/update', data)
            return response
        } catch (error) {
            console.error(error.message)
            throw error
        }
    },

    async deleteProfile() {
        try {
            const response = await axiosInstance.post('/profile/delete')
            return response
        } catch (error) {
            console.error(error.message)
            throw error
        }
    }
}

export default userService;