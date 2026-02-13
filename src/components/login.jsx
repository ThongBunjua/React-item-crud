import { useRef } from "react";
import { useUser } from "../contexts/UserProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await login(emailRef.current.value, passRef.current.value);
    if (success) {
      alert("Login Success!");
      navigate("/profile"); 
    } else {
      alert("Login Failed: Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto", padding: "20px" }}>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input ref={emailRef} type="text" style={{ width: "100%", marginBottom: "10px" }} />
      </div>
      <div>
        <label>Password:</label>
        <input ref={passRef} type="password" style={{ width: "100%", marginBottom: "10px" }} />
      </div>
      <button onClick={handleLogin} style={{ width: "100%", padding: "5px" }}>Login</button>
    </div>
  );
}