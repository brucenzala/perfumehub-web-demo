import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  async function handleLogout() {
    await logout();
    setMenuOpen(false);
    navigate("/");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const linkStyle = { color: "white", textDecoration: "none", padding: "0.5rem 0" };

  return (
    <nav style={{ background: "#2E5C88" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem" }}>
        <Link to="/" onClick={closeMenu} style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "1.1rem" }}>
          PerfumeHub
        </Link>

        {/* Desktop links */}
        <div className="navbar-desktop-links" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/products" style={linkStyle}>Products</Link>
          <Link to="/about" style={linkStyle}>About</Link>
          {isAuthenticated && <Link to="/orders" style={linkStyle}>My Orders</Link>}
          <Link to="/cart" style={linkStyle}>Cart ({itemCount})</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" style={linkStyle}>Hi, {user?.name || "..."}</Link>
              <button
                onClick={handleLogout}
                style={{ background: "none", border: "1px solid white", color: "white", padding: "4px 10px", cursor: "pointer", borderRadius: "4px" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/register" style={linkStyle}>Register</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "0.25rem 0.5rem",
          }}
        >
          {menuOpen ? "\u2715" : "\u2630"}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu" style={{ display: "none", flexDirection: "column", padding: "0 1.5rem 1rem", gap: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.2)" }}>
          <Link to="/" onClick={closeMenu} style={linkStyle}>Home</Link>
          <Link to="/products" onClick={closeMenu} style={linkStyle}>Products</Link>
          <Link to="/about" onClick={closeMenu} style={linkStyle}>About</Link>
          {isAuthenticated && <Link to="/orders" onClick={closeMenu} style={linkStyle}>My Orders</Link>}
          <Link to="/cart" onClick={closeMenu} style={linkStyle}>Cart ({itemCount})</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={closeMenu} style={linkStyle}>Hi, {user?.name || "..."}</Link>
              <button
                onClick={handleLogout}
                style={{ background: "none", border: "1px solid white", color: "white", padding: "8px", cursor: "pointer", borderRadius: "4px", width: "100%" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} style={linkStyle}>Login</Link>
              <Link to="/register" onClick={closeMenu} style={linkStyle}>Register</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .navbar-desktop-links {
            display: none !important;
          }
          .navbar-hamburger {
            display: block !important;
          }
          .navbar-mobile-menu {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;