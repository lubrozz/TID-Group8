import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import HomePage from "./Pages/HomePage";
import ProfChat from "./Pages/ProfChat";
import NewChildChat from "./Pages/NewChildChat";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ProfChat" element={<ProfChat />} />
          <Route path="/NewChildChat" element={<NewChildChat />} />
        </Routes>
      </Router>
    </>
  );
}
