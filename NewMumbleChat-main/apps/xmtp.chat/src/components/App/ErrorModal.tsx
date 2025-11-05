import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/Modal";
import { CodeWithCopy } from "@/components/CodeWithCopy";
import { useCollapsedMediaQuery } from "@/hooks/useCollapsedMediaQuery";

export const ErrorModal: React.FC = () => {
  const [unhandledRejectionError, setUnhandledRejectionError] = useState<Error | null>(null);
  const [activeTab, setActiveTab] = useState<"message" | "stackTrace">("message");
  const fullScreen = useCollapsedMediaQuery();
  const contentHeight = fullScreen ? "auto" : 500;

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setUnhandledRejectionError(event.reason as Error);
    };
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  const footer = useMemo(() => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          borderTop: "1px solid #ccc",
          background: "#f5f5f5",
        }}
      >
        <a
          href="https://github.com/xmtp/xmtp-js/issues/new/choose"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: "#e0e0e0",
            color: "#000",
            textDecoration: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            fontWeight: 500,
            cursor: "pointer",
            border: "1px solid #999",
          }}
        >
          Report issue
        </a>

        <button
          onClick={() => setUnhandledRejectionError(null)}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            border: "1px solid #000",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          OK
        </button>
      </div>
    );
  }, []);

  if (!unhandledRejectionError) return null;

  return (
    <Modal
      opened={!!unhandledRejectionError}
      onClose={() => setUnhandledRejectionError(null)}
      fullScreen={fullScreen}
      closeOnEscape={false}
      closeOnClickOutside={false}
      withCloseButton={false}
      padding={0}
      centered
      styles={{
        content: {
          background: "#ffffff",
          color: "#000000",
          border: "1px solid #ccc",
          borderRadius: "10px",
          overflow: "hidden",
        },
      }}
    >
      <div
        style={{
          maxHeight: contentHeight,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#000",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid #ccc",
            background: "#f5f5f5",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 600, color: "#000" }}>
            Application Error
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ flex: 1, padding: "24px" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <button
              onClick={() => setActiveTab("message")}
              style={{
                padding: "8px 14px",
                borderRadius: "4px",
                border: "1px solid #000",
                background: activeTab === "message" ? "#000" : "transparent",
                color: activeTab === "message" ? "#fff" : "#000",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Message
            </button>
            <button
              onClick={() => setActiveTab("stackTrace")}
              style={{
                padding: "8px 14px",
                borderRadius: "4px",
                border: "1px solid #000",
                background: activeTab === "stackTrace" ? "#000" : "transparent",
                color: activeTab === "stackTrace" ? "#fff" : "#000",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Stack Trace
            </button>
          </div>

          {/* Content */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              background: "#fff",
              padding: "16px",
              minHeight: "200px",
              overflowY: "auto",
              color: "#000",
              fontFamily: "monospace",
            }}
          >
            {activeTab === "message" ? (
              <CodeWithCopy code={unhandledRejectionError.message} />
            ) : (
              <CodeWithCopy
                code={unhandledRejectionError.stack ?? "Stack trace not available"}
              />
            )}
          </div>
        </div>

        {footer}
      </div>
    </Modal>
  );
};
