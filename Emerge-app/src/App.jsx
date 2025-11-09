import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProfChat from "./Pages/ProfChat";
import NewChildChat from "./Pages/NewChildChat";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prof-chat" element={<ProfChat />} />
        <Route path="/new-child-chat" element={<NewChildChat />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
