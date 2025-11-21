import "../../App.css"; 


export default function NoteTaking({
  value = "",          // Note content from the parent component
  onChange,            // Update function passed from the parent component
  placeholder = "Write your note here...",
}) {
  return (
    <textarea
      className="note-taking-textarea"
      value={value}                      // Fully controlled by the parent component
      onChange={(e) => onChange?.(e.target.value)} // Notify parent component to update
      placeholder={placeholder}
    />
  );
}

