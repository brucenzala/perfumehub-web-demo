import { useState, useEffect } from "react";

const API_URL = "https://perfumehub-api-ozvz.onrender.com/api";

function Products() {
  const [status, setStatus] = useState("Checking API...");
  const [appName, setAppName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setAppName(data.application);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Products</h1>
      <p>Live connection test to backend:</p>
      <p>API URL: {API_URL}</p>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <div>
          <p>Status: <strong>{status}</strong></p>
          <p>Application: <strong>{appName}</strong></p>
        </div>
      )}
    </div>
  );
}

export default Products;