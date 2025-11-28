import "../../Report.css";


export default function ReportModal({ onConfirm, onCancel }) {
  return (
    <div className="report-modal-overlay">
      <div className="report-modal">
        <h3>Are you sure?</h3>
        <p>Do you want to report this user’s self-harm behavior?</p>

        <div className="report-modal-buttons">
          <button className="modal-confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="modal-cancel" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}