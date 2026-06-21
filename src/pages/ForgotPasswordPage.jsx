import { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5001";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !newPassword) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Reset failed");
      setSuccess(data.message);
      setEmail("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <section className="container page-section">
      <h2>🔑 Forgot Password</h2>
      <p>Enter your email and a new password to reset your account.</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fp-email">Email</label>
          <input
            id="fp-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fp-password">New Password</label>
          <input
            id="fp-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Choose a new password"
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
        <button type="submit" className="btn-save" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      <p className="auth-switch">
        <Link to="/login">← Back to Login</Link>
      </p>
    </section>
  );
}

export default ForgotPasswordPage;
