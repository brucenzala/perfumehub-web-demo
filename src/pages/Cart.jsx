import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();

  if (cart.length === 0) {
    return <div style={{ padding: "2rem" }}><h1>Your Cart</h1><p>Your cart is empty.</p></div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee", padding: "0.75rem 0" }}>
          <div>
            <strong>{item.name}</strong>
            <p style={{ margin: 0, color: "var(--text)" }}>ZMW {item.price} each</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
            <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: "1rem", color: "red" }}>Remove</button>
          </div>
        </div>
      ))}
      <h2 style={{ textAlign: "right", marginTop: "1.5rem" }}>Total: ZMW {total.toFixed(2)}</h2>
      <div style={{ textAlign: "right" }}>
        <Link
          to="/checkout"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            padding: "0.75rem 2rem",
            background: "#2E5C88",
            color: "white",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;