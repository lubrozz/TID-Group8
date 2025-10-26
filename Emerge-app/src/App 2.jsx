import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ChildChat from "./Pages/ChildChat";
import ProfChat from "./Pages/ProfChat";
import Home from "./Pages/home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ChildChat" element={<ChildChat />} />
          <Route path="/ProfChat" element={<ProfChat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
