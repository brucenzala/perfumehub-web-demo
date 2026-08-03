import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
const API_URL = "https://perfumehub-api-ozvz.onrender.com/api";
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const [filter, setFilter] = useState("All");
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

  function handleAddToCart(product) {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  }

  if (loading) return <div style={{ padding: "2rem" }}>Loading products...</div>;
  if (error) return <div style={{ padding: "2rem", color: "red" }}>Error: {error}</div>;

  const categories = ["All", "Men", "Women"];
  const filteredProducts = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Our Perfumes</h1>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              border: filter === cat ? "2px solid #2E5C88" : "1px solid #ccc",
              background: filter === cat ? "#2E5C88" : "transparent",
              color: filter === cat ? "white" : "var(--text-h)",
              cursor: "pointer",
              fontWeight: filter === cat ? "bold" : "normal",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "6px" }}
              />
            ) : (
              <div style={{ height: "140px", background: "#f2f2f2", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent:"center", color: "#999" }}>
                No Image
              </div>
            )}
            <h3 style={{ margin: "0.75rem 0 0.25rem" }}>
              <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "#2E5C88" }}>
                {product.name}
              </Link>
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text)", minHeight:"40px" }}>{product.description}</p>
            <p style={{ fontWeight: "bold", color: "var(--text-h)" }}>ZMW {product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              style={{ width: "100%", padding: "0.5rem", background: addedId === product.id ? "#2f9e44" : "#2E5C88", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              {addedId === product.id ? "Added to cart ✓" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p style={{ color: "var(--text)", marginTop: "1rem" }}>No products in this category yet.</p>
      )}
    </div>
  );
}
export default Products;
