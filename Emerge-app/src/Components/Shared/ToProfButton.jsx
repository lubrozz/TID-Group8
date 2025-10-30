import { Link } from "react-router-dom";

export default function ToProfButton() {
  return (
    <div style={{ alignContent: "center" }}>
      <Link
        to="/ProfChat"
        style={{
          display: "inline-block",
          margin: "auto",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#4F46E5", // Indigo
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        Go to Professional Chat
      </Link>
    </div>
  );
}
