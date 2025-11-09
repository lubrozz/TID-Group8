import React, { useState } from 'react';
import '../../LoginPage.css'; 

export default function LoginInput({ placeholder, onChange }) {
  const [inputValue, setInputValue] = useState('');

  // to deal with the change of LoginInput component
  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange && onChange(e.target.value);  // if there is a onChange for parent component
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      className="login-input"  
    />
  );
}