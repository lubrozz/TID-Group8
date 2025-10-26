import AddAttachmentButton from "../Shared/AddAttachmentButton"; 


export default function AddNoteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "var(--sand-color)",
        border: "1px solid #464740",  
        borderRadius: "20px",         
        width: "180px",
        height: "35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "none",       
        padding: 0,                  
      }}
    >
      {/* Here we use AddAttachmentButton component */}
      <AddAttachmentButton />
    </button>
  );
}

