import React from "react";

function Hero() {
  return (
    <section
      style={{
        padding: "20px 20px",
        backgroundColor: "#fff3e0",
        textAlign: "center",
        color: "#5d4037",
        fontFamily: "'Segoe UI', sans-serif",
        borderRadius: "12px",
        margin: "20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        Welcome to <span style={{ color: "#fd5d00ae" }}>Diary Delights 🧁</span>
      </h1>
      <p style={{ fontSize: "1.2rem" }}>
        Homemade sweetness and comfort, delivered right to your heart ❤️
      </p>
    </section>
  );
}

export default Hero;
