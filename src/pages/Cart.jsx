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
            <p style={{ margin: 0, color: "#666" }}>ZMW {item.price} each</p>
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
    </div>
  );
}

export default Cart;