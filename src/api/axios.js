import axios from "axios";
const token = localStorage.getItem("token");
console.log(process.env.REACT_APP_API_URL)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
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