import '../../LoginPage.css'; 


export default function Input({ placeholder, onChange, value, type = 'text' }) {
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

