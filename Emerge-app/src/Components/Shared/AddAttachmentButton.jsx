import { Plus } from "lucide-react";

export default function AddAttachmentButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        border: "2px solid #000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        cursor: "pointer",
        padding: "0",
      }}
    >
      <Plus size={14} color="#000000" strokeWidth={2} />
    </button>
  );
}

