import React from "react";

export default function Ellipsis({ onClick }) {
  const dotStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#464740",
    margin: "0 6px",
  };

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Open note actions"
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.(e)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        cursor: "pointer",
      }}
    >
      <div style={dotStyle}></div>
      <div style={dotStyle}></div>
      <div style={dotStyle}></div>
    </div>
  );
}