import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Fetch all sessions (classes)
export async function fetchSessions() {
  const response = await api.get('/sessions');
  return response.data;
}

export default api;
