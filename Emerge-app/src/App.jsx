import Parse from "parse/dist/parse.min.js";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProfChat from "./Pages/ProfChat";
import NewChildChat from "./Pages/NewChildChat";

export default function App() {
  Parse.initialize(
    "zMmQlW49bZ8poXbFzKOokRbWvlwJf2Jd9BYqjvTI",
    "LmonXzQwyZ5p5qp1TxiI3tVrRcg2PZ89ug9I5iai"
  );

  Parse.serverURL = "http://YOUR_PARSE_SERVER:1337/parse"; //migration to happen soon.
  return (
    <>
      <script
        type="text/javascript"
        src="https://unpkg.com/parse/dist/parse.min.js"
      ></script>
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
