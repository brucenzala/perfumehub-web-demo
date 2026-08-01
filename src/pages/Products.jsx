import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_URL = "https://perfumehub-api-ozvz.onrender.com/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: "2rem" }}>Loading products...</div>;
  if (error) return <div style={{ padding: "2rem", color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Our Perfumes</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
            <div style={{ height: "140px", background: "#f2f2f2", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
              No Image
            </div>
            <h3 style={{ margin: "0.75rem 0 0.25rem" }}>
              <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "#2E5C88" }}>
                {product.name}
              </Link>
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#666", minHeight: "40px" }}>{product.description}</p>
            <p style={{ fontWeight: "bold" }}>ZMW {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              style={{ width: "100%", padding: "0.5rem", background: "#2E5C88", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;