import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProfChat from "./Pages/ProfChat";
import ChildChat from "./Pages/ChildChat";
// import ChildChat from "./Pages/ChildChat";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProfChat" element={<ProfChat />} />
        <Route path="/ChildChat" element={<ChildChat />} />
      </Routes>
    </Router>
  );
}
