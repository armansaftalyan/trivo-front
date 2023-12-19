import axios from 'axios';

// Create an instance of Axios
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Set the base URL from environment variable
    headers: {
        'Content-Type': 'application/json',
        // You can add other default headers here if needed
    },
});

// Add a request interceptor for authentication, headers, etc.
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        // Modify or add headers, tokens, etc. before sending the request
        // For example:
        // config.headers.Authorization = `Bearer ${getTokenFromStorage()}`;
        return config;
    },
    (error) => {
        // Handle request errors
        return error;
    }
);

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.log(error)
        // if (error.response.data.message === 'Unauthenticated.') {
        //     localStorage.removeItem('token')
        //     window.location.reload()
        // }
        return Promise.reject(error)
    }
)

export default instance;