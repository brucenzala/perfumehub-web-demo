import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://perfumehub-api-ozvz.onrender.com/api";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Please log in to checkout</h2>
        <p>
          <Link to="/login" style={{ color: "#2E5C88", fontWeight: "bold" }}>
            Login
          </Link>{" "}
          or{" "}
          <Link to="/register" style={{ color: "#2E5C88", fontWeight: "bold" }}>
            Register
          </Link>{" "}
          to continue.
        </p>
      </div>
    );
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <Link to="/products" style={{ color: "#2E5C88", fontWeight: "bold" }}>
          Browse products →
        </Link>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shipping_name: shippingName,
          shipping_address: shippingAddress,
          shipping_phone: shippingPhone,
          items: cart.map((item) => ({
            product_id: item.id,
            quantity: item.qty,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to place order");
      setOrderPlaced(data.order);
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (orderPlaced) {
    return (
      <div style={{ padding: "2rem", maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ color: "#2f9e44" }}>Order Placed! ✓</h2>
        <p>Order #{orderPlaced.id} — Total: ZMW {orderPlaced.total}</p>
        <p style={{ color: "var(--text)" }}>
          We'll deliver to {orderPlaced.shipping_address}.
        </p>
        <Link to="/products" style={{ color: "#2E5C88", fontWeight: "bold" }}>
          Continue shopping →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 500, margin: "0 auto" }}>
      <h2>Checkout</h2>

      <div style={{ marginBottom: "1.5rem", border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
        {cart.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span>{item.name} × {item.qty}</span>
            <span>ZMW {(parseFloat(item.price) * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
          <span>Total</span>
          <span>ZMW {total.toFixed(2)}</span>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Full Name</label>
          <input
            type="text"
            value={shippingName}
            onChange={(e) => setShippingName(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Delivery Address</label>
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Phone Number</label>
          <input
            type="tel"
            value={shippingPhone}
            onChange={(e) => setShippingPhone(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10, background: "#2E5C88", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {loading ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}