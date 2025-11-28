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
import { useEffect } from "react";
import { Parse } from "parse";

export default function App() {
  // Restore Anon user on page reload, but not after page closure.
  useEffect(() => {
    const restoreAnonUser = async () => {
      const token = sessionStorage.getItem("anonUserSessionToken");
      if (token) {
        try {
          await Parse.User.become(token);
          console.log("Restored anon user:", Parse.User.current());
        } catch (err) {
          console.error("Failed to restore anon user:", err);
        }
      }
    };
    restoreAnonUser();
  }, []);

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
