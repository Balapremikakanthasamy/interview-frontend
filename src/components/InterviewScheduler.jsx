import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./InterviewScheduler.css";
import { scheduleInterview } from "../services/api"; // ✅ Import API call

export default function InterviewScheduler() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setInterviewType] = useState("Zoom");
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM"
  ];

  // ✅ FORM SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    if (!name || !email || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await scheduleInterview({
        candidate_name: name,
        interviewer_name: type,
        interview_type: type,
        date: date,
        time: time,
        email: email
      });
      alert("✅ Interview scheduled and confirmation email sent!");
      setName("");
      setEmail("");
      setDate("");
      setTime("");
      setInterviewType("Zoom");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error scheduling interview. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="scheduler-container">
      <h2>📅 Schedule Interview</h2>

      <form onSubmit={handleSubmit}>
        <label>Candidate Name</label>
        <input
          type="text"
          placeholder="Enter candidate name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Candidate Email</label>
        <input
          type="email"
          placeholder="Enter candidate email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Select Date</label>
        <DatePicker
          selected={date ? new Date(date) : null}
          onChange={(selectedDate) =>
            setDate(selectedDate.toISOString().split("T")[0])
          }
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          placeholderText="Select a date"
        />

        <label>Select Time Slot</label>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setTime(slot)}
              className={`p-2 rounded-md border font-medium transition-colors duration-200
                ${time === slot
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"}`}
            >
              {slot}
            </button>
          ))}
        </div>

        <label>Interview Type</label>
        <select
          value={type}
          onChange={(e) => setInterviewType(e.target.value)}
        >
          <option value="Zoom">Zoom</option>
          <option value="In-person">In-person</option>
          <option value="Google Meet">Google Meet</option>
        </select>

        <button
          type="submit"
          disabled={loading || !name || !email || !date || !time}
        >
          {loading ? "Scheduling..." : "Schedule Interview"}
        </button>
      </form>
    </div>
  );
}
