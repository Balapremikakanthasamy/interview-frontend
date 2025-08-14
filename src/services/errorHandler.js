// src/components/NotificationBanner.jsx
import React from "react";

export default function NotificationBanner({ type, message }) {
  const bgColor =
    type === "success"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div className={`p-3 rounded-md mb-4 ${bgColor}`}>
      {message}
    </div>
  );
}
