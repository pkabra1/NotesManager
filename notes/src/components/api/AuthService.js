// services/AuthService.js
import { apiClient } from "./ApiClient";

export const login = async (email, password) => {
    const response = await apiClient.post('/api/auth/login', {
        email,
        password
    });
    if (response.headers['authorization']) {
        // Extract token from the Authorization header
        const token = response.headers['authorization'].replace('Bearer ', '');
        localStorage.setItem('token', token);
    }
    return response.data; // Adjust based on the backend's response
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const register = async (email, password) => {
    const response = await apiClient.post('/api/auth/register', {
        email,
        password
    });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};
