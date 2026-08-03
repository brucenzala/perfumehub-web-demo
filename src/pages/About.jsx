function About() {
  return (
    <div>
      <div
        style={{
          background: "linear-gradient(135deg, #2E5C88, #4A7FB5)",
          color: "white",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "white" }}>Our Story</h1>
        <p style={{ fontSize: "1.1rem", maxWidth: 600, margin: "0 auto", color: "white" }}>
          Crafting signature scents for every moment, right here in Zambia.
        </p>
      </div>

      <div style={{ padding: "2rem", maxWidth: 700, margin: "0 auto", textAlign: "left" }}>
        <h2>Who We Are</h2>
        <p style={{ color: "var(--text)", lineHeight: 1.6 }}>
          PerfumeHub was founded on a simple idea: everyone deserves a
          fragrance that feels like their own. We curate a collection of
          premium, long-lasting perfumes for men and women, blending warm
          woods, fresh citrus, and floral notes into scents made for
          everyday life and special occasions alike.
        </p>

        <h2 style={{ marginTop: "2rem" }}>What We Offer</h2>
        <ul style={{ color: "var(--text)", lineHeight: 1.8 }}>
          <li>Curated fragrances for men and women</li>
          <li>Fast, reliable delivery across Zambia</li>
          <li>Honest pricing with no hidden costs</li>
          <li>A simple, secure shopping experience from browse to checkout</li>
        </ul>

        <h2 style={{ marginTop: "2rem" }}>Our Promise</h2>
        <p style={{ color: "var(--text)", lineHeight: 1.6 }}>
          Every bottle we sell is chosen for quality and character. Whether
          you're looking for something bold and smoky or light and fresh,
          we're here to help you find a scent that feels unmistakably you.
        </p>
      </div>
    </div>
  );
}

export default About;
