import React, { useState } from 'react';
import LoginInput from '../Components/Shared/LoginInput';  
import LoginButton from '../Components/Shared/LoginButton';  
import '../LoginPage.css' 
import { useNavigate } from 'react-router-dom';     // this is for navigation
import Parse from 'parse/dist/parse.min.js';        // use Parse to log in



export default function LoginPage() {
  const [username, setUsername] = useState('');  // store username input
  const [password, setPassword] = useState('');  // store password input
  const [loading, setLoading]   = useState(false); // for loading 
  const [error, setError]       = useState(''); // for error notification
  const navigate = useNavigate();

  // the login logic
  const handleLogin = async() => {
    setError('');
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      setLoading(true);
      // call Parse's login（username/password）
      const user = await Parse.User.logIn(username, password);

      // when succeed in login，we can get the info of user
      console.log('Logged in:', user?.get('username'));

      // Redirect to our target page (adjust based on our source URL)
      navigate('/ProfChat'); 
    } catch (e) {
      // show error information when login fails
      // common mistakes：101 = Invalid username/password.
      console.error(e);
      setError(e?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Username Input Area */}
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <LoginInput
            placeholder="Enter your username"
            value={username}
            onChange={setUsername}
            type="text"
          />
        </div>

        {/* Password Input Area */}
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <LoginInput
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            type="password"
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