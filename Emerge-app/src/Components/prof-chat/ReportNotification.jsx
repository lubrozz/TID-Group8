import React, { useState } from "react";
import "../../Report.css";
import ReportButton from "../Buttons/ReportButton.jsx";
import ReportModal from "../Shared/ReportModal.jsx";

export default function ReportNotification() {
  const [isReported, setIsReported] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClickReport = () => {
    if (!isReported) setShowModal(true);
  };

  const confirmReport = () => {
    setIsReported(true);
    setShowModal(false);
  };

  const cancelReport = () => {
    setShowModal(false);
  };

  return (
    <div className="report-notification">

      <span className="report-label">
        {isReported
          ? "You have reported the user's self-harm behavior."
          : "Click to report the user's self-harm behavior"}
      </span>

      <div className="report-button-wrapper">
        <ReportButton onClick={handleClickReport} isReported={isReported} />
      </div>

      {showModal && (
        <ReportModal
          onConfirm={confirmReport}
          onCancel={cancelReport}
        />
      )}
    </div>
  );
}