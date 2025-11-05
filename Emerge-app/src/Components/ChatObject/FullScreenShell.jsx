// src/Components/ChatShared/FullScreenShell.jsx
export default function FullScreenShell({ children }) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "var(--light-sand-color)",
          color: "var(--dark-brown-text-color)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    );
  }
  