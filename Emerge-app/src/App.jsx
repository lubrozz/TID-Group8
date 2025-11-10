import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import HomePage from "./Pages/HomePage";
import ProfChat from "./Pages/ProfChat";
import NewChildChat from "./Pages/NewChildChat";

function initializeParse() {
  Parse.initialize(
    "zMmQlW49bZ8poXbFzKOokRbWvlwJf2Jd9BYqjvTI",
    "LmonXzQwyZ5p5qp1TxiI3tVrRcg2PZ89ug9I5iai"
  );
  Parse.serverURL = "https://parseapi.back4app.com";
}

export default function App() {
  useEffect(() => {
    initializeParse();
  }, []);
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
