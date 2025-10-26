import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "193px",
        height: "42px",
        backgroundColor: "rgba(120, 120, 128, 0.16)",
        border: "1px solid #000000",
        borderRadius: "100px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        padding: "0 12px",
      }}
    >
      <Search
        size={20}
        color="#999999"
        strokeWidth={1.5}
        style={{ marginRight: "8px" }}
      />
      <input
        type="text"
        placeholder="Search"
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: "17px",
          color: "#999999",
        }}
      />
    </div>
  );
}