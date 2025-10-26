import React from "react";

export default function NoteTaking({
  value = "",          // Note content from the parent component
  onChange,            // Update function passed from the parent component
  placeholder = "Write your note here...",
}) {
  const noteStyle = {
    width: "204px",
    height: "162px",
    backgroundColor: "#5B5D52",
    color: "white",
    fontFamily: "Nunito, sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.5",
    borderRadius: "16px",
    padding: "16px",
    boxSizing: "border-box",
    resize: "none",  
    outline: "none",
    border: "none",
  };

  return (
    <textarea
      style={noteStyle}
      value={value}                      // Fully controlled by the parent component
      onChange={(e) => onChange?.(e.target.value)} // Notify parent component to update
      placeholder={placeholder}
    />
  );
}