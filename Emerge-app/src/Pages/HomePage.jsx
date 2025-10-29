import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <div className="child-splash-bg">
        <h1>This will be our TID app for group 8</h1>
       
      <Link
        to="/ProfChat"
        style={{
          display: "inline-block",
          marginTop: "1.5rem",
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
    </>
  );
};

export default HomePage;