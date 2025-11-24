import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProfChat from "./Pages/ProfChat";
import LoginPage from "./Pages/LoginPage";
import NewChildChat from "./Pages/NewChildChat";
import Register from "./Pages/RegisterPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prof-chat" element={<ProfChat />} />
        <Route path="/prof-login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-child-chat" element={<NewChildChat />} />
        <Route path="/chat/:chatRoomId" element={<NewChildChat />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
