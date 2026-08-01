import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav style={{ display: "flex", gap: "1.5rem", padding: "1rem 2rem", background: "#2E5C88", alignItems: "center" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>PerfumeHub</Link>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/products" style={{ color: "white", textDecoration: "none" }}>Products</Link>
      <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
      <Link to="/cart" style={{ color: "white", textDecoration: "none", marginLeft: "auto" }}>
        Cart ({itemCount})
      </Link>
    </nav>
  );
}

export default Navbar;