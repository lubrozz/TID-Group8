import React, { useState } from 'react';
import LoginInput from '../Components/Shared/LoginInput';  
import RegisterButton from '../Components/Shared/RegisterButton';
import NavigateButton from "../Components/Shared/NavigateButton";
import "../LoginPage.css";  



export default function Register() {
  const [username, setUsername] = useState('');  // store username input
  const [password, setPassword] = useState('');  // store password input

  const handleLogin = () => {
    // the login logic
    if (username && password) {
      console.log('Logged in with', username, password);
    } else {
      console.log('Please enter both username and password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Register</h2>
        
        {/* Username Input Area */}
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <LoginInput
            placeholder="Enter your new username"
            value={username}
            onChange={setUsername}
          />
        </div>

        {/* Password Input Area */}
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <LoginInput
            placeholder="Enter your new password"
            value={password}
            onChange={setPassword}
          />
        </div>

        {/* LoginButton */}
  
        <RegisterButton onClick={handleLogin} />

       
      </div>
    </div>
  );
}