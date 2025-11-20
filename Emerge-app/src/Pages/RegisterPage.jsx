import React, { useState } from "react";
import LoginInput from "../Components/LoginPage/LoginInput";
import "../styles/RegisterPage.css";
import Parse from "parse"; // <-- Important
import { useNavigate } from "react-router-dom";
import Button from "../Components/Shared/button";

export default function Register() {
  const [username, setUsername] = useState(""); // store username input
  const [password, setPassword] = useState(""); // store password input
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    try {
      setLoading(true);

      const user = new Parse.User();
      user.set("username", username);
      user.set("password", password);

      await user.signUp(); // Create user in DB

      console.log("User registered:", user);

      // Redirect user back to login
      navigate("/login");
    } catch (e) {
      console.error("Registration error:", e);
      setError(e?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <h2>Register</h2>

        {error && <div className="error-message">{error}</div>}

        {/* Username Input Area */}

        <div className="input-group">
          <label>Username:</label>
          <LoginInput
            placeholder="Enter your new username"
            value={username}
            onChange={setUsername}
            type="text"
          />
        </div>

        {/* Password Input Area */}

        <div className="input-group">
          <label>Password:</label>
          <LoginInput
            placeholder="Enter your new password"
            value={password}
            onChange={setPassword}
            type="password"
          />
        </div>

        {/* LoginButton */}
        <Button
          styleName={"Register-button"}
          onClick={handleRegister}
          loading={loading}
          buttonText={"Register"}
        />
      </div>
    </div>
  );
}
