import React from 'react';
import '../../LoginPage.css'; 


export default function RegisterButton({ onClick }) {
  return (
    <button 
      className="Register-button"  
      onClick={onClick}        
    >
      Register
    </button>
  );
}