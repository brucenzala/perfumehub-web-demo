import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_URL = "https://perfumehub-api-ozvz.onrender.com/api";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (!product) return <div style={{ padding: "2rem" }}>Product not found.</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <div style={{ height: "250px", background: "#f2f2f2", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", marginBottom: "1rem" }}>
        No Image
      </div>
      <h1>{product.name}</h1>
      <p style={{ color: "#666" }}>{product.category}</p>
      <p>{product.description}</p>
      <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>ZMW {product.price}</p>
      <p style={{ color: "#888" }}>In stock: {product.stock}</p>
      <button
        onClick={() => addToCart(product)}
        style={{ padding: "0.75rem 1.5rem", background: "#2E5C88", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "1rem" }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;