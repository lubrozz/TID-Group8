import { Circle } from "lucide-react";
import "../App.css";

export default function ChatListItem({ name, time, isActive }) {
  return (
    <div
      className="flex items-center justify-between p-3 transition cursor-pointer"
      style={{
        backgroundColor: isActive
          ? "var(--sand-color)"
          : "var(--white-bg-color)",
      }}
    >
      <div className="flex items-center space-x-3">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: "36px",
            height: "36px",
            backgroundColor: "rgba(91,93,82,0.1)",
          }}
        >
          <Circle size={16} color="var(--dark-brown-color)" />
        </div>
        <span style={{ color: "var(--dark-brown-text-color)" }}>{name}</span>
      </div>

      <span
        className="text-sm"
        style={{
          color: "var(--dark-brown-color)",
          opacity: 0.7,
        }}
      >
        {time}
      </span>
    </div>
  );
}
