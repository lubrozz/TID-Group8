import React, { useState } from "react";
import "../../App.css";

export default function ReportButton({ onReport }) {
  const [isReported, setIsReported] = useState(false);

  // Handle the double click action
  const handleDoubleClick = () => {
    setIsReported(true);
    onReport(); // Trigger parent function to handle the reporting action
  };

  return (
    <button 
      onDoubleClick={handleDoubleClick} 
      className="report-button"
    >
      {isReported ? "You have reported user's self-harm behavior!" : "Double-click to report the user’s self-harm behavior"}
    </button>
  );
}

