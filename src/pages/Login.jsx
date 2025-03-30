import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appConfig } from '../config/appConfig';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login === "test@test.com" && password === "test!com") {
      localStorage.setItem("authenticated", "true");
      navigate("/dashboard");
    } else {
      setError("These credentials do not match our records.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1d2127] text-white">
      <div className="bg-[#2f343f] p-8 w-[400px] rounded shadow">
        <img src={appConfig.logoUrl} alt={appConfig.appName} className="h-12 mb-4" />
        {error && <p className="text-red-400">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
