import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_URL = "https://perfumehub-api-ozvz.onrender.com/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 3));
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

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg, #2E5C88, #4A7FB5)",
          color: "white",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>PerfumeHub</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
          Discover signature scents crafted for every moment.
        </p>
        <Link
          to="/products"
          style={{
            background: "white",
            color: "#2E5C88",
            padding: "0.75rem 2rem",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Shop All Perfumes
        </Link>
      </div>

      <div style={{ padding: "2rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Featured Fragrances</h2>

        {error && <p style={{ color: "red" }}>Couldn't load products: {error}</p>}

        {loading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
                <div className="skeleton" style={{ height: "160px", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ height: "18px", width: "70%", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ height: "14px", width: "100%", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ height: "36px", width: "100%" }} />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {products.map((product) => {
              const outOfStock = product.stock <= 0;
              return (
                <div
                  key={product.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    opacity: outOfStock ? 0.6 : 1,
                  }}
                >
                  <Link
                    to={`/products/${product.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ position: "relative" }}>
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px", marginBottom: "0.5rem" }}
                        />
                      ) : (
                        <div style={{ height: "160px", background: "#f2f2f2", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", marginBottom: "0.5rem" }}>
                          No Image
                        </div>
                      )}
                      {outOfStock && (
                        <span style={{ position: "absolute", top: 8, left: 8, background: "#c0392b", color: "white", fontSize: "0.75rem", padding: "2px 8px", borderRadius: "4px" }}>
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: "0 0 0.5rem" }}>{product.name}</h3>
                    <p style={{ color: "var(--text)", fontSize: "0.9rem", flexGrow: 1 }}>
                      {product.description}
                    </p>
                    <p style={{ fontWeight: "bold", margin: "0.5rem 0" }}>
                      ZMW {product.price}
                    </p>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={outOfStock}
                    style={{
                      background: outOfStock ? "#aaa" : (addedId === product.id ? "#2f9e44" : "#2E5C88"),
                      color: "white",
                      border: "none",
                      padding: "0.5rem",
                      borderRadius: "4px",
                      cursor: outOfStock ? "not-allowed" : "pointer",
                    }}
                  >
                    {outOfStock ? "Out of Stock" : (addedId === product.id ? "Added to cart check" : "Add to Cart")}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link to="/products" style={{ color: "#2E5C88", fontWeight: "bold" }}>
            View all products
          </Link>
        </div>
      </div>

      <div style={{ background: "#f5f5f5", padding: "2rem", textAlign: "center" }}>
        <h2>About PerfumeHub</h2>
        <p style={{ maxWidth: 600, margin: "0.5rem auto 1rem" }}>
          We bring premium, long-lasting fragrances to Zambia, sourced for
          quality and crafted to make every day memorable.
        </p>
        <Link to="/about" style={{ color: "#2E5C88", fontWeight: "bold" }}>
          Learn more about us
        </Link>
      </div>
    </div>
  );
}

export default Home;