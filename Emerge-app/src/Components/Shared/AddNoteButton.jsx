import { FilePlus } from "lucide-react";
import IconButton from "./IconButton";
import "../../App.css"; 


export default function AddNoteButton({ onClick }) {
  return (
    <IconButton
      onClick={onClick}
      className="add-note-button"
    >
      <FilePlus size={14} color="#000000" strokeWidth={2} />
    </IconButton>
  );
}

