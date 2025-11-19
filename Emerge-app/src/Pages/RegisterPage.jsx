import React, { useState } from 'react';
import Input from '../Components/Shared/Input';  
import RegisterButton from '../Components/Shared/RegisterButton';
import "../RegisterPage.css";  
import Parse from "parse"; // <-- Important
import { useNavigate } from "react-router-dom";



export default function Register() {
  const [fullname, setFullname] = useState('');  // store Fullname input
  const [username, setUsername] = useState('');  // store username input
  const [role, setRole] = useState('');  // store FullName input
  const [password, setPassword] = useState('');  // store password input
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const navigate = useNavigate();


  const handleRegister = async () => {
    setError("");

    try {
      setLoading(true);
      const user = new Parse.User();
      user.set("fullName", fullname);
      user.set("username", username);
      user.set("password", password);
      user.set("subRoleLabel", role);

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

  const roles = [
    "Psychologist",
    "Social worker",
    "Volunteer"
  ];




  return (
    <div className="register-page">
      <div className="register-form">
        <h2>Register</h2>

        {error && <div className="error-message">{error}</div>}
        
        {/* Full Name Input Area */}

        <div className="input-group">
          <label>Full name:</label>
          <Input
            placeholder="Enter your full name"
            value={fullname}
            onChange={setFullname}
            type="text"
          />
        </div>

         {/* Username Input Area */}
      
        <div className="input-group">
          <label>Username:</label>
          <Input
            placeholder="Enter your new username"
            value={username}
            onChange={setUsername}
            type="text"
          />
        </div>

        {/* Password Input Area */}
     
        <div className="input-group">
          <label>Password:</label>
          <Input
            placeholder="Enter your new password"
            value={password}
            onChange={setPassword}
            type="password"
          />
        </div>

      {/* Role Input Area */}

      <div className="input-group">
  <label>Professional Role:</label>
  <select
    className="register-select"
    value={role}
    onChange={(e) => setRole(e.target.value)}
>
    <option value="">Select your role...</option>
    {roles.map((r) => (
      <option key={r} value={r}>
        {r}
      </option>
    ))}
  </select>
</div>

        {/* LoginButton */}
  
        <RegisterButton onClick={handleRegister} loading={loading} />

       
      </div>
    </div>
  );
}
