import { useState } from "react";
import { Plus, Smile, Send } from "lucide-react";
import "../../App.css";

// The TextBar component represents the message input area
// at the bottom of the chat window. It collects user input
// and sends it via the `onSend` callback.
export default function TextBar({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="textbar">
      {/* --- Left icons: Plus + Smile --- */}
      <div className="textbar-icons">
        <button className="icon-btn">
          <Plus size={18} color="var(--dark-brown-text-color)" strokeWidth={2} />
        </button>
        <button className="icon-btn">
          <Smile size={18} color="var(--dark-brown-text-color)" strokeWidth={2} />
        </button>
      </div>

      {/* --- Input field --- */}
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textbar-input"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      {/* --- Send icon --- */}
      <button onClick={handleSend} className="icon-btn send-btn">
        <Send
          size={18}
          color="var(--dark-brown-text-color)"
          strokeWidth={2}
          style={{ transform: "rotate(0deg)" }}
        />
      </button>
    </div>
  );
}




// src/Components/ChatObject/TextBar.jsx

// // React’s useState hook manages the local text input value.
// import { useState } from "react";

// // These are icons from the 'lucide-react' library.
// // They render SVGs for "plus", "smile", and "send".
// import { Plus, Smile, Send } from "lucide-react";

// // Import global styles or variable definitions.
// import "../../App.css";

// // The TextBar component represents the message input area
// // at the bottom of the chat window. It is **stateless**
// // from the chat perspective — meaning it doesn’t store messages itself.
// // It just collects user input and sends it back via the `onSend` callback.
// export default function TextBar({ onSend }) {

//   // Local state for the text input field.
//   // `text` holds the current value; `setText` updates it.
//   const [text, setText] = useState("");
//   // Handles sending messages.
//   // Prevents sending empty messages (ignores whitespace-only text).
//   // Calls the `onSend` callback (from parent, e.g. ChatObject),
//   // then clears the input field afterward.
//   const handleSend = () => {
//     if (!text.trim()) return; // do nothing if blank
//     onSend(text);             // call the parent’s send handler
//     setText("");              // reset input field
//   };

//   // --- JSX structure ---
//   // The layout consists of:
//   //  [Plus icon] [Smile icon] [input field] [Send icon]
//   // wrapped in a horizontal flexbox with consistent spacing.
//   return (
//     <div
//       className="flex items-center px-3 py-2"
//       style={{
//         display: "flex",
//         backgroundColor: "var(--sand-color)", // beige background bar
//         borderRadius: "100px",                  // slight rounding on corners
//       }}
//     >
//       {/* --- Left icons: Plus + Smile --- */}
//       <div className="flex items-center gap-2 mr-2">
//         {/* Plus button — for future attachments or files */}
//         <button
//           style={{
//             background: "transparent",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           <Plus
//             size={18} // icon size in pixels
//             color="var(--dark-brown-text-color)" // uses design token color
//             strokeWidth={2} // line thickness of the icon
         
//           />
//         </button>
        

//         {/* Smile button — could open an emoji picker */}
//         <button
//           style={{
//             marginInline: "80px",
//             background: "transparent",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           <Smile
//             size={18}
//             color="var(--dark-brown-text-color)"
//             strokeWidth={2}
//           />
//         </button>
//       </div>

//       {/* --- Input field --- */}
//       {/* The user types here. Controlled component (value bound to state). */}
//       <input
//         type="text"
//         placeholder="Type a message..."
//         value={text}
//         onChange={(e) => setText(e.target.value)} // updates local state
//         style={{
// flex: 1,
// maxWidth: "600px", 
//           backgroundColor: "var(--white-bg-color)",
//           border: "none",
//           borderRadius: "999px", // fully rounded “pill” shape
//           padding: "10px 16px",
//           color: "var(--dark-brown-text-color)",
//           fontSize: "14px",
//           outline: "var(--dark-brown-text-color)", // removes blue focus border
//           height: "36px",
//         }}
//         // Could later add `onKeyDown={(e) => e.key === 'Enter' && handleSend()}`
//         // for enter-to-send functionality.
//       />

//       {/* --- Send icon (button) --- */}
//       {/* Clicking this triggers handleSend. */}
//       <button
//         onClick={handleSend}
//         style={{
//           marginLeft: "8px",
//           background: "transparent",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         <Send
//           size={18}
//           color="var(--dark-brown-text-color)"
//           strokeWidth={2}
//           style={{ transform: "rotate(-0deg)" }}
//         />
//       </button>
//     </div>
//   );
// }
