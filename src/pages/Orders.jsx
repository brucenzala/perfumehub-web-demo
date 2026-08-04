import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://perfumehub-api-ozvz.onrender.com/api";

export default function Orders() {
  const { token, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Please log in to view your orders</h2>
        <Link to="/login" style={{ color: "#2E5C88", fontWeight: "bold" }}>
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: "2rem", maxWidth: 700, margin: "0 auto" }}>
        <h1>Your Orders</h1>
        {[1, 2].map((i) => (
          <div key={i} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
            <div className="skeleton" style={{ height: "18px", width: "40%", marginBottom: "0.75rem" }} />
            <div className="skeleton" style={{ height: "14px", width: "70%", marginBottom: "0.75rem" }} />
            <div className="skeleton" style={{ height: "14px", width: "100%", marginBottom: "0.5rem" }} />
            <div className="skeleton" style={{ height: "14px", width: "50%" }} />
          </div>
        ))}
      </div>
    );
  }
  if (error) return <div style={{ padding: "2rem", color: "red" }}>Error: {error}</div>;

  if (orders.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>No orders yet</h2>
        <Link to="/products" style={{ color: "#2E5C88", fontWeight: "bold" }}>
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 700, margin: "0 auto" }}>
      <h1>Your Orders</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <strong>Order #{order.id}</strong>
            <span
              style={{
                textTransform: "capitalize",
                padding: "0.2rem 0.6rem",
                borderRadius: "12px",
                fontSize: "0.8rem",
                background: order.status === "pending" ? "#fff3cd" : "#d4edda",
                color: order.status === "pending" ? "#856404" : "#155724",
              }}
            >
              {order.status}
            </span>
          </div>
          <p style={{ color: "var(--text)", fontSize: "0.9rem", margin: "0.25rem 0" }}>
            {new Date(order.created_at).toLocaleDateString()} - Delivering to {order.shipping_address}
          </p>
          <div style={{ marginTop: "0.5rem" }}>
            {order.items.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                <span>{item.product_name} x {item.quantity}</span>
                <span>ZMW {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginTop: "0.5rem", borderTop: "1px solid #eee", paddingTop: "0.5rem" }}>
            <span>Total</span>
            <span>ZMW {order.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
}