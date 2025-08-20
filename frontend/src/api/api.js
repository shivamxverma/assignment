import axios from "axios";
const BASE = "http://localhost:8000/api";
const accessToken = localStorage.getItem("accessToken");

const api = axios.create({
  baseURL: BASE,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export const login = (email,password) => {
    return axios.post(`${BASE}/login`,
     { email, password },
     {
        withCredentials: true,
        headers: { "Content-Type": "application/json" } 
     } 
    );
}

export const register = (name, email, password, role) => {
    return axios.post(`${BASE}/register`,
     { name, email, password, role },
     {  
        withCredentials: true,
        headers: { "Content-Type": "application/json" } 
     } 
    );
}

export const getAllBookingsForAdmin = () => {
    return api.get(`${BASE}/all-bookings`);
}

export const getBookingsForUser = () => {
    return api.get(`${BASE}/my-bookings`);
}

export const createBooking = (bookId) => {
    return api.post(`${BASE}/book/${bookId}`);
}

export const getAvailableSlots = () => {
    return api.get(`${BASE}/slots`);
}

export default api;

