import React, { useState } from "react";
import "../../App.css";
import ReportButton from "./ReportButton"; 


export default function ReportNotification() {
  const [isReported, setIsReported] = useState(false);

  const handleReport = () => {
    setIsReported(true); // set the report state as "already sent"
  };

  return (
    <div className="report-notification">
      {/* Text Content */}
      <p>
        {isReported
          ? "You have reported user's self-harm behavior!"
          : "Double-click to report the user's self-harm behavior"}
      </p>

      {/* ReportButton Component */}
      <ReportButton onClick={handleReport} />
    </div>
  );
}

