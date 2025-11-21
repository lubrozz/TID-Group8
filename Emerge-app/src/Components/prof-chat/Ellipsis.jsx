import "../../App.css";


export default function Ellipsis({ onClick }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Open note actions"
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.(e)}
      className="ellipsis-container"
    >
      <div className="ellipsis-dot"></div>
      <div className="ellipsis-dot"></div>
      <div className="ellipsis-dot"></div>
    </div>
  );
}