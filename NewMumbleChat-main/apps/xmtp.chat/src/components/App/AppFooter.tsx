import React from "react";

export const AppFooter: React.FC = () => {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
        padding: "12px 20px",
        borderTop: "1px solid #000",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "Inter, sans-serif",
        fontSize: "0.9rem",
      }}
    >
      {/* Left Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span>Built with</span>
        <a
          href="https://xmtp.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#000",
            textDecoration: "underline",
            fontWeight: 600,
          }}
        >
          XMTP
        </a>
      </div>

      {/* Right Side */}
      <span
        style={{
          fontSize: "0.85rem",
          color: "#000",
        }}
      >
        © 2025 MumbleChat – Secure Messaging
      </span>
    </footer>
  );
};
