import React, { useState } from "react";
import "../../styles/prof-chat.css";

export default function ProfessionalMenu() {
  const [open, setOpen] = useState(false);

  const initials = "XX";

  return (
    <div className="pro-menu-wrapper">
      {/* the circle botton in the top right corner */}
      <button
        className="pro-avatar-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {initials}
      </button>

      {/* the menu inside the circle botton */}
      {open && (
        <div className="pro-menu-dropdown">
          <button className="pro-menu-item">Profile</button>
          <button className="pro-menu-item">Support</button>
          <button className="pro-menu-item">Reports</button>
          <button className="pro-menu-item">Preferences</button>
          <button className="pro-menu-item">Log out</button>
        </div>
      )}
    </div>
  );
}