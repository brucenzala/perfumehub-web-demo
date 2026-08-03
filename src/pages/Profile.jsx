import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Please log in to view your profile</h2>
        <Link to="/login" style={{ color: "#2E5C88", fontWeight: "bold" }}>
          Login
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 500, margin: "0 auto" }}>
      <h1>My Profile</h1>
      <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1.5rem", marginTop: "1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", color: "var(--text)", fontSize: "0.85rem" }}>Name</label>
          <p style={{ fontSize: "1.1rem", margin: "0.25rem 0" }}>{user?.name}</p>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", color: "var(--text)", fontSize: "0.85rem" }}>Email</label>
          <p style={{ fontSize: "1.1rem", margin: "0.25rem 0" }}>{user?.email}</p>
        </div>
        <div>
          <label style={{ display: "block", color: "var(--text)", fontSize: "0.85rem" }}>Member Since</label>
          <p style={{ fontSize: "1.1rem", margin: "0.25rem 0" }}>
            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}
          </p>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/orders" style={{ color: "#2E5C88", fontWeight: "bold" }}>
          View my orders →
        </Link>
      </div>
    </div>
  );
}