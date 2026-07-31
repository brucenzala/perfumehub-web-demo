import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "1.5rem", padding: "1rem 2rem", background: "#2E5C88" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>PerfumeHub</Link>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/products" style={{ color: "white", textDecoration: "none" }}>Products</Link>
      <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
    </nav>
  );
}

export default Navbar;