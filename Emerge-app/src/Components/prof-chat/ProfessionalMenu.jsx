import React, { useState } from "react";
import "../../styles/prof-chat.css";
import { useNavigate } from "react-router-dom";
import Parse from "parse"; // for log out

export default function ProfessionalMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const initials = "XX";

  const handleLogout = async () => {
    try {
      // 1. Clear Parse Login Status
      await Parse.User.logOut();
    } catch (err) {
      console.error("Error logging out:", err);
      // Even if an error occurs, continue the redirect to avoid getting stuck here
    } finally {
      // 2. Close the menu
      setOpen(false);
      // 3. Change to Welcome page
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="pro-menu-wrapper">
      {/* the circle botton in the top right corner */}
      <button
        className="pro-avatar-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {initials}
      </button>

      {/* the Prof menu under the circle botton */}
      {open && (
        <div className="pro-menu-dropdown">
          <button className="pro-menu-item">Profile</button>
          <button className="pro-menu-item">Support</button>
          <button className="pro-menu-item">Reports</button>
          <button className="pro-menu-item">Preferences</button>
          <button className="pro-menu-item" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}