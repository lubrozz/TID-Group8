import '../../LoginPage.css'; 


export default function LoginButton({ onClick }) {
  return (
    <button 
      className="login-button"  
      onClick={onClick}        
    >
      Log in
    </button>
  );
}