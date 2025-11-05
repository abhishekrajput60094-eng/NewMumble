import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Modal } from "@/components/Modal";
import { useConversations } from "@/hooks/useConversations";
import { useMemberId } from "@/hooks/useMemberId";
import { useActions } from "@/stores/inbox/hooks";

export const CreateDmModal: React.FC = () => {
  const { newDm } = useConversations();
  const { addConversation } = useActions();
  const [loading, setLoading] = useState(false);
  const { memberId, setMemberId, error: memberIdError, inboxId } = useMemberId();
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    void navigate(-1);
  }, [navigate]);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const conversation = await newDm(inboxId);
      await addConversation(conversation);
      void navigate(`/conversations/${conversation.id}`);
    } finally {
      setLoading(false);
    }
  };

  // ======== FOOTER ========
  const footer = useMemo(() => {
    return (
      <div
        style={{
          padding: "14px 16px",
          background: "#f3f3f3",
          borderTop: "1px solid #ccc",
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Cancel */}
        <button
          onClick={handleClose}
          style={{
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 18px",
            fontWeight: 600,
            cursor: "pointer",
            width: "100%",
            maxWidth: "130px",
          }}
        >
          Cancel
        </button>

        {/* Create */}
        <button
          disabled={loading || memberIdError !== null || !inboxId}
          onClick={() => void handleCreate()}
          style={{
            backgroundColor:
              loading || memberIdError !== null || !inboxId ? "#9be79b" : "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: 600,
            cursor:
              loading || memberIdError !== null || !inboxId ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            width: "100%",
            maxWidth: "140px",
          }}
        >
          {loading ? "Creating..." : "Create DM"}
        </button>
      </div>
    );
  }, [handleClose, handleCreate, loading, inboxId, memberIdError]);

  // ======== MAIN RETURN ========
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#fff",
          color: "#000",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "420px",
          minHeight: "auto",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          maxHeight: "90vh",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: "#f9f9f9",
            borderBottom: "1px solid #ddd",
            padding: "16px 20px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              margin: 0,
              color: "#111",
            }}
          >
            Create Direct Message
          </h2>
          <p style={{ color: "#555", fontSize: "0.9rem", marginTop: "4px" }}>
            Start a private conversation with another member
          </p>
        </div>

        {/* BODY */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "#fafafa",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <label
              style={{
                fontWeight: 600,
                color: "#222",
                fontSize: "0.9rem",
              }}
            >
              Address, Inbox ID, ENS name, or Base name
            </label>
            <input
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="Enter recipient identifier"
              style={{
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "0.95rem",
                outline: "none",
                width: "100%",
              }}
            />
            {memberIdError && (
              <span
                style={{
                  color: "#e74c3c",
                  fontSize: "0.85rem",
                  marginTop: "4px",
                }}
              >
                {memberIdError}
              </span>
            )}
          </div>
        </div>

        {/* FOOTER */}
        {footer}
      </div>
    </div>
  );
};
