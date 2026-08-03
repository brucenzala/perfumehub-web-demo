import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
const API_URL = "https://perfumehub-api-ozvz.onrender.com/api";
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  useEffect(() => {
    fetch(`${API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (!product) return <div style={{ padding: "2rem" }}>Product not found.</div>;

  const outOfStock = product.stock <= 0;

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <div style={{ position: "relative" }}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
          />
        ) : (
          <div style={{ height: "250px", background: "#f2f2f2", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", marginBottom: "1rem" }}>
            No Image
          </div>
        )}
        {outOfStock && (
          <span style={{ position: "absolute", top: 8, left: 8, background: "#c0392b", color: "white", fontSize: "0.85rem", padding: "3px 10px", borderRadius: "4px" }}>
            Out of Stock
          </span>
        )}
      </div>
      <h1>{product.name}</h1>
      <p style={{ color: "#666" }}>{product.category}</p>
      <p>{product.description}</p>
      <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>ZMW {product.price}</p>
      <p style={{ color: outOfStock ? "#c0392b" : "#888" }}>
        {outOfStock ? "Currently out of stock" : `In stock: ${product.stock}`}
      </p>
      <button
        onClick={handleAddToCart}
        disabled={outOfStock}
        style={{ padding: "0.75rem 1.5rem", background: outOfStock ? "#aaa" : (added ? "#2f9e44" : "#2E5C88"), color: "white", border: "none", borderRadius: "4px", cursor: outOfStock ? "not-allowed" : "pointer", fontSize: "1rem" }}
      >
        {outOfStock ? "Out of Stock" : (added ? "Added to cart ✓" : "Add to Cart")}
      </button>
    </div>
  );
}
export default ProductDetail;