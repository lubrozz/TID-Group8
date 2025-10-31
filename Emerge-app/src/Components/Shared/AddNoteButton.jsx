import AddAttachmentButton from "../Shared/AddAttachmentButton";
import "../../App.css"; 


export default function AddNoteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="add-note-button"
    >
      {/* Here we use AddAttachmentButton component */}
      <AddAttachmentButton />
    </button>
  );
}

