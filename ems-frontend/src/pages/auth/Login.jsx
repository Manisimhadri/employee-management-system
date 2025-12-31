import { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import loginBg from "../../assets/login-background.png"
import logo from "../../assets/login-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await api.post("/auth/login", { email, password });

    const { token, role } = res.data;
    login(token, role);

    if (role === "ADMIN") navigate("/admin/dashboard");
    else navigate("/employee/personal-details");
  } catch (err) {
    console.error("Login failed", err);
    alert("Invalid email or password"); // optional: replace later with UI error
  } finally {
    setLoading(false);
  }
};


  return (
  <div
    className="login-page"
    style={{ backgroundImage: `url(${loginBg})` }}
  >
    <div className="login-overlay"></div>

    <div className="login-card">
      {/* LOGO */}
      <img src={logo} alt="EMS Logo" className="login-logo" />

      <h2 className="login-title">LOGIN</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD FIELD WITH TOGGLE */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" disabled={loading}>
  {loading ? <span className="spinner"></span> : "Login"}
</button>

      </form>
    </div>
  </div>
);


}