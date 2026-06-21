/*
  --- PAGE: LoginPage ---
  Handles user login by collecting email and password,
  then calling the login function from AuthContext which
  POSTs to /api/auth/login and stores the returned JWT.
*/

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <section className="container page-section">
      <h2>🔐 Login</h2>
      <p>Sign in to your Better Choices account.</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn-save" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="auth-switch">
        Don't have an account? <Link to="/register">Sign Up</Link> | <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </section>
  );
}

export default LoginPage;
