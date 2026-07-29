import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://perfumehub-api-ozvz.onrender.com/api";

function App() {
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
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>PerfumeHub Demo</h1>
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

export default App;