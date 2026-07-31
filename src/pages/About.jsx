function About() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>About This Project</h1>
      <p>PerfumeHub is a practice e-commerce platform. This dummy deployment demonstrates a full three-tier architecture:</p>
      <ul>
        <li>React frontend (Vercel)</li>
        <li>Laravel API backend (Render)</li>
        <li>TiDB Cloud database (MySQL-compatible)</li>
      </ul>
    </div>
  );
}

export default About;