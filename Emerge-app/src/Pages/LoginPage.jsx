import React, { useState } from 'react';
import LoginInput from '../Components/Shared/LoginInput';  
import LoginButton from '../Components/Shared/LoginButton';  
import '../../LoginPage.css';  



export default function LoginPage() {
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
        <h2>Login</h2>
        
        {/* Username Input Area */}
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <LoginInput
            placeholder="Enter your username"
            value={username}
            onChange={setUsername}
          />
        </div>

        {/* Password Input Area */}
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <LoginInput
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
          />
        </div>

        {/* LoginButton */}
        <LoginButton onClick={handleLogin} />

        {/* register-link */}
        <p className="register-link">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}