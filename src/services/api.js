// src/services/api.js
import axios from "axios";

// ✅ Create axios instance
const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // Flask backend API base
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ API calls
export const scheduleInterview = (data) => API.post("/interview/schedule", data);
export const sendMail = (data) => API.post("/mail/send", data);

export default API;
