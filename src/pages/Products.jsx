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
  const [search, setSearch] = useState("");
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
  const categoryFiltered = filter === "All" ? products : products.filter((p) => p.category === filter);
  const filteredProducts = search.trim() === ""
    ? categoryFiltered
    : categoryFiltered.filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Our Perfumes</h1>

      <input
        type="text"
        placeholder="Search perfumes by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", maxWidth: "400px", padding: "0.6rem 1rem", borderRadius: "20px", border: "1px solid #ccc", marginBottom: "1rem", display: "block" }}
      />

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
        {filteredProducts.map((product) => {
          const outOfStock = product.stock <= 0;
          return (
            <div key={product.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem", opacity: outOfStock ? 0.6 : 1 }}>
              <div style={{ position: "relative" }}>
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
                {outOfStock && (
                  <span style={{ position: "absolute", top: 8, left: 8, background: "#c0392b", color: "white", fontSize: "0.75rem", padding: "2px 8px", borderRadius: "4px" }}>
                    Out of Stock
                  </span>
                )}
              </div>
              <h3 style={{ margin: "0.75rem 0 0.25rem" }}>
                <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "#2E5C88" }}>
                  {product.name}
                </Link>
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text)", minHeight:"40px" }}>{product.description}</p>
              <p style={{ fontWeight: "bold", color: "var(--text-h)" }}>ZMW {product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={outOfStock}
                style={{ width: "100%", padding: "0.5rem", background: outOfStock ? "#aaa" : (addedId === product.id ? "#2f9e44" : "#2E5C88"), color: "white", border: "none", borderRadius: "4px", cursor: outOfStock ? "not-allowed" : "pointer" }}
              >
                {outOfStock ? "Out of Stock" : (addedId === product.id ? "Added to cart check" : "Add to Cart")}
              </button>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <p style={{ color: "var(--text)", marginTop: "1rem" }}>No products match your search.</p>
      )}
    </div>
  );
}
export default Products;