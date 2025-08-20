import axios from "axios";
const BASE = "https://assignment-h9fg.onrender.com/api";
// const BASE = "http://localhost:8000/api";


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
    return axios.get(`${BASE}/all-bookings`,{
        withCredentials: true,
        headers: { Authorization : `Bearer ${localStorage.getItem('accessToken')}` }
    });
}

export const getBookingsForUser = () => {
    return axios.get(`${BASE}/my-bookings`,{
        withCredentials: true,
        headers: { Authorization : `Bearer ${localStorage.getItem('accessToken')}` }
    });
}

export const createBooking = (bookId) => {
    return axios.post(`${BASE}/book/${bookId}`,{
      withCredentials: true,
      headers : { Authorization : `Bearer ${localStorage.getItem('accessToken')}` }
    });
}

export const getAvailableSlots = () => {
    return axios.get(`${BASE}/slots`,{
      withCredentials: true,
      headers: { Authorization : `Bearer ${localStorage.getItem('accessToken')}` }
    });
}

