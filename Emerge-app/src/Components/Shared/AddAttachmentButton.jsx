import { Plus } from "lucide-react";
import IconButton from "./IconButton";
import "../../App.css"; 

export default function AddAttachmentButton({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      className="add-attachment-button"
    >
      <Plus size={14} color="#000000" strokeWidth={2} />
    </IconButton>
  );
}

