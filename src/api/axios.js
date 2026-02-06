import axios from "axios";
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: token
    ? { Authorization: `Bearer ${token}` }
    : {},
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';

    }

    return Promise.reject(err)
  }
)

export default api;