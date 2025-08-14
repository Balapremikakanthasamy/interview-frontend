import React, { useState } from "react";
import DatePicker from "react-datepicker";         // ✅ Import DatePicker here
import "react-datepicker/dist/react-datepicker.css"; // ✅ Import its CSS
import "./InterviewScheduler.css";

export default function InterviewScheduler() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setinterview_type] = useState("Zoom");
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

  const handleSchedule = async () => {
    if (!name || !email || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/interview/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, date, time, interview_type: type })
    });


      if (response.ok) {
        alert("✅ Interview scheduled and confirmation email sent!");
        setName("");
        setEmail("");
        setDate("");
        setTime("");
        setinterview_type("Zoom");
      } else {
        alert("❌ Error scheduling interview. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Could not connect to server.");
    }
    setLoading(false);
  };

  return (
    <div className="scheduler-container">
      <h2>📅 Schedule Interview</h2>

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
  onChange={(date) => setDate(date.toISOString().split('T')[0])} // yyyy-mm-dd
  dateFormat="yyyy-MM-dd"
  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
  minDate={new Date()} // disable past dates
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
      <select value={type} onChange={(e) => setinterview_type(e.target.value)}>
        <option value="Zoom">Zoom</option>
        <option value="In-person">In-person</option>
        <option value="Google Meet">Google Meet</option>
      </select>

      <button
        onClick={handleSchedule}
        disabled={loading || !name || !email || !date || !time}
      >
        {loading ? "Scheduling..." : "Schedule Interview"}
      </button>
    </div>
  );
}
