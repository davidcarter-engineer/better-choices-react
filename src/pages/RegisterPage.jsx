/*
  --- PAGE: RegisterPage ---
  Handles new user registration by collecting username, email,
  password, first name, last name, and phone number, then calling
  register from AuthContext which POSTs to /api/auth/register.
  On success, the user is automatically logged in (JWT stored, user state set).
*/

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Username, email, and password are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await register(username, email, password, firstName, lastName, phone);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <section className="container page-section">
      <h2>📝 Sign Up</h2>
      <p>Create a Better Choices account.</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reg-first">First Name</label>
          <input
            id="reg-first"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-last">Last Name</label>
          <input
            id="reg-last"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-username">Username *</label>
          <input
            id="reg-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-email">Email *</label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-phone">Phone Number</label>
          <input
            id="reg-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 555-5555"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-password">Password *</label>
          <input
            id="reg-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a password"
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn-save" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
