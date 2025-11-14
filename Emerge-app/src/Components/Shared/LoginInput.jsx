import '../../LoginPage.css'; 


export default function LoginInput({ placeholder, onChange, value, type = 'text' }) {
  return (
    <input
      type={type} // this is for hiding the password 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      className="login-input"  
    />
  );
}

