import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <nav style={{ display: "flex", gap: "1.5rem", padding: "1rem 2rem", background: "#2E5C88", alignItems: "center" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>PerfumeHub</Link>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/products" style={{ color: "white", textDecoration: "none" }}>Products</Link>
      <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
      {isAuthenticated && (
        <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>My Orders</Link>
      )}
      <Link to="/cart" style={{ color: "white", textDecoration: "none", marginLeft: "auto" }}>
        Cart ({itemCount})
      </Link>
      {isAuthenticated ? (
        <>
          <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
            Hi, {user?.name || "..."}
          </Link>
          <button
            onClick={handleLogout}
            style={{ background: "none", border: "1px solid white", color: "white", padding: "4px 10px", cursor: "pointer" }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
          <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;