import axios from 'axios';

// Define axios interceptor
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Base url for vite app
    withCredentials: true, // Ensures cookies are sent with requests
    headers: {
        'Content-Type': 'application/json', // Tells server that body requests contain JSON data
    },
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful, just return the response
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 403 && data.code === 'INVALID_REQUEST') {
                console.log('user tampered with token')
                location.reload()
            }
        }
        return Promise.reject(error); // Throws errors as rejected promises so their values can be accessed
    }
);

export default axiosInstance;