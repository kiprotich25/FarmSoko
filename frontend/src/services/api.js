import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL ;

const API = axios.create({
    baseURL: API_URL,
});
// add auth tokens to request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;