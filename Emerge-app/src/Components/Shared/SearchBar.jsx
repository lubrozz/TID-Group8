import { Search } from "lucide-react";
import "../../App.css";


export default function SearchBar() {
  return (
    <div className="search-bar">
      <Search
        size={20}
        color="#999999"
        strokeWidth={1.5}
        className="search-bar-icon"
      />
      <input
        type="text"
        placeholder="Search"
        className="search-bar-input"
      />
    </div>
  );
}