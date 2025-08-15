// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ Already includes /api/interview
  headers: {
    "Content-Type": "application/json",
  },
});

export const scheduleInterview = (data) => {
  console.log("📡 Scheduling interview. URL:", API.defaults.baseURL + "/schedule");
  console.log("📦 Data being sent:", data);
  return API.post("/schedule", data);
};

export const sendMail = (data) => API.post("/mail/send", data);

export default API;
