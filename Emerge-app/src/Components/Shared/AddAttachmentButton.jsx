import { Plus } from "lucide-react";
import "../../App.css"; 

export default function AddAttachmentButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="add-attachment-button"
    >
      <Plus size={14} color="#000000" strokeWidth={2} />
    </button>
  );
}

