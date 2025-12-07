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
import Parse from "parse";

export default function App() {
  // Restore Anon user on page reload, but not after page closure.
  useEffect(() => {
    const restoreUser = async () => {
      // 1. Restore professional users first
      const profToken = sessionStorage.getItem("profSessionToken");
      // 2. If no professional users exist, check for anonymous users
      const anonToken = sessionStorage.getItem("anonUserSessionToken");

      const tokenToUse = profToken || anonToken;
      if (!tokenToUse) return;

      try {
        // If the current user is already present in memory, no need to perform the become operation
        if (!Parse.User.current()) {
          await Parse.User.become(tokenToUse);
        }
        console.log("Restored user from session:", Parse.User.current());
      } catch (err) {
        console.error("Failed to restore user from session:", err);
        // If the token has expired, clear it to avoid persistent errors
        if (profToken) sessionStorage.removeItem("profSessionToken");
        if (anonToken) sessionStorage.removeItem("anonUserSessionToken");
      }
    };
    restoreUser();
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
