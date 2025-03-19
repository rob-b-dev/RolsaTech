import axiosInstance from "./axios";

const userService = {
    async gatherProfile() {
        try {
            const response = await axiosInstance.get('/user/gather')
            return response.data
        } catch (error) {
            console.error(error.message)
            throw error
        }
    },

    async updateProfile(data) {
        try {
            const response = await axiosInstance.post('/user/update', data)
            return response
        } catch (error) {
            console.error(error.message)
            throw error
        }
    },

    async deleteProfile() {
        try {
            const response = await axiosInstance.post('/user/delete')
            return response
        } catch (error) {
            console.error(error.message)
            throw error
        }
    }
}

export default userService;