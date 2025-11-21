import "../../Report.css";

export default function ReportButton({ onClick, isReported }) {
  return (
    <button
      className="report-button"
      onClick={onClick}
      disabled={isReported}
    >
      {isReported ? "Reported" : "Report"}
    </button>
  );
}