import React, { useEffect, useState } from "react";
import type { Client } from "@xmtp/browser-sdk";
import { useNavigate } from "react-router";
import type { ContentTypes } from "@/contexts/XMTPContext";
import { shortAddress } from "@/helpers/strings";
import { useSettings } from "@/hooks/useSettings";
import { AppMenu } from "@/components/App/AppMenu";

const GlowingCircle = () => (
  <div
    style={{
      width: "6px",
      height: "6px",
      backgroundColor: "#000",
      borderRadius: "50%",
    }}
  ></div>
);

export type AppHeaderProps = {
  client: Client<ContentTypes>;
  opened?: boolean;
  toggle?: () => void;
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  client,
  opened,
  toggle,
}) => {
  const navigate = useNavigate();
  const { environment } = useSettings();
  const [accountIdentifier, setAccountIdentifier] = useState<string | null>(
    null
  );

  useEffect(() => {
    setAccountIdentifier(
      client.accountIdentifier?.identifier.toLowerCase() ?? null
    );
  }, [client.accountIdentifier]);

  const handleClick = () => {
    void navigate("identity");
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%",
        backgroundColor: "#fff",
        borderBottom: "1px solid #000",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        fontFamily: "Inter, sans-serif",
        color: "#000",
        flexWrap: "wrap",
        minHeight: "60px",
      }}
      className="app-header"
    >
      {/* LEFT SIDE: Burger + Logo + Text */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        {/* Burger button */}
        <button
          onClick={toggle}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "inline-flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className="burger-button"
        >
          <div
            style={{
              width: "20px",
              height: "2px",
              backgroundColor: "#000",
              margin: "3px 0",
              transition: "0.3s",
              transform: opened
                ? "rotate(45deg) translate(4px, 4px)"
                : "none",
            }}
          />
          <div
            style={{
              width: "20px",
              height: "2px",
              backgroundColor: "#000",
              margin: "3px 0",
              opacity: opened ? 0 : 1,
              transition: "0.3s",
            }}
          />
          <div
            style={{
              width: "20px",
              height: "2px",
              backgroundColor: "#000",
              margin: "3px 0",
              transition: "0.3s",
              transform: opened
                ? "rotate(-45deg) translate(4px, -4px)"
                : "none",
            }}
          />
        </button>

        {/* Logo + Text */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              backgroundColor: "#000",
              color: "#fff",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.9rem",
              flexShrink: 0,
            }}
          >
            MC
          </div>
          <div style={{ lineHeight: "1.2" }}>
            <span
              style={{ fontWeight: 700, fontSize: "1rem", color: "#000" }}
            >
              MumbleChat
            </span>
            <br />
            <span style={{ fontSize: "0.75rem", color: "#444" }}>
              Ramestta messaging
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="header-right"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        {/* Environment (hidden on small devices) */}
        <div
          className="env-box"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#f2f2f2",
            padding: "4px 10px",
            borderRadius: "12px",
            border: "1px solid #000",
            fontSize: "0.75rem",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          <GlowingCircle />
          <span>{environment}</span>
        </div>

        {/* Account (hidden on small devices) */}
        <div
          className="account-box"
          tabIndex={0}
          role="button"
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick();
          }}
          style={{
            cursor: "pointer",
            border: "1px solid #000",
            padding: "4px 10px",
            borderRadius: "8px",
            fontSize: "0.8rem",
            fontWeight: 600,
            backgroundColor: "#fff",
            flexShrink: 0,
          }}
        >
          {accountIdentifier ? shortAddress(accountIdentifier) : "..."}
        </div>

        {/* Menu — always visible */}
        <div className="menu-box">
          <AppMenu />
        </div>
      </div>

      <style>
        {`
          /* Hide burger on desktop */
          @media (min-width: 768px) {
            .burger-button {
              display: none !important;
            }
          }

          /* Responsive for small devices */
          @media (max-width: 767px) {
            .app-header {
              flex-direction: column;
              align-items: flex-start !important;
              padding: 8px 12px !important;
              gap: 8px;
            }

            .header-right {
              width: 100%;
              justify-content: space-between !important;
              gap: 8px;
            }

            /* Hide environment + account */
            .env-box,
            .account-box {
              display: none !important;
            }

            /* Menu box should align right */
            .menu-box {
              width: 100%;
              display: flex;
              justify-content: flex-end;
            }
          }
        `}
      </style>
    </header>
  );
};
