import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ background: "#1c3a52", color: "white", padding: "2rem", marginTop: "auto" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1.5rem" }}>
        <div>
          <h3 style={{ margin: "0 0 0.5rem" }}>PerfumeHub</h3>
          <p style={{ color: "#cbd5e1", fontSize: "0.9rem", maxWidth: 250 }}>
            Premium, long-lasting fragrances delivered across Zambia.
          </p>
        </div>

        <div>
          <h4 style={{ margin: "0 0 0.5rem" }}>Shop</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <Link to="/products" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "0.9rem" }}>All Perfumes</Link>
            <Link to="/about" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "0.9rem" }}>About Us</Link>
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 0.5rem" }}>Account</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <Link to="/orders" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "0.9rem" }}>My Orders</Link>
            <Link to="/profile" style={{ color: "#cbd5e1", textDecoration: "none", fontSize: "0.9rem" }}>My Profile</Link>
          </div>
        </div>

        <div>
          <h4 style={{ margin: "0 0 0.5rem" }}>Contact Us</h4>
          <p style={{ color: "#cbd5e1", fontSize: "0.9rem", margin: "0 0 0.3rem" }}>Lusaka, Zambia</p>
          <p style={{ color: "#cbd5e1", fontSize: "0.9rem", margin: "0 0 0.3rem" }}>+260 977 123 456</p>
          <p style={{ color: "#cbd5e1", fontSize: "0.9rem", margin: "0 0 0.3rem" }}>support@perfumehub.zm</p>
          <p style={{ color: "#cbd5e1", fontSize: "0.9rem", margin: 0 }}>Mon - Sat, 8:00 - 18:00</p>
        </div>
      </div>

      <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.8rem", marginTop: "1.5rem" }}>
        (c) {new Date().getFullYear()} PerfumeHub. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;