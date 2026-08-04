import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://perfumehub-api-ozvz.onrender.com/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setToken(data.demo_token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (token) {
    return (
      <div style={{ maxWidth: 450, margin: "40px auto", padding: 20 }}>
        <h2>Reset Token Generated</h2>
        <p style={{ color: "var(--text)", fontSize: "0.9rem" }}>
          This is a demo project without an email service connected, so instead
          of emailing you a reset link, here is your reset token directly.
          In a production app this would be sent to your inbox.
        </p>
        <div style={{ background: "var(--code-bg)", padding: "0.75rem", borderRadius: "6px", wordBreak: "break-all", fontFamily: "monospace", fontSize: "0.85rem", margin: "1rem 0" }}>
          {token}
        </div>
        <button
          onClick={() => navigate("/reset-password", { state: { email, token } })}
          style={{ width: "100%", padding: 10, background: "#2E5C88", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Continue to Reset Password
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <h2>Forgot Password</h2>
      <p style={{ color: "var(--text)", fontSize: "0.9rem" }}>
        Enter your email and we will generate a reset token.
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10, background: "#2E5C88", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {loading ? "Sending..." : "Get Reset Token"}
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        <Link to="/login">Back to login</Link>
      </p>
    </div>
  );
}