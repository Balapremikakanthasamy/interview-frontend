import React, { useState } from "react";
import { scheduleInterview } from "./services/api"; // ✅ Uses Render backend
import Swal from "sweetalert2";

function App() {
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [interviewType, setInterviewType] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    candidate_name: candidateName,
    interviewer_name: "Default Interviewer",
    interview_type: interviewType,
    date: selectedDate,
    time: selectedTime,
    email: candidateEmail
  };

  console.log("Sending payload:", payload);

  try {
    const res = await scheduleInterview(payload); // ✅ Use API helper

    Swal.fire("Success", res.data.message, "success");

    setCandidateName("");
    setCandidateEmail("");
    setSelectedDate("");
    setSelectedTime("");
    setInterviewType("");
  } catch (error) {
    console.error("Error scheduling interview:", error);
    Swal.fire("Error", error.response?.data?.message || "Could not connect to the server", "error");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Schedule an Interview
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Candidate Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Candidate Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Candidate Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Candidate Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interview Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interview Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Interview Type */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interview Type
            </label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Interview Type</option>
              <option value="Zoom">Zoom</option>
              <option value="In-person">In-person</option>
              <option value="Google Meet">Google Meet</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
            >
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
