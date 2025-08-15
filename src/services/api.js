// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ Reads from .env
  headers: {
    "Content-Type": "application/json",
  },
});

export const scheduleInterview = (data) =>
  API.post("/schedule", data); // only /schedule now


export const sendMail = (data) => API.post("/mail/send", data);

export default API;
